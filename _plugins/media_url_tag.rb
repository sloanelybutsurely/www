module Jekyll
  class MediaUrlTag < Liquid::Tag
    def initialize(tag_name, markup, tokens)
      super
      @filename = markup.strip.gsub(/['"]/, '')
    end

    def render(context)
      site = context.registers[:site]
      cdn_base = site.config['cdn_base_url']
      media_files = site.data['media'] || []

      matching_file = media_files.find do |file|
        file['name'] == @filename
      end

      if matching_file
        "#{cdn_base}/#{matching_file['name']}"
      else
        raise "Media file not found: #{@filename}"
      end
    end
  end
end

Liquid::Template.register_tag('media_url', Jekyll::MediaUrlTag)
