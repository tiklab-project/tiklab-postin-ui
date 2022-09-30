import React from "react";
import SysManage from "./sysManagMenu";

const SystemContent = (props) =>{

    const settingMenu = [
        {
            title: '系统权限中心',
            icon: 'laptop',
            key: "/systemManagement/system",
            encoded: "SysPrisystem",
            children: [
                {
                    title: '功能管理',
                    icon: 'laptop',
                    key: '/systemManagement/systemFeature',
                    encoded: "SysFeatruestem",
                },
                {
                    title: '角色管理',
                    icon: 'laptop',
                    key: '/systemManagement/systemRole',
                    encoded: "SysRoleSystem",
                }
            ]
        },{
            title: '项目权限中心',
            icon: 'laptop',
            key: "/systemManagement/project",
            encoded: "SysPriProject",
            children: [
                {
                    title: '功能管理',
                    icon: 'laptop',
                    key: '/systemManagement/privilege',
                    encoded: "SysFeatrueProject",
                },
                {
                    title: '角色管理',
                    icon: 'laptop',
                    key: '/systemManagement/role',
                    encoded: "SysRoleProject",
                }
            ]
        },
        {
            title: "消息中心",
            icon: 'laptop',
            key: '/systemManagement/message',
            encoded: "MessageCenter",
            children: [
                {
                    title: '消息管理',
                    icon: 'laptop',
                    key: '/systemManagement/messageManagement',
                    encoded: "MessageManagement",
                },
                {
                    title: '消息模板管理',
                    icon: 'laptop',
                    key: '/systemManagement/messageTemplate',
                    encoded: "MessageTemplate",
                },
                {
                    title: '消息类型管理',
                    icon: 'laptop',
                    key: '/systemManagement/messageType',
                    encoded: "SysMessageType",
                },
                {
                    title: '发送方式管理',
                    icon: 'laptop',
                    key: '/systemManagement/messageSendType',
                    encoded: "SysMessageSendType",
                },
            ]
        },

        {
            title: '插件管理',
            icon: 'laptop',
            key: '/systemManagement/plugin',
            encoded: "plugin",
        },{
            title: "日志",
            icon: 'laptop',
            key: '/systemManagement/opLog',
            encoded: "MessageCenter",
            children: [
                {
                    title: '日志列表',
                    icon: 'laptop',
                    key: '/systemManagement/log',
                    encoded: "log",
                },{
                    title: '日志模板',
                    icon: 'laptop',
                    key: '/systemManagement/logTemplate',
                    encoded: "logTemplate",
                },
            ]
        },{
            title: "TODO",
            icon: 'laptop',
            key: '/systemManagement/todo',
            encoded: "MessageCenter",
            children: [
                {
                    title: 'TODO模板',
                    icon: 'laptop',
                    key: '/systemManagement/todoTemp',
                    encoded: "todoTemp",
                },
                {
                    title: '我的TODO',
                    icon: 'laptop',
                    key: '/systemManagement/myTodo',
                    encoded: "myTodo",
                },
                {
                    title: '任务',
                    icon: 'laptop',
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