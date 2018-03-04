#!/usr/bin/env bash

# minify
uglifyjs \
    src/codedoc.js \
    -m \
    --output codedoc.min.js

cp codedoc.min.js docs
