/**
 * @file fisx 编译的配置文件
 * @author ${#author#}
 */

var urlPrefix = '{%$host%}';

// 初始化要编译的样式文件: 只处理页面引用的样式文件
var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var autoprefixPlugin = new LessPluginAutoPrefix({browsers: ['ie >= 8', 'last 2 versions']});
fis.initProcessStyleFiles({
    files: ['/views/**/*.tpl', '/views/*.tpl'],
    preprocess: function (path) {
        return path.replace(urlPrefix, '');
    }
}, {
    plugins: [autoprefixPlugin]
}, true);

// 设置 domain
fis.set('project.domain', urlPrefix);

// 启用相对路径
fis.match('*.js', {
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
            asynDeps: fis.util.extractAsyncModuleIds(content)
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
