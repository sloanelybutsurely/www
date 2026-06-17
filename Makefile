OUT = site
CONTENT = content

SM_FILES := $(shell find $(CONTENT) -name '*.sm')
# NON_INDEX_SM_FILES := $(filter-out content/index.sm,$(SM_FILES))
# HTML_FILES := $(patsubst content/%.sm,site/%/index.html,$(NON_INDEX_SM_FILES))
# HTML_FILES += site/index.html

.PHONY: clean

# all: $(HTML_FILES)

# $(OUT)/index.html: content/index.sm 
# 	@mkdir -p content
# 	cat $< | bin/inline | bin/smarkup > $@
#
# $(OUT)/%/index.html: content/%.sm bin/smarkup bin/inline bin/links
# 	@mkdir -p $(dir $@)
# 	cat $< | bin/inline | bin/smarkup > $@

_build/blocks/%.blocks: content/%.sm
	@mkdir -p $(dir $@)
	bin/blocks < $< > $@

clean:
	rm -rf _build
	rm -rf site
