import React, { useEffect, useState, useCallback } from 'react';
import './sysMana.scss';
import {Axios, getUser} from 'thoughtware-core-ui';
import { useHistory } from 'react-router';

const InfoBox = React.memo(({ title, data, onClick }) => (
    <div>
        <div className="header-title">{title}</div>
        <div className="system-menu-box">
            {data.map((item) => (
                <div
                    key={item.key}
                    className="system-menu-item"
                    onClick={() => onClick(item.key)}
                >
                    {
                        item.count === 0||item.count > 0
                            ?<div>{item.count}</div>
                            :null
                        }
                    <div>{item.title}</div>
                </div>
            ))}
        </div>
    </div>
));

const SystemHome = () => {
    const history = useHistory();
    const [countInfo, setCountInfo] = useState();
    const authConfig = JSON.parse(localStorage.getItem("authConfig"))

    useEffect(() => {
        const fetchData = async () => {
            try {
                const info = await Axios.post('/system/count', null);
                setCountInfo(info.data);
            } catch (error) {
                console.error('Failed to fetch count info:', error);
            }
        };
        fetchData();
    }, []);

    const handleClick = useCallback((router) => {
        if (!authConfig.authType) {
            const specialKeys = [
                "/setting/orga",
                "/setting/user",
                "/setting/dir",
                "/setting/userGroup"
            ];

            if (specialKeys.includes(router)) {
                let authServiceUrl = authConfig.authServiceUrl
                let ticket = getUser().ticket
                let url = authServiceUrl +"#"+router+"?ticket="+ticket

                window.open(url, "_blank");
                return;
            }
        }

        history.push(router);
    }, [history]);

    const userAndRole = [
        { title: '部门', key: '/setting/orga', count: countInfo?.orgaCount },
        { title: '用户', key: '/setting/user', count: countInfo?.userCount },
        { title: '用户目录', key: '/setting/dir',count: countInfo?.userDirCount },
        { title: '用户组',key: '/setting/userGroup',count: countInfo?.userGroupCount },
        { title: '权限', key: '/setting/systemRole', count: countInfo?.roleCount },
    ];

    const role = [ { title: '权限', key: '/setting/systemRole', count: countInfo?.roleCount }]


    const message = [
        { title: '消息发送方式', key: '/setting/messageSendType', count: countInfo?.msgSendTypeCount },
        { title: '消息通知方案', key: '/setting/message-notice', count: countInfo?.msgNoticeCount },
    ];

    const plugin = [{ title: '插件', key: '/setting/plugin' }];

    const security = [
        { title: '操作日志', key: '/setting/log' },
        { title: '备份与恢复', key: '/setting/backups' },
    ];

    const application = [
        { title: '版本与许可证', key: '/setting/version' },
        { title: '应用访问权限', key: '/setting/product-auth' },
    ];

    return (
        <div className="system-home">
            <div className="system-content">
                {
                    version==="cloud"
                        ? <InfoBox title="权限" data={role} onClick={handleClick} />
                        : <InfoBox title="用户与权限" data={userAndRole} onClick={handleClick} />
                }
                <InfoBox title="消息" data={message} onClick={handleClick} />
                <InfoBox title="插件" data={plugin} onClick={handleClick} />
                <InfoBox title="安全" data={security} onClick={handleClick} />
                <InfoBox title="应用" data={application} onClick={handleClick} />
            </div>
        </div>
    );
};

export default SystemHome;