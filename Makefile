# Makefile dojodocirculo

.PHONY: all help install build rebuild clean clean.all run

all: help

help:
	@echo 'Makefile *** dojodocirculo *** Makefile'

install:
	@npm install -g gulp
	@npm install -g bower
	@bundle install
	@npm install
	@bower install

build:
	@gulp
	@jekyll serve

run:
	@jekyll serve

clean:
	@gulp clean

clean.all:
	@gulp clean
	rm -rf node_modules/
	rm -rf assets/bower/

rebuild: clean build
