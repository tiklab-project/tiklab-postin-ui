import React from "react";
import SysManage from "./sysManagMenu";

const SystemContent = (props) =>{

    const settingMenu = [
        {
            title: '系统权限中心',
            icon: 'modular',
            key: "/systemManagement/system",
            encoded: "systemPrivilege",
            children: [
                {
                    title: '功能管理',
                    icon: 'modular',
                    key: '/systemManagement/systemFeature',
                    encoded: "systemFeature",
                },
                {
                    title: '角色管理',
                    icon: 'modular',
                    key: '/systemManagement/systemRole',
                    encoded: "systemRole",
                }
            ]
        },{
            title: '项目权限中心',
            icon: 'modular',
            key: "/systemManagement/project",
            encoded: "projectPrivilege",
            children: [
                {
                    title: '功能管理',
                    icon: 'modular',
                    key: '/systemManagement/privilege',
                    encoded: "projectPrivilege",
                },
                {
                    title: '角色管理',
                    icon: 'modular',
                    key: '/systemManagement/role',
                    encoded: "projectRole",
                }
            ]
        },
        {
            title: "消息中心",
            icon: 'modular',
            key: '/systemManagement/message',
            encoded: "MessageCenter",
            children: [
                {
                    title: '消息管理',
                    icon: 'modular',
                    key: '/systemManagement/messageManagement',
                    encoded: "MessageManagement",
                },
                {
                    title: '消息模板管理',
                    icon: 'modular',
                    key: '/systemManagement/messageTemplate',
                    encoded: "MessageTemplate",
                },
                {
                    title: '消息类型管理',
                    icon: 'modular',
                    key: '/systemManagement/messageType',
                    encoded: "SysMessageType",
                },
                {
                    title: '发送方式管理',
                    icon: 'modular',
                    key: '/systemManagement/messageSendType',
                    encoded: "SysMessageSendType",
                },
            ]
        },

        {
            title: '插件管理',
            icon: 'modular',
            key: '/systemManagement/plugin',
            encoded: "plugin",
        },{
            title: "日志",
            icon: 'modular',
            key: '/systemManagement/opLog',
            encoded: "opLog",
            children: [
                {
                    title: '日志列表',
                    icon: 'modular',
                    key: '/systemManagement/log',
                    encoded: "log",
                },{
                    title: '日志模板',
                    icon: 'modular',
                    key: '/systemManagement/logTemplate',
                    encoded: "logTemplate",
                },
            ]
        },{
            title: "TODO",
            icon: 'modular',
            key: '/systemManagement/todo',
            encoded: "TODO",
            children: [
                {
                    title: 'TODO模板',
                    icon: 'modular',
                    key: '/systemManagement/todoTemp',
                    encoded: "todoTemp",
                },
                {
                    title: '我的TODO',
                    icon: 'modular',
                    key: '/systemManagement/myTodo',
                    encoded: "myTodo",
                },
                {
                    title: '任务',
                    icon: 'modular',
                    key: '/systemManagement/taskList',
                    encoded: "taskList",
                }
            ]
        },


    ]

    return(
        <SysManage
            settingMenu={settingMenu}
            {...props}
        />
    )
}

export default SystemContent;