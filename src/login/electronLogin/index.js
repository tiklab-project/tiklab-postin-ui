/**
 * @name: index
 * @author mahai
 * @date 2022/7/9 12:24 PM
 * @description index
 */
import React, {useEffect, useState} from 'react';
import {setCookie, saveUser, urlQuery, LOCALSTORAGE_KEY, disableFunction, Axios, getVersionInfo} from 'tiklab-core-ui'

import {inject, observer} from 'mobx-react';
import { Button, Layout} from 'antd';
import {useTranslation} from "react-i18next";
import LocalLogin from "./components/localLogin";
import AccountLogin from "./components/accountLogin";

import './style/login.scss'
import {useHasPointPlugin} from "tiklab-plugin-core-ui";

const { Content, Footer } = Layout;


const authConfigService = async (axiosHeader={}) => {
    const formData = new FormData();
    try {
        if (base_url === '/') {
            formData.append("url", window.location.origin)
        } else {
            formData.append("url", base_url)
        }
    } catch (e) {
        formData.append("url", window.location.origin)
    }
    return await Axios.post('/authConfig/getAuthConfig', formData, axiosHeader)
};

const dingDingLoginService = async (params) => {
    return await Axios.post('/eam/dingding/passport/login',params)
}
const getConfByRelDirectoryIdService = async relDirectoryId => {
    const formData = new FormData();
    formData.append('relDirectory', relDirectoryId)
    switch (relDirectoryId) {
        case "3":
            return await Axios.post('/user/dingdingcfg/findId',formData);
        case "4":
            return await Axios.post('/user/wechatcfg/findWechatById',formData);
    }
}
const wechatLoginService = async (params) => {
    return await Axios.post('/wechat/passport/login', params)
}

const ElectronLogin = props => {
    const {loginGoRouter, title = '',vaildUserAuthRouter='/auth_result', ...rest} = props;
    const { t } = useTranslation();

    const query = urlQuery(window.location.href);
    // 获取登录配置
    const [authData, setAuthData] = useState(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY.AUTH_CONFIG)) || {})


    let versionInfo = getVersionInfo()
    const isPlugin = versionInfo && versionInfo.release===2 && !versionInfo.expired
    const hasWechatLoginBtn = useHasPointPlugin('wechatLoginBtn');

    const [wechatConfig, setWechatConfig] = useState(null);
    const [dingConfig, setDingConfig] = useState(null);
    const [wechatUrl,setWechatUrl] = useState("");
    const [dingdingURL, setDingdingURL] = useState('');
    const [loginType,setUseType] = useState("1");

    useEffect(() => {
        if (query.auth_device && query.device_id) {
            localStorage.setItem('auth_device', query.auth_device);
            localStorage.setItem('device_id', query.device_id);
        }
    }, []);

    useEffect( () => {
        (async() =>{
            await getAuthentication();
            await getWechatConfig();
            await getDingDingConfig();
        })();
        return () => {
            setAuthData({})
        }
    }, []);


    useEffect(() => {
        if (dingConfig) {
            const url = `${dingConfig.url}/connect/qrconnect?appid=${dingConfig.appKey}&response_type=code&scope=snsapi_login&state=dingDingScan&redirect_uri=${dingConfig.redirectUri}`;
            setDingdingURL(url)
        }
    }, [dingConfig]);

    useEffect(() => {
        if (wechatConfig && wechatConfig.agentId && wechatConfig.url) {
            const url = `https://open.work.weixin.qq.com/wwopen/sso/qrConnect?appid=${wechatConfig.corpid}&agentid=${wechatConfig.agentId}&redirect_uri=${wechatConfig.url}&state=wechatScan`;
            setWechatUrl(url)
        }
    }, [wechatConfig])


    /**
     * 获取企业微信配置
     * @returns {Promise<void>}
     */
    const getWechatConfig = async () => {
        const res = await getConfByRelDirectoryIdService("4")
        if (res.code === 0) {
            setWechatConfig(res.data)
        }
    };

    /**
     * 获取钉钉微信配置
     * @returns {Promise<void>}
     */
    const getDingDingConfig = async () => {
        const res = await getConfByRelDirectoryIdService("3")
        if (res.code === 0) {
            setDingConfig(res.data)
        }
    }

    /**
     * 根据主进程拿到钉钉的临时code请求数据
     */
    const authDingDingLogin = async (code) => {
        const res = await getConfByRelDirectoryIdService('3');
        const params = {
            code:code,
            appKey:res.data.appKey,
            appSecret:res.data.appSecret,
            url:res.data.url
        }
        const dingding = await  dingDingLoginService(params);
        if (dingding.data) {
            setCookie('loginType',"dingdingQR")
            saveUser(dingding.data);
            props.history.push('/')
        }
    }

    /**
     * 获取登录配置数据
     * @returns {Promise<void>}
     */
    const getAuthentication = async () => {
        const res = await authConfigService();
        if (!res.code) {
            const electronLoginUrl =  localStorage.getItem('ELECTRON_LOGIN_URL');
            if (electronLoginUrl) {
                localStorage.setItem(LOCALSTORAGE_KEY.AUTH_CONFIG, JSON.stringify({...res.data, authUrl:electronLoginUrl}))
                setAuthData({...res.data, authUrl:electronLoginUrl})
            } else {
                localStorage.setItem(LOCALSTORAGE_KEY.AUTH_CONFIG, JSON.stringify(res.data))
                setAuthData(res.data)
            }
        }
    }



    const goDingLogin = () => {
        if (dingdingURL && rest.electronDingDingQR) {
            rest.electronWeChatQR(dingdingURL)
        }
    }

    const goWechat = () => {
        if (wechatUrl) {
            if (rest.electronWeChatQR) {
                rest.electronWeChatQR(wechatUrl)
            } else {
                window.location.href = wechatUrl
            }
        }
    }
    const onLdap = () => {
        setUseType(loginType === "1" ? "2" : "1")
    }

    return(
        <Layout>
            <Content>
                <div className={'eam-login-content'}>
                    <div className={'eam-login-content-wrap-row'}>
                        <div className={'eam-login-content-formWrap'}>
                            <h1 style={{textAlign: 'center', marginTop: '30px'}}>
                                {t(loginType === "1" ?'loginForm.userLoginTitle' : "loginForm.userLoginLdapTitle")}ELE</h1>
                            <LocalLogin
                                title={title}
                                loginGo={loginGoRouter}
                                loginType={loginType}
                                {...rest}
                            />
                            {
                                loginType === "1" ?
                                    <div className={'eam-login-content-action'}>
                                        {/*<Button type="text" onClick={goDingLogin} disabled={disableFunction()}  >钉钉</Button>*/}
                                        <Button type="text" onClick={goWechat} disabled={!(isPlugin && hasWechatLoginBtn)}>企业微信</Button>
                                        <Button type="text" onClick={onLdap}>
                                            Ldap
                                        </Button>
                                    </div>
                                    :
                                    <div className={'eam-login-content-action'}>
                                        <Button type="text" onClick={goWechat} disabled={!(isPlugin && hasWechatLoginBtn)} >企业微信</Button>
                                        <Button type="text" onClick={onLdap}>
                                            账号登录
                                        </Button>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </Content>
        </Layout>
    )
}
export default observer(ElectronLogin)
