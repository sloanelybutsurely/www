#!/usr/bin/env bash

npm run build
rsync -rvz --delete dist/ vps.sloanelybutsurely.com:/var/www/sloanelybutsurely.com
