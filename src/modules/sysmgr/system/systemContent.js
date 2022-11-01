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
            title: "消息通知",
            icon: 'xiaoxi',
            key: '/systemManagement/messageSendType',
            encoded: "MessageCenter",
        },
        {
            title: "待办任务",
            icon: 'zu',
            key: '/systemManagement/todo',
            encoded: "TODO",
            children: [
                {
                    title: '我的待办',
                    icon: 'modular',
                    key: '/systemManagement/myTodo',
                    encoded: "myTodo",
                },
                {
                    title: '代办列表',
                    icon: 'modular',
                    key: '/systemManagement/taskList',
                    encoded: "todoList",
                },
            ],
        },
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
                    title: '项目功能管理',
                    icon: 'modular',
                    key: '/systemManagement/privilege',
                }, {
                    title: '项目权限',
                    icon: 'modular',
                    key: '/systemManagement/role',
                },{
                    title: '消息管理',
                    icon: 'modular',
                    key: '/systemManagement/messageManagement',
                },
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
                },
                {
                    title: '代办模板',
                    icon: 'modular',
                    key: '/systemManagement/todoTemp',
                },
            ],
        }
       ,
    ]



    let authConfig = JSON.parse(localStorage.getItem("authConfig"))


    //判断是否为本地登录，如果authType===true 为本地登录，需要添加账号与成员
    let menu = ()=>{
        try{
            if(IS_DEV&&authConfig.authType===true){
                return [...accountMember,...settingMenu,...devMenu]
            }else if(!IS_DEV&&authConfig.authType===true){
                return [...accountMember,...settingMenu]
            }else if(!IS_DEV&&authConfig.authType===false){
                return [...accountMember,...settingMenu]
            }
        }catch {
            if(authConfig.authType===true){
                return [...accountMember,...settingMenu]
            }else{
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