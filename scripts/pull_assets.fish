#!/usr/bin/env fish

set media_dir "_media"
set rclone_remote "cdn:sloanelybutsurely-media"

rclone sync $rclone_remote $media_dir \
  --config rclone.conf \
  --progress \
  --checksum \
  --exclude ".DS_Store" \
  --exclude "*.tmp"
