/*
 * @Description: 本地环境
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-27 13:53:54
 */

const base_url =  JSON.stringify('http://192.168.10.12:8090');

const plugin_base_url = JSON.stringify("/");

let plugin_url  =  JSON.stringify("http://127.0.0.1:3000/plugin.json");

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
    plugin_url ,
    plugin_base_url,
    fetchMethod,
    userProduction,
    appKey,
    appSecret,
    version,
    client,
    IS_DEV
}
