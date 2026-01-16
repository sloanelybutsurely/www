#!/usr/bin/env ruby

require 'yaml'
require 'pathname'

MEDIA_DIR = '_media'
MANIFEST_FILE = '_data/media.yml'

files = []

Dir.glob("#{MEDIA_DIR}/**/*").each do |file_path|
  next if File.directory?(file_path)
  next if File.basename(file_path).start_with?('.')

  relative_path = Pathname.new(file_path).relative_path_from(Pathname.new(MEDIA_DIR))
  files << relative_path
end

files.sort!

files = files.map { |name| { 'name' => name.to_s } }

File.write(MANIFEST_FILE, files.to_yaml)
