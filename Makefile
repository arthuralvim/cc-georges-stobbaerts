# Makefile dojodocirculo

.PHONY: all help install build rebuild clean

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

clean:
	@gulp clean

rebuild: clean build
