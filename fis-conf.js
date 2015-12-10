/**
 * @file fisx 编译的配置文件
 * @author ${author}
 */

var urlPrefix = '{%$host%}';

// 初始化要编译的样式文件: 只处理页面引用的样式文件
var _ = fis.util;
var styleFiles = _.extractLinkStyleFileSync({
    scanDir: './views',
    preprocess: function (path) {
        return path.replace(urlPrefix, '');
    }
});
var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var autoprefixPlugin = new LessPluginAutoPrefix({browsers: ['ie >= 8', 'last 2 versions']});
fis.addProcessStyleFiles(styleFiles, {
    plugins: [autoprefixPlugin]
}, true);

// 设置 domain
fis.set('project.domain', urlPrefix);

// 监听根据引用的资源路径查询文件事件，对于一些包含特殊 prefix 做特殊处理
fis.on('lookup:file', function (info, file) {
    if (info.file) {
        return;
    }

    if (info.rest.indexOf(urlPrefix) !== -1) {
        // 为了避免像被 fis3-hook-amd 监听的 lookup:file 事件又改写了，这里 rest 值还是保持原来的
        var result = fis.project.lookup(info.rest.replace(urlPrefix, ''));
        info.file = result.file;
        info.id = result.id;
        info.moduleId = result.moduleId;
    }
});

// 启用相对路径
fis.match('index.html', {
    relative: true
}).match('*.js', {
    relative: true
}).match('*.css', {
    relative: true
});

// 启用 amd 模块编译
fis.hook('amd', {
    parseScript: function (content, info) {
        if (!info.isInline) {
            return;
        }

        // 提取 smarty 模板的异步模块信息
        return {
            asynDeps: _.extractAsyncModuleIds(content)
        };
    },
    config: fis.getModuleConfig()
});

// 启用打包插件
fis.match('::package', {
    packager: fis.plugin('static', {
        // 自定义打包要输出重写的模块配置信息
        amdConfig: {
            baseUrl: urlPrefix + '/asset'
        },

        // 内联 `require.config`
        inlineResourceConfig: true,

        page: {
            files: ['views/**.tpl'],
            // 打包页面异步入口模块
            packAsync: true
        }
    })
});
