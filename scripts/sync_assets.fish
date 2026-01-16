#!/usr/bin/env fish

set media_dir "_media"
set rclone_remote "cdn:sloanelybutsurely-media"

rclone sync $media_dir $rclone_remote \
  --config rclone.conf \
  --progress \
  --checksum \
  --exclude ".DS_Store" \
  --exclude "*.tmp"

ruby ./scripts/build_manifest.rb
