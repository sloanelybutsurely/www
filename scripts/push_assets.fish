#!/usr/bin/env fish

set media_dir "_media"
set rclone_remote "cdn:sloanelybutsurely-media"

rclone sync $media_dir $rclone_remote \
  --config rclone.conf \
  --password-command "op item get owpj27pv36rdirzeriufzwyyyi --fields password --reveal" \
  --progress \
  --checksum \
  --exclude ".DS_Store" \
  --exclude "*.tmp"
