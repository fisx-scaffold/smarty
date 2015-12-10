/**
 * @file mock data
 * @author autoresponse
 */

/* eslint-disable fecs-camelcase */

/**
 * 获取 mock 响应数据
 *
 * @param {string} path 请求路径名
 * @param {Object} queryParam 查询参数信息
 * @param {Object} postParam post 的查询参数信息
 * @return {Object}
 */
module.exports = function (path, queryParam, postParam) {
    return {
        // 可以通过该属性来设置响应的延时，也可以设为值为'0,100'，表示随机 0-100ms 的延时，默认 0
        _timeout: 0,

        // 通过该状态来设置响应的 http 的状态码，默认 200
        _status: 200,

        // 使用 smarty 处理渲染
        _process: 'smarty',

        // 要渲染的模板路径，模板路径相对于 `views`
        _tpl: 'index.tpl',

        // 模板数据
        tplData: {
            name: 'Jack',
            country: 'China'
        }
    };
};

/* eslint-enable fecs-camelcase */
