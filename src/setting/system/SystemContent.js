import React from "react";
import SysManagMenu from "./SysManagMenu";

/**
 * 系统导航项
 */
const SystemContent = (props) =>{

    const settingMenu = [
        {
            title: "用户与权限",
            icon: 'chengyuan',
            id: 'accountMember',
            children: [
                {
                    title: '部门',
                    id: '/setting/orga',
                    purviewCode: "orga",
                },{
                    title: '用户',
                    id: '/setting/user',
                    purviewCode: "user",
                },{
                    title: '用户目录',
                    id: '/setting/dir',
                    purviewCode: "user_dir",
                },{
                    title: '用户组',
                    id: '/setting/userGroup',
                    // purviewCode: "userGroup",
                },
                {
                    title: '权限',
                    icon: 'jiaosequanxian',
                    id: '/setting/systemRole',
                    // purviewCode: "systemPrivilege",
                },
            ]
        },

        {
            title: "消息",
            icon: 'xiaoxi',
            id: '/setting',
            children: [
                {
                    title: "消息发送方式",
                    id: '/setting/messageSendType',
                    purviewCode: "MSG_SendType",
                },{
                    title: "消息通知方案",
                    id: '/setting/messageNotice',
                    purviewCode: "MSG_Notice",
                },
            ],
        },{
            title: "安全",
            icon: 'anquan',
            id: '/setting/log',
            purviewCode: "security",
            children: [
                {
                    title: "操作日志",
                    id: '/setting/log',
                    purviewCode: "log",
                },{
                    title: "备份与恢复",
                    id: '/setting/backups',

                }
            ],
        },
        {
            title: '应用',
            icon: 'xukezheng',
            id: '/setting/version',
            children: [
                {
                    title: "版本与许可证",
                    id: '/setting/version',
                },{
                    title: "应用访问权限",
                    id: '/setting/product-auth',

                }
            ],
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
                    id: '/setting/systemFeature',
                },{
                    title: '系统权限',
                    id: '/setting/baseSystemRole',
                },{
                    title: '项目功能管理',
                    id: '/setting/privilege',
                }, {
                    title: '项目权限',
                    id: '/setting/role',
                },{
                    title: "消息发送方式",
                    id: '/setting/messageSendTypeBase',
                },
                {
                    title: "消息通知方案",
                    id: '/setting/message-notice-base',
                },
                {
                    title: '消息类型管理',
                    id: '/setting/messageType',
                },{
                    title: '日志模板',
                    id: '/setting/logTemplate',
                },{
                    title: '日志类型',
                    id: '/setting/logType',
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