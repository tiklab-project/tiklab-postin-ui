/*
 * @Description: 本地环境
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-27 13:53:54
 */

const base_url =  JSON.stringify('http://192.168.10.34:8090');

let plugin_url  =  JSON.stringify("http://192.168.10.34:8090/pluginConfig/getPluginConfig");
let pluginAddressUrl = JSON.stringify('"http://127.0.0.1:3000/plugin.json');
const fetchMethod = JSON.stringify("get");

// const plugin_url = JSON.stringify("http://192.168.10.34:8090");
// let pluginAddressUrl = JSON.stringify('/pluginConfig/getPluginConfig');
// const fetchMethod = JSON.stringify("post");

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
    plugin_url ,
    pluginAddressUrl,
    fetchMethod,
    userProduction,
    appKey,
    appSecret,
    version,
    client,
    IS_DEV
}
