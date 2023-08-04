import React from "react";
import SysManagMenu from "./SysManagMenu";

/**
 * 系统导航项
 */
const SystemContent = (props) =>{

    const settingMenu = [
        {
            title: "用户与部门",
            icon: 'team',
            id: 'accountMember',
            children: [
                {
                    title: '部门',
                    id: '/systemManagement/org',
                    purviewCode: "orga",
                },{
                    title: '用户',
                    id: '/systemManagement/user',
                    purviewCode: "user",

                },{
                    title: '用户目录',
                    id: '/systemManagement/authConfig',
                    purviewCode: "user_dir",
                },{
                    title: '用户组',
                    id: '/systemManagement/userGroup',
                    // purviewCode: "userGroup",
                },
            ]
        },
        {
            title: '权限',
            icon: 'modular',
            id: '/systemManagement/systemRole',
            // purviewCode: "systemPrivilege",
        },
        {
            title: "消息",
            icon: 'xiaoxi',
            id: '/systemManagement',
            children: [
                {
                    title: "消息发送方式",
                    id: '/systemManagement/messageSendType',
                    purviewCode: "MSG_SendType",
                },{
                    title: "消息通知方案",
                    id: '/systemManagement/message-notice',
                    purviewCode: "MSG_Notice",
                },
            ],
        },
        {
            title: '插件',
            icon: 'modular',
            id: '/systemManagement/plugin',
            purviewCode: "plugin",
        },{
            title: "安全",
            icon: 'modular',
            id: '/systemManagement/log',
            purviewCode: "security",
            children: [
                {
                    title: "操作日志",
                    id: '/systemManagement/log',
                    purviewCode: "log",
                },
            ],
        },
        {
            title: '版本与许可证',
            icon: 'modular',
            id: '/systemManagement/version'

        },
    ]

    const devMenu = [
        {
            title: "基础数据",
            icon: 'zu',
            id: 'dev',
            children: [
                {
                    title: '系统功能管理',
                    id: '/systemManagement/systemFeature',
                },{
                    title: '系统权限',
                    id: '/systemManagement/baseSystemRole',
                },{
                    title: '项目功能管理',
                    id: '/systemManagement/privilege',
                }, {
                    title: '项目权限',
                    id: '/systemManagement/role',
                },{
                    title: "消息发送方式",
                    id: '/systemManagement/messageSendTypeBase',
                },
                {
                    title: "消息通知方案",
                    id: '/systemManagement/message-notice-base',
                },
                {
                    title: '消息类型管理',
                    id: '/systemManagement/messageType',
                },{
                    title: '日志模板',
                    id: '/systemManagement/logTemplate',
                },{
                    title: '日志类型',
                    id: '/systemManagement/logType',
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
        <SysManagMenu
            settingMenu={menu}
            {...props}
        />
    )
}

export default SystemContent;