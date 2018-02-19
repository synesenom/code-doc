# code-doc
A small JS module to copy the content of script tags into code blocks for documentations

# usage
Create a <code class="inline">div</code> with the id <code class="inline">code-doc</code>:
```
<div id="code-doc"></div>
```

And add the class `doc` to each `script` tag that you want to copy:
```
<script class="doc">
// Your awesome code
</script>
```

Then code-doc will populate the div with the content from the script tags.

#api
All API methods return the module itself in order to call them with chaining.
If you want to have the first line of each code block as a heading, call
```
codedoc.heading();
```

Also, if any additional callback should be triggered (such as highlighting after the code blocks are populated),
set it with `callback(func)``:
```
codedoc.callback(func);
```
This will trigger the function `func` once the blocks are ready.

To re-run the code generation, simply call
```
codedoc.run();
```