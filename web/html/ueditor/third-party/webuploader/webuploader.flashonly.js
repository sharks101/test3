/*! WebUploader 0.1.2 */


/**
 * @fileOverview 璁╁唴閮ㄥ悇涓儴浠剁殑浠ｇ爜鍙互鐢╗amd](https://github.com/amdjs/amdjs-api/wiki/AMD)妯″潡瀹氢箟鏂瑰纺缁勭粐璧锋潵銆? *
 * AMD API 鍐呴儴镄勭亩鍗曚笉瀹屽叏瀹炵幇锛岃蹇界暐銆傚彧链夊綋WebUploader琚悎骞舵垚涓€涓枃浠剁殑镞跺€欐墠浼氩紩鍏ャ€? */
(function( root, factory ) {
    var modules = {},

        // 鍐呴儴require, 绠€鍗曚笉瀹屽叏瀹炵幇銆?        // https://github.com/amdjs/amdjs-api/wiki/require
        _require = function( deps, callback ) {
            var args, len, i;

            // 濡傛灉deps涓嶆槸鏁扮粍锛屽垯鐩存帴杩斿洖鎸囧畾module
            if ( typeof deps === 'string' ) {
                return getModule( deps );
            } else {
                args = [];
                for( len = deps.length, i = 0; i < len; i++ ) {
                    args.push( getModule( deps[ i ] ) );
                }

                return callback.apply( null, args );
            }
        },

        // 鍐呴儴define锛屾殏镞朵笉鏀寔涓嶆寚瀹歩d.
        _define = function( id, deps, factory ) {
            if ( arguments.length === 2 ) {
                factory = deps;
                deps = null;
            }

            _require( deps || [], function() {
                setModule( id, factory, arguments );
            });
        },

        // 璁剧疆module, 鍏煎CommonJs鍐欐硶銆?        setModule = function( id, factory, args ) {
            var module = {
                    exports: factory
                },
                returned;

            if ( typeof factory === 'function' ) {
                args.length || (args = [ _require, module.exports, module ]);
                returned = factory.apply( null, args );
                returned !== undefined && (module.exports = returned);
            }

            modules[ id ] = module.exports;
        },

        // 镙规嵁id銮峰彇module
        getModule = function( id ) {
            var module = modules[ id ] || root[ id ];

            if ( !module ) {
                throw new Error( '`' + id + '` is undefined' );
            }

            return module;
        },

        // 灏嗘墍链尘odules锛屽皢璺缎ids瑁呮崲鎴愬璞°€?        exportsTo = function( obj ) {
            var key, host, parts, part, last, ucFirst;

            // make the first character upper case.
            ucFirst = function( str ) {
                return str && (str.charAt( 0 ).toUpperCase() + str.substr( 1 ));
            };

            for ( key in modules ) {
                host = obj;

                if ( !modules.hasOwnProperty( key ) ) {
                    continue;
                }

                parts = key.split('/');
                last = ucFirst( parts.pop() );

                while( (part = ucFirst( parts.shift() )) ) {
                    host[ part ] = host[ part ] || {};
                    host = host[ part ];
                }

                host[ last ] = modules[ key ];
            }
        },

        exports = factory( root, _define, _require ),
        origin;

    // exports every module.
    exportsTo( exports );

    if ( typeof module === 'object' && typeof module.exports === 'object' ) {

        // For CommonJS and CommonJS-like environments where a proper window is present,
        module.exports = exports;
    } else if ( typeof define === 'function' && define.amd ) {

        // Allow using this built library as an AMD module
        // in another project. That other project will only
        // see this AMD call, not the internal modules in
        // the closure below.
        define([], exports );
    } else {

        // Browser globals case. Just assign the
        // result to a property on the global.
        origin = root.WebUploader;
        root.WebUploader = exports;
        root.WebUploader.noConflict = function() {
            root.WebUploader = origin;
        };
    }
})( this, function( window, define, require ) {


    /**
     * @fileOverview jQuery or Zepto
     */
    define('dollar-third',[],function() {
        return window.jQuery || window.Zepto;
    });
    /**
     * @fileOverview Dom 鎿崭綔鐩稿叧
     */
    define('dollar',[
        'dollar-third'
    ], function( _ ) {
        return _;
    });
    /**
     * @fileOverview 浣跨敤jQuery镄凯romise
     */
    define('promise-third',[
        'dollar'
    ], function( $ ) {
        return {
            Deferred: $.Deferred,
            when: $.when,
    
            isPromise: function( anything ) {
                return anything && typeof anything.then === 'function';
            }
        };
    });
    /**
     * @fileOverview Promise/A+
     */
    define('promise',[
        'promise-third'
    ], function( _ ) {
        return _;
    });
    /**
     * @fileOverview 鍩虹绫绘柟娉曘€?     */
    
    /**
     * Web Uploader鍐呴儴绫荤殑璇︾粏璇存槑锛屼互涓嬫彁鍙婄殑锷熻兘绫伙紝閮藉彲浠ュ湪`WebUploader`杩欎釜鍙橀噺涓闂埌銆?     *
     * As you know, Web Uploader镄勬疮涓枃浠堕兘鏄敤杩啸AMD](https://github.com/amdjs/amdjs-api/wiki/AMD)瑙勮寖涓殑`define`缁勭粐璧锋潵镄? 姣忎釜Module閮戒细链変釜module id.
     * 榛樿module id璇ユ枃浠剁殑璺缎锛岃€屾璺缎灏嗕细杞寲鎴愬悕瀛楃┖闂村瓨鏀惧湪WebUploader涓€傚锛?     *
     * * module `base`锛欧ebUploader.Base
     * * module `file`: WebUploader.File
     * * module `lib/dnd`: WebUploader.Lib.Dnd
     * * module `runtime/html5/dnd`: WebUploader.Runtime.Html5.Dnd
     *
     *
     * 浠ヤ笅鏂囨。灏嗗彲鑳界渷鐣WebUploader`鍓岖紑銆?     * @module WebUploader
     * @title WebUploader API鏂囨。
     */
    define('base',[
        'dollar',
        'promise'
    ], function( $, promise ) {
    
        var noop = function() {},
            call = Function.call;
    
        // http://jsperf.com/uncurrythis
        // 鍙岖閲屽寲
        function uncurryThis( fn ) {
            return function() {
                return call.apply( fn, arguments );
            };
        }
    
        function bindFn( fn, context ) {
            return function() {
                return fn.apply( context, arguments );
            };
        }
    
        function createObject( proto ) {
            var f;
    
            if ( Object.create ) {
                return Object.create( proto );
            } else {
                f = function() {};
                f.prototype = proto;
                return new f();
            }
        }
    
    
        /**
         * 鍩虹绫伙紝鎻愪緵涓€浜涚亩鍗曞父鐢ㄧ殑鏂规硶銆?         * @class Base
         */
        return {
    
            /**
             * @property {String} version 褰揿墠鐗堟湰鍙枫€?             */
            version: '0.1.2',
    
            /**
             * @property {jQuery|Zepto} $ 寮旷敤渚濊禆镄刯Query鎴栬€匷epto瀵硅薄銆?             */
            $: $,
    
            Deferred: promise.Deferred,
    
            isPromise: promise.isPromise,
    
            when: promise.when,
    
            /**
             * @description  绠€鍗旷殑娴忚鍣ㄦ镆ョ粨鏋溿€?             *
             * * `webkit`  webkit鐗堟湰鍙凤紝濡傛灉娴忚鍣ㄤ负闱瀢ebkit鍐呮牳锛屾灞炴€т负`undefined`銆?             * * `chrome`  chrome娴忚鍣ㄧ増链佛锛屽鏋沧祻瑙埚櫒涓篶hrome锛屾灞炴€т负`undefined`銆?             * * `ie`  ie娴忚鍣ㄧ増链佛锛屽鏋沧祻瑙埚櫒涓洪潪ie锛屾灞炴€т负`undefined`銆?*鏆备笉鏀寔ie10+**
             * * `firefox`  firefox娴忚鍣ㄧ増链佛锛屽鏋沧祻瑙埚櫒涓洪潪firefox锛屾灞炴€т负`undefined`銆?             * * `safari`  safari娴忚鍣ㄧ増链佛锛屽鏋沧祻瑙埚櫒涓洪潪safari锛屾灞炴€т负`undefined`銆?             * * `opera`  opera娴忚鍣ㄧ増链佛锛屽鏋沧祻瑙埚櫒涓洪潪opera锛屾灞炴€т负`undefined`銆?             *
             * @property {Object} [browser]
             */
            browser: (function( ua ) {
                var ret = {},
                    webkit = ua.match( /WebKit\/([\d.]+)/ ),
                    chrome = ua.match( /Chrome\/([\d.]+)/ ) ||
                        ua.match( /CriOS\/([\d.]+)/ ),
    
                    ie = ua.match( /MSIE\s([\d\.]+)/ ) ||
                        ua.match(/(?:trident)(?:.*rv:([\w.]+))?/i),
                    firefox = ua.match( /Firefox\/([\d.]+)/ ),
                    safari = ua.match( /Safari\/([\d.]+)/ ),
                    opera = ua.match( /OPR\/([\d.]+)/ );
    
                webkit && (ret.webkit = parseFloat( webkit[ 1 ] ));
                chrome && (ret.chrome = parseFloat( chrome[ 1 ] ));
                ie && (ret.ie = parseFloat( ie[ 1 ] ));
                firefox && (ret.firefox = parseFloat( firefox[ 1 ] ));
                safari && (ret.safari = parseFloat( safari[ 1 ] ));
                opera && (ret.opera = parseFloat( opera[ 1 ] ));
    
                return ret;
            })( navigator.userAgent ),
    
            /**
             * @description  鎿崭綔绯荤粺妫€镆ョ粨鏋溿€?             *
             * * `android`  濡傛灉鍦╝ndroid娴忚鍣ㄧ幆澧冧笅锛屾链间负瀵瑰簲镄刟ndroid鐗堟湰鍙凤紝鍚﹀垯涓筚undefined`銆?             * * `ios` 濡傛灉鍦╥os娴忚鍣ㄧ幆澧冧笅锛屾链间负瀵瑰簲镄刬os鐗堟湰鍙凤紝鍚﹀垯涓筚undefined`銆?             * @property {Object} [os]
             */
            os: (function( ua ) {
                var ret = {},
    
                    // osx = !!ua.match( /\(Macintosh\; Intel / ),
                    android = ua.match( /(?:Android);?[\s\/]+([\d.]+)?/ ),
                    ios = ua.match( /(?:iPad|iPod|iPhone).*OS\s([\d_]+)/ );
    
                // osx && (ret.osx = true);
                android && (ret.android = parseFloat( android[ 1 ] ));
                ios && (ret.ios = parseFloat( ios[ 1 ].replace( /_/g, '.' ) ));
    
                return ret;
            })( navigator.userAgent ),
    
            /**
             * 瀹炵幇绫讳笌绫讳箣闂寸殑缁ф圹銆?             * @method inherits
             * @grammar Base.inherits( super ) => child
             * @grammar Base.inherits( super, protos ) => child
             * @grammar Base.inherits( super, protos, statics ) => child
             * @param  {Class} super 鐖剁被
             * @param  {Object | Function} [protos] 瀛愮被鎴栬€呭璞°€傚鏋滃璞′腑鍖呭惈constructor锛屽瓙绫诲皢鏄敤姝ゅ睘镐у€笺€?             * @param  {Function} [protos.constructor] 瀛愮被鏋勯€犲櫒锛屼笉鎸囧畾镄勮瘽灏嗗垱寤轰釜涓存椂镄勭洿鎺ユ墽琛岀埗绫绘瀯阃犲櫒镄勬柟娉曘€?             * @param  {Object} [statics] 闱欐€佸睘镐ф垨鏂规硶銆?             * @return {Class} 杩斿洖瀛愮被銆?             * @example
             * function Person() {
             *     console.log( 'Super' );
             * }
             * Person.prototype.hello = function() {
             *     console.log( 'hello' );
             * };
             *
             * var Manager = Base.inherits( Person, {
             *     world: function() {
             *         console.log( 'World' );
             *     }
             * });
             *
             * // 锲犱负娌℃湁鎸囧畾鏋勯€犲櫒锛岀埗绫荤殑鏋勯€犲櫒灏嗕细镓ц銆?             * var instance = new Manager();    // => Super
             *
             * // 缁ф圹瀛愮埗绫荤殑鏂规硶
             * instance.hello();    // => hello
             * instance.world();    // => World
             *
             * // 瀛愮被镄刜_super__灞炴€ф寚鍚戠埗绫?             * console.log( Manager.__super__ === Person );    // => true
             */
            inherits: function( Super, protos, staticProtos ) {
                var child;
    
                if ( typeof protos === 'function' ) {
                    child = protos;
                    protos = null;
                } else if ( protos && protos.hasOwnProperty('constructor') ) {
                    child = protos.constructor;
                } else {
                    child = function() {
                        return Super.apply( this, arguments );
                    };
                }
    
                // 澶嶅埗闱欐€佹柟娉?                $.extend( true, child, Super, staticProtos || {} );
    
                /* jshint camelcase: false */
    
                // 璁╁瓙绫荤殑__super__灞炴€ф寚鍚戠埗绫汇€?                child.__super__ = Super.prototype;
    
                // 鏋勫缓铡熷瀷锛屾坊锷犲师鍨嬫柟娉曟垨灞炴€с€?                // 鏆傛椂鐢∣bject.create瀹炵幇銆?                child.prototype = createObject( Super.prototype );
                protos && $.extend( true, child.prototype, protos );
    
                return child;
            },
    
            /**
             * 涓€涓笉锅氢换浣曚簨鎯呯殑鏂规硶銆傚彲浠ョ敤鏉ヨ祴链肩粰榛樿镄刢allback.
             * @method noop
             */
            noop: noop,
    
            /**
             * 杩斿洖涓€涓柊镄勬柟娉曪紝姝ゆ柟娉曞皢宸叉寚瀹氱殑`context`鏉ユ墽琛屻€?             * @grammar Base.bindFn( fn, context ) => Function
             * @method bindFn
             * @example
             * var doSomething = function() {
             *         console.log( this.name );
             *     },
             *     obj = {
             *         name: 'Object Name'
             *     },
             *     aliasFn = Base.bind( doSomething, obj );
             *
             *  aliasFn();    // => Object Name
             *
             */
            bindFn: bindFn,
    
            /**
             * 寮旷敤Console.log濡傛灉瀛桦湪镄勮瘽锛屽惁鍒椤紩鐢ㄤ竴涓猍绌哄嚱鏁发oop](#WebUploader:Base.log)銆?             * @grammar Base.log( args... ) => undefined
             * @method log
             */
            log: (function() {
                if ( window.console ) {
                    return bindFn( console.log, console );
                }
                return noop;
            })(),
    
            nextTick: (function() {
    
                return function( cb ) {
                    setTimeout( cb, 1 );
                };
    
                // @bug 褰撴祻瑙埚櫒涓嶅湪褰揿墠绐楀彛镞跺氨锅滀简銆?                // var next = window.requestAnimationFrame ||
                //     window.webkitRequestAnimationFrame ||
                //     window.mozRequestAnimationFrame ||
                //     function( cb ) {
                //         window.setTimeout( cb, 1000 / 60 );
                //     };
    
                // // fix: Uncaught TypeError: Illegal invocation
                // return bindFn( next, window );
            })(),
    
            /**
             * 琚玔uncurrythis](http://www.2ality.com/2011/11/uncurrying-this.html)镄勬暟缁剆lice鏂规硶銆?             * 灏嗙敤鏉ュ皢闱炴暟缁勫璞¤浆鍖栨垚鏁扮粍瀵硅薄銆?             * @grammar Base.slice( target, start[, end] ) => Array
             * @method slice
             * @example
             * function doSomthing() {
             *     var args = Base.slice( arguments, 1 );
             *     console.log( args );
             * }
             *
             * doSomthing( 'ignored', 'arg2', 'arg3' );    // => Array ["arg2", "arg3"]
             */
            slice: uncurryThis( [].slice ),
    
            /**
             * 鐢熸垚鍞竴镄処D
             * @method guid
             * @grammar Base.guid() => String
             * @grammar Base.guid( prefx ) => String
             */
            guid: (function() {
                var counter = 0;
    
                return function( prefix ) {
                    var guid = (+new Date()).toString( 32 ),
                        i = 0;
    
                    for ( ; i < 5; i++ ) {
                        guid += Math.floor( Math.random() * 65535 ).toString( 32 );
                    }
    
                    return (prefix || 'wu_') + guid + (counter++).toString( 32 );
                };
            })(),
    
            /**
             * 镙煎纺鍖栨枃浠跺ぇ灏? 杈揿嚭鎴愬甫鍗曚綅镄勫瓧绗︿覆
             * @method formatSize
             * @grammar Base.formatSize( size ) => String
             * @grammar Base.formatSize( size, pointLength ) => String
             * @grammar Base.formatSize( size, pointLength, units ) => String
             * @param {Number} size 鏂囦欢澶у皬
             * @param {Number} [pointLength=2] 绮剧‘鍒扮殑灏忔暟镣规暟銆?             * @param {Array} [units=[ 'B', 'K', 'M', 'G', 'TB' ]] 鍗曚綅鏁扮粍銆备粠瀛楄妭锛屽埌鍗冨瓧鑺傦紝涓€鐩村线涓婃寚瀹氥€傚鏋滃崟浣嶆暟缁勯噷闱㈠彧鎸囧畾浜嗗埌浜咾(鍗冨瓧鑺?锛屽悓镞舵枃浠跺ぇ灏忓ぇ浜嶮, 姝ゆ柟娉旷殑杈揿嚭灏呜缮鏄樉绀烘垚澶氩皯K.
             * @example
             * console.log( Base.formatSize( 100 ) );    // => 100B
             * console.log( Base.formatSize( 1024 ) );    // => 1.00K
             * console.log( Base.formatSize( 1024, 0 ) );    // => 1K
             * console.log( Base.formatSize( 1024 * 1024 ) );    // => 1.00M
             * console.log( Base.formatSize( 1024 * 1024 * 1024 ) );    // => 1.00G
             * console.log( Base.formatSize( 1024 * 1024 * 1024, 0, ['B', 'KB', 'MB'] ) );    // => 1024MB
             */
            formatSize: function( size, pointLength, units ) {
                var unit;
    
                units = units || [ 'B', 'K', 'M', 'G', 'TB' ];
    
                while ( (unit = units.shift()) && size > 1024 ) {
                    size = size / 1024;
                }
    
                return (unit === 'B' ? size : size.toFixed( pointLength || 2 )) +
                        unit;
            }
        };
    });
    /**
     * 浜嬩欢澶勭悊绫伙紝鍙互镫珛浣跨敤锛屼篃鍙互镓╁睍缁椤璞′娇鐢ㄣ€?     * @fileOverview Mediator
     */
    define('mediator',[
        'base'
    ], function( Base ) {
        var $ = Base.$,
            slice = [].slice,
            separator = /\s+/,
            protos;
    
        // 镙规嵁鏉′欢杩囨护鍑轰簨浠秇andlers.
        function findHandlers( arr, name, callback, context ) {
            return $.grep( arr, function( handler ) {
                return handler &&
                        (!name || handler.e === name) &&
                        (!callback || handler.cb === callback ||
                        handler.cb._cb === callback) &&
                        (!context || handler.ctx === context);
            });
        }
    
        function eachEvent( events, callback, iterator ) {
            // 涓嶆敮鎸佸璞★紝鍙敮鎸佸涓猠vent鐢ㄧ┖镙奸殧寮€
            $.each( (events || '').split( separator ), function( _, key ) {
                iterator( key, callback );
            });
        }
    
        function triggerHanders( events, args ) {
            var stoped = false,
                i = -1,
                len = events.length,
                handler;
    
            while ( ++i < len ) {
                handler = events[ i ];
    
                if ( handler.cb.apply( handler.ctx2, args ) === false ) {
                    stoped = true;
                    break;
                }
            }
    
            return !stoped;
        }
    
        protos = {
    
            /**
             * 缁戝畾浜嬩欢銆?             *
             * `callback`鏂规硶鍦ㄦ墽琛屾椂锛宎rguments灏嗕细鏉ユ簮浜巘rigger镄勬椂链欐恶甯︾殑鍙傛暟銆傚
             * ```javascript
             * var obj = {};
             *
             * // 浣垮缑obj链変簨浠惰涓?             * Mediator.installTo( obj );
             *
             * obj.on( 'testa', function( arg1, arg2 ) {
             *     console.log( arg1, arg2 ); // => 'arg1', 'arg2'
             * });
             *
             * obj.trigger( 'testa', 'arg1', 'arg2' );
             * ```
             *
             * 濡傛灉`callback`涓紝镆愪竴涓柟娉昤return false`浜嗭紝鍒椤悗缁殑鍏朵粬`callback`閮戒笉浼氲镓ц鍒般€?             * 鍒囦细褰卞搷鍒瘿trigger`鏂规硶镄勮繑锲炲€硷紝涓筚false`銆?             *
             * `on`杩桦彲浠ョ敤鏉ユ坊锷犱竴涓壒娈娄簨浠禶all`, 杩欐牱镓€链夌殑浜嬩欢瑙﹀彂閮戒细鍝嶅簲鍒般€傚悓镞舵绫签callback`涓殑arguments链変竴涓笉鍚屽锛?             * 灏辨槸绗竴涓弬鏁颁负`type`锛岃褰曞綋鍓嶆槸浠€涔堜簨浠跺湪瑙﹀彂銆傛绫签callback`镄勪紭鍏堢骇姣旇剼浣庯紝浼氩啀姝ｅ父`callback`镓ц瀹屽悗瑙﹀彂銆?             * ```javascript
             * obj.on( 'all', function( type, arg1, arg2 ) {
             *     console.log( type, arg1, arg2 ); // => 'testa', 'arg1', 'arg2'
             * });
             * ```
             *
             * @method on
             * @grammar on( name, callback[, context] ) => self
             * @param  {String}   name     浜嬩欢鍚嶏紝鏀寔澶氢釜浜嬩欢鐢ㄧ┖镙奸殧寮€
             * @param  {Function} callback 浜嬩欢澶勭悊鍣?             * @param  {Object}   [context]  浜嬩欢澶勭悊鍣ㄧ殑涓娄笅鏂囥€?             * @return {self} 杩斿洖镊韩锛屾柟渚块摼寮?             * @chainable
             * @class Mediator
             */
            on: function( name, callback, context ) {
                var me = this,
                    set;
    
                if ( !callback ) {
                    return this;
                }
    
                set = this._events || (this._events = []);
    
                eachEvent( name, callback, function( name, callback ) {
                    var handler = { e: name };
    
                    handler.cb = callback;
                    handler.ctx = context;
                    handler.ctx2 = context || me;
                    handler.id = set.length;
    
                    set.push( handler );
                });
    
                return this;
            },
    
            /**
             * 缁戝畾浜嬩欢锛屼笖褰揾andler镓ц瀹屽悗锛岃嚜锷ㄨВ闄ょ粦瀹氥€?             * @method once
             * @grammar once( name, callback[, context] ) => self
             * @param  {String}   name     浜嬩欢鍚?             * @param  {Function} callback 浜嬩欢澶勭悊鍣?             * @param  {Object}   [context]  浜嬩欢澶勭悊鍣ㄧ殑涓娄笅鏂囥€?             * @return {self} 杩斿洖镊韩锛屾柟渚块摼寮?             * @chainable
             */
            once: function( name, callback, context ) {
                var me = this;
    
                if ( !callback ) {
                    return me;
                }
    
                eachEvent( name, callback, function( name, callback ) {
                    var once = function() {
                            me.off( name, once );
                            return callback.apply( context || me, arguments );
                        };
    
                    once._cb = callback;
                    me.on( name, once, context );
                });
    
                return me;
            },
    
            /**
             * 瑙ｉ櫎浜嬩欢缁戝畾
             * @method off
             * @grammar off( [name[, callback[, context] ] ] ) => self
             * @param  {String}   [name]     浜嬩欢鍚?             * @param  {Function} [callback] 浜嬩欢澶勭悊鍣?             * @param  {Object}   [context]  浜嬩欢澶勭悊鍣ㄧ殑涓娄笅鏂囥€?             * @return {self} 杩斿洖镊韩锛屾柟渚块摼寮?             * @chainable
             */
            off: function( name, cb, ctx ) {
                var events = this._events;
    
                if ( !events ) {
                    return this;
                }
    
                if ( !name && !cb && !ctx ) {
                    this._events = [];
                    return this;
                }
    
                eachEvent( name, cb, function( name, cb ) {
                    $.each( findHandlers( events, name, cb, ctx ), function() {
                        delete events[ this.id ];
                    });
                });
    
                return this;
            },
    
            /**
             * 瑙﹀彂浜嬩欢
             * @method trigger
             * @grammar trigger( name[, args...] ) => self
             * @param  {String}   type     浜嬩欢鍚?             * @param  {*} [...] 浠绘剰鍙傛暟
             * @return {Boolean} 濡傛灉handler涓璻eturn false浜嗭紝鍒栾繑锲瀎alse, 鍚﹀垯杩斿洖true
             */
            trigger: function( type ) {
                var args, events, allEvents;
    
                if ( !this._events || !type ) {
                    return this;
                }
    
                args = slice.call( arguments, 1 );
                events = findHandlers( this._events, type );
                allEvents = findHandlers( this._events, 'all' );
    
                return triggerHanders( events, args ) &&
                        triggerHanders( allEvents, arguments );
            }
        };
    
        /**
         * 涓粙钥咃紝瀹冩湰韬槸涓崟渚嬶紝浣嗗彲浠ラ€氲绷[installTo](#WebUploader:Mediator:installTo)鏂规硶锛屼娇浠讳綍瀵硅薄鍏峰浜嬩欢琛屼负銆?         * 涓昏鐩殑鏄礋璐ｆā鍧椾笌妯″潡涔嬮棿镄勫悎浣滐紝闄崭绠钥﹀悎搴︺€?         *
         * @class Mediator
         */
        return $.extend({
    
            /**
             * 鍙互阃氲绷杩欎釜鎺ュ彛锛屼娇浠讳綍瀵硅薄鍏峰浜嬩欢锷熻兘銆?             * @method installTo
             * @param  {Object} obj 闇€瑕佸叿澶囦簨浠惰涓虹殑瀵硅薄銆?             * @return {Object} 杩斿洖obj.
             */
            installTo: function( obj ) {
                return $.extend( obj, protos );
            }
    
        }, protos );
    });
    /**
     * @fileOverview Uploader涓娄紶绫?     */
    define('uploader',[
        'base',
        'mediator'
    ], function( Base, Mediator ) {
    
        var $ = Base.$;
    
        /**
         * 涓娄紶鍏ュ彛绫汇€?         * @class Uploader
         * @constructor
         * @grammar new Uploader( opts ) => Uploader
         * @example
         * var uploader = WebUploader.Uploader({
         *     swf: 'path_of_swf/Uploader.swf',
         *
         *     // 寮€璧峰垎鐗囦笂浼犮€?         *     chunked: true
         * });
         */
        function Uploader( opts ) {
            this.options = $.extend( true, {}, Uploader.options, opts );
            this._init( this.options );
        }
    
        // default Options
        // widgets涓湁鐩稿簲镓╁睍
        Uploader.options = {};
        Mediator.installTo( Uploader.prototype );
    
        // 镓归噺娣诲姞绾懡浠ゅ纺鏂规硶銆?        $.each({
            upload: 'start-upload',
            stop: 'stop-upload',
            getFile: 'get-file',
            getFiles: 'get-files',
            addFile: 'add-file',
            addFiles: 'add-file',
            sort: 'sort-files',
            removeFile: 'remove-file',
            skipFile: 'skip-file',
            retry: 'retry',
            isInProgress: 'is-in-progress',
            makeThumb: 'make-thumb',
            getDimension: 'get-dimension',
            addButton: 'add-btn',
            getRuntimeType: 'get-runtime-type',
            refresh: 'refresh',
            disable: 'disable',
            enable: 'enable',
            reset: 'reset'
        }, function( fn, command ) {
            Uploader.prototype[ fn ] = function() {
                return this.request( command, arguments );
            };
        });
    
        $.extend( Uploader.prototype, {
            state: 'pending',
    
            _init: function( opts ) {
                var me = this;
    
                me.request( 'init', opts, function() {
                    me.state = 'ready';
                    me.trigger('ready');
                });
            },
    
            /**
             * 銮峰彇鎴栬€呰缃甎ploader閰岖疆椤广€?             * @method option
             * @grammar option( key ) => *
             * @grammar option( key, val ) => self
             * @example
             *
             * // 鍒濆钟舵€佸浘鐗囦笂浼犲墠涓崭细铡嬬缉
             * var uploader = new WebUploader.Uploader({
             *     resize: null;
             * });
             *
             * // 淇敼鍚庡浘鐗囦笂浼犲墠锛屽皾璇曞皢锲剧墖铡嬬缉鍒?600 * 1600
             * uploader.options( 'resize', {
             *     width: 1600,
             *     height: 1600
             * });
             */
            option: function( key, val ) {
                var opts = this.options;
    
                // setter
                if ( arguments.length > 1 ) {
    
                    if ( $.isPlainObject( val ) &&
                            $.isPlainObject( opts[ key ] ) ) {
                        $.extend( opts[ key ], val );
                    } else {
                        opts[ key ] = val;
                    }
    
                } else {    // getter
                    return key ? opts[ key ] : opts;
                }
            },
    
            /**
             * 銮峰彇鏂囦欢缁熻淇℃伅銆傝繑锲炰竴涓寘鍚竴涓嬩俊鎭殑瀵硅薄銆?             * * `successNum` 涓娄紶鎴愬姛镄勬枃浠舵暟
             * * `uploadFailNum` 涓娄紶澶辫触镄勬枃浠舵暟
             * * `cancelNum` 琚垹闄ょ殑鏂囦欢鏁?             * * `invalidNum` 镞犳晥镄勬枃浠舵暟
             * * `queueNum` 杩桦湪阒熷垪涓殑鏂囦欢鏁?             * @method getStats
             * @grammar getStats() => Object
             */
            getStats: function() {
                // return this._mgr.getStats.apply( this._mgr, arguments );
                var stats = this.request('get-stats');
    
                return {
                    successNum: stats.numOfSuccess,
    
                    // who care?
                    // queueFailNum: 0,
                    cancelNum: stats.numOfCancel,
                    invalidNum: stats.numOfInvalid,
                    uploadFailNum: stats.numOfUploadFailed,
                    queueNum: stats.numOfQueue
                };
            },
    
            // 闇€瑕侀吨鍐欐鏂规硶鏉ユ潵鏀寔opts.onEvent鍜宨nstance.onEvent镄勫鐞嗗櫒
            trigger: function( type/*, args...*/ ) {
                var args = [].slice.call( arguments, 1 ),
                    opts = this.options,
                    name = 'on' + type.substring( 0, 1 ).toUpperCase() +
                        type.substring( 1 );
    
                if (
                        // 璋幂敤阃氲绷on鏂规硶娉ㄥ唽镄删andler.
                        Mediator.trigger.apply( this, arguments ) === false ||
    
                        // 璋幂敤opts.onEvent
                        $.isFunction( opts[ name ] ) &&
                        opts[ name ].apply( this, args ) === false ||
    
                        // 璋幂敤this.onEvent
                        $.isFunction( this[ name ] ) &&
                        this[ name ].apply( this, args ) === false ||
    
                        // 骞挎挱镓€链塽ploader镄勪簨浠躲€?                        Mediator.trigger.apply( Mediator,
                        [ this, type ].concat( args ) ) === false ) {
    
                    return false;
                }
    
                return true;
            },
    
            // widgets/widget.js灏呜ˉ鍏呮鏂规硶镄勮缁嗘枃妗ｃ€?            request: Base.noop
        });
    
        /**
         * 鍒涘缓Uploader瀹炰緥锛岀瓑鍚屼簬new Uploader( opts );
         * @method create
         * @class Base
         * @static
         * @grammar Base.create( opts ) => Uploader
         */
        Base.create = Uploader.create = function( opts ) {
            return new Uploader( opts );
        };
    
        // 鏆撮湶Uploader锛屽彲浠ラ€氲绷瀹冩潵镓╁睍涓氩姟阃昏緫銆?        Base.Uploader = Uploader;
    
        return Uploader;
    });
    /**
     * @fileOverview Runtime绠＄悊鍣紝璐熻矗Runtime镄勯€夋嫨, 杩炴帴
     */
    define('runtime/runtime',[
        'base',
        'mediator'
    ], function( Base, Mediator ) {
    
        var $ = Base.$,
            factories = {},
    
            // 銮峰彇瀵硅薄镄勭涓€涓猭ey
            getFirstKey = function( obj ) {
                for ( var key in obj ) {
                    if ( obj.hasOwnProperty( key ) ) {
                        return key;
                    }
                }
                return null;
            };
    
        // 鎺ュ彛绫汇€?        function Runtime( options ) {
            this.options = $.extend({
                container: document.body
            }, options );
            this.uid = Base.guid('rt_');
        }
    
        $.extend( Runtime.prototype, {
    
            getContainer: function() {
                var opts = this.options,
                    parent, container;
    
                if ( this._container ) {
                    return this._container;
                }
    
                parent = $( opts.container || document.body );
                container = $( document.createElement('div') );
    
                container.attr( 'id', 'rt_' + this.uid );
                container.css({
                    position: 'absolute',
                    top: '0px',
                    left: '0px',
                    width: '1px',
                    height: '1px',
                    overflow: 'hidden'
                });
    
                parent.append( container );
                parent.addClass('webuploader-container');
                this._container = container;
                return container;
            },
    
            init: Base.noop,
            exec: Base.noop,
    
            destroy: function() {
                if ( this._container ) {
                    this._container.parentNode.removeChild( this.__container );
                }
    
                this.off();
            }
        });
    
        Runtime.orders = 'html5,flash';
    
    
        /**
         * 娣诲姞Runtime瀹炵幇銆?         * @param {String} type    绫诲瀷
         * @param {Runtime} factory 鍏蜂綋Runtime瀹炵幇銆?         */
        Runtime.addRuntime = function( type, factory ) {
            factories[ type ] = factory;
        };
    
        Runtime.hasRuntime = function( type ) {
            return !!(type ? factories[ type ] : getFirstKey( factories ));
        };
    
        Runtime.create = function( opts, orders ) {
            var type, runtime;
    
            orders = orders || Runtime.orders;
            $.each( orders.split( /\s*,\s*/g ), function() {
                if ( factories[ this ] ) {
                    type = this;
                    return false;
                }
            });
    
            type = type || getFirstKey( factories );
    
            if ( !type ) {
                throw new Error('Runtime Error');
            }
    
            runtime = new factories[ type ]( opts );
            return runtime;
        };
    
        Mediator.installTo( Runtime.prototype );
        return Runtime;
    });
    
    /**
     * @fileOverview Runtime绠＄悊鍣紝璐熻矗Runtime镄勯€夋嫨, 杩炴帴
     */
    define('runtime/client',[
        'base',
        'mediator',
        'runtime/runtime'
    ], function( Base, Mediator, Runtime ) {
    
        var cache;
    
        cache = (function() {
            var obj = {};
    
            return {
                add: function( runtime ) {
                    obj[ runtime.uid ] = runtime;
                },
    
                get: function( ruid, standalone ) {
                    var i;
    
                    if ( ruid ) {
                        return obj[ ruid ];
                    }
    
                    for ( i in obj ) {
                        // 链変簺绫诲瀷涓嶈兘閲岖敤锛屾瘮濡俧ilepicker.
                        if ( standalone && obj[ i ].__standalone ) {
                            continue;
                        }
    
                        return obj[ i ];
                    }
    
                    return null;
                },
    
                remove: function( runtime ) {
                    delete obj[ runtime.uid ];
                }
            };
        })();
    
        function RuntimeClient( component, standalone ) {
            var deferred = Base.Deferred(),
                runtime;
    
            this.uid = Base.guid('client_');
    
            // 鍏佽runtime娌℃湁鍒濆鍖栦箣鍓嶏紝娉ㄥ唽涓€浜涙柟娉曞湪鍒濆鍖栧悗镓ц銆?            this.runtimeReady = function( cb ) {
                return deferred.done( cb );
            };
    
            this.connectRuntime = function( opts, cb ) {
    
                // already connected.
                if ( runtime ) {
                    throw new Error('already connected!');
                }
    
                deferred.done( cb );
    
                if ( typeof opts === 'string' && cache.get( opts ) ) {
                    runtime = cache.get( opts );
                }
    
                // 镀廸ilePicker鍙兘镫珛瀛桦湪锛屼笉鑳藉叕鐢ㄣ€?                runtime = runtime || cache.get( null, standalone );
    
                // 闇€瑕佸垱寤?                if ( !runtime ) {
                    runtime = Runtime.create( opts, opts.runtimeOrder );
                    runtime.__promise = deferred.promise();
                    runtime.once( 'ready', deferred.resolve );
                    runtime.init();
                    cache.add( runtime );
                    runtime.__client = 1;
                } else {
                    // 鏉ヨ嚜cache
                    Base.$.extend( runtime.options, opts );
                    runtime.__promise.then( deferred.resolve );
                    runtime.__client++;
                }
    
                standalone && (runtime.__standalone = standalone);
                return runtime;
            };
    
            this.getRuntime = function() {
                return runtime;
            };
    
            this.disconnectRuntime = function() {
                if ( !runtime ) {
                    return;
                }
    
                runtime.__client--;
    
                if ( runtime.__client <= 0 ) {
                    cache.remove( runtime );
                    delete runtime.__promise;
                    runtime.destroy();
                }
    
                runtime = null;
            };
    
            this.exec = function() {
                if ( !runtime ) {
                    return;
                }
    
                var args = Base.slice( arguments );
                component && args.unshift( component );
    
                return runtime.exec.apply( this, args );
            };
    
            this.getRuid = function() {
                return runtime && runtime.uid;
            };
    
            this.destroy = (function( destroy ) {
                return function() {
                    destroy && destroy.apply( this, arguments );
                    this.trigger('destroy');
                    this.off();
                    this.exec('destroy');
                    this.disconnectRuntime();
                };
            })( this.destroy );
        }
    
        Mediator.installTo( RuntimeClient.prototype );
        return RuntimeClient;
    });
    /**
     * @fileOverview Blob
     */
    define('lib/blob',[
        'base',
        'runtime/client'
    ], function( Base, RuntimeClient ) {
    
        function Blob( ruid, source ) {
            var me = this;
    
            me.source = source;
            me.ruid = ruid;
    
            RuntimeClient.call( me, 'Blob' );
    
            this.uid = source.uid || this.uid;
            this.type = source.type || '';
            this.size = source.size || 0;
    
            if ( ruid ) {
                me.connectRuntime( ruid );
            }
        }
    
        Base.inherits( RuntimeClient, {
            constructor: Blob,
    
            slice: function( start, end ) {
                return this.exec( 'slice', start, end );
            },
    
            getSource: function() {
                return this.source;
            }
        });
    
        return Blob;
    });
    /**
     * 涓轰简缁熶竴鍖朏lash镄凢ile鍜孒TML5镄凢ile钥屽瓨鍦ㄣ€?     * 浠ヨ呖浜庤璋幂敤Flash閲岄溃镄凢ile锛屼篃鍙互镀忚皟鐢℉TML5鐗堟湰镄凢ile涓€涓嬨€?     * @fileOverview File
     */
    define('lib/file',[
        'base',
        'lib/blob'
    ], function( Base, Blob ) {
    
        var uid = 1,
            rExt = /\.([^.]+)$/;
    
        function File( ruid, file ) {
            var ext;
    
            Blob.apply( this, arguments );
            this.name = file.name || ('untitled' + uid++);
            ext = rExt.exec( file.name ) ? RegExp.$1.toLowerCase() : '';
    
            // todo 鏀寔鍏朵粬绫诲瀷鏂囦欢镄勮浆鎹€?    
            // 濡傛灉链尘imetype, 浣嗘槸鏂囦欢鍚嶉噷闱㈡病链夋垒鍑哄悗缂€瑙勫緥
            if ( !ext && this.type ) {
                ext = /\/(jpg|jpeg|png|gif|bmp)$/i.exec( this.type ) ?
                        RegExp.$1.toLowerCase() : '';
                this.name += '.' + ext;
            }
    
            // 濡傛灉娌℃湁鎸囧畾mimetype, 浣嗘槸鐭ラ亾鏂囦欢鍚庣紑銆?            if ( !this.type &&  ~'jpg,jpeg,png,gif,bmp'.indexOf( ext ) ) {
                this.type = 'image/' + (ext === 'jpg' ? 'jpeg' : ext);
            }
    
            this.ext = ext;
            this.lastModifiedDate = file.lastModifiedDate ||
                    (new Date()).toLocaleString();
        }
    
        return Base.inherits( Blob, File );
    });
    
    /**
     * @fileOverview 阌栾淇℃伅
     */
    define('lib/filepicker',[
        'base',
        'runtime/client',
        'lib/file'
    ], function( Base, RuntimeClent, File ) {
    
        var $ = Base.$;
    
        function FilePicker( opts ) {
            opts = this.options = $.extend({}, FilePicker.options, opts );
    
            opts.container = $( opts.id );
    
            if ( !opts.container.length ) {
                throw new Error('鎸夐挳鎸囧畾阌栾');
            }
    
            opts.innerHTML = opts.innerHTML || opts.label ||
                    opts.container.html() || '';
    
            opts.button = $( opts.button || document.createElement('div') );
            opts.button.html( opts.innerHTML );
            opts.container.html( opts.button );
    
            RuntimeClent.call( this, 'FilePicker', true );
        }
    
        FilePicker.options = {
            button: null,
            container: null,
            label: null,
            innerHTML: null,
            multiple: true,
            accept: null,
            name: 'file'
        };
    
        Base.inherits( RuntimeClent, {
            constructor: FilePicker,
    
            init: function() {
                var me = this,
                    opts = me.options,
                    button = opts.button;
    
                button.addClass('webuploader-pick');
    
                me.on( 'all', function( type ) {
                    var files;
    
                    switch ( type ) {
                        case 'mouseenter':
                            button.addClass('webuploader-pick-hover');
                            break;
    
                        case 'mouseleave':
                            button.removeClass('webuploader-pick-hover');
                            break;
    
                        case 'change':
                            files = me.exec('getFiles');
                            me.trigger( 'select', $.map( files, function( file ) {
                                file = new File( me.getRuid(), file );
    
                                // 璁板綍鏉ユ簮銆?                                file._refer = opts.container;
                                return file;
                            }), opts.container );
                            break;
                    }
                });
    
                me.connectRuntime( opts, function() {
                    me.refresh();
                    me.exec( 'init', opts );
                    me.trigger('ready');
                });
    
                $( window ).on( 'resize', function() {
                    me.refresh();
                });
            },
    
            refresh: function() {
                var shimContainer = this.getRuntime().getContainer(),
                    button = this.options.button,
                    width = button.outerWidth ?
                            button.outerWidth() : button.width(),
    
                    height = button.outerHeight ?
                            button.outerHeight() : button.height(),
    
                    pos = button.offset();
    
                width && height && shimContainer.css({
                    bottom: 'auto',
                    right: 'auto',
                    width: width + 'px',
                    height: height + 'px'
                }).offset( pos );
            },
    
            enable: function() {
                var btn = this.options.button;
    
                btn.removeClass('webuploader-pick-disable');
                this.refresh();
            },
    
            disable: function() {
                var btn = this.options.button;
    
                this.getRuntime().getContainer().css({
                    top: '-99999px'
                });
    
                btn.addClass('webuploader-pick-disable');
            },
    
            destroy: function() {
                if ( this.runtime ) {
                    this.exec('destroy');
                    this.disconnectRuntime();
                }
            }
        });
    
        return FilePicker;
    });
    
    /**
     * @fileOverview 缁勪欢鍩虹被銆?     */
    define('widgets/widget',[
        'base',
        'uploader'
    ], function( Base, Uploader ) {
    
        var $ = Base.$,
            _init = Uploader.prototype._init,
            IGNORE = {},
            widgetClass = [];
    
        function isArrayLike( obj ) {
            if ( !obj ) {
                return false;
            }
    
            var length = obj.length,
                type = $.type( obj );
    
            if ( obj.nodeType === 1 && length ) {
                return true;
            }
    
            return type === 'array' || type !== 'function' && type !== 'string' &&
                    (length === 0 || typeof length === 'number' && length > 0 &&
                    (length - 1) in obj);
        }
    
        function Widget( uploader ) {
            this.owner = uploader;
            this.options = uploader.options;
        }
    
        $.extend( Widget.prototype, {
    
            init: Base.noop,
    
            // 绫籅ackbone镄勪簨浠剁洃鍚０鏄庯紝鐩戝惉uploader瀹炰緥涓婄殑浜嬩欢
            // widget鐩存帴镞犳硶鐩戝惉浜嬩欢锛屼簨浠跺彧鑳介€氲绷uploader鏉ヤ紶阃?            invoke: function( apiName, args ) {
    
                /*
                    {
                        'make-thumb': 'makeThumb'
                    }
                 */
                var map = this.responseMap;
    
                // 濡傛灉镞燗PI鍝嶅簲澹版槑鍒椤拷鐣?                if ( !map || !(apiName in map) || !(map[ apiName ] in this) ||
                        !$.isFunction( this[ map[ apiName ] ] ) ) {
    
                    return IGNORE;
                }
    
                return this[ map[ apiName ] ].apply( this, args );
    
            },
    
            /**
             * 鍙戦€佸懡浠ゃ€傚綋浼犲叆`callback`鎴栬€卄handler`涓繑锲瀈promise`镞躲€傝繑锲炰竴涓綋镓€链塦handler`涓殑promise閮藉畲鎴愬悗瀹屾垚镄勬柊`promise`銆?             * @method request
             * @grammar request( command, args ) => * | Promise
             * @grammar request( command, args, callback ) => Promise
             * @for  Uploader
             */
            request: function() {
                return this.owner.request.apply( this.owner, arguments );
            }
        });
    
        // 镓╁睍Uploader.
        $.extend( Uploader.prototype, {
    
            // 瑕嗗啓_init鐢ㄦ潵鍒濆鍖杦idgets
            _init: function() {
                var me = this,
                    widgets = me._widgets = [];
    
                $.each( widgetClass, function( _, klass ) {
                    widgets.push( new klass( me ) );
                });
    
                return _init.apply( me, arguments );
            },
    
            request: function( apiName, args, callback ) {
                var i = 0,
                    widgets = this._widgets,
                    len = widgets.length,
                    rlts = [],
                    dfds = [],
                    widget, rlt, promise, key;
    
                args = isArrayLike( args ) ? args : [ args ];
    
                for ( ; i < len; i++ ) {
                    widget = widgets[ i ];
                    rlt = widget.invoke( apiName, args );
    
                    if ( rlt !== IGNORE ) {
    
                        // Deferred瀵硅薄
                        if ( Base.isPromise( rlt ) ) {
                            dfds.push( rlt );
                        } else {
                            rlts.push( rlt );
                        }
                    }
                }
    
                // 濡傛灉链塩allback锛屽垯鐢ㄥ纾姝ユ柟寮忋€?                if ( callback || dfds.length ) {
                    promise = Base.when.apply( Base, dfds );
                    key = promise.pipe ? 'pipe' : 'then';
    
                    // 寰堥吨瑕佷笉鑳藉垹闄ゃ€傚垹闄や简浼氭寰幆銆?                    // 淇濊瘉镓ц椤哄簭銆傝callback镐绘槸鍦ㄤ笅涓€涓猼ick涓墽琛屻€?                    return promise[ key ](function() {
                                var deferred = Base.Deferred(),
                                    args = arguments;
    
                                setTimeout(function() {
                                    deferred.resolve.apply( deferred, args );
                                }, 1 );
    
                                return deferred.promise();
                            })[ key ]( callback || Base.noop );
                } else {
                    return rlts[ 0 ];
                }
            }
        });
    
        /**
         * 娣诲姞缁勪欢
         * @param  {object} widgetProto 缁勪欢铡熷瀷锛屾瀯阃犲嚱鏁伴€氲绷constructor灞炴€у畾涔?         * @param  {object} responseMap API鍚岖О涓庡嚱鏁板疄鐜扮殑鏄犲皠
         * @example
         *     Uploader.register( {
         *         init: function( options ) {},
         *         makeThumb: function() {}
         *     }, {
         *         'make-thumb': 'makeThumb'
         *     } );
         */
        Uploader.register = Widget.register = function( responseMap, widgetProto ) {
            var map = { init: 'init' },
                klass;
    
            if ( arguments.length === 1 ) {
                widgetProto = responseMap;
                widgetProto.responseMap = map;
            } else {
                widgetProto.responseMap = $.extend( map, responseMap );
            }
    
            klass = Base.inherits( Widget, widgetProto );
            widgetClass.push( klass );
    
            return klass;
        };
    
        return Widget;
    });
    /**
     * @fileOverview 鏂囦欢阃夋嫨鐩稿叧
     */
    define('widgets/filepicker',[
        'base',
        'uploader',
        'lib/filepicker',
        'widgets/widget'
    ], function( Base, Uploader, FilePicker ) {
        var $ = Base.$;
    
        $.extend( Uploader.options, {
    
            /**
             * @property {Selector | Object} [pick=undefined]
             * @namespace options
             * @for Uploader
             * @description 鎸囧畾阃夋嫨鏂囦欢镄勬寜阍鍣紝涓嶆寚瀹氩垯涓嶅垱寤烘寜阍€?             *
             * * `id` {Seletor} 鎸囧畾阃夋嫨鏂囦欢镄勬寜阍鍣紝涓嶆寚瀹氩垯涓嶅垱寤烘寜阍€?             * * `label` {String} 璇烽噰鐢?`innerHTML` 浠ｆ浛
             * * `innerHTML` {String} 鎸囧畾鎸夐挳鏂囧瓧銆备笉鎸囧畾镞朵紭鍏堜粠鎸囧畾镄勫鍣ㄤ腑鐪嬫槸鍚﹁嚜甯︽枃瀛椼€?             * * `multiple` {Boolean} 鏄惁寮€璧峰悓镞堕€夋嫨澶氢釜鏂囦欢鑳藉姏銆?             */
            pick: null,
    
            /**
             * @property {Arroy} [accept=null]
             * @namespace options
             * @for Uploader
             * @description 鎸囧畾鎺ュ弹鍝簺绫诲瀷镄勬枃浠躲€?鐢变簬鐩墠杩樻湁ext杞珐imeType琛紝镓€浠ヨ繖閲岄渶瑕佸垎寮€鎸囧畾銆?             *
             * * `title` {String} 鏂囧瓧鎻忚堪
             * * `extensions` {String} 鍏佽镄勬枃浠跺悗缂€锛屼笉甯︾偣锛屽涓敤阃楀佛鍒嗗壊銆?             * * `mimeTypes` {String} 澶氢釜鐢ㄩ€楀佛鍒嗗壊銆?             *
             * 濡傦细
             *
             * ```
             * {
             *     title: 'Images',
             *     extensions: 'gif,jpg,jpeg,bmp,png',
             *     mimeTypes: 'image/*'
             * }
             * ```
             */
            accept: null/*{
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            }*/
        });
    
        return Uploader.register({
            'add-btn': 'addButton',
            refresh: 'refresh',
            disable: 'disable',
            enable: 'enable'
        }, {
    
            init: function( opts ) {
                this.pickers = [];
                return opts.pick && this.addButton( opts.pick );
            },
    
            refresh: function() {
                $.each( this.pickers, function() {
                    this.refresh();
                });
            },
    
            /**
             * @method addButton
             * @for Uploader
             * @grammar addButton( pick ) => Promise
             * @description
             * 娣诲姞鏂囦欢阃夋嫨鎸夐挳锛屽鏋滀竴涓寜阍笉澶燂紝闇€瑕佽皟鐢ㄦ鏂规硶鏉ユ坊锷犮€傚弬鏁拌窡[options.pick](#WebUploader:Uploader:options)涓€镊淬€?             * @example
             * uploader.addButton({
             *     id: '#btnContainer',
             *     innerHTML: '阃夋嫨鏂囦欢'
             * });
             */
            addButton: function( pick ) {
                var me = this,
                    opts = me.options,
                    accept = opts.accept,
                    options, picker, deferred;
    
                if ( !pick ) {
                    return;
                }
    
                deferred = Base.Deferred();
                $.isPlainObject( pick ) || (pick = {
                    id: pick
                });
    
                options = $.extend({}, pick, {
                    accept: $.isPlainObject( accept ) ? [ accept ] : accept,
                    swf: opts.swf,
                    runtimeOrder: opts.runtimeOrder
                });
    
                picker = new FilePicker( options );
    
                picker.once( 'ready', deferred.resolve );
                picker.on( 'select', function( files ) {
                    me.owner.request( 'add-file', [ files ]);
                });
                picker.init();
    
                this.pickers.push( picker );
    
                return deferred.promise();
            },
    
            disable: function() {
                $.each( this.pickers, function() {
                    this.disable();
                });
            },
    
            enable: function() {
                $.each( this.pickers, function() {
                    this.enable();
                });
            }
        });
    });
    /**
     * @fileOverview Image
     */
    define('lib/image',[
        'base',
        'runtime/client',
        'lib/blob'
    ], function( Base, RuntimeClient, Blob ) {
        var $ = Base.$;
    
        // 鏋勯€犲櫒銆?        function Image( opts ) {
            this.options = $.extend({}, Image.options, opts );
            RuntimeClient.call( this, 'Image' );
    
            this.on( 'load', function() {
                this._info = this.exec('info');
                this._meta = this.exec('meta');
            });
        }
    
        // 榛樿阃夐」銆?        Image.options = {
    
            // 榛樿镄勫浘鐗囧鐞呜川閲?            quality: 90,
    
            // 鏄惁瑁佸壀
            crop: false,
    
            // 鏄惁淇濈暀澶撮儴淇℃伅
            preserveHeaders: true,
    
            // 鏄惁鍏佽鏀惧ぇ銆?            allowMagnify: true
        };
    
        // 缁ф圹RuntimeClient.
        Base.inherits( RuntimeClient, {
            constructor: Image,
    
            info: function( val ) {
    
                // setter
                if ( val ) {
                    this._info = val;
                    return this;
                }
    
                // getter
                return this._info;
            },
    
            meta: function( val ) {
    
                // setter
                if ( val ) {
                    this._meta = val;
                    return this;
                }
    
                // getter
                return this._meta;
            },
    
            loadFromBlob: function( blob ) {
                var me = this,
                    ruid = blob.getRuid();
    
                this.connectRuntime( ruid, function() {
                    me.exec( 'init', me.options );
                    me.exec( 'loadFromBlob', blob );
                });
            },
    
            resize: function() {
                var args = Base.slice( arguments );
                return this.exec.apply( this, [ 'resize' ].concat( args ) );
            },
    
            getAsDataUrl: function( type ) {
                return this.exec( 'getAsDataUrl', type );
            },
    
            getAsBlob: function( type ) {
                var blob = this.exec( 'getAsBlob', type );
    
                return new Blob( this.getRuid(), blob );
            }
        });
    
        return Image;
    });
    /**
     * @fileOverview 锲剧墖鎿崭綔, 璐熻矗棰勮锲剧墖鍜屼笂浼犲墠铡嬬缉锲剧墖
     */
    define('widgets/image',[
        'base',
        'uploader',
        'lib/image',
        'widgets/widget'
    ], function( Base, Uploader, Image ) {
    
        var $ = Base.$,
            throttle;
    
        // 镙规嵁瑕佸鐞嗙殑鏂囦欢澶у皬鏉ヨ妭娴侊紝涓€娆′笉鑳藉鐞嗗お澶泛紝浼氩崱銆?        throttle = (function( max ) {
            var occupied = 0,
                waiting = [],
                tick = function() {
                    var item;
    
                    while ( waiting.length && occupied < max ) {
                        item = waiting.shift();
                        occupied += item[ 0 ];
                        item[ 1 ]();
                    }
                };
    
            return function( emiter, size, cb ) {
                waiting.push([ size, cb ]);
                emiter.once( 'destroy', function() {
                    occupied -= size;
                    setTimeout( tick, 1 );
                });
                setTimeout( tick, 1 );
            };
        })( 5 * 1024 * 1024 );
    
        $.extend( Uploader.options, {
    
            /**
             * @property {Object} [thumb]
             * @namespace options
             * @for Uploader
             * @description 閰岖疆鐢熸垚缂╃暐锲剧殑阃夐」銆?             *
             * 榛樿涓猴细
             *
             * ```javascript
             * {
             *     width: 110,
             *     height: 110,
             *
             *     // 锲剧墖璐ㄩ噺锛屽彧链塼ype涓筚image/jpeg`镄勬椂链欐墠链夋晥銆?             *     quality: 70,
             *
             *     // 鏄惁鍏佽鏀惧ぇ锛屽鏋沧兂瑕佺敓鎴愬皬锲剧殑镞跺€欎笉澶辩湡锛屾阃夐」搴旇璁剧疆涓篺alse.
             *     allowMagnify: true,
             *
             *     // 鏄惁鍏佽瑁佸壀銆?             *     crop: true,
             *
             *     // 鏄惁淇濈暀澶撮儴meta淇℃伅銆?             *     preserveHeaders: false,
             *
             *     // 涓虹┖镄勮瘽鍒欎缭鐣椤师链夊浘鐗囨牸寮忋€?             *     // 鍚﹀垯寮哄埗杞崲鎴愭寚瀹氱殑绫诲瀷銆?             *     type: 'image/jpeg'
             * }
             * ```
             */
            thumb: {
                width: 110,
                height: 110,
                quality: 70,
                allowMagnify: true,
                crop: true,
                preserveHeaders: false,
    
                // 涓虹┖镄勮瘽鍒欎缭鐣椤师链夊浘鐗囨牸寮忋€?                // 鍚﹀垯寮哄埗杞崲鎴愭寚瀹氱殑绫诲瀷銆?                // IE 8涓嬮溃 base64 澶у皬涓嶈兘瓒呰绷 32K 鍚﹀垯棰勮澶辫触锛岃€岄潪 jpeg 缂栫爜镄勫浘鐗囧緢鍙?                // 鑳戒细瓒呰绷 32k, 镓€浠ヨ繖閲岃缃垚棰勮镄勬椂链欓兘鏄?image/jpeg
                type: 'image/jpeg'
            },
    
            /**
             * @property {Object} [compress]
             * @namespace options
             * @for Uploader
             * @description 閰岖疆铡嬬缉镄勫浘鐗囩殑阃夐」銆傚鏋沧阃夐」涓筚false`, 鍒椤浘鐗囧湪涓娄紶鍓崭笉杩涜铡嬬缉銆?             *
             * 榛樿涓猴细
             *
             * ```javascript
             * {
             *     width: 1600,
             *     height: 1600,
             *
             *     // 锲剧墖璐ㄩ噺锛屽彧链塼ype涓筚image/jpeg`镄勬椂链欐墠链夋晥銆?             *     quality: 90,
             *
             *     // 鏄惁鍏佽鏀惧ぇ锛屽鏋沧兂瑕佺敓鎴愬皬锲剧殑镞跺€欎笉澶辩湡锛屾阃夐」搴旇璁剧疆涓篺alse.
             *     allowMagnify: false,
             *
             *     // 鏄惁鍏佽瑁佸壀銆?             *     crop: false,
             *
             *     // 鏄惁淇濈暀澶撮儴meta淇℃伅銆?             *     preserveHeaders: true
             * }
             * ```
             */
            compress: {
                width: 1600,
                height: 1600,
                quality: 90,
                allowMagnify: false,
                crop: false,
                preserveHeaders: true
            }
        });
    
        return Uploader.register({
            'make-thumb': 'makeThumb',
            'before-send-file': 'compressImage'
        }, {
    
    
            /**
             * 鐢熸垚缂╃暐锲撅紝姝よ绷绋嬩负寮傛锛屾墍浠ラ渶瑕佷紶鍏callback`銆?             * 阃氩父鎯呭喌鍦ㄥ浘鐗囧姞鍏ラ槦閲屽悗璋幂敤姝ゆ柟娉曟潵鐢熸垚棰勮锲句互澧炲己浜や簰鏁堟灉銆?             *
             * `callback`涓彲浠ユ帴鏀跺埌涓や釜鍙傛暟銆?             * * 绗竴涓负error锛屽鏋灭敓鎴愮缉鐣ュ浘链夐敊璇紝姝rror灏嗕负鐪熴€?             * * 绗簩涓负ret, 缂╃暐锲剧殑Data URL链笺€?             *
             * **娉ㄦ剰**
             * Date URL鍦↖E6/7涓笉鏀寔锛屾墍浠ヤ笉鐢ㄨ皟鐢ㄦ鏂规硶浜嗭紝鐩存帴鏄剧ず涓€寮犳殏涓嶆敮鎸侀瑙埚浘鐗囧ソ浜嗐€?             *
             *
             * @method makeThumb
             * @grammar makeThumb( file, callback ) => undefined
             * @grammar makeThumb( file, callback, width, height ) => undefined
             * @for Uploader
             * @example
             *
             * uploader.on( 'fileQueued', function( file ) {
             *     var $li = ...;
             *
             *     uploader.makeThumb( file, function( error, ret ) {
             *         if ( error ) {
             *             $li.text('棰勮阌栾');
             *         } else {
             *             $li.append('<img alt="" src="' + ret + '" />');
             *         }
             *     });
             *
             * });
             */
            makeThumb: function( file, cb, width, height ) {
                var opts, image;
    
                file = this.request( 'get-file', file );
    
                // 鍙瑙埚浘鐗囨牸寮忋€?                if ( !file.type.match( /^image/ ) ) {
                    cb( true );
                    return;
                }
    
                opts = $.extend({}, this.options.thumb );
    
                // 濡傛灉浼犲叆镄勬槸object.
                if ( $.isPlainObject( width ) ) {
                    opts = $.extend( opts, width );
                    width = null;
                }
    
                width = width || opts.width;
                height = height || opts.height;
    
                image = new Image( opts );
    
                image.once( 'load', function() {
                    file._info = file._info || image.info();
                    file._meta = file._meta || image.meta();
                    image.resize( width, height );
                });
    
                image.once( 'complete', function() {
                    cb( false, image.getAsDataUrl( opts.type ) );
                    image.destroy();
                });
    
                image.once( 'error', function() {
                    cb( true );
                    image.destroy();
                });
    
                throttle( image, file.source.size, function() {
                    file._info && image.info( file._info );
                    file._meta && image.meta( file._meta );
                    image.loadFromBlob( file.source );
                });
            },
    
            compressImage: function( file ) {
                var opts = this.options.compress || this.options.resize,
                    compressSize = opts && opts.compressSize || 300 * 1024,
                    image, deferred;
    
                file = this.request( 'get-file', file );
    
                // 鍙瑙埚浘鐗囨牸寮忋€?                if ( !opts || !~'image/jpeg,image/jpg'.indexOf( file.type ) ||
                        file.size < compressSize ||
                        file._compressed ) {
                    return;
                }
    
                opts = $.extend({}, opts );
                deferred = Base.Deferred();
    
                image = new Image( opts );
    
                deferred.always(function() {
                    image.destroy();
                    image = null;
                });
                image.once( 'error', deferred.reject );
                image.once( 'load', function() {
                    file._info = file._info || image.info();
                    file._meta = file._meta || image.meta();
                    image.resize( opts.width, opts.height );
                });
    
                image.once( 'complete', function() {
                    var blob, size;
    
                    // 绉诲姩绔?UC / qq 娴忚鍣ㄧ殑镞犲浘妯″纺涓?                    // ctx.getImageData 澶勭悊澶у浘镄勬椂链欎细鎶?Exception
                    // INDEX_SIZE_ERR: DOM Exception 1
                    try {
                        blob = image.getAsBlob( opts.type );
    
                        size = file.size;
    
                        // 濡傛灉铡嬬缉鍚庯紝姣斿师鏉ヨ缮澶у垯涓岖敤铡嬬缉鍚庣殑銆?                        if ( blob.size < size ) {
                            // file.source.destroy && file.source.destroy();
                            file.source = blob;
                            file.size = blob.size;
    
                            file.trigger( 'resize', blob.size, size );
                        }
    
                        // 镙囱锛岄伩鍏嶉吨澶嶅帇缂┿€?                        file._compressed = true;
                        deferred.resolve();
                    } catch ( e ) {
                        // 鍑洪敊浜嗙洿鎺ョ户缁紝璁╁叾涓娄紶铡熷锲剧墖
                        deferred.resolve();
                    }
                });
    
                file._info && image.info( file._info );
                file._meta && image.meta( file._meta );
    
                image.loadFromBlob( file.source );
                return deferred.promise();
            }
        });
    });
    /**
     * @fileOverview 鏂囦欢灞炴€у皝瑁?     */
    define('file',[
        'base',
        'mediator'
    ], function( Base, Mediator ) {
    
        var $ = Base.$,
            idPrefix = 'WU_FILE_',
            idSuffix = 0,
            rExt = /\.([^.]+)$/,
            statusMap = {};
    
        function gid() {
            return idPrefix + idSuffix++;
        }
    
        /**
         * 鏂囦欢绫?         * @class File
         * @constructor 鏋勯€犲嚱鏁?         * @grammar new File( source ) => File
         * @param {Lib.File} source [lib.File](#Lib.File)瀹炰緥, 姝ource瀵硅薄鏄甫链塕untime淇℃伅镄勩€?         */
        function WUFile( source ) {
    
            /**
             * 鏂囦欢鍚嶏紝鍖呮嫭镓╁睍鍚嶏纸鍚庣紑锛?             * @property name
             * @type {string}
             */
            this.name = source.name || 'Untitled';
    
            /**
             * 鏂囦欢浣撶Н锛埚瓧鑺傦级
             * @property size
             * @type {uint}
             * @default 0
             */
            this.size = source.size || 0;
    
            /**
             * 鏂囦欢MIMETYPE绫诲瀷锛屼笌鏂囦欢绫诲瀷镄勫搴斿叧绯昏鍙傝€僛http://t.cn/z8ZnFny](http://t.cn/z8ZnFny)
             * @property type
             * @type {string}
             * @default 'application'
             */
            this.type = source.type || 'application';
    
            /**
             * 鏂囦欢链€鍚庝慨鏀规棩链?             * @property lastModifiedDate
             * @type {int}
             * @default 褰揿墠镞堕棿鎴?             */
            this.lastModifiedDate = source.lastModifiedDate || (new Date() * 1);
    
            /**
             * 鏂囦欢ID锛屾疮涓璞″叿链夊敮涓€ID锛屼笌鏂囦欢鍚嶆棤鍏?             * @property id
             * @type {string}
             */
            this.id = gid();
    
            /**
             * 鏂囦欢镓╁睍鍚嶏紝阃氲绷鏂囦欢鍚嶈幏鍙栵紝渚嫔test.png镄勬墿灞曞悕涓簆ng
             * @property ext
             * @type {string}
             */
            this.ext = rExt.exec( this.name ) ? RegExp.$1 : '';
    
    
            /**
             * 钟舵€佹枃瀛楄鏄庛€傚湪涓嶅悓镄剆tatus璇涓嬫湁涓嶅悓镄勭敤阃斻€?             * @property statusText
             * @type {string}
             */
            this.statusText = '';
    
            // 瀛桦偍鏂囦欢钟舵€侊紝阒叉阃氲绷灞炴€х洿鎺ヤ慨鏀?            statusMap[ this.id ] = WUFile.Status.INITED;
    
            this.source = source;
            this.loaded = 0;
    
            this.on( 'error', function( msg ) {
                this.setStatus( WUFile.Status.ERROR, msg );
            });
        }
    
        $.extend( WUFile.prototype, {
    
            /**
             * 璁剧疆钟舵€侊紝钟舵€佸彉鍖栨椂浼氲Е鍙慲change`浜嬩欢銆?             * @method setStatus
             * @grammar setStatus( status[, statusText] );
             * @param {File.Status|String} status [鏂囦欢钟舵€佸€糫(#WebUploader:File:File.Status)
             * @param {String} [statusText=''] 钟舵€佽鏄庯紝甯稿湪error镞朵娇鐢紝鐢╤ttp, abort,server绛夋潵镙囱鏄敱浜庝粈涔埚师锲犲镊存枃浠堕敊璇€?             */
            setStatus: function( status, text ) {
    
                var prevStatus = statusMap[ this.id ];
    
                typeof text !== 'undefined' && (this.statusText = text);
    
                if ( status !== prevStatus ) {
                    statusMap[ this.id ] = status;
                    /**
                     * 鏂囦欢钟舵€佸彉鍖?                     * @event statuschange
                     */
                    this.trigger( 'statuschange', status, prevStatus );
                }
    
            },
    
            /**
             * 銮峰彇鏂囦欢钟舵€?             * @return {File.Status}
             * @example
                     鏂囦欢钟舵€佸叿浣揿寘鎷互涓嫔嚑绉岖被鍨嬶细
                     {
                         // 鍒濆鍖?                        INITED:     0,
                        // 宸插叆阒熷垪
                        QUEUED:     1,
                        // 姝ｅ湪涓娄紶
                        PROGRESS:     2,
                        // 涓娄紶鍑洪敊
                        ERROR:         3,
                        // 涓娄紶鎴愬姛
                        COMPLETE:     4,
                        // 涓娄紶鍙栨秷
                        CANCELLED:     5
                    }
             */
            getStatus: function() {
                return statusMap[ this.id ];
            },
    
            /**
             * 銮峰彇鏂囦欢铡熷淇℃伅銆?             * @return {*}
             */
            getSource: function() {
                return this.source;
            },
    
            destory: function() {
                delete statusMap[ this.id ];
            }
        });
    
        Mediator.installTo( WUFile.prototype );
    
        /**
         * 鏂囦欢钟舵€佸€硷紝鍏蜂綋鍖呮嫭浠ヤ笅鍑犵绫诲瀷锛?         * * `inited` 鍒濆钟舵€?         * * `queued` 宸茬粡杩涘叆阒熷垪, 绛夊緟涓娄紶
         * * `progress` 涓娄紶涓?         * * `complete` 涓娄紶瀹屾垚銆?         * * `error` 涓娄紶鍑洪敊锛屽彲閲嶈瘯
         * * `interrupt` 涓娄紶涓柇锛屽彲缁紶銆?         * * `invalid` 鏂囦欢涓嶅悎镙硷紝涓嶈兘閲嶈瘯涓娄紶銆备细镊姩浠庨槦鍒椾腑绉婚櫎銆?         * * `cancelled` 鏂囦欢琚Щ闄ゃ€?         * @property {Object} Status
         * @namespace File
         * @class File
         * @static
         */
        WUFile.Status = {
            INITED:     'inited',    // 鍒濆钟舵€?            QUEUED:     'queued',    // 宸茬粡杩涘叆阒熷垪, 绛夊緟涓娄紶
            PROGRESS:   'progress',    // 涓娄紶涓?            ERROR:      'error',    // 涓娄紶鍑洪敊锛屽彲閲嶈瘯
            COMPLETE:   'complete',    // 涓娄紶瀹屾垚銆?            CANCELLED:  'cancelled',    // 涓娄紶鍙栨秷銆?            INTERRUPT:  'interrupt',    // 涓娄紶涓柇锛屽彲缁紶銆?            INVALID:    'invalid'    // 鏂囦欢涓嶅悎镙硷紝涓嶈兘閲嶈瘯涓娄紶銆?        };
    
        return WUFile;
    });
    
    /**
     * @fileOverview 鏂囦欢阒熷垪
     */
    define('queue',[
        'base',
        'mediator',
        'file'
    ], function( Base, Mediator, WUFile ) {
    
        var $ = Base.$,
            STATUS = WUFile.Status;
    
        /**
         * 鏂囦欢阒熷垪, 鐢ㄦ潵瀛桦偍鍚勪釜钟舵€佷腑镄勬枃浠躲€?         * @class Queue
         * @extends Mediator
         */
        function Queue() {
    
            /**
             * 缁熻鏂囦欢鏁般€?             * * `numOfQueue` 阒熷垪涓殑鏂囦欢鏁般€?             * * `numOfSuccess` 涓娄紶鎴愬姛镄勬枃浠舵暟
             * * `numOfCancel` 琚Щ闄ょ殑鏂囦欢鏁?             * * `numOfProgress` 姝ｅ湪涓娄紶涓殑鏂囦欢鏁?             * * `numOfUploadFailed` 涓娄紶阌栾镄勬枃浠舵暟銆?             * * `numOfInvalid` 镞犳晥镄勬枃浠舵暟銆?             * @property {Object} stats
             */
            this.stats = {
                numOfQueue: 0,
                numOfSuccess: 0,
                numOfCancel: 0,
                numOfProgress: 0,
                numOfUploadFailed: 0,
                numOfInvalid: 0
            };
    
            // 涓娄紶阒熷垪锛屼粎鍖呮嫭绛夊緟涓娄紶镄勬枃浠?            this._queue = [];
    
            // 瀛桦偍镓€链夋枃浠?            this._map = {};
        }
    
        $.extend( Queue.prototype, {
    
            /**
             * 灏嗘柊鏂囦欢锷犲叆瀵归槦鍒楀熬閮?             *
             * @method append
             * @param  {File} file   鏂囦欢瀵硅薄
             */
            append: function( file ) {
                this._queue.push( file );
                this._fileAdded( file );
                return this;
            },
    
            /**
             * 灏嗘柊鏂囦欢锷犲叆瀵归槦鍒楀ご閮?             *
             * @method prepend
             * @param  {File} file   鏂囦欢瀵硅薄
             */
            prepend: function( file ) {
                this._queue.unshift( file );
                this._fileAdded( file );
                return this;
            },
    
            /**
             * 銮峰彇鏂囦欢瀵硅薄
             *
             * @method getFile
             * @param  {String} fileId   鏂囦欢ID
             * @return {File}
             */
            getFile: function( fileId ) {
                if ( typeof fileId !== 'string' ) {
                    return fileId;
                }
                return this._map[ fileId ];
            },
    
            /**
             * 浠庨槦鍒椾腑鍙栧嚭涓€涓寚瀹氱姸镐佺殑鏂囦欢銆?             * @grammar fetch( status ) => File
             * @method fetch
             * @param {String} status [鏂囦欢钟舵€佸€糫(#WebUploader:File:File.Status)
             * @return {File} [File](#WebUploader:File)
             */
            fetch: function( status ) {
                var len = this._queue.length,
                    i, file;
    
                status = status || STATUS.QUEUED;
    
                for ( i = 0; i < len; i++ ) {
                    file = this._queue[ i ];
    
                    if ( status === file.getStatus() ) {
                        return file;
                    }
                }
    
                return null;
            },
    
            /**
             * 瀵归槦鍒楄繘琛屾帓搴忥紝鑳藉鎺у埗鏂囦欢涓娄紶椤哄簭銆?             * @grammar sort( fn ) => undefined
             * @method sort
             * @param {Function} fn 鎺掑簭鏂规硶
             */
            sort: function( fn ) {
                if ( typeof fn === 'function' ) {
                    this._queue.sort( fn );
                }
            },
    
            /**
             * 銮峰彇鎸囧畾绫诲瀷镄勬枃浠跺垪琛? 鍒楄〃涓疮涓€涓垚锻树负[File](#WebUploader:File)瀵硅薄銆?             * @grammar getFiles( [status1[, status2 ...]] ) => Array
             * @method getFiles
             * @param {String} [status] [鏂囦欢钟舵€佸€糫(#WebUploader:File:File.Status)
             */
            getFiles: function() {
                var sts = [].slice.call( arguments, 0 ),
                    ret = [],
                    i = 0,
                    len = this._queue.length,
                    file;
    
                for ( ; i < len; i++ ) {
                    file = this._queue[ i ];
    
                    if ( sts.length && !~$.inArray( file.getStatus(), sts ) ) {
                        continue;
                    }
    
                    ret.push( file );
                }
    
                return ret;
            },
    
            _fileAdded: function( file ) {
                var me = this,
                    existing = this._map[ file.id ];
    
                if ( !existing ) {
                    this._map[ file.id ] = file;
    
                    file.on( 'statuschange', function( cur, pre ) {
                        me._onFileStatusChange( cur, pre );
                    });
                }
    
                file.setStatus( STATUS.QUEUED );
            },
    
            _onFileStatusChange: function( curStatus, preStatus ) {
                var stats = this.stats;
    
                switch ( preStatus ) {
                    case STATUS.PROGRESS:
                        stats.numOfProgress--;
                        break;
    
                    case STATUS.QUEUED:
                        stats.numOfQueue --;
                        break;
    
                    case STATUS.ERROR:
                        stats.numOfUploadFailed--;
                        break;
    
                    case STATUS.INVALID:
                        stats.numOfInvalid--;
                        break;
                }
    
                switch ( curStatus ) {
                    case STATUS.QUEUED:
                        stats.numOfQueue++;
                        break;
    
                    case STATUS.PROGRESS:
                        stats.numOfProgress++;
                        break;
    
                    case STATUS.ERROR:
                        stats.numOfUploadFailed++;
                        break;
    
                    case STATUS.COMPLETE:
                        stats.numOfSuccess++;
                        break;
    
                    case STATUS.CANCELLED:
                        stats.numOfCancel++;
                        break;
    
                    case STATUS.INVALID:
                        stats.numOfInvalid++;
                        break;
                }
            }
    
        });
    
        Mediator.installTo( Queue.prototype );
    
        return Queue;
    });
    /**
     * @fileOverview 阒熷垪
     */
    define('widgets/queue',[
        'base',
        'uploader',
        'queue',
        'file',
        'lib/file',
        'runtime/client',
        'widgets/widget'
    ], function( Base, Uploader, Queue, WUFile, File, RuntimeClient ) {
    
        var $ = Base.$,
            rExt = /\.\w+$/,
            Status = WUFile.Status;
    
        return Uploader.register({
            'sort-files': 'sortFiles',
            'add-file': 'addFiles',
            'get-file': 'getFile',
            'fetch-file': 'fetchFile',
            'get-stats': 'getStats',
            'get-files': 'getFiles',
            'remove-file': 'removeFile',
            'retry': 'retry',
            'reset': 'reset',
            'accept-file': 'acceptFile'
        }, {
    
            init: function( opts ) {
                var me = this,
                    deferred, len, i, item, arr, accept, runtime;
    
                if ( $.isPlainObject( opts.accept ) ) {
                    opts.accept = [ opts.accept ];
                }
    
                // accept涓殑涓敓鎴愬尮閰嶆鍒欍€?                if ( opts.accept ) {
                    arr = [];
    
                    for ( i = 0, len = opts.accept.length; i < len; i++ ) {
                        item = opts.accept[ i ].extensions;
                        item && arr.push( item );
                    }
    
                    if ( arr.length ) {
                        accept = '\\.' + arr.join(',')
                                .replace( /,/g, '$|\\.' )
                                .replace( /\*/g, '.*' ) + '$';
                    }
    
                    me.accept = new RegExp( accept, 'i' );
                }
    
                me.queue = new Queue();
                me.stats = me.queue.stats;
    
                // 濡傛灉褰揿墠涓嶆槸html5杩愯镞讹紝闾ｅ氨绠椾简銆?                // 涓嶆墽琛屽悗缁搷浣?                if ( this.request('predict-runtime-type') !== 'html5' ) {
                    return;
                }
    
                // 鍒涘缓涓€涓?html5 杩愯镞剁殑 placeholder
                // 浠ヨ呖浜庡閮ㄦ坊锷犲师鐢?File 瀵硅薄镄勬椂链栾兘姝ｇ‘鍖呰９涓€涓嬩緵 webuploader 浣跨敤銆?                deferred = Base.Deferred();
                runtime = new RuntimeClient('Placeholder');
                runtime.connectRuntime({
                    runtimeOrder: 'html5'
                }, function() {
                    me._ruid = runtime.getRuid();
                    deferred.resolve();
                });
                return deferred.promise();
            },
    
    
            // 涓轰简鏀寔澶栭儴鐩存帴娣诲姞涓€涓师鐢烣ile瀵硅薄銆?            _wrapFile: function( file ) {
                if ( !(file instanceof WUFile) ) {
    
                    if ( !(file instanceof File) ) {
                        if ( !this._ruid ) {
                            throw new Error('Can\'t add external files.');
                        }
                        file = new File( this._ruid, file );
                    }
    
                    file = new WUFile( file );
                }
    
                return file;
            },
    
            // 鍒ゆ柇鏂囦欢鏄惁鍙互琚姞鍏ラ槦鍒?            acceptFile: function( file ) {
                var invalid = !file || file.size < 6 || this.accept &&
    
                        // 濡傛灉鍚嶅瓧涓湁鍚庣紑锛屾墠锅氩悗缂€鐧藉悕鍗曞鐞嗐€?                        rExt.exec( file.name ) && !this.accept.test( file.name );
    
                return !invalid;
            },
    
    
            /**
             * @event beforeFileQueued
             * @param {File} file File瀵硅薄
             * @description 褰撴枃浠惰锷犲叆阒熷垪涔嫔墠瑙﹀彂锛屾浜嬩欢镄删andler杩斿洖链间负`false`锛屽垯姝ゆ枃浠朵笉浼氲娣诲姞杩涘叆阒熷垪銆?             * @for  Uploader
             */
    
            /**
             * @event fileQueued
             * @param {File} file File瀵硅薄
             * @description 褰撴枃浠惰锷犲叆阒熷垪浠ュ悗瑙﹀彂銆?             * @for  Uploader
             */
    
            _addFile: function( file ) {
                var me = this;
    
                file = me._wrapFile( file );
    
                // 涓嶈绷绫诲瀷鍒ゆ柇鍏佽涓嶅厑璁革紝鍏堟淳阃?`beforeFileQueued`
                if ( !me.owner.trigger( 'beforeFileQueued', file ) ) {
                    return;
                }
    
                // 绫诲瀷涓嶅尮閰嶏紝鍒欐淳阃侀敊璇簨浠讹紝骞惰繑锲炪€?                if ( !me.acceptFile( file ) ) {
                    me.owner.trigger( 'error', 'Q_TYPE_DENIED', file );
                    return;
                }
    
                me.queue.append( file );
                me.owner.trigger( 'fileQueued', file );
                return file;
            },
    
            getFile: function( fileId ) {
                return this.queue.getFile( fileId );
            },
    
            /**
             * @event filesQueued
             * @param {File} files 鏁扮粍锛屽唴瀹逛负铡熷File(lib/File锛夊璞°€?             * @description 褰扑竴镓规枃浠舵坊锷犺繘阒熷垪浠ュ悗瑙﹀彂銆?             * @for  Uploader
             */
    
            /**
             * @method addFiles
             * @grammar addFiles( file ) => undefined
             * @grammar addFiles( [file1, file2 ...] ) => undefined
             * @param {Array of File or File} [files] Files 瀵硅薄 鏁扮粍
             * @description 娣诲姞鏂囦欢鍒伴槦鍒?             * @for  Uploader
             */
            addFiles: function( files ) {
                var me = this;
    
                if ( !files.length ) {
                    files = [ files ];
                }
    
                files = $.map( files, function( file ) {
                    return me._addFile( file );
                });
    
                me.owner.trigger( 'filesQueued', files );
    
                if ( me.options.auto ) {
                    me.request('start-upload');
                }
            },
    
            getStats: function() {
                return this.stats;
            },
    
            /**
             * @event fileDequeued
             * @param {File} file File瀵硅薄
             * @description 褰撴枃浠惰绉婚櫎阒熷垪鍚庤Е鍙戙€?             * @for  Uploader
             */
    
            /**
             * @method removeFile
             * @grammar removeFile( file ) => undefined
             * @grammar removeFile( id ) => undefined
             * @param {File|id} file File瀵硅薄鎴栬繖File瀵硅薄镄刬d
             * @description 绉婚櫎镆愪竴鏂囦欢銆?             * @for  Uploader
             * @example
             *
             * $li.on('click', '.remove-this', function() {
             *     uploader.removeFile( file );
             * })
             */
            removeFile: function( file ) {
                var me = this;
    
                file = file.id ? file : me.queue.getFile( file );
    
                file.setStatus( Status.CANCELLED );
                me.owner.trigger( 'fileDequeued', file );
            },
    
            /**
             * @method getFiles
             * @grammar getFiles() => Array
             * @grammar getFiles( status1, status2, status... ) => Array
             * @description 杩斿洖鎸囧畾钟舵€佺殑鏂囦欢板嗗悎锛屼笉浼犲弬鏁板皢杩斿洖镓€链夌姸镐佺殑鏂囦欢銆?             * @for  Uploader
             * @example
             * console.log( uploader.getFiles() );    // => all files
             * console.log( uploader.getFiles('error') )    // => all error files.
             */
            getFiles: function() {
                return this.queue.getFiles.apply( this.queue, arguments );
            },
    
            fetchFile: function() {
                return this.queue.fetch.apply( this.queue, arguments );
            },
    
            /**
             * @method retry
             * @grammar retry() => undefined
             * @grammar retry( file ) => undefined
             * @description 閲嶈瘯涓娄紶锛岄吨璇曟寚瀹氭枃浠讹紝鎴栬€呬粠鍑洪敊镄勬枃浠跺紑濮嬮吨鏂颁笂浼犮€?             * @for  Uploader
             * @example
             * function retry() {
             *     uploader.retry();
             * }
             */
            retry: function( file, noForceStart ) {
                var me = this,
                    files, i, len;
    
                if ( file ) {
                    file = file.id ? file : me.queue.getFile( file );
                    file.setStatus( Status.QUEUED );
                    noForceStart || me.request('start-upload');
                    return;
                }
    
                files = me.queue.getFiles( Status.ERROR );
                i = 0;
                len = files.length;
    
                for ( ; i < len; i++ ) {
                    file = files[ i ];
                    file.setStatus( Status.QUEUED );
                }
    
                me.request('start-upload');
            },
    
            /**
             * @method sort
             * @grammar sort( fn ) => undefined
             * @description 鎺掑簭阒熷垪涓殑鏂囦欢锛屽湪涓娄紶涔嫔墠璋冩暣鍙互鎺у埗涓娄紶椤哄簭銆?             * @for  Uploader
             */
            sortFiles: function() {
                return this.queue.sort.apply( this.queue, arguments );
            },
    
            /**
             * @method reset
             * @grammar reset() => undefined
             * @description 閲岖疆uploader銆傜洰鍓嶅彧閲岖疆浜嗛槦鍒椼€?             * @for  Uploader
             * @example
             * uploader.reset();
             */
            reset: function() {
                this.queue = new Queue();
                this.stats = this.queue.stats;
            }
        });
    
    });
    /**
     * @fileOverview 娣诲姞銮峰彇Runtime鐩稿叧淇℃伅镄勬柟娉曘€?     */
    define('widgets/runtime',[
        'uploader',
        'runtime/runtime',
        'widgets/widget'
    ], function( Uploader, Runtime ) {
    
        Uploader.support = function() {
            return Runtime.hasRuntime.apply( Runtime, arguments );
        };
    
        return Uploader.register({
            'predict-runtime-type': 'predictRuntmeType'
        }, {
    
            init: function() {
                if ( !this.predictRuntmeType() ) {
                    throw Error('Runtime Error');
                }
            },
    
            /**
             * 棰勬祴Uploader灏嗛噰鐢ㄥ摢涓猔Runtime`
             * @grammar predictRuntmeType() => String
             * @method predictRuntmeType
             * @for  Uploader
             */
            predictRuntmeType: function() {
                var orders = this.options.runtimeOrder || Runtime.orders,
                    type = this.type,
                    i, len;
    
                if ( !type ) {
                    orders = orders.split( /\s*,\s*/g );
    
                    for ( i = 0, len = orders.length; i < len; i++ ) {
                        if ( Runtime.hasRuntime( orders[ i ] ) ) {
                            this.type = type = orders[ i ];
                            break;
                        }
                    }
                }
    
                return type;
            }
        });
    });
    /**
     * @fileOverview Transport
     */
    define('lib/transport',[
        'base',
        'runtime/client',
        'mediator'
    ], function( Base, RuntimeClient, Mediator ) {
    
        var $ = Base.$;
    
        function Transport( opts ) {
            var me = this;
    
            opts = me.options = $.extend( true, {}, Transport.options, opts || {} );
            RuntimeClient.call( this, 'Transport' );
    
            this._blob = null;
            this._formData = opts.formData || {};
            this._headers = opts.headers || {};
    
            this.on( 'progress', this._timeout );
            this.on( 'load error', function() {
                me.trigger( 'progress', 1 );
                clearTimeout( me._timer );
            });
        }
    
        Transport.options = {
            server: '',
            method: 'POST',
    
            // 璺ㄥ烟镞讹紝鏄惁鍏佽鎼哄甫cookie, 鍙湁html5 runtime镓嶆湁鏁?            withCredentials: false,
            fileVal: 'file',
            timeout: 2 * 60 * 1000,    // 2鍒嗛挓
            formData: {},
            headers: {},
            sendAsBinary: false
        };
    
        $.extend( Transport.prototype, {
    
            // 娣诲姞Blob, 鍙兘娣诲姞涓€娆★紝链€鍚庝竴娆℃湁鏁堛€?            appendBlob: function( key, blob, filename ) {
                var me = this,
                    opts = me.options;
    
                if ( me.getRuid() ) {
                    me.disconnectRuntime();
                }
    
                // 杩炴帴鍒痈lob褰掑睘镄勫悓涓€涓猺untime.
                me.connectRuntime( blob.ruid, function() {
                    me.exec('init');
                });
    
                me._blob = blob;
                opts.fileVal = key || opts.fileVal;
                opts.filename = filename || opts.filename;
            },
    
            // 娣诲姞鍏朵粬瀛楁
            append: function( key, value ) {
                if ( typeof key === 'object' ) {
                    $.extend( this._formData, key );
                } else {
                    this._formData[ key ] = value;
                }
            },
    
            setRequestHeader: function( key, value ) {
                if ( typeof key === 'object' ) {
                    $.extend( this._headers, key );
                } else {
                    this._headers[ key ] = value;
                }
            },
    
            send: function( method ) {
                this.exec( 'send', method );
                this._timeout();
            },
    
            abort: function() {
                clearTimeout( this._timer );
                return this.exec('abort');
            },
    
            destroy: function() {
                this.trigger('destroy');
                this.off();
                this.exec('destroy');
                this.disconnectRuntime();
            },
    
            getResponse: function() {
                return this.exec('getResponse');
            },
    
            getResponseAsJson: function() {
                return this.exec('getResponseAsJson');
            },
    
            getStatus: function() {
                return this.exec('getStatus');
            },
    
            _timeout: function() {
                var me = this,
                    duration = me.options.timeout;
    
                if ( !duration ) {
                    return;
                }
    
                clearTimeout( me._timer );
                me._timer = setTimeout(function() {
                    me.abort();
                    me.trigger( 'error', 'timeout' );
                }, duration );
            }
    
        });
    
        // 璁㏕ransport鍏峰浜嬩欢锷熻兘銆?        Mediator.installTo( Transport.prototype );
    
        return Transport;
    });
    /**
     * @fileOverview 璐熻矗鏂囦欢涓娄紶鐩稿叧銆?     */
    define('widgets/upload',[
        'base',
        'uploader',
        'file',
        'lib/transport',
        'widgets/widget'
    ], function( Base, Uploader, WUFile, Transport ) {
    
        var $ = Base.$,
            isPromise = Base.isPromise,
            Status = WUFile.Status;
    
        // 娣诲姞榛樿閰岖疆椤?        $.extend( Uploader.options, {
    
    
            /**
             * @property {Boolean} [prepareNextFile=false]
             * @namespace options
             * @for Uploader
             * @description 鏄惁鍏佽鍦ㄦ枃浠朵紶杈撴椂鎻愬墠鎶娄笅涓€涓枃浠跺嗳澶囧ソ銆?             * 瀵逛簬涓€涓枃浠剁殑鍑嗗宸ヤ綔姣旇缉钥楁椂锛屾瘮濡傚浘鐗囧帇缂╋紝md5搴忓垪鍖栥€?             * 濡傛灉鑳芥彁鍓嶅湪褰揿墠鏂囦欢浼犺緭链熷鐞嗭紝鍙互鑺傜渷镐讳綋钥楁椂銆?             */
            prepareNextFile: false,
    
            /**
             * @property {Boolean} [chunked=false]
             * @namespace options
             * @for Uploader
             * @description 鏄惁瑕佸垎鐗囧鐞嗗ぇ鏂囦欢涓娄紶銆?             */
            chunked: false,
    
            /**
             * @property {Boolean} [chunkSize=5242880]
             * @namespace options
             * @for Uploader
             * @description 濡傛灉瑕佸垎鐗囷紝鍒嗗澶т竴鐗囷紵 榛樿澶у皬涓?M.
             */
            chunkSize: 5 * 1024 * 1024,
    
            /**
             * @property {Boolean} [chunkRetry=2]
             * @namespace options
             * @for Uploader
             * @description 濡傛灉镆愪釜鍒嗙墖鐢变簬缃戠粶闂鍑洪敊锛屽厑璁歌嚜锷ㄩ吨浼犲灏戞锛?             */
            chunkRetry: 2,
    
            /**
             * @property {Boolean} [threads=3]
             * @namespace options
             * @for Uploader
             * @description 涓娄紶骞跺彂鏁般€傚厑璁稿悓镞舵渶澶т笂浼犺繘绋嬫暟銆?             */
            threads: 3,
    
    
            /**
             * @property {Object} [formData]
             * @namespace options
             * @for Uploader
             * @description 鏂囦欢涓娄紶璇锋眰镄勫弬鏁拌〃锛屾疮娆″彂阃侀兘浼氩彂阃佹瀵硅薄涓殑鍙傛暟銆?             */
            formData: null
    
            /**
             * @property {Object} [fileVal='file']
             * @namespace options
             * @for Uploader
             * @description 璁剧疆鏂囦欢涓娄紶鍩熺殑name銆?             */
    
            /**
             * @property {Object} [method='POST']
             * @namespace options
             * @for Uploader
             * @description 鏂囦欢涓娄紶鏂瑰纺锛宍POST`鎴栬€卄GET`銆?             */
    
            /**
             * @property {Object} [sendAsBinary=false]
             * @namespace options
             * @for Uploader
             * @description 鏄惁宸蹭簩杩涘埗镄勬祦镄勬柟寮忓彂阃佹枃浠讹紝杩欐牱鏁翠釜涓娄紶鍐呭`php://input`閮戒负鏂囦欢鍐呭锛?             * 鍏朵粬鍙傛暟鍦?_GET鏁扮粍涓€?             */
        });
    
        // 璐熻矗灏嗘枃浠跺垏鐗囥€?        function CuteFile( file, chunkSize ) {
            var pending = [],
                blob = file.source,
                total = blob.size,
                chunks = chunkSize ? Math.ceil( total / chunkSize ) : 1,
                start = 0,
                index = 0,
                len;
    
            while ( index < chunks ) {
                len = Math.min( chunkSize, total - start );
    
                pending.push({
                    file: file,
                    start: start,
                    end: chunkSize ? (start + len) : total,
                    total: total,
                    chunks: chunks,
                    chunk: index++
                });
                start += len;
            }
    
            file.blocks = pending.concat();
            file.remaning = pending.length;
    
            return {
                file: file,
    
                has: function() {
                    return !!pending.length;
                },
    
                fetch: function() {
                    return pending.shift();
                }
            };
        }
    
        Uploader.register({
            'start-upload': 'start',
            'stop-upload': 'stop',
            'skip-file': 'skipFile',
            'is-in-progress': 'isInProgress'
        }, {
    
            init: function() {
                var owner = this.owner;
    
                this.runing = false;
    
                // 璁板綍褰揿墠姝ｅ湪浼犵殑鏁版嵁锛岃窡threads鐩稿叧
                this.pool = [];
    
                // 缂揿瓨鍗冲皢涓娄紶镄勬枃浠躲€?                this.pending = [];
    
                // 璺熻釜杩樻湁澶氩皯鍒嗙墖娌℃湁瀹屾垚涓娄紶銆?                this.remaning = 0;
                this.__tick = Base.bindFn( this._tick, this );
    
                owner.on( 'uploadComplete', function( file ) {
                    // 鎶婂叾浠栧潡鍙栨秷浜嗐€?                    file.blocks && $.each( file.blocks, function( _, v ) {
                        v.transport && (v.transport.abort(), v.transport.destroy());
                        delete v.transport;
                    });
    
                    delete file.blocks;
                    delete file.remaning;
                });
            },
    
            /**
             * @event startUpload
             * @description 褰揿紑濮嬩笂浼犳祦绋嬫椂瑙﹀彂銆?             * @for  Uploader
             */
    
            /**
             * 寮€濮嬩笂浼犮€傛鏂规硶鍙互浠庡垵濮嬬姸镐佽皟鐢ㄥ紑濮嬩笂浼犳祦绋嬶紝涔熷彲浠ヤ粠鏆傚仠钟舵€佽皟鐢紝缁х画涓娄紶娴佺▼銆?             * @grammar upload() => undefined
             * @method upload
             * @for  Uploader
             */
            start: function() {
                var me = this;
    
                // 绉诲嚭invalid镄勬枃浠?                $.each( me.request( 'get-files', Status.INVALID ), function() {
                    me.request( 'remove-file', this );
                });
    
                if ( me.runing ) {
                    return;
                }
    
                me.runing = true;
    
                // 濡傛灉链夋殏锅灭殑锛屽垯缁紶
                $.each( me.pool, function( _, v ) {
                    var file = v.file;
    
                    if ( file.getStatus() === Status.INTERRUPT ) {
                        file.setStatus( Status.PROGRESS );
                        me._trigged = false;
                        v.transport && v.transport.send();
                    }
                });
    
                me._trigged = false;
                me.owner.trigger('startUpload');
                Base.nextTick( me.__tick );
            },
    
            /**
             * @event stopUpload
             * @description 褰揿紑濮嬩笂浼犳祦绋嬫殏锅沧椂瑙﹀彂銆?             * @for  Uploader
             */
    
            /**
             * 鏆傚仠涓娄紶銆傜涓€涓弬鏁颁负鏄惁涓柇涓娄紶褰揿墠姝ｅ湪涓娄紶镄勬枃浠躲€?             * @grammar stop() => undefined
             * @grammar stop( true ) => undefined
             * @method stop
             * @for  Uploader
             */
            stop: function( interrupt ) {
                var me = this;
    
                if ( me.runing === false ) {
                    return;
                }
    
                me.runing = false;
    
                interrupt && $.each( me.pool, function( _, v ) {
                    v.transport && v.transport.abort();
                    v.file.setStatus( Status.INTERRUPT );
                });
    
                me.owner.trigger('stopUpload');
            },
    
            /**
             * 鍒ゆ柇`Uplaode`r鏄惁姝ｅ湪涓娄紶涓€?             * @grammar isInProgress() => Boolean
             * @method isInProgress
             * @for  Uploader
             */
            isInProgress: function() {
                return !!this.runing;
            },
    
            getStats: function() {
                return this.request('get-stats');
            },
    
            /**
             * 鎺夎绷涓€涓枃浠朵笂浼狅紝鐩存帴镙囱鎸囧畾鏂囦欢涓哄凡涓娄紶钟舵€并€?             * @grammar skipFile( file ) => undefined
             * @method skipFile
             * @for  Uploader
             */
            skipFile: function( file, status ) {
                file = this.request( 'get-file', file );
    
                file.setStatus( status || Status.COMPLETE );
                file.skipped = true;
    
                // 濡傛灉姝ｅ湪涓娄紶銆?                file.blocks && $.each( file.blocks, function( _, v ) {
                    var _tr = v.transport;
    
                    if ( _tr ) {
                        _tr.abort();
                        _tr.destroy();
                        delete v.transport;
                    }
                });
    
                this.owner.trigger( 'uploadSkip', file );
            },
    
            /**
             * @event uploadFinished
             * @description 褰撴墍链夋枃浠朵笂浼犵粨鏉熸椂瑙﹀彂銆?             * @for  Uploader
             */
            _tick: function() {
                var me = this,
                    opts = me.options,
                    fn, val;
    
                // 涓娄竴涓猵romise杩樻病链夌粨鏉燂紝鍒欑瓑寰呭畲鎴愬悗鍐嶆墽琛屻€?                if ( me._promise ) {
                    return me._promise.always( me.__tick );
                }
    
                // 杩樻湁浣岖疆锛屼笖杩樻湁鏂囦欢瑕佸鐞嗙殑璇濄€?                if ( me.pool.length < opts.threads && (val = me._nextBlock()) ) {
                    me._trigged = false;
    
                    fn = function( val ) {
                        me._promise = null;
    
                        // 链夊彲鑳芥槸reject杩囨潵镄勶紝镓€浠ヨ妫€娴媣al镄勭被鍨嬨€?                        val && val.file && me._startSend( val );
                        Base.nextTick( me.__tick );
                    };
    
                    me._promise = isPromise( val ) ? val.always( fn ) : fn( val );
    
                // 娌℃湁瑕佷笂浼犵殑浜嗭紝涓旀病链夋鍦ㄤ紶杈撶殑浜嗐€?                } else if ( !me.remaning && !me.getStats().numOfQueue ) {
                    me.runing = false;
    
                    me._trigged || Base.nextTick(function() {
                        me.owner.trigger('uploadFinished');
                    });
                    me._trigged = true;
                }
            },
    
            _nextBlock: function() {
                var me = this,
                    act = me._act,
                    opts = me.options,
                    next, done;
    
                // 濡傛灉褰揿墠鏂囦欢杩樻湁娌℃湁闇€瑕佷紶杈撶殑锛屽垯鐩存帴杩斿洖鍓╀笅镄勩€?                if ( act && act.has() &&
                        act.file.getStatus() === Status.PROGRESS ) {
    
                    // 鏄惁鎻愬墠鍑嗗涓嬩竴涓枃浠?                    if ( opts.prepareNextFile && !me.pending.length ) {
                        me._prepareNextFile();
                    }
    
                    return act.fetch();
    
                // 鍚﹀垯锛屽鏋沧鍦ㄨ繍琛岋紝鍒椤嗳澶囦笅涓€涓枃浠讹紝骞剁瓑寰呭畲鎴愬悗杩斿洖涓嬩釜鍒嗙墖銆?                } else if ( me.runing ) {
    
                    // 濡傛灉缂揿瓨涓湁锛屽垯鐩存帴鍦ㄧ紦瀛树腑鍙栵紝娌℃湁鍒椤幓queue涓彇銆?                    if ( !me.pending.length && me.getStats().numOfQueue ) {
                        me._prepareNextFile();
                    }
    
                    next = me.pending.shift();
                    done = function( file ) {
                        if ( !file ) {
                            return null;
                        }
    
                        act = CuteFile( file, opts.chunked ? opts.chunkSize : 0 );
                        me._act = act;
                        return act.fetch();
                    };
    
                    // 鏂囦欢鍙兘杩桦湪prepare涓紝涔熸湁鍙兘宸茬粡瀹屽叏鍑嗗濂戒简銆?                    return isPromise( next ) ?
                            next[ next.pipe ? 'pipe' : 'then']( done ) :
                            done( next );
                }
            },
    
    
            /**
             * @event uploadStart
             * @param {File} file File瀵硅薄
             * @description 镆愪釜鏂囦欢寮€濮嬩笂浼犲墠瑙﹀彂锛屼竴涓枃浠跺彧浼氲Е鍙戜竴娆°€?             * @for  Uploader
             */
            _prepareNextFile: function() {
                var me = this,
                    file = me.request('fetch-file'),
                    pending = me.pending,
                    promise;
    
                if ( file ) {
                    promise = me.request( 'before-send-file', file, function() {
    
                        // 链夊彲鑳芥枃浠惰skip鎺変简銆傛枃浠惰skip鎺夊悗锛岀姸镐佸潙瀹氢笉鏄疩ueued.
                        if ( file.getStatus() === Status.QUEUED ) {
                            me.owner.trigger( 'uploadStart', file );
                            file.setStatus( Status.PROGRESS );
                            return file;
                        }
    
                        return me._finishFile( file );
                    });
    
                    // 濡傛灉杩桦湪pending涓紝鍒欐浛鎹㈡垚鏂囦欢链韩銆?                    promise.done(function() {
                        var idx = $.inArray( promise, pending );
    
                        ~idx && pending.splice( idx, 1, file );
                    });
    
                    // befeore-send-file镄勯挬瀛愬氨链夐敊璇彂鐢熴€?                    promise.fail(function( reason ) {
                        file.setStatus( Status.ERROR, reason );
                        me.owner.trigger( 'uploadError', file, reason );
                        me.owner.trigger( 'uploadComplete', file );
                    });
    
                    pending.push( promise );
                }
            },
    
            // 璁╁嚭浣岖疆浜嗭紝鍙互璁╁叾浠栧垎鐗囧紑濮嬩笂浼?            _popBlock: function( block ) {
                var idx = $.inArray( block, this.pool );
    
                this.pool.splice( idx, 1 );
                block.file.remaning--;
                this.remaning--;
            },
    
            // 寮€濮嬩笂浼狅紝鍙互琚帀杩囥€傚鏋减romise琚玶eject浜嗭紝鍒栾〃绀鸿烦杩囨鍒嗙墖銆?            _startSend: function( block ) {
                var me = this,
                    file = block.file,
                    promise;
    
                me.pool.push( block );
                me.remaning++;
    
                // 濡傛灉娌℃湁鍒嗙墖锛屽垯鐩存帴浣跨敤铡熷镄勩€?                // 涓崭细涓㈠けcontent-type淇℃伅銆?                block.blob = block.chunks === 1 ? file.source :
                        file.source.slice( block.start, block.end );
    
                // hook, 姣忎釜鍒嗙墖鍙戦€佷箣鍓嶅彲鑳借锅氢簺寮傛镄勪簨鎯呫€?                promise = me.request( 'before-send', block, function() {
    
                    // 链夊彲鑳芥枃浠跺凡缁忎笂浼犲嚭阌欎简锛屾墍浠ヤ笉闇€瑕佸啀浼犺緭浜嗐€?                    if ( file.getStatus() === Status.PROGRESS ) {
                        me._doSend( block );
                    } else {
                        me._popBlock( block );
                        Base.nextTick( me.__tick );
                    }
                });
    
                // 濡傛灉涓篺ail浜嗭紝鍒栾烦杩囨鍒嗙墖銆?                promise.fail(function() {
                    if ( file.remaning === 1 ) {
                        me._finishFile( file ).always(function() {
                            block.percentage = 1;
                            me._popBlock( block );
                            me.owner.trigger( 'uploadComplete', file );
                            Base.nextTick( me.__tick );
                        });
                    } else {
                        block.percentage = 1;
                        me._popBlock( block );
                        Base.nextTick( me.__tick );
                    }
                });
            },
    
    
            /**
             * @event uploadBeforeSend
             * @param {Object} object
             * @param {Object} data 榛樿镄勪笂浼犲弬鏁帮紝鍙互镓╁睍姝ゅ璞℃潵鎺у埗涓娄紶鍙傛暟銆?             * @description 褰撴煇涓枃浠剁殑鍒嗗潡鍦ㄥ彂阃佸墠瑙﹀彂锛屼富瑕佺敤鏉ヨ闂槸鍚﹁娣诲姞闄勫甫鍙傛暟锛屽ぇ鏂囦欢鍦ㄥ紑璧峰垎鐗囦笂浼犵殑鍓嶆彁涓嬫浜嬩欢鍙兘浼氲Е鍙戝娆°€?             * @for  Uploader
             */
    
            /**
             * @event uploadAccept
             * @param {Object} object
             * @param {Object} ret 链嶅姟绔殑杩斿洖鏁版嵁锛宩son镙煎纺锛屽鏋沧湇锷＄涓嶆槸json镙煎纺锛屼粠ret._raw涓彇鏁版嵁锛岃嚜琛岃В鏋愩€?             * @description 褰撴煇涓枃浠朵笂浼犲埌链嶅姟绔搷搴斿悗锛屼细娲鹃€佹浜嬩欢鏉ヨ闂湇锷＄鍝嶅簲鏄惁链夋晥銆傚鏋沧浜嬩欢handler杩斿洖链间负`false`, 鍒欐鏂囦欢灏嗘淳阃乣server`绫诲瀷镄刞uploadError`浜嬩欢銆?             * @for  Uploader
             */
    
            /**
             * @event uploadProgress
             * @param {File} file File瀵硅薄
             * @param {Number} percentage 涓娄紶杩涘害
             * @description 涓娄紶杩囩▼涓Е鍙戯紝鎼哄甫涓娄紶杩涘害銆?             * @for  Uploader
             */
    
    
            /**
             * @event uploadError
             * @param {File} file File瀵硅薄
             * @param {String} reason 鍑洪敊镄刢ode
             * @description 褰撴枃浠朵笂浼犲嚭阌欐椂瑙﹀彂銆?             * @for  Uploader
             */
    
            /**
             * @event uploadSuccess
             * @param {File} file File瀵硅薄
             * @param {Object} response 链嶅姟绔繑锲炵殑鏁版嵁
             * @description 褰撴枃浠朵笂浼犳垚锷熸椂瑙﹀彂銆?             * @for  Uploader
             */
    
            /**
             * @event uploadComplete
             * @param {File} [file] File瀵硅薄
             * @description 涓岖鎴愬姛鎴栬€呭け璐ワ紝鏂囦欢涓娄紶瀹屾垚镞惰Е鍙戙€?             * @for  Uploader
             */
    
            // 锅氢笂浼犳搷浣溿€?            _doSend: function( block ) {
                var me = this,
                    owner = me.owner,
                    opts = me.options,
                    file = block.file,
                    tr = new Transport( opts ),
                    data = $.extend({}, opts.formData ),
                    headers = $.extend({}, opts.headers ),
                    requestAccept, ret;
    
                block.transport = tr;
    
                tr.on( 'destroy', function() {
                    delete block.transport;
                    me._popBlock( block );
                    Base.nextTick( me.__tick );
                });
    
                // 骞挎挱涓娄紶杩涘害銆备互鏂囦欢涓哄崟浣嶃€?                tr.on( 'progress', function( percentage ) {
                    var totalPercent = 0,
                        uploaded = 0;
    
                    // 鍙兘娌℃湁abort鎺夛紝progress杩樻槸镓ц杩涙潵浜嗐€?                    // if ( !file.blocks ) {
                    //     return;
                    // }
    
                    totalPercent = block.percentage = percentage;
    
                    if ( block.chunks > 1 ) {    // 璁＄畻鏂囦欢镄勬暣浣挞€熷害銆?                        $.each( file.blocks, function( _, v ) {
                            uploaded += (v.percentage || 0) * (v.end - v.start);
                        });
    
                        totalPercent = uploaded / file.size;
                    }
    
                    owner.trigger( 'uploadProgress', file, totalPercent || 0 );
                });
    
                // 鐢ㄦ潵璇㈤棶锛屾槸鍚﹁繑锲炵殑缁撴灉鏄湁阌栾镄勩€?                requestAccept = function( reject ) {
                    var fn;
    
                    ret = tr.getResponseAsJson() || {};
                    ret._raw = tr.getResponse();
                    fn = function( value ) {
                        reject = value;
                    };
    
                    // 链嶅姟绔搷搴斾简锛屼笉浠ｈ〃鎴愬姛浜嗭紝璇㈤棶鏄惁鍝嶅簲姝ｇ‘銆?                    if ( !owner.trigger( 'uploadAccept', block, ret, fn ) ) {
                        reject = reject || 'server';
                    }
    
                    return reject;
                };
    
                // 灏濊瘯閲嶈瘯锛岀劧鍚庡箍鎾枃浠朵笂浼犲嚭阌欍€?                tr.on( 'error', function( type, flag ) {
                    block.retried = block.retried || 0;
    
                    // 镊姩閲嶈瘯
                    if ( block.chunks > 1 && ~'http,abort'.indexOf( type ) &&
                            block.retried < opts.chunkRetry ) {
    
                        block.retried++;
                        tr.send();
    
                    } else {
    
                        // http status 500 ~ 600
                        if ( !flag && type === 'server' ) {
                            type = requestAccept( type );
                        }
    
                        file.setStatus( Status.ERROR, type );
                        owner.trigger( 'uploadError', file, type );
                        owner.trigger( 'uploadComplete', file );
                    }
                });
    
                // 涓娄紶鎴愬姛
                tr.on( 'load', function() {
                    var reason;
    
                    // 濡傛灉闱为链燂紝杞悜涓娄紶鍑洪敊銆?                    if ( (reason = requestAccept()) ) {
                        tr.trigger( 'error', reason, true );
                        return;
                    }
    
                    // 鍏ㄩ儴涓娄紶瀹屾垚銆?                    if ( file.remaning === 1 ) {
                        me._finishFile( file, ret );
                    } else {
                        tr.destroy();
                    }
                });
    
                // 閰岖疆榛樿镄勪笂浼犲瓧娈点€?                data = $.extend( data, {
                    id: file.id,
                    name: file.name,
                    type: file.type,
                    lastModifiedDate: file.lastModifiedDate,
                    size: file.size
                });
    
                block.chunks > 1 && $.extend( data, {
                    chunks: block.chunks,
                    chunk: block.chunk
                });
    
                // 鍦ㄥ彂阃佷箣闂村彲浠ユ坊锷犲瓧娈典粈涔堢殑銆伞€伞€?                // 濡傛灉榛樿镄勫瓧娈典笉澶熶娇鐢紝鍙互阃氲绷鐩戝惉姝や簨浠舵潵镓╁睍
                owner.trigger( 'uploadBeforeSend', block, data, headers );
    
                // 寮€濮嫔彂阃并€?                tr.appendBlob( opts.fileVal, block.blob, file.name );
                tr.append( data );
                tr.setRequestHeader( headers );
                tr.send();
            },
    
            // 瀹屾垚涓娄紶銆?            _finishFile: function( file, ret, hds ) {
                var owner = this.owner;
    
                return owner
                        .request( 'after-send-file', arguments, function() {
                            file.setStatus( Status.COMPLETE );
                            owner.trigger( 'uploadSuccess', file, ret, hds );
                        })
                        .fail(function( reason ) {
    
                            // 濡傛灉澶栭儴宸茬粡镙囱涓篿nvalid浠€涔堢殑锛屼笉鍐嶆敼钟舵€并€?                            if ( file.getStatus() === Status.PROGRESS ) {
                                file.setStatus( Status.ERROR, reason );
                            }
    
                            owner.trigger( 'uploadError', file, reason );
                        })
                        .always(function() {
                            owner.trigger( 'uploadComplete', file );
                        });
            }
    
        });
    });
    /**
     * @fileOverview 鍚勭楠岃瘉锛屽寘鎷枃浠舵€诲ぇ灏忔槸鍚﹁秴鍑恒€佸崟鏂囦欢鏄惁瓒呭嚭鍜屾枃浠舵槸鍚﹂吨澶嶃€?     */
    
    define('widgets/validator',[
        'base',
        'uploader',
        'file',
        'widgets/widget'
    ], function( Base, Uploader, WUFile ) {
    
        var $ = Base.$,
            validators = {},
            api;
    
        /**
         * @event error
         * @param {String} type 阌栾绫诲瀷銆?         * @description 褰捣alidate涓嶉€氲绷镞讹紝浼氢互娲鹃€侀敊璇簨浠剁殑褰㈠纺阃氱煡璋幂敤钥呫€傞€氲绷`upload.on('error', handler)`鍙互鎹曡幏鍒版绫婚敊璇紝鐩墠链変互涓嬮敊璇细鍦ㄧ壒瀹氱殑鎯呭喌涓嬫淳阃侀敊鏉ャ€?         *
         * * `Q_EXCEED_NUM_LIMIT` 鍦ㄨ缃简`fileNumLimit`涓斿皾璇旷粰`uploader`娣诲姞镄勬枃浠舵暟閲忚秴鍑鸿繖涓€兼椂娲鹃€并€?         * * `Q_EXCEED_SIZE_LIMIT` 鍦ㄨ缃简`Q_EXCEED_SIZE_LIMIT`涓斿皾璇旷粰`uploader`娣诲姞镄勬枃浠舵€诲ぇ灏忚秴鍑鸿繖涓€兼椂娲鹃€并€?         * @for  Uploader
         */
    
        // 鏆撮湶缁椤闱㈢殑api
        api = {
    
            // 娣诲姞楠岃瘉鍣?            addValidator: function( type, cb ) {
                validators[ type ] = cb;
            },
    
            // 绉婚櫎楠岃瘉鍣?            removeValidator: function( type ) {
                delete validators[ type ];
            }
        };
    
        // 鍦║ploader鍒濆鍖栫殑镞跺€椤惎锷╒alidators镄勫垵濮嫔寲
        Uploader.register({
            init: function() {
                var me = this;
                $.each( validators, function() {
                    this.call( me.owner );
                });
            }
        });
    
        /**
         * @property {int} [fileNumLimit=undefined]
         * @namespace options
         * @for Uploader
         * @description 楠岃瘉鏂囦欢镐绘暟閲? 瓒呭嚭鍒欎笉鍏佽锷犲叆阒熷垪銆?         */
        api.addValidator( 'fileNumLimit', function() {
            var uploader = this,
                opts = uploader.options,
                count = 0,
                max = opts.fileNumLimit >> 0,
                flag = true;
    
            if ( !max ) {
                return;
            }
    
            uploader.on( 'beforeFileQueued', function( file ) {
    
                if ( count >= max && flag ) {
                    flag = false;
                    this.trigger( 'error', 'Q_EXCEED_NUM_LIMIT', max, file );
                    setTimeout(function() {
                        flag = true;
                    }, 1 );
                }
    
                return count >= max ? false : true;
            });
    
            uploader.on( 'fileQueued', function() {
                count++;
            });
    
            uploader.on( 'fileDequeued', function() {
                count--;
            });
    
            uploader.on( 'uploadFinished', function() {
                count = 0;
            });
        });
    
    
        /**
         * @property {int} [fileSizeLimit=undefined]
         * @namespace options
         * @for Uploader
         * @description 楠岃瘉鏂囦欢镐诲ぇ灏忔槸鍚﹁秴鍑洪檺鍒? 瓒呭嚭鍒欎笉鍏佽锷犲叆阒熷垪銆?         */
        api.addValidator( 'fileSizeLimit', function() {
            var uploader = this,
                opts = uploader.options,
                count = 0,
                max = opts.fileSizeLimit >> 0,
                flag = true;
    
            if ( !max ) {
                return;
            }
    
            uploader.on( 'beforeFileQueued', function( file ) {
                var invalid = count + file.size > max;
    
                if ( invalid && flag ) {
                    flag = false;
                    this.trigger( 'error', 'Q_EXCEED_SIZE_LIMIT', max, file );
                    setTimeout(function() {
                        flag = true;
                    }, 1 );
                }
    
                return invalid ? false : true;
            });
    
            uploader.on( 'fileQueued', function( file ) {
                count += file.size;
            });
    
            uploader.on( 'fileDequeued', function( file ) {
                count -= file.size;
            });
    
            uploader.on( 'uploadFinished', function() {
                count = 0;
            });
        });
    
        /**
         * @property {int} [fileSingleSizeLimit=undefined]
         * @namespace options
         * @for Uploader
         * @description 楠岃瘉鍗曚釜鏂囦欢澶у皬鏄惁瓒呭嚭闄愬埗, 瓒呭嚭鍒欎笉鍏佽锷犲叆阒熷垪銆?         */
        api.addValidator( 'fileSingleSizeLimit', function() {
            var uploader = this,
                opts = uploader.options,
                max = opts.fileSingleSizeLimit;
    
            if ( !max ) {
                return;
            }
    
            uploader.on( 'beforeFileQueued', function( file ) {
    
                if ( file.size > max ) {
                    file.setStatus( WUFile.Status.INVALID, 'exceed_size' );
                    this.trigger( 'error', 'F_EXCEED_SIZE', file );
                    return false;
                }
    
            });
    
        });
    
        /**
         * @property {int} [duplicate=undefined]
         * @namespace options
         * @for Uploader
         * @description 铡婚吨锛?镙规嵁鏂囦欢鍚嶅瓧銆佹枃浠跺ぇ灏忓拰链€鍚庝慨鏀规椂闂存潵鐢熸垚hash Key.
         */
        api.addValidator( 'duplicate', function() {
            var uploader = this,
                opts = uploader.options,
                mapping = {};
    
            if ( opts.duplicate ) {
                return;
            }
    
            function hashString( str ) {
                var hash = 0,
                    i = 0,
                    len = str.length,
                    _char;
    
                for ( ; i < len; i++ ) {
                    _char = str.charCodeAt( i );
                    hash = _char + (hash << 6) + (hash << 16) - hash;
                }
    
                return hash;
            }
    
            uploader.on( 'beforeFileQueued', function( file ) {
                var hash = file.__hash || (file.__hash = hashString( file.name +
                        file.size + file.lastModifiedDate ));
    
                // 宸茬粡閲嶅浜?                if ( mapping[ hash ] ) {
                    this.trigger( 'error', 'F_DUPLICATE', file );
                    return false;
                }
            });
    
            uploader.on( 'fileQueued', function( file ) {
                var hash = file.__hash;
    
                hash && (mapping[ hash ] = true);
            });
    
            uploader.on( 'fileDequeued', function( file ) {
                var hash = file.__hash;
    
                hash && (delete mapping[ hash ]);
            });
        });
    
        return api;
    });
    
    /**
     * @fileOverview Runtime绠＄悊鍣紝璐熻矗Runtime镄勯€夋嫨, 杩炴帴
     */
    define('runtime/compbase',[],function() {
    
        function CompBase( owner, runtime ) {
    
            this.owner = owner;
            this.options = owner.options;
    
            this.getRuntime = function() {
                return runtime;
            };
    
            this.getRuid = function() {
                return runtime.uid;
            };
    
            this.trigger = function() {
                return owner.trigger.apply( owner, arguments );
            };
        }
    
        return CompBase;
    });
    /**
     * @fileOverview FlashRuntime
     */
    define('runtime/flash/runtime',[
        'base',
        'runtime/runtime',
        'runtime/compbase'
    ], function( Base, Runtime, CompBase ) {
    
        var $ = Base.$,
            type = 'flash',
            components = {};
    
    
        function getFlashVersion() {
            var version;
    
            try {
                version = navigator.plugins[ 'Shockwave Flash' ];
                version = version.description;
            } catch ( ex ) {
                try {
                    version = new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
                            .GetVariable('$version');
                } catch ( ex2 ) {
                    version = '0.0';
                }
            }
            version = version.match( /\d+/g );
            return parseFloat( version[ 0 ] + '.' + version[ 1 ], 10 );
        }
    
        function FlashRuntime() {
            var pool = {},
                clients = {},
                destory = this.destory,
                me = this,
                jsreciver = Base.guid('webuploader_');
    
            Runtime.apply( me, arguments );
            me.type = type;
    
    
            // 杩欎釜鏂规硶镄勮皟鐢ㄨ€咃紝瀹为台涓婃槸RuntimeClient
            me.exec = function( comp, fn/*, args...*/ ) {
                var client = this,
                    uid = client.uid,
                    args = Base.slice( arguments, 2 ),
                    instance;
    
                clients[ uid ] = client;
    
                if ( components[ comp ] ) {
                    if ( !pool[ uid ] ) {
                        pool[ uid ] = new components[ comp ]( client, me );
                    }
    
                    instance = pool[ uid ];
    
                    if ( instance[ fn ] ) {
                        return instance[ fn ].apply( instance, args );
                    }
                }
    
                return me.flashExec.apply( client, arguments );
            };
    
            function handler( evt, obj ) {
                var type = evt.type || evt,
                    parts, uid;
    
                parts = type.split('::');
                uid = parts[ 0 ];
                type = parts[ 1 ];
    
                // console.log.apply( console, arguments );
    
                if ( type === 'Ready' && uid === me.uid ) {
                    me.trigger('ready');
                } else if ( clients[ uid ] ) {
                    clients[ uid ].trigger( type.toLowerCase(), evt, obj );
                }
    
                // Base.log( evt, obj );
            }
    
            // flash镄勬帴鍙楀櫒銆?            window[ jsreciver ] = function() {
                var args = arguments;
    
                // 涓轰简鑳芥崟銮峰缑鍒般€?                setTimeout(function() {
                    handler.apply( null, args );
                }, 1 );
            };
    
            this.jsreciver = jsreciver;
    
            this.destory = function() {
                // @todo 鍒犻櫎姹犲瓙涓殑镓€链夊疄渚?                return destory && destory.apply( this, arguments );
            };
    
            this.flashExec = function( comp, fn ) {
                var flash = me.getFlash(),
                    args = Base.slice( arguments, 2 );
    
                return flash.exec( this.uid, comp, fn, args );
            };
    
            // @todo
        }
    
        Base.inherits( Runtime, {
            constructor: FlashRuntime,
    
            init: function() {
                var container = this.getContainer(),
                    opts = this.options,
                    html;
    
                // if not the minimal height, shims are not initialized
                // in older browsers (e.g FF3.6, IE6,7,8, Safari 4.0,5.0, etc)
                container.css({
                    position: 'absolute',
                    top: '-8px',
                    left: '-8px',
                    width: '9px',
                    height: '9px',
                    overflow: 'hidden'
                });
    
                // insert flash object
                html = '<object id="' + this.uid + '" type="application/' +
                        'x-shockwave-flash" data="' +  opts.swf + '" ';
    
                if ( Base.browser.ie ) {
                    html += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ';
                }
    
                html += 'width="100%" height="100%" style="outline:0">'  +
                    '<param name="movie" value="' + opts.swf + '" />' +
                    '<param name="flashvars" value="uid=' + this.uid +
                    '&jsreciver=' + this.jsreciver + '" />' +
                    '<param name="wmode" value="transparent" />' +
                    '<param name="allowscriptaccess" value="always" />' +
                '</object>';
    
                container.html( html );
            },
    
            getFlash: function() {
                if ( this._flash ) {
                    return this._flash;
                }
    
                this._flash = $( '#' + this.uid ).get( 0 );
                return this._flash;
            }
    
        });
    
        FlashRuntime.register = function( name, component ) {
            component = components[ name ] = Base.inherits( CompBase, $.extend({
    
                // @todo fix this later
                flashExec: function() {
                    var owner = this.owner,
                        runtime = this.getRuntime();
    
                    return runtime.flashExec.apply( owner, arguments );
                }
            }, component ) );
    
            return component;
        };
    
        if ( getFlashVersion() >= 11.4 ) {
            Runtime.addRuntime( type, FlashRuntime );
        }
    
        return FlashRuntime;
    });
    /**
     * @fileOverview FilePicker
     */
    define('runtime/flash/filepicker',[
        'base',
        'runtime/flash/runtime'
    ], function( Base, FlashRuntime ) {
        var $ = Base.$;
    
        return FlashRuntime.register( 'FilePicker', {
            init: function( opts ) {
                var copy = $.extend({}, opts ),
                    len, i;
    
                // 淇Flash鍐嶆病链夎缃畉itle镄勬儏鍐典笅镞犳硶寮瑰嚭flash鏂囦欢阃夋嫨妗嗙殑bug.
                len = copy.accept && copy.accept.length;
                for (  i = 0; i < len; i++ ) {
                    if ( !copy.accept[ i ].title ) {
                        copy.accept[ i ].title = 'Files';
                    }
                }
    
                delete copy.button;
                delete copy.container;
    
                this.flashExec( 'FilePicker', 'init', copy );
            },
    
            destroy: function() {
                // todo
            }
        });
    });
    /**
     * @fileOverview 锲剧墖铡嬬缉
     */
    define('runtime/flash/image',[
        'runtime/flash/runtime'
    ], function( FlashRuntime ) {
    
        return FlashRuntime.register( 'Image', {
            // init: function( options ) {
            //     var owner = this.owner;
    
            //     this.flashExec( 'Image', 'init', options );
            //     owner.on( 'load', function() {
            //         debugger;
            //     });
            // },
    
            loadFromBlob: function( blob ) {
                var owner = this.owner;
    
                owner.info() && this.flashExec( 'Image', 'info', owner.info() );
                owner.meta() && this.flashExec( 'Image', 'meta', owner.meta() );
    
                this.flashExec( 'Image', 'loadFromBlob', blob.uid );
            }
        });
    });
    /**
     * @fileOverview  Transport flash瀹炵幇
     */
    define('runtime/flash/transport',[
        'base',
        'runtime/flash/runtime',
        'runtime/client'
    ], function( Base, FlashRuntime, RuntimeClient ) {
        var $ = Base.$;
    
        return FlashRuntime.register( 'Transport', {
            init: function() {
                this._status = 0;
                this._response = null;
                this._responseJson = null;
            },
    
            send: function() {
                var owner = this.owner,
                    opts = this.options,
                    xhr = this._initAjax(),
                    blob = owner._blob,
                    server = opts.server,
                    binary;
    
                xhr.connectRuntime( blob.ruid );
    
                if ( opts.sendAsBinary ) {
                    server += (/\?/.test( server ) ? '&' : '?') +
                            $.param( owner._formData );
    
                    binary = blob.uid;
                } else {
                    $.each( owner._formData, function( k, v ) {
                        xhr.exec( 'append', k, v );
                    });
    
                    xhr.exec( 'appendBlob', opts.fileVal, blob.uid,
                            opts.filename || owner._formData.name || '' );
                }
    
                this._setRequestHeader( xhr, opts.headers );
                xhr.exec( 'send', {
                    method: opts.method,
                    url: server
                }, binary );
            },
    
            getStatus: function() {
                return this._status;
            },
    
            getResponse: function() {
                return this._response;
            },
    
            getResponseAsJson: function() {
                return this._responseJson;
            },
    
            abort: function() {
                var xhr = this._xhr;
    
                if ( xhr ) {
                    xhr.exec('abort');
                    xhr.destroy();
                    this._xhr = xhr = null;
                }
            },
    
            destroy: function() {
                this.abort();
            },
    
            _initAjax: function() {
                var me = this,
                    xhr = new RuntimeClient('XMLHttpRequest');
    
                xhr.on( 'uploadprogress progress', function( e ) {
                    return me.trigger( 'progress', e.loaded / e.total );
                });
    
                xhr.on( 'load', function() {
                    var status = xhr.exec('getStatus'),
                        err = '';
    
                    xhr.off();
                    me._xhr = null;
    
                    if ( status >= 200 && status < 300 ) {
                        me._response = xhr.exec('getResponse');
                        me._responseJson = xhr.exec('getResponseAsJson');
                    } else if ( status >= 500 && status < 600 ) {
                        me._response = xhr.exec('getResponse');
                        me._responseJson = xhr.exec('getResponseAsJson');
                        err = 'server';
                    } else {
                        err = 'http';
                    }
    
                    xhr.destroy();
                    xhr = null;
    
                    return err ? me.trigger( 'error', err ) : me.trigger('load');
                });
    
                xhr.on( 'error', function() {
                    xhr.off();
                    me._xhr = null;
                    me.trigger( 'error', 'http' );
                });
    
                me._xhr = xhr;
                return xhr;
            },
    
            _setRequestHeader: function( xhr, headers ) {
                $.each( headers, function( key, val ) {
                    xhr.exec( 'setRequestHeader', key, val );
                });
            }
        });
    });
    /**
     * @fileOverview 鍙湁flash瀹炵幇镄勬枃浠剁増链€?     */
    define('preset/flashonly',[
        'base',
    
        // widgets
        'widgets/filepicker',
        'widgets/image',
        'widgets/queue',
        'widgets/runtime',
        'widgets/upload',
        'widgets/validator',
    
        // runtimes
    
        // flash
        'runtime/flash/filepicker',
        'runtime/flash/image',
        'runtime/flash/transport'
    ], function( Base ) {
        return Base;
    });
    define('webuploader',[
        'preset/flashonly'
    ], function( preset ) {
        return preset;
    });
    return require('webuploader');
});
