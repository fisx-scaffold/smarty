/**
 * @file 本地 web server 配置文件，更多信息见如下链接：
 *       https://github.com/ecomfe/edp-webserver
 *       https://github.com/wuhy/autoresponse
 *       https://github.com/wuhy/watchreload
 *
 *       TIP:
 *       1) 以发布目录进行调试查看，同时支持修改浏览器自动刷新命令：
 *          fisx release -wL
 *          fisx server start --release
 * @author ${#author#}
 */

/* global redirect:false */
/* global content:false */
/* global empty:false */
/* global home:false */
/* global autoless:false */
/* global html2js:false */
/* global file:false */
/* global less:false */
/* global stylus:false */
/* global livereload:false */
/* global php:false */
/* global proxyNoneExists:false */
/* global requireConfigInjector:false */
/* global autoresponse:false */

var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var autoprefixPlugin = new LessPluginAutoPrefix({browsers: ['ie >= 8', 'last 2 versions']});

// edp-webserver 使用的 less 1.x 版本，est 依赖 2.x 版本，这里重新指定 less
exports.less = require('less');

exports.port = 8848;
exports.directoryIndexes = true;
exports.documentRoot = __dirname;

exports.getLocations = function () {
    return [
        {
            location: /\/$/,
            handler: [
                home('index.html')
            ]
        },
        {
            location: /\.less($|\?)/,
            handler: [
                file(),
                less({
                    plugins: [autoprefixPlugin]
                })
            ]
        },
        {
            location: /\.styl($|\?)/,
            handler: [
                file(),
                stylus()
            ]
        },

        // 添加 mock 处理器
        autoresponse('edp', {
            logLevel: 'debug',
            root: __dirname,
            handlers: requireInjector,
            get: {
                match: function (reqPathName) { // mock all `/xx/xx` path
                    return !/\.\w+(\?.*)?$/.test(reqPathName);
                }
            },
            post: true,
            processor: {
                smarty: {
                    initerFile: './initer.php'
                }
            }
        }),

        {
            location: /^.*$/,
            handler: [
                file(),
                proxyNoneExists()
            ]
        }
    ];
};

exports.injectRes = function (res) {
    for (var key in res) {
        if (res.hasOwnProperty(key)) {
            global[key] = res[key];
        }
    }
};

// disable watchreload setting false
exports.watchreload = {
    hmr: false,
    files: [
        'src/**/*',
        'views/**/*.tpl'
    ]
};
