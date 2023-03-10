/**
 * @name: localLogin
 * @author: mahai
 * @date: 2021-05-26 16:05
 * @description：本地系统登录
 * @update: 2021-05-26 16:05
 */


import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import {Button, Input, Form} from 'antd';

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

const LocalLogin =  props => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [loginError,setLoginError] = useState('')


    const onLogin = async values => {
        let params = {
            account: values.account,
            password: values.password,
            dirId: props.loginType
        }
        const res = await props.eamStore.login(params)

        if(res.code) {
            switch (res.code) {
                case 50000:
                    setLoginError(t('loginError.accountError'));
                    break;
                default:
                    setLoginError(res.msg);
                    break
            }
        } else  {
            setLoginError('');
            if (!!props.vaildUserAuthRouter) {
                const response = await validUserProductAuthService(res.data.userId);
                if (response.code === 0 && !!response.data){
                    if (props.loginGo) {
                        return props.history.push(props.loginGo)
                    }
                    return props.history.push('/')
                } else {
                    return props.history.push(props.vaildUserAuthRouter)
                }
            } else {
                if (props.loginGo) {
                    return props.history.push(props.loginGo)
                }
                return props.history.push('/')
            }
        }
    }

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
                onFinish={onLogin}
            >
                <FormItem
                    className={'eam-login-content-form-item'}
                    name="account"
                    rules={[
                        { required: true, message: t('loginForm.usernameRequired') },

                        ({ getFieldValue }) => ({
                            validator(rule, value,callback) {
                                if(value) {
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
                    <Input  style={{width: "200px"}} placeholder={t('loginForm.usernamePlaceholder')} />
                </FormItem>
                <FormItem
                    className={'eam-login-content-form-item'}
                    name="password"
                    rules={[{ required: true, message: t('loginForm.passwordRequired') }]}
                >
                    <Input
                        style={{width: "200px"}}
                        type="password"
                        placeholder={t('loginForm.passwordPlaceholder')}
                    />
                </FormItem>
                <FormItem shouldUpdate={true} className={'eam-login-content-form-item'}>
                    {() => (
                        <Button

                            type="primary"
                            htmlType="submit"
                            style={{width:'100px'}}
                        >
                            {t('loginForm.LoginBtn')}
                        </Button>
                    )}
                </FormItem>
            </Form>
        </>

    )
}

export default LocalLogin
