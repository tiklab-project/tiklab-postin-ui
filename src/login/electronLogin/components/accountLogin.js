/**
 * @name: accountLoginConiner
 * @author: mahai
 * @date: 2021-05-26 16:01
 * @description：账号中心登录
 * @update: 2021-05-26 16:01
 */
import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import {Button, Input, Form,} from 'antd';
import {parseUserSearchParams} from "tiklab-core-ui";

const validUserProductAuthService = async (userId) => {
    const formData = new FormData();
    formData.append("userId", userId);
    return await Axios.post('/appAuthorization/validUserInProduct', formData);
}
const FormItem = Form.Item;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const AccountLogin = props => {
    const {urlParams, eamStore, history, vaildUserAuthRouter} = props;

    const {login, user} = eamStore
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [loginError,setLoginError] = useState('')


    const onAccountLogin = async (values) => {
        let params = {
            account: values.account,
            password: values.password,
            dirId: props.loginType
        }
        const res =  await login(params)

        if(res.code !== 0) {
            switch (res.code) {
                case 50000:
                    setLoginError(t('loginError.accountError'));
                    break;
                default:
                    setLoginError(res.msg);
                    break
            }
        } else  {
            setLoginError('')
            if (!!vaildUserAuthRouter) {
                const response = await validUserProductAuthService(res.data.userId);
                debugger
                if (response.code === 0 && !!response.data){
                    try {
                        if (electronVersion) {
                            history.push('/')
                        }
                    } catch (e) {
                        const uerSearch = parseUserSearchParams(res.data)
                        window.location.href= `${urlParams.redirect}?${uerSearch}`
                    }
                } else {
                    return history.push(vaildUserAuthRouter)
                }
            } else {
                try {
                    if (electronVersion) {
                        history.push('/')
                    }
                } catch (e) {
                    const uerSearch = parseUserSearchParams(res.data)
                    window.location.href= `${urlParams.redirect}?${uerSearch}`
                }
            }
        }
    };
    return (
        <>
            {
                loginError && <p className='eam-login-error'>
                                        <span >
                                            {loginError}
                                        </span>
                </p>
            }
            <Form
                form={form}
                name="horizontal_login"
                {...layout}
                onFinish={onAccountLogin}
            >
                <FormItem
                    className={'eam-login-content-form-item'}
                    name="account"
                    rules={[
                        { required: true, message: t('loginForm.usernameRequired') },
                        ({ getFieldValue }) => ({
                            validator(rule, value, callback) {
                                if (value) {
                                    // const vaild = phoneReg.test(value) || emailReg.test(value)
                                    if (value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(t('loginForm.usernameCustomRequired'));
                                }
                                callback()
                            },
                        }),
                    ]}
                >
                    <Input placeholder={t('loginForm.usernamePlaceholder')} />
                </FormItem>
                <FormItem
                    className={'eam-login-content-form-item'}
                    name="password"
                    rules={[{ required: true, message: t('loginForm.passwordRequired') }]}
                >
                    <Input
                        type="password"
                        placeholder={t('loginForm.passwordPlaceholder')}
                    />
                </FormItem>
                <FormItem shouldUpdate={true} className={'eam-login-content-form-item'}>
                    {() => (
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{width:'100%'}}
                        >
                            {t('loginForm.LoginBtn')}
                        </Button>
                    )}
                </FormItem>
            </Form>
        </>

    )
}
export default AccountLogin
