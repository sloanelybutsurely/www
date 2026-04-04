require "base64"

module Jekyll
  module ProtectFilter
    def protect(input, passphrase)
      Base64.strict_encode64(input.chars.map.with_index do |char, i|
        (char.ord ^ passphrase[i % passphrase.length].ord).chr
      end.join)
    end
  end
end

Liquid::Template.register_filter(Jekyll::ProtectFilter)
