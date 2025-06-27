#!/usr/bin/env make -f
# -*- makefile -*-

SHELL = bash -e
all_ps_hashes = $(shell docker ps -q)
img_hash = $(shell docker images -q luisalejandro/luisalejandro.org:latest)
exec_on_docker = docker compose \
	-p luisalejandro -f docker-compose.yml exec \
	--user luisalejandro app

# Release configuration
VERSION_TYPE ?= patch
APP_NAME ?= luisalejandro.org

help:
	@echo "Available commands:"
	@echo "  Docker commands:"
	@echo "    image            - Build Docker image"
	@echo "    start            - Start Docker containers"
	@echo "    dependencies     - Install dependencies"
	@echo "    build_production - Build production version"
	@echo "    serve            - Start development server"
	@echo "    console          - Open bash console in container"
	@echo "    stop             - Stop Docker containers"
	@echo "    down             - Stop and remove Docker containers"
	@echo "    destroy          - Remove all containers, images and volumes"
	@echo "    cataplum         - Remove ALL Docker resources (system-wide)"
	@echo ""
	@echo "  Release commands:"
	@echo "    release          - Create a new release (default: patch)"
	@echo "    release-patch    - Create a new patch release (x.x.X)"
	@echo "    release-minor    - Create a new minor release (x.X.x)"
	@echo "    release-major    - Create a new major release (X.x.x)"
	@echo "    hotfix           - Create a new hotfix (always patch increment)"
	@echo ""
	@echo "  Release with custom version type:"
	@echo "    make release VERSION_TYPE=minor"
	@echo ""

image:
	@docker compose -p luisalejandro -f docker-compose.yml build \
		--build-arg UID=$(shell id -u) \
		--build-arg GID=$(shell id -g)

start:
	@if [ -z "$(img_hash)" ]; then\
		make image;\
	fi
	@docker compose -p luisalejandro -f docker-compose.yml up \
		--remove-orphans --no-build --detach

dependencies: start
	@$(exec_on_docker) yarn install

build_production: start
	@$(exec_on_docker) yarn run build

serve: start
	@$(exec_on_docker) yarn dev

console: start
	@$(exec_on_docker) bash

stop:
	@docker compose -p luisalejandro -f docker-compose.yml stop app

down:
	@docker compose -p luisalejandro -f docker-compose.yml down \
		--remove-orphans

destroy:
	@echo
	@echo "WARNING!!!"
	@echo "This will stop and delete all containers, images and volumes related to this project."
	@echo
	@read -p "Press ctrl+c to abort or enter to continue." -n 1 -r
	@docker compose -p luisalejandro -f docker-compose.yml down \
		--rmi all --remove-orphans --volumes

cataplum:
	@echo
	@echo "WARNING!!!"
	@echo "This will stop and delete all containers, images and volumes present in your system."
	@echo
	@read -p "Press ctrl+c to abort or enter to continue." -n 1 -r
	@if [ -n "$(all_ps_hashes)" ]; then\
		docker kill $(shell docker ps -q);\
	fi
	@docker compose -p luisalejandro -f docker-compose.yml down \
		--rmi all --remove-orphans --volumes
	@docker system prune -a -f --volumes

# Release management
release:
	@./scripts/release.sh $(VERSION_TYPE)

release-patch:
	@./scripts/release.sh patch $(APP_NAME)

release-minor:
	@./scripts/release.sh minor $(APP_NAME)

release-major:
	@./scripts/release.sh major $(APP_NAME)

# Hotfix management
hotfix:
	@./scripts/hotfix.sh $(APP_NAME)

.PHONY: help image start dependencies build_production serve console stop down destroy cataplum release release-patch release-minor release-major hotfix
