#!/usr/bin/env make -f
# -*- makefile -*-

SHELL = bash -e


image:
	@docker-compose -p luisalejandroorg -f docker-compose.yml build --force-rm --pull

start:
	@docker-compose -p luisalejandroorg -f docker-compose.yml up --remove-orphans -d

dependencies: start
	@docker-compose -p luisalejandroorg -f docker-compose.yml exec \
		-T --user luisalejandro luisalejandroorg yarn install

serve: start
	@docker-compose -p luisalejandroorg -f docker-compose.yml exec \
		-T --user luisalejandro luisalejandroorg yarn dev

console: start
	@docker-compose -p luisalejandroorg -f docker-compose.yml exec \
		--user luisalejandro luisalejandroorg bash

stop:
	@docker-compose -p luisalejandroorg -f docker-compose.yml stop luisalejandroorg

down:
	@docker-compose -p luisalejandroorg -f docker-compose.yml down \
		--remove-orphans

destroy:
	@docker-compose -p luisalejandroorg -f docker-compose.yml down \
		--rmi all --remove-orphans -v