/*
 * @Description: 本地环境
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-27 13:53:54
 */

const base_url =  JSON.stringify('http://192.168.10.22:8090');
const plugin_base_url = JSON.stringify("http://192.168.10.22:8090");

let pluginAddressUrl =  JSON.stringify("http://192.168.10.22:8090/plugin.json");

const fetchMethod = JSON.stringify("get");

//判断是否是用户环境，公司内部切为false用于调试
const userProduction = true;

const appKey = JSON.stringify('appkey');
const appSecret = JSON.stringify('appsecret');
const version = JSON.stringify('ce');
const client = JSON.stringify('web');

//发送请求有用到
const IS_DEV = true;

module.exports = {
    base_url,
    plugin_base_url,
    pluginAddressUrl,
    fetchMethod,
    userProduction,
    appKey,
    appSecret,
    version,
    client,
    IS_DEV
}
