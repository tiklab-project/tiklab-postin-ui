/*
 * @Description:
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-27 15:43:43
 */
// const base_url = JSON.stringify( 'http://192.168.10.16:8080' );
// let plugin_base_url = JSON.stringify( 'http://192.168.10.16:8080');
// let pluginAddressUrl = JSON.stringify('http://192.168.10.16:8080/pluginConfig/getPluginConfig');

const base_url = JSON.stringify( '/' );
let plugin_base_url = JSON.stringify( '/');
let pluginAddressUrl = JSON.stringify('/pluginConfig/getPluginConfig');
let fetchMethod = JSON.stringify("post");

const userProduction = true;

const appKey =  JSON.stringify('ghuyuhh');
const appSecret = JSON.stringify('koon');
const version = JSON.stringify('1.0.1');
const client = JSON.stringify('1.1.0');

// const acc_url = JSON.stringify('http://portal.dev.doublekit.net');

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
    // acc_url
}
