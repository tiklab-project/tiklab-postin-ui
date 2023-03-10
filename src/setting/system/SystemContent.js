import React from "react";
import SysManage from "./SysManagMenu";

/**
 * 系统导航项
 */
const SystemContent = (props) =>{

    const settingMenu = [
        {
            title: "用户与部门",
            icon: 'team',
            key: 'accountMember',
            children: [
                {
                    title: '部门',
                    key: '/systemManagement/org',
                    icon: 'modular',
                    encoded: "orga",
                },{
                    title: '用户',
                    key: '/systemManagement/user',
                    icon: 'modular',
                    encoded: "user",

                },{
                    title: '用户目录',
                    key: '/systemManagement/authConfig',
                    icon: 'modular',
                    encoded: "user_dir",
                },{
                    title: '用户组',
                    key: '/systemManagement/userGroup',
                    icon: 'modular',
                    // encoded: "userGroup",
                },
            ]
        },
        {
            title: '权限',
            icon: 'modular',
            key: '/systemManagement/systemRole',
            // encoded: "systemPrivilege",
        },
        {
            title: "消息",
            icon: 'xiaoxi',
            key: '/systemManagement',
            children: [
                {
                    title: "消息发送方式",
                    icon: 'rizhijilu',
                    key: '/systemManagement/messageSendType',
                    encoded: "MSG_SendType",
                },{
                    title: "消息通知方案",
                    icon: 'rizhijilu',
                    key: '/systemManagement/message-notice',
                    encoded: "MSG_Notice",
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
        },{
            title: '版本与许可证',
            icon: 'modular',
            key: '/systemManagement/version'
        },{
            title: '产品授权',
            icon: 'modular',
            key: '/systemManagement/product'
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
                },{
                    title: "消息发送方式",
                    icon: 'rizhijilu',
                    key: '/systemManagement/messageSendTypeBase',
                },
                {
                    title: "消息通知方案",
                    icon: 'rizhijilu',
                    key: '/systemManagement/message-notice-base',
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

    /**
     *  判断是否为开发环境
     */
    let menu = ()=>{
        try{
            if(IS_DEV){
                return [...settingMenu,...devMenu]
            }else {
                return [...settingMenu]
            }
        }catch {
            return [...settingMenu]
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