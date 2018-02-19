/**
 * Module that generates code blocks from script content.
 *
 * @module codedoc
 */
(function (global, factory) {
    if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(['exports'], factory);
    } else {
        global.codedoc = factory();
    }
} (this, function () {
    "use strict";

    /**
     * Class for the script tags to copy code from.
     * Default is 'doc'.
     *
     * @var {string} _from
     * @memberOf codedoc
     * @private
     */
    var _from = ".doc";

    /**
     * Id of the container element for the code blocks.
     * Default is 'code-doc'.
     *
     * @var {string} _into
     * @memberOf codedoc
     * @private
     */
    var _into = "code-doc";

    /**
     * Callback to trigger once the code is generated.
     * Default is null.
     *
     * @var {(null|Function)} _callback.
     * @memberOf codedoc
     * @private
     */
    var _callback = null;

    /**
     * Sets callback function.
     *
     * @method callback
     * @methodOf codedoc
     * @param cb {Function} Function to set callback to.
     * @returns {codedoc} Reference to the module for chaining.
     */
    function callback(cb) {
        _callback = cb;
        return this;
    }

    /**
     * Whether first line of code should be used as heading.
     *
     * @var {boolean} _heading
     * @memberOf codedoc
     * @private
     */
    var _heading = false;

    /**
     * First line of code is used as heading.
     *
     * @method heading
     * @methodOf codedoc
     * @returns {codedoc} Reference to the module for chaining.
     */
    function heading() {
        _heading = true;
        return this;
    }

    /**
     * Copies the code from selected script tags into code blocks in DOM.
     * Each code has to start with a comment that is used as heading for the code block.
     *
     * @method run
     * @methodOf codedoc
     * @returns {codedoc} Reference to the module for chaining.
     */
    function run() {
        if (typeof document !== "undefined") {
            // Clear container
            document.getElementById(_into).innerHTML = "";

            // Copy code
            document.body.querySelectorAll("script" + _from).forEach(function (script) {
                // Read content
                var lines = script.innerHTML.trim().split('\n');

                // Add heading
                if (_heading) {
                    var title = lines[0].replace(/^\/\//).trim();
                    var heading = document.createElement("h1");
                    heading.innerHTML = title;
                    document.getElementById(_into).appendChild(heading);
                }

                // Add code
                var code = lines.slice(_heading ? 1 : 0, lines.length).join('\n').trim();
                var codeTag = document.createElement("code");
                codeTag.className = "javascript";
                codeTag.innerHTML = code;
                var preTag = document.createElement('pre');
                preTag.appendChild(codeTag);
                document.getElementById(_into).appendChild(preTag);
            });

            _callback && _callback();
        } else {
            console.error("NoDOMError: DOM is not detected, cannot add code blocks");
        }
        return this;
    }

    // Attach _copy to onload
    window.addEventListener("load", function() {
        run(_from, _into, _callback);
    });

    // Return public methods
    return {
        callback: callback,
        heading: heading,
        run: run
    };
}));