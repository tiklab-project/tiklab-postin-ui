import React from "react";
import SysManage from "./sysManagMenu";

const SystemContent = (props) =>{

    //账号与成员
    let accountMember = [
        {
            title: "成员与部门",
            icon: 'team',
            key: 'accountMember',
            children: [
                {
                    title: '部门',
                    key: '/systemManagement/org',
                    icon: 'modular',
                    encoded: "org",
                },{
                    title: '用户',
                    key: '/systemManagement/user',
                    icon: 'modular',
                    encoded: "user",

                },{
                    title: '用户目录',
                    key: '/systemManagement/authConfig',
                    icon: 'modular',
                    encoded: "authConfig",
                },
            ]
        }
    ]

    const settingMenu = [
        {
            title: '权限',
            icon: 'modular',
            key: '/systemManagement/systemRole',
            encoded: "systemPrivilege",
        },
        {
            title: "消息",
            icon: 'xiaoxi',
            key: '/systemManagement',
            children: [
                {
                    title: "消息类型",
                    icon: 'rizhijilu',
                    key: '/systemManagement/messageSendType',
                    encoded: "messageSendType",
                },{
                    title: "消息通知",
                    icon: 'rizhijilu',
                    key: '/systemManagement/message-notice',
                    // encoded: "notice",
                },
            ],
        },
        // {
        //     title: '代办任务',
        //     icon: 'modular',
        //     key: '/systemManagement/myTodo',
        //     encoded: "myTodo",
        //
        // },
        {
            title: '插件',
            icon: 'modular',
            key: '/systemManagement/plugin',
            encoded: "plugin",
        },{
            title: "安全",
            icon: 'rizhijilu',
            key: '/systemManagement/log',
            encoded: "security",
            children: [
                {
                    title: "操作日志",
                    icon: 'rizhijilu',
                    key: '/systemManagement/log',
                    encoded: "log",
                },
            ],
        },{
            title: '版本与许可证',
            icon: 'modular',
            key: '/systemManagement/version'
        },
    ]

    const devMenu = [
        {
            title: "基础数据",
            icon: 'zu',
            key: 'dev',
            children: [
                {
                    title: '系统功能管理',
                    icon: 'modular',
                    key: '/systemManagement/systemFeature',
                },{
                    title: '系统权限',
                    icon: 'modular',
                    key: '/systemManagement/baseSystemRole',
                },{
                    title: '项目功能管理',
                    icon: 'modular',
                    key: '/systemManagement/privilege',
                }, {
                    title: '项目权限',
                    icon: 'modular',
                    key: '/systemManagement/role',
                },
                // {
                //     title: '消息管理',
                //     icon: 'modular',
                //     key: '/systemManagement/messageManagement',
                // },
                {
                    title: '消息模板管理',
                    icon: 'modular',
                    key: '/systemManagement/messageTemplate',
                },
                {
                    title: '消息类型管理',
                    icon: 'modular',
                    key: '/systemManagement/messageType',
                },{
                    title: '日志模板',
                    icon: 'modular',
                    key: '/systemManagement/logTemplate',
                },{
                    title: '日志类型',
                    icon: 'modular',
                    key: '/systemManagement/logType',
                },
                {
                    title: '代办模板',
                    icon: 'modular',
                    key: '/systemManagement/todoTemp',
                },
            ],
        }
    ]



    let authConfig = JSON.parse(localStorage.getItem("authConfig"))


    //判断是否为本地登录，如果authType===true 为本地登录，需要添加账号与成员
    let menu = ()=>{

        let authType =authConfig.authType

        try{
            console.log("aaa")
            if(IS_DEV&&authType){   //本地
                return [...accountMember,...settingMenu,...devMenu]
            }else if(IS_DEV&&!authType){  //统一  本地
                return [...settingMenu,...devMenu]
            }else if(!IS_DEV&&authType){  //线上
                return [...accountMember,...settingMenu]
            }else if(!IS_DEV&&!authType){  //统一  线上
                return settingMenu
            }
        }catch {
            if(authType){
                return [...accountMember,...settingMenu]
            }else if(!IS_DEV&&!authType){  //统一
                return settingMenu
            }
        }
    }

    return(
        <SysManage
            settingMenu={menu}
            {...props}
        />
    )
}

export default SystemContent;