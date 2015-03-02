(function (window, undefined) {
    var document = window.document;
    var jQuery = (function () {
        var jQuery = function (selector, context) {
            return new jQuery.fn.init(selector, context, rootjQuery);
        }, _jQuery = window.jQuery, _$ = window.$, rootjQuery, quickExpr = /^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]+)$)/, rnotwhite = /\S/, trimLeft = /^\s+/, trimRight = /\s+$/, rdigit = /\d/, rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>)?$/, rvalidchars = /^[\],:{}\s]*$/, rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g, rwebkit = /(webkit)[ \/]([\w.]+)/, ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/, rmsie = /(msie) ([\w.]+)/, rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/, userAgent = navigator.userAgent, browserMatch, readyBound = false, readyList, promiseMethods = "then done fail isResolved isRejected promise".split(" "), DOMContentLoaded, toString = Object.prototype.toString, hasOwn = Object.prototype.hasOwnProperty, push = Array.prototype.push, slice = Array.prototype.slice, trim = String.prototype.trim, indexOf = Array.prototype.indexOf, class2type = {};
        jQuery.fn = jQuery.prototype = {
            constructor: jQuery, init: function (selector, context, rootjQuery) {
                var match, elem, ret, doc;
                if (!selector) {
                    return this;
                }
                if (selector.nodeType) {
                    this.context = this[0] = selector;
                    this.length = 1;
                    return this;
                }
                if (selector === "body" && !context && document.body) {
                    this.context = document;
                    this[0] = document.body;
                    this.selector = "body";
                    this.length = 1;
                    return this;
                }
                if (typeof selector === "string") {
                    match = quickExpr.exec(selector);
                    if (match && (match[1] || !context)) {
                        if (match[1]) {
                            context = context instanceof jQuery ? context[0] : context;
                            doc = (context ? context.ownerDocument || context : document);
                            ret = rsingleTag.exec(selector);
                            if (ret) {
                                if (jQuery.isPlainObject(context)) {
                                    selector = [document.createElement(ret[1])];
                                    jQuery.fn.attr.call(selector, context, true);
                                } else {
                                    selector = [doc.createElement(ret[1])];
                                }
                            } else {
                                ret = jQuery.buildFragment([match[1]], [doc]);
                                selector = (ret.cacheable ? jQuery.clone(ret.fragment) : ret.fragment).childNodes;
                            }
                            return jQuery.merge(this, selector);
                        } else {
                            elem = document.getElementById(match[2]);
                            if (elem && elem.parentNode) {
                                if (elem.id !== match[2]) {
                                    return rootjQuery.find(selector);
                                }
                                this.length = 1;
                                this[0] = elem;
                            }
                            this.context = document;
                            this.selector = selector;
                            return this;
                        }
                    } else if (!context || context.jquery) {
                        return (context || rootjQuery).find(selector);
                    } else {
                        return this.constructor(context).find(selector);
                    }
                } else if (jQuery.isFunction(selector)) {
                    return rootjQuery.ready(selector);
                }
                if (selector.selector !== undefined) {
                    this.selector = selector.selector;
                    this.context = selector.context;
                }
                return jQuery.makeArray(selector, this);
            }, selector: "", jquery: "1.5.1", length: 0, size: function () {
                return this.length;
            }, toArray: function () {
                return slice.call(this, 0);
            }, get: function (num) {
                return num == null ? this.toArray() : (num < 0 ? this[this.length + num] : this[num]);
            }, pushStack: function (elems, name, selector) {
                var ret = this.constructor();
                if (jQuery.isArray(elems)) {
                    push.apply(ret, elems);
                } else {
                    jQuery.merge(ret, elems);
                }
                ret.prevObject = this;
                ret.context = this.context;
                if (name === "find") {
                    ret.selector = this.selector + (this.selector ? " " : "") + selector;
                } else if (name) {
                    ret.selector = this.selector + "." + name + "(" + selector + ")";
                }
                return ret;
            }, each: function (callback, args) {
                return jQuery.each(this, callback, args);
            }, ready: function (fn) {
                jQuery.bindReady();
                readyList.done(fn);
                return this;
            }, eq: function (i) {
                return i === -1 ? this.slice(i) : this.slice(i, +i + 1);
            }, first: function () {
                return this.eq(0);
            }, last: function () {
                return this.eq(-1);
            }, slice: function () {
                return this.pushStack(slice.apply(this, arguments), "slice", slice.call(arguments).join(","));
            }, map: function (callback) {
                return this.pushStack(jQuery.map(this, function (elem, i) {
                    return callback.call(elem, i, elem);
                }));
            }, end: function () {
                return this.prevObject || this.constructor(null);
            }, push: push, sort: [].sort, splice: [].splice
        };
        jQuery.fn.init.prototype = jQuery.fn;
        jQuery.extend = jQuery.fn.extend = function () {
            var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
            if (typeof target === "boolean") {
                deep = target;
                target = arguments[1] || {};
                i = 2;
            }
            if (typeof target !== "object" && !jQuery.isFunction(target)) {
                target = {};
            }
            if (length === i) {
                target = this;
                --i;
            }
            for (; i < length; i++) {
                if ((options = arguments[i]) != null) {
                    for (name in options) {
                        src = target[name];
                        copy = options[name];
                        if (target === copy) {
                            continue;
                        }
                        if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                            if (copyIsArray) {
                                copyIsArray = false;
                                clone = src && jQuery.isArray(src) ? src : [];
                            } else {
                                clone = src && jQuery.isPlainObject(src) ? src : {};
                            }
                            target[name] = jQuery.extend(deep, clone, copy);
                        } else if (copy !== undefined) {
                            target[name] = copy;
                        }
                    }
                }
            }
            return target;
        };
        jQuery.extend({
            noConflict: function (deep) {
                window.$ = _$;
                if (deep) {
                    window.jQuery = _jQuery;
                }
                return jQuery;
            }, isReady: false, readyWait: 1, ready: function (wait) {
                if (wait === true) {
                    jQuery.readyWait--;
                }
                if (!jQuery.readyWait || (wait !== true && !jQuery.isReady)) {
                    if (!document.body) {
                        return setTimeout(jQuery.ready, 1);
                    }
                    jQuery.isReady = true;
                    if (wait !== true && --jQuery.readyWait > 0) {
                        return;
                    }
                    readyList.resolveWith(document, [jQuery]);
                    if (jQuery.fn.trigger) {
                        jQuery(document).trigger("ready").unbind("ready");
                    }
                }
            }, bindReady: function () {
                if (readyBound) {
                    return;
                }
                readyBound = true;
                if (document.readyState === "complete") {
                    return setTimeout(jQuery.ready, 1);
                }
                if (document.addEventListener) {
                    document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);
                    window.addEventListener("load", jQuery.ready, false);
                } else if (document.attachEvent) {
                    document.attachEvent("onreadystatechange", DOMContentLoaded);
                    window.attachEvent("onload", jQuery.ready);
                    var toplevel = false;
                    try {
                        toplevel = window.frameElement == null;
                    } catch (e) {
                    }
                    if (document.documentElement.doScroll && toplevel) {
                        doScrollCheck();
                    }
                }
            }, isFunction: function (obj) {
                return jQuery.type(obj) === "function";
            }, isArray: Array.isArray || function (obj) {
                return jQuery.type(obj) === "array";
            }, isWindow: function (obj) {
                return obj && typeof obj === "object" && "setInterval"in obj;
            }, isNaN: function (obj) {
                return obj == null || !rdigit.test(obj) || isNaN(obj);
            }, type: function (obj) {
                return obj == null ? String(obj) : class2type[toString.call(obj)] || "object";
            }, isPlainObject: function (obj) {
                if (!obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
                    return false;
                }
                if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                    return false;
                }
                var key;
                for (key in obj) {
                }
                return key === undefined || hasOwn.call(obj, key);
            }, isEmptyObject: function (obj) {
                for (var name in obj) {
                    return false;
                }
                return true;
            }, error: function (msg) {
                throw msg;
            }, parseJSON: function (data) {
                if (typeof data !== "string" || !data) {
                    return null;
                }
                data = jQuery.trim(data);
                if (rvalidchars.test(data.replace(rvalidescape, "@").replace(rvalidtokens, "]").replace(rvalidbraces, ""))) {
                    return window.JSON && window.JSON.parse ? window.JSON.parse(data) : (new Function("return " + data))();
                } else {
                    jQuery.error("Invalid JSON: " + data);
                }
            }, parseXML: function (data, xml, tmp) {
                if (window.DOMParser) {
                    tmp = new DOMParser();
                    xml = tmp.parseFromString(data, "text/xml");
                } else {
                    xml = new ActiveXObject("Microsoft.XMLDOM");
                    xml.async = "false";
                    xml.loadXML(data);
                }
                tmp = xml.documentElement;
                if (!tmp || !tmp.nodeName || tmp.nodeName === "parsererror") {
                    jQuery.error("Invalid XML: " + data);
                }
                return xml;
            }, noop: function () {
            }, globalEval: function (data) {
                if (data && rnotwhite.test(data)) {
                    var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement, script = document.createElement("script");
                    if (jQuery.support.scriptEval()) {
                        script.appendChild(document.createTextNode(data));
                    } else {
                        script.text = data;
                    }
                    head.insertBefore(script, head.firstChild);
                    head.removeChild(script);
                }
            }, nodeName: function (elem, name) {
                return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
            }, each: function (object, callback, args) {
                var name, i = 0, length = object.length, isObj = length === undefined || jQuery.isFunction(object);
                if (args) {
                    if (isObj) {
                        for (name in object) {
                            if (callback.apply(object[name], args) === false) {
                                break;
                            }
                        }
                    } else {
                        for (; i < length;) {
                            if (callback.apply(object[i++], args) === false) {
                                break;
                            }
                        }
                    }
                } else {
                    if (isObj) {
                        for (name in object) {
                            if (callback.call(object[name], name, object[name]) === false) {
                                break;
                            }
                        }
                    } else {
                        for (var value = object[0]; i < length && callback.call(value, i, value) !== false; value = object[++i]) {
                        }
                    }
                }
                return object;
            }, trim: trim ? function (text) {
                return text == null ? "" : trim.call(text);
            } : function (text) {
                return text == null ? "" : text.toString().replace(trimLeft, "").replace(trimRight, "");
            }, makeArray: function (array, results) {
                var ret = results || [];
                if (array != null) {
                    var type = jQuery.type(array);
                    if (array.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow(array)) {
                        push.call(ret, array);
                    } else {
                        jQuery.merge(ret, array);
                    }
                }
                return ret;
            }, inArray: function (elem, array) {
                if (array.indexOf) {
                    return array.indexOf(elem);
                }
                for (var i = 0, length = array.length; i < length; i++) {
                    if (array[i] === elem) {
                        return i;
                    }
                }
                return -1;
            }, merge: function (first, second) {
                var i = first.length, j = 0;
                if (typeof second.length === "number") {
                    for (var l = second.length; j < l; j++) {
                        first[i++] = second[j];
                    }
                } else {
                    while (second[j] !== undefined) {
                        first[i++] = second[j++];
                    }
                }
                first.length = i;
                return first;
            }, grep: function (elems, callback, inv) {
                var ret = [], retVal;
                inv = !!inv;
                for (var i = 0, length = elems.length; i < length; i++) {
                    retVal = !!callback(elems[i], i);
                    if (inv !== retVal) {
                        ret.push(elems[i]);
                    }
                }
                return ret;
            }, map: function (elems, callback, arg) {
                var ret = [], value;
                for (var i = 0, length = elems.length; i < length; i++) {
                    value = callback(elems[i], i, arg);
                    if (value != null) {
                        ret[ret.length] = value;
                    }
                }
                return ret.concat.apply([], ret);
            }, guid: 1, proxy: function (fn, proxy, thisObject) {
                if (arguments.length === 2) {
                    if (typeof proxy === "string") {
                        thisObject = fn;
                        fn = thisObject[proxy];
                        proxy = undefined;
                    } else if (proxy && !jQuery.isFunction(proxy)) {
                        thisObject = proxy;
                        proxy = undefined;
                    }
                }
                if (!proxy && fn) {
                    proxy = function () {
                        return fn.apply(thisObject || this, arguments);
                    };
                }
                if (fn) {
                    proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++;
                }
                return proxy;
            }, access: function (elems, key, value, exec, fn, pass) {
                var length = elems.length;
                if (typeof key === "object") {
                    for (var k in key) {
                        jQuery.access(elems, k, key[k], exec, fn, value);
                    }
                    return elems;
                }
                if (value !== undefined) {
                    exec = !pass && exec && jQuery.isFunction(value);
                    for (var i = 0; i < length; i++) {
                        fn(elems[i], key, exec ? value.call(elems[i], i, fn(elems[i], key)) : value, pass);
                    }
                    return elems;
                }
                return length ? fn(elems[0], key) : undefined;
            }, now: function () {
                return (new Date()).getTime();
            }, _Deferred: function () {
                var
                    callbacks = [], fired, firing, cancelled, deferred = {
                        done: function () {
                            if (!cancelled) {
                                var args = arguments, i, length, elem, type, _fired;
                                if (fired) {
                                    _fired = fired;
                                    fired = 0;
                                }
                                for (i = 0, length = args.length; i < length; i++) {
                                    elem = args[i];
                                    type = jQuery.type(elem);
                                    if (type === "array") {
                                        deferred.done.apply(deferred, elem);
                                    } else if (type === "function") {
                                        callbacks.push(elem);
                                    }
                                }
                                if (_fired) {
                                    deferred.resolveWith(_fired[0], _fired[1]);
                                }
                            }
                            return this;
                        }, resolveWith: function (context, args) {
                            if (!cancelled && !fired && !firing) {
                                firing = 1;
                                try {
                                    while (callbacks[0]) {
                                        callbacks.shift().apply(context, args);
                                    }
                                }
                                catch (e) {
                                    throw e;
                                }
                                finally {
                                    fired = [context, args];
                                    firing = 0;
                                }
                            }
                            return this;
                        }, resolve: function () {
                            deferred.resolveWith(jQuery.isFunction(this.promise) ? this.promise() : this, arguments);
                            return this;
                        }, isResolved: function () {
                            return !!(firing || fired);
                        }, cancel: function () {
                            cancelled = 1;
                            callbacks = [];
                            return this;
                        }
                    };
                return deferred;
            }, Deferred: function (func) {
                var deferred = jQuery._Deferred(), failDeferred = jQuery._Deferred(), promise;
                jQuery.extend(deferred, {
                    then: function (doneCallbacks, failCallbacks) {
                        deferred.done(doneCallbacks).fail(failCallbacks);
                        return this;
                    },
                    fail: failDeferred.done,
                    rejectWith: failDeferred.resolveWith,
                    reject: failDeferred.resolve,
                    isRejected: failDeferred.isResolved,
                    promise: function (obj) {
                        if (obj == null) {
                            if (promise) {
                                return promise;
                            }
                            promise = obj = {};
                        }
                        var i = promiseMethods.length;
                        while (i--) {
                            obj[promiseMethods[i]] = deferred[promiseMethods[i]];
                        }
                        return obj;
                    }
                });
                deferred.done(failDeferred.cancel).fail(deferred.cancel);
                delete deferred.cancel;
                if (func) {
                    func.call(deferred, deferred);
                }
                return deferred;
            }, when: function (object) {
                var lastIndex = arguments.length, deferred = lastIndex <= 1 && object && jQuery.isFunction(object.promise) ? object : jQuery.Deferred(), promise = deferred.promise();
                if (lastIndex > 1) {
                    var array = slice.call(arguments, 0), count = lastIndex, iCallback = function (index) {
                        return function (value) {
                            array[index] = arguments.length > 1 ? slice.call(arguments, 0) : value;
                            if (!(--count)) {
                                deferred.resolveWith(promise, array);
                            }
                        };
                    };
                    while ((lastIndex--)) {
                        object = array[lastIndex];
                        if (object && jQuery.isFunction(object.promise)) {
                            object.promise().then(iCallback(lastIndex), deferred.reject);
                        } else {
                            --count;
                        }
                    }
                    if (!count) {
                        deferred.resolveWith(promise, array);
                    }
                } else if (deferred !== object) {
                    deferred.resolve(object);
                }
                return promise;
            }, uaMatch: function (ua) {
                ua = ua.toLowerCase();
                var match = rwebkit.exec(ua) || ropera.exec(ua) || rmsie.exec(ua) || ua.indexOf("compatible") < 0 && rmozilla.exec(ua) || [];
                return {browser: match[1] || "", version: match[2] || "0"};
            }, sub: function () {
                function jQuerySubclass(selector, context) {
                    return new jQuerySubclass.fn.init(selector, context);
                }

                jQuery.extend(true, jQuerySubclass, this);
                jQuerySubclass.superclass = this;
                jQuerySubclass.fn = jQuerySubclass.prototype = this();
                jQuerySubclass.fn.constructor = jQuerySubclass;
                jQuerySubclass.subclass = this.subclass;
                jQuerySubclass.fn.init = function init(selector, context) {
                    if (context && context instanceof jQuery && !(context instanceof jQuerySubclass)) {
                        context = jQuerySubclass(context);
                    }
                    return jQuery.fn.init.call(this, selector, context, rootjQuerySubclass);
                };
                jQuerySubclass.fn.init.prototype = jQuerySubclass.fn;
                var rootjQuerySubclass = jQuerySubclass(document);
                return jQuerySubclass;
            }, browser: {}
        });
        readyList = jQuery._Deferred();
        jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (i, name) {
            class2type["[object " + name + "]"] = name.toLowerCase();
        });
        browserMatch = jQuery.uaMatch(userAgent);
        if (browserMatch.browser) {
            jQuery.browser[browserMatch.browser] = true;
            jQuery.browser.version = browserMatch.version;
        }
        if (jQuery.browser.webkit) {
            jQuery.browser.safari = true;
        }
        if (indexOf) {
            jQuery.inArray = function (elem, array) {
                return indexOf.call(array, elem);
            };
        }
        if (rnotwhite.test("\xA0")) {
            trimLeft = /^[\s\xA0]+/;
            trimRight = /[\s\xA0]+$/;
        }
        rootjQuery = jQuery(document);
        if (document.addEventListener) {
            DOMContentLoaded = function () {
                document.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
                jQuery.ready();
            };
        } else if (document.attachEvent) {
            DOMContentLoaded = function () {
                if (document.readyState === "complete") {
                    document.detachEvent("onreadystatechange", DOMContentLoaded);
                    jQuery.ready();
                }
            };
        }
        function doScrollCheck() {
            if (jQuery.isReady) {
                return;
            }
            try {
                document.documentElement.doScroll("left");
            } catch (e) {
                setTimeout(doScrollCheck, 1);
                return;
            }
            jQuery.ready();
        }

        return jQuery;
    })();
    (function () {
        jQuery.support = {};
        var div = document.createElement("div");
        div.style.display = "none";
        div.innerHTML = "   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
        var all = div.getElementsByTagName("*"), a = div.getElementsByTagName("a")[0], select = document.createElement("select"), opt = select.appendChild(document.createElement("option")), input = div.getElementsByTagName("input")[0];
        if (!all || !all.length || !a) {
            return;
        }
        jQuery.support = {
            leadingWhitespace: div.firstChild.nodeType === 3,
            tbody: !div.getElementsByTagName("tbody").length,
            htmlSerialize: !!div.getElementsByTagName("link").length,
            style: /red/.test(a.getAttribute("style")),
            hrefNormalized: a.getAttribute("href") === "/a",
            opacity: /^0.55$/.test(a.style.opacity),
            cssFloat: !!a.style.cssFloat,
            checkOn: input.value === "on",
            optSelected: opt.selected,
            deleteExpando: true,
            optDisabled: false,
            checkClone: false,
            noCloneEvent: true,
            noCloneChecked: true,
            boxModel: null,
            inlineBlockNeedsLayout: false,
            shrinkWrapBlocks: false,
            reliableHiddenOffsets: true
        };
        input.checked = true;
        jQuery.support.noCloneChecked = input.cloneNode(true).checked;
        select.disabled = true;
        jQuery.support.optDisabled = !opt.disabled;
        var _scriptEval = null;
        jQuery.support.scriptEval = function () {
            if (_scriptEval === null) {
                var root = document.documentElement, script = document.createElement("script"), id = "script" + jQuery.now();
                try {
                    script.appendChild(document.createTextNode("window." + id + "=1;"));
                } catch (e) {
                }
                root.insertBefore(script, root.firstChild);
                if (window[id]) {
                    _scriptEval = true;
                    delete window[id];
                } else {
                    _scriptEval = false;
                }
                root.removeChild(script);
                root = script = id = null;
            }
            return _scriptEval;
        };
        try {
            delete div.test;
        } catch (e) {
            jQuery.support.deleteExpando = false;
        }
        if (!div.addEventListener && div.attachEvent && div.fireEvent) {
            div.attachEvent("onclick", function click() {
                jQuery.support.noCloneEvent = false;
                div.detachEvent("onclick", click);
            });
            div.cloneNode(true).fireEvent("onclick");
        }
        div = document.createElement("div");
        div.innerHTML = "<input type='radio' name='radiotest' checked='checked'/>";
        var fragment = document.createDocumentFragment();
        fragment.appendChild(div.firstChild);
        jQuery.support.checkClone = fragment.cloneNode(true).cloneNode(true).lastChild.checked;
        jQuery(function () {
            var div = document.createElement("div"), body = document.getElementsByTagName("body")[0];
            if (!body) {
                return;
            }
            div.style.width = div.style.paddingLeft = "1px";
            body.appendChild(div);
            jQuery.boxModel = jQuery.support.boxModel = div.offsetWidth === 2;
            if ("zoom"in div.style) {
                div.style.display = "inline";
                div.style.zoom = 1;
                jQuery.support.inlineBlockNeedsLayout = div.offsetWidth === 2;
                div.style.display = "";
                div.innerHTML = "<div style='width:4px;'></div>";
                jQuery.support.shrinkWrapBlocks = div.offsetWidth !== 2;
            }
            div.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>";
            var tds = div.getElementsByTagName("td");
            jQuery.support.reliableHiddenOffsets = tds[0].offsetHeight === 0;
            tds[0].style.display = "";
            tds[1].style.display = "none";
            jQuery.support.reliableHiddenOffsets = jQuery.support.reliableHiddenOffsets && tds[0].offsetHeight === 0;
            div.innerHTML = "";
            body.removeChild(div).style.display = "none";
            div = tds = null;
        });
        var eventSupported = function (eventName) {
            var el = document.createElement("div");
            eventName = "on" + eventName;
            if (!el.attachEvent) {
                return true;
            }
            var isSupported = (eventName in el);
            if (!isSupported) {
                el.setAttribute(eventName, "return;");
                isSupported = typeof el[eventName] === "function";
            }
            el = null;
            return isSupported;
        };
        jQuery.support.submitBubbles = eventSupported("submit");
        jQuery.support.changeBubbles = eventSupported("change");
        div = all = a = null;
    })();
    var rbrace = /^(?:\{.*\}|\[.*\])$/;
    jQuery.extend({
        cache: {},
        uuid: 0,
        expando: "jQuery" + (jQuery.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {"embed": true, "object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000", "applet": true},
        hasData: function (elem) {
            elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando];
            return !!elem && !isEmptyDataObject(elem);
        },
        data: function (elem, name, data, pvt) {
            if (!jQuery.acceptData(elem)) {
                return;
            }
            var internalKey = jQuery.expando, getByName = typeof name === "string", thisCache, isNode = elem.nodeType, cache = isNode ? jQuery.cache : elem, id = isNode ? elem[jQuery.expando] : elem[jQuery.expando] && jQuery.expando;
            if ((!id || (pvt && id && !cache[id][internalKey])) && getByName && data === undefined) {
                return;
            }
            if (!id) {
                if (isNode) {
                    elem[jQuery.expando] = id = ++jQuery.uuid;
                } else {
                    id = jQuery.expando;
                }
            }
            if (!cache[id]) {
                cache[id] = {};
                if (!isNode) {
                    cache[id].toJSON = jQuery.noop;
                }
            }
            if (typeof name === "object" || typeof name === "function") {
                if (pvt) {
                    cache[id][internalKey] = jQuery.extend(cache[id][internalKey], name);
                } else {
                    cache[id] = jQuery.extend(cache[id], name);
                }
            }
            thisCache = cache[id];
            if (pvt) {
                if (!thisCache[internalKey]) {
                    thisCache[internalKey] = {};
                }
                thisCache = thisCache[internalKey];
            }
            if (data !== undefined) {
                thisCache[name] = data;
            }
            if (name === "events" && !thisCache[name]) {
                return thisCache[internalKey] && thisCache[internalKey].events;
            }
            return getByName ? thisCache[name] : thisCache;
        },
        removeData: function (elem, name, pvt) {
            if (!jQuery.acceptData(elem)) {
                return;
            }
            var internalKey = jQuery.expando, isNode = elem.nodeType, cache = isNode ? jQuery.cache : elem, id = isNode ? elem[jQuery.expando] : jQuery.expando;
            if (!cache[id]) {
                return;
            }
            if (name) {
                var thisCache = pvt ? cache[id][internalKey] : cache[id];
                if (thisCache) {
                    delete thisCache[name];
                    if (!isEmptyDataObject(thisCache)) {
                        return;
                    }
                }
            }
            if (pvt) {
                delete cache[id][internalKey];
                if (!isEmptyDataObject(cache[id])) {
                    return;
                }
            }
            var internalCache = cache[id][internalKey];
            if (jQuery.support.deleteExpando || cache != window) {
                delete cache[id];
            } else {
                cache[id] = null;
            }
            if (internalCache) {
                cache[id] = {};
                if (!isNode) {
                    cache[id].toJSON = jQuery.noop;
                }
                cache[id][internalKey] = internalCache;
            } else if (isNode) {
                if (jQuery.support.deleteExpando) {
                    delete elem[jQuery.expando];
                } else if (elem.removeAttribute) {
                    elem.removeAttribute(jQuery.expando);
                } else {
                    elem[jQuery.expando] = null;
                }
            }
        },
        _data: function (elem, name, data) {
            return jQuery.data(elem, name, data, true);
        },
        acceptData: function (elem) {
            if (elem.nodeName) {
                var match = jQuery.noData[elem.nodeName.toLowerCase()];
                if (match) {
                    return !(match === true || elem.getAttribute("classid") !== match);
                }
            }
            return true;
        }
    });
    jQuery.fn.extend({
        data: function (key, value) {
            var data = null;
            if (typeof key === "undefined") {
                if (this.length) {
                    data = jQuery.data(this[0]);
                    if (this[0].nodeType === 1) {
                        var attr = this[0].attributes, name;
                        for (var i = 0, l = attr.length; i < l; i++) {
                            name = attr[i].name;
                            if (name.indexOf("data-") === 0) {
                                name = name.substr(5);
                                dataAttr(this[0], name, data[name]);
                            }
                        }
                    }
                }
                return data;
            } else if (typeof key === "object") {
                return this.each(function () {
                    jQuery.data(this, key);
                });
            }
            var parts = key.split(".");
            parts[1] = parts[1] ? "." + parts[1] : "";
            if (value === undefined) {
                data = this.triggerHandler("getData" + parts[1] + "!", [parts[0]]);
                if (data === undefined && this.length) {
                    data = jQuery.data(this[0], key);
                    data = dataAttr(this[0], key, data);
                }
                return data === undefined && parts[1] ? this.data(parts[0]) : data;
            } else {
                return this.each(function () {
                    var $this = jQuery(this), args = [parts[0], value];
                    $this.triggerHandler("setData" + parts[1] + "!", args);
                    jQuery.data(this, key, value);
                    $this.triggerHandler("changeData" + parts[1] + "!", args);
                });
            }
        }, removeData: function (key) {
            return this.each(function () {
                jQuery.removeData(this, key);
            });
        }
    });
    function dataAttr(elem, key, data) {
        if (data === undefined && elem.nodeType === 1) {
            data = elem.getAttribute("data-" + key);
            if (typeof data === "string") {
                try {
                    data = data === "true" ? true : data === "false" ? false : data === "null" ? null : !jQuery.isNaN(data) ? parseFloat(data) : rbrace.test(data) ? jQuery.parseJSON(data) : data;
                } catch (e) {
                }
                jQuery.data(elem, key, data);
            } else {
                data = undefined;
            }
        }
        return data;
    }

    function isEmptyDataObject(obj) {
        for (var name in obj) {
            if (name !== "toJSON") {
                return false;
            }
        }
        return true;
    }

    jQuery.extend({
        queue: function (elem, type, data) {
            if (!elem) {
                return;
            }
            type = (type || "fx") + "queue";
            var q = jQuery._data(elem, type);
            if (!data) {
                return q || [];
            }
            if (!q || jQuery.isArray(data)) {
                q = jQuery._data(elem, type, jQuery.makeArray(data));
            } else {
                q.push(data);
            }
            return q;
        }, dequeue: function (elem, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem, type), fn = queue.shift();
            if (fn === "inprogress") {
                fn = queue.shift();
            }
            if (fn) {
                if (type === "fx") {
                    queue.unshift("inprogress");
                }
                fn.call(elem, function () {
                    jQuery.dequeue(elem, type);
                });
            }
            if (!queue.length) {
                jQuery.removeData(elem, type + "queue", true);
            }
        }
    });
    jQuery.fn.extend({
        queue: function (type, data) {
            if (typeof type !== "string") {
                data = type;
                type = "fx";
            }
            if (data === undefined) {
                return jQuery.queue(this[0], type);
            }
            return this.each(function (i) {
                var queue = jQuery.queue(this, type, data);
                if (type === "fx" && queue[0] !== "inprogress") {
                    jQuery.dequeue(this, type);
                }
            });
        }, dequeue: function (type) {
            return this.each(function () {
                jQuery.dequeue(this, type);
            });
        }, delay: function (time, type) {
            time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
            type = type || "fx";
            return this.queue(type, function () {
                var elem = this;
                setTimeout(function () {
                    jQuery.dequeue(elem, type);
                }, time);
            });
        }, clearQueue: function (type) {
            return this.queue(type || "fx", []);
        }
    });
    var rclass = /[\n\t\r]/g, rspaces = /\s+/, rreturn = /\r/g, rspecialurl = /^(?:href|src|style)$/, rtype = /^(?:button|input)$/i, rfocusable = /^(?:button|input|object|select|textarea)$/i, rclickable = /^a(?:rea)?$/i, rradiocheck = /^(?:radio|checkbox)$/i;
    jQuery.props = {
        "for": "htmlFor",
        "class": "className",
        readonly: "readOnly",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        rowspan: "rowSpan",
        colspan: "colSpan",
        tabindex: "tabIndex",
        usemap: "useMap",
        frameborder: "frameBorder"
    };
    jQuery.fn.extend({
        attr: function (name, value) {
            return jQuery.access(this, name, value, true, jQuery.attr);
        }, removeAttr: function (name, fn) {
            return this.each(function () {
                jQuery.attr(this, name, "");
                if (this.nodeType === 1) {
                    this.removeAttribute(name);
                }
            });
        }, addClass: function (value) {
            if (jQuery.isFunction(value)) {
                return this.each(function (i) {
                    var self = jQuery(this);
                    self.addClass(value.call(this, i, self.attr("class")));
                });
            }
            if (value && typeof value === "string") {
                var classNames = (value || "").split(rspaces);
                for (var i = 0, l = this.length; i < l; i++) {
                    var elem = this[i];
                    if (elem.nodeType === 1) {
                        if (!elem.className) {
                            elem.className = value;
                        } else {
                            var className = " " + elem.className + " ", setClass = elem.className;
                            for (var c = 0, cl = classNames.length; c < cl; c++) {
                                if (className.indexOf(" " + classNames[c] + " ") < 0) {
                                    setClass += " " + classNames[c];
                                }
                            }
                            elem.className = jQuery.trim(setClass);
                        }
                    }
                }
            }
            return this;
        }, removeClass: function (value) {
            if (jQuery.isFunction(value)) {
                return this.each(function (i) {
                    var self = jQuery(this);
                    self.removeClass(value.call(this, i, self.attr("class")));
                });
            }
            if ((value && typeof value === "string") || value === undefined) {
                var classNames = (value || "").split(rspaces);
                for (var i = 0, l = this.length; i < l; i++) {
                    var elem = this[i];
                    if (elem.nodeType === 1 && elem.className) {
                        if (value) {
                            var className = (" " + elem.className + " ").replace(rclass, " ");
                            for (var c = 0, cl = classNames.length; c < cl; c++) {
                                className = className.replace(" " + classNames[c] + " ", " ");
                            }
                            elem.className = jQuery.trim(className);
                        } else {
                            elem.className = "";
                        }
                    }
                }
            }
            return this;
        }, toggleClass: function (value, stateVal) {
            var type = typeof value, isBool = typeof stateVal === "boolean";
            if (jQuery.isFunction(value)) {
                return this.each(function (i) {
                    var self = jQuery(this);
                    self.toggleClass(value.call(this, i, self.attr("class"), stateVal), stateVal);
                });
            }
            return this.each(function () {
                if (type === "string") {
                    var className, i = 0, self = jQuery(this), state = stateVal, classNames = value.split(rspaces);
                    while ((className = classNames[i++])) {
                        state = isBool ? state : !self.hasClass(className);
                        self[state ? "addClass" : "removeClass"](className);
                    }
                } else if (type === "undefined" || type === "boolean") {
                    if (this.className) {
                        jQuery._data(this, "__className__", this.className);
                    }
                    this.className = this.className || value === false ? "" : jQuery._data(this, "__className__") || "";
                }
            });
        }, hasClass: function (selector) {
            var className = " " + selector + " ";
            for (var i = 0, l = this.length; i < l; i++) {
                if ((" " + this[i].className + " ").replace(rclass, " ").indexOf(className) > -1) {
                    return true;
                }
            }
            return false;
        }, val: function (value) {
            if (!arguments.length) {
                var elem = this[0];
                if (elem) {
                    if (jQuery.nodeName(elem, "option")) {
                        var val = elem.attributes.value;
                        return !val || val.specified ? elem.value : elem.text;
                    }
                    if (jQuery.nodeName(elem, "select")) {
                        var index = elem.selectedIndex, values = [], options = elem.options, one = elem.type === "select-one";
                        if (index < 0) {
                            return null;
                        }
                        for (var i = one ? index : 0, max = one ? index + 1 : options.length; i < max; i++) {
                            var option = options[i];
                            if (option.selected && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
                                value = jQuery(option).val();
                                if (one) {
                                    return value;
                                }
                                values.push(value);
                            }
                        }
                        if (one && !values.length && options.length) {
                            return jQuery(options[index]).val();
                        }
                        return values;
                    }
                    if (rradiocheck.test(elem.type) && !jQuery.support.checkOn) {
                        return elem.getAttribute("value") === null ? "on" : elem.value;
                    }
                    return (elem.value || "").replace(rreturn, "");
                }
                return undefined;
            }
            var isFunction = jQuery.isFunction(value);
            return this.each(function (i) {
                var self = jQuery(this), val = value;
                if (this.nodeType !== 1) {
                    return;
                }
                if (isFunction) {
                    val = value.call(this, i, self.val());
                }
                if (val == null) {
                    val = "";
                } else if (typeof val === "number") {
                    val += "";
                } else if (jQuery.isArray(val)) {
                    val = jQuery.map(val, function (value) {
                        return value == null ? "" : value + "";
                    });
                }
                if (jQuery.isArray(val) && rradiocheck.test(this.type)) {
                    this.checked = jQuery.inArray(self.val(), val) >= 0;
                } else if (jQuery.nodeName(this, "select")) {
                    var values = jQuery.makeArray(val);
                    jQuery("option", this).each(function () {
                        this.selected = jQuery.inArray(jQuery(this).val(), values) >= 0;
                    });
                    if (!values.length) {
                        this.selectedIndex = -1;
                    }
                } else {
                    this.value = val;
                }
            });
        }
    });
    jQuery.extend({
        attrFn: {val: true, css: true, html: true, text: true, data: true, width: true, height: true, offset: true},
        attr: function (elem, name, value, pass) {
            if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || elem.nodeType === 2) {
                return undefined;
            }
            if (pass && name in jQuery.attrFn) {
                return jQuery(elem)[name](value);
            }
            var notxml = elem.nodeType !== 1 || !jQuery.isXMLDoc(elem), set = value !== undefined;
            name = notxml && jQuery.props[name] || name;
            if (elem.nodeType === 1) {
                var special = rspecialurl.test(name);
                if (name === "selected" && !jQuery.support.optSelected) {
                    var parent = elem.parentNode;
                    if (parent) {
                        parent.selectedIndex;
                        if (parent.parentNode) {
                            parent.parentNode.selectedIndex;
                        }
                    }
                }
                if ((name in elem || elem[name] !== undefined) && notxml && !special) {
                    if (set) {
                        if (name === "type" && rtype.test(elem.nodeName) && elem.parentNode) {
                            jQuery.error("type property can't be changed");
                        }
                        if (value === null) {
                            if (elem.nodeType === 1) {
                                elem.removeAttribute(name);
                            }
                        } else {
                            elem[name] = value;
                        }
                    }
                    if (jQuery.nodeName(elem, "form") && elem.getAttributeNode(name)) {
                        return elem.getAttributeNode(name).nodeValue;
                    }
                    if (name === "tabIndex") {
                        var attributeNode = elem.getAttributeNode("tabIndex");
                        return attributeNode && attributeNode.specified ? attributeNode.value : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : undefined;
                    }
                    return elem[name];
                }
                if (!jQuery.support.style && notxml && name === "style") {
                    if (set) {
                        elem.style.cssText = "" + value;
                    }
                    return elem.style.cssText;
                }
                if (set) {
                    elem.setAttribute(name, "" + value);
                }
                if (!elem.attributes[name] && (elem.hasAttribute && !elem.hasAttribute(name))) {
                    return undefined;
                }
                var attr = !jQuery.support.hrefNormalized && notxml && special ? elem.getAttribute(name, 2) : elem.getAttribute(name);
                return attr === null ? undefined : attr;
            }
            if (set) {
                elem[name] = value;
            }
            return elem[name];
        }
    });
    var rnamespaces = /\.(.*)$/, rformElems = /^(?:textarea|input|select)$/i, rperiod = /\./g, rspace = / /g, rescape = /[^\w\s.|`]/g, fcleanup = function (nm) {
        return nm.replace(rescape, "\\$&");
    };
    jQuery.event = {
        add: function (elem, types, handler, data) {
            if (elem.nodeType === 3 || elem.nodeType === 8) {
                return;
            }
            try {
                if (jQuery.isWindow(elem) && (elem !== window && !elem.frameElement)) {
                    elem = window;
                }
            }
            catch (e) {
            }
            if (handler === false) {
                handler = returnFalse;
            } else if (!handler) {
                return;
            }
            var handleObjIn, handleObj;
            if (handler.handler) {
                handleObjIn = handler;
                handler = handleObjIn.handler;
            }
            if (!handler.guid) {
                handler.guid = jQuery.guid++;
            }
            var elemData = jQuery._data(elem);
            if (!elemData) {
                return;
            }
            var events = elemData.events, eventHandle = elemData.handle;
            if (!events) {
                elemData.events = events = {};
            }
            if (!eventHandle) {
                elemData.handle = eventHandle = function () {
                    return typeof jQuery !== "undefined" && !jQuery.event.triggered ? jQuery.event.handle.apply(eventHandle.elem, arguments) : undefined;
                };
            }
            eventHandle.elem = elem;
            types = types.split(" ");
            var type, i = 0, namespaces;
            while ((type = types[i++])) {
                handleObj = handleObjIn ? jQuery.extend({}, handleObjIn) : {handler: handler, data: data};
                if (type.indexOf(".") > -1) {
                    namespaces = type.split(".");
                    type = namespaces.shift();
                    handleObj.namespace = namespaces.slice(0).sort().join(".");
                } else {
                    namespaces = [];
                    handleObj.namespace = "";
                }
                handleObj.type = type;
                if (!handleObj.guid) {
                    handleObj.guid = handler.guid;
                }
                var handlers = events[type], special = jQuery.event.special[type] || {};
                if (!handlers) {
                    handlers = events[type] = [];
                    if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
                        if (elem.addEventListener) {
                            elem.addEventListener(type, eventHandle, false);
                        } else if (elem.attachEvent) {
                            elem.attachEvent("on" + type, eventHandle);
                        }
                    }
                }
                if (special.add) {
                    special.add.call(elem, handleObj);
                    if (!handleObj.handler.guid) {
                        handleObj.handler.guid = handler.guid;
                    }
                }
                handlers.push(handleObj);
                jQuery.event.global[type] = true;
            }
            elem = null;
        },
        global: {},
        remove: function (elem, types, handler, pos) {
            if (elem.nodeType === 3 || elem.nodeType === 8) {
                return;
            }
            if (handler === false) {
                handler = returnFalse;
            }
            var ret, type, fn, j, i = 0, all, namespaces, namespace, special, eventType, handleObj, origType, elemData = jQuery.hasData(elem) && jQuery._data(elem), events = elemData && elemData.events;
            if (!elemData || !events) {
                return;
            }
            if (types && types.type) {
                handler = types.handler;
                types = types.type;
            }
            if (!types || typeof types === "string" && types.charAt(0) === ".") {
                types = types || "";
                for (type in events) {
                    jQuery.event.remove(elem, type + types);
                }
                return;
            }
            types = types.split(" ");
            while ((type = types[i++])) {
                origType = type;
                handleObj = null;
                all = type.indexOf(".") < 0;
                namespaces = [];
                if (!all) {
                    namespaces = type.split(".");
                    type = namespaces.shift();
                    namespace = new RegExp("(^|\\.)" +
                    jQuery.map(namespaces.slice(0).sort(), fcleanup).join("\\.(?:.*\\.)?") + "(\\.|$)");
                }
                eventType = events[type];
                if (!eventType) {
                    continue;
                }
                if (!handler) {
                    for (j = 0; j < eventType.length; j++) {
                        handleObj = eventType[j];
                        if (all || namespace.test(handleObj.namespace)) {
                            jQuery.event.remove(elem, origType, handleObj.handler, j);
                            eventType.splice(j--, 1);
                        }
                    }
                    continue;
                }
                special = jQuery.event.special[type] || {};
                for (j = pos || 0; j < eventType.length; j++) {
                    handleObj = eventType[j];
                    if (handler.guid === handleObj.guid) {
                        if (all || namespace.test(handleObj.namespace)) {
                            if (pos == null) {
                                eventType.splice(j--, 1);
                            }
                            if (special.remove) {
                                special.remove.call(elem, handleObj);
                            }
                        }
                        if (pos != null) {
                            break;
                        }
                    }
                }
                if (eventType.length === 0 || pos != null && eventType.length === 1) {
                    if (!special.teardown || special.teardown.call(elem, namespaces) === false) {
                        jQuery.removeEvent(elem, type, elemData.handle);
                    }
                    ret = null;
                    delete events[type];
                }
            }
            if (jQuery.isEmptyObject(events)) {
                var handle = elemData.handle;
                if (handle) {
                    handle.elem = null;
                }
                delete elemData.events;
                delete elemData.handle;
                if (jQuery.isEmptyObject(elemData)) {
                    jQuery.removeData(elem, undefined, true);
                }
            }
        },
        trigger: function (event, data, elem) {
            var type = event.type || event, bubbling = arguments[3];
            if (!bubbling) {
                event = typeof event === "object" ? event[jQuery.expando] ? event : jQuery.extend(jQuery.Event(type), event) : jQuery.Event(type);
                if (type.indexOf("!") >= 0) {
                    event.type = type = type.slice(0, -1);
                    event.exclusive = true;
                }
                if (!elem) {
                    event.stopPropagation();
                    if (jQuery.event.global[type]) {
                        jQuery.each(jQuery.cache, function () {
                            var internalKey = jQuery.expando, internalCache = this[internalKey];
                            if (internalCache && internalCache.events && internalCache.events[type]) {
                                jQuery.event.trigger(event, data, internalCache.handle.elem);
                            }
                        });
                    }
                }
                if (!elem || elem.nodeType === 3 || elem.nodeType === 8) {
                    return undefined;
                }
                event.result = undefined;
                event.target = elem;
                data = jQuery.makeArray(data);
                data.unshift(event);
            }
            event.currentTarget = elem;
            var handle = jQuery._data(elem, "handle");
            if (handle) {
                handle.apply(elem, data);
            }
            var parent = elem.parentNode || elem.ownerDocument;
            try {
                if (!(elem && elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()])) {
                    if (elem["on" + type] && elem["on" + type].apply(elem, data) === false) {
                        event.result = false;
                        event.preventDefault();
                    }
                }
            } catch (inlineError) {
            }
            if (!event.isPropagationStopped() && parent) {
                jQuery.event.trigger(event, data, parent, true);
            } else if (!event.isDefaultPrevented()) {
                var old, target = event.target, targetType = type.replace(rnamespaces, ""), isClick = jQuery.nodeName(target, "a") && targetType === "click", special = jQuery.event.special[targetType] || {};
                if ((!special._default || special._default.call(elem, event) === false) && !isClick && !(target && target.nodeName && jQuery.noData[target.nodeName.toLowerCase()])) {
                    try {
                        if (target[targetType]) {
                            old = target["on" + targetType];
                            if (old) {
                                target["on" + targetType] = null;
                            }
                            jQuery.event.triggered = true;
                            target[targetType]();
                        }
                    } catch (triggerError) {
                    }
                    if (old) {
                        target["on" + targetType] = old;
                    }
                    jQuery.event.triggered = false;
                }
            }
        },
        handle: function (event) {
            var all, handlers, namespaces, namespace_re, events, namespace_sort = [], args = jQuery.makeArray(arguments);
            event = args[0] = jQuery.event.fix(event || window.event);
            event.currentTarget = this;
            all = event.type.indexOf(".") < 0 && !event.exclusive;
            if (!all) {
                namespaces = event.type.split(".");
                event.type = namespaces.shift();
                namespace_sort = namespaces.slice(0).sort();
                namespace_re = new RegExp("(^|\\.)" + namespace_sort.join("\\.(?:.*\\.)?") + "(\\.|$)");
            }
            event.namespace = event.namespace || namespace_sort.join(".");
            events = jQuery._data(this, "events");
            handlers = (events || {})[event.type];
            if (events && handlers) {
                handlers = handlers.slice(0);
                for (var j = 0, l = handlers.length; j < l; j++) {
                    var handleObj = handlers[j];
                    if (all || namespace_re.test(handleObj.namespace)) {
                        event.handler = handleObj.handler;
                        event.data = handleObj.data;
                        event.handleObj = handleObj;
                        var ret = handleObj.handler.apply(this, args);
                        if (ret !== undefined) {
                            event.result = ret;
                            if (ret === false) {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                        }
                        if (event.isImmediatePropagationStopped()) {
                            break;
                        }
                    }
                }
            }
            return event.result;
        },
        props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
        fix: function (event) {
            if (event[jQuery.expando]) {
                return event;
            }
            var originalEvent = event;
            event = jQuery.Event(originalEvent);
            for (var i = this.props.length, prop; i;) {
                prop = this.props[--i];
                event[prop] = originalEvent[prop];
            }
            if (!event.target) {
                event.target = event.srcElement || document;
            }
            if (event.target.nodeType === 3) {
                event.target = event.target.parentNode;
            }
            if (!event.relatedTarget && event.fromElement) {
                event.relatedTarget = event.fromElement === event.target ? event.toElement : event.fromElement;
            }
            if (event.pageX == null && event.clientX != null) {
                var doc = document.documentElement, body = document.body;
                event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
                event.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
            }
            if (event.which == null && (event.charCode != null || event.keyCode != null)) {
                event.which = event.charCode != null ? event.charCode : event.keyCode;
            }
            if (!event.metaKey && event.ctrlKey) {
                event.metaKey = event.ctrlKey;
            }
            if (!event.which && event.button !== undefined) {
                event.which = (event.button & 1 ? 1 : (event.button & 2 ? 3 : (event.button & 4 ? 2 : 0)));
            }
            return event;
        },
        guid: 1E8,
        proxy: jQuery.proxy,
        special: {
            ready: {setup: jQuery.bindReady, teardown: jQuery.noop}, live: {
                add: function (handleObj) {
                    jQuery.event.add(this, liveConvert(handleObj.origType, handleObj.selector), jQuery.extend({}, handleObj, {
                        handler: liveHandler,
                        guid: handleObj.handler.guid
                    }));
                }, remove: function (handleObj) {
                    jQuery.event.remove(this, liveConvert(handleObj.origType, handleObj.selector), handleObj);
                }
            }, beforeunload: {
                setup: function (data, namespaces, eventHandle) {
                    if (jQuery.isWindow(this)) {
                        this.onbeforeunload = eventHandle;
                    }
                }, teardown: function (namespaces, eventHandle) {
                    if (this.onbeforeunload === eventHandle) {
                        this.onbeforeunload = null;
                    }
                }
            }
        }
    };
    jQuery.removeEvent = document.removeEventListener ? function (elem, type, handle) {
        if (elem.removeEventListener) {
            elem.removeEventListener(type, handle, false);
        }
    } : function (elem, type, handle) {
        if (elem.detachEvent) {
            elem.detachEvent("on" + type, handle);
        }
    };
    jQuery.Event = function (src) {
        if (!this.preventDefault) {
            return new jQuery.Event(src);
        }
        if (src && src.type) {
            this.originalEvent = src;
            this.type = src.type;
            this.isDefaultPrevented = (src.defaultPrevented || src.returnValue === false || src.getPreventDefault && src.getPreventDefault()) ? returnTrue : returnFalse;
        } else {
            this.type = src;
        }
        this.timeStamp = jQuery.now();
        this[jQuery.expando] = true;
    };
    function returnFalse() {
        return false;
    }

    function returnTrue() {
        return true;
    }

    jQuery.Event.prototype = {
        preventDefault: function () {
            this.isDefaultPrevented = returnTrue;
            var e = this.originalEvent;
            if (!e) {
                return;
            }
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;
            }
        },
        stopPropagation: function () {
            this.isPropagationStopped = returnTrue;
            var e = this.originalEvent;
            if (!e) {
                return;
            }
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            e.cancelBubble = true;
        },
        stopImmediatePropagation: function () {
            this.isImmediatePropagationStopped = returnTrue;
            this.stopPropagation();
        },
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse
    };
    var withinElement = function (event) {
        var parent = event.relatedTarget;
        try {
            if (parent !== document && !parent.parentNode) {
                return;
            }
            while (parent && parent !== this) {
                parent = parent.parentNode;
            }
            if (parent !== this) {
                event.type = event.data;
                jQuery.event.handle.apply(this, arguments);
            }
        } catch (e) {
        }
    }, delegate = function (event) {
        event.type = event.data;
        jQuery.event.handle.apply(this, arguments);
    };
    jQuery.each({mouseenter: "mouseover", mouseleave: "mouseout"}, function (orig, fix) {
        jQuery.event.special[orig] = {
            setup: function (data) {
                jQuery.event.add(this, fix, data && data.selector ? delegate : withinElement, orig);
            }, teardown: function (data) {
                jQuery.event.remove(this, fix, data && data.selector ? delegate : withinElement);
            }
        };
    });
    if (!jQuery.support.submitBubbles) {
        jQuery.event.special.submit = {
            setup: function (data, namespaces) {
                if (this.nodeName && this.nodeName.toLowerCase() !== "form") {
                    jQuery.event.add(this, "click.specialSubmit", function (e) {
                        var elem = e.target, type = elem.type;
                        if ((type === "submit" || type === "image") && jQuery(elem).closest("form").length) {
                            trigger("submit", this, arguments);
                        }
                    });
                    jQuery.event.add(this, "keypress.specialSubmit", function (e) {
                        var elem = e.target, type = elem.type;
                        if ((type === "text" || type === "password") && jQuery(elem).closest("form").length && e.keyCode === 13) {
                            trigger("submit", this, arguments);
                        }
                    });
                } else {
                    return false;
                }
            }, teardown: function (namespaces) {
                jQuery.event.remove(this, ".specialSubmit");
            }
        };
    }
    if (!jQuery.support.changeBubbles) {
        var changeFilters, getVal = function (elem) {
            var type = elem.type, val = elem.value;
            if (type === "radio" || type === "checkbox") {
                val = elem.checked;
            } else if (type === "select-multiple") {
                val = elem.selectedIndex > -1 ? jQuery.map(elem.options, function (elem) {
                    return elem.selected;
                }).join("-") : "";
            } else if (elem.nodeName.toLowerCase() === "select") {
                val = elem.selectedIndex;
            }
            return val;
        }, testChange = function testChange(e) {
            var elem = e.target, data, val;
            if (!rformElems.test(elem.nodeName) || elem.readOnly) {
                return;
            }
            data = jQuery._data(elem, "_change_data");
            val = getVal(elem);
            if (e.type !== "focusout" || elem.type !== "radio") {
                jQuery._data(elem, "_change_data", val);
            }
            if (data === undefined || val === data) {
                return;
            }
            if (data != null || val) {
                e.type = "change";
                e.liveFired = undefined;
                jQuery.event.trigger(e, arguments[1], elem);
            }
        };
        jQuery.event.special.change = {
            filters: {
                focusout: testChange, beforedeactivate: testChange, click: function (e) {
                    var elem = e.target, type = elem.type;
                    if (type === "radio" || type === "checkbox" || elem.nodeName.toLowerCase() === "select") {
                        testChange.call(this, e);
                    }
                }, keydown: function (e) {
                    var elem = e.target, type = elem.type;
                    if ((e.keyCode === 13 && elem.nodeName.toLowerCase() !== "textarea") || (e.keyCode === 32 && (type === "checkbox" || type === "radio")) || type === "select-multiple") {
                        testChange.call(this, e);
                    }
                }, beforeactivate: function (e) {
                    var elem = e.target;
                    jQuery._data(elem, "_change_data", getVal(elem));
                }
            }, setup: function (data, namespaces) {
                if (this.type === "file") {
                    return false;
                }
                for (var type in changeFilters) {
                    jQuery.event.add(this, type + ".specialChange", changeFilters[type]);
                }
                return rformElems.test(this.nodeName);
            }, teardown: function (namespaces) {
                jQuery.event.remove(this, ".specialChange");
                return rformElems.test(this.nodeName);
            }
        };
        changeFilters = jQuery.event.special.change.filters;
        changeFilters.focus = changeFilters.beforeactivate;
    }
    function trigger(type, elem, args) {
        var event = jQuery.extend({}, args[0]);
        event.type = type;
        event.originalEvent = {};
        event.liveFired = undefined;
        jQuery.event.handle.call(elem, event);
        if (event.isDefaultPrevented()) {
            args[0].preventDefault();
        }
    }

    if (document.addEventListener) {
        jQuery.each({focus: "focusin", blur: "focusout"}, function (orig, fix) {
            jQuery.event.special[fix] = {
                setup: function () {
                    this.addEventListener(orig, handler, true);
                }, teardown: function () {
                    this.removeEventListener(orig, handler, true);
                }
            };
            function handler(e) {
                e = jQuery.event.fix(e);
                e.type = fix;
                return jQuery.event.handle.call(this, e);
            }
        });
    }
    jQuery.each(["bind", "one"], function (i, name) {
        jQuery.fn[name] = function (type, data, fn) {
            if (typeof type === "object") {
                for (var key in type) {
                    this[name](key, data, type[key], fn);
                }
                return this;
            }
            if (jQuery.isFunction(data) || data === false) {
                fn = data;
                data = undefined;
            }
            var handler = name === "one" ? jQuery.proxy(fn, function (event) {
                jQuery(this).unbind(event, handler);
                return fn.apply(this, arguments);
            }) : fn;
            if (type === "unload" && name !== "one") {
                this.one(type, data, fn);
            } else {
                for (var i = 0, l = this.length; i < l; i++) {
                    jQuery.event.add(this[i], type, handler, data);
                }
            }
            return this;
        };
    });
    jQuery.fn.extend({
        unbind: function (type, fn) {
            if (typeof type === "object" && !type.preventDefault) {
                for (var key in type) {
                    this.unbind(key, type[key]);
                }
            } else {
                for (var i = 0, l = this.length; i < l; i++) {
                    jQuery.event.remove(this[i], type, fn);
                }
            }
            return this;
        }, delegate: function (selector, types, data, fn) {
            return this.live(types, data, fn, selector);
        }, undelegate: function (selector, types, fn) {
            if (arguments.length === 0) {
                return this.unbind("live");
            } else {
                return this.die(types, null, fn, selector);
            }
        }, trigger: function (type, data) {
            return this.each(function () {
                jQuery.event.trigger(type, data, this);
            });
        }, triggerHandler: function (type, data) {
            if (this[0]) {
                var event = jQuery.Event(type);
                event.preventDefault();
                event.stopPropagation();
                jQuery.event.trigger(event, data, this[0]);
                return event.result;
            }
        }, toggle: function (fn) {
            var args = arguments, i = 1;
            while (i < args.length) {
                jQuery.proxy(fn, args[i++]);
            }
            return this.click(jQuery.proxy(fn, function (event) {
                var lastToggle = (jQuery._data(this, "lastToggle" + fn.guid) || 0) % i;
                jQuery._data(this, "lastToggle" + fn.guid, lastToggle + 1);
                event.preventDefault();
                return args[lastToggle].apply(this, arguments) || false;
            }));
        }, hover: function (fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
        }
    });
    var liveMap = {focus: "focusin", blur: "focusout", mouseenter: "mouseover", mouseleave: "mouseout"};
    jQuery.each(["live", "die"], function (i, name) {
        jQuery.fn[name] = function (types, data, fn, origSelector) {
            var type, i = 0, match, namespaces, preType, selector = origSelector || this.selector, context = origSelector ? this : jQuery(this.context);
            if (typeof types === "object" && !types.preventDefault) {
                for (var key in types) {
                    context[name](key, data, types[key], selector);
                }
                return this;
            }
            if (jQuery.isFunction(data)) {
                fn = data;
                data = undefined;
            }
            types = (types || "").split(" ");
            while ((type = types[i++]) != null) {
                match = rnamespaces.exec(type);
                namespaces = "";
                if (match) {
                    namespaces = match[0];
                    type = type.replace(rnamespaces, "");
                }
                if (type === "hover") {
                    types.push("mouseenter" + namespaces, "mouseleave" + namespaces);
                    continue;
                }
                preType = type;
                if (type === "focus" || type === "blur") {
                    types.push(liveMap[type] + namespaces);
                    type = type + namespaces;
                } else {
                    type = (liveMap[type] || type) + namespaces;
                }
                if (name === "live") {
                    for (var j = 0, l = context.length; j < l; j++) {
                        jQuery.event.add(context[j], "live." + liveConvert(type, selector), {
                            data: data,
                            selector: selector,
                            handler: fn,
                            origType: type,
                            origHandler: fn,
                            preType: preType
                        });
                    }
                } else {
                    context.unbind("live." + liveConvert(type, selector), fn);
                }
            }
            return this;
        };
    });
    function liveHandler(event) {
        var stop, maxLevel, related, match, handleObj, elem, j, i, l, data, close, namespace, ret, elems = [], selectors = [], events = jQuery._data(this, "events");
        if (event.liveFired === this || !events || !events.live || event.target.disabled || event.button && event.type === "click") {
            return;
        }
        if (event.namespace) {
            namespace = new RegExp("(^|\\.)" + event.namespace.split(".").join("\\.(?:.*\\.)?") + "(\\.|$)");
        }
        event.liveFired = this;
        var live = events.live.slice(0);
        for (j = 0; j < live.length; j++) {
            handleObj = live[j];
            if (handleObj.origType.replace(rnamespaces, "") === event.type) {
                selectors.push(handleObj.selector);
            } else {
                live.splice(j--, 1);
            }
        }
        match = jQuery(event.target).closest(selectors, event.currentTarget);
        for (i = 0, l = match.length; i < l; i++) {
            close = match[i];
            for (j = 0; j < live.length; j++) {
                handleObj = live[j];
                if (close.selector === handleObj.selector && (!namespace || namespace.test(handleObj.namespace)) && !close.elem.disabled) {
                    elem = close.elem;
                    related = null;
                    if (handleObj.preType === "mouseenter" || handleObj.preType === "mouseleave") {
                        event.type = handleObj.preType;
                        related = jQuery(event.relatedTarget).closest(handleObj.selector)[0];
                    }
                    if (!related || related !== elem) {
                        elems.push({elem: elem, handleObj: handleObj, level: close.level});
                    }
                }
            }
        }
        for (i = 0, l = elems.length; i < l; i++) {
            match = elems[i];
            if (maxLevel && match.level > maxLevel) {
                break;
            }
            event.currentTarget = match.elem;
            event.data = match.handleObj.data;
            event.handleObj = match.handleObj;
            ret = match.handleObj.origHandler.apply(match.elem, arguments);
            if (ret === false || event.isPropagationStopped()) {
                maxLevel = match.level;
                if (ret === false) {
                    stop = false;
                }
                if (event.isImmediatePropagationStopped()) {
                    break;
                }
            }
        }
        return stop;
    }

    function liveConvert(type, selector) {
        return (type && type !== "*" ? type + "." : "") + selector.replace(rperiod, "`").replace(rspace, "&");
    }

    jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error").split(" "), function (i, name) {
        jQuery.fn[name] = function (data, fn) {
            if (fn == null) {
                fn = data;
                data = null;
            }
            return arguments.length > 0 ? this.bind(name, data, fn) : this.trigger(name);
        };
        if (jQuery.attrFn) {
            jQuery.attrFn[name] = true;
        }
    });
    (function () {
        var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g, done = 0, toString = Object.prototype.toString, hasDuplicate = false, baseHasDuplicate = true, rBackslash = /\\/g, rNonWord = /\W/;
        [0, 0].sort(function () {
            baseHasDuplicate = false;
            return 0;
        });
        var Sizzle = function (selector, context, results, seed) {
            results = results || [];
            context = context || document;
            var origContext = context;
            if (context.nodeType !== 1 && context.nodeType !== 9) {
                return [];
            }
            if (!selector || typeof selector !== "string") {
                return results;
            }
            var m, set, checkSet, extra, ret, cur, pop, i, prune = true, contextXML = Sizzle.isXML(context), parts = [], soFar = selector;
            do {
                chunker.exec("");
                m = chunker.exec(soFar);
                if (m) {
                    soFar = m[3];
                    parts.push(m[1]);
                    if (m[2]) {
                        extra = m[3];
                        break;
                    }
                }
            } while (m);
            if (parts.length > 1 && origPOS.exec(selector)) {
                if (parts.length === 2 && Expr.relative[parts[0]]) {
                    set = posProcess(parts[0] + parts[1], context);
                } else {
                    set = Expr.relative[parts[0]] ? [context] : Sizzle(parts.shift(), context);
                    while (parts.length) {
                        selector = parts.shift();
                        if (Expr.relative[selector]) {
                            selector += parts.shift();
                        }
                        set = posProcess(selector, set);
                    }
                }
            } else {
                if (!seed && parts.length > 1 && context.nodeType === 9 && !contextXML && Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1])) {
                    ret = Sizzle.find(parts.shift(), context, contextXML);
                    context = ret.expr ? Sizzle.filter(ret.expr, ret.set)[0] : ret.set[0];
                }
                if (context) {
                    ret = seed ? {
                        expr: parts.pop(),
                        set: makeArray(seed)
                    } : Sizzle.find(parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML);
                    set = ret.expr ? Sizzle.filter(ret.expr, ret.set) : ret.set;
                    if (parts.length > 0) {
                        checkSet = makeArray(set);
                    } else {
                        prune = false;
                    }
                    while (parts.length) {
                        cur = parts.pop();
                        pop = cur;
                        if (!Expr.relative[cur]) {
                            cur = "";
                        } else {
                            pop = parts.pop();
                        }
                        if (pop == null) {
                            pop = context;
                        }
                        Expr.relative[cur](checkSet, pop, contextXML);
                    }
                } else {
                    checkSet = parts = [];
                }
            }
            if (!checkSet) {
                checkSet = set;
            }
            if (!checkSet) {
                Sizzle.error(cur || selector);
            }
            if (toString.call(checkSet) === "[object Array]") {
                if (!prune) {
                    results.push.apply(results, checkSet);
                } else if (context && context.nodeType === 1) {
                    for (i = 0; checkSet[i] != null; i++) {
                        if (checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && Sizzle.contains(context, checkSet[i]))) {
                            results.push(set[i]);
                        }
                    }
                } else {
                    for (i = 0; checkSet[i] != null; i++) {
                        if (checkSet[i] && checkSet[i].nodeType === 1) {
                            results.push(set[i]);
                        }
                    }
                }
            } else {
                makeArray(checkSet, results);
            }
            if (extra) {
                Sizzle(extra, origContext, results, seed);
                Sizzle.uniqueSort(results);
            }
            return results;
        };
        Sizzle.uniqueSort = function (results) {
            if (sortOrder) {
                hasDuplicate = baseHasDuplicate;
                results.sort(sortOrder);
                if (hasDuplicate) {
                    for (var i = 1; i < results.length; i++) {
                        if (results[i] === results[i - 1]) {
                            results.splice(i--, 1);
                        }
                    }
                }
            }
            return results;
        };
        Sizzle.matches = function (expr, set) {
            return Sizzle(expr, null, null, set);
        };
        Sizzle.matchesSelector = function (node, expr) {
            return Sizzle(expr, null, null, [node]).length > 0;
        };
        Sizzle.find = function (expr, context, isXML) {
            var set;
            if (!expr) {
                return [];
            }
            for (var i = 0, l = Expr.order.length; i < l; i++) {
                var match, type = Expr.order[i];
                if ((match = Expr.leftMatch[type].exec(expr))) {
                    var left = match[1];
                    match.splice(1, 1);
                    if (left.substr(left.length - 1) !== "\\") {
                        match[1] = (match[1] || "").replace(rBackslash, "");
                        set = Expr.find[type](match, context, isXML);
                        if (set != null) {
                            expr = expr.replace(Expr.match[type], "");
                            break;
                        }
                    }
                }
            }
            if (!set) {
                set = typeof context.getElementsByTagName !== "undefined" ? context.getElementsByTagName("*") : [];
            }
            return {set: set, expr: expr};
        };
        Sizzle.filter = function (expr, set, inplace, not) {
            var match, anyFound, old = expr, result = [], curLoop = set, isXMLFilter = set && set[0] && Sizzle.isXML(set[0]);
            while (expr && set.length) {
                for (var type in Expr.filter) {
                    if ((match = Expr.leftMatch[type].exec(expr)) != null && match[2]) {
                        var found, item, filter = Expr.filter[type], left = match[1];
                        anyFound = false;
                        match.splice(1, 1);
                        if (left.substr(left.length - 1) === "\\") {
                            continue;
                        }
                        if (curLoop === result) {
                            result = [];
                        }
                        if (Expr.preFilter[type]) {
                            match = Expr.preFilter[type](match, curLoop, inplace, result, not, isXMLFilter);
                            if (!match) {
                                anyFound = found = true;
                            } else if (match === true) {
                                continue;
                            }
                        }
                        if (match) {
                            for (var i = 0; (item = curLoop[i]) != null; i++) {
                                if (item) {
                                    found = filter(item, match, i, curLoop);
                                    var pass = not ^ !!found;
                                    if (inplace && found != null) {
                                        if (pass) {
                                            anyFound = true;
                                        } else {
                                            curLoop[i] = false;
                                        }
                                    } else if (pass) {
                                        result.push(item);
                                        anyFound = true;
                                    }
                                }
                            }
                        }
                        if (found !== undefined) {
                            if (!inplace) {
                                curLoop = result;
                            }
                            expr = expr.replace(Expr.match[type], "");
                            if (!anyFound) {
                                return [];
                            }
                            break;
                        }
                    }
                }
                if (expr === old) {
                    if (anyFound == null) {
                        Sizzle.error(expr);
                    } else {
                        break;
                    }
                }
                old = expr;
            }
            return curLoop;
        };
        Sizzle.error = function (msg) {
            throw"Syntax error, unrecognized expression: " + msg;
        };
        var Expr = Sizzle.selectors = {
            order: ["ID", "NAME", "TAG"],
            match: {
                ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
                TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
                POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
            },
            leftMatch: {},
            attrMap: {"class": "className", "for": "htmlFor"},
            attrHandle: {
                href: function (elem) {
                    return elem.getAttribute("href");
                }, type: function (elem) {
                    return elem.getAttribute("type");
                }
            },
            relative: {
                "+": function (checkSet, part) {
                    var isPartStr = typeof part === "string", isTag = isPartStr && !rNonWord.test(part), isPartStrNotTag = isPartStr && !isTag;
                    if (isTag) {
                        part = part.toLowerCase();
                    }
                    for (var i = 0, l = checkSet.length, elem; i < l; i++) {
                        if ((elem = checkSet[i])) {
                            while ((elem = elem.previousSibling) && elem.nodeType !== 1) {
                            }
                            checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ? elem || false : elem === part;
                        }
                    }
                    if (isPartStrNotTag) {
                        Sizzle.filter(part, checkSet, true);
                    }
                }, ">": function (checkSet, part) {
                    var elem, isPartStr = typeof part === "string", i = 0, l = checkSet.length;
                    if (isPartStr && !rNonWord.test(part)) {
                        part = part.toLowerCase();
                        for (; i < l; i++) {
                            elem = checkSet[i];
                            if (elem) {
                                var parent = elem.parentNode;
                                checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false;
                            }
                        }
                    } else {
                        for (; i < l; i++) {
                            elem = checkSet[i];
                            if (elem) {
                                checkSet[i] = isPartStr ? elem.parentNode : elem.parentNode === part;
                            }
                        }
                        if (isPartStr) {
                            Sizzle.filter(part, checkSet, true);
                        }
                    }
                }, "": function (checkSet, part, isXML) {
                    var nodeCheck, doneName = done++, checkFn = dirCheck;
                    if (typeof part === "string" && !rNonWord.test(part)) {
                        part = part.toLowerCase();
                        nodeCheck = part;
                        checkFn = dirNodeCheck;
                    }
                    checkFn("parentNode", part, doneName, checkSet, nodeCheck, isXML);
                }, "~": function (checkSet, part, isXML) {
                    var nodeCheck, doneName = done++, checkFn = dirCheck;
                    if (typeof part === "string" && !rNonWord.test(part)) {
                        part = part.toLowerCase();
                        nodeCheck = part;
                        checkFn = dirNodeCheck;
                    }
                    checkFn("previousSibling", part, doneName, checkSet, nodeCheck, isXML);
                }
            },
            find: {
                ID: function (match, context, isXML) {
                    if (typeof context.getElementById !== "undefined" && !isXML) {
                        var m = context.getElementById(match[1]);
                        return m && m.parentNode ? [m] : [];
                    }
                }, NAME: function (match, context) {
                    if (typeof context.getElementsByName !== "undefined") {
                        var ret = [], results = context.getElementsByName(match[1]);
                        for (var i = 0, l = results.length; i < l; i++) {
                            if (results[i].getAttribute("name") === match[1]) {
                                ret.push(results[i]);
                            }
                        }
                        return ret.length === 0 ? null : ret;
                    }
                }, TAG: function (match, context) {
                    if (typeof context.getElementsByTagName !== "undefined") {
                        return context.getElementsByTagName(match[1]);
                    }
                }
            },
            preFilter: {
                CLASS: function (match, curLoop, inplace, result, not, isXML) {
                    match = " " + match[1].replace(rBackslash, "") + " ";
                    if (isXML) {
                        return match;
                    }
                    for (var i = 0, elem; (elem = curLoop[i]) != null; i++) {
                        if (elem) {
                            if (not ^ (elem.className && (" " + elem.className + " ").replace(/[\t\n\r]/g, " ").indexOf(match) >= 0)) {
                                if (!inplace) {
                                    result.push(elem);
                                }
                            } else if (inplace) {
                                curLoop[i] = false;
                            }
                        }
                    }
                    return false;
                }, ID: function (match) {
                    return match[1].replace(rBackslash, "");
                }, TAG: function (match, curLoop) {
                    return match[1].replace(rBackslash, "").toLowerCase();
                }, CHILD: function (match) {
                    if (match[1] === "nth") {
                        if (!match[2]) {
                            Sizzle.error(match[0]);
                        }
                        match[2] = match[2].replace(/^\+|\s*/g, '');
                        var test = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" || !/\D/.test(match[2]) && "0n+" + match[2] || match[2]);
                        match[2] = (test[1] + (test[2] || 1)) - 0;
                        match[3] = test[3] - 0;
                    }
                    else if (match[2]) {
                        Sizzle.error(match[0]);
                    }
                    match[0] = done++;
                    return match;
                }, ATTR: function (match, curLoop, inplace, result, not, isXML) {
                    var name = match[1] = match[1].replace(rBackslash, "");
                    if (!isXML && Expr.attrMap[name]) {
                        match[1] = Expr.attrMap[name];
                    }
                    match[4] = (match[4] || match[5] || "").replace(rBackslash, "");
                    if (match[2] === "~=") {
                        match[4] = " " + match[4] + " ";
                    }
                    return match;
                }, PSEUDO: function (match, curLoop, inplace, result, not) {
                    if (match[1] === "not") {
                        if ((chunker.exec(match[3]) || "").length > 1 || /^\w/.test(match[3])) {
                            match[3] = Sizzle(match[3], null, null, curLoop);
                        } else {
                            var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);
                            if (!inplace) {
                                result.push.apply(result, ret);
                            }
                            return false;
                        }
                    } else if (Expr.match.POS.test(match[0]) || Expr.match.CHILD.test(match[0])) {
                        return true;
                    }
                    return match;
                }, POS: function (match) {
                    match.unshift(true);
                    return match;
                }
            },
            filters: {
                enabled: function (elem) {
                    return elem.disabled === false && elem.type !== "hidden";
                }, disabled: function (elem) {
                    return elem.disabled === true;
                }, checked: function (elem) {
                    return elem.checked === true;
                }, selected: function (elem) {
                    if (elem.parentNode) {
                        elem.parentNode.selectedIndex;
                    }
                    return elem.selected === true;
                }, parent: function (elem) {
                    return !!elem.firstChild;
                }, empty: function (elem) {
                    return !elem.firstChild;
                }, has: function (elem, i, match) {
                    return !!Sizzle(match[3], elem).length;
                }, header: function (elem) {
                    return (/h\d/i).test(elem.nodeName);
                }, text: function (elem) {
                    return "text" === elem.getAttribute('type');
                }, radio: function (elem) {
                    return "radio" === elem.type;
                }, checkbox: function (elem) {
                    return "checkbox" === elem.type;
                }, file: function (elem) {
                    return "file" === elem.type;
                }, password: function (elem) {
                    return "password" === elem.type;
                }, submit: function (elem) {
                    return "submit" === elem.type;
                }, image: function (elem) {
                    return "image" === elem.type;
                }, reset: function (elem) {
                    return "reset" === elem.type;
                }, button: function (elem) {
                    return "button" === elem.type || elem.nodeName.toLowerCase() === "button";
                }, input: function (elem) {
                    return (/input|select|textarea|button/i).test(elem.nodeName);
                }
            },
            setFilters: {
                first: function (elem, i) {
                    return i === 0;
                }, last: function (elem, i, match, array) {
                    return i === array.length - 1;
                }, even: function (elem, i) {
                    return i % 2 === 0;
                }, odd: function (elem, i) {
                    return i % 2 === 1;
                }, lt: function (elem, i, match) {
                    return i < match[3] - 0;
                }, gt: function (elem, i, match) {
                    return i > match[3] - 0;
                }, nth: function (elem, i, match) {
                    return match[3] - 0 === i;
                }, eq: function (elem, i, match) {
                    return match[3] - 0 === i;
                }
            },
            filter: {
                PSEUDO: function (elem, match, i, array) {
                    var name = match[1], filter = Expr.filters[name];
                    if (filter) {
                        return filter(elem, i, match, array);
                    } else if (name === "contains") {
                        return (elem.textContent || elem.innerText || Sizzle.getText([elem]) || "").indexOf(match[3]) >= 0;
                    } else if (name === "not") {
                        var not = match[3];
                        for (var j = 0, l = not.length; j < l; j++) {
                            if (not[j] === elem) {
                                return false;
                            }
                        }
                        return true;
                    } else {
                        Sizzle.error(name);
                    }
                }, CHILD: function (elem, match) {
                    var type = match[1], node = elem;
                    switch (type) {
                        case"only":
                        case"first":
                            while ((node = node.previousSibling)) {
                                if (node.nodeType === 1) {
                                    return false;
                                }
                            }
                            if (type === "first") {
                                return true;
                            }
                            node = elem;
                        case"last":
                            while ((node = node.nextSibling)) {
                                if (node.nodeType === 1) {
                                    return false;
                                }
                            }
                            return true;
                        case"nth":
                            var first = match[2], last = match[3];
                            if (first === 1 && last === 0) {
                                return true;
                            }
                            var doneName = match[0], parent = elem.parentNode;
                            if (parent && (parent.sizcache !== doneName || !elem.nodeIndex)) {
                                var count = 0;
                                for (node = parent.firstChild; node; node = node.nextSibling) {
                                    if (node.nodeType === 1) {
                                        node.nodeIndex = ++count;
                                    }
                                }
                                parent.sizcache = doneName;
                            }
                            var diff = elem.nodeIndex - last;
                            if (first === 0) {
                                return diff === 0;
                            } else {
                                return (diff % first === 0 && diff / first >= 0);
                            }
                    }
                }, ID: function (elem, match) {
                    return elem.nodeType === 1 && elem.getAttribute("id") === match;
                }, TAG: function (elem, match) {
                    return (match === "*" && elem.nodeType === 1) || elem.nodeName.toLowerCase() === match;
                }, CLASS: function (elem, match) {
                    return (" " + (elem.className || elem.getAttribute("class")) + " ").indexOf(match) > -1;
                }, ATTR: function (elem, match) {
                    var name = match[1], result = Expr.attrHandle[name] ? Expr.attrHandle[name](elem) : elem[name] != null ? elem[name] : elem.getAttribute(name), value = result + "", type = match[2], check = match[4];
                    return result == null ? type === "!=" : type === "=" ? value === check : type === "*=" ? value.indexOf(check) >= 0 : type === "~=" ? (" " + value + " ").indexOf(check) >= 0 : !check ? value && result !== false : type === "!=" ? value !== check : type === "^=" ? value.indexOf(check) === 0 : type === "$=" ? value.substr(value.length - check.length) === check : type === "|=" ? value === check || value.substr(0, check.length + 1) === check + "-" : false;
                }, POS: function (elem, match, i, array) {
                    var name = match[2], filter = Expr.setFilters[name];
                    if (filter) {
                        return filter(elem, i, match, array);
                    }
                }
            }
        };
        var origPOS = Expr.match.POS, fescape = function (all, num) {
            return "\\" + (num - 0 + 1);
        };
        for (var type in Expr.match) {
            Expr.match[type] = new RegExp(Expr.match[type].source + (/(?![^\[]*\])(?![^\(]*\))/.source));
            Expr.leftMatch[type] = new RegExp(/(^(?:.|\r|\n)*?)/.source + Expr.match[type].source.replace(/\\(\d+)/g, fescape));
        }
        var makeArray = function (array, results) {
            array = Array.prototype.slice.call(array, 0);
            if (results) {
                results.push.apply(results, array);
                return results;
            }
            return array;
        };
        try {
            Array.prototype.slice.call(document.documentElement.childNodes, 0)[0].nodeType;
        } catch (e) {
            makeArray = function (array, results) {
                var i = 0, ret = results || [];
                if (toString.call(array) === "[object Array]") {
                    Array.prototype.push.apply(ret, array);
                } else {
                    if (typeof array.length === "number") {
                        for (var l = array.length; i < l; i++) {
                            ret.push(array[i]);
                        }
                    } else {
                        for (; array[i]; i++) {
                            ret.push(array[i]);
                        }
                    }
                }
                return ret;
            };
        }
        var sortOrder, siblingCheck;
        if (document.documentElement.compareDocumentPosition) {
            sortOrder = function (a, b) {
                if (a === b) {
                    hasDuplicate = true;
                    return 0;
                }
                if (!a.compareDocumentPosition || !b.compareDocumentPosition) {
                    return a.compareDocumentPosition ? -1 : 1;
                }
                return a.compareDocumentPosition(b) & 4 ? -1 : 1;
            };
        } else {
            sortOrder = function (a, b) {
                var al, bl, ap = [], bp = [], aup = a.parentNode, bup = b.parentNode, cur = aup;
                if (a === b) {
                    hasDuplicate = true;
                    return 0;
                } else if (aup === bup) {
                    return siblingCheck(a, b);
                } else if (!aup) {
                    return -1;
                } else if (!bup) {
                    return 1;
                }
                while (cur) {
                    ap.unshift(cur);
                    cur = cur.parentNode;
                }
                cur = bup;
                while (cur) {
                    bp.unshift(cur);
                    cur = cur.parentNode;
                }
                al = ap.length;
                bl = bp.length;
                for (var i = 0; i < al && i < bl; i++) {
                    if (ap[i] !== bp[i]) {
                        return siblingCheck(ap[i], bp[i]);
                    }
                }
                return i === al ? siblingCheck(a, bp[i], -1) : siblingCheck(ap[i], b, 1);
            };
            siblingCheck = function (a, b, ret) {
                if (a === b) {
                    return ret;
                }
                var cur = a.nextSibling;
                while (cur) {
                    if (cur === b) {
                        return -1;
                    }
                    cur = cur.nextSibling;
                }
                return 1;
            };
        }
        Sizzle.getText = function (elems) {
            var ret = "", elem;
            for (var i = 0; elems[i]; i++) {
                elem = elems[i];
                if (elem.nodeType === 3 || elem.nodeType === 4) {
                    ret += elem.nodeValue;
                } else if (elem.nodeType !== 8) {
                    ret += Sizzle.getText(elem.childNodes);
                }
            }
            return ret;
        };
        (function () {
            var form = document.createElement("div"), id = "script" + (new Date()).getTime(), root = document.documentElement;
            form.innerHTML = "<a name='" + id + "'/>";
            root.insertBefore(form, root.firstChild);
            if (document.getElementById(id)) {
                Expr.find.ID = function (match, context, isXML) {
                    if (typeof context.getElementById !== "undefined" && !isXML) {
                        var m = context.getElementById(match[1]);
                        return m ? m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ? [m] : undefined : [];
                    }
                };
                Expr.filter.ID = function (elem, match) {
                    var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
                    return elem.nodeType === 1 && node && node.nodeValue === match;
                };
            }
            root.removeChild(form);
            root = form = null;
        })();
        (function () {
            var div = document.createElement("div");
            div.appendChild(document.createComment(""));
            if (div.getElementsByTagName("*").length > 0) {
                Expr.find.TAG = function (match, context) {
                    var results = context.getElementsByTagName(match[1]);
                    if (match[1] === "*") {
                        var tmp = [];
                        for (var i = 0; results[i]; i++) {
                            if (results[i].nodeType === 1) {
                                tmp.push(results[i]);
                            }
                        }
                        results = tmp;
                    }
                    return results;
                };
            }
            div.innerHTML = "<a href='#'></a>";
            if (div.firstChild && typeof div.firstChild.getAttribute !== "undefined" && div.firstChild.getAttribute("href") !== "#") {
                Expr.attrHandle.href = function (elem) {
                    return elem.getAttribute("href", 2);
                };
            }
            div = null;
        })();
        if (document.querySelectorAll) {
            (function () {
                var oldSizzle = Sizzle, div = document.createElement("div"), id = "__sizzle__";
                div.innerHTML = "<p class='TEST'></p>";
                if (div.querySelectorAll && div.querySelectorAll(".TEST").length === 0) {
                    return;
                }
                Sizzle = function (query, context, extra, seed) {
                    context = context || document;
                    if (!seed && !Sizzle.isXML(context)) {
                        var match = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(query);
                        if (match && (context.nodeType === 1 || context.nodeType === 9)) {
                            if (match[1]) {
                                return makeArray(context.getElementsByTagName(query), extra);
                            } else if (match[2] && Expr.find.CLASS && context.getElementsByClassName) {
                                return makeArray(context.getElementsByClassName(match[2]), extra);
                            }
                        }
                        if (context.nodeType === 9) {
                            if (query === "body" && context.body) {
                                return makeArray([context.body], extra);
                            } else if (match && match[3]) {
                                var elem = context.getElementById(match[3]);
                                if (elem && elem.parentNode) {
                                    if (elem.id === match[3]) {
                                        return makeArray([elem], extra);
                                    }
                                } else {
                                    return makeArray([], extra);
                                }
                            }
                            try {
                                return makeArray(context.querySelectorAll(query), extra);
                            } catch (qsaError) {
                            }
                        } else if (context.nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
                            var oldContext = context, old = context.getAttribute("id"), nid = old || id, hasParent = context.parentNode, relativeHierarchySelector = /^\s*[+~]/.test(query);
                            if (!old) {
                                context.setAttribute("id", nid);
                            } else {
                                nid = nid.replace(/'/g, "\\$&");
                            }
                            if (relativeHierarchySelector && hasParent) {
                                context = context.parentNode;
                            }
                            try {
                                if (!relativeHierarchySelector || hasParent) {
                                    return makeArray(context.querySelectorAll("[id='" + nid + "'] " + query), extra);
                                }
                            } catch (pseudoError) {
                            } finally {
                                if (!old) {
                                    oldContext.removeAttribute("id");
                                }
                            }
                        }
                    }
                    return oldSizzle(query, context, extra, seed);
                };
                for (var prop in oldSizzle) {
                    Sizzle[prop] = oldSizzle[prop];
                }
                div = null;
            })();
        }
        (function () {
            var html = document.documentElement, matches = html.matchesSelector || html.mozMatchesSelector || html.webkitMatchesSelector || html.msMatchesSelector, pseudoWorks = false;
            try {
                matches.call(document.documentElement, "[test!='']:sizzle");
            } catch (pseudoError) {
                pseudoWorks = true;
            }
            if (matches) {
                Sizzle.matchesSelector = function (node, expr) {
                    expr = expr.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                    if (!Sizzle.isXML(node)) {
                        try {
                            if (pseudoWorks || !Expr.match.PSEUDO.test(expr) && !(/!=/).test(expr)) {
                                return matches.call(node, expr);
                            }
                        } catch (e) {
                        }
                    }
                    return Sizzle(expr, null, null, [node]).length > 0;
                };
            }
        })();
        (function () {
            var div = document.createElement("div");
            div.innerHTML = "<div class='test e'></div><div class='test'></div>";
            if (!div.getElementsByClassName || div.getElementsByClassName("e").length === 0) {
                return;
            }
            div.lastChild.className = "e";
            if (div.getElementsByClassName("e").length === 1) {
                return;
            }
            Expr.order.splice(1, 0, "CLASS");
            Expr.find.CLASS = function (match, context, isXML) {
                if (typeof context.getElementsByClassName !== "undefined" && !isXML) {
                    return context.getElementsByClassName(match[1]);
                }
            };
            div = null;
        })();
        function dirNodeCheck(dir, cur, doneName, checkSet, nodeCheck, isXML) {
            for (var i = 0, l = checkSet.length; i < l; i++) {
                var elem = checkSet[i];
                if (elem) {
                    var match = false;
                    elem = elem[dir];
                    while (elem) {
                        if (elem.sizcache === doneName) {
                            match = checkSet[elem.sizset];
                            break;
                        }
                        if (elem.nodeType === 1 && !isXML) {
                            elem.sizcache = doneName;
                            elem.sizset = i;
                        }
                        if (elem.nodeName.toLowerCase() === cur) {
                            match = elem;
                            break;
                        }
                        elem = elem[dir];
                    }
                    checkSet[i] = match;
                }
            }
        }

        function dirCheck(dir, cur, doneName, checkSet, nodeCheck, isXML) {
            for (var i = 0, l = checkSet.length; i < l; i++) {
                var elem = checkSet[i];
                if (elem) {
                    var match = false;
                    elem = elem[dir];
                    while (elem) {
                        if (elem.sizcache === doneName) {
                            match = checkSet[elem.sizset];
                            break;
                        }
                        if (elem.nodeType === 1) {
                            if (!isXML) {
                                elem.sizcache = doneName;
                                elem.sizset = i;
                            }
                            if (typeof cur !== "string") {
                                if (elem === cur) {
                                    match = true;
                                    break;
                                }
                            } else if (Sizzle.filter(cur, [elem]).length > 0) {
                                match = elem;
                                break;
                            }
                        }
                        elem = elem[dir];
                    }
                    checkSet[i] = match;
                }
            }
        }

        if (document.documentElement.contains) {
            Sizzle.contains = function (a, b) {
                return a !== b && (a.contains ? a.contains(b) : true);
            };
        } else if (document.documentElement.compareDocumentPosition) {
            Sizzle.contains = function (a, b) {
                return !!(a.compareDocumentPosition(b) & 16);
            };
        } else {
            Sizzle.contains = function () {
                return false;
            };
        }
        Sizzle.isXML = function (elem) {
            var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;
            return documentElement ? documentElement.nodeName !== "HTML" : false;
        };
        var posProcess = function (selector, context) {
            var match, tmpSet = [], later = "", root = context.nodeType ? [context] : context;
            while ((match = Expr.match.PSEUDO.exec(selector))) {
                later += match[0];
                selector = selector.replace(Expr.match.PSEUDO, "");
            }
            selector = Expr.relative[selector] ? selector + "*" : selector;
            for (var i = 0, l = root.length; i < l; i++) {
                Sizzle(selector, root[i], tmpSet);
            }
            return Sizzle.filter(later, tmpSet);
        };
        jQuery.find = Sizzle;
        jQuery.expr = Sizzle.selectors;
        jQuery.expr[":"] = jQuery.expr.filters;
        jQuery.unique = Sizzle.uniqueSort;
        jQuery.text = Sizzle.getText;
        jQuery.isXMLDoc = Sizzle.isXML;
        jQuery.contains = Sizzle.contains;
    })();
    var runtil = /Until$/, rparentsprev = /^(?:parents|prevUntil|prevAll)/, rmultiselector = /,/, isSimple = /^.[^:#\[\.,]*$/, slice = Array.prototype.slice, POS = jQuery.expr.match.POS, guaranteedUnique = {
        children: true,
        contents: true,
        next: true,
        prev: true
    };
    jQuery.fn.extend({
        find: function (selector) {
            var ret = this.pushStack("", "find", selector), length = 0;
            for (var i = 0, l = this.length; i < l; i++) {
                length = ret.length;
                jQuery.find(selector, this[i], ret);
                if (i > 0) {
                    for (var n = length; n < ret.length; n++) {
                        for (var r = 0; r < length; r++) {
                            if (ret[r] === ret[n]) {
                                ret.splice(n--, 1);
                                break;
                            }
                        }
                    }
                }
            }
            return ret;
        }, has: function (target) {
            var targets = jQuery(target);
            return this.filter(function () {
                for (var i = 0, l = targets.length; i < l; i++) {
                    if (jQuery.contains(this, targets[i])) {
                        return true;
                    }
                }
            });
        }, not: function (selector) {
            return this.pushStack(winnow(this, selector, false), "not", selector);
        }, filter: function (selector) {
            return this.pushStack(winnow(this, selector, true), "filter", selector);
        }, is: function (selector) {
            return !!selector && jQuery.filter(selector, this).length > 0;
        }, closest: function (selectors, context) {
            var ret = [], i, l, cur = this[0];
            if (jQuery.isArray(selectors)) {
                var match, selector, matches = {}, level = 1;
                if (cur && selectors.length) {
                    for (i = 0, l = selectors.length; i < l; i++) {
                        selector = selectors[i];
                        if (!matches[selector]) {
                            matches[selector] = jQuery.expr.match.POS.test(selector) ? jQuery(selector, context || this.context) : selector;
                        }
                    }
                    while (cur && cur.ownerDocument && cur !== context) {
                        for (selector in matches) {
                            match = matches[selector];
                            if (match.jquery ? match.index(cur) > -1 : jQuery(cur).is(match)) {
                                ret.push({selector: selector, elem: cur, level: level});
                            }
                        }
                        cur = cur.parentNode;
                        level++;
                    }
                }
                return ret;
            }
            var pos = POS.test(selectors) ? jQuery(selectors, context || this.context) : null;
            for (i = 0, l = this.length; i < l; i++) {
                cur = this[i];
                while (cur) {
                    if (pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors)) {
                        ret.push(cur);
                        break;
                    } else {
                        cur = cur.parentNode;
                        if (!cur || !cur.ownerDocument || cur === context) {
                            break;
                        }
                    }
                }
            }
            ret = ret.length > 1 ? jQuery.unique(ret) : ret;
            return this.pushStack(ret, "closest", selectors);
        }, index: function (elem) {
            if (!elem || typeof elem === "string") {
                return jQuery.inArray(this[0], elem ? jQuery(elem) : this.parent().children());
            }
            return jQuery.inArray(elem.jquery ? elem[0] : elem, this);
        }, add: function (selector, context) {
            var set = typeof selector === "string" ? jQuery(selector, context) : jQuery.makeArray(selector), all = jQuery.merge(this.get(), set);
            return this.pushStack(isDisconnected(set[0]) || isDisconnected(all[0]) ? all : jQuery.unique(all));
        }, andSelf: function () {
            return this.add(this.prevObject);
        }
    });
    function isDisconnected(node) {
        return !node || !node.parentNode || node.parentNode.nodeType === 11;
    }

    jQuery.each({
        parent: function (elem) {
            var parent = elem.parentNode;
            return parent && parent.nodeType !== 11 ? parent : null;
        }, parents: function (elem) {
            return jQuery.dir(elem, "parentNode");
        }, parentsUntil: function (elem, i, until) {
            return jQuery.dir(elem, "parentNode", until);
        }, next: function (elem) {
            return jQuery.nth(elem, 2, "nextSibling");
        }, prev: function (elem) {
            return jQuery.nth(elem, 2, "previousSibling");
        }, nextAll: function (elem) {
            return jQuery.dir(elem, "nextSibling");
        }, prevAll: function (elem) {
            return jQuery.dir(elem, "previousSibling");
        }, nextUntil: function (elem, i, until) {
            return jQuery.dir(elem, "nextSibling", until);
        }, prevUntil: function (elem, i, until) {
            return jQuery.dir(elem, "previousSibling", until);
        }, siblings: function (elem) {
            return jQuery.sibling(elem.parentNode.firstChild, elem);
        }, children: function (elem) {
            return jQuery.sibling(elem.firstChild);
        }, contents: function (elem) {
            return jQuery.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document : jQuery.makeArray(elem.childNodes);
        }
    }, function (name, fn) {
        jQuery.fn[name] = function (until, selector) {
            var ret = jQuery.map(this, fn, until), args = slice.call(arguments);
            if (!runtil.test(name)) {
                selector = until;
            }
            if (selector && typeof selector === "string") {
                ret = jQuery.filter(selector, ret);
            }
            ret = this.length > 1 && !guaranteedUnique[name] ? jQuery.unique(ret) : ret;
            if ((this.length > 1 || rmultiselector.test(selector)) && rparentsprev.test(name)) {
                ret = ret.reverse();
            }
            return this.pushStack(ret, name, args.join(","));
        };
    });
    jQuery.extend({
        filter: function (expr, elems, not) {
            if (not) {
                expr = ":not(" + expr + ")";
            }
            return elems.length === 1 ? jQuery.find.matchesSelector(elems[0], expr) ? [elems[0]] : [] : jQuery.find.matches(expr, elems);
        }, dir: function (elem, dir, until) {
            var matched = [], cur = elem[dir];
            while (cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery(cur).is(until))) {
                if (cur.nodeType === 1) {
                    matched.push(cur);
                }
                cur = cur[dir];
            }
            return matched;
        }, nth: function (cur, result, dir, elem) {
            result = result || 1;
            var num = 0;
            for (; cur; cur = cur[dir]) {
                if (cur.nodeType === 1 && ++num === result) {
                    break;
                }
            }
            return cur;
        }, sibling: function (n, elem) {
            var r = [];
            for (; n; n = n.nextSibling) {
                if (n.nodeType === 1 && n !== elem) {
                    r.push(n);
                }
            }
            return r;
        }
    });
    function winnow(elements, qualifier, keep) {
        if (jQuery.isFunction(qualifier)) {
            return jQuery.grep(elements, function (elem, i) {
                var retVal = !!qualifier.call(elem, i, elem);
                return retVal === keep;
            });
        } else if (qualifier.nodeType) {
            return jQuery.grep(elements, function (elem, i) {
                return (elem === qualifier) === keep;
            });
        } else if (typeof qualifier === "string") {
            var filtered = jQuery.grep(elements, function (elem) {
                return elem.nodeType === 1;
            });
            if (isSimple.test(qualifier)) {
                return jQuery.filter(qualifier, filtered, !keep);
            } else {
                qualifier = jQuery.filter(qualifier, filtered);
            }
        }
        return jQuery.grep(elements, function (elem, i) {
            return (jQuery.inArray(elem, qualifier) >= 0) === keep;
        });
    }

    var rinlinejQuery = / jQuery\d+="(?:\d+|null)"/g, rleadingWhitespace = /^\s+/, rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig, rtagName = /<([\w:]+)/, rtbody = /<tbody/i, rhtml = /<|&#?\w+;/, rnocache = /<(?:script|object|embed|option|style)/i, rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, wrapMap = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        area: [1, "<map>", "</map>"],
        _default: [0, "", ""]
    };
    wrapMap.optgroup = wrapMap.option;
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;
    if (!jQuery.support.htmlSerialize) {
        wrapMap._default = [1, "div<div>", "</div>"];
    }
    jQuery.fn.extend({
        text: function (text) {
            if (jQuery.isFunction(text)) {
                return this.each(function (i) {
                    var self = jQuery(this);
                    self.text(text.call(this, i, self.text()));
                });
            }
            if (typeof text !== "object" && text !== undefined) {
                return this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(text));
            }
            return jQuery.text(this);
        }, wrapAll: function (html) {
            if (jQuery.isFunction(html)) {
                return this.each(function (i) {
                    jQuery(this).wrapAll(html.call(this, i));
                });
            }
            if (this[0]) {
                var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
                if (this[0].parentNode) {
                    wrap.insertBefore(this[0]);
                }
                wrap.map(function () {
                    var elem = this;
                    while (elem.firstChild && elem.firstChild.nodeType === 1) {
                        elem = elem.firstChild;
                    }
                    return elem;
                }).append(this);
            }
            return this;
        }, wrapInner: function (html) {
            if (jQuery.isFunction(html)) {
                return this.each(function (i) {
                    jQuery(this).wrapInner(html.call(this, i));
                });
            }
            return this.each(function () {
                var self = jQuery(this), contents = self.contents();
                if (contents.length) {
                    contents.wrapAll(html);
                } else {
                    self.append(html);
                }
            });
        }, wrap: function (html) {
            return this.each(function () {
                jQuery(this).wrapAll(html);
            });
        }, unwrap: function () {
            return this.parent().each(function () {
                if (!jQuery.nodeName(this, "body")) {
                    jQuery(this).replaceWith(this.childNodes);
                }
            }).end();
        }, append: function () {
            return this.domManip(arguments, true, function (elem) {
                if (this.nodeType === 1) {
                    this.appendChild(elem);
                }
            });
        }, prepend: function () {
            return this.domManip(arguments, true, function (elem) {
                if (this.nodeType === 1) {
                    this.insertBefore(elem, this.firstChild);
                }
            });
        }, before: function () {
            if (this[0] && this[0].parentNode) {
                return this.domManip(arguments, false, function (elem) {
                    this.parentNode.insertBefore(elem, this);
                });
            } else if (arguments.length) {
                var set = jQuery(arguments[0]);
                set.push.apply(set, this.toArray());
                return this.pushStack(set, "before", arguments);
            }
        }, after: function () {
            if (this[0] && this[0].parentNode) {
                return this.domManip(arguments, false, function (elem) {
                    this.parentNode.insertBefore(elem, this.nextSibling);
                });
            } else if (arguments.length) {
                var set = this.pushStack(this, "after", arguments);
                set.push.apply(set, jQuery(arguments[0]).toArray());
                return set;
            }
        }, remove: function (selector, keepData) {
            for (var i = 0, elem; (elem = this[i]) != null; i++) {
                if (!selector || jQuery.filter(selector, [elem]).length) {
                    if (!keepData && elem.nodeType === 1) {
                        jQuery.cleanData(elem.getElementsByTagName("*"));
                        jQuery.cleanData([elem]);
                    }
                    if (elem.parentNode) {
                        elem.parentNode.removeChild(elem);
                    }
                }
            }
            return this;
        }, empty: function () {
            for (var i = 0, elem; (elem = this[i]) != null; i++) {
                if (elem.nodeType === 1) {
                    jQuery.cleanData(elem.getElementsByTagName("*"));
                }
                while (elem.firstChild) {
                    elem.removeChild(elem.firstChild);
                }
            }
            return this;
        }, clone: function (dataAndEvents, deepDataAndEvents) {
            dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
            deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
            return this.map(function () {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
            });
        }, html: function (value) {
            if (value === undefined) {
                return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(rinlinejQuery, "") : null;
            } else if (typeof value === "string" && !rnocache.test(value) && (jQuery.support.leadingWhitespace || !rleadingWhitespace.test(value)) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
                value = value.replace(rxhtmlTag, "<$1></$2>");
                try {
                    for (var i = 0, l = this.length; i < l; i++) {
                        if (this[i].nodeType === 1) {
                            jQuery.cleanData(this[i].getElementsByTagName("*"));
                            this[i].innerHTML = value;
                        }
                    }
                } catch (e) {
                    this.empty().append(value);
                }
            } else if (jQuery.isFunction(value)) {
                this.each(function (i) {
                    var self = jQuery(this);
                    self.html(value.call(this, i, self.html()));
                });
            } else {
                this.empty().append(value);
            }
            return this;
        }, replaceWith: function (value) {
            if (this[0] && this[0].parentNode) {
                if (jQuery.isFunction(value)) {
                    return this.each(function (i) {
                        var self = jQuery(this), old = self.html();
                        self.replaceWith(value.call(this, i, old));
                    });
                }
                if (typeof value !== "string") {
                    value = jQuery(value).detach();
                }
                return this.each(function () {
                    var next = this.nextSibling, parent = this.parentNode;
                    jQuery(this).remove();
                    if (next) {
                        jQuery(next).before(value);
                    } else {
                        jQuery(parent).append(value);
                    }
                });
            } else {
                return this.pushStack(jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value);
            }
        }, detach: function (selector) {
            return this.remove(selector, true);
        }, domManip: function (args, table, callback) {
            var results, first, fragment, parent, value = args[0], scripts = [];
            if (!jQuery.support.checkClone && arguments.length === 3 && typeof value === "string" && rchecked.test(value)) {
                return this.each(function () {
                    jQuery(this).domManip(args, table, callback, true);
                });
            }
            if (jQuery.isFunction(value)) {
                return this.each(function (i) {
                    var self = jQuery(this);
                    args[0] = value.call(this, i, table ? self.html() : undefined);
                    self.domManip(args, table, callback);
                });
            }
            if (this[0]) {
                parent = value && value.parentNode;
                if (jQuery.support.parentNode && parent && parent.nodeType === 11 && parent.childNodes.length === this.length) {
                    results = {fragment: parent};
                } else {
                    results = jQuery.buildFragment(args, this, scripts);
                }
                fragment = results.fragment;
                if (fragment.childNodes.length === 1) {
                    first = fragment = fragment.firstChild;
                } else {
                    first = fragment.firstChild;
                }
                if (first) {
                    table = table && jQuery.nodeName(first, "tr");
                    for (var i = 0, l = this.length, lastIndex = l - 1; i < l; i++) {
                        callback.call(table ? root(this[i], first) : this[i], results.cacheable || (l > 1 && i < lastIndex) ? jQuery.clone(fragment, true, true) : fragment);
                    }
                }
                if (scripts.length) {
                    jQuery.each(scripts, evalScript);
                }
            }
            return this;
        }
    });
    function root(elem, cur) {
        return jQuery.nodeName(elem, "table") ? (elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody"))) : elem;
    }

    function cloneCopyEvent(src, dest) {
        if (dest.nodeType !== 1 || !jQuery.hasData(src)) {
            return;
        }
        var internalKey = jQuery.expando, oldData = jQuery.data(src), curData = jQuery.data(dest, oldData);
        if ((oldData = oldData[internalKey])) {
            var events = oldData.events;
            curData = curData[internalKey] = jQuery.extend({}, oldData);
            if (events) {
                delete curData.handle;
                curData.events = {};
                for (var type in events) {
                    for (var i = 0, l = events[type].length; i < l; i++) {
                        jQuery.event.add(dest, type + (events[type][i].namespace ? "." : "") + events[type][i].namespace, events[type][i], events[type][i].data);
                    }
                }
            }
        }
    }

    function cloneFixAttributes(src, dest) {
        if (dest.nodeType !== 1) {
            return;
        }
        var nodeName = dest.nodeName.toLowerCase();
        dest.clearAttributes();
        dest.mergeAttributes(src);
        if (nodeName === "object") {
            dest.outerHTML = src.outerHTML;
        } else if (nodeName === "input" && (src.type === "checkbox" || src.type === "radio")) {
            if (src.checked) {
                dest.defaultChecked = dest.checked = src.checked;
            }
            if (dest.value !== src.value) {
                dest.value = src.value;
            }
        } else if (nodeName === "option") {
            dest.selected = src.defaultSelected;
        } else if (nodeName === "input" || nodeName === "textarea") {
            dest.defaultValue = src.defaultValue;
        }
        dest.removeAttribute(jQuery.expando);
    }

    jQuery.buildFragment = function (args, nodes, scripts) {
        var fragment, cacheable, cacheresults, doc = (nodes && nodes[0] ? nodes[0].ownerDocument || nodes[0] : document);
        if (args.length === 1 && typeof args[0] === "string" && args[0].length < 512 && doc === document && args[0].charAt(0) === "<" && !rnocache.test(args[0]) && (jQuery.support.checkClone || !rchecked.test(args[0]))) {
            cacheable = true;
            cacheresults = jQuery.fragments[args[0]];
            if (cacheresults) {
                if (cacheresults !== 1) {
                    fragment = cacheresults;
                }
            }
        }
        if (!fragment) {
            fragment = doc.createDocumentFragment();
            jQuery.clean(args, doc, fragment, scripts);
        }
        if (cacheable) {
            jQuery.fragments[args[0]] = cacheresults ? fragment : 1;
        }
        return {fragment: fragment, cacheable: cacheable};
    };
    jQuery.fragments = {};
    jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (name, original) {
        jQuery.fn[name] = function (selector) {
            var ret = [], insert = jQuery(selector), parent = this.length === 1 && this[0].parentNode;
            if (parent && parent.nodeType === 11 && parent.childNodes.length === 1 && insert.length === 1) {
                insert[original](this[0]);
                return this;
            } else {
                for (var i = 0, l = insert.length; i < l; i++) {
                    var elems = (i > 0 ? this.clone(true) : this).get();
                    jQuery(insert[i])[original](elems);
                    ret = ret.concat(elems);
                }
                return this.pushStack(ret, name, insert.selector);
            }
        };
    });
    function getAll(elem) {
        if ("getElementsByTagName"in elem) {
            return elem.getElementsByTagName("*");
        } else if ("querySelectorAll"in elem) {
            return elem.querySelectorAll("*");
        } else {
            return [];
        }
    }

    jQuery.extend({
        clone: function (elem, dataAndEvents, deepDataAndEvents) {
            var clone = elem.cloneNode(true), srcElements, destElements, i;
            if ((!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
                cloneFixAttributes(elem, clone);
                srcElements = getAll(elem);
                destElements = getAll(clone);
                for (i = 0; srcElements[i]; ++i) {
                    cloneFixAttributes(srcElements[i], destElements[i]);
                }
            }
            if (dataAndEvents) {
                cloneCopyEvent(elem, clone);
                if (deepDataAndEvents) {
                    srcElements = getAll(elem);
                    destElements = getAll(clone);
                    for (i = 0; srcElements[i]; ++i) {
                        cloneCopyEvent(srcElements[i], destElements[i]);
                    }
                }
            }
            return clone;
        }, clean: function (elems, context, fragment, scripts) {
            context = context || document;
            if (typeof context.createElement === "undefined") {
                context = context.ownerDocument || context[0] && context[0].ownerDocument || document;
            }
            var ret = [];
            for (var i = 0, elem; (elem = elems[i]) != null; i++) {
                if (typeof elem === "number") {
                    elem += "";
                }
                if (!elem) {
                    continue;
                }
                if (typeof elem === "string" && !rhtml.test(elem)) {
                    elem = context.createTextNode(elem);
                } else if (typeof elem === "string") {
                    elem = elem.replace(rxhtmlTag, "<$1></$2>");
                    var tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase(), wrap = wrapMap[tag] || wrapMap._default, depth = wrap[0], div = context.createElement("div");
                    div.innerHTML = wrap[1] + elem + wrap[2];
                    while (depth--) {
                        div = div.lastChild;
                    }
                    if (!jQuery.support.tbody) {
                        var hasBody = rtbody.test(elem), tbody = tag === "table" && !hasBody ? div.firstChild && div.firstChild.childNodes : wrap[1] === "<table>" && !hasBody ? div.childNodes : [];
                        for (var j = tbody.length - 1; j >= 0; --j) {
                            if (jQuery.nodeName(tbody[j], "tbody") && !tbody[j].childNodes.length) {
                                tbody[j].parentNode.removeChild(tbody[j]);
                            }
                        }
                    }
                    if (!jQuery.support.leadingWhitespace && rleadingWhitespace.test(elem)) {
                        div.insertBefore(context.createTextNode(rleadingWhitespace.exec(elem)[0]), div.firstChild);
                    }
                    elem = div.childNodes;
                }
                if (elem.nodeType) {
                    ret.push(elem);
                } else {
                    ret = jQuery.merge(ret, elem);
                }
            }
            if (fragment) {
                for (i = 0; ret[i]; i++) {
                    if (scripts && jQuery.nodeName(ret[i], "script") && (!ret[i].type || ret[i].type.toLowerCase() === "text/javascript")) {
                        scripts.push(ret[i].parentNode ? ret[i].parentNode.removeChild(ret[i]) : ret[i]);
                    } else {
                        if (ret[i].nodeType === 1) {
                            ret.splice.apply(ret, [i + 1, 0].concat(jQuery.makeArray(ret[i].getElementsByTagName("script"))));
                        }
                        fragment.appendChild(ret[i]);
                    }
                }
            }
            return ret;
        }, cleanData: function (elems) {
            var data, id, cache = jQuery.cache, internalKey = jQuery.expando, special = jQuery.event.special, deleteExpando = jQuery.support.deleteExpando;
            for (var i = 0, elem; (elem = elems[i]) != null; i++) {
                if (elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()]) {
                    continue;
                }
                id = elem[jQuery.expando];
                if (id) {
                    data = cache[id] && cache[id][internalKey];
                    if (data && data.events) {
                        for (var type in data.events) {
                            if (special[type]) {
                                jQuery.event.remove(elem, type);
                            } else {
                                jQuery.removeEvent(elem, type, data.handle);
                            }
                        }
                        if (data.handle) {
                            data.handle.elem = null;
                        }
                    }
                    if (deleteExpando) {
                        delete elem[jQuery.expando];
                    } else if (elem.removeAttribute) {
                        elem.removeAttribute(jQuery.expando);
                    }
                    delete cache[id];
                }
            }
        }
    });
    function evalScript(i, elem) {
        if (elem.src) {
            jQuery.ajax({url: elem.src, async: false, dataType: "script"});
        } else {
            jQuery.globalEval(elem.text || elem.textContent || elem.innerHTML || "");
        }
        if (elem.parentNode) {
            elem.parentNode.removeChild(elem);
        }
    }

    var ralpha = /alpha\([^)]*\)/i, ropacity = /opacity=([^)]*)/, rdashAlpha = /-([a-z])/ig, rupper = /([A-Z])/g, rnumpx = /^-?\d+(?:px)?$/i, rnum = /^-?\d/, cssShow = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, cssWidth = ["Left", "Right"], cssHeight = ["Top", "Bottom"], curCSS, getComputedStyle, currentStyle, fcamelCase = function (all, letter) {
        return letter.toUpperCase();
    };
    jQuery.fn.css = function (name, value) {
        if (arguments.length === 2 && value === undefined) {
            return this;
        }
        return jQuery.access(this, name, value, true, function (elem, name, value) {
            return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
        });
    };
    jQuery.extend({
        cssHooks: {
            opacity: {
                get: function (elem, computed) {
                    if (computed) {
                        var ret = curCSS(elem, "opacity", "opacity");
                        return ret === "" ? "1" : ret;
                    } else {
                        return elem.style.opacity;
                    }
                }
            }
        },
        cssNumber: {"zIndex": true, "fontWeight": true, "opacity": true, "zoom": true, "lineHeight": true},
        cssProps: {"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"},
        style: function (elem, name, value, extra) {
            if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
                return;
            }
            var ret, origName = jQuery.camelCase(name), style = elem.style, hooks = jQuery.cssHooks[origName];
            name = jQuery.cssProps[origName] || origName;
            if (value !== undefined) {
                if (typeof value === "number" && isNaN(value) || value == null) {
                    return;
                }
                if (typeof value === "number" && !jQuery.cssNumber[origName]) {
                    value += "px";
                }
                if (!hooks || !("set"in hooks) || (value = hooks.set(elem, value)) !== undefined) {
                    try {
                        style[name] = value;
                    } catch (e) {
                    }
                }
            } else {
                if (hooks && "get"in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
                    return ret;
                }
                return style[name];
            }
        },
        css: function (elem, name, extra) {
            var ret, origName = jQuery.camelCase(name), hooks = jQuery.cssHooks[origName];
            name = jQuery.cssProps[origName] || origName;
            if (hooks && "get"in hooks && (ret = hooks.get(elem, true, extra)) !== undefined) {
                return ret;
            } else if (curCSS) {
                return curCSS(elem, name, origName);
            }
        },
        swap: function (elem, options, callback) {
            var old = {};
            for (var name in options) {
                old[name] = elem.style[name];
                elem.style[name] = options[name];
            }
            callback.call(elem);
            for (name in options) {
                elem.style[name] = old[name];
            }
        },
        camelCase: function (string) {
            return string.replace(rdashAlpha, fcamelCase);
        }
    });
    jQuery.curCSS = jQuery.css;
    jQuery.each(["height", "width"], function (i, name) {
        jQuery.cssHooks[name] = {
            get: function (elem, computed, extra) {
                var val;
                if (computed) {
                    if (elem.offsetWidth !== 0) {
                        val = getWH(elem, name, extra);
                    } else {
                        jQuery.swap(elem, cssShow, function () {
                            val = getWH(elem, name, extra);
                        });
                    }
                    if (val <= 0) {
                        val = curCSS(elem, name, name);
                        if (val === "0px" && currentStyle) {
                            val = currentStyle(elem, name, name);
                        }
                        if (val != null) {
                            return val === "" || val === "auto" ? "0px" : val;
                        }
                    }
                    if (val < 0 || val == null) {
                        val = elem.style[name];
                        return val === "" || val === "auto" ? "0px" : val;
                    }
                    return typeof val === "string" ? val : val + "px";
                }
            }, set: function (elem, value) {
                if (rnumpx.test(value)) {
                    value = parseFloat(value);
                    if (value >= 0) {
                        return value + "px";
                    }
                } else {
                    return value;
                }
            }
        };
    });
    if (!jQuery.support.opacity) {
        jQuery.cssHooks.opacity = {
            get: function (elem, computed) {
                return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ? (parseFloat(RegExp.$1) / 100) + "" : computed ? "1" : "";
            }, set: function (elem, value) {
                var style = elem.style;
                style.zoom = 1;
                var opacity = jQuery.isNaN(value) ? "" : "alpha(opacity=" + value * 100 + ")", filter = style.filter || "";
                style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : style.filter + ' ' + opacity;
            }
        };
    }
    if (document.defaultView && document.defaultView.getComputedStyle) {
        getComputedStyle = function (elem, newName, name) {
            var ret, defaultView, computedStyle;
            name = name.replace(rupper, "-$1").toLowerCase();
            if (!(defaultView = elem.ownerDocument.defaultView)) {
                return undefined;
            }
            if ((computedStyle = defaultView.getComputedStyle(elem, null))) {
                ret = computedStyle.getPropertyValue(name);
                if (ret === "" && !jQuery.contains(elem.ownerDocument.documentElement, elem)) {
                    ret = jQuery.style(elem, name);
                }
            }
            return ret;
        };
    }
    if (document.documentElement.currentStyle) {
        currentStyle = function (elem, name) {
            var left, ret = elem.currentStyle && elem.currentStyle[name], rsLeft = elem.runtimeStyle && elem.runtimeStyle[name], style = elem.style;
            if (!rnumpx.test(ret) && rnum.test(ret)) {
                left = style.left;
                if (rsLeft) {
                    elem.runtimeStyle.left = elem.currentStyle.left;
                }
                style.left = name === "fontSize" ? "1em" : (ret || 0);
                ret = style.pixelLeft + "px";
                style.left = left;
                if (rsLeft) {
                    elem.runtimeStyle.left = rsLeft;
                }
            }
            return ret === "" ? "auto" : ret;
        };
    }
    curCSS = getComputedStyle || currentStyle;
    function getWH(elem, name, extra) {
        var which = name === "width" ? cssWidth : cssHeight, val = name === "width" ? elem.offsetWidth : elem.offsetHeight;
        if (extra === "border") {
            return val;
        }
        jQuery.each(which, function () {
            if (!extra) {
                val -= parseFloat(jQuery.css(elem, "padding" + this)) || 0;
            }
            if (extra === "margin") {
                val += parseFloat(jQuery.css(elem, "margin" + this)) || 0;
            } else {
                val -= parseFloat(jQuery.css(elem, "border" + this + "Width")) || 0;
            }
        });
        return val;
    }

    if (jQuery.expr && jQuery.expr.filters) {
        jQuery.expr.filters.hidden = function (elem) {
            var width = elem.offsetWidth, height = elem.offsetHeight;
            return (width === 0 && height === 0) || (!jQuery.support.reliableHiddenOffsets && (elem.style.display || jQuery.css(elem, "display")) === "none");
        };
        jQuery.expr.filters.visible = function (elem) {
            return !jQuery.expr.filters.hidden(elem);
        };
    }
    var r20 = /%20/g, rbracket = /\[\]$/, rCRLF = /\r?\n/g, rhash = /#.*$/, rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, rinput = /^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i, rlocalProtocol = /(?:^file|^widget|\-extension):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, rquery = /\?/, rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, rselectTextarea = /^(?:select|textarea)/i, rspacesAjax = /\s+/, rts = /([?&])_=[^&]*/, rucHeaders = /(^|\-)([a-z])/g, rucHeadersFunc = function (_, $1, $2) {
        return $1 + $2.toUpperCase();
    }, rurl = /^([\w\+\.\-]+:)\/\/([^\/?#:]*)(?::(\d+))?/, _load = jQuery.fn.load, prefilters = {}, transports = {}, ajaxLocation, ajaxLocParts;
    try {
        ajaxLocation = document.location.href;
    } catch (e) {
        ajaxLocation = document.createElement("a");
        ajaxLocation.href = "";
        ajaxLocation = ajaxLocation.href;
    }
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase());
    function addToPrefiltersOrTransports(structure) {
        return function (dataTypeExpression, func) {
            if (typeof dataTypeExpression !== "string") {
                func = dataTypeExpression;
                dataTypeExpression = "*";
            }
            if (jQuery.isFunction(func)) {
                var dataTypes = dataTypeExpression.toLowerCase().split(rspacesAjax), i = 0, length = dataTypes.length, dataType, list, placeBefore;
                for (; i < length; i++) {
                    dataType = dataTypes[i];
                    placeBefore = /^\+/.test(dataType);
                    if (placeBefore) {
                        dataType = dataType.substr(1) || "*";
                    }
                    list = structure[dataType] = structure[dataType] || [];
                    list[placeBefore ? "unshift" : "push"](func);
                }
            }
        };
    }

    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, dataType, inspected) {
        dataType = dataType || options.dataTypes[0];
        inspected = inspected || {};
        inspected[dataType] = true;
        var list = structure[dataType], i = 0, length = list ? list.length : 0, executeOnly = (structure === prefilters), selection;
        for (; i < length && (executeOnly || !selection); i++) {
            selection = list[i](options, originalOptions, jqXHR);
            if (typeof selection === "string") {
                if (!executeOnly || inspected[selection]) {
                    selection = undefined;
                } else {
                    options.dataTypes.unshift(selection);
                    selection = inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, selection, inspected);
                }
            }
        }
        if ((executeOnly || !selection) && !inspected["*"]) {
            selection = inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, "*", inspected);
        }
        return selection;
    }

    jQuery.fn.extend({
        load: function (url, params, callback) {
            if (typeof url !== "string" && _load) {
                return _load.apply(this, arguments);
            } else if (!this.length) {
                return this;
            }
            var off = url.indexOf(" ");
            if (off >= 0) {
                var selector = url.slice(off, url.length);
                url = url.slice(0, off);
            }
            var type = "GET";
            if (params) {
                if (jQuery.isFunction(params)) {
                    callback = params;
                    params = undefined;
                } else if (typeof params === "object") {
                    params = jQuery.param(params, jQuery.ajaxSettings.traditional);
                    type = "POST";
                }
            }
            var self = this;
            jQuery.ajax({
                url: url, type: type, dataType: "html", data: params, complete: function (jqXHR, status, responseText) {
                    responseText = jqXHR.responseText;
                    if (jqXHR.isResolved()) {
                        jqXHR.done(function (r) {
                            responseText = r;
                        });
                        self.html(selector ? jQuery("<div>").append(responseText.replace(rscript, "")).find(selector) : responseText);
                    }
                    if (callback) {
                        self.each(callback, [responseText, status, jqXHR]);
                    }
                }
            });
            return this;
        }, serialize: function () {
            return jQuery.param(this.serializeArray());
        }, serializeArray: function () {
            return this.map(function () {
                return this.elements ? jQuery.makeArray(this.elements) : this;
            }).filter(function () {
                return this.name && !this.disabled && (this.checked || rselectTextarea.test(this.nodeName) || rinput.test(this.type));
            }).map(function (i, elem) {
                var val = jQuery(this).val();
                return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function (val, i) {
                    return {name: elem.name, value: val.replace(rCRLF, "\r\n")};
                }) : {name: elem.name, value: val.replace(rCRLF, "\r\n")};
            }).get();
        }
    });
    jQuery.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (i, o) {
        jQuery.fn[o] = function (f) {
            return this.bind(o, f);
        };
    });
    jQuery.each(["get", "post"], function (i, method) {
        jQuery[method] = function (url, data, callback, type) {
            if (jQuery.isFunction(data)) {
                type = type || callback;
                callback = data;
                data = undefined;
            }
            return jQuery.ajax({type: method, url: url, data: data, success: callback, dataType: type});
        };
    });
    jQuery.extend({
        getScript: function (url, callback) {
            return jQuery.get(url, undefined, callback, "script");
        },
        getJSON: function (url, data, callback) {
            return jQuery.get(url, data, callback, "json");
        },
        ajaxSetup: function (target, settings) {
            if (!settings) {
                settings = target;
                target = jQuery.extend(true, jQuery.ajaxSettings, settings);
            } else {
                jQuery.extend(true, target, jQuery.ajaxSettings, settings);
            }
            for (var field in{context: 1, url: 1}) {
                if (field in settings) {
                    target[field] = settings[field];
                } else if (field in jQuery.ajaxSettings) {
                    target[field] = jQuery.ajaxSettings[field];
                }
            }
            return target;
        },
        ajaxSettings: {
            url: ajaxLocation,
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
            global: true,
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            processData: true,
            async: true,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": "*/*"
            },
            contents: {xml: /xml/, html: /html/, json: /json/},
            responseFields: {xml: "responseXML", text: "responseText"},
            converters: {
                "* text": window.String,
                "text html": true,
                "text json": jQuery.parseJSON,
                "text xml": jQuery.parseXML
            }
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        ajax: function (url, options) {
            if (typeof url === "object") {
                options = url;
                url = undefined;
            }
            options = options || {};
            var
                s = jQuery.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = callbackContext !== s && (callbackContext.nodeType || callbackContext instanceof jQuery) ? jQuery(callbackContext) : jQuery.event, deferred = jQuery.Deferred(), completeDeferred = jQuery._Deferred(), statusCode = s.statusCode || {}, ifModifiedKey, requestHeaders = {}, responseHeadersString, responseHeaders, transport, timeoutTimer, parts, state = 0, fireGlobals, i, jqXHR = {
                    readyState: 0, setRequestHeader: function (name, value) {
                        if (!state) {
                            requestHeaders[name.toLowerCase().replace(rucHeaders, rucHeadersFunc)] = value;
                        }
                        return this;
                    }, getAllResponseHeaders: function () {
                        return state === 2 ? responseHeadersString : null;
                    }, getResponseHeader: function (key) {
                        var match;
                        if (state === 2) {
                            if (!responseHeaders) {
                                responseHeaders = {};
                                while ((match = rheaders.exec(responseHeadersString))) {
                                    responseHeaders[match[1].toLowerCase()] = match[2];
                                }
                            }
                            match = responseHeaders[key.toLowerCase()];
                        }
                        return match === undefined ? null : match;
                    }, overrideMimeType: function (type) {
                        if (!state) {
                            s.mimeType = type;
                        }
                        return this;
                    }, abort: function (statusText) {
                        statusText = statusText || "abort";
                        if (transport) {
                            transport.abort(statusText);
                        }
                        done(0, statusText);
                        return this;
                    }
                };

            function done(status, statusText, responses, headers) {
                if (state === 2) {
                    return;
                }
                state = 2;
                if (timeoutTimer) {
                    clearTimeout(timeoutTimer);
                }
                transport = undefined;
                responseHeadersString = headers || "";
                jqXHR.readyState = status ? 4 : 0;
                var isSuccess, success, error, response = responses ? ajaxHandleResponses(s, jqXHR, responses) : undefined, lastModified, etag;
                if (status >= 200 && status < 300 || status === 304) {
                    if (s.ifModified) {
                        if ((lastModified = jqXHR.getResponseHeader("Last-Modified"))) {
                            jQuery.lastModified[ifModifiedKey] = lastModified;
                        }
                        if ((etag = jqXHR.getResponseHeader("Etag"))) {
                            jQuery.etag[ifModifiedKey] = etag;
                        }
                    }
                    if (status === 304) {
                        statusText = "notmodified";
                        isSuccess = true;
                    } else {
                        try {
                            success = ajaxConvert(s, response);
                            statusText = "success";
                            isSuccess = true;
                        } catch (e) {
                            statusText = "parsererror";
                            error = e;
                        }
                    }
                } else {
                    error = statusText;
                    if (!statusText || status) {
                        statusText = "error";
                        if (status < 0) {
                            status = 0;
                        }
                    }
                }
                jqXHR.status = status;
                jqXHR.statusText = statusText;
                if (isSuccess) {
                    deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
                } else {
                    deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
                }
                jqXHR.statusCode(statusCode);
                statusCode = undefined;
                if (fireGlobals) {
                    globalEventContext.trigger("ajax" + (isSuccess ? "Success" : "Error"), [jqXHR, s, isSuccess ? success : error]);
                }
                completeDeferred.resolveWith(callbackContext, [jqXHR, statusText]);
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
                    if (!(--jQuery.active)) {
                        jQuery.event.trigger("ajaxStop");
                    }
                }
            }

            deferred.promise(jqXHR);
            jqXHR.success = jqXHR.done;
            jqXHR.error = jqXHR.fail;
            jqXHR.complete = completeDeferred.done;
            jqXHR.statusCode = function (map) {
                if (map) {
                    var tmp;
                    if (state < 2) {
                        for (tmp in map) {
                            statusCode[tmp] = [statusCode[tmp], map[tmp]];
                        }
                    } else {
                        tmp = map[jqXHR.status];
                        jqXHR.then(tmp, tmp);
                    }
                }
                return this;
            };
            s.url = ((url || s.url) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//");
            s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().split(rspacesAjax);
            if (!s.crossDomain) {
                parts = rurl.exec(s.url.toLowerCase());
                s.crossDomain = !!(parts && (parts[1] != ajaxLocParts[1] || parts[2] != ajaxLocParts[2] || (parts[3] || (parts[1] === "http:" ? 80 : 443)) != (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? 80 : 443))));
            }
            if (s.data && s.processData && typeof s.data !== "string") {
                s.data = jQuery.param(s.data, s.traditional);
            }
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
            if (state === 2) {
                return false;
            }
            fireGlobals = s.global;
            s.type = s.type.toUpperCase();
            s.hasContent = !rnoContent.test(s.type);
            if (fireGlobals && jQuery.active++ === 0) {
                jQuery.event.trigger("ajaxStart");
            }
            if (!s.hasContent) {
                if (s.data) {
                    s.url += (rquery.test(s.url) ? "&" : "?") + s.data;
                }
                ifModifiedKey = s.url;
                if (s.cache === false) {
                    var ts = jQuery.now(), ret = s.url.replace(rts, "$1_=" + ts);
                    s.url = ret + ((ret === s.url) ? (rquery.test(s.url) ? "&" : "?") + "_=" + ts : "");
                }
            }
            if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
                requestHeaders["Content-Type"] = s.contentType;
            }
            if (s.ifModified) {
                ifModifiedKey = ifModifiedKey || s.url;
                if (jQuery.lastModified[ifModifiedKey]) {
                    requestHeaders["If-Modified-Since"] = jQuery.lastModified[ifModifiedKey];
                }
                if (jQuery.etag[ifModifiedKey]) {
                    requestHeaders["If-None-Match"] = jQuery.etag[ifModifiedKey];
                }
            }
            requestHeaders.Accept = s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", */*; q=0.01" : "") : s.accepts["*"];
            for (i in s.headers) {
                jqXHR.setRequestHeader(i, s.headers[i]);
            }
            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
                jqXHR.abort();
                return false;
            }
            for (i in{success: 1, error: 1, complete: 1}) {
                jqXHR[i](s[i]);
            }
            transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
            if (!transport) {
                done(-1, "No Transport");
            } else {
                jqXHR.readyState = 1;
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxSend", [jqXHR, s]);
                }
                if (s.async && s.timeout > 0) {
                    timeoutTimer = setTimeout(function () {
                        jqXHR.abort("timeout");
                    }, s.timeout);
                }
                try {
                    state = 1;
                    transport.send(requestHeaders, done);
                } catch (e) {
                    if (status < 2) {
                        done(-1, e);
                    } else {
                        jQuery.error(e);
                    }
                }
            }
            return jqXHR;
        },
        param: function (a, traditional) {
            var s = [], add = function (key, value) {
                value = jQuery.isFunction(value) ? value() : value;
                s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
            };
            if (traditional === undefined) {
                traditional = jQuery.ajaxSettings.traditional;
            }
            if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
                jQuery.each(a, function () {
                    add(this.name, this.value);
                });
            } else {
                for (var prefix in a) {
                    buildParams(prefix, a[prefix], traditional, add);
                }
            }
            return s.join("&").replace(r20, "+");
        }
    });
    function buildParams(prefix, obj, traditional, add) {
        if (jQuery.isArray(obj) && obj.length) {
            jQuery.each(obj, function (i, v) {
                if (traditional || rbracket.test(prefix)) {
                    add(prefix, v);
                } else {
                    buildParams(prefix + "[" + (typeof v === "object" || jQuery.isArray(v) ? i : "") + "]", v, traditional, add);
                }
            });
        } else if (!traditional && obj != null && typeof obj === "object") {
            if (jQuery.isArray(obj) || jQuery.isEmptyObject(obj)) {
                add(prefix, "");
            } else {
                for (var name in obj) {
                    buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
                }
            }
        } else {
            add(prefix, obj);
        }
    }

    jQuery.extend({active: 0, lastModified: {}, etag: {}});
    function ajaxHandleResponses(s, jqXHR, responses) {
        var contents = s.contents, dataTypes = s.dataTypes, responseFields = s.responseFields, ct, type, finalDataType, firstDataType;
        for (type in responseFields) {
            if (type in responses) {
                jqXHR[responseFields[type]] = responses[type];
            }
        }
        while (dataTypes[0] === "*") {
            dataTypes.shift();
            if (ct === undefined) {
                ct = s.mimeType || jqXHR.getResponseHeader("content-type");
            }
        }
        if (ct) {
            for (type in contents) {
                if (contents[type] && contents[type].test(ct)) {
                    dataTypes.unshift(type);
                    break;
                }
            }
        }
        if (dataTypes[0]in responses) {
            finalDataType = dataTypes[0];
        } else {
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break;
                }
                if (!firstDataType) {
                    firstDataType = type;
                }
            }
            finalDataType = finalDataType || firstDataType;
        }
        if (finalDataType) {
            if (finalDataType !== dataTypes[0]) {
                dataTypes.unshift(finalDataType);
            }
            return responses[finalDataType];
        }
    }

    function ajaxConvert(s, response) {
        if (s.dataFilter) {
            response = s.dataFilter(response, s.dataType);
        }
        var dataTypes = s.dataTypes, converters = {}, i, key, length = dataTypes.length, tmp, current = dataTypes[0], prev, conversion, conv, conv1, conv2;
        for (i = 1; i < length; i++) {
            if (i === 1) {
                for (key in s.converters) {
                    if (typeof key === "string") {
                        converters[key.toLowerCase()] = s.converters[key];
                    }
                }
            }
            prev = current;
            current = dataTypes[i];
            if (current === "*") {
                current = prev;
            } else if (prev !== "*" && prev !== current) {
                conversion = prev + " " + current;
                conv = converters[conversion] || converters["* " + current];
                if (!conv) {
                    conv2 = undefined;
                    for (conv1 in converters) {
                        tmp = conv1.split(" ");
                        if (tmp[0] === prev || tmp[0] === "*") {
                            conv2 = converters[tmp[1] + " " + current];
                            if (conv2) {
                                conv1 = converters[conv1];
                                if (conv1 === true) {
                                    conv = conv2;
                                } else if (conv2 === true) {
                                    conv = conv1;
                                }
                                break;
                            }
                        }
                    }
                }
                if (!(conv || conv2)) {
                    jQuery.error("No conversion from " + conversion.replace(" ", " to "));
                }
                if (conv !== true) {
                    response = conv ? conv(response) : conv2(conv1(response));
                }
            }
        }
        return response;
    }

    var jsc = jQuery.now(), jsre = /(\=)\?(&|$)|()\?\?()/i;
    jQuery.ajaxSetup({
        jsonp: "callback", jsonpCallback: function () {
            return jQuery.expando + "_" + (jsc++);
        }
    });
    jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {
        var dataIsString = (typeof s.data === "string");
        if (s.dataTypes[0] === "jsonp" || originalSettings.jsonpCallback || originalSettings.jsonp != null || s.jsonp !== false && (jsre.test(s.url) || dataIsString && jsre.test(s.data))) {
            var responseContainer, jsonpCallback = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback, previous = window[jsonpCallback], url = s.url, data = s.data, replace = "$1" + jsonpCallback + "$2", cleanUp = function () {
                window[jsonpCallback] = previous;
                if (responseContainer && jQuery.isFunction(previous)) {
                    window[jsonpCallback](responseContainer[0]);
                }
            };
            if (s.jsonp !== false) {
                url = url.replace(jsre, replace);
                if (s.url === url) {
                    if (dataIsString) {
                        data = data.replace(jsre, replace);
                    }
                    if (s.data === data) {
                        url += (/\?/.test(url) ? "&" : "?") + s.jsonp + "=" + jsonpCallback;
                    }
                }
            }
            s.url = url;
            s.data = data;
            window[jsonpCallback] = function (response) {
                responseContainer = [response];
            };
            jqXHR.then(cleanUp, cleanUp);
            s.converters["script json"] = function () {
                if (!responseContainer) {
                    jQuery.error(jsonpCallback + " was not called");
                }
                return responseContainer[0];
            };
            s.dataTypes[0] = "json";
            return "script";
        }
    });
    jQuery.ajaxSetup({
        accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
        contents: {script: /javascript|ecmascript/},
        converters: {
            "text script": function (text) {
                jQuery.globalEval(text);
                return text;
            }
        }
    });
    jQuery.ajaxPrefilter("script", function (s) {
        if (s.cache === undefined) {
            s.cache = false;
        }
        if (s.crossDomain) {
            s.type = "GET";
            s.global = false;
        }
    });
    jQuery.ajaxTransport("script", function (s) {
        if (s.crossDomain) {
            var script, head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
            return {
                send: function (_, callback) {
                    script = document.createElement("script");
                    script.async = "async";
                    if (s.scriptCharset) {
                        script.charset = s.scriptCharset;
                    }
                    script.src = s.url;
                    script.onload = script.onreadystatechange = function (_, isAbort) {
                        if (!script.readyState || /loaded|complete/.test(script.readyState)) {
                            script.onload = script.onreadystatechange = null;
                            if (head && script.parentNode) {
                                head.removeChild(script);
                            }
                            script = undefined;
                            if (!isAbort) {
                                callback(200, "success");
                            }
                        }
                    };
                    head.insertBefore(script, head.firstChild);
                }, abort: function () {
                    if (script) {
                        script.onload(0, 1);
                    }
                }
            };
        }
    });
    var
        xhrId = jQuery.now(), xhrCallbacks, testXHR;

    function xhrOnUnloadAbort() {
        jQuery(window).unload(function () {
            for (var key in xhrCallbacks) {
                xhrCallbacks[key](0, 1);
            }
        });
    }

    function createStandardXHR() {
        try {
            return new window.XMLHttpRequest();
        } catch (e) {
        }
    }

    function createActiveXHR() {
        try {
            return new window.ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
        }
    }

    jQuery.ajaxSettings.xhr = window.ActiveXObject ? function () {
        return !this.isLocal && createStandardXHR() || createActiveXHR();
    } : createStandardXHR;
    testXHR = jQuery.ajaxSettings.xhr();
    jQuery.support.ajax = !!testXHR;
    jQuery.support.cors = testXHR && ("withCredentials"in testXHR);
    testXHR = undefined;
    if (jQuery.support.ajax) {
        jQuery.ajaxTransport(function (s) {
            if (!s.crossDomain || jQuery.support.cors) {
                var callback;
                return {
                    send: function (headers, complete) {
                        var xhr = s.xhr(), handle, i;
                        if (s.username) {
                            xhr.open(s.type, s.url, s.async, s.username, s.password);
                        } else {
                            xhr.open(s.type, s.url, s.async);
                        }
                        if (s.xhrFields) {
                            for (i in s.xhrFields) {
                                xhr[i] = s.xhrFields[i];
                            }
                        }
                        if (s.mimeType && xhr.overrideMimeType) {
                            xhr.overrideMimeType(s.mimeType);
                        }
                        if (!(s.crossDomain && !s.hasContent) && !headers["X-Requested-With"]) {
                            headers["X-Requested-With"] = "XMLHttpRequest";
                        }
                        try {
                            for (i in headers) {
                                xhr.setRequestHeader(i, headers[i]);
                            }
                        } catch (_) {
                        }
                        xhr.send((s.hasContent && s.data) || null);
                        callback = function (_, isAbort) {
                            var status, statusText, responseHeaders, responses, xml;
                            try {
                                if (callback && (isAbort || xhr.readyState === 4)) {
                                    callback = undefined;
                                    if (handle) {
                                        xhr.onreadystatechange = jQuery.noop;
                                        delete xhrCallbacks[handle];
                                    }
                                    if (isAbort) {
                                        if (xhr.readyState !== 4) {
                                            xhr.abort();
                                        }
                                    } else {
                                        status = xhr.status;
                                        responseHeaders = xhr.getAllResponseHeaders();
                                        responses = {};
                                        xml = xhr.responseXML;
                                        if (xml && xml.documentElement) {
                                            responses.xml = xml;
                                        }
                                        responses.text = xhr.responseText;
                                        try {
                                            statusText = xhr.statusText;
                                        } catch (e) {
                                            statusText = "";
                                        }
                                        if (!status && s.isLocal && !s.crossDomain) {
                                            status = responses.text ? 200 : 404;
                                        } else if (status === 1223) {
                                            status = 204;
                                        }
                                    }
                                }
                            } catch (firefoxAccessException) {
                                if (!isAbort) {
                                    complete(-1, firefoxAccessException);
                                }
                            }
                            if (responses) {
                                complete(status, statusText, responses, responseHeaders);
                            }
                        };
                        if (!s.async || xhr.readyState === 4) {
                            callback();
                        } else {
                            if (!xhrCallbacks) {
                                xhrCallbacks = {};
                                xhrOnUnloadAbort();
                            }
                            handle = xhrId++;
                            xhr.onreadystatechange = xhrCallbacks[handle] = callback;
                        }
                    }, abort: function () {
                        if (callback) {
                            callback(0, 1);
                        }
                    }
                };
            }
        });
    }
    var elemdisplay = {}, rfxtypes = /^(?:toggle|show|hide)$/, rfxnum = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i, timerId, fxAttrs = [["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"], ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"], ["opacity"]];
    jQuery.fn.extend({
        show: function (speed, easing, callback) {
            var elem, display;
            if (speed || speed === 0) {
                return this.animate(genFx("show", 3), speed, easing, callback);
            } else {
                for (var i = 0, j = this.length; i < j; i++) {
                    elem = this[i];
                    display = elem.style.display;
                    if (!jQuery._data(elem, "olddisplay") && display === "none") {
                        display = elem.style.display = "";
                    }
                    if (display === "" && jQuery.css(elem, "display") === "none") {
                        jQuery._data(elem, "olddisplay", defaultDisplay(elem.nodeName));
                    }
                }
                for (i = 0; i < j; i++) {
                    elem = this[i];
                    display = elem.style.display;
                    if (display === "" || display === "none") {
                        elem.style.display = jQuery._data(elem, "olddisplay") || "";
                    }
                }
                return this;
            }
        }, hide: function (speed, easing, callback) {
            if (speed || speed === 0) {
                return this.animate(genFx("hide", 3), speed, easing, callback);
            } else {
                for (var i = 0, j = this.length; i < j; i++) {
                    var display = jQuery.css(this[i], "display");
                    if (display !== "none" && !jQuery._data(this[i], "olddisplay")) {
                        jQuery._data(this[i], "olddisplay", display);
                    }
                }
                for (i = 0; i < j; i++) {
                    this[i].style.display = "none";
                }
                return this;
            }
        }, _toggle: jQuery.fn.toggle, toggle: function (fn, fn2, callback) {
            var bool = typeof fn === "boolean";
            if (jQuery.isFunction(fn) && jQuery.isFunction(fn2)) {
                this._toggle.apply(this, arguments);
            } else if (fn == null || bool) {
                this.each(function () {
                    var state = bool ? fn : jQuery(this).is(":hidden");
                    jQuery(this)[state ? "show" : "hide"]();
                });
            } else {
                this.animate(genFx("toggle", 3), fn, fn2, callback);
            }
            return this;
        }, fadeTo: function (speed, to, easing, callback) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({opacity: to}, speed, easing, callback);
        }, animate: function (prop, speed, easing, callback) {
            var optall = jQuery.speed(speed, easing, callback);
            if (jQuery.isEmptyObject(prop)) {
                return this.each(optall.complete);
            }
            return this[optall.queue === false ? "each" : "queue"](function () {
                var opt = jQuery.extend({}, optall), p, isElement = this.nodeType === 1, hidden = isElement && jQuery(this).is(":hidden"), self = this;
                for (p in prop) {
                    var name = jQuery.camelCase(p);
                    if (p !== name) {
                        prop[name] = prop[p];
                        delete prop[p];
                        p = name;
                    }
                    if (prop[p] === "hide" && hidden || prop[p] === "show" && !hidden) {
                        return opt.complete.call(this);
                    }
                    if (isElement && (p === "height" || p === "width")) {
                        opt.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY];
                        if (jQuery.css(this, "display") === "inline" && jQuery.css(this, "float") === "none") {
                            if (!jQuery.support.inlineBlockNeedsLayout) {
                                this.style.display = "inline-block";
                            } else {
                                var display = defaultDisplay(this.nodeName);
                                if (display === "inline") {
                                    this.style.display = "inline-block";
                                } else {
                                    this.style.display = "inline";
                                    this.style.zoom = 1;
                                }
                            }
                        }
                    }
                    if (jQuery.isArray(prop[p])) {
                        (opt.specialEasing = opt.specialEasing || {})[p] = prop[p][1];
                        prop[p] = prop[p][0];
                    }
                }
                if (opt.overflow != null) {
                    this.style.overflow = "hidden";
                }
                opt.curAnim = jQuery.extend({}, prop);
                jQuery.each(prop, function (name, val) {
                    var e = new jQuery.fx(self, opt, name);
                    if (rfxtypes.test(val)) {
                        e[val === "toggle" ? hidden ? "show" : "hide" : val](prop);
                    } else {
                        var parts = rfxnum.exec(val), start = e.cur();
                        if (parts) {
                            var end = parseFloat(parts[2]), unit = parts[3] || (jQuery.cssNumber[name] ? "" : "px");
                            if (unit !== "px") {
                                jQuery.style(self, name, (end || 1) + unit);
                                start = ((end || 1) / e.cur()) * start;
                                jQuery.style(self, name, start + unit);
                            }
                            if (parts[1]) {
                                end = ((parts[1] === "-=" ? -1 : 1) * end) + start;
                            }
                            e.custom(start, end, unit);
                        } else {
                            e.custom(start, val, "");
                        }
                    }
                });
                return true;
            });
        }, stop: function (clearQueue, gotoEnd) {
            var timers = jQuery.timers;
            if (clearQueue) {
                this.queue([]);
            }
            this.each(function () {
                for (var i = timers.length - 1; i >= 0; i--) {
                    if (timers[i].elem === this) {
                        if (gotoEnd) {
                            timers[i](true);
                        }
                        timers.splice(i, 1);
                    }
                }
            });
            if (!gotoEnd) {
                this.dequeue();
            }
            return this;
        }
    });
    function genFx(type, num) {
        var obj = {};
        jQuery.each(fxAttrs.concat.apply([], fxAttrs.slice(0, num)), function () {
            obj[this] = type;
        });
        return obj;
    }

    jQuery.each({
        slideDown: genFx("show", 1),
        slideUp: genFx("hide", 1),
        slideToggle: genFx("toggle", 1),
        fadeIn: {opacity: "show"},
        fadeOut: {opacity: "hide"},
        fadeToggle: {opacity: "toggle"}
    }, function (name, props) {
        jQuery.fn[name] = function (speed, easing, callback) {
            return this.animate(props, speed, easing, callback);
        };
    });
    jQuery.extend({
        speed: function (speed, easing, fn) {
            var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
                complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
                duration: speed,
                easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
            };
            opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
            opt.old = opt.complete;
            opt.complete = function () {
                if (opt.queue !== false) {
                    jQuery(this).dequeue();
                }
                if (jQuery.isFunction(opt.old)) {
                    opt.old.call(this);
                }
            };
            return opt;
        }, easing: {
            linear: function (p, n, firstNum, diff) {
                return firstNum + diff * p;
            }, swing: function (p, n, firstNum, diff) {
                return ((-Math.cos(p * Math.PI) / 2) + 0.5) * diff + firstNum;
            }
        }, timers: [], fx: function (elem, options, prop) {
            this.options = options;
            this.elem = elem;
            this.prop = prop;
            if (!options.orig) {
                options.orig = {};
            }
        }
    });
    jQuery.fx.prototype = {
        update: function () {
            if (this.options.step) {
                this.options.step.call(this.elem, this.now, this);
            }
            (jQuery.fx.step[this.prop] || jQuery.fx.step._default)(this);
        }, cur: function () {
            if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) {
                return this.elem[this.prop];
            }
            var parsed, r = jQuery.css(this.elem, this.prop);
            return isNaN(parsed = parseFloat(r)) ? !r || r === "auto" ? 0 : r : parsed;
        }, custom: function (from, to, unit) {
            var self = this, fx = jQuery.fx;
            this.startTime = jQuery.now();
            this.start = from;
            this.end = to;
            this.unit = unit || this.unit || (jQuery.cssNumber[this.prop] ? "" : "px");
            this.now = this.start;
            this.pos = this.state = 0;
            function t(gotoEnd) {
                return self.step(gotoEnd);
            }

            t.elem = this.elem;
            if (t() && jQuery.timers.push(t) && !timerId) {
                timerId = setInterval(fx.tick, fx.interval);
            }
        }, show: function () {
            this.options.orig[this.prop] = jQuery.style(this.elem, this.prop);
            this.options.show = true;
            this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur());
            jQuery(this.elem).show();
        }, hide: function () {
            this.options.orig[this.prop] = jQuery.style(this.elem, this.prop);
            this.options.hide = true;
            this.custom(this.cur(), 0);
        }, step: function (gotoEnd) {
            var t = jQuery.now(), done = true;
            if (gotoEnd || t >= this.options.duration + this.startTime) {
                this.now = this.end;
                this.pos = this.state = 1;
                this.update();
                this.options.curAnim[this.prop] = true;
                for (var i in this.options.curAnim) {
                    if (this.options.curAnim[i] !== true) {
                        done = false;
                    }
                }
                if (done) {
                    if (this.options.overflow != null && !jQuery.support.shrinkWrapBlocks) {
                        var elem = this.elem, options = this.options;
                        jQuery.each(["", "X", "Y"], function (index, value) {
                            elem.style["overflow" + value] = options.overflow[index];
                        });
                    }
                    if (this.options.hide) {
                        jQuery(this.elem).hide();
                    }
                    if (this.options.hide || this.options.show) {
                        for (var p in this.options.curAnim) {
                            jQuery.style(this.elem, p, this.options.orig[p]);
                        }
                    }
                    this.options.complete.call(this.elem);
                }
                return false;
            } else {
                var n = t - this.startTime;
                this.state = n / this.options.duration;
                var specialEasing = this.options.specialEasing && this.options.specialEasing[this.prop];
                var defaultEasing = this.options.easing || (jQuery.easing.swing ? "swing" : "linear");
                this.pos = jQuery.easing[specialEasing || defaultEasing](this.state, n, 0, 1, this.options.duration);
                this.now = this.start + ((this.end - this.start) * this.pos);
                this.update();
            }
            return true;
        }
    };
    jQuery.extend(jQuery.fx, {
        tick: function () {
            var timers = jQuery.timers;
            for (var i = 0; i < timers.length; i++) {
                if (!timers[i]()) {
                    timers.splice(i--, 1);
                }
            }
            if (!timers.length) {
                jQuery.fx.stop();
            }
        }, interval: 13, stop: function () {
            clearInterval(timerId);
            timerId = null;
        }, speeds: {slow: 600, fast: 200, _default: 400}, step: {
            opacity: function (fx) {
                jQuery.style(fx.elem, "opacity", fx.now);
            }, _default: function (fx) {
                if (fx.elem.style && fx.elem.style[fx.prop] != null) {
                    fx.elem.style[fx.prop] = (fx.prop === "width" || fx.prop === "height" ? Math.max(0, fx.now) : fx.now) + fx.unit;
                } else {
                    fx.elem[fx.prop] = fx.now;
                }
            }
        }
    });
    if (jQuery.expr && jQuery.expr.filters) {
        jQuery.expr.filters.animated = function (elem) {
            return jQuery.grep(jQuery.timers, function (fn) {
                return elem === fn.elem;
            }).length;
        };
    }
    function defaultDisplay(nodeName) {
        if (!elemdisplay[nodeName]) {
            var elem = jQuery("<" + nodeName + ">").appendTo("body"), display = elem.css("display");
            elem.remove();
            if (display === "none" || display === "") {
                display = "block";
            }
            elemdisplay[nodeName] = display;
        }
        return elemdisplay[nodeName];
    }

    var rtable = /^t(?:able|d|h)$/i, rroot = /^(?:body|html)$/i;
    if ("getBoundingClientRect"in document.documentElement) {
        jQuery.fn.offset = function (options) {
            var elem = this[0], box;
            if (options) {
                return this.each(function (i) {
                    jQuery.offset.setOffset(this, options, i);
                });
            }
            if (!elem || !elem.ownerDocument) {
                return null;
            }
            if (elem === elem.ownerDocument.body) {
                return jQuery.offset.bodyOffset(elem);
            }
            try {
                box = elem.getBoundingClientRect();
            } catch (e) {
            }
            var doc = elem.ownerDocument, docElem = doc.documentElement;
            if (!box || !jQuery.contains(docElem, elem)) {
                return box ? {top: box.top, left: box.left} : {top: 0, left: 0};
            }
            var body = doc.body, win = getWindow(doc), clientTop = docElem.clientTop || body.clientTop || 0, clientLeft = docElem.clientLeft || body.clientLeft || 0, scrollTop = (win.pageYOffset || jQuery.support.boxModel && docElem.scrollTop || body.scrollTop), scrollLeft = (win.pageXOffset || jQuery.support.boxModel && docElem.scrollLeft || body.scrollLeft), top = box.top + scrollTop - clientTop, left = box.left + scrollLeft - clientLeft;
            return {top: top, left: left};
        };
    } else {
        jQuery.fn.offset = function (options) {
            var elem = this[0];
            if (options) {
                return this.each(function (i) {
                    jQuery.offset.setOffset(this, options, i);
                });
            }
            if (!elem || !elem.ownerDocument) {
                return null;
            }
            if (elem === elem.ownerDocument.body) {
                return jQuery.offset.bodyOffset(elem);
            }
            jQuery.offset.initialize();
            var computedStyle, offsetParent = elem.offsetParent, prevOffsetParent = elem, doc = elem.ownerDocument, docElem = doc.documentElement, body = doc.body, defaultView = doc.defaultView, prevComputedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle, top = elem.offsetTop, left = elem.offsetLeft;
            while ((elem = elem.parentNode) && elem !== body && elem !== docElem) {
                if (jQuery.offset.supportsFixedPosition && prevComputedStyle.position === "fixed") {
                    break;
                }
                computedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle;
                top -= elem.scrollTop;
                left -= elem.scrollLeft;
                if (elem === offsetParent) {
                    top += elem.offsetTop;
                    left += elem.offsetLeft;
                    if (jQuery.offset.doesNotAddBorder && !(jQuery.offset.doesAddBorderForTableAndCells && rtable.test(elem.nodeName))) {
                        top += parseFloat(computedStyle.borderTopWidth) || 0;
                        left += parseFloat(computedStyle.borderLeftWidth) || 0;
                    }
                    prevOffsetParent = offsetParent;
                    offsetParent = elem.offsetParent;
                }
                if (jQuery.offset.subtractsBorderForOverflowNotVisible && computedStyle.overflow !== "visible") {
                    top += parseFloat(computedStyle.borderTopWidth) || 0;
                    left += parseFloat(computedStyle.borderLeftWidth) || 0;
                }
                prevComputedStyle = computedStyle;
            }
            if (prevComputedStyle.position === "relative" || prevComputedStyle.position === "static") {
                top += body.offsetTop;
                left += body.offsetLeft;
            }
            if (jQuery.offset.supportsFixedPosition && prevComputedStyle.position === "fixed") {
                top += Math.max(docElem.scrollTop, body.scrollTop);
                left += Math.max(docElem.scrollLeft, body.scrollLeft);
            }
            return {top: top, left: left};
        };
    }
    jQuery.offset = {
        initialize: function () {
            var body = document.body, container = document.createElement("div"), innerDiv, checkDiv, table, td, bodyMarginTop = parseFloat(jQuery.css(body, "marginTop")) || 0, html = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
            jQuery.extend(container.style, {
                position: "absolute",
                top: 0,
                left: 0,
                margin: 0,
                border: 0,
                width: "1px",
                height: "1px",
                visibility: "hidden"
            });
            container.innerHTML = html;
            body.insertBefore(container, body.firstChild);
            innerDiv = container.firstChild;
            checkDiv = innerDiv.firstChild;
            td = innerDiv.nextSibling.firstChild.firstChild;
            this.doesNotAddBorder = (checkDiv.offsetTop !== 5);
            this.doesAddBorderForTableAndCells = (td.offsetTop === 5);
            checkDiv.style.position = "fixed";
            checkDiv.style.top = "20px";
            this.supportsFixedPosition = (checkDiv.offsetTop === 20 || checkDiv.offsetTop === 15);
            checkDiv.style.position = checkDiv.style.top = "";
            innerDiv.style.overflow = "hidden";
            innerDiv.style.position = "relative";
            this.subtractsBorderForOverflowNotVisible = (checkDiv.offsetTop === -5);
            this.doesNotIncludeMarginInBodyOffset = (body.offsetTop !== bodyMarginTop);
            body.removeChild(container);
            body = container = innerDiv = checkDiv = table = td = null;
            jQuery.offset.initialize = jQuery.noop;
        }, bodyOffset: function (body) {
            var top = body.offsetTop, left = body.offsetLeft;
            jQuery.offset.initialize();
            if (jQuery.offset.doesNotIncludeMarginInBodyOffset) {
                top += parseFloat(jQuery.css(body, "marginTop")) || 0;
                left += parseFloat(jQuery.css(body, "marginLeft")) || 0;
            }
            return {top: top, left: left};
        }, setOffset: function (elem, options, i) {
            var position = jQuery.css(elem, "position");
            if (position === "static") {
                elem.style.position = "relative";
            }
            var curElem = jQuery(elem), curOffset = curElem.offset(), curCSSTop = jQuery.css(elem, "top"), curCSSLeft = jQuery.css(elem, "left"), calculatePosition = (position === "absolute" && jQuery.inArray('auto', [curCSSTop, curCSSLeft]) > -1), props = {}, curPosition = {}, curTop, curLeft;
            if (calculatePosition) {
                curPosition = curElem.position();
            }
            curTop = calculatePosition ? curPosition.top : parseInt(curCSSTop, 10) || 0;
            curLeft = calculatePosition ? curPosition.left : parseInt(curCSSLeft, 10) || 0;
            if (jQuery.isFunction(options)) {
                options = options.call(elem, i, curOffset);
            }
            if (options.top != null) {
                props.top = (options.top - curOffset.top) + curTop;
            }
            if (options.left != null) {
                props.left = (options.left - curOffset.left) + curLeft;
            }
            if ("using"in options) {
                options.using.call(elem, props);
            } else {
                curElem.css(props);
            }
        }
    };
    jQuery.fn.extend({
        position: function () {
            if (!this[0]) {
                return null;
            }
            var elem = this[0], offsetParent = this.offsetParent(), offset = this.offset(), parentOffset = rroot.test(offsetParent[0].nodeName) ? {
                top: 0,
                left: 0
            } : offsetParent.offset();
            offset.top -= parseFloat(jQuery.css(elem, "marginTop")) || 0;
            offset.left -= parseFloat(jQuery.css(elem, "marginLeft")) || 0;
            parentOffset.top += parseFloat(jQuery.css(offsetParent[0], "borderTopWidth")) || 0;
            parentOffset.left += parseFloat(jQuery.css(offsetParent[0], "borderLeftWidth")) || 0;
            return {top: offset.top - parentOffset.top, left: offset.left - parentOffset.left};
        }, offsetParent: function () {
            return this.map(function () {
                var offsetParent = this.offsetParent || document.body;
                while (offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static")) {
                    offsetParent = offsetParent.offsetParent;
                }
                return offsetParent;
            });
        }
    });
    jQuery.each(["Left", "Top"], function (i, name) {
        var method = "scroll" + name;
        jQuery.fn[method] = function (val) {
            var elem = this[0], win;
            if (!elem) {
                return null;
            }
            if (val !== undefined) {
                return this.each(function () {
                    win = getWindow(this);
                    if (win) {
                        win.scrollTo(!i ? val : jQuery(win).scrollLeft(), i ? val : jQuery(win).scrollTop());
                    } else {
                        this[method] = val;
                    }
                });
            } else {
                win = getWindow(elem);
                return win ? ("pageXOffset"in win) ? win[i ? "pageYOffset" : "pageXOffset"] : jQuery.support.boxModel && win.document.documentElement[method] || win.document.body[method] : elem[method];
            }
        };
    });
    function getWindow(elem) {
        return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false;
    }

    jQuery.each(["Height", "Width"], function (i, name) {
        var type = name.toLowerCase();
        jQuery.fn["inner" + name] = function () {
            return this[0] ? parseFloat(jQuery.css(this[0], type, "padding")) : null;
        };
        jQuery.fn["outer" + name] = function (margin) {
            return this[0] ? parseFloat(jQuery.css(this[0], type, margin ? "margin" : "border")) : null;
        };
        jQuery.fn[type] = function (size) {
            var elem = this[0];
            if (!elem) {
                return size == null ? null : this;
            }
            if (jQuery.isFunction(size)) {
                return this.each(function (i) {
                    var self = jQuery(this);
                    self[type](size.call(this, i, self[type]()));
                });
            }
            if (jQuery.isWindow(elem)) {
                var docElemProp = elem.document.documentElement["client" + name];
                return elem.document.compatMode === "CSS1Compat" && docElemProp || elem.document.body["client" + name] || docElemProp;
            } else if (elem.nodeType === 9) {
                return Math.max(elem.documentElement["client" + name], elem.body["scroll" + name], elem.documentElement["scroll" + name], elem.body["offset" + name], elem.documentElement["offset" + name]);
            } else if (size === undefined) {
                var orig = jQuery.css(elem, type), ret = parseFloat(orig);
                return jQuery.isNaN(ret) ? orig : ret;
            } else {
                return this.css(type, typeof size === "string" ? size : size + "px");
            }
        };
    });
    window.jQuery = window.$ = jQuery;
})(window);
jQuery.ui || function (c) {
    c.ui = {
        version: "1.8.1",
        plugin: {
            add: function (a, b, d) {
                a = c.ui[a].prototype;
                for (var e in d) {
                    a.plugins[e] = a.plugins[e] || [];
                    a.plugins[e].push([b, d[e]])
                }
            }, call: function (a, b, d) {
                if ((b = a.plugins[b]) && a.element[0].parentNode)for (var e = 0; e < b.length; e++)a.options[b[e][0]] && b[e][1].apply(a.element, d)
            }
        },
        contains: function (a, b) {
            return document.compareDocumentPosition ? a.compareDocumentPosition(b) & 16 : a !== b && a.contains(b)
        },
        hasScroll: function (a, b) {
            if (c(a).css("overflow") == "hidden")return false;
            b = b && b == "left" ? "scrollLeft" : "scrollTop";
            var d = false;
            if (a[b] > 0)return true;
            a[b] = 1;
            d = a[b] > 0;
            a[b] = 0;
            return d
        },
        isOverAxis: function (a, b, d) {
            return a > b && a < b + d
        },
        isOver: function (a, b, d, e, f, g) {
            return c.ui.isOverAxis(a, d, f) && c.ui.isOverAxis(b, e, g)
        },
        keyCode: {
            ALT: 18,
            BACKSPACE: 8,
            CAPS_LOCK: 20,
            COMMA: 188,
            CONTROL: 17,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            INSERT: 45,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SHIFT: 16,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    };
    c.fn.extend({
        _focus: c.fn.focus, focus: function (a, b) {
            return typeof a === "number" ? this.each(function () {
                var d = this;
                setTimeout(function () {
                    c(d).focus();
                    b && b.call(d)
                }, a)
            }) : this._focus.apply(this, arguments)
        }, enableSelection: function () {
            return this.attr("unselectable", "off").css("MozUserSelect", "")
        }, disableSelection: function () {
            return this.attr("unselectable", "on").css("MozUserSelect", "none")
        }, scrollParent: function () {
            var a;
            a = c.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function () {
                return /(relative|absolute|fixed)/.test(c.curCSS(this, "position", 1)) && /(auto|scroll)/.test(c.curCSS(this, "overflow", 1) + c.curCSS(this, "overflow-y", 1) + c.curCSS(this, "overflow-x", 1))
            }).eq(0) : this.parents().filter(function () {
                return /(auto|scroll)/.test(c.curCSS(this, "overflow", 1) + c.curCSS(this, "overflow-y", 1) + c.curCSS(this, "overflow-x", 1))
            }).eq(0);
            return /fixed/.test(this.css("position")) || !a.length ? c(document) : a
        }, zIndex: function (a) {
            if (a !== undefined)return this.css("zIndex", a);
            if (this.length) {
                a = c(this[0]);
                for (var b; a.length && a[0] !== document;) {
                    b = a.css("position");
                    if (b == "absolute" || b == "relative" || b == "fixed") {
                        b = parseInt(a.css("zIndex"));
                        if (!isNaN(b) && b != 0)return b
                    }
                    a = a.parent()
                }
            }
            return 0
        }
    });
    c.extend(c.expr[":"], {
        data: function (a, b, d) {
            return !!c.data(a, d[3])
        }, focusable: function (a) {
            var b = a.nodeName.toLowerCase(), d = c.attr(a, "tabindex");
            return (/input|select|textarea|button|object/.test(b) ? !a.disabled : "a" == b || "area" == b ? a.href || !isNaN(d) : !isNaN(d)) && !c(a)["area" == b ? "parents" : "closest"](":hidden").length
        }, tabbable: function (a) {
            var b = c.attr(a, "tabindex");
            return (isNaN(b) || b >= 0) && c(a).is(":focusable")
        }
    })
}(jQuery);
;
(function (b) {
    var j = b.fn.remove;
    b.fn.remove = function (a, c) {
        return this.each(function () {
            if (!c)if (!a || b.filter(a, [this]).length)b("*", this).add(this).each(function () {
                b(this).triggerHandler("remove")
            });
            return j.call(b(this), a, c)
        })
    };
    b.widget = function (a, c, d) {
        var e = a.split(".")[0], f;
        a = a.split(".")[1];
        f = e + "-" + a;
        if (!d) {
            d = c;
            c = b.Widget
        }
        b.expr[":"][f] = function (h) {
            return !!b.data(h, a)
        };
        b[e] = b[e] || {};
        b[e][a] = function (h, g) {
            arguments.length && this._createWidget(h, g)
        };
        c = new c;
        c.options = b.extend({}, c.options);
        b[e][a].prototype = b.extend(true, c, {
            namespace: e,
            widgetName: a,
            widgetEventPrefix: b[e][a].prototype.widgetEventPrefix || a,
            widgetBaseClass: f
        }, d);
        b.widget.bridge(a, b[e][a])
    };
    b.widget.bridge = function (a, c) {
        b.fn[a] = function (d) {
            var e = typeof d === "string", f = Array.prototype.slice.call(arguments, 1), h = this;
            d = !e && f.length ? b.extend.apply(null, [true, d].concat(f)) : d;
            if (e && d.substring(0, 1) === "_")return h;
            e ? this.each(function () {
                var g = b.data(this, a), i = g && b.isFunction(g[d]) ? g[d].apply(g, f) : g;
                if (i !== g && i !== undefined) {
                    h = i;
                    return false
                }
            }) : this.each(function () {
                var g = b.data(this, a);
                if (g) {
                    d && g.option(d);
                    g._init()
                } else b.data(this, a, new c(d, this))
            });
            return h
        }
    };
    b.Widget = function (a, c) {
        arguments.length && this._createWidget(a, c)
    };
    b.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        options: {disabled: false},
        _createWidget: function (a, c) {
            this.element = b(c).data(this.widgetName, this);
            this.options = b.extend(true, {}, this.options, b.metadata && b.metadata.get(c)[this.widgetName], a);
            var d = this;
            this.element.bind("remove." + this.widgetName, function () {
                d.destroy()
            });
            this._create();
            this._init()
        },
        _create: function () {
        },
        _init: function () {
        },
        destroy: function () {
            this.element.unbind("." + this.widgetName).removeData(this.widgetName);
            this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled ui-state-disabled")
        },
        widget: function () {
            return this.element
        },
        option: function (a, c) {
            var d = a, e = this;
            if (arguments.length === 0)return b.extend({}, e.options);
            if (typeof a === "string") {
                if (c === undefined)return this.options[a];
                d = {};
                d[a] = c
            }
            b.each(d, function (f, h) {
                e._setOption(f, h)
            });
            return e
        },
        _setOption: function (a, c) {
            this.options[a] = c;
            if (a === "disabled")this.widget()[c ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled ui-state-disabled").attr("aria-disabled", c);
            return this
        },
        enable: function () {
            return this._setOption("disabled", false)
        },
        disable: function () {
            return this._setOption("disabled", true)
        },
        _trigger: function (a, c, d) {
            var e = this.options[a];
            c = b.Event(c);
            c.type = (a === this.widgetEventPrefix ? a : this.widgetEventPrefix + a).toLowerCase();
            d = d || {};
            if (c.originalEvent) {
                a = b.event.props.length;
                for (var f; a;) {
                    f = b.event.props[--a];
                    c[f] = c.originalEvent[f]
                }
            }
            this.element.trigger(c, d);
            return !(b.isFunction(e) && e.call(this.element[0], c, d) === false || c.isDefaultPrevented())
        }
    }
})(jQuery);
;
(function (c) {
    c.widget("ui.mouse", {
        options: {cancel: ":input,option", distance: 1, delay: 0}, _mouseInit: function () {
            var a = this;
            this.element.bind("mousedown." + this.widgetName, function (b) {
                return a._mouseDown(b)
            }).bind("click." + this.widgetName, function (b) {
                if (a._preventClickEvent) {
                    a._preventClickEvent = false;
                    b.stopImmediatePropagation();
                    return false
                }
            });
            this.started = false
        }, _mouseDestroy: function () {
            this.element.unbind("." + this.widgetName)
        }, _mouseDown: function (a) {
            a.originalEvent = a.originalEvent || {};
            if (!a.originalEvent.mouseHandled) {
                this._mouseStarted && this._mouseUp(a);
                this._mouseDownEvent = a;
                var b = this, e = a.which == 1, f = typeof this.options.cancel == "string" ? c(a.target).parents().add(a.target).filter(this.options.cancel).length : false;
                if (!e || f || !this._mouseCapture(a))return true;
                this.mouseDelayMet = !this.options.delay;
                if (!this.mouseDelayMet)this._mouseDelayTimer = setTimeout(function () {
                    b.mouseDelayMet = true
                }, this.options.delay);
                if (this._mouseDistanceMet(a) && this._mouseDelayMet(a)) {
                    this._mouseStarted = this._mouseStart(a) !== false;
                    if (!this._mouseStarted) {
                        a.preventDefault();
                        return true
                    }
                }
                this._mouseMoveDelegate = function (d) {
                    return b._mouseMove(d)
                };
                this._mouseUpDelegate = function (d) {
                    return b._mouseUp(d)
                };
                c(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
                c.browser.safari || a.preventDefault();
                return a.originalEvent.mouseHandled = true
            }
        }, _mouseMove: function (a) {
            if (c.browser.msie && !a.button)return this._mouseUp(a);
            if (this._mouseStarted) {
                this._mouseDrag(a);
                return a.preventDefault()
            }
            if (this._mouseDistanceMet(a) && this._mouseDelayMet(a))(this._mouseStarted = this._mouseStart(this._mouseDownEvent, a) !== false) ? this._mouseDrag(a) : this._mouseUp(a);
            return !this._mouseStarted
        }, _mouseUp: function (a) {
            c(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            if (this._mouseStarted) {
                this._mouseStarted = false;
                this._preventClickEvent = a.target == this._mouseDownEvent.target;
                this._mouseStop(a)
            }
            return false
        }, _mouseDistanceMet: function (a) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX -
                a.pageX), Math.abs(this._mouseDownEvent.pageY - a.pageY)) >= this.options.distance
        }, _mouseDelayMet: function () {
            return this.mouseDelayMet
        }, _mouseStart: function () {
        }, _mouseDrag: function () {
        }, _mouseStop: function () {
        }, _mouseCapture: function () {
            return true
        }
    })
})(jQuery);
;
(function (c) {
    c.ui = c.ui || {};
    var m = /left|center|right/, n = /top|center|bottom/, p = c.fn.position, q = c.fn.offset;
    c.fn.position = function (a) {
        if (!a || !a.of)return p.apply(this, arguments);
        a = c.extend({}, a);
        var b = c(a.of), d = (a.collision || "flip").split(" "), e = a.offset ? a.offset.split(" ") : [0, 0], g, h, i;
        if (a.of.nodeType === 9) {
            g = b.width();
            h = b.height();
            i = {top: 0, left: 0}
        } else if (a.of.scrollTo && a.of.document) {
            g = b.width();
            h = b.height();
            i = {top: b.scrollTop(), left: b.scrollLeft()}
        } else if (a.of.preventDefault) {
            a.at = "left top";
            g = h = 0;
            i = {top: a.of.pageY, left: a.of.pageX}
        } else {
            g = b.outerWidth();
            h = b.outerHeight();
            i = b.offset()
        }
        c.each(["my", "at"], function () {
            var f = (a[this] || "").split(" ");
            if (f.length === 1)f = m.test(f[0]) ? f.concat(["center"]) : n.test(f[0]) ? ["center"].concat(f) : ["center", "center"];
            f[0] = m.test(f[0]) ? f[0] : "center";
            f[1] = n.test(f[1]) ? f[1] : "center";
            a[this] = f
        });
        if (d.length === 1)d[1] = d[0];
        e[0] = parseInt(e[0], 10) || 0;
        if (e.length === 1)e[1] = e[0];
        e[1] = parseInt(e[1], 10) || 0;
        if (a.at[0] === "right")i.left += g; else if (a.at[0] === "center")i.left += g / 2;
        if (a.at[1] === "bottom")i.top += h; else if (a.at[1] === "center")i.top += h / 2;
        i.left += e[0];
        i.top += e[1];
        return this.each(function () {
            var f = c(this), k = f.outerWidth(), l = f.outerHeight(), j = c.extend({}, i);
            if (a.my[0] === "right")j.left -= k; else if (a.my[0] === "center")j.left -= k / 2;
            if (a.my[1] === "bottom")j.top -= l; else if (a.my[1] === "center")j.top -= l / 2;
            j.left = parseInt(j.left);
            j.top = parseInt(j.top);
            c.each(["left", "top"], function (o, r) {
                c.ui.position[d[o]] && c.ui.position[d[o]][r](j, {
                    targetWidth: g,
                    targetHeight: h,
                    elemWidth: k,
                    elemHeight: l,
                    offset: e,
                    my: a.my,
                    at: a.at
                })
            });
            c.fn.bgiframe && f.bgiframe();
            f.offset(c.extend(j, {using: a.using}))
        })
    };
    c.ui.position = {
        fit: {
            left: function (a, b) {
                var d = c(window);
                b = a.left + b.elemWidth - d.width() - d.scrollLeft();
                a.left = b > 0 ? a.left - b : Math.max(0, a.left)
            }, top: function (a, b) {
                var d = c(window);
                b = a.top + b.elemHeight - d.height() - d.scrollTop();
                a.top = b > 0 ? a.top - b : Math.max(0, a.top)
            }
        }, flip: {
            left: function (a, b) {
                if (b.at[0] !== "center") {
                    var d = c(window);
                    d = a.left + b.elemWidth - d.width() - d.scrollLeft();
                    var e = b.my[0] === "left" ? -b.elemWidth : b.my[0] === "right" ? b.elemWidth : 0, g = -2 * b.offset[0];
                    a.left += a.left < 0 ? e + b.targetWidth + g : d > 0 ? e - b.targetWidth + g : 0
                }
            }, top: function (a, b) {
                if (b.at[1] !== "center") {
                    var d = c(window);
                    d = a.top + b.elemHeight - d.height() - d.scrollTop();
                    var e = b.my[1] === "top" ? -b.elemHeight : b.my[1] === "bottom" ? b.elemHeight : 0, g = b.at[1] === "top" ? b.targetHeight : -b.targetHeight, h = -2 * b.offset[1];
                    a.top += a.top < 0 ? e + b.targetHeight + h : d > 0 ? e + g + h : 0
                }
            }
        }
    };
    if (!c.offset.setOffset) {
        c.offset.setOffset = function (a, b) {
            if (/static/.test(c.curCSS(a, "position")))a.style.position = "relative";
            var d = c(a), e = d.offset(), g = parseInt(c.curCSS(a, "top", true), 10) || 0, h = parseInt(c.curCSS(a, "left", true), 10) || 0;
            e = {top: b.top - e.top + g, left: b.left - e.left + h};
            "using"in b ? b.using.call(a, e) : d.css(e)
        };
        c.fn.offset = function (a) {
            var b = this[0];
            if (!b || !b.ownerDocument)return null;
            if (a)return this.each(function () {
                c.offset.setOffset(this, a)
            });
            return q.call(this)
        }
    }
})(jQuery);
;
(function (d) {
    d.widget("ui.slider", d.ui.mouse, {
        widgetEventPrefix: "slide",
        options: {
            animate: false,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: false,
            step: 1,
            value: 0,
            values: null
        },
        _create: function () {
            var b = this, a = this.options;
            this._mouseSliding = this._keySliding = false;
            this._animateOff = true;
            this._handleIndex = null;
            this._detectOrientation();
            this._mouseInit();
            this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all");
            a.disabled && this.element.addClass("ui-slider-disabled ui-disabled");
            this.range = d([]);
            if (a.range) {
                if (a.range === true) {
                    this.range = d("<div></div>");
                    if (!a.values)a.values = [this._valueMin(), this._valueMin()];
                    if (a.values.length && a.values.length !== 2)a.values = [a.values[0], a.values[0]]
                } else this.range = d("<div></div>");
                this.range.appendTo(this.element).addClass("ui-slider-range");
                if (a.range === "min" || a.range === "max")this.range.addClass("ui-slider-range-" + a.range);
                this.range.addClass("ui-widget-header")
            }
            d(".ui-slider-handle", this.element).length === 0 && d("<a href='#'></a>").appendTo(this.element).addClass("ui-slider-handle");
            if (a.values && a.values.length)for (; d(".ui-slider-handle", this.element).length < a.values.length;)d("<a href='#'></a>").appendTo(this.element).addClass("ui-slider-handle");
            this.handles = d(".ui-slider-handle", this.element).addClass("ui-state-default ui-corner-all");
            this.handle = this.handles.eq(0);
            this.handles.add(this.range).filter("a").click(function (c) {
                c.preventDefault()
            }).hover(function () {
                a.disabled || d(this).addClass("ui-state-hover")
            }, function () {
                d(this).removeClass("ui-state-hover")
            }).focus(function () {
                if (a.disabled)d(this).blur(); else {
                    d(".ui-slider .ui-state-focus").removeClass("ui-state-focus");
                    d(this).addClass("ui-state-focus")
                }
            }).blur(function () {
                d(this).removeClass("ui-state-focus")
            });
            this.handles.each(function (c) {
                d(this).data("index.ui-slider-handle", c)
            });
            this.handles.keydown(function (c) {
                var e = true, f = d(this).data("index.ui-slider-handle"), g, h, i;
                if (!b.options.disabled) {
                    switch (c.keyCode) {
                        case d.ui.keyCode.HOME:
                        case d.ui.keyCode.END:
                        case d.ui.keyCode.PAGE_UP:
                        case d.ui.keyCode.PAGE_DOWN:
                        case d.ui.keyCode.UP:
                        case d.ui.keyCode.RIGHT:
                        case d.ui.keyCode.DOWN:
                        case d.ui.keyCode.LEFT:
                            e = false;
                            if (!b._keySliding) {
                                b._keySliding = true;
                                d(this).addClass("ui-state-active");
                                g = b._start(c, f);
                                if (g === false)return
                            }
                            break
                    }
                    i = b.options.step;
                    g = b.options.values && b.options.values.length ? (h = b.values(f)) : (h = b.value());
                    switch (c.keyCode) {
                        case d.ui.keyCode.HOME:
                            h = b._valueMin();
                            break;
                        case d.ui.keyCode.END:
                            h = b._valueMax();
                            break;
                        case d.ui.keyCode.PAGE_UP:
                            h = g + (b._valueMax() - b._valueMin()) / 5;
                            break;
                        case d.ui.keyCode.PAGE_DOWN:
                            h = g - (b._valueMax() - b._valueMin()) / 5;
                            break;
                        case d.ui.keyCode.UP:
                        case d.ui.keyCode.RIGHT:
                            if (g === b._valueMax())return;
                            h = g + i;
                            break;
                        case d.ui.keyCode.DOWN:
                        case d.ui.keyCode.LEFT:
                            if (g === b._valueMin())return;
                            h = g - i;
                            break
                    }
                    b._slide(c, f, h);
                    return e
                }
            }).keyup(function (c) {
                var e = d(this).data("index.ui-slider-handle");
                if (b._keySliding) {
                    b._keySliding = false;
                    b._stop(c, e);
                    b._change(c, e);
                    d(this).removeClass("ui-state-active")
                }
            });
            this._refreshValue();
            this._animateOff = false
        },
        destroy: function () {
            this.handles.remove();
            this.range.remove();
            this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");
            this._mouseDestroy();
            return this
        },
        _mouseCapture: function (b) {
            var a = this.options, c, e, f, g, h, i;
            if (a.disabled)return false;
            this.elementSize = {width: this.element.outerWidth(), height: this.element.outerHeight()};
            this.elementOffset = this.element.offset();
            c = {x: b.pageX, y: b.pageY};
            e = this._normValueFromMouse(c);
            f = this._valueMax() - this._valueMin() + 1;
            h = this;
            this.handles.each(function (j) {
                var k = Math.abs(e - h.values(j));
                if (f > k) {
                    f = k;
                    g = d(this);
                    i = j
                }
            });
            if (a.range === true && this.values(1) === a.min) {
                i += 1;
                g = d(this.handles[i])
            }
            if (this._start(b, i) === false)return false;
            this._mouseSliding = true;
            h._handleIndex = i;
            g.addClass("ui-state-active").focus();
            a = g.offset();
            this._clickOffset = !d(b.target).parents().andSelf().is(".ui-slider-handle") ? {
                left: 0,
                top: 0
            } : {
                left: b.pageX - a.left - g.width() / 2,
                top: b.pageY - a.top - g.height() / 2 - (parseInt(g.css("borderTopWidth"), 10) || 0) - (parseInt(g.css("borderBottomWidth"), 10) || 0) + (parseInt(g.css("marginTop"), 10) || 0)
            };
            e = this._normValueFromMouse(c);
            this._slide(b, i, e);
            return this._animateOff = true
        },
        _mouseStart: function () {
            return true
        },
        _mouseDrag: function (b) {
            var a = this._normValueFromMouse({x: b.pageX, y: b.pageY});
            this._slide(b, this._handleIndex, a);
            return false
        },
        _mouseStop: function (b) {
            this.handles.removeClass("ui-state-active");
            this._mouseSliding = false;
            this._stop(b, this._handleIndex);
            this._change(b, this._handleIndex);
            this._clickOffset = this._handleIndex = null;
            return this._animateOff = false
        },
        _detectOrientation: function () {
            this.orientation = this.options.orientation === "vertical" ? "vertical" : "horizontal"
        },
        _normValueFromMouse: function (b) {
            var a;
            if (this.orientation === "horizontal") {
                a = this.elementSize.width;
                b = b.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)
            } else {
                a = this.elementSize.height;
                b = b.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)
            }
            a = b / a;
            if (a > 1)a = 1;
            if (a < 0)a = 0;
            if (this.orientation === "vertical")a = 1 - a;
            b = this._valueMax() - this._valueMin();
            return this._trimAlignValue(this._valueMin() + a * b)
        },
        _start: function (b, a) {
            var c = {handle: this.handles[a], value: this.value()};
            if (this.options.values && this.options.values.length) {
                c.value = this.values(a);
                c.values = this.values()
            }
            return this._trigger("start", b, c)
        },
        _slide: function (b, a, c) {
            var e;
            if (this.options.values && this.options.values.length) {
                e = this.values(a ? 0 : 1);
                if (this.options.values.length === 2 && this.options.range === true && (a === 0 && c > e || a === 1 && c < e))c = e;
                if (c !== this.values(a)) {
                    e = this.values();
                    e[a] = c;
                    b = this._trigger("slide", b, {handle: this.handles[a], value: c, values: e});
                    this.values(a ? 0 : 1);
                    b !== false && this.values(a, c, true)
                }
            } else if (c !== this.value()) {
                b = this._trigger("slide", b, {handle: this.handles[a], value: c});
                b !== false && this.value(c)
            }
        },
        _stop: function (b, a) {
            var c = {handle: this.handles[a], value: this.value()};
            if (this.options.values && this.options.values.length) {
                c.value = this.values(a);
                c.values = this.values()
            }
            this._trigger("stop", b, c)
        },
        _change: function (b, a) {
            if (!this._keySliding && !this._mouseSliding) {
                var c = {handle: this.handles[a], value: this.value()};
                if (this.options.values && this.options.values.length) {
                    c.value = this.values(a);
                    c.values = this.values()
                }
                this._trigger("change", b, c)
            }
        },
        value: function (b) {
            if (arguments.length) {
                this.options.value = this._trimAlignValue(b);
                this._refreshValue();
                this._change(null, 0)
            }
            return this._value()
        },
        values: function (b, a) {
            var c, e, f;
            if (arguments.length > 1) {
                this.options.values[b] = this._trimAlignValue(a);
                this._refreshValue();
                this._change(null, b)
            }
            if (arguments.length)if (d.isArray(arguments[0])) {
                c = this.options.values;
                e = arguments[0];
                for (f = 0; f < c.length; f += 1) {
                    c[f] = this._trimAlignValue(e[f]);
                    this._change(null, f)
                }
                this._refreshValue()
            } else return this.options.values && this.options.values.length ? this._values(b) : this.value(); else return this._values()
        },
        _setOption: function (b, a) {
            var c, e = 0;
            if (d.isArray(this.options.values))e = this.options.values.length;
            d.Widget.prototype._setOption.apply(this, arguments);
            switch (b) {
                case"disabled":
                    if (a) {
                        this.handles.filter(".ui-state-focus").blur();
                        this.handles.removeClass("ui-state-hover");
                        this.handles.attr("disabled", "disabled");
                        this.element.addClass("ui-disabled")
                    } else {
                        this.handles.removeAttr("disabled");
                        this.element.removeClass("ui-disabled")
                    }
                    break;
                case"orientation":
                    this._detectOrientation();
                    this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation);
                    this._refreshValue();
                    break;
                case"value":
                    this._animateOff = true;
                    this._refreshValue();
                    this._change(null, 0);
                    this._animateOff = false;
                    break;
                case"values":
                    this._animateOff = true;
                    this._refreshValue();
                    for (c = 0; c < e; c += 1)this._change(null, c);
                    this._animateOff = false;
                    break
            }
        },
        _value: function () {
            var b = this.options.value;
            return b = this._trimAlignValue(b)
        },
        _values: function (b) {
            var a, c;
            if (arguments.length) {
                a = this.options.values[b];
                return a = this._trimAlignValue(a)
            } else {
                a = this.options.values.slice();
                for (c = 0; c < a.length; c += 1)a[c] = this._trimAlignValue(a[c]);
                return a
            }
        },
        _trimAlignValue: function (b) {
            if (b < this._valueMin())return this._valueMin();
            if (b > this._valueMax())return this._valueMax();
            var a = this.options.step, c = b % a;
            b = b - c;
            if (c >= a / 2)b += a;
            return parseFloat(b.toFixed(5))
        },
        _valueMin: function () {
            return this.options.min
        },
        _valueMax: function () {
            return this.options.max
        },
        _refreshValue: function () {
            var b = this.options.range, a = this.options, c = this, e = !this._animateOff ? a.animate : false, f, g = {}, h, i, j, k;
            if (this.options.values && this.options.values.length)this.handles.each(function (l) {
                f = (c.values(l) - c._valueMin()) / (c._valueMax() - c._valueMin()) * 100;
                g[c.orientation === "horizontal" ? "left" : "bottom"] = f + "%";
                d(this).stop(1, 1)[e ? "animate" : "css"](g, a.animate);
                if (c.options.range === true)if (c.orientation === "horizontal") {
                    if (l === 0)c.range.stop(1, 1)[e ? "animate" : "css"]({left: f + "%"}, a.animate);
                    if (l === 1)c.range[e ? "animate" : "css"]({width: f - h + "%"}, {
                        queue: false,
                        duration: a.animate
                    })
                } else {
                    if (l === 0)c.range.stop(1, 1)[e ? "animate" : "css"]({bottom: f + "%"}, a.animate);
                    if (l === 1)c.range[e ? "animate" : "css"]({height: f - h + "%"}, {
                        queue: false,
                        duration: a.animate
                    })
                }
                h = f
            }); else {
                i = this.value();
                j = this._valueMin();
                k = this._valueMax();
                f = k !== j ? (i - j) / (k - j) * 100 : 0;
                g[c.orientation === "horizontal" ? "left" : "bottom"] = f + "%";
                this.handle.stop(1, 1)[e ? "animate" : "css"](g, a.animate);
                if (b === "min" && this.orientation === "horizontal")this.range.stop(1, 1)[e ? "animate" : "css"]({width: f + "%"}, a.animate);
                if (b === "max" && this.orientation === "horizontal")this.range[e ? "animate" : "css"]({width: 100 - f + "%"}, {
                    queue: false,
                    duration: a.animate
                });
                if (b === "min" && this.orientation === "vertical")this.range.stop(1, 1)[e ? "animate" : "css"]({height: f + "%"}, a.animate);
                if (b === "max" && this.orientation === "vertical")this.range[e ? "animate" : "css"]({height: 100 - f + "%"}, {
                    queue: false,
                    duration: a.animate
                })
            }
        }
    });
    d.extend(d.ui.slider, {version: "1.8.1"})
})(jQuery);
;
jQuery.effects || function (f) {
    function k(c) {
        var a;
        if (c && c.constructor == Array && c.length == 3)return c;
        if (a = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(c))return [parseInt(a[1], 10), parseInt(a[2], 10), parseInt(a[3], 10)];
        if (a = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(c))return [parseFloat(a[1]) * 2.55, parseFloat(a[2]) * 2.55, parseFloat(a[3]) * 2.55];
        if (a = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(c))return [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16)];
        if (a = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(c))return [parseInt(a[1] + a[1], 16), parseInt(a[2] + a[2], 16), parseInt(a[3] + a[3], 16)];
        if (/rgba\(0, 0, 0, 0\)/.exec(c))return l.transparent;
        return l[f.trim(c).toLowerCase()]
    }

    function q(c, a) {
        var b;
        do {
            b = f.curCSS(c, a);
            if (b != "" && b != "transparent" || f.nodeName(c, "body"))break;
            a = "backgroundColor"
        } while (c = c.parentNode);
        return k(b)
    }

    function m() {
        var c = document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle, a = {}, b, d;
        if (c && c.length && c[0] && c[c[0]])for (var e = c.length; e--;) {
            b = c[e];
            if (typeof c[b] == "string") {
                d = b.replace(/\-(\w)/g, function (g, h) {
                    return h.toUpperCase()
                });
                a[d] = c[b]
            }
        } else for (b in c)if (typeof c[b] === "string")a[b] = c[b];
        return a
    }

    function n(c) {
        var a, b;
        for (a in c) {
            b = c[a];
            if (b == null || f.isFunction(b) || a in r || /scrollbar/.test(a) || !/color/i.test(a) && isNaN(parseFloat(b)))delete c[a]
        }
        return c
    }

    function s(c, a) {
        var b = {_: 0}, d;
        for (d in a)if (c[d] != a[d])b[d] = a[d];
        return b
    }

    function j(c, a, b, d) {
        if (typeof c == "object") {
            d = a;
            b = null;
            a = c;
            c = a.effect
        }
        if (f.isFunction(a)) {
            d = a;
            b = null;
            a = {}
        }
        if (f.isFunction(b)) {
            d = b;
            b = null
        }
        if (typeof a == "number" || f.fx.speeds[a]) {
            d = b;
            b = a;
            a = {}
        }
        a = a || {};
        b = b || a.duration;
        b = f.fx.off ? 0 : typeof b == "number" ? b : f.fx.speeds[b] || f.fx.speeds._default;
        d = d || a.complete;
        return [c, a, b, d]
    }

    f.effects = {};
    f.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "color", "outlineColor"], function (c, a) {
        f.fx.step[a] = function (b) {
            if (!b.colorInit) {
                b.start = q(b.elem, a);
                b.end = k(b.end);
                b.colorInit = true
            }
            b.elem.style[a] = "rgb(" + Math.max(Math.min(parseInt(b.pos * (b.end[0] - b.start[0]) + b.start[0], 10), 255), 0) + "," + Math.max(Math.min(parseInt(b.pos * (b.end[1] - b.start[1]) + b.start[1], 10), 255), 0) + "," + Math.max(Math.min(parseInt(b.pos * (b.end[2] - b.start[2]) + b.start[2], 10), 255), 0) + ")"
        }
    });
    var l = {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0, 0, 0],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128, 128, 0],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0],
        transparent: [255, 255, 255]
    }, o = ["add", "remove", "toggle"], r = {
        border: 1,
        borderBottom: 1,
        borderColor: 1,
        borderLeft: 1,
        borderRight: 1,
        borderTop: 1,
        borderWidth: 1,
        margin: 1,
        padding: 1
    };
    f.effects.animateClass = function (c, a, b, d) {
        if (f.isFunction(b)) {
            d = b;
            b = null
        }
        return this.each(function () {
            var e = f(this), g = e.attr("style") || " ", h = n(m.call(this)), p, t = e.attr("className");
            f.each(o, function (u, i) {
                c[i] && e[i + "Class"](c[i])
            });
            p = n(m.call(this));
            e.attr("className", t);
            e.animate(s(h, p), a, b, function () {
                f.each(o, function (u, i) {
                    c[i] && e[i + "Class"](c[i])
                });
                if (typeof e.attr("style") == "object") {
                    e.attr("style").cssText = "";
                    e.attr("style").cssText = g
                } else e.attr("style", g);
                d && d.apply(this, arguments)
            })
        })
    };
    f.fn.extend({
        _addClass: f.fn.addClass, addClass: function (c, a, b, d) {
            return a ? f.effects.animateClass.apply(this, [{add: c}, a, b, d]) : this._addClass(c)
        }, _removeClass: f.fn.removeClass, removeClass: function (c, a, b, d) {
            return a ? f.effects.animateClass.apply(this, [{remove: c}, a, b, d]) : this._removeClass(c)
        }, _toggleClass: f.fn.toggleClass, toggleClass: function (c, a, b, d, e) {
            return typeof a == "boolean" || a === undefined ? b ? f.effects.animateClass.apply(this, [a ? {add: c} : {remove: c}, b, d, e]) : this._toggleClass(c, a) : f.effects.animateClass.apply(this, [{toggle: c}, a, b, d])
        }, switchClass: function (c, a, b, d, e) {
            return f.effects.animateClass.apply(this, [{add: a, remove: c}, b, d, e])
        }
    });
    f.extend(f.effects, {
        version: "1.8.1", save: function (c, a) {
            for (var b = 0; b < a.length; b++)a[b] !== null && c.data("ec.storage." + a[b], c[0].style[a[b]])
        }, restore: function (c, a) {
            for (var b = 0; b < a.length; b++)a[b] !== null && c.css(a[b], c.data("ec.storage." + a[b]))
        }, setMode: function (c, a) {
            if (a == "toggle")a = c.is(":hidden") ? "show" : "hide";
            return a
        }, getBaseline: function (c, a) {
            var b;
            switch (c[0]) {
                case"top":
                    b = 0;
                    break;
                case"middle":
                    b = 0.5;
                    break;
                case"bottom":
                    b = 1;
                    break;
                default:
                    b = c[0] / a.height
            }
            switch (c[1]) {
                case"left":
                    c = 0;
                    break;
                case"center":
                    c = 0.5;
                    break;
                case"right":
                    c = 1;
                    break;
                default:
                    c = c[1] / a.width
            }
            return {x: c, y: b}
        }, createWrapper: function (c) {
            if (c.parent().is(".ui-effects-wrapper"))return c.parent();
            var a = {
                width: c.outerWidth(true),
                height: c.outerHeight(true),
                "float": c.css("float")
            }, b = f("<div></div>").addClass("ui-effects-wrapper").css({
                fontSize: "100%",
                background: "transparent",
                border: "none",
                margin: 0,
                padding: 0
            });
            c.wrap(b);
            b = c.parent();
            if (c.css("position") == "static") {
                b.css({position: "relative"});
                c.css({position: "relative"})
            } else {
                f.extend(a, {position: c.css("position"), zIndex: c.css("z-index")});
                f.each(["top", "left", "bottom", "right"], function (d, e) {
                    a[e] = c.css(e);
                    if (isNaN(parseInt(a[e], 10)))a[e] = "auto"
                });
                c.css({position: "relative", top: 0, left: 0})
            }
            return b.css(a).show()
        }, removeWrapper: function (c) {
            if (c.parent().is(".ui-effects-wrapper"))return c.parent().replaceWith(c);
            return c
        }, setTransition: function (c, a, b, d) {
            d = d || {};
            f.each(a, function (e, g) {
                unit = c.cssUnit(g);
                if (unit[0] > 0)d[g] = unit[0] * b + unit[1]
            });
            return d
        }
    });
    f.fn.extend({
        effect: function (c) {
            var a = j.apply(this, arguments);
            a = {options: a[1], duration: a[2], callback: a[3]};
            var b = f.effects[c];
            return b && !f.fx.off ? b.call(this, a) : this
        }, _show: f.fn.show, show: function (c) {
            if (!c || typeof c == "number" || f.fx.speeds[c])return this._show.apply(this, arguments); else {
                var a = j.apply(this, arguments);
                a[1].mode = "show";
                return this.effect.apply(this, a)
            }
        }, _hide: f.fn.hide, hide: function (c) {
            if (!c || typeof c == "number" || f.fx.speeds[c])return this._hide.apply(this, arguments); else {
                var a = j.apply(this, arguments);
                a[1].mode = "hide";
                return this.effect.apply(this, a)
            }
        }, __toggle: f.fn.toggle, toggle: function (c) {
            if (!c || typeof c == "number" || f.fx.speeds[c] || typeof c == "boolean" || f.isFunction(c))return this.__toggle.apply(this, arguments); else {
                var a = j.apply(this, arguments);
                a[1].mode = "toggle";
                return this.effect.apply(this, a)
            }
        }, cssUnit: function (c) {
            var a = this.css(c), b = [];
            f.each(["em", "px", "%", "pt"], function (d, e) {
                if (a.indexOf(e) > 0)b = [parseFloat(a), e]
            });
            return b
        }
    });
    f.easing.jswing = f.easing.swing;
    f.extend(f.easing, {
        def: "easeOutQuad", swing: function (c, a, b, d, e) {
            return f.easing[f.easing.def](c, a, b, d, e)
        }, easeInQuad: function (c, a, b, d, e) {
            return d * (a /= e) * a + b
        }, easeOutQuad: function (c, a, b, d, e) {
            return -d * (a /= e) * (a - 2) + b
        }, easeInOutQuad: function (c, a, b, d, e) {
            if ((a /= e / 2) < 1)return d / 2 * a * a + b;
            return -d / 2 * (--a * (a - 2) - 1) + b
        }, easeInCubic: function (c, a, b, d, e) {
            return d * (a /= e) * a * a + b
        }, easeOutCubic: function (c, a, b, d, e) {
            return d * ((a = a / e - 1) * a * a + 1) + b
        }, easeInOutCubic: function (c, a, b, d, e) {
            if ((a /= e / 2) < 1)return d / 2 * a * a * a + b;
            return d / 2 * ((a -= 2) * a * a + 2) + b
        }, easeInQuart: function (c, a, b, d, e) {
            return d * (a /= e) * a * a * a + b
        }, easeOutQuart: function (c, a, b, d, e) {
            return -d * ((a = a / e - 1) * a * a * a - 1) + b
        }, easeInOutQuart: function (c, a, b, d, e) {
            if ((a /= e / 2) < 1)return d / 2 * a * a * a * a + b;
            return -d / 2 * ((a -= 2) * a * a * a - 2) +
                b
        }, easeInQuint: function (c, a, b, d, e) {
            return d * (a /= e) * a * a * a * a + b
        }, easeOutQuint: function (c, a, b, d, e) {
            return d * ((a = a / e - 1) * a * a * a * a + 1) + b
        }, easeInOutQuint: function (c, a, b, d, e) {
            if ((a /= e / 2) < 1)return d / 2 * a * a * a * a * a + b;
            return d / 2 * ((a -= 2) * a * a * a * a + 2) + b
        }, easeInSine: function (c, a, b, d, e) {
            return -d * Math.cos(a / e * (Math.PI / 2)) + d + b
        }, easeOutSine: function (c, a, b, d, e) {
            return d * Math.sin(a / e * (Math.PI / 2)) + b
        }, easeInOutSine: function (c, a, b, d, e) {
            return -d / 2 * (Math.cos(Math.PI * a / e) - 1) + b
        }, easeInExpo: function (c, a, b, d, e) {
            return a == 0 ? b : d * Math.pow(2, 10 * (a / e - 1)) + b
        }, easeOutExpo: function (c, a, b, d, e) {
            return a == e ? b + d : d * (-Math.pow(2, -10 * a / e) + 1) + b
        }, easeInOutExpo: function (c, a, b, d, e) {
            if (a == 0)return b;
            if (a == e)return b + d;
            if ((a /= e / 2) < 1)return d / 2 * Math.pow(2, 10 * (a - 1)) + b;
            return d / 2 * (-Math.pow(2, -10 * --a) + 2) + b
        }, easeInCirc: function (c, a, b, d, e) {
            return -d * (Math.sqrt(1 - (a /= e) * a) - 1) + b
        }, easeOutCirc: function (c, a, b, d, e) {
            return d * Math.sqrt(1 - (a = a / e - 1) * a) + b
        }, easeInOutCirc: function (c, a, b, d, e) {
            if ((a /= e / 2) < 1)return -d / 2 * (Math.sqrt(1 - a * a) - 1) + b;
            return d / 2 * (Math.sqrt(1 - (a -= 2) * a) + 1) + b
        }, easeInElastic: function (c, a, b, d, e) {
            c = 1.70158;
            var g = 0, h = d;
            if (a == 0)return b;
            if ((a /= e) == 1)return b + d;
            g || (g = e * 0.3);
            if (h < Math.abs(d)) {
                h = d;
                c = g / 4
            } else c = g / (2 * Math.PI) * Math.asin(d / h);
            return -(h * Math.pow(2, 10 * (a -= 1)) * Math.sin((a * e - c) * 2 * Math.PI / g)) + b
        }, easeOutElastic: function (c, a, b, d, e) {
            c = 1.70158;
            var g = 0, h = d;
            if (a == 0)return b;
            if ((a /= e) == 1)return b + d;
            g || (g = e * 0.3);
            if (h < Math.abs(d)) {
                h = d;
                c = g / 4
            } else c = g / (2 * Math.PI) * Math.asin(d / h);
            return h * Math.pow(2, -10 * a) * Math.sin((a * e - c) * 2 * Math.PI / g) + d + b
        }, easeInOutElastic: function (c, a, b, d, e) {
            c = 1.70158;
            var g = 0, h = d;
            if (a == 0)return b;
            if ((a /= e / 2) == 2)return b + d;
            g || (g = e * 0.3 * 1.5);
            if (h < Math.abs(d)) {
                h = d;
                c = g / 4
            } else c = g / (2 * Math.PI) * Math.asin(d / h);
            if (a < 1)return -0.5 * h * Math.pow(2, 10 * (a -= 1)) * Math.sin((a * e - c) * 2 * Math.PI / g) + b;
            return h * Math.pow(2, -10 * (a -= 1)) * Math.sin((a * e - c) * 2 * Math.PI / g) * 0.5 + d + b
        }, easeInBack: function (c, a, b, d, e, g) {
            if (g == undefined)g = 1.70158;
            return d * (a /= e) * a * ((g + 1) * a - g) + b
        }, easeOutBack: function (c, a, b, d, e, g) {
            if (g == undefined)g = 1.70158;
            return d * ((a = a / e - 1) * a * ((g + 1) * a + g) + 1) + b
        }, easeInOutBack: function (c, a, b, d, e, g) {
            if (g == undefined)g = 1.70158;
            if ((a /= e / 2) < 1)return d / 2 * a * a * (((g *= 1.525) + 1) * a - g) + b;
            return d / 2 * ((a -= 2) * a * (((g *= 1.525) + 1) * a + g) + 2) + b
        }, easeInBounce: function (c, a, b, d, e) {
            return d - f.easing.easeOutBounce(c, e - a, 0, d, e) + b
        }, easeOutBounce: function (c, a, b, d, e) {
            return (a /= e) < 1 / 2.75 ? d * 7.5625 * a * a + b : a < 2 / 2.75 ? d * (7.5625 * (a -= 1.5 / 2.75) * a + 0.75) + b : a < 2.5 / 2.75 ? d * (7.5625 * (a -= 2.25 / 2.75) * a + 0.9375) + b : d * (7.5625 * (a -= 2.625 / 2.75) * a + 0.984375) + b
        }, easeInOutBounce: function (c, a, b, d, e) {
            if (a < e / 2)return f.easing.easeInBounce(c, a * 2, 0, d, e) * 0.5 + b;
            return f.easing.easeOutBounce(c, a * 2 - e, 0, d, e) * 0.5 + d * 0.5 + b
        }
    })
}(jQuery);
;
(function (b) {
    b.effects.blind = function (c) {
        return this.queue(function () {
            var a = b(this), g = ["position", "top", "left"], f = b.effects.setMode(a, c.options.mode || "hide"), d = c.options.direction || "vertical";
            b.effects.save(a, g);
            a.show();
            var e = b.effects.createWrapper(a).css({overflow: "hidden"}), h = d == "vertical" ? "height" : "width";
            d = d == "vertical" ? e.height() : e.width();
            f == "show" && e.css(h, 0);
            var i = {};
            i[h] = f == "show" ? d : 0;
            e.animate(i, c.duration, c.options.easing, function () {
                f == "hide" && a.hide();
                b.effects.restore(a, g);
                b.effects.removeWrapper(a);
                c.callback && c.callback.apply(a[0], arguments);
                a.dequeue()
            })
        })
    }
})(jQuery);
;
(function () {
    var root = this;
    var previousUnderscore = root._;
    var breaker = {};
    var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;
    var slice = ArrayProto.slice, unshift = ArrayProto.unshift, toString = ObjProto.toString, hasOwnProperty = ObjProto.hasOwnProperty;
    var
        nativeForEach = ArrayProto.forEach, nativeMap = ArrayProto.map, nativeReduce = ArrayProto.reduce, nativeReduceRight = ArrayProto.reduceRight, nativeFilter = ArrayProto.filter, nativeEvery = ArrayProto.every, nativeSome = ArrayProto.some, nativeIndexOf = ArrayProto.indexOf, nativeLastIndexOf = ArrayProto.lastIndexOf, nativeIsArray = Array.isArray, nativeKeys = Object.keys, nativeBind = FuncProto.bind;
    var _ = function (obj) {
        return new wrapper(obj);
    };
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = _;
        }
        exports._ = _;
    } else {
        root['_'] = _;
    }
    _.VERSION = '1.3.0';
    var each = _.each = _.forEach = function (obj, iterator, context) {
        if (obj == null)return;
        if (nativeForEach && obj.forEach === nativeForEach) {
            obj.forEach(iterator, context);
        } else if (obj.length === +obj.length) {
            for (var i = 0, l = obj.length; i < l; i++) {
                if (i in obj && iterator.call(context, obj[i], i, obj) === breaker)return;
            }
        } else {
            for (var key in obj) {
                if (hasOwnProperty.call(obj, key)) {
                    if (iterator.call(context, obj[key], key, obj) === breaker)return;
                }
            }
        }
    };
    _.map = function (obj, iterator, context) {
        var results = [];
        if (obj == null)return results;
        if (nativeMap && obj.map === nativeMap)return obj.map(iterator, context);
        each(obj, function (value, index, list) {
            results[results.length] = iterator.call(context, value, index, list);
        });
        if (obj.length === +obj.length)results.length = obj.length;
        return results;
    };
    _.reduce = _.foldl = _.inject = function (obj, iterator, memo, context) {
        var initial = arguments.length > 2;
        if (obj == null)obj = [];
        if (nativeReduce && obj.reduce === nativeReduce) {
            if (context)iterator = _.bind(iterator, context);
            return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
        }
        each(obj, function (value, index, list) {
            if (!initial) {
                memo = value;
                initial = true;
            } else {
                memo = iterator.call(context, memo, value, index, list);
            }
        });
        if (!initial)throw new TypeError('Reduce of empty array with no initial value');
        return memo;
    };
    _.reduceRight = _.foldr = function (obj, iterator, memo, context) {
        var initial = arguments.length > 2;
        if (obj == null)obj = [];
        if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
            if (context)iterator = _.bind(iterator, context);
            return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
        }
        var reversed = _.toArray(obj).reverse();
        if (context && !initial)iterator = _.bind(iterator, context);
        return initial ? _.reduce(reversed, iterator, memo, context) : _.reduce(reversed, iterator);
    };
    _.find = _.detect = function (obj, iterator, context) {
        var result;
        any(obj, function (value, index, list) {
            if (iterator.call(context, value, index, list)) {
                result = value;
                return true;
            }
        });
        return result;
    };
    _.filter = _.select = function (obj, iterator, context) {
        var results = [];
        if (obj == null)return results;
        if (nativeFilter && obj.filter === nativeFilter)return obj.filter(iterator, context);
        each(obj, function (value, index, list) {
            if (iterator.call(context, value, index, list))results[results.length] = value;
        });
        return results;
    };
    _.reject = function (obj, iterator, context) {
        var results = [];
        if (obj == null)return results;
        each(obj, function (value, index, list) {
            if (!iterator.call(context, value, index, list))results[results.length] = value;
        });
        return results;
    };
    _.every = _.all = function (obj, iterator, context) {
        var result = true;
        if (obj == null)return result;
        if (nativeEvery && obj.every === nativeEvery)return obj.every(iterator, context);
        each(obj, function (value, index, list) {
            if (!(result = result && iterator.call(context, value, index, list)))return breaker;
        });
        return result;
    };
    var any = _.some = _.any = function (obj, iterator, context) {
        iterator || (iterator = _.identity);
        var result = false;
        if (obj == null)return result;
        if (nativeSome && obj.some === nativeSome)return obj.some(iterator, context);
        each(obj, function (value, index, list) {
            if (result || (result = iterator.call(context, value, index, list)))return breaker;
        });
        return !!result;
    };
    _.include = _.contains = function (obj, target) {
        var found = false;
        if (obj == null)return found;
        if (nativeIndexOf && obj.indexOf === nativeIndexOf)return obj.indexOf(target) != -1;
        found = any(obj, function (value) {
            return value === target;
        });
        return found;
    };
    _.invoke = function (obj, method) {
        var args = slice.call(arguments, 2);
        return _.map(obj, function (value) {
            return (_.isFunction(method) ? method || value : value[method]).apply(value, args);
        });
    };
    _.pluck = function (obj, key) {
        return _.map(obj, function (value) {
            return value[key];
        });
    };
    _.max = function (obj, iterator, context) {
        if (!iterator && _.isArray(obj))return Math.max.apply(Math, obj);
        if (!iterator && _.isEmpty(obj))return -Infinity;
        var result = {computed: -Infinity};
        each(obj, function (value, index, list) {
            var computed = iterator ? iterator.call(context, value, index, list) : value;
            computed >= result.computed && (result = {value: value, computed: computed});
        });
        return result.value;
    };
    _.min = function (obj, iterator, context) {
        if (!iterator && _.isArray(obj))return Math.min.apply(Math, obj);
        if (!iterator && _.isEmpty(obj))return Infinity;
        var result = {computed: Infinity};
        each(obj, function (value, index, list) {
            var computed = iterator ? iterator.call(context, value, index, list) : value;
            computed < result.computed && (result = {value: value, computed: computed});
        });
        return result.value;
    };
    _.shuffle = function (obj) {
        var shuffled = [], rand;
        each(obj, function (value, index, list) {
            if (index == 0) {
                shuffled[0] = value;
            } else {
                rand = Math.floor(Math.random() * (index + 1));
                shuffled[index] = shuffled[rand];
                shuffled[rand] = value;
            }
        });
        return shuffled;
    };
    _.sortBy = function (obj, iterator, context) {
        return _.pluck(_.map(obj, function (value, index, list) {
            return {value: value, criteria: iterator.call(context, value, index, list)};
        }).sort(function (left, right) {
            var a = left.criteria, b = right.criteria;
            return a < b ? -1 : a > b ? 1 : 0;
        }), 'value');
    };
    _.groupBy = function (obj, val) {
        var result = {};
        var iterator = _.isFunction(val) ? val : function (obj) {
            return obj[val];
        };
        each(obj, function (value, index) {
            var key = iterator(value, index);
            (result[key] || (result[key] = [])).push(value);
        });
        return result;
    };
    _.sortedIndex = function (array, obj, iterator) {
        iterator || (iterator = _.identity);
        var low = 0, high = array.length;
        while (low < high) {
            var mid = (low + high) >> 1;
            iterator(array[mid]) < iterator(obj) ? low = mid + 1 : high = mid;
        }
        return low;
    };
    _.toArray = function (iterable) {
        if (!iterable)return [];
        if (iterable.toArray)return iterable.toArray();
        if (_.isArray(iterable))return slice.call(iterable);
        if (_.isArguments(iterable))return slice.call(iterable);
        return _.values(iterable);
    };
    _.size = function (obj) {
        return _.toArray(obj).length;
    };
    _.first = _.head = function (array, n, guard) {
        return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
    };
    _.initial = function (array, n, guard) {
        return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
    };
    _.last = function (array, n, guard) {
        if ((n != null) && !guard) {
            return slice.call(array, Math.max(array.length - n, 0));
        } else {
            return array[array.length - 1];
        }
    };
    _.rest = _.tail = function (array, index, guard) {
        return slice.call(array, (index == null) || guard ? 1 : index);
    };
    _.compact = function (array) {
        return _.filter(array, function (value) {
            return !!value;
        });
    };
    _.flatten = function (array, shallow) {
        return _.reduce(array, function (memo, value) {
            if (_.isArray(value))return memo.concat(shallow ? value : _.flatten(value));
            memo[memo.length] = value;
            return memo;
        }, []);
    };
    _.without = function (array) {
        return _.difference(array, slice.call(arguments, 1));
    };
    _.uniq = _.unique = function (array, isSorted, iterator) {
        var initial = iterator ? _.map(array, iterator) : array;
        var result = [];
        _.reduce(initial, function (memo, el, i) {
            if (0 == i || (isSorted === true ? _.last(memo) != el : !_.include(memo, el))) {
                memo[memo.length] = el;
                result[result.length] = array[i];
            }
            return memo;
        }, []);
        return result;
    };
    _.union = function () {
        return _.uniq(_.flatten(arguments, true));
    };
    _.intersection = _.intersect = function (array) {
        var rest = slice.call(arguments, 1);
        return _.filter(_.uniq(array), function (item) {
            return _.every(rest, function (other) {
                return _.indexOf(other, item) >= 0;
            });
        });
    };
    _.difference = function (array) {
        var rest = _.flatten(slice.call(arguments, 1));
        return _.filter(array, function (value) {
            return !_.include(rest, value);
        });
    };
    _.zip = function () {
        var args = slice.call(arguments);
        var length = _.max(_.pluck(args, 'length'));
        var results = new Array(length);
        for (var i = 0; i < length; i++)results[i] = _.pluck(args, "" + i);
        return results;
    };
    _.indexOf = function (array, item, isSorted) {
        if (array == null)return -1;
        var i, l;
        if (isSorted) {
            i = _.sortedIndex(array, item);
            return array[i] === item ? i : -1;
        }
        if (nativeIndexOf && array.indexOf === nativeIndexOf)return array.indexOf(item);
        for (i = 0, l = array.length; i < l; i++)if (i in array && array[i] === item)return i;
        return -1;
    };
    _.lastIndexOf = function (array, item) {
        if (array == null)return -1;
        if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf)return array.lastIndexOf(item);
        var i = array.length;
        while (i--)if (i in array && array[i] === item)return i;
        return -1;
    };
    _.range = function (start, stop, step) {
        if (arguments.length <= 1) {
            stop = start || 0;
            start = 0;
        }
        step = arguments[2] || 1;
        var len = Math.max(Math.ceil((stop - start) / step), 0);
        var idx = 0;
        var range = new Array(len);
        while (idx < len) {
            range[idx++] = start;
            start += step;
        }
        return range;
    };
    var ctor = function () {
    };
    _.bind = function bind(func, context) {
        var bound, args;
        if (func.bind === nativeBind && nativeBind)return nativeBind.apply(func, slice.call(arguments, 1));
        if (!_.isFunction(func))throw new TypeError;
        args = slice.call(arguments, 2);
        return bound = function () {
            if (!(this instanceof bound))return func.apply(context, args.concat(slice.call(arguments)));
            ctor.prototype = func.prototype;
            var self = new ctor;
            var result = func.apply(self, args.concat(slice.call(arguments)));
            if (Object(result) === result)return result;
            return self;
        };
    };
    _.bindAll = function (obj) {
        var funcs = slice.call(arguments, 1);
        if (funcs.length == 0)funcs = _.functions(obj);
        each(funcs, function (f) {
            obj[f] = _.bind(obj[f], obj);
        });
        return obj;
    };
    _.memoize = function (func, hasher) {
        var memo = {};
        hasher || (hasher = _.identity);
        return function () {
            var key = hasher.apply(this, arguments);
            return hasOwnProperty.call(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
        };
    };
    _.delay = function (func, wait) {
        var args = slice.call(arguments, 2);
        return setTimeout(function () {
            return func.apply(func, args);
        }, wait);
    };
    _.defer = function (func) {
        return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
    };
    _.throttle = function (func, wait) {
        var context, args, timeout, throttling, more;
        var whenDone = _.debounce(function () {
            more = throttling = false;
        }, wait);
        return function () {
            context = this;
            args = arguments;
            var later = function () {
                timeout = null;
                if (more)func.apply(context, args);
                whenDone();
            };
            if (!timeout)timeout = setTimeout(later, wait);
            if (throttling) {
                more = true;
            } else {
                func.apply(context, args);
            }
            whenDone();
            throttling = true;
        };
    };
    _.debounce = function (func, wait) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                func.apply(context, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };
    _.once = function (func) {
        var ran = false, memo;
        return function () {
            if (ran)return memo;
            ran = true;
            return memo = func.apply(this, arguments);
        };
    };
    _.wrap = function (func, wrapper) {
        return function () {
            var args = [func].concat(slice.call(arguments, 0));
            return wrapper.apply(this, args);
        };
    };
    _.compose = function () {
        var funcs = arguments;
        return function () {
            var args = arguments;
            for (var i = funcs.length - 1; i >= 0; i--) {
                args = [funcs[i].apply(this, args)];
            }
            return args[0];
        };
    };
    _.after = function (times, func) {
        if (times <= 0)return func();
        return function () {
            if (--times < 1) {
                return func.apply(this, arguments);
            }
        };
    };
    _.keys = nativeKeys || function (obj) {
        if (obj !== Object(obj))throw new TypeError('Invalid object');
        var keys = [];
        for (var key in obj)if (hasOwnProperty.call(obj, key))keys[keys.length] = key;
        return keys;
    };
    _.values = function (obj) {
        return _.map(obj, _.identity);
    };
    _.functions = _.methods = function (obj) {
        var names = [];
        for (var key in obj) {
            if (_.isFunction(obj[key]))names.push(key);
        }
        return names.sort();
    };
    _.extend = function (obj) {
        each(slice.call(arguments, 1), function (source) {
            for (var prop in source) {
                if (source[prop] !== void 0)obj[prop] = source[prop];
            }
        });
        return obj;
    };
    _.defaults = function (obj) {
        each(slice.call(arguments, 1), function (source) {
            for (var prop in source) {
                if (obj[prop] == null)obj[prop] = source[prop];
            }
        });
        return obj;
    };
    _.clone = function (obj) {
        if (!_.isObject(obj))return obj;
        return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
    };
    _.tap = function (obj, interceptor) {
        interceptor(obj);
        return obj;
    };
    function eq(a, b, stack) {
        if (a === b)return a !== 0 || 1 / a == 1 / b;
        if (a == null || b == null)return a === b;
        if (a._chain)a = a._wrapped;
        if (b._chain)b = b._wrapped;
        if (a.isEqual && _.isFunction(a.isEqual))return a.isEqual(b);
        if (b.isEqual && _.isFunction(b.isEqual))return b.isEqual(a);
        var className = toString.call(a);
        if (className != toString.call(b))return false;
        switch (className) {
            case'[object String]':
                return a == String(b);
            case'[object Number]':
                return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
            case'[object Date]':
            case'[object Boolean]':
                return +a == +b;
            case'[object RegExp]':
                return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase;
        }
        if (typeof a != 'object' || typeof b != 'object')return false;
        var length = stack.length;
        while (length--) {
            if (stack[length] == a)return true;
        }
        stack.push(a);
        var size = 0, result = true;
        if (className == '[object Array]') {
            size = a.length;
            result = size == b.length;
            if (result) {
                while (size--) {
                    if (!(result = size in a == size in b && eq(a[size], b[size], stack)))break;
                }
            }
        } else {
            if ('constructor'in a != 'constructor'in b || a.constructor != b.constructor)return false;
            for (var key in a) {
                if (hasOwnProperty.call(a, key)) {
                    size++;
                    if (!(result = hasOwnProperty.call(b, key) && eq(a[key], b[key], stack)))break;
                }
            }
            if (result) {
                for (key in b) {
                    if (hasOwnProperty.call(b, key) && !(size--))break;
                }
                result = !size;
            }
        }
        stack.pop();
        return result;
    }

    _.isEqual = function (a, b) {
        return eq(a, b, []);
    };
    _.isEmpty = function (obj) {
        if (_.isArray(obj) || _.isString(obj))return obj.length === 0;
        for (var key in obj)if (hasOwnProperty.call(obj, key))return false;
        return true;
    };
    _.isElement = function (obj) {
        return !!(obj && obj.nodeType == 1);
    };
    _.isArray = nativeIsArray || function (obj) {
        return toString.call(obj) == '[object Array]';
    };
    _.isObject = function (obj) {
        return obj === Object(obj);
    };
    _.isArguments = function (obj) {
        return toString.call(obj) == '[object Arguments]';
    };
    if (!_.isArguments(arguments)) {
        _.isArguments = function (obj) {
            return !!(obj && hasOwnProperty.call(obj, 'callee'));
        };
    }
    _.isFunction = function (obj) {
        return toString.call(obj) == '[object Function]';
    };
    _.isString = function (obj) {
        return toString.call(obj) == '[object String]';
    };
    _.isNumber = function (obj) {
        return toString.call(obj) == '[object Number]';
    };
    _.isNaN = function (obj) {
        return obj !== obj;
    };
    _.isBoolean = function (obj) {
        return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
    };
    _.isDate = function (obj) {
        return toString.call(obj) == '[object Date]';
    };
    _.isRegExp = function (obj) {
        return toString.call(obj) == '[object RegExp]';
    };
    _.isNull = function (obj) {
        return obj === null;
    };
    _.isUndefined = function (obj) {
        return obj === void 0;
    };
    _.noConflict = function () {
        root._ = previousUnderscore;
        return this;
    };
    _.identity = function (value) {
        return value;
    };
    _.times = function (n, iterator, context) {
        for (var i = 0; i < n; i++)iterator.call(context, i);
    };
    _.escape = function (string) {
        return ('' + string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g, '&#x2F;');
    };
    _.mixin = function (obj) {
        each(_.functions(obj), function (name) {
            addToWrapper(name, _[name] = obj[name]);
        });
    };
    var idCounter = 0;
    _.uniqueId = function (prefix) {
        var id = idCounter++;
        return prefix ? prefix + id : id;
    };
    _.templateSettings = {evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g, escape: /<%-([\s\S]+?)%>/g};
    var noMatch = /.^/;
    _.template = function (str, data) {
        var c = _.templateSettings;
        var tmpl = 'var __p=[],print=function(){__p.push.apply(__p,arguments);};' + 'with(obj||{}){__p.push(\'' +
            str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(c.escape || noMatch, function (match, code) {
                return "',_.escape(" + code.replace(/\\'/g, "'") + "),'";
            }).replace(c.interpolate || noMatch, function (match, code) {
                return "'," + code.replace(/\\'/g, "'") + ",'";
            }).replace(c.evaluate || noMatch, function (match, code) {
                return "');" + code.replace(/\\'/g, "'").replace(/[\r\n\t]/g, ' ').replace(/\\\\/g, '\\') + ";__p.push('";
            }).replace(/\r/g, '\\r').replace(/\n/g, '\\n').replace(/\t/g, '\\t')
            + "');}return __p.join('');";
        var func = new Function('obj', '_', tmpl);
        if (data)return func(data, _);
        return function (data) {
            return func.call(this, data, _);
        };
    };
    _.chain = function (obj) {
        return _(obj).chain();
    };
    var wrapper = function (obj) {
        this._wrapped = obj;
    };
    _.prototype = wrapper.prototype;
    var result = function (obj, chain) {
        return chain ? _(obj).chain() : obj;
    };
    var addToWrapper = function (name, func) {
        wrapper.prototype[name] = function () {
            var args = slice.call(arguments);
            unshift.call(args, this._wrapped);
            return result(func.apply(_, args), this._chain);
        };
    };
    _.mixin(_);
    each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function (name) {
        var method = ArrayProto[name];
        wrapper.prototype[name] = function () {
            var wrapped = this._wrapped;
            method.apply(wrapped, arguments);
            var length = wrapped.length;
            if ((name == 'shift' || name == 'splice') && length === 0)delete wrapped[0];
            return result(wrapped, this._chain);
        };
    });
    each(['concat', 'join', 'slice'], function (name) {
        var method = ArrayProto[name];
        wrapper.prototype[name] = function () {
            return result(method.apply(this._wrapped, arguments), this._chain);
        };
    });
    wrapper.prototype.chain = function () {
        this._chain = true;
        return this;
    };
    wrapper.prototype.value = function () {
        return this._wrapped;
    };
}).call(this);
(function () {
    jQuery.fn.autohide = function (options) {
        var me = this;
        options = DV._.extend({clickable: null, onHide: null}, options || {});
        me._autoignore = true;
        setTimeout(function () {
            delete me._autoignore;
        }, 0);
        if (!me._autohider) {
            me.forceHide = function (e) {
                if (!e && options.onHide)options.onHide();
                me.hide();
                DV.jQuery(document).unbind('click', me._autohider);
                DV.jQuery(document).unbind('keypress', me._autohider);
                me._autohider = null;
                me.forceHide = null;
            };
            me._autohider = function (e) {
                if (me._autoignore)return;
                if (options.clickable && (me[0] == e.target || DV._.include(DV.jQuery(e.target).parents(), me[0])))return;
                if (options.onHide && !options.onHide(e))return;
                me.forceHide(e);
            };
            DV.jQuery(document).bind('click', this._autohider);
            DV.jQuery(document).bind('keypress', this._autohider);
        }
    };
    jQuery.fn.acceptInput = function (options) {
        var config = {
            delay: 1000,
            callback: null,
            className: 'acceptInput',
            initialStateClassName: 'acceptInput-awaitingActivity',
            typingStateClassName: 'acceptInput-acceptingInput',
            inputClassName: 'acceptInput-textField'
        };
        if (options) {
            DV.jQuery.extend(config, options);
        }
        this.editTimer = null;
        this.deny = function () {
            this.parent().addClass('stopAcceptingInput');
        };
        this.allow = function () {
            this.parent().removeClass('stopAcceptingInput');
        };
        this.each(function (i, el) {
            if (DV.jQuery(el).parent().hasClass(config.initialStateClassName)) {
                return true;
            }
            el = DV.jQuery(el);
            var elWrapped = el.wrap('<span class="' + config.initialStateClassName + '"></span>');
            elWrapped = elWrapped.parent();
            var inputElement = DV.jQuery('<input type="text" class="' + config.inputClassName + '" style="display:none;" />').appendTo(elWrapped);
            inputElement.bind('blur', function () {
                elWrapped.addClass(config.initialStateClassName).removeClass(config.typingStateClassName);
                inputElement.hide();
                el.show();
            });
            DV.jQuery(document).keyup(function (e) {
                if (e.keyCode == 27) {
                    DV.jQuery('#document-viewer').removeClass('DIV-fullscreen');
                    DV.jQuery('.DV-pdfDownload').children().css({'padding-bottom': '8px', 'padding-top': '5px'});
                }
            });
            inputElement.bind('keyup', function () {
                var val = inputElement.attr('value');
                if (val == '') {
                    if (config.changeCallBack) {
                        DV.jQuery.fn.acceptInput.editTimer = setTimeout(config.changeCallBack, 5000);
                    }
                } else {
                    if (config.changeCallBack) {
                        DV.jQuery.fn.acceptInput.editTimer = setTimeout(config.changeCallBack, 800);
                    }
                }
            });
            inputElement.bind('keydown', function () {
                if (DV.jQuery.fn.acceptInput.editTimer) {
                    clearTimeout(DV.jQuery.fn.acceptInput.editTimer);
                }
            });
            elWrapped.bind('click', function () {
                if (elWrapped.hasClass('stopAcceptingInput'))return;
                if (elWrapped.hasClass(config.initialStateClassName)) {
                    var autoHider = function () {
                        elWrapped.addClass(config.initialStateClassName).removeClass(config.typingStateClassName);
                    };
                    DV.jQuery(inputElement).autohide({clickable: true, onHide: DV.jQuery.proxy(autoHider, this)});
                    el.hide();
                    inputElement.attr('value', el.text()).show()[0].focus();
                    inputElement[0].select();
                    elWrapped.addClass(config.typingStateClassName).removeClass(config.initialStateClassName);
                }
            });
        });
        return this;
    };
}).call(this);
(function ($) {
    $.fn.placeholder = function (opts) {
        var defaults = {message: '...', className: 'placeholder', clearClassName: 'show_cancel_search'};
        var options = $.extend({}, defaults, opts);
        var setPlaceholder = function ($input) {
            $input.val($input.attr('placeholder') || options.message);
            $input.addClass(options.className);
        };
        return this.each(function () {
            var $this = $(this);
            if ($this.attr('type') == 'search')return;
            $this.bind('blur', function () {
                if ($this.val() == '') {
                    setPlaceholder($this);
                }
            }).bind('focus', function () {
                if ($this.val() == ($this.attr('placeholder') || options.message)) {
                    $this.val('');
                }
                $this.removeClass(options.className);
            }).bind('keyup', function () {
                var searchVal = $this.val();
                if (searchVal != '' && searchVal != options.message) {
                    $this.parent().addClass(options.clearClassName);
                } else {
                    $this.parent().removeClass(options.clearClassName);
                }
            });
            DV._.defer(function () {
                $this.keyup().blur();
            });
        });
    };
})(jQuery);
window.console || (window.console = {});
console.log || (console.log = _.identity);
window.DV = window.DV || {};
DV.jQuery = jQuery.noConflict(true);
DV._ = _.noConflict();
_ = DV._;
DV.viewers = DV.viewers || {};
DV.model = DV.model || {};
DV.Annotation = function (argHash) {
    this.position = {top: argHash.top, left: argHash.left};
    this.dimensions = {width: argHash.width, height: argHash.height};
    this.page = argHash.page;
    this.pageEl = argHash.pageEl;
    this.annotationContainerEl = argHash.annotationContainerEl;
    this.viewer = this.page.set.viewer;
    this.annotationEl = null;
    this.renderedHTML = argHash.renderedHTML;
    this.type = argHash.type;
    this.id = argHash.id;
    this.model = this.viewer.models.annotations.getAnnotation(this.id);
    this.state = 'collapsed';
    this.active = false;
    this.remove();
    this.add();
    if (argHash.active) {
        this.viewer.helpers.setActiveAnnotationLimits(this);
        this.viewer.events.resetTracker();
        this.active = null;
        this.show();
        if (argHash.showEdit)this.showEdit();
    }
};
DV.Annotation.prototype.add = function () {
    if (this.type === 'page') {
        this.annotationEl = this.renderedHTML.insertBefore(this.annotationContainerEl);
    } else {
        if (this.page.annotations.length > 0) {
            for (var i = 0, len = this.page.annotations.length; i < len; i++) {
                if (this.page.annotations[i].id === this.id) {
                    return false;
                } else {
                    this.annotationEl = this.renderedHTML.appendTo(this.annotationContainerEl);
                }
            }
        } else {
            this.annotationEl = this.renderedHTML.appendTo(this.annotationContainerEl);
        }
    }
};
DV.Annotation.prototype.next = function () {
    this.hide.preventRemovalOfCoverClass = true;
    var annotation = this.viewer.models.annotations.getNextAnnotation(this.id);
    if (!annotation) {
        return;
    }
    this.page.set.showAnnotation({index: annotation.index, id: annotation.id, top: annotation.top});
};
DV.Annotation.prototype.previous = function () {
    this.hide.preventRemovalOfCoverClass = true;
    var annotation = this.viewer.models.annotations.getPreviousAnnotation(this.id);
    if (!annotation) {
        return;
    }
    this.page.set.showAnnotation({index: annotation.index, id: annotation.id, top: annotation.top});
};
DV.Annotation.prototype.show = function (argHash) {
    if (this.viewer.activeAnnotation && this.viewer.activeAnnotation.id != this.id) {
        this.viewer.activeAnnotation.hide();
    }
    this.viewer.annotationToLoadId = null;
    this.viewer.elements.window.addClass('DV-coverVisible');
    this.annotationEl.find('div.DV-annotationBG').css({display: 'block', opacity: 1});
    this.annotationEl.addClass('DV-activeAnnotation');
    this.viewer.activeAnnotation = this;
    this.viewer.helpers.addObserver('trackAnnotation');
    this.viewer.helpers.setActiveAnnotationInNav(this.id);
    this.active = true;
    this.pageEl.parent('.DV-set').addClass('DV-activePage');
    if (argHash && argHash.edit) {
        this.showEdit();
    }
};
DV.Annotation.prototype.hide = function (forceOverlayHide) {
    var pageNumber = parseInt(this.viewer.elements.currentPage.text(), 10);
    if (this.type !== 'page') {
        this.annotationEl.find('div.DV-annotationBG').css({opacity: 0, display: 'none'});
    }
    var isEditing = this.annotationEl.hasClass('DV-editing');
    this.annotationEl.removeClass('DV-editing DV-activeAnnotation');
    if (forceOverlayHide === true) {
        this.viewer.elements.window.removeClass('DV-coverVisible');
    }
    if (this.hide.preventRemovalOfCoverClass === false || !this.hide.preventRemovalOfCoverClass) {
        this.viewer.elements.window.removeClass('DV-coverVisible');
        this.hide.preventRemovalOfCoverClass = false;
    }
    this.viewer.activeAnnotation = null;
    this.viewer.events.trackAnnotation.h = null;
    this.viewer.events.trackAnnotation.id = null;
    this.viewer.events.trackAnnotation.combined = null;
    this.active = false;
    this.viewer.pageSet.setActiveAnnotation(null);
    this.viewer.helpers.removeObserver('trackAnnotation');
    this.viewer.helpers.setActiveAnnotationInNav();
    this.pageEl.parent('.DV-set').removeClass('DV-activePage');
    this.removeConnector(true);
    if (isEditing) {
        this.viewer.helpers.saveAnnotation({target: this.annotationEl}, 'onlyIfText');
    }
};
DV.Annotation.prototype.toggle = function (argHash) {
    if (this.viewer.activeAnnotation && (this.viewer.activeAnnotation != this)) {
        this.viewer.activeAnnotation.hide();
    }
    if (this.type === 'page')return;
    this.annotationEl.toggleClass('DV-activeAnnotation');
    if (this.active == true) {
        this.hide(true);
    } else {
        this.show();
    }
};
DV.Annotation.prototype.drawConnector = function () {
    if (this.active != true) {
        this.viewer.elements.window.addClass('DV-annotationActivated');
        this.annotationEl.addClass('DV-annotationHover');
    }
};
DV.Annotation.prototype.removeConnector = function (force) {
    if (this.active != true) {
        this.viewer.elements.window.removeClass('DV-annotationActivated');
        this.annotationEl.removeClass('DV-annotationHover');
    }
};
DV.Annotation.prototype.showEdit = function () {
    this.annotationEl.addClass('DV-editing');
    this.viewer.$('.DV-annotationTitleInput', this.annotationEl).focus();
};
DV.Annotation.prototype.remove = function () {
    DV.jQuery('#DV-annotation-' + this.id).remove();
};
DV.DragReporter = function (viewer, toWatch, dispatcher, argHash) {
    this.viewer = viewer;
    this.dragClassName = 'DV-dragging';
    this.sensitivityY = 1.0;
    this.sensitivityX = 1.0;
    this.oldPageY = 0;
    DV._.extend(this, argHash);
    this.dispatcher = dispatcher;
    this.toWatch = this.viewer.$(toWatch);
    this.boundReporter = DV._.bind(this.mouseMoveReporter, this);
    this.boundMouseUpReporter = DV._.bind(this.mouseUpReporter, this);
    this.boundMouseDownReporter = DV._.bind(this.mouseDownReporter, this);
    this.setBinding();
};
DV.DragReporter.prototype.shouldIgnore = function (e) {
    if (!this.ignoreSelector)return false;
    var el = this.viewer.$(e.target);
    return el.parents().is(this.ignoreSelector) || el.is(this.ignoreSelector);
};
DV.DragReporter.prototype.mouseUpReporter = function (e) {
    if (this.shouldIgnore(e))return true;
    e.preventDefault();
    clearInterval(this.updateTimer);
    this.stop();
};
DV.DragReporter.prototype.oldPositionUpdater = function () {
    this.oldPageY = this.pageY;
};
DV.DragReporter.prototype.stop = function () {
    this.toWatch.removeClass(this.dragClassName);
    this.toWatch.unbind('mousemove');
};
DV.DragReporter.prototype.setBinding = function () {
    this.toWatch.mouseup(this.boundMouseUpReporter);
    this.toWatch.mousedown(this.boundMouseDownReporter);
};
DV.DragReporter.prototype.unBind = function () {
    this.toWatch.unbind('mouseup', this.boundMouseUpReporter);
    this.toWatch.unbind('mousedown', this.boundMouseDownReporter);
};
DV.DragReporter.prototype.destroy = function () {
    this.unBind();
    this.toWatch = null;
};
DV.DragReporter.prototype.mouseDownReporter = function (e) {
    if (this.shouldIgnore(e))return true;
    e.preventDefault();
    this.pageY = e.pageY;
    this.pageX = e.pageX;
    this.oldPageY = e.pageY;
    this.updateTimer = setInterval(DV._.bind(this.oldPositionUpdater, this), 1200);
    this.toWatch.addClass(this.dragClassName);
    this.toWatch.mousemove(this.boundReporter);
};
DV.DragReporter.prototype.mouseMoveReporter = function (e) {
    if (this.shouldIgnore(e))return true;
    e.preventDefault();
    var deltaX = Math.round(this.sensitivityX * (this.pageX - e.pageX));
    var deltaY = Math.round(this.sensitivityY * (this.pageY - e.pageY));
    var directionX = (deltaX > 0) ? 'right' : 'left';
    var directionY = (deltaY > 0) ? 'down' : 'up';
    this.pageY = e.pageY;
    this.pageX = e.pageX;
    if (deltaY === 0 && deltaX === 0)return;
    this.dispatcher({event: e, deltaX: deltaX, deltaY: deltaY, directionX: directionX, directionY: directionY});
};
DV.Elements = function (viewer) {
    this._viewer = viewer;
    var elements = DV.Schema.elements;
    for (var i = 0, elemCount = elements.length; i < elemCount; i++) {
        this.getElement(elements[i]);
    }
};
DV.Elements.prototype.getElement = function (elementQuery, force) {
    this[elementQuery.name] = this._viewer.$(elementQuery.query);
};
DV.History = function (viewer) {
    this.viewer = viewer;
    DV.History.count++;
    this.URL_CHECK_INTERVAL = 500;
    this.USE_IFRAME = DV.jQuery.browser.msie && DV.jQuery.browser.version < 8;
    this.handlers = [];
    this.defaultCallback = null;
    this.hash = window.location.hash;
    DV._.bindAll(this, 'checkURL');
    if (DV.History.count > 1)return;
    DV.jQuery(DV._.bind(function () {
        if (this.USE_IFRAME)this.iframe = DV.jQuery('<iframe src="javascript:0"/>').hide().appendTo('body')[0].contentWindow;
        if ('onhashchange'in window) {
            window.onhashchange = this.checkURL;
        } else {
            setInterval(this.checkURL, this.URL_CHECK_INTERVAL);
        }
    }, this));
};
DV.History.count = 0;
DV.History.prototype = {
    register: function (matcher, callback) {
        this.handlers.push({matcher: matcher, callback: callback});
    }, save: function (hash) {
        if (DV.History.count > 1)return;
        window.location.hash = this.hash = (hash ? '#' + hash : '');
        if (this.USE_IFRAME && (this.iframe && (this.hash != this.iframe.location.hash))) {
            this.iframe.document.open().close();
            this.iframe.location.hash = this.hash;
        }
    }, checkURL: function () {
        if (DV.History.count > 1)return;
        try {
            var current = (this.USE_IFRAME ? this.iframe : window).location.hash;
        } catch (err) {
        }
        if (!current || current == this.hash || '#' + current == this.hash || current == decodeURIComponent(this.hash))return false;
        if (this.USE_IFRAME)window.location.hash = current;
        this.loadURL(true);
    }, loadURL: function (executeCallbacks) {
        var hash = this.hash = window.location.hash;
        for (var i = this.handlers.length - 1; i >= 0; i--) {
            var match = hash.match(this.handlers[i].matcher);
            if (match) {
                if (executeCallbacks === true) {
                    this.handlers[i].callback.apply(this.handlers[i].callback, match.slice(1, match.length));
                }
                return true;
            }
        }
        if (this.defaultCallback != null && executeCallbacks === true) {
            this.defaultCallback();
        } else {
            return false;
        }
    }
};
DV.Page = function (viewer, argHash) {
    this.viewer = viewer;
    this.index = argHash.index;
    for (var key in argHash)this[key] = argHash[key];
    this.el = this.viewer.$(this.el);
    this.parent = this.el.parent();
    this.pageNumberEl = this.el.find('span.DV-pageNumber');
    this.pageInsertEl = this.el.find('.DV-pageNoteInsert');
    this.removedOverlayEl = this.el.find('.DV-overlay');
    this.pageImageEl = this.getPageImage();
    this.pageEl = this.el.find('div.DV-page');
    this.annotationContainerEl = this.el.find('div.DV-annotations');
    this.coverEl = this.el.find('div.DV-cover');
    this.loadTimer = null;
    this.hasLayerPage = false;
    this.hasLayerRegional = false;
    this.imgSource = null;
    this.offset = null;
    this.pageNumber = null;
    this.zoom = 1;
    this.annotations = [];
    var m = this.viewer.models;
    this.model_document = m.document;
    this.model_pages = m.pages;
    this.model_annotations = m.annotations;
    this.model_chapters = m.chapters;
};
DV.Page.prototype.setPageImage = function () {
    this.pageImageEl = this.getPageImage();
};
DV.Page.prototype.getPageImage = function () {
    return this.el.find('img.DV-pageImage');
};
DV.Page.prototype.getOffset = function () {
    return this.model_document.offsets[this.index];
};
DV.Page.prototype.getPageNoteHeight = function () {
    return this.model_pages.pageNoteHeights[this.index];
};
DV.Page.prototype.draw = function (argHash) {
    if (this.index === argHash.index && !argHash.force && this.imgSource == this.model_pages.imageURL(this.index)) {
        return;
    }
    this.index = (argHash.force === true) ? this.index : argHash.index;
    var _types = [];
    var source = this.model_pages.imageURL(this.index);
    this.el[0].className = this.el[0].className.replace(/\s*DV-page-\d+/, '') + ' DV-page-' + (this.index + 1);
    if (this.imgSource != source) {
        this.imgSource = source;
        this.loadImage();
    }
    this.sizeImage();
    this.position();
    if (this.pageNumber != this.index + 1 || argHash.forceAnnotationRedraw === true) {
        for (var i = 0; i < this.annotations.length; i++) {
            this.annotations[i].remove();
            delete this.annotations[i];
            this.hasLayerRegional = false;
            this.hasLayerPage = false;
        }
        this.annotations = [];
        var byPage = this.model_annotations.byPage[this.index];
        if (byPage) {
            for (var i = 0; i < byPage.length; i++) {
                var anno = byPage[i];
                if (anno.id === this.viewer.annotationToLoadId) {
                    var active = true;
                    if (anno.id === this.viewer.annotationToLoadEdit)argHash.edit = true;
                    if (this.viewer.openingAnnotationFromHash) {
                        this.viewer.helpers.jump(this.index, (anno.top || 0) - 37);
                        this.viewer.openingAnnotationFromHash = false;
                    }
                } else {
                    var active = false;
                }
                if (anno.type == 'page') {
                    this.hasLayerPage = true;
                } else if (anno.type == 'regional') {
                    this.hasLayerRegional = true;
                }
                var html = this.viewer.$('.DV-allAnnotations .DV-annotation[rel=aid-' + anno.id + ']').clone();
                html.attr('id', 'DV-annotation-' + anno.id);
                html.find('.DV-img').each(function () {
                    var el = DV.jQuery(this);
                    el.attr('src', el.attr('data-src'));
                });
                var newAnno = new DV.Annotation({
                    renderedHTML: html,
                    id: anno.id,
                    page: this,
                    pageEl: this.pageEl,
                    annotationContainerEl: this.annotationContainerEl,
                    pageNumber: this.pageNumber,
                    state: 'collapsed',
                    top: anno.y1,
                    left: anno.x1,
                    width: anno.x1 + anno.x2,
                    height: anno.y1 + anno.y2,
                    active: active,
                    showEdit: argHash.edit,
                    type: anno.type
                });
                this.annotations.push(newAnno);
            }
        }
        this.pageInsertEl.toggleClass('visible', !this.hasLayerPage);
        this.renderMeta({pageNumber: this.index + 1});
        this.drawRemoveOverlay();
    }
    this.setPageType();
};
DV.Page.prototype.drawRemoveOverlay = function () {
    this.removedOverlayEl.toggleClass('visible', !!this.viewer.models.removedPages[this.index + 1]);
};
DV.Page.prototype.setPageType = function () {
    if (this.annotations.length > 0) {
        if (this.hasLayerPage === true) {
            this.el.addClass('DV-layer-page');
        }
        if (this.hasLayerRegional === true) {
            this.el.addClass('DV-layer-page');
        }
    } else {
        this.el.removeClass('DV-layer-page DV-layer-regional');
    }
};
DV.Page.prototype.position = function (argHash) {
    this.el.css({top: this.model_document.offsets[this.index]});
    this.offset = this.getOffset();
};
DV.Page.prototype.renderMeta = function (argHash) {
    this.pageNumberEl.text('S. ' + argHash.pageNumber);
    this.pageNumber = argHash.pageNumber;
};
DV.Page.prototype.loadImage = function (argHash) {
    if (this.loadTimer) {
        clearTimeout(this.loadTimer);
        delete this.loadTimer;
    }
    this.el.removeClass('DV-loaded').addClass('DV-loading');
    var pageModel = this.model_pages;
    var preloader = DV.jQuery(new Image);
    var me = this;
    var lazyImageLoader = function () {
        if (me.loadTimer) {
            clearTimeout(me.loadTimer);
            delete me.loadTimer;
        }
        preloader.bind('load readystatechange', function (e) {
            if (this.complete || (this.readyState == 'complete' && e.type == 'readystatechange')) {
                if (preloader != me._currentLoader)return;
                pageModel.updateHeight(preloader[0], me.index);
                me.drawImage(preloader[0].src);
                clearTimeout(me.loadTimer);
                delete me.loadTimer;
            }
        });
        var src = me.model_pages.imageURL(me.index);
        me._currentLoader = preloader;
        preloader[0].src = src;
    };
    this.loadTimer = setTimeout(lazyImageLoader, 150);
    this.viewer.pageSet.redraw();
};
DV.Page.prototype.sizeImage = function () {
    var width = this.model_pages.width;
    var height = this.model_pages.getPageHeight(this.index);
    this.coverEl.css({width: width, height: height});
    this.pageImageEl.css({width: width, height: height});
    this.el.css({height: height, width: width});
    this.pageEl.css({height: height, width: width});
};
DV.Page.prototype.drawImage = function (imageURL) {
    var imageHeight = this.model_pages.getPageHeight(this.index);
    if (imageURL == this.pageImageEl.attr('src') && imageHeight == this.pageImageEl.attr('height')) {
        this.el.addClass('DV-loaded').removeClass('DV-loading');
        return;
    }
    this.pageImageEl.replaceWith('<img width="' + this.model_pages.width + '" height="' + imageHeight + '" class="DV-pageImage" src="' + imageURL + '" />');
    this.setPageImage();
    this.sizeImage();
    this.el.addClass('DV-loaded').removeClass('DV-loading');
};
DV.PageSet = function (viewer) {
    this.currentPage = null;
    this.pages = {};
    this.viewer = viewer;
    this.zoomText();
};
DV.PageSet.prototype.execute = function (action, params) {
    this.pages.each(function (pageInstance) {
        pageInstance[action].apply(pageInstance, params);
    });
};
DV.PageSet.prototype.buildPages = function (options) {
    options = options || {};
    var pages = this.getPages();
    DV._.each(pages, function (page) {
        page.set = this;
        this.pages[page.label] = new DV.Page(this.viewer, page);
        if (page.currentPage == true) {
            this.currentPage = this.pages[page.label];
        }
    }, this);
    this.viewer.models.annotations.renderAnnotations();
};
DV.PageSet.prototype.getPages = function () {
    var _pages = [];
    this.viewer.elements.sets.each(function (_index, el) {
        var currentPage = (_index == 0) ? true : false;
        _pages.push({label: 'p' + _index, el: el, index: _index, pageNumber: _index + 1, currentPage: currentPage});
    });
    return _pages;
};
DV.PageSet.prototype.reflowPages = function () {
    this.viewer.models.pages.resize();
    this.viewer.helpers.setActiveAnnotationLimits();
    this.redraw(false, true);
};
DV.PageSet.prototype.simpleReflowPages = function () {
    this.viewer.helpers.setActiveAnnotationLimits();
    this.redraw(false, false);
};
DV.PageSet.prototype.cleanUp = function () {
    if (this.viewer.activeAnnotation) {
        this.viewer.activeAnnotation.hide(true);
    }
};
DV.PageSet.prototype.zoom = function (argHash) {
    if (this.viewer.models.document.zoomLevel === argHash.zoomLevel)return;
    var currentPage = this.viewer.models.document.currentIndex();
    var oldOffset = this.viewer.models.document.offsets[currentPage];
    var oldZoom = this.viewer.models.document.zoomLevel * 1;
    var relativeZoom = argHash.zoomLevel / oldZoom;
    var scrollPos = this.viewer.elements.window.scrollTop();
    this.viewer.models.document.zoom(argHash.zoomLevel);
    var diff = (parseInt(scrollPos, 10) > parseInt(oldOffset, 10)) ? scrollPos - oldOffset : oldOffset - scrollPos;
    var diffPercentage = diff / this.viewer.models.pages.height;
    this.reflowPages();
    this.zoomText();
    if (this.viewer.state === 'ViewThumbnails') {
        this.viewer.thumbnails.setZoom(argHash.zoomLevel);
        this.viewer.thumbnails.lazyloadThumbnails();
    }
    if (this.viewer.state === 'ViewDocument') {
        this.viewer.$('.DV-annotationRegion.DV-accessRedact').each(function () {
            var el = DV.jQuery(this);
            el.css({
                top: Math.round(el.position().top * relativeZoom),
                left: Math.round(el.position().left * relativeZoom),
                width: Math.round(el.width() * relativeZoom),
                height: Math.round(el.height() * relativeZoom)
            });
        });
    }
    if (this.viewer.activeAnnotation != null) {
        var args = {
            index: this.viewer.models.document.currentIndex(),
            top: this.viewer.activeAnnotation.top,
            id: this.viewer.activeAnnotation.id
        };
        this.viewer.activeAnnotation = null;
        this.showAnnotation(args);
        this.viewer.helpers.setActiveAnnotationLimits(this.viewer.activeAnnotation);
    } else {
        var _offset = Math.round(this.viewer.models.pages.height * diffPercentage);
        this.viewer.helpers.jump(this.viewer.models.document.currentIndex(), _offset);
    }
};
DV.PageSet.prototype.zoomText = function () {
    var padding = this.viewer.models.pages.getPadding();
    var width = this.viewer.models.pages.zoomLevel;
    this.viewer.$('.DV-textContents').width(width - padding);
    this.viewer.$('.DV-textPage').width(width);
    this.viewer.elements.collection.css({'width': width + padding});
};
DV.PageSet.prototype.draw = function (pageCollection) {
    for (var i = 0, pageCollectionLength = pageCollection.length; i < pageCollectionLength; i++) {
        var page = this.pages[pageCollection[i].label];
        if (page)page.draw({index: pageCollection[i].index, pageNumber: pageCollection[i].index + 1});
    }
};
DV.PageSet.prototype.redraw = function (stopResetOfPosition, redrawAnnotations) {
    if (this.pages['p0'])this.pages['p0'].draw({force: true, forceAnnotationRedraw: redrawAnnotations});
    if (this.pages['p1'])this.pages['p1'].draw({force: true, forceAnnotationRedraw: redrawAnnotations});
    if (this.pages['p2'])this.pages['p2'].draw({force: true, forceAnnotationRedraw: redrawAnnotations});
    if (redrawAnnotations && this.viewer.activeAnnotation) {
        this.viewer.helpers.jump(this.viewer.activeAnnotation.page.index, this.viewer.activeAnnotation.position.top - 37);
    }
};
DV.PageSet.prototype.setActiveAnnotation = function (annotationId, edit) {
    this.viewer.annotationToLoadId = annotationId;
    this.viewer.annotationToLoadEdit = edit ? annotationId : null;
};
DV.PageSet.prototype.showAnnotation = function (argHash, showHash) {
    showHash = showHash || {};
    if (this.viewer.state === 'ViewAnnotation') {
        var offset = this.viewer.$('.DV-allAnnotations div[rel=aid-' + argHash.id + ']')[0].offsetTop;
        this.viewer.elements.window.scrollTop(offset + 10, 'fast');
        this.viewer.helpers.setActiveAnnotationInNav(argHash.id);
        this.viewer.activeAnnotationId = argHash.id;
        return;
    } else {
        this.viewer.helpers.removeObserver('trackAnnotation');
        this.viewer.activeAnnotationId = null;
        if (this.viewer.activeAnnotation != null) {
            this.viewer.activeAnnotation.hide();
        }
        this.setActiveAnnotation(argHash.id, showHash.edit);
        var isPage = this.viewer.models.annotations.byId[argHash.id].type == 'page';
        var nudge = isPage ? -7 : 36;
        var offset = argHash.top - nudge;
        for (var i = 0; i <= 2; i++) {
            if (this.pages['p' + i]) {
                for (var n = 0; n < this.pages['p' + i].annotations.length; n++) {
                    if (this.pages['p' + i].annotations[n].id === argHash.id) {
                        this.viewer.helpers.jump(argHash.index, offset);
                        this.pages['p' + i].annotations[n].show(showHash);
                        return;
                    }
                }
            }
        }
        this.viewer.helpers.jump(argHash.index, offset);
    }
};
DV.Thumbnails = function (viewer) {
    this.currentIndex = 0;
    this.zoomLevel = null;
    this.scrollTimer = null;
    this.imageUrl = viewer.schema.document.resources.page.image.replace(/\{size\}/, 'small');
    this.pageCount = viewer.schema.document.pages;
    this.viewer = viewer;
    this.resizeId = DV._.uniqueId();
    this.sizes = {
        "0": {w: 60, h: 75},
        "1": {w: 90, h: 112},
        "2": {w: 120, h: 150},
        "3": {w: 150, h: 188},
        "4": {w: 180, h: 225}
    };
    DV._.bindAll(this, 'lazyloadThumbnails', 'loadThumbnails');
};
DV.Thumbnails.prototype.render = function () {
    this.el = this.viewer.$('.DV-thumbnails');
    this.getCurrentIndex();
    this.getZoom();
    this.buildThumbnails(1, this.pageCount);
    this.setZoom();
    this.viewer.elements.window.unbind('scroll.thumbnails').bind('scroll.thumbnails', this.lazyloadThumbnails);
    var resizeEvent = 'resize.thumbnails-' + this.resizeId;
    DV.jQuery(window).unbind(resizeEvent).bind(resizeEvent, this.lazyloadThumbnails);
};
DV.Thumbnails.prototype.buildThumbnails = function (startPage, endPage) {
    if (startPage == 1)this.el.empty();
    var thumbnailsHTML = JST.thumbnails({
        page: startPage,
        endPage: endPage,
        zoom: this.zoomLevel,
        imageUrl: this.imageUrl
    });
    this.el.html(this.el.html() + thumbnailsHTML);
    this.highlightCurrentPage();
    DV._.defer(this.loadThumbnails);
};
DV.Thumbnails.prototype.getCurrentIndex = function () {
    this.currentIndex = this.viewer.models.document.currentIndex();
};
DV.Thumbnails.prototype.highlightCurrentPage = function () {
    this.currentIndex = this.viewer.models.document.currentIndex();
    this.viewer.$('.DV-thumbnail.DV-selected').removeClass('DV-selected');
    var currentThumbnail = this.viewer.$('.DV-thumbnail:eq(' + this.currentIndex + ')');
    if (currentThumbnail.length) {
        currentThumbnail.addClass('DV-selected');
        var pages = this.viewer.$('.DV-pages');
        pages.scrollTop(pages.scrollTop() + currentThumbnail.position().top - 12);
    }
};
DV.Thumbnails.prototype.setZoom = function (zoom) {
    this.getZoom(zoom);
    var size = this.sizes[this.zoomLevel];
    this.viewer.$('.DV-hasHeight').each(function (i) {
        var ratio = size.w / this.width;
        DV.jQuery(this).css({height: this.height * ratio});
    });
    this.viewer.$('.DV-hasWidth').each(function (i) {
        var ratio = size.h / this.height;
        var thisEl = DV.jQuery(this);
        thisEl.add(thisEl.prev('.DV-thumbnail-shadow')).css({width: this.width * ratio});
    });
    this.el[0].className = this.el[0].className.replace(/DV-zoom-\d\s*/, '');
    this.el.addClass('DV-zoom-' + this.zoomLevel);
};
DV.Thumbnails.prototype.getZoom = function (zoom) {
    if (zoom != null) {
        return this.zoomLevel = DV._.indexOf(this.viewer.models.document.ZOOM_RANGES, zoom);
    } else {
        return this.zoomLevel = this.viewer.slider.slider('value');
    }
};
DV.Thumbnails.prototype.setImageSize = function (image, imageEl) {
    var size = this.sizes[this.zoomLevel];
    var ratio = size.w / image.width;
    var newHeight = image.height * ratio;
    if (Math.abs(size.h - newHeight) > 10 || (/DV-has/).test(imageEl[0].className)) {
        if (newHeight < size.h) {
            imageEl.addClass('DV-hasHeight').css({height: newHeight});
        } else {
            var heightRatio = newHeight / size.h;
            var newWidth = size.w / heightRatio;
            imageEl.add(imageEl.prev('.DV-thumbnail-shadow')).addClass('DV-hasWidth').css({width: newWidth});
        }
    }
    imageEl.attr({src: image.src});
};
DV.Thumbnails.prototype.lazyloadThumbnails = function () {
    if (this.viewer.state != 'ViewThumbnails')return;
    if (this.scrollTimer)clearTimeout(this.scrollTimer);
    this.scrollTimer = setTimeout(this.loadThumbnails, 100);
};
DV.Thumbnails.prototype.loadThumbnails = function () {
    var viewer = this.viewer;
    var width = viewer.$('.DV-thumbnails').width();
    var height = viewer.elements.window.height();
    var scrollTop = viewer.elements.window.scrollTop();
    var scrollBottom = scrollTop + height;
    var first = viewer.$('.DV-thumbnail:first-child');
    var firstHeight = first.outerHeight(true);
    var firstWidth = first.outerWidth(true);
    var thumbnailsPerRow = Math.floor(width / firstWidth);
    var startPage = Math.floor(scrollTop / firstHeight * thumbnailsPerRow);
    var endPage = Math.ceil(scrollBottom / firstHeight * thumbnailsPerRow);
    startPage -= (startPage % thumbnailsPerRow) + 1;
    endPage += thumbnailsPerRow - (endPage % thumbnailsPerRow);
    this.loadImages(startPage, endPage);
};
DV.Thumbnails.prototype.loadImages = function (startPage, endPage) {
    var self = this;
    var viewer = this.viewer;
    var gt = startPage > 0 ? ':gt(' + startPage + ')' : '';
    var lt = endPage <= this.pageCount ? ':lt(' + endPage + ')' : '';
    viewer.$('.DV-thumbnail' + lt + gt).each(function (i) {
        var el = viewer.$(this);
        if (!el.attr('src')) {
            var imageEl = viewer.$('.DV-thumbnail-image', el);
            var image = new Image();
            DV.jQuery(image).bind('load', DV._.bind(self.setImageSize, self, image, imageEl)).attr({src: imageEl.attr('data-src')});
        }
    });
};
DV.Schema = function () {
    this.models = {};
    this.views = {};
    this.states = {};
    this.helpers = {};
    this.events = {};
    this.elements = {};
    this.text = {};
    this.data = {
        zoomLevel: 700,
        pageWidthPadding: 20,
        additionalPaddingOnPage: 30,
        state: {page: {previous: 0, current: 0, next: 1}}
    };
};
DV.Schema.prototype.importCanonicalDocument = function (json) {
    DV._.uniqueId();
    json.sections = DV._.sortBy(json.sections || [], function (sec) {
        return sec.page;
    });
    json.annotations = json.annotations || [];
    json.canonicalURL = json.canonical_url;
    this.document = DV.jQuery.extend(true, {}, json);
    this.data.title = json.title;
    this.data.totalPages = json.pages;
    this.data.totalAnnotations = json.annotations.length;
    this.data.sections = json.sections;
    this.data.chapters = [];
    this.data.annotationsById = {};
    this.data.annotationsByPage = {};
    DV._.each(json.annotations, DV.jQuery.proxy(this.loadAnnotation, this));
};
DV.Schema.prototype.loadAnnotation = function (anno) {
    if (anno.id)anno.server_id = anno.id;
    var idx = anno.page - 1;
    anno.id = anno.id || DV._.uniqueId();
    anno.title = anno.title || 'Untitled Note';
    anno.text = anno.content || '';
    anno.access = anno.access || 'public';
    anno.type = anno.location && anno.location.image ? 'region' : 'page';
    if (anno.type === 'region') {
        var loc = DV.jQuery.map(anno.location.image.split(','), function (n, i) {
            return parseInt(n, 10);
        });
        anno.y1 = loc[0];
        anno.x2 = loc[1];
        anno.y2 = loc[2];
        anno.x1 = loc[3];
    } else if (anno.type === 'page') {
        anno.y1 = 0;
        anno.x2 = 0;
        anno.y2 = 0;
        anno.x1 = 0;
    }
    this.data.annotationsById[anno.id] = anno;
    var page = this.data.annotationsByPage[idx] = this.data.annotationsByPage[idx] || [];
    var insertionIndex = DV._.sortedIndex(page, anno, function (a) {
        return a.y1;
    });
    page.splice(insertionIndex, 0, anno);
    return anno;
};
DV.Schema.elements = [{name: 'browserDocument', query: document}, {
    name: 'browserWindow',
    query: window
}, {name: 'header', query: 'div.DV-header'}, {name: 'viewer', query: 'div.DV-docViewer'}, {
    name: 'window',
    query: 'div.DV-pages'
}, {name: 'sets', query: 'div.DV-set'}, {name: 'pages', query: 'div.DV-page'}, {
    name: 'metas',
    query: 'div.DV-pageMeta'
}, {name: 'bar', query: 'div.DV-bar'}, {name: 'currentPage', query: 'span.DV-currentPage'}, {
    name: 'well',
    query: 'div.DV-well'
}, {name: 'collection', query: 'div.DV-pageCollection'}, {
    name: 'annotations',
    query: 'div.DV-allAnnotations'
}, {name: 'navigation', query: 'div.DV-navigation'}, {
    name: 'chaptersContainer',
    query: 'div.DV-chaptersContainer'
}, {name: 'searchInput', query: 'input.DV-searchInput'}, {
    name: 'textCurrentPage',
    query: 'span.DV-textCurrentPage'
}, {name: 'coverPages', query: 'div.DV-cover'}, {name: 'fullscreen', query: 'div.DV-fullscreen'}];
DV.model.Annotations = function (viewer) {
    this.LEFT_MARGIN = 25;
    this.PAGE_NOTE_FUDGE = window.dc && dc.account && (dc.account.isOwner || dc.account.isReviewer) ? 46 : 26;
    this.viewer = viewer;
    this.offsetsAdjustments = [];
    this.offsetAdjustmentSum = 0;
    this.saveCallbacks = [];
    this.deleteCallbacks = [];
    this.byId = this.viewer.schema.data.annotationsById;
    this.byPage = this.viewer.schema.data.annotationsByPage;
    this.bySortOrder = this.sortAnnotations();
};
DV.model.Annotations.prototype = {
    render: function (annotation) {
        var documentModel = this.viewer.models.document;
        var pageModel = this.viewer.models.pages;
        var zoom = pageModel.zoomFactor();
        var adata = annotation;
        var x1, x2, y1, y2;
        if (adata.type === 'page') {
            x1 = x2 = y1 = y2 = 0;
            adata.top = 0;
        } else {
            y1 = Math.round(adata.y1 * zoom);
            y2 = Math.round(adata.y2 * zoom);
            if (x1 < this.LEFT_MARGIN)x1 = this.LEFT_MARGIN;
            x1 = Math.round(adata.x1 * zoom);
            x2 = Math.round(adata.x2 * zoom);
            adata.top = y1 - 5;
        }
        adata.owns_note = adata.owns_note || false;
        adata.width = pageModel.width;
        adata.pageNumber = adata.page;
        adata.author = adata.author || "";
        adata.author_organization = adata.author_organization || "";
        adata.bgWidth = adata.width;
        adata.bWidth = adata.width - 16;
        adata.excerptWidth = (x2 - x1) - 8;
        adata.excerptMarginLeft = x1 - 3;
        adata.excerptHeight = y2 - y1;
        adata.index = adata.page - 1;
        adata.image = pageModel.imageURL(adata.index);
        adata.imageTop = y1 + 1;
        adata.tabTop = (y1 < 35 ? 35 - y1 : 0) + 8;
        adata.imageWidth = pageModel.width;
        adata.imageHeight = Math.round(pageModel.height * zoom);
        adata.regionLeft = x1;
        adata.regionWidth = x2 - x1;
        adata.regionHeight = y2 - y1;
        adata.excerptDSHeight = adata.excerptHeight - 6;
        adata.DSOffset = 3;
        if (adata.access == 'public')adata.accessClass = 'DV-accessPublic'; else if (adata.access == 'exclusive')adata.accessClass = 'DV-accessExclusive'; else if (adata.access == 'private')adata.accessClass = 'DV-accessPrivate';
        adata.orderClass = '';
        adata.options = this.viewer.options;
        if (adata.position == 1)adata.orderClass += ' DV-firstAnnotation';
        if (adata.position == this.bySortOrder.length)adata.orderClass += ' DV-lastAnnotation';
        var template = (adata.type === 'page') ? 'pageAnnotation' : 'annotation';
        return JST[template](adata);
    }, sortAnnotations: function () {
        return this.bySortOrder = DV._.sortBy(DV._.values(this.byId), function (anno) {
            return anno.page * 10000 + anno.y1;
        });
    }, renderAnnotations: function () {
        if (this.viewer.options.showAnnotations === false)return;
        for (var i = 0; i < this.bySortOrder.length; i++) {
            var anno = this.bySortOrder[i];
            anno.of = DV._.indexOf(this.byPage[anno.page - 1], anno);
            anno.position = i + 1;
            anno.html = this.render(anno);
        }
        this.renderAnnotationsByIndex();
    }, renderAnnotationsByIndex: function () {
        var rendered = DV._.map(this.bySortOrder, function (anno) {
            return anno.html;
        });
        var html = rendered.join('').replace(/id="DV-annotation-(\d+)"/g, function (match, id) {
            return 'id="DV-listAnnotation-' + id + '" rel="aid-' + id + '"';
        });
        this.viewer.$('div.DV-allAnnotations').html(html);
        this.renderAnnotationsByIndex.rendered = true;
        this.renderAnnotationsByIndex.zoomLevel = this.zoomLevel;
        this.updateAnnotationOffsets();
        DV._.defer(DV._.bind(this.updateAnnotationOffsets, this));
    }, refreshAnnotation: function (anno) {
        var viewer = this.viewer;
        anno.html = this.render(anno);
        DV.jQuery.$('#DV-annotation-' + anno.id).replaceWith(anno.html);
    }, removeAnnotation: function (anno) {
        delete this.byId[anno.id];
        var i = anno.page - 1;
        this.byPage[i] = DV._.without(this.byPage[i], anno);
        this.sortAnnotations();
        DV.jQuery('#DV-annotation-' + anno.id + ', #DV-listAnnotation-' + anno.id).remove();
        this.viewer.api.redraw(true);
        if (DV._.isEmpty(this.byId))this.viewer.open('ViewDocument');
    }, updateAnnotationOffsets: function () {
        this.offsetsAdjustments = [];
        this.offsetAdjustmentSum = 0;
        var documentModel = this.viewer.models.document;
        var annotationsContainer = this.viewer.$('div.DV-allAnnotations');
        var pageAnnotationEls = annotationsContainer.find('.DV-pageNote');
        var pageNoteHeights = this.viewer.models.pages.pageNoteHeights;
        var me = this;
        if (this.viewer.$('div.DV-docViewer').hasClass('DV-viewAnnotations') == false) {
            annotationsContainer.addClass('DV-getHeights');
        }
        var pageAnnos = [];
        DV._.each(DV._.select(this.bySortOrder, function (anno) {
            return anno.type == 'page';
        }), function (anno, i) {
            anno.el = pageAnnotationEls[i];
            pageAnnos[anno.pageNumber] = anno;
        });
        for (var i = 0, len = documentModel.totalPages; i <= len; i++) {
            pageNoteHeights[i] = 0;
            if (pageAnnos[i]) {
                var height = (this.viewer.$(pageAnnos[i].el).height() + this.PAGE_NOTE_FUDGE);
                pageNoteHeights[i - 1] = height;
                this.offsetAdjustmentSum += height;
            }
            this.offsetsAdjustments[i] = this.offsetAdjustmentSum;
        }
        annotationsContainer.removeClass('DV-getHeights');
    }, fireSaveCallbacks: function (anno) {
        DV._.each(this.saveCallbacks, function (c) {
            c(anno);
        });
    }, fireDeleteCallbacks: function (anno) {
        DV._.each(this.deleteCallbacks, function (c) {
            c(anno);
        });
    }, getAnnotations: function (_index) {
        return this.byPage[_index];
    }, getFirstAnnotation: function () {
        return DV._.first(this.bySortOrder);
    }, getNextAnnotation: function (currentId) {
        var anno = this.byId[currentId];
        return this.bySortOrder[DV._.indexOf(this.bySortOrder, anno) + 1];
    }, getPreviousAnnotation: function (currentId) {
        var anno = this.byId[currentId];
        return this.bySortOrder[DV._.indexOf(this.bySortOrder, anno) - 1];
    }, getAnnotation: function (identifier) {
        if (identifier.id)return this.byId[identifier.id];
        if (identifier.index && !identifier.id)throw new Error('looked up an annotation without an id');
        return this.byId[identifier];
    }
};
DV.model.Chapters = function (viewer) {
    this.viewer = viewer;
    this.loadChapters();
};
DV.model.Chapters.prototype = {
    loadChapters: function () {
        var sections = this.viewer.schema.data.sections;
        var chapters = this.chapters = this.viewer.schema.data.chapters = [];
        DV._.each(sections, function (sec) {
            sec.id || (sec.id = DV._.uniqueId());
        });
        var sectionIndex = 0;
        for (var i = 0, l = this.viewer.schema.data.totalPages; i < l; i++) {
            var section = sections[sectionIndex];
            var nextSection = sections[sectionIndex + 1];
            if (nextSection && (i >= (nextSection.page - 1))) {
                sectionIndex += 1;
                section = nextSection;
            }
            if (section && !(section.page > i + 1))chapters[i] = section.id;
        }
    }, getChapterId: function (index) {
        return this.chapters[index];
    }, getChapterPosition: function (chapterId) {
        for (var i = 0, len = this.chapters.length; i < len; i++) {
            if (this.chapters[i] === chapterId) {
                return i;
            }
        }
    }
};
DV.model.Document = function (viewer) {
    this.viewer = viewer;
    this.currentPageIndex = 0;
    this.offsets = [];
    this.baseHeightsPortion = [];
    this.baseHeightsPortionOffsets = [];
    this.paddedOffsets = [];
    this.originalPageText = {};
    this.totalDocumentHeight = 0;
    this.totalPages = 0;
    this.additionalPaddingOnPage = 0;
    this.ZOOM_RANGES = [500, 700, 800, 900, 1000];
    var data = this.viewer.schema.data;
    this.state = data.state;
    this.baseImageURL = data.baseImageURL;
    this.canonicalURL = data.canonicalURL;
    this.additionalPaddingOnPage = data.additionalPaddingOnPage;
    this.pageWidthPadding = data.pageWidthPadding;
    this.totalPages = data.totalPages;
    this.onPageChangeCallbacks = [];
    var zoom = this.zoomLevel = this.viewer.options.zoom || data.zoomLevel;
    if (zoom == 'auto')this.zoomLevel = data.zoomLevel;
    var maxZoom = DV._.last(this.ZOOM_RANGES);
    if (this.zoomLevel > maxZoom)this.zoomLevel = maxZoom;
};
DV.model.Document.prototype = {
    setPageIndex: function (index) {
        this.currentPageIndex = index;
        this.viewer.elements.currentPage.text(this.currentPage());
        this.viewer.helpers.setActiveChapter(this.viewer.models.chapters.getChapterId(index));
        DV._.each(this.onPageChangeCallbacks, function (c) {
            c();
        });
        return index;
    }, currentPage: function () {
        return this.currentPageIndex + 1;
    }, currentIndex: function () {
        return this.currentPageIndex;
    }, nextPage: function () {
        var nextIndex = this.currentIndex() + 1;
        if (nextIndex >= this.totalPages)return this.currentIndex();
        return this.setPageIndex(nextIndex);
    }, previousPage: function () {
        var previousIndex = this.currentIndex() - 1;
        if (previousIndex < 0)return this.currentIndex();
        return this.setPageIndex(previousIndex);
    }, zoom: function (zoomLevel, force) {
        if (this.zoomLevel != zoomLevel || force === true) {
            this.zoomLevel = zoomLevel;
            this.viewer.models.pages.resize(this.zoomLevel);
            this.viewer.models.annotations.renderAnnotations();
            this.computeOffsets();
        }
    }, computeOffsets: function () {
        var annotationModel = this.viewer.models.annotations;
        var totalDocHeight = 0;
        var adjustedOffset = 0;
        var len = this.totalPages;
        var diff = 0;
        var scrollPos = this.viewer.elements.window[0].scrollTop;
        for (var i = 0; i < len; i++) {
            if (annotationModel.offsetsAdjustments[i]) {
                adjustedOffset = annotationModel.offsetsAdjustments[i];
            }
            var pageHeight = this.viewer.models.pages.getPageHeight(i);
            var previousOffset = this.offsets[i] || 0;
            var h = this.offsets[i] = adjustedOffset + totalDocHeight;
            if ((previousOffset !== h) && (h < scrollPos)) {
                var delta = h - previousOffset - diff;
                scrollPos += delta;
                diff += delta;
            }
            this.baseHeightsPortion[i] = Math.round((pageHeight + this.additionalPaddingOnPage) / 3);
            this.baseHeightsPortionOffsets[i] = (i == 0) ? 0 : h - this.baseHeightsPortion[i];
            totalDocHeight += (pageHeight + this.additionalPaddingOnPage);
        }
        totalDocHeight += adjustedOffset;
        if (totalDocHeight != this.totalDocumentHeight) {
            diff = (this.totalDocumentHeight != 0) ? diff : totalDocHeight - this.totalDocumentHeight;
            this.viewer.helpers.setDocHeight(totalDocHeight, diff);
            this.totalDocumentHeight = totalDocHeight;
        }
    }, getOffset: function (_index) {
        return this.offsets[_index];
    }, resetRemovedPages: function () {
        this.viewer.models.removedPages = {};
    }, addPageToRemovedPages: function (page) {
        this.viewer.models.removedPages[page] = true;
    }, removePageFromRemovedPages: function (page) {
        this.viewer.models.removedPages[page] = false;
    }, redrawPages: function () {
        DV._.each(this.viewer.pageSet.pages, function (page) {
            page.drawRemoveOverlay();
        });
        if (this.viewer.thumbnails) {
            this.viewer.thumbnails.render();
        }
    }, redrawReorderedPages: function () {
        if (this.viewer.thumbnails) {
            this.viewer.thumbnails.render();
        }
    }
};
DV.model.Pages = function (viewer) {
    this.viewer = viewer;
    this.averageHeight = 0;
    this.pageHeights = [];
    this.pageNoteHeights = [];
    this.BASE_WIDTH = 700;
    this.BASE_HEIGHT = 906;
    this.SCALE_FACTORS = {'500': 0.714, '700': 1.0, '800': 0.8, '900': 0.9, '1000': 1.0};
    this.DEFAULT_PADDING = 100;
    this.REDUCED_PADDING = 44;
    this.MINI_PADDING = 18;
    this.zoomLevel = this.viewer.models.document.zoomLevel;
    this.baseWidth = this.BASE_WIDTH;
    this.baseHeight = this.BASE_HEIGHT;
    this.width = this.zoomLevel;
    this.height = this.baseHeight * this.zoomFactor();
    this.numPagesLoaded = 0;
};
DV.model.Pages.prototype = {
    imageURL: function (index) {
        var url = this.viewer.schema.document.resources.page.image;
        var size = this.zoomLevel > this.BASE_WIDTH ? 'large' : 'normal';
        var pageNumber = index + 1;
        if (this.viewer.schema.document.resources.page.zeropad)pageNumber = this.zeroPad(pageNumber, 5);
        url = url.replace(/\{size\}/, size);
        url = url.replace(/\{page\}/, pageNumber);
        return url;
    }, zeroPad: function (num, count) {
        var string = num.toString();
        while (string.length < count)string = '0' + string;
        return string;
    }, getPadding: function () {
        if (this.viewer.elements.viewer.hasClass('DV-mini')) {
            return this.MINI_PADDING;
        } else if (this.viewer.options.zoom == 'auto') {
            return this.REDUCED_PADDING;
        } else {
            return this.DEFAULT_PADDING;
        }
    }, zoomFactor: function () {
        return this.zoomLevel / this.BASE_WIDTH;
    }, resize: function (zoomLevel) {
        var padding = this.viewer.models.pages.DEFAULT_PADDING;
        if (zoomLevel) {
            if (zoomLevel == this.zoomLevel)return;
            var previousFactor = this.zoomFactor();
            this.zoomLevel = zoomLevel || this.zoomLevel;
            var scale = this.zoomFactor() / previousFactor;
            this.width = Math.round(this.baseWidth * this.zoomFactor());
            this.height = Math.round(this.height * scale);
            this.averageHeight = Math.round(this.averageHeight * scale);
        }
        this.viewer.elements.sets.width(this.zoomLevel);
        this.viewer.elements.collection.css({width: this.width + padding});
        var minFontSize = 10;
        var fontSize = Math.max(minFontSize, this.zoomLevel * 0.02);
        this.viewer.$('.DV-textContents').css({'font-size': fontSize + 'px'});
    }, updateHeight: function (image, pageIndex) {
        var h = this.getPageHeight(pageIndex);
        var height = image.height * (this.zoomLevel > this.BASE_WIDTH ? 0.7 : 1.0);
        if (image.width < this.baseWidth) {
            height *= (this.baseWidth / image.width);
        }
        this.setPageHeight(pageIndex, height);
        this.averageHeight = ((this.averageHeight * this.numPagesLoaded) + height) / (this.numPagesLoaded + 1);
        this.numPagesLoaded += 1;
        if (h === height)return;
        this.viewer.models.document.computeOffsets();
        this.viewer.pageSet.simpleReflowPages();
        if (!this.viewer.activeAnnotation && (pageIndex < this.viewer.models.document.currentIndex())) {
            var diff = Math.round(height * this.zoomFactor() - h);
            this.viewer.elements.window[0].scrollTop += diff;
        }
    }, setPageHeight: function (pageIndex, pageHeight) {
        this.pageHeights[pageIndex] = Math.round(pageHeight);
    }, getPageHeight: function (pageIndex) {
        var realHeight = this.pageHeights[pageIndex];
        return Math.round(realHeight ? realHeight * this.zoomFactor() : this.height);
    }
};
DV.Schema.events = {
    zoom: function (level) {
        var viewer = this.viewer;
        var continuation = function () {
            viewer.pageSet.zoom({zoomLevel: level});
            var ranges = viewer.models.document.ZOOM_RANGES;
            viewer.dragReporter.sensitivity = ranges[ranges.length - 1] == level ? 1.5 : 1;
            viewer.notifyChangedState();
            return true;
        };
        viewer.confirmStateChange ? viewer.confirmStateChange(continuation) : continuation();
    }, drawPages: function () {
        if (this.viewer.state != 'ViewDocument')return;
        var doc = this.models.document;
        var win = this.elements.window[0];
        var offsets = doc.baseHeightsPortionOffsets;
        var scrollPos = this.viewer.scrollPosition = win.scrollTop;
        var midpoint = scrollPos + (this.viewer.$(win).height() / 3);
        var currentPage = DV._.sortedIndex(offsets, scrollPos);
        var middlePage = DV._.sortedIndex(offsets, midpoint);
        if (offsets[currentPage] == scrollPos)currentPage++ && middlePage++;
        var pageIds = this.helpers.sortPages(middlePage - 1);
        var total = doc.totalPages;
        if (doc.currentPage() != currentPage)doc.setPageIndex(currentPage - 1);
        this.drawPageAt(pageIds, middlePage - 1);
    }, drawPageAt: function (pageIds, index) {
        var first = index == 0;
        var last = index == this.models.document.totalPages - 1;
        if (first)index += 1;
        var pages = [{label: pageIds[0], index: index - 1}, {label: pageIds[1], index: index}, {
            label: pageIds[2],
            index: index + 1
        }];
        if (last)pages.pop();
        pages[first ? 0 : pages.length - 1].currentPage = true;
        this.viewer.pageSet.draw(pages);
    }, check: function () {
        var viewer = this.viewer;
        if (viewer.busy === false) {
            viewer.busy = true;
            for (var i = 0; i < this.viewer.observers.length; i++) {
                this[viewer.observers[i]].call(this);
            }
            viewer.busy = false;
        }
    }, loadText: function (pageIndex, afterLoad) {
        pageIndex = (!pageIndex) ? this.models.document.currentIndex() : parseInt(pageIndex, 10);
        this._previousTextIndex = pageIndex;
        var me = this;
        var processText = function (text) {
            var pageNumber = parseInt(pageIndex, 10) + 1;
            me.viewer.$('.DV-textContents').replaceWith('<pre class="DV-textContents">' + text + '</pre>');
            me.elements.currentPage.text(pageNumber);
            me.elements.textCurrentPage.text('S. ' + (pageNumber));
            me.models.document.setPageIndex(pageIndex);
            me.helpers.setActiveChapter(me.models.chapters.getChapterId(pageIndex));
            if (me.viewer.openEditor == 'editText' && !(pageNumber in me.models.document.originalPageText)) {
                me.models.document.originalPageText[pageNumber] = text;
            }
            if (me.viewer.openEditor == 'editText') {
                me.viewer.$('.DV-textContents').attr('contentEditable', true).addClass('DV-editing');
            }
            if (afterLoad)afterLoad.call(me.helpers);
        };
        if (me.viewer.schema.text[pageIndex]) {
            return processText(me.viewer.schema.text[pageIndex]);
        }
        var handleResponse = DV.jQuery.proxy(function (response) {
            processText(me.viewer.schema.text[pageIndex] = response);
        }, this);
        this.viewer.$('.DV-textContents').text('');
        var textURI = me.viewer.schema.document.resources.page.text.replace('{page}', pageIndex + 1);
        var crossDomain = this.helpers.isCrossDomain(textURI);
        if (crossDomain)textURI += '?callback=?';
        DV.jQuery[crossDomain ? 'getJSON' : 'get'](textURI, {}, handleResponse);
    }, resetTracker: function () {
        this.viewer.activeAnnotation = null;
        this.trackAnnotation.combined = null;
        this.trackAnnotation.h = null;
    }, trackAnnotation: function () {
        var viewer = this.viewer;
        var helpers = this.helpers;
        var scrollPosition = this.elements.window[0].scrollTop;
        if (viewer.activeAnnotation) {
            var annotation = viewer.activeAnnotation;
            var trackAnnotation = this.trackAnnotation;
            if (trackAnnotation.id != annotation.id) {
                trackAnnotation.id = annotation.id;
                helpers.setActiveAnnotationLimits(annotation);
            }
            if (!viewer.activeAnnotation.annotationEl.hasClass('DV-editing') && (scrollPosition > (trackAnnotation.h) || scrollPosition < trackAnnotation.combined)) {
                annotation.hide(true);
                viewer.pageSet.setActiveAnnotation(null);
                viewer.activeAnnotation = null;
                trackAnnotation.h = null;
                trackAnnotation.id = null;
                trackAnnotation.combined = null;
            }
        } else {
            viewer.pageSet.setActiveAnnotation(null);
            viewer.activeAnnotation = null;
            trackAnnotation.h = null;
            trackAnnotation.id = null;
            trackAnnotation.combined = null;
            helpers.removeObserver('trackAnnotation');
        }
    }
};
DV.Schema.events.ViewAnnotation = {
    next: function (e) {
        var viewer = this.viewer;
        var activeAnnotationId = viewer.activeAnnotationId;
        var annotationsModel = this.models.annotations;
        var nextAnnotation = (activeAnnotationId === null) ? annotationsModel.getFirstAnnotation() : annotationsModel.getNextAnnotation(activeAnnotationId);
        if (!nextAnnotation) {
            return false;
        }
        viewer.pageSet.showAnnotation(nextAnnotation);
        this.helpers.setAnnotationPosition(nextAnnotation.position);
    }, previous: function (e) {
        var viewer = this.viewer;
        var activeAnnotationId = viewer.activeAnnotationId;
        var annotationsModel = this.models.annotations;
        var previousAnnotation = (!activeAnnotationId) ? annotationsModel.getFirstAnnotation() : annotationsModel.getPreviousAnnotation(activeAnnotationId);
        if (!previousAnnotation) {
            return false;
        }
        viewer.pageSet.showAnnotation(previousAnnotation);
        this.helpers.setAnnotationPosition(previousAnnotation.position);
    }, search: function (e) {
        e.preventDefault();
        this.viewer.open('ViewSearch');
        return false;
    }
};
DV.Schema.events.ViewDocument = {
    next: function () {
        var nextPage = this.models.document.nextPage();
        this.helpers.jump(nextPage);
    }, previous: function (e) {
        var previousPage = this.models.document.previousPage();
        this.helpers.jump(previousPage);
    }, search: function (e) {
        e.preventDefault();
        this.viewer.open('ViewSearch');
        return false;
    }
}
DV.Schema.events.ViewSearch = {
    next: function (e) {
        var nextPage = this.models.document.nextPage();
        this.loadText(nextPage);
        this.viewer.open('ViewText');
    }, previous: function (e) {
        var previousPage = this.models.document.previousPage();
        this.loadText(previousPage);
        this.viewer.open('ViewText');
    }, search: function (e) {
        e.preventDefault();
        this.helpers.getSearchResponse(this.elements.searchInput.val());
        return false;
    }
};
DV.Schema.events.ViewText = {
    next: function (e) {
        var nextPage = this.models.document.nextPage();
        this.loadText(nextPage);
    }, previous: function (e) {
        var previousPage = this.models.document.previousPage();
        this.loadText(previousPage);
    }, search: function (e) {
        e.preventDefault();
        this.viewer.open('ViewSearch');
        return false;
    }
};
DV.Schema.events.ViewThumbnails = {
    next: function () {
        var nextPage = this.models.document.nextPage();
        this.helpers.jump(nextPage);
    }, previous: function (e) {
        var previousPage = this.models.document.previousPage();
        this.helpers.jump(previousPage);
    }, search: function (e) {
        e.preventDefault();
        this.viewer.open('ViewSearch');
        return false;
    }
};
DV._.extend(DV.Schema.events, {
    handleHashChangeViewDocumentPage: function (page) {
        var pageIndex = parseInt(page, 10) - 1;
        if (this.viewer.state === 'ViewDocument') {
            this.viewer.pageSet.cleanUp();
            this.helpers.jump(pageIndex);
        } else {
            this.models.document.setPageIndex(pageIndex);
            this.viewer.open('ViewDocument');
        }
    }, handleHashChangeLegacyViewDocumentPage: function (page) {
        var pageIndex = parseInt(page, 10) - 1;
        this.handleHashChangeViewDocumentPage(page);
    }, handleHashChangeViewDocumentAnnotation: function (page, annotation) {
        var pageIndex = parseInt(page, 10) - 1;
        var annotation = parseInt(annotation, 10);
        if (this.viewer.state === 'ViewDocument') {
            this.viewer.pageSet.showAnnotation(this.viewer.models.annotations.byId[annotation]);
        } else {
            this.models.document.setPageIndex(pageIndex);
            this.viewer.pageSet.setActiveAnnotation(annotation);
            this.viewer.openingAnnotationFromHash = true;
            this.viewer.open('ViewDocument');
        }
    }, handleHashChangeViewAnnotationAnnotation: function (annotation) {
        var annotation = parseInt(annotation, 10);
        var viewer = this.viewer;
        if (viewer.state === 'ViewAnnotation') {
            viewer.pageSet.showAnnotation(this.viewer.models.annotations.byId[annotation]);
        } else {
            viewer.activeAnnotationId = annotation;
            this.viewer.open('ViewAnnotation');
        }
    }, handleHashChangeDefault: function () {
        this.viewer.pageSet.cleanUp();
        this.models.document.setPageIndex(0);
        if (this.viewer.state === 'ViewDocument') {
            this.helpers.jump(0);
        } else {
            this.viewer.open('ViewDocument');
        }
    }, handleHashChangeViewText: function (page) {
        var pageIndex = parseInt(page, 10) - 1;
        if (this.viewer.state === 'ViewText') {
            this.events.loadText(pageIndex);
        } else {
            this.models.document.setPageIndex(pageIndex);
            this.viewer.open('ViewText');
        }
    }, handleHashChangeViewPages: function () {
        if (this.viewer.state == 'ViewThumbnails')return;
        this.viewer.open('ViewThumbnails');
    }, handleHashChangeViewSearchRequest: function (page, query) {
        var pageIndex = parseInt(page, 10) - 1;
        this.elements.searchInput.val(decodeURIComponent(query));
        if (this.viewer.state !== 'ViewSearch') {
            this.models.document.setPageIndex(pageIndex);
        }
        this.viewer.open('ViewSearch');
    }, handleHashChangeViewEntity: function (page, name, offset, length) {
        page = parseInt(page, 10) - 1;
        name = decodeURIComponent(name);
        this.elements.searchInput.val(name);
        this.models.document.setPageIndex(page);
        this.states.ViewEntity(name, parseInt(offset, 10), parseInt(length, 10));
    }
});
DV._.extend(DV.Schema.events, {
    handleNavigation: function (e) {
        var el = this.viewer.$(e.target);
        var triggerEl = el.closest('.DV-trigger');
        var noteEl = el.closest('.DV-annotationMarker');
        var chapterEl = el.closest('.DV-chapter');
        if (!triggerEl.length)return;
        if (el.hasClass('DV-expander')) {
            return chapterEl.toggleClass('DV-collapsed');
        } else if (noteEl.length) {
            var aid = noteEl[0].id.replace('DV-annotationMarker-', '');
            var annotation = this.models.annotations.getAnnotation(aid);
            var pageNumber = parseInt(annotation.index, 10) + 1;
            if (this.viewer.state === 'ViewText') {
                this.loadText(annotation.index);
            } else {
                if (this.viewer.state === 'ViewThumbnails') {
                    this.viewer.open('ViewDocument');
                }
                this.viewer.pageSet.showAnnotation(annotation);
            }
        } else if (chapterEl.length) {
            chapterEl.removeClass('DV-collapsed');
            var cid = parseInt(chapterEl[0].id.replace('DV-chapter-', ''), 10);
            var chapterIndex = parseInt(this.models.chapters.getChapterPosition(cid), 10);
            var pageNumber = parseInt(chapterIndex, 10) + 1;
            if (this.viewer.state === 'ViewText') {
                this.loadText(chapterIndex);
            } else if (this.viewer.state === 'ViewDocument' || this.viewer.state === 'ViewThumbnails') {
                this.helpers.jump(chapterIndex);
                if (this.viewer.state === 'ViewThumbnails') {
                    this.viewer.open('ViewDocument');
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
});
DV.Schema.helpers = {
    HOST_EXTRACTOR: (/https?:\/\/([^\/]+)\//),
    RESPONSIVE_MIN_SIDEBAR_WIDTH: 900,
    RESPONSIVE_DEFAULT_OFFSET: 100,
    annotationClassName: '.DV-annotation',
    bindEvents: function (context) {
        var boundZoom = this.events.compile('zoom');
        var doc = context.models.document;
        var value = DV._.indexOf(doc.ZOOM_RANGES, doc.zoomLevel);
        var viewer = this.viewer;
        viewer.slider = viewer.$('.DV-zoomBox').slider({
            step: 1, min: 0, max: 4, value: value, slide: function (el, d) {
                boundZoom(context.models.document.ZOOM_RANGES[parseInt(d.value, 10)]);
            }, change: function (el, d) {
                boundZoom(context.models.document.ZOOM_RANGES[parseInt(d.value, 10)]);
            }
        });
        var history = viewer.history;
        var compiled = viewer.compiled;
        compiled.next = this.events.compile('next');
        compiled.previous = this.events.compile('previous');
        var states = context.states;
        viewer.elements.viewer.delegate('.DV-next', 'click', compiled.next);
        viewer.elements.viewer.delegate('.DV-previous', 'click', compiled.previous);
        viewer.$('.DV-annotationView').delegate('.DV-trigger', 'click', function (e) {
            e.preventDefault();
            context.open('ViewAnnotation');
        });
        viewer.$('.DV-documentView').delegate('.DV-trigger', 'click', function (e) {
            context.open('ViewDocument');
        });
        viewer.$('.DV-thumbnailsView').delegate('.DV-trigger', 'click', function (e) {
            context.open('ViewThumbnails');
        });
        viewer.$('.DV-textView').delegate('.DV-trigger', 'click', function (e) {
            context.open('ViewText');
        });
        viewer.$('.DV-allAnnotations').delegate('.DV-annotationGoto .DV-trigger', 'click', DV.jQuery.proxy(this.gotoPage, this));
        viewer.$('.DV-allAnnotations').delegate('.DV-annotationTitle', 'click', DV.jQuery.proxy(this.gotoPage, this));
        viewer.$('.DV-pdfDownload').delegate('.DV-trigger', 'click', function (e) {
            window.open(viewer.schema.document.resources.pdf, '_blank');
        });
        viewer.$('.DV-vollBild').delegate('.DV-trigger', 'click', function (e) {
            var elem = document.getElementById('document-viewer');
            DV.jQuery('#document-viewer').addClass('DIV-fullscreen');
            DV.jQuery('.DV-pdfDownload').children().css({'padding-bottom': '9px', 'padding-top': '8px'});
            launchIntoFullscreen();
            viewer.$('.DV-docViewer').addClass('DIV-fullscreen');
            function launchIntoFullscreen() {
                if (document.documentElement.requestFullscreen) {
                    if (document.fullscreenElement) {
                        document.cancelFullScreen();
                        DV.jQuery('#document-viewer').removeClass('DIV-fullscreen');
                        DV.jQuery('.DV-pdfDownload').children().css({'padding-bottom': '8px', 'padding-top': '5px'});
                    }
                    else {
                        elem.requestFullscreen();
                    }
                } else if (document.documentElement.mozRequestFullScreen) {
                    if (document.mozFullscreenElement) {
                        document.mozCancelFullScreen();
                        DV.jQuery('#document-viewer').removeClass('DIV-fullscreen');
                        DV.jQuery('.DV-pdfDownload').children().css({'padding-bottom': '8px', 'padding-top': '5px'});
                    }
                    else {
                        elem.mozRequestFullScreen();
                    }
                } else if (document.documentElement.webkitRequestFullscreen) {
                    if (document.webkitFullscreenElement) {
                        document.webkitCancelFullScreen();
                        DV.jQuery('#document-viewer').removeClass('DIV-fullscreen');
                        DV.jQuery('.DV-pdfDownload').children().css({'padding-bottom': '8px', 'padding-top': '5px'});
                    }
                    else {
                        elem.webkitRequestFullScreen();
                    }
                } else if (document.documentElement.msRequestFullscreen) {
                    if (document.msFullscreenElement) {
                        document.msCancelFullScreen();
                        DV.jQuery('#document-viewer').removeClass('DIV-fullscreen');
                        DV.jQuery('.DV-vollBild').find('DV-trigger').css({
                            'padding-bottom': '7px',
                            'padding-top': '6px'
                        });
                        DV.jQuery('.DV-pdfDownload').children().css({'padding-bottom': '8px', 'padding-top': '5px'});
                    }
                    else {
                        elem.msRequestFullscreen();
                    }
                }
                document.addEventListener("fullscreenchange", function () {
                    if (!document.webkitFullscreenElement) {
                        DV.jQuery('#document-viewer').removeClass('DIV-fullscreen');
                        DV.jQuery('.DV-pdfDownload').children().css({'padding-bottom': '8px', 'padding-top': '5px'});
                    }
                });
                document.addEventListener("webkitfullscreenchange", function () {
                    if (!document.webkitFullscreenElement) {
                        DV.jQuery('#document-viewer').removeClass('DIV-fullscreen');
                        DV.jQuery('.DV-pdfDownload').children().css({'padding-bottom': '8px', 'padding-top': '5px'});
                    }
                });
                document.addEventListener("mozfullscreenchange", function () {
                    if (!document.webkitFullscreenElement) {
                        DV.jQuery('#document-viewer').removeClass('DIV-fullscreen');
                        DV.jQuery('.DV-pdfDownload').children().css({'padding-bottom': '8px', 'padding-top': '5px'});
                    }
                });
                document.addEventListener("MSFullscreenChange", function () {
                    if (!document.webkitFullscreenElement) {
                        DV.jQuery('#document-viewer').removeClass('DIV-fullscreen');
                        DV.jQuery('.DV-pdfDownload').children().css({'padding-bottom': '8px', 'padding-top': '5px'});
                    }
                });
            }
        });
        viewer.$('form.DV-searchDocument').submit(this.events.compile('search'));
        viewer.$('.DV-searchBar').delegate('.DV-closeSearch', 'click', function (e) {
            e.preventDefault();
            context.open('ViewText');
        });
        viewer.$('.DV-searchBox').delegate('.DV-searchInput-cancel', 'click', DV.jQuery.proxy(this.clearSearch, this));
        viewer.$('.DV-searchResults').delegate('span.DV-resultPrevious', 'click', DV.jQuery.proxy(this.highlightPreviousMatch, this));
        viewer.$('.DV-searchResults').delegate('span.DV-resultNext', 'click', DV.jQuery.proxy(this.highlightNextMatch, this));
        viewer.$('.DV-trigger').bind('selectstart', function () {
            return false;
        });
        this.elements.viewer.delegate('.DV-fullscreen', 'click', DV._.bind(this.openFullScreen, this));
        var boundToggle = DV.jQuery.proxy(this.annotationBridgeToggle, this);
        var collection = this.elements.collection;
        collection.delegate('.DV-annotationTab', 'click', boundToggle);
        collection.delegate('.DV-annotationRegion', 'click', DV.jQuery.proxy(this.annotationBridgeShow, this));
        collection.delegate('.DV-annotationNext', 'click', DV.jQuery.proxy(this.annotationBridgeNext, this));
        collection.delegate('.DV-annotationPrevious', 'click', DV.jQuery.proxy(this.annotationBridgePrevious, this));
        collection.delegate('.DV-showEdit', 'click', DV.jQuery.proxy(this.showAnnotationEdit, this));
        collection.delegate('.DV-cancelEdit', 'click', DV.jQuery.proxy(this.cancelAnnotationEdit, this));
        collection.delegate('.DV-saveAnnotation', 'click', DV.jQuery.proxy(this.saveAnnotation, this));
        collection.delegate('.DV-saveAnnotationDraft', 'click', DV.jQuery.proxy(this.saveAnnotation, this));
        collection.delegate('.DV-deleteAnnotation', 'click', DV.jQuery.proxy(this.deleteAnnotation, this));
        collection.delegate('.DV-pageNumber', 'click', DV._.bind(this.permalinkPage, this, 'document'));
        collection.delegate('.DV-textCurrentPage', 'click', DV._.bind(this.permalinkPage, this, 'text'));
        collection.delegate('.DV-permalink', 'click', DV._.bind(this.permalinkAnnotation, this));
        viewer.$('.DV-thumbnails').delegate('.DV-thumbnail-page', 'click', function (e) {
            var $thumbnail = viewer.$(e.currentTarget);
            if (!viewer.openEditor) {
                var pageIndex = $thumbnail.closest('.DV-thumbnail').attr('data-pageNumber') - 1;
                viewer.models.document.setPageIndex(pageIndex);
                viewer.open('ViewDocument');
            }
        });
        DV._.bindAll(this, 'touchStart', 'touchMove', 'touchEnd');
        this.elements.window[0].ontouchstart = this.touchStart;
        this.elements.window[0].ontouchmove = this.touchMove;
        this.elements.window[0].ontouchend = this.touchEnd;
        this.elements.well[0].ontouchstart = this.touchStart;
        this.elements.well[0].ontouchmove = this.touchMove;
        this.elements.well[0].ontouchend = this.touchEnd;
        viewer.$('.DV-descriptionToggle').live('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            viewer.$('.DV-descriptionText').toggle();
            viewer.$('.DV-descriptionToggle').toggleClass('DV-showDescription');
        });
        var cleanUp = DV.jQuery.proxy(viewer.pageSet.cleanUp, this);
        this.elements.window.live('mousedown', function (e) {
            var el = viewer.$(e.target);
            if (el.parents().is('.DV-annotation') || el.is('.DV-annotation'))return true;
            if (context.elements.window.hasClass('DV-coverVisible')) {
                if ((el.width() - parseInt(e.clientX, 10)) >= 15) {
                    cleanUp();
                }
            }
        });
        var docId = viewer.schema.document.id;
        if (DV.jQuery.browser.msie == true) {
            this.elements.browserDocument.bind('focus.' + docId, DV.jQuery.proxy(this.focusWindow, this));
            this.elements.browserDocument.bind('focusout.' + docId, DV.jQuery.proxy(this.focusOut, this));
        } else {
            this.elements.browserWindow.bind('focus.' + docId, DV.jQuery.proxy(this.focusWindow, this));
            this.elements.browserWindow.bind('blur.' + docId, DV.jQuery.proxy(this.blurWindow, this));
        }
        this.elements.window.bind('scroll.' + docId, DV.jQuery.proxy(this.focusWindow, this));
        this.elements.coverPages.live('mousedown', cleanUp);
        viewer.acceptInput = this.elements.currentPage.acceptInput({changeCallBack: DV.jQuery.proxy(this.acceptInputCallBack, this)});
    },
    unbindEvents: function () {
        var viewer = this.viewer;
        var docId = viewer.schema.document.id;
        if (DV.jQuery.browser.msie == true) {
            this.elements.browserDocument.unbind('focus.' + docId);
            this.elements.browserDocument.unbind('focusout.' + docId);
        } else {
            viewer.helpers.elements.browserWindow.unbind('focus.' + docId);
            viewer.helpers.elements.browserWindow.unbind('blur.' + docId);
        }
        viewer.helpers.elements.browserWindow.unbind('scroll.' + docId);
        DV._.each(viewer.observers, function (obs) {
            viewer.helpers.removeObserver(obs);
        });
    },
    ensureAnnotationImages: function () {
        this.viewer.$(".DV-img[data-src]").each(function () {
            var el = DV.jQuery(this);
            el.attr('src', el.attr('data-src'));
        });
    },
    startCheckTimer: function () {
        var _t = this.viewer;
        var _check = function () {
            _t.events.check();
        };
        this.viewer.checkTimer = setInterval(_check, 100);
    },
    stopCheckTimer: function () {
        clearInterval(this.viewer.checkTimer);
    },
    blurWindow: function () {
        if (this.viewer.isFocus === true) {
            this.viewer.isFocus = false;
            this.stopCheckTimer();
        } else {
            return;
        }
    },
    focusOut: function () {
        if (this.viewer.activeElement != document.activeElement) {
            this.viewer.activeElement = document.activeElement;
            this.viewer.isFocus = true;
        } else {
            this.viewer.isFocus = false;
            this.viewer.helpers.stopCheckTimer();
            return;
        }
    },
    focusWindow: function () {
        if (this.viewer.isFocus === true) {
            return;
        } else {
            this.viewer.isFocus = true;
            this.startCheckTimer();
        }
    },
    touchStart: function (e) {
        e.stopPropagation();
        e.preventDefault();
        var touch = e.changedTouches[0];
        this._moved = false;
        this._touchX = touch.pageX;
        this._touchY = touch.pageY;
    },
    touchMove: function (e) {
        var el = e.currentTarget;
        var touch = e.changedTouches[0];
        var xDiff = this._touchX - touch.pageX;
        var yDiff = this._touchY - touch.pageY;
        el.scrollLeft += xDiff;
        el.scrollTop += yDiff;
        this._touchX -= xDiff;
        this._touchY -= yDiff;
        if (yDiff != 0 || xDiff != 0)this._moved = true;
    },
    touchEnd: function (e) {
        if (!this._moved) {
            var touch = e.changedTouches[0];
            var target = touch.target;
            var fakeClick = document.createEvent('MouseEvent');
            while (target.nodeType !== 1)target = target.parentNode;
            fakeClick.initMouseEvent('click', true, true, touch.view, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
            target.dispatchEvent(fakeClick);
        }
        this._moved = false;
    },
    permalinkPage: function (mode, e) {
        if (mode == 'text') {
            var number = this.viewer.models.document.currentPage();
        } else {
            var pageId = this.viewer.$(e.target).closest('.DV-set').attr('data-id');
            var page = this.viewer.pageSet.pages[pageId];
            var number = page.pageNumber;
            this.jump(page.index);
        }
        this.viewer.history.save(mode + '/p' + number);
    },
    permalinkAnnotation: function (e) {
        var id = this.viewer.$(e.target).closest('.DV-annotation').attr('data-id');
        var anno = this.viewer.models.annotations.getAnnotation(id);
        var sid = anno.server_id || anno.id;
        if (this.viewer.state == 'ViewDocument') {
            this.viewer.pageSet.showAnnotation(anno);
            this.viewer.history.save('document/p' + anno.pageNumber + '/a' + sid);
        } else {
            this.viewer.history.save('annotation/a' + sid);
        }
    },
    setDocHeight: function (height, diff) {
        this.elements.bar.css('height', height);
        this.elements.window[0].scrollTop += diff;
    },
    getWindowDimensions: function () {
        var d = {
            height: window.innerHeight ? window.innerHeight : this.elements.browserWindow.height(),
            width: this.elements.browserWindow.width()
        };
        return d;
    },
    isCrossDomain: function (url) {
        var match = url.match(this.HOST_EXTRACTOR);
        return match && (match[1] != window.location.host);
    },
    resetScrollState: function () {
        this.elements.window.scrollTop(0);
    },
    gotoPage: function (e) {
        e.preventDefault();
        var aid = this.viewer.$(e.target).parents('.DV-annotation').attr('rel').replace('aid-', '');
        var annotation = this.models.annotations.getAnnotation(aid);
        var viewer = this.viewer;
        if (viewer.state !== 'ViewDocument') {
            this.models.document.setPageIndex(annotation.index);
            viewer.open('ViewDocument');
        }
    },
    openFullScreen: function () {
        var doc = this.viewer.schema.document;
        var url = doc.canonicalURL.replace(/#\S+$/, "");
        var currentPage = this.models.document.currentPage();
        switch (this.viewer.state) {
            case'ViewAnnotation':
                url += '#annotation/a' + this.viewer.activeAnnotationId;
                break;
            case'ViewDocument':
                url += '#document/p' + currentPage;
                break;
            case'ViewSearch':
                url += '#search/p' + currentPage + '/' + encodeURIComponent(this.elements.searchInput.val());
                break;
            case'ViewText':
                url += '#text/p' + currentPage;
                break;
            case'ViewThumbnails':
                url += '#pages/p' + currentPage;
                break;
        }
        window.open(url, "documentviewer", "toolbar=no,resizable=yes,scrollbars=no,status=no");
    },
    sortPages: function (pageIndex) {
        if (pageIndex == 0 || pageIndex % 3 == 1)return ['p0', 'p1', 'p2'];
        if (pageIndex % 3 == 2)return ['p1', 'p2', 'p0'];
        if (pageIndex % 3 == 0)return ['p2', 'p0', 'p1'];
    },
    addObserver: function (observerName) {
        this.removeObserver(observerName);
        this.viewer.observers.push(observerName);
    },
    removeObserver: function (observerName) {
        var observers = this.viewer.observers;
        for (var i = 0, len = observers.length; i < len; i++) {
            if (observerName === observers[i]) {
                observers.splice(i, 1);
            }
        }
    },
    toggleContent: function (toggleClassName) {
        this.elements.viewer.removeClass('DV-viewText DV-viewSearch DV-viewDocument DV-viewAnnotations DV-viewThumbnails').addClass('DV-' + toggleClassName);
    },
    jump: function (pageIndex, modifier, forceRedraw) {
        modifier = (modifier) ? parseInt(modifier, 10) : 0;
        var position = this.models.document.getOffset(parseInt(pageIndex, 10)) + modifier;
        this.elements.window[0].scrollTop = position;
        this.models.document.setPageIndex(pageIndex);
        if (forceRedraw)this.viewer.pageSet.redraw(true);
        if (this.viewer.state === 'ViewThumbnails') {
            this.viewer.thumbnails.highlightCurrentPage();
        }
    },
    shift: function (argHash) {
        var windowEl = this.elements.window;
        var scrollTopShift = windowEl.scrollTop() + argHash.deltaY;
        var scrollLeftShift = windowEl.scrollLeft() + argHash.deltaX;
        windowEl.scrollTop(scrollTopShift);
        windowEl.scrollLeft(scrollLeftShift);
    },
    getAppState: function () {
        var docModel = this.models.document;
        var currentPage = (docModel.currentIndex() == 0) ? 1 : docModel.currentPage();
        return {page: currentPage, zoom: docModel.zoomLevel, view: this.viewer.state};
    },
    constructPages: function () {
        var pages = [];
        var totalPagesToCreate = (this.viewer.schema.data.totalPages < 3) ? this.viewer.schema.data.totalPages : 3;
        var height = this.models.pages.height;
        for (var i = 0; i < totalPagesToCreate; i++) {
            pages.push(JST.pages({pageNumber: i + 1, pageIndex: i, pageImageSource: null, baseHeight: height}));
        }
        return pages.join('');
    },
    positionViewer: function () {
        var offset = this.elements.viewer.position();
        this.elements.viewer.css({
            position: 'absolute',
            top: offset.top,
            bottom: 0,
            left: offset.left,
            right: offset.left
        });
    },
    unsupportedBrowser: function () {
        var browser = DV.jQuery.browser;
        if (!(browser.msie && parseFloat(browser.version, 10) <= 6.0))return false;
        DV.jQuery(this.viewer.options.container).html(JST.unsupported({viewer: this.viewer}));
        return true;
    },
    registerHashChangeEvents: function () {
        var events = this.events;
        var history = this.viewer.history;
        history.defaultCallback = DV._.bind(events.handleHashChangeDefault, this.events);
        history.register(/document\/p(\d*)$/, DV._.bind(events.handleHashChangeViewDocumentPage, this.events));
        history.register(/p(\d*)$/, DV._.bind(events.handleHashChangeLegacyViewDocumentPage, this.events));
        history.register(/p=(\d*)$/, DV._.bind(events.handleHashChangeLegacyViewDocumentPage, this.events));
        history.register(/document\/p(\d*)\/a(\d*)$/, DV._.bind(events.handleHashChangeViewDocumentAnnotation, this.events));
        history.register(/annotation\/a(\d*)$/, DV._.bind(events.handleHashChangeViewAnnotationAnnotation, this.events));
        history.register(/pages$/, DV._.bind(events.handleHashChangeViewPages, events));
        history.register(/text\/p(\d*)$/, DV._.bind(events.handleHashChangeViewText, this.events));
        history.register(/entity\/p(\d*)\/(.*)\/(\d+):(\d+)$/, DV._.bind(events.handleHashChangeViewEntity, this.events));
        history.register(/search\/p(\d*)\/(.*)$/, DV._.bind(events.handleHashChangeViewSearchRequest, this.events));
    },
    autoZoomPage: function () {
        var windowWidth = this.elements.window.outerWidth(true);
        var zoom;
        if (this.viewer.options.zoom == 'auto') {
            zoom = Math.min(700, windowWidth - (this.viewer.models.pages.getPadding() * 2));
        } else {
            zoom = this.viewer.options.zoom;
        }
        var ranges = [];
        if (zoom <= 500) {
            var medium = 700;
            var smallest = zoom;
            var small = (smallest + medium) / 2;
            ranges = [smallest, small, medium, 850, 1000];
        } else if (zoom <= 750) {
            var small = zoom;
            var smallest = 0.66 * small;
            var medium = ((1000 - 700) / 3) + small;
            var large = ((1000 - 700) / 3) * 2 + small;
            ranges = [smallest, small, medium, large, 1000];
        } else if (750 < zoom && zoom <= 850) {
            var small = 700;
            var largest = 1000;
            var medium = zoom;
            var smallest = 0.66 * medium;
            var large = ((largest - medium) / 2) + medium;
            ranges = [smallest, small, medium, large, largest];
        } else if (850 < zoom && zoom < 1000) {
            var large = zoom;
            var smallest = 0.66 * large;
            var small = 700;
            var medium = ((large - small) / 2) + small;
            ranges = [smallest, small, medium, large, 1000];
        } else if (zoom >= 1000) {
            zoom = 1000;
            ranges = this.viewer.models.document.ZOOM_RANGES;
        }
        this.viewer.models.document.ZOOM_RANGES = ranges;
        this.viewer.slider.slider({'value': parseInt(DV._.indexOf(ranges, zoom), 10)});
        this.events.zoom(zoom);
    },
    responsiveRedraw: function () {
        var width = this.viewer.elements.viewer.width();
        if (width != this._prevWidth) {
            if (this.viewer.options.sidebar !== false) {
                this.viewer.options.sidebarVisible = width >= this.viewer.helpers.RESPONSIVE_MIN_SIDEBAR_WIDTH;
            }
            this.viewer.api.redraw(true);
            this._prevWidth = width;
        }
    },
    handleInitialState: function () {
        var initialRouteMatch = this.viewer.history.loadURL(true);
        if (!initialRouteMatch) {
            var opts = this.viewer.options;
            this.viewer.open('ViewDocument');
            if (opts.note) {
                this.viewer.pageSet.showAnnotation(this.viewer.models.annotations.byId[opts.note]);
            } else if (opts.page) {
                this.jump(opts.page - 1);
            }
        }
    }
};
DV._.extend(DV.Schema.helpers, {
    getAnnotationModel: function (annoEl) {
        var annoId = parseInt(annoEl.attr('rel').match(/\d+/), 10);
        return this.models.annotations.getAnnotation(annoId);
    }, getAnnotationObject: function (annotation) {
        var annotation = this.viewer.$(annotation);
        var annotationId = annotation.attr('id').replace(/DV\-annotation\-|DV\-listAnnotation\-/, '');
        var pageId = annotation.closest('div.DV-set').attr('data-id');
        for (var i = 0; (annotationObject = this.viewer.pageSet.pages[pageId].annotations[i]); i++) {
            if (annotationObject.id == annotationId) {
                annotation = null;
                return annotationObject;
            }
        }
        return false;
    }, annotationBridgeToggle: function (e) {
        e.preventDefault();
        var annotationObject = this.getAnnotationObject(this.viewer.$(e.target).closest(this.annotationClassName));
        annotationObject.toggle();
    }, annotationBridgeShow: function (e) {
        e.preventDefault();
        var annotationObject = this.getAnnotationObject(this.viewer.$(e.target).closest(this.annotationClassName));
        annotationObject.show();
    }, annotationBridgeHide: function (e) {
        e.preventDefault();
        var annotationObject = this.getAnnotationObject(this.viewer.$(e.target).closest(this.annotationClassName));
        annotationObject.hide(true);
    }, annotationBridgeNext: function (e) {
        e.preventDefault();
        var annotationObject = this.getAnnotationObject(this.viewer.$(e.target).closest(this.annotationClassName));
        annotationObject.next();
    }, annotationBridgePrevious: function (e) {
        e.preventDefault();
        var annotationObject = this.getAnnotationObject(this.viewer.$(e.target).closest(this.annotationClassName));
        annotationObject.previous();
    }, setAnnotationPosition: function (_position) {
        this.elements.currentPage.text(_position);
    }, setActiveAnnotationLimits: function (annotation) {
        var annotation = (annotation) ? annotation : this.viewer.activeAnnotation;
        if (!annotation || annotation == null) {
            return;
        }
        var elements = this.elements;
        var aPage = annotation.page;
        var aEl = annotation.annotationEl;
        var aPosTop = annotation.position.top * this.models.pages.zoomFactor();
        var _trackAnnotation = this.events.trackAnnotation;
        if (annotation.type === 'page') {
            _trackAnnotation.h = aEl.outerHeight() + aPage.getOffset();
            _trackAnnotation.combined = (aPage.getOffset()) - elements.window.height();
        } else {
            _trackAnnotation.h = aEl.height() + aPosTop - 20 + aPage.getOffset() + aPage.getPageNoteHeight();
            _trackAnnotation.combined = (aPosTop - 20 + aPage.getOffset() + aPage.getPageNoteHeight()) - elements.window.height();
        }
    }
});
DV._.extend(DV.Schema.helpers, {
    showAnnotations: function () {
        if (this.viewer.options.showAnnotations === false)return false;
        return DV._.size(this.models.annotations.byId) > 0;
    }, renderViewer: function () {
        var doc = this.viewer.schema.document;
        var pagesHTML = this.constructPages();
        var description = (doc.description) ? doc.description : null;
        var storyURL = doc.resources.related_article;
        var options = this.viewer.options;
        var headerHTML = JST.header({options: options, id: doc.id, story_url: storyURL, title: doc.title || ''});
        var footerHTML = JST.footer({options: {}});
        var pdfURL = doc.resources.pdf;
        pdfURL = pdfURL && options.pdf !== false ? '<a target="_blank" href="' + pdfURL + '">Original-Dokument (PDF) &raquo;</a>' : '';
        var contribs = doc.contributor && doc.contributor_organization && ('' + doc.contributor + ', ' + doc.contributor_organization);
        var showAnnotations = this.showAnnotations();
        var printNotesURL = (showAnnotations) && doc.resources.print_annotations;
        var viewerOptions = {
            options: options,
            pages: pagesHTML,
            header: headerHTML,
            footer: footerHTML,
            pdf_url: pdfURL,
            contributors: contribs,
            story_url: storyURL,
            print_notes_url: printNotesURL,
            descriptionContainer: JST.descriptionContainer({description: description}),
            autoZoom: options.zoom == 'auto',
            mini: false
        };
        if (options.responsive) {
            if (!options.height) {
                var winHeight = DV.jQuery(window).height();
                var toSubtract = options.responsiveOffset == null ? this.viewer.helpers.RESPONSIVE_DEFAULT_OFFSET : options.responsiveOffset;
                options.height = winHeight - toSubtract;
            }
        }
        var width = options.width;
        var height = options.height;
        if (width && height && !options.responsive) {
            if (width < 500) {
                options.mini = true;
                viewerOptions.mini = true;
            }
            DV.jQuery(options.container).css({position: 'relative', width: options.width, height: options.height});
        }
        if (options.responsive) {
            var container = DV.jQuery(options.container);
            if (this.viewer.options.sidebar !== false) {
                this.viewer.options.sidebarVisible = (container.width() - 2) >= this.viewer.helpers.RESPONSIVE_MIN_SIDEBAR_WIDTH;
            }
            container.css({position: 'relative', height: options.height});
            var viewer = this.viewer;
            DV.jQuery(window).resize(function () {
                viewer.helpers.responsiveRedraw();
            });
        }
        var container = this.viewer.options.container;
        var containerEl = DV.jQuery(container);
        if (!containerEl.length)throw"Document Viewer container element not found: " + container;
        containerEl.html(JST.viewer(viewerOptions));
    }, displayNavigation: function () {
        var doc = this.viewer.schema.document;
        var missing = (!doc.description && !DV._.size(this.viewer.schema.data.annotationsById) && !this.viewer.schema.data.sections.length);
        this.viewer.$('.DV-supplemental').toggleClass('DV-noNavigation', missing);
    }, renderSpecificPageCss: function () {
        var classes = [];
        for (var i = 1, l = this.models.document.totalPages; i <= l; i++) {
            classes.push('.DV-page-' + i + ' .DV-pageSpecific-' + i);
        }
        var css = classes.join(', ') + ' { display: block; }';
        var stylesheet = '<style type="text/css" media="all">\n' + css + '\n</style>';
        DV.jQuery("head").append(stylesheet);
    }, renderNavigation: function () {
        var me = this;
        var chapterViews = [], bolds = [], expandIcons = [], expanded = [], navigationExpander = JST.navigationExpander({}), nav = [], notes = [], chapters = [];
        var boldsId = this.viewer.models.boldsId || (this.viewer.models.boldsId = DV._.uniqueId());
        var getAnnotionsByRange = function (rangeStart, rangeEnd) {
            var annotations = [];
            for (var i = rangeStart, len = rangeEnd; i < len; i++) {
                if (notes[i]) {
                    annotations.push(notes[i]);
                    nav[i] = '';
                }
            }
            return annotations.join('');
        };
        var createChapter = function (chapter) {
            var selectionRule = "#DV-selectedChapter-" + chapter.id + " #DV-chapter-" + chapter.id;
            bolds.push(selectionRule + " .DV-navChapterTitle");
            return (JST.chapterNav(chapter));
        };
        var createNavAnnotations = function (annotationIndex) {
            var renderedAnnotations = [];
            var annotations = me.viewer.schema.data.annotationsByPage[annotationIndex];
            for (var j = 0; j < annotations.length; j++) {
                var annotation = annotations[j];
                renderedAnnotations.push(JST.annotationNav(annotation));
                bolds.push("#DV-selectedAnnotation-" + annotation.id + " #DV-annotationMarker-" + annotation.id + " .DV-navAnnotationTitle");
            }
            return renderedAnnotations.join('');
        };
        if (this.showAnnotations()) {
            for (var i = 0, len = this.models.document.totalPages; i < len; i++) {
                if (this.viewer.schema.data.annotationsByPage[i]) {
                    nav[i] = createNavAnnotations(i);
                    notes[i] = nav[i];
                }
            }
        }
        var sections = this.viewer.schema.data.sections;
        if (sections.length) {
            for (var i = 0; i < sections.length; i++) {
                var section = sections[i];
                var nextSection = sections[i + 1];
                section.id = section.id || DV._.uniqueId();
                section.pageNumber = section.page;
                section.endPage = nextSection ? nextSection.page - 1 : this.viewer.schema.data.totalPages;
                var annotations = getAnnotionsByRange(section.pageNumber - 1, section.endPage);
                if (annotations != '') {
                    section.navigationExpander = navigationExpander;
                    section.navigationExpanderClass = 'DV-hasChildren';
                    section.noteViews = annotations;
                    nav[section.pageNumber - 1] = createChapter(section);
                } else {
                    section.navigationExpanderClass = 'DV-noChildren';
                    section.noteViews = '';
                    section.navigationExpander = '';
                    nav[section.pageNumber - 1] = createChapter(section);
                }
            }
        }
        var navigationView = nav.join('');
        var chaptersContainer = this.viewer.$('div.DV-chaptersContainer');
        chaptersContainer.html(navigationView);
        chaptersContainer.unbind('click').bind('click', this.events.compile('handleNavigation'));
        this.viewer.schema.data.sections.length || DV._.size(this.viewer.schema.data.annotationsById) ? chaptersContainer.show() : chaptersContainer.hide();
        this.displayNavigation();
        DV.jQuery('#DV-navigationBolds-' + boldsId, DV.jQuery("head")).remove();
        var boldsContents = bolds.join(", ") + ' { font-weight:bold; color:#000 !important; }';
        var navStylesheet = '<style id="DV-navigationBolds-' + boldsId + '" type="text/css" media="screen,print">\n' + boldsContents + '\n</style>';
        DV.jQuery("head").append(navStylesheet);
        chaptersContainer = null;
    }, renderComponents: function () {
        var containerEl = DV.jQuery(this.viewer.options.container);
        var position = containerEl.css('position');
        if (position != 'relative' && position != 'absolute' && !this.viewer.options.fixedSize && !this.viewer.options.responsive) {
            DV.jQuery("html, body").css({overflow: 'hidden'});
            if (containerEl.offset().top == 0) {
                this.viewer.elements.viewer.css({border: 0});
            }
        }
        this.viewer.helpers._prevWidth = this.viewer.elements.viewer.width();
        var showAnnotations = this.showAnnotations();
        var showPages = this.models.document.totalPages > 1;
        var showSearch = (this.viewer.options.search !== false) && (this.viewer.options.text !== false) && (!this.viewer.options.width || this.viewer.elements.viewer.width() >= 540);
        var $annotationsView = this.viewer.$('.DV-annotationView');
        $annotationsView[showAnnotations ? 'show' : 'hide']();
        if (showSearch) {
            this.elements.viewer.addClass('DV-searchable');
            this.viewer.$('input.DV-searchInput', containerEl).placeholder({
                message: 'Search',
                clearClassName: 'DV-searchInput-show-search-cancel'
            });
        } else {
            this.viewer.$('.DV-textView').hide();
        }
        if (!showPages) {
            this.viewer.$('.DV-thumbnailsView').hide();
        }
        if (!showAnnotations && !showPages && !showSearch) {
            this.viewer.$('.DV-views').hide();
        }
        this.viewer.api.roundTabCorners();
        var showChapters = this.models.chapters.chapters.length > 0;
        this.viewer.$('.DV-navControls').remove();
        if (showPages || this.viewer.options.sidebarVisible) {
            var navControls = JST.navControls({
                totalPages: this.viewer.schema.data.totalPages,
                totalAnnotations: this.viewer.schema.data.totalAnnotations
            });
            this.viewer.$('.DV-navControlsContainer').html(navControls);
        }
        if (this.viewer.schema.document.canonicalURL) {
            var fullscreenControl = JST.fullscreenControl({});
            this.viewer.$('.DV-fullscreenContainer').html(fullscreenControl);
        }
        var v = this.viewer.elements.viewer;
        v.toggleClass('DV-hideSidebar', !this.viewer.options.sidebarVisible);
        v.toggleClass('DV-mini', !this.viewer.options.sidebarVisible);
        v.toggleClass('DV-supermini', this.viewer.elements.viewer.width() < 500);
        v.toggleClass('DV-hideFooter', this.viewer.options.sidebarVisible);
        this.elements.currentPage = this.viewer.$('span.DV-currentPage');
        this.models.document.setPageIndex(this.models.document.currentIndex());
    }, reset: function () {
        this.resetNavigationState();
        this.cleanUpSearch();
        this.viewer.pageSet.cleanUp();
        this.removeObserver('drawPages');
        this.viewer.dragReporter.unBind();
        this.elements.window.scrollTop(0);
    }
});
DV._.extend(DV.Schema.helpers, {
    showAnnotationEdit: function (e) {
        var annoEl = this.viewer.$(e.target).closest(this.annotationClassName);
        var area = this.viewer.$('.DV-annotationTextArea', annoEl);
        annoEl.addClass('DV-editing');
        area.focus();
    }, cancelAnnotationEdit: function (e) {
        var annoEl = this.viewer.$(e.target).closest(this.annotationClassName);
        var anno = this.getAnnotationModel(annoEl);
        this.viewer.$('.DV-annotationTitleInput', annoEl).val(anno.title);
        this.viewer.$('.DV-annotationTextArea', annoEl).val(anno.text);
        if (anno.unsaved) {
            this.models.annotations.removeAnnotation(anno);
        } else {
            annoEl.removeClass('DV-editing');
        }
    }, saveAnnotation: function (e, option) {
        var target = this.viewer.$(e.target);
        var annoEl = target.closest(this.annotationClassName);
        var anno = this.getAnnotationModel(annoEl);
        if (!anno)return;
        anno.title = this.viewer.$('.DV-annotationTitleInput', annoEl).val();
        anno.text = this.viewer.$('.DV-annotationTextArea', annoEl).val();
        anno.owns_note = anno.unsaved ? true : anno.owns_note;
        if (anno.owns_note) {
            anno.author = anno.author || dc.account.name;
            anno.author_organization = anno.author_organization || (dc.account.isReal && dc.account.organization.name);
        }
        if (target.hasClass('DV-saveAnnotationDraft'))anno.access = 'exclusive'; else if (annoEl.hasClass('DV-accessExclusive'))anno.access = 'public';
        if (option == 'onlyIfText' && (!anno.title || anno.title == 'Untitled Note') && !anno.text && !anno.server_id) {
            return this.models.annotations.removeAnnotation(anno);
        }
        annoEl.removeClass('DV-editing');
        this.models.annotations.fireSaveCallbacks(anno);
        this.viewer.api.redraw(true);
        if (this.viewer.activeAnnotation)this.viewer.pageSet.showAnnotation(anno);
    }, deleteAnnotation: function (e) {
        var annoEl = this.viewer.$(e.target).closest(this.annotationClassName);
        var anno = this.getAnnotationModel(annoEl);
        this.models.annotations.removeAnnotation(anno);
        this.models.annotations.fireDeleteCallbacks(anno);
    }
});
DV._.extend(DV.Schema.helpers, {
    resetNavigationState: function () {
        var elements = this.elements;
        if (elements.chaptersContainer.length)elements.chaptersContainer[0].id = '';
        if (elements.navigation.length)elements.navigation[0].id = '';
    }, setActiveChapter: function (chapterId) {
        if (chapterId)this.elements.chaptersContainer.attr('id', 'DV-selectedChapter-' + chapterId);
    }, setActiveAnnotationInNav: function (annotationId) {
        if (annotationId != null) {
            this.elements.navigation.attr('id', 'DV-selectedAnnotation-' + annotationId);
        } else {
            this.elements.navigation.attr('id', '');
        }
    }
});
DV._.extend(DV.Schema.helpers, {
    getSearchResponse: function (query) {
        var handleResponse = DV.jQuery.proxy(function (response) {
            this.viewer.searchResponse = response;
            var hasResults = (response.results.length > 0) ? true : false;
            var text = hasResults ? 'of ' + response.results.length + ' ' : ' ';
            this.viewer.$('span.DV-totalSearchResult').text(text);
            this.viewer.$('span.DV-searchQuery').text(response.query);
            if (hasResults) {
                var currentPage = this.viewer.models.document.currentPage();
                var page = (DV._.include(response.results, currentPage)) ? currentPage : response.results[0];
                this.events.loadText(page - 1, this.highlightSearchResponses);
            } else {
                this.highlightSearchResponses();
            }
        }, this);
        var failResponse = function () {
            this.viewer.$('.DV-currentSearchResult').text('Search is not available at this time');
            this.viewer.$('span.DV-searchQuery').text(query);
            this.viewer.$('.DV-searchResults').addClass('DV-noResults');
        };
        var searchURI = this.viewer.schema.document.resources.search.replace('{query}', encodeURIComponent(query));
        if (this.viewer.helpers.isCrossDomain(searchURI))searchURI += '&callback=?';
        DV.jQuery.ajax({url: searchURI, dataType: 'json', success: handleResponse, error: failResponse});
    }, acceptInputCallBack: function () {
        var pageIndex = parseInt(this.viewer.$('.DV-pageNumberContainer input').val()) - 1;
        pageIndex = (pageIndex === '') ? 0 : pageIndex;
        pageIndex = (pageIndex < 0) ? 0 : pageIndex;
        pageIndex = (pageIndex + 1 > this.models.document.totalPages) ? this.models.document.totalPages - 1 : pageIndex;
        var pageNumber = pageIndex + 1;
        this.elements.currentPage.text(pageNumber);
        this.viewer.$('.DV-pageNumberContainer input').val(pageNumber);
        if (this.viewer.state === 'ViewDocument' || this.viewer.state === 'ViewThumbnails') {
            this.jump(pageIndex);
        } else if (this.viewer.state === 'ViewText') {
            this.events.loadText(pageIndex);
        }
    }, highlightSearchResponses: function () {
        var viewer = this.viewer;
        var response = viewer.searchResponse;
        if (!response)return false;
        var results = response.results;
        var currentResultEl = this.viewer.$('.DV-currentSearchResult');
        if (results.length == 0) {
            currentResultEl.text('No Results');
            this.viewer.$('.DV-searchResults').addClass('DV-noResults');
        } else {
            this.viewer.$('.DV-searchResults').removeClass('DV-noResults');
        }
        for (var i = 0; i < response.results.length; i++) {
            if (this.models.document.currentPage() === response.results[i]) {
                currentResultEl.text('Page ' + (i + 1) + ' ');
                break;
            }
        }
        var boundary = '(\\b|\\B)';
        var query = boundary + '(' + response.query.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&").replace(/\s+/g, '\\s+') + ')' + boundary;
        var textContent = this.viewer.$('.DV-textContents');
        var currentPageText = textContent.text();
        var pattern = new RegExp(query, "ig");
        var replacement = currentPageText.replace(pattern, '$1<span class="DV-searchMatch">$2</span>$3');
        textContent.html(replacement);
        var highlightIndex = (viewer.toHighLight) ? viewer.toHighLight : 0;
        this.highlightMatch(highlightIndex);
        currentResultEl = null;
        textContent = null;
    }, highlightEntity: function (offset, length) {
        this.viewer.$('.DV-searchResults').addClass('DV-noResults');
        var textContent = this.viewer.$('.DV-textContents');
        var text = textContent.text();
        var pre = text.substr(0, offset);
        var entity = text.substr(offset, length);
        var post = text.substr(offset + length);
        text = [pre, '<span class="DV-searchMatch">', entity, '</span>', post].join('');
        textContent.html(text);
        this.highlightMatch(0);
    }, highlightMatch: function (index) {
        var highlightsOnThisPage = this.viewer.$('.DV-textContents span.DV-searchMatch');
        if (highlightsOnThisPage.length == 0)return false;
        var currentPageIndex = this.getCurrentSearchPageIndex();
        var toHighLight = this.viewer.toHighLight;
        if (toHighLight) {
            if (toHighLight !== false) {
                if (toHighLight === 'last') {
                    index = highlightsOnThisPage.length - 1;
                } else if (toHighLight === 'first') {
                    index = 0;
                } else {
                    index = toHighLight;
                }
            }
            toHighLight = false;
        }
        var searchResponse = this.viewer.searchResponse;
        if (searchResponse) {
            if (index === (highlightsOnThisPage.length)) {
                if (searchResponse.results.length === currentPageIndex + 1) {
                    return;
                }
                toHighLight = 'first';
                this.events.loadText(searchResponse.results[currentPageIndex + 1] - 1, this.highlightSearchResponses);
                return;
            } else if (index === -1) {
                if (currentPageIndex - 1 < 0) {
                    return false;
                }
                toHighLight = 'last';
                this.events.loadText(searchResponse.results[currentPageIndex - 1] - 1, this.highlightSearchResponses);
                return;
            }
            highlightsOnThisPage.removeClass('DV-highlightedMatch');
        }
        var match = this.viewer.$('.DV-textContents span.DV-searchMatch:eq(' + index + ')');
        match.addClass('DV-highlightedMatch');
        this.elements.window[0].scrollTop = match.position().top - 50;
        if (searchResponse)searchResponse.highlighted = index;
        highlightsOnThisPage = null;
        match = null;
    }, getCurrentSearchPageIndex: function () {
        var searchResponse = this.viewer.searchResponse;
        if (!searchResponse) {
            return false;
        }
        var docModel = this.models.document;
        for (var i = 0, len = searchResponse.results.length; i < len; i++) {
            if (searchResponse.results[i] === docModel.currentPage()) {
                return i;
            }
        }
    }, highlightPreviousMatch: function (e) {
        e.preventDefault();
        this.highlightMatch(this.viewer.searchResponse.highlighted - 1);
    }, highlightNextMatch: function (e) {
        e.preventDefault(e);
        this.highlightMatch(this.viewer.searchResponse.highlighted + 1);
    }, clearSearch: function (e) {
        this.elements.searchInput.val('').keyup().focus();
    }, showEntity: function (name, offset, length) {
        this.viewer.$('span.DV-totalSearchResult').text('');
        this.viewer.$('span.DV-searchQuery').text(name);
        this.viewer.$('span.DV-currentSearchResult').text("Searching");
        this.events.loadText(this.models.document.currentIndex(), DV._.bind(this.viewer.helpers.highlightEntity, this.viewer.helpers, offset, length));
    }, cleanUpSearch: function () {
        var viewer = this.viewer;
        viewer.searchResponse = null;
        viewer.toHighLight = null;
        if (this.elements)this.elements.searchInput.keyup().blur();
    }
});
DV.Schema.states = {
    InitialLoad: function () {
        if (this.helpers.unsupportedBrowser())return;
        this.helpers.renderViewer();
        this.events.elements = this.helpers.elements = this.elements = new DV.Elements(this);
        this.helpers.renderComponents();
        this.helpers.renderNavigation();
        this.helpers.renderSpecificPageCss();
        this.pageSet = new DV.PageSet(this);
        this.pageSet.buildPages();
        this.helpers.bindEvents(this);
        this.helpers.positionViewer();
        this.models.document.computeOffsets();
        this.helpers.addObserver('drawPages');
        this.helpers.registerHashChangeEvents();
        this.dragReporter = new DV.DragReporter(this, '.DV-pageCollection', DV.jQuery.proxy(this.helpers.shift, this), {ignoreSelector: '.DV-annotationContent'});
        this.helpers.startCheckTimer();
        this.helpers.handleInitialState();
        DV._.defer(DV._.bind(this.helpers.autoZoomPage, this.helpers));
    }, ViewAnnotation: function () {
        this.helpers.reset();
        this.helpers.ensureAnnotationImages();
        this.activeAnnotationId = null;
        this.acceptInput.deny();
        if (DV.jQuery.browser.msie) {
            this.elements.annotations.css({zoom: 0});
            this.elements.annotations.css({zoom: 1});
        }
        this.helpers.toggleContent('viewAnnotations');
        this.compiled.next();
        return true;
    }, ViewDocument: function () {
        this.helpers.reset();
        this.helpers.addObserver('drawPages');
        this.dragReporter.setBinding();
        this.elements.window.mouseleave(DV.jQuery.proxy(this.dragReporter.stop, this.dragReporter));
        this.acceptInput.allow();
        this.helpers.toggleContent('viewDocument');
        this.helpers.setActiveChapter(this.models.chapters.getChapterId(this.models.document.currentIndex()));
        this.helpers.jump(this.models.document.currentIndex());
        return true;
    }, ViewEntity: function (name, offset, length) {
        this.helpers.reset();
        this.helpers.toggleContent('viewSearch');
        this.helpers.showEntity(name, offset, length);
    }, ViewSearch: function () {
        this.helpers.reset();
        if (this.elements.searchInput.val() == '') {
            this.elements.searchInput.val(searchRequest);
        } else {
            var searchRequest = this.elements.searchInput.val();
        }
        this.helpers.getSearchResponse(searchRequest);
        this.acceptInput.deny();
        this.helpers.toggleContent('viewSearch');
        return true;
    }, ViewText: function () {
        this.helpers.reset();
        this.acceptInput.allow();
        this.pageSet.zoomText();
        this.helpers.toggleContent('viewText');
        this.events.loadText();
        return true;
    }, ViewThumbnails: function () {
        this.helpers.reset();
        this.helpers.toggleContent('viewThumbnails');
        this.thumbnails = new DV.Thumbnails(this);
        this.thumbnails.render();
        return true;
    }
};
DV.Api = function (viewer) {
    this.viewer = viewer;
};
DV.Api.prototype = {
    currentPage: function () {
        return this.viewer.models.document.currentPage();
    }, setCurrentPage: function (page) {
        this.viewer.helpers.jump(page - 1);
    }, onPageChange: function (callback) {
        this.viewer.models.document.onPageChangeCallbacks.push(callback);
    }, getPageNumberForId: function (id) {
        var page = this.viewer.pageSet.pages[id];
        return page.index + 1;
    }, getSchema: function () {
        return this.viewer.schema.document;
    }, getId: function () {
        return this.viewer.schema.document.id;
    }, getModelId: function () {
        return parseInt(this.getId(), 10);
    }, currentZoom: function () {
        var doc = this.viewer.models.document;
        return doc.zoomLevel / doc.ZOOM_RANGES[1];
    }, relativeZoom: function () {
        var models = this.viewer.models;
        var zoom = this.currentZoom();
        return zoom * (models.document.ZOOM_RANGES[1] / models.pages.BASE_WIDTH);
    }, numberOfPages: function () {
        return this.viewer.models.document.totalPages;
    }, getContributor: function () {
        return this.viewer.schema.document.contributor;
    }, getContributorOrganization: function () {
        return this.viewer.schema.document.contributor_organization;
    }, setSections: function (sections) {
        sections = DV._.sortBy(sections, function (s) {
            return s.page;
        });
        this.viewer.schema.data.sections = sections;
        this.viewer.models.chapters.loadChapters();
        this.redraw();
    }, getSections: function () {
        return DV._.clone(this.viewer.schema.data.sections || []);
    }, getDescription: function () {
        return this.viewer.schema.document.description;
    }, setDescription: function (desc) {
        this.viewer.schema.document.description = desc;
        this.viewer.$('.DV-description').remove();
        this.viewer.$('.DV-navigation').prepend(JST.descriptionContainer({description: desc}));
        this.viewer.helpers.displayNavigation();
    }, getRelatedArticle: function () {
        return this.viewer.schema.document.resources.related_article;
    }, setRelatedArticle: function (url) {
        this.viewer.schema.document.resources.related_article = url;
        this.viewer.$('.DV-storyLink a').attr({href: url});
        this.viewer.$('.DV-storyLink').toggle(!!url);
    }, getPublishedUrl: function () {
        return this.viewer.schema.document.resources.published_url;
    }, setPublishedUrl: function (url) {
        this.viewer.schema.document.resources.published_url = url;
    }, getTitle: function () {
        return this.viewer.schema.document.title;
    }, setTitle: function (title) {
        this.viewer.schema.document.title = title;
        document.title = title;
    }, getSource: function () {
        return this.viewer.schema.document.source;
    }, setSource: function (source) {
        this.viewer.schema.document.source = source;
    }, getPageText: function (pageNumber) {
        return this.viewer.schema.text[pageNumber - 1];
    }, setPageText: function (text, pageNumber) {
        this.viewer.schema.text[pageNumber - 1] = text;
    }, resetPageText: function (overwriteOriginal) {
        var self = this;
        var pageText = this.viewer.schema.text;
        if (overwriteOriginal) {
            this.viewer.models.document.originalPageText = {};
        } else {
            DV._.each(this.viewer.models.document.originalPageText, function (originalPageText, pageNumber) {
                pageNumber = parseInt(pageNumber, 10);
                if (originalPageText != pageText[pageNumber - 1]) {
                    self.setPageText(originalPageText, pageNumber);
                    if (pageNumber == self.currentPage()) {
                        self.viewer.events.loadText();
                    }
                }
            });
        }
        if (this.viewer.openEditor == 'editText') {
            this.viewer.$('.DV-textContents').attr('contentEditable', true).addClass('DV-editing');
        }
    }, redraw: function (redrawAll) {
        if (redrawAll) {
            this.viewer.models.annotations.renderAnnotations();
            this.viewer.models.document.computeOffsets();
        }
        this.viewer.helpers.renderNavigation();
        this.viewer.helpers.renderComponents();
        if (redrawAll) {
            this.viewer.elements.window.removeClass('DV-coverVisible');
            this.viewer.pageSet.buildPages({noNotes: true});
            this.viewer.helpers.autoZoomPage();
        }
    }, getAnnotationsBySortOrder: function () {
        return this.viewer.models.annotations.sortAnnotations();
    }, getAnnotationsByPageIndex: function (idx) {
        return this.viewer.models.annotations.getAnnotations(idx);
    }, getAnnotation: function (aid) {
        return this.viewer.models.annotations.getAnnotation(aid);
    }, setCurrentAnnotation: function (aid) {
        var noteModel = this.viewer.models.annotations.getAnnotation(aid);
        this.viewer.pageSet.showAnnotation(noteModel);
    }, addAnnotation: function (anno) {
        anno = this.viewer.schema.loadAnnotation(anno);
        this.viewer.models.annotations.sortAnnotations();
        this.redraw(true);
        this.viewer.pageSet.showAnnotation(anno, {active: true, edit: true});
        return anno;
    }, onAnnotationSave: function (callback) {
        this.viewer.models.annotations.saveCallbacks.push(callback);
    }, onAnnotationDelete: function (callback) {
        this.viewer.models.annotations.deleteCallbacks.push(callback);
    }, setConfirmStateChange: function (callback) {
        this.viewer.confirmStateChange = callback;
    }, onChangeState: function (callback) {
        this.viewer.onStateChangeCallbacks.push(callback);
    }, getState: function () {
        return this.viewer.state;
    }, setState: function (state) {
        this.viewer.open(state);
    }, resetRemovedPages: function () {
        this.viewer.models.document.resetRemovedPages();
    }, addPageToRemovedPages: function (page) {
        this.viewer.models.document.addPageToRemovedPages(page);
    }, removePageFromRemovedPages: function (page) {
        this.viewer.models.document.removePageFromRemovedPages(page);
    }, resetReorderedPages: function () {
        this.viewer.models.document.redrawReorderedPages();
    }, reorderPages: function (pageOrder, options) {
        var model = this.getModelId();
        this.viewer.models.document.reorderPages(model, pageOrder, options);
    }, loadJS: function (url, callback) {
        DV.jQuery.getScript(url, callback);
    }, roundTabCorners: function () {
        var tabs = this.viewer.$('.DV-views > div:visible');
        tabs.first().addClass('DV-first');
        tabs.last().addClass('DV-last');
    }, registerHashListener: function (matcher, callback) {
        this.viewer.history.register(matcher, callback);
    }, clearHashListeners: function () {
        this.viewer.history.defaultCallback = null;
        this.viewer.history.handlers = [];
    }, unload: function (viewer) {
        this.viewer.helpers.unbindEvents();
        DV.jQuery('.DV-docViewer', this.viewer.options.container).remove();
        this.viewer.helpers.stopCheckTimer();
        delete DV.viewers[this.viewer.schema.document.id];
    }, enterRemovePagesMode: function () {
        this.viewer.openEditor = 'removePages';
    }, leaveRemovePagesMode: function () {
        this.viewer.openEditor = null;
    }, enterAddPagesMode: function () {
        this.viewer.openEditor = 'addPages';
    }, leaveAddPagesMode: function () {
        this.viewer.openEditor = null;
    }, enterReplacePagesMode: function () {
        this.viewer.openEditor = 'replacePages';
    }, leaveReplacePagesMode: function () {
        this.viewer.openEditor = null;
    }, enterReorderPagesMode: function () {
        this.viewer.openEditor = 'reorderPages';
        this.viewer.elements.viewer.addClass('DV-reorderPages');
    }, leaveReorderPagesMode: function () {
        this.resetReorderedPages();
        this.viewer.openEditor = null;
        this.viewer.elements.viewer.removeClass('DV-reorderPages');
    }, enterEditPageTextMode: function () {
        this.viewer.openEditor = 'editText';
        this.viewer.events.loadText();
    }, leaveEditPageTextMode: function () {
        this.viewer.openEditor = null;
        this.resetPageText();
    }
};
DV.DocumentViewer = function (options) {
    this.options = options;
    this.window = window;
    this.$ = this.jQuery;
    this.schema = new DV.Schema();
    this.api = new DV.Api(this);
    this.history = new DV.History(this);
    this.models = this.schema.models;
    this.events = DV._.extend({}, DV.Schema.events);
    this.helpers = DV._.extend({}, DV.Schema.helpers);
    this.states = DV._.extend({}, DV.Schema.states);
    this.isFocus = true;
    this.openEditor = null;
    this.confirmStateChange = null;
    this.activeElement = null;
    this.observers = [];
    this.windowDimensions = {};
    this.scrollPosition = null;
    this.checkTimer = {};
    this.busy = false;
    this.annotationToLoadId = null;
    this.dragReporter = null;
    this.compiled = {};
    this.tracker = {};
    this.onStateChangeCallbacks = [];
    this.events = DV._.extend(this.events, {
        viewer: this,
        states: this.states,
        elements: this.elements,
        helpers: this.helpers,
        models: this.models,
        compile: function () {
            var a = this.viewer;
            var methodName = arguments[0];
            return function () {
                if (!a.events[a.state][methodName]) {
                    a.events[methodName].apply(a.events, arguments);
                } else {
                    a.events[a.state][methodName].apply(a.events, arguments);
                }
            };
        }
    });
    this.helpers = DV._.extend(this.helpers, {
        viewer: this,
        states: this.states,
        elements: this.elements,
        events: this.events,
        models: this.models
    });
    this.states = DV._.extend(this.states, {
        viewer: this,
        helpers: this.helpers,
        elements: this.elements,
        events: this.events,
        models: this.models
    });
};
DV.DocumentViewer.prototype.loadModels = function () {
    this.models.chapters = new DV.model.Chapters(this);
    this.models.document = new DV.model.Document(this);
    this.models.pages = new DV.model.Pages(this);
    this.models.annotations = new DV.model.Annotations(this);
    this.models.removedPages = {};
};
DV.DocumentViewer.prototype.open = function (state) {
    if (this.state == state)return;
    var continuation = DV._.bind(function () {
        this.state = state;
        this.states[state].apply(this, arguments);
        this.slapIE();
        this.notifyChangedState();
        return true;
    }, this);
    this.confirmStateChange ? this.confirmStateChange(continuation) : continuation();
};
DV.DocumentViewer.prototype.slapIE = function () {
    DV.jQuery(this.options.container).css({zoom: 0.99}).css({zoom: 1});
};
DV.DocumentViewer.prototype.notifyChangedState = function () {
    DV._.each(this.onStateChangeCallbacks, function (c) {
        c();
    });
};
DV.DocumentViewer.prototype.recordHit = function (hitUrl) {
    var loc = window.location;
    var url = loc.protocol + '//' + loc.host + loc.pathname;
    if (url.match(/^file:/))return false;
    url = url.replace(/[\/]+$/, '');
    var id = parseInt(this.api.getId(), 10);
    var key = encodeURIComponent('document:' + id + ':' + url);
    DV.jQuery(document.body).append('<img class="DV-pixelping" alt="" width="1" height="1" src="' + hitUrl + '?key=' + key + '" />');
};
DV.DocumentViewer.prototype.jQuery = function (selector, context) {
    context = context || this.options.container;
    return DV.jQuery.call(DV.jQuery, selector, context);
};
DV.load = function (documentRep, options) {
    options = options || {};
    var id = documentRep.id || documentRep.match(/([^\/]+)(\.js|\.json)$/)[1];
    if ('showSidebar'in options)options.sidebar = options.showSidebar;
    var defaults = {container: document.body, zoom: 'auto', sidebar: true};
    options = DV._.extend({}, defaults, options);
    options.sidebarVisible = options.sidebar;
    options.fixedSize = !options.responsive && (!!(options.width || options.height));
    var viewer = new DV.DocumentViewer(options);
    DV.viewers[id] = viewer;
    var continueLoad = DV.loadJSON = function (json) {
        var viewer = DV.viewers[json.id];
        viewer.schema.importCanonicalDocument(json);
        viewer.loadModels();
        DV.jQuery(function () {
            viewer.open('InitialLoad');
            if (options.afterLoad)options.afterLoad(viewer);
            if (DV.afterLoad)DV.afterLoad(viewer);
            if (DV.recordHit)viewer.recordHit(DV.recordHit);
        });
        if (DV.jQuery(window).width() < 400) {
            var rect = document.getElementById("mainDocViewer").getBoundingClientRect();
            document.getElementById("iframeBlocker").style.height = rect.bottom - rect.top + "px";
            document.getElementById("iframeBlocker").style.width = rect.right - rect.left + "px";
            document.getElementById("iframeBlocker").style.background = "white";
            document.getElementById("iframeBlocker").style.opacity = "0.7";
            document.getElementById("iframeBlocker").style.display = "block";
        }
    };
    var jsonLoad = function () {
        if (DV._.isString(documentRep)) {
            if (documentRep.match(/\.js$/)) {
                DV.jQuery.getScript(documentRep);
            } else {
                var crossDomain = viewer.helpers.isCrossDomain(documentRep);
                if (crossDomain)documentRep = documentRep + '?callback=?';
                DV.jQuery.getJSON(documentRep, continueLoad);
            }
        } else {
            continueLoad(documentRep);
        }
    };
    if (options.templates) {
        DV.jQuery.getScript(options.templates, jsonLoad);
    } else {
        jsonLoad();
    }
    return viewer;
};
if (DV.onload)DV._.defer(DV.onload);