require 'SecureRandom'

module Jekyll
  class ToggleBoxTag < Liquid::Tag
    Syntax = /(#{Liquid::QuotedFragment}+)(\s+(?:template|include)\s+(#{Liquid::QuotedFragment}+))?/o
    # Syntax = /\A#{Liquid::QuotedFragment}+/o
    
    def initialize(tag_name, markup, tokens)
      super
      
      if markup =~ Syntax
        @variables = variables_from_string(markup)
        @name = "'#{@variables.to_s}'"
      else
        raise SyntaxError.new(options[:locale].t("errors.syntax.include".freeze))
      end
    end
    
    def variables_from_string(markup)
      markup.split(',').collect do |var|
        var =~ /\s*(#{Liquid::QuotedFragment})\s*/o
        $1 ? $1 : nil
      end.compact
    end

    def render(context)
      context.stack do
        @headline = context[@variables[0]]
        @content_include = context[@variables[1]]
      end
      
      tmpl = File.read File.join Dir.pwd, "_includes", @content_include
      site = context.registers[:site]
      tmpl = (Liquid::Template.parse tmpl).render site.site_payload
      incl_template = Kramdown::Document.new(tmpl).to_html
      modifier = SecureRandom.hex(10)
html = <<-EOS
<div class="panel-group" id="accordion_#{modifier}">
  <div class="panel panel-default">
    <div class="panel-heading">
      <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion_#{modifier}" href="#collapsable_#{modifier}">
          <i class="glyphicon glyphicon-chevron-down"></i> #{@headline}
        </a>
      </h4>
    </div>
    <div id="collapsable_#{modifier}" class="panel-collapse collapse">
      <div class="panel-body">
        #{incl_template}
      </div>
    </div>
  </div>
</div>
EOS
html
    end
  end
end

Liquid::Template.register_tag('toggle_box', Jekyll::ToggleBoxTag)
