#!/usr/bin/env bash

bundle exec jekyll build
rsync -rvz --delete _site/ vps.sloanelybutsurely.com:/var/www
