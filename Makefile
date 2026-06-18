OUT = site
CONTENT = content

SM_FILES := $(shell find $(CONTENT) -name '*.sm')
NON_INDEX_SM_FILES := $(filter-out content/index.sm,$(SM_FILES))
HTML_FILES := $(patsubst content/%.sm,site/%/index.html,$(NON_INDEX_SM_FILES))
HTML_FILES += site/index.html

.PHONY: all clean
.SECONDARY:

all: $(HTML_FILES)

clean:
	rm -rf _build
	rm -rf site

_build/blocks/%.blocks: content/%.sm bin/blocks
	@mkdir -p $(dir $@)
	bin/blocks < $< > $@

_build/fmt/%.fmt: _build/blocks/%.blocks bin/inline
	@mkdir -p $(dir $@)
	bin/inline < $< > $@

_build/html/index.html: _build/fmt/index.fmt bin/smarkup
	@mkdir -p content
	bin/smarkup < $< > $@

_build/html/%/index.html: _build/fmt/%.fmt bin/smarkup
	@mkdir -p $(dir $@)
	bin/smarkup < $< > $@

site/%.html: _build/html/%.html
	@mkdir -p $(dir $@)
	tidy -wrap 80 -omit -i -q $< > $@
