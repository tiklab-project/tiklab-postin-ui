/*
 * @Description: 本地环境
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-27 13:53:54
 */

const base_url =  JSON.stringify('http://192.168.10.16:8080');
const plugin_base_url = JSON.stringify("http://127.0.0.1:3000");
const pluginAddressUrl = JSON.stringify('http://127.0.0.1:3000/config.json');
const fetchMethod = JSON.stringify("get");

const userProduction = false;

const appKey = JSON.stringify('appkey');
const appSecret = JSON.stringify('appsecret');
const version = JSON.stringify('1.0.1');
const client = JSON.stringify('1.1.0');

const ISCEEESAAS = JSON.stringify('ce');

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
    ISCEEESAAS,
}
