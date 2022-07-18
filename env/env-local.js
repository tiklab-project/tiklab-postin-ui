/*
 * @Description: 本地环境
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-27 13:53:54
 */

const base_url =  JSON.stringify('http://192.168.10.16:8080');
const plugin_base_url = JSON.stringify("http://127.0.0.1:3000");
// const pluginAddressUrl = JSON.stringify('/pluginConfig/getPluginConfig');

let pluginAddressUrl =  JSON.stringify("http://127.0.0.1:3000/plugin.json");

const fetchMethod = JSON.stringify("get");

//判断是否是用户环境，公司内部切为false用于调试
const userProduction = false;

const appKey = JSON.stringify('appkey');
const appSecret = JSON.stringify('appsecret');
const version = JSON.stringify('1.0.1');
const client = JSON.stringify('1.1.0');

const acc_url = JSON.stringify('http://127.0.0.1:3000');


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
    acc_url
}