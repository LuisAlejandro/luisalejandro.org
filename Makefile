#!/usr/bin/env make -f
# -*- makefile -*-

SHELL = bash -e
export BASH_ENV := $(HOME)/.bash_env
img_hash = $(shell docker images -q luisalejandro/luisalejandro.org:latest)

VERSION_TYPE ?= patch
APP_NAME ?= luisalejandro.org
exec_on_docker = docker compose \
	-p $(PROJECT_NAME) -f docker-compose.yml exec \
	--user luisalejandro-org app

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
	@echo "  Quality commands:"
	@echo "    lint             - Run ESLint"
	@echo "    format           - Run Prettier"
	@echo "    test             - Run TypeScript type check"
	@echo ""
	@echo "  Release commands:"
	@echo "    release          - Create a new release (default: patch)"
	@echo "    release-patch    - Create a new patch release (x.x.X)"
	@echo "    release-minor    - Create a new minor release (x.X.x)"
	@echo "    release-major    - Create a new major release (X.x.x)"
	@echo "    undo-release     - Roll back a botched release (VERSION=x.y.z)"
	@echo ""
	@echo "  Release with custom version type:"
	@echo "    make release VERSION_TYPE=minor"
	@echo ""

dependencies: start
	@$(exec_on_docker) npm ci

build_production: start
	@$(exec_on_docker) npm run build

serve: start
	@$(exec_on_docker) npm run dev

console: start
	@$(exec_on_docker) bash

lint: start
	@$(exec_on_docker) npm run lint

format: start
	@$(exec_on_docker) npm run format

test: start
	@$(exec_on_docker) npm run type-check

# >>> rosey-maintainer:ops-docker BEGIN
# Managed by rosey-maintainer-tools 0.4.4. Do not edit directly.

PROJECT_NAME ?= luisalejandro-org
all_ps_hashes = $(shell docker ps -q)

image:
	@docker compose -p $(PROJECT_NAME) -f docker-compose.yml build \
		--build-arg UID=$(shell id -u) \
		--build-arg GID=$(shell id -g)

start:
	@if [ -z "$(img_hash)" ]; then\
		make image;\
	fi
	@docker compose -p $(PROJECT_NAME) -f docker-compose.yml up \
		--remove-orphans --no-build --detach

stop:
	@docker compose -p $(PROJECT_NAME) -f docker-compose.yml stop

down:
	@docker compose -p $(PROJECT_NAME) -f docker-compose.yml down \
		--remove-orphans

destroy:
	@echo
	@echo "WARNING!!!"
	@echo "This will stop and delete all containers, images and volumes related to this project."
	@echo
	@read -p "Press ctrl+c to abort or enter to continue." -n 1 -r
	@docker compose -p $(PROJECT_NAME) -f docker-compose.yml down \
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
	@docker compose -p $(PROJECT_NAME) -f docker-compose.yml down \
		--rmi all --remove-orphans --volumes
	@docker system prune -a -f --volumes
# <<< rosey-maintainer:ops-docker END

# >>> rosey-maintainer:ops-release BEGIN
# Managed by rosey-maintainer-tools 0.4.4. Do not edit directly.

release:
	@./scripts/release.sh $${VERSION_TYPE}

release-patch:
	@./scripts/release.sh patch $${APP_NAME}

release-minor:
	@./scripts/release.sh minor $${APP_NAME}

release-major:
	@./scripts/release.sh major $${APP_NAME}


release-preflight: start
	@make format
	@make lint
	@make test

undo-release:
	@: "$${VERSION:?Set VERSION=x.y.z before running make undo-release}"
	@VERSION=$${VERSION} ./scripts/rollback.sh release
# <<< rosey-maintainer:ops-release END

.PHONY: help dependencies build_production serve console lint format test image start stop down destroy cataplum release release-patch release-minor release-major release-preflight undo-release
