import React, {useState,useEffect} from "react";
import {Row,Col} from "antd";
import {applyJump, disableFunction, applySubscription, getVersionInfo, Axios, getUser} from "tiklab-core-ui";
import vipLight from '../../assets/img/vip.png';
import vipDark from '../../assets/img/notvip.png';
import "./SettingHome.scss";
import moment from "moment";
import {
    ApartmentOutlined,
    UserOutlined,
    MessageOutlined,
    GroupOutlined,
    ScheduleOutlined,
    AlertOutlined,
    HistoryOutlined,
    LaptopOutlined,
} from "@ant-design/icons"
import versionStore from "tiklab-licence-ui/es/version/VersionStore";

const IsSubScribeMap={
    1:"专业版",
    2:"专业版",
    3:"免费版",
    4:"免费版",
    5:"免费版"
}

const SettingHome = props => {
    const {findUseLicence} = versionStore;

    //系统设置统计数据
    const [count,setCount] = useState({});
    //当前版本
    const [licence,setLicence] = useState(null);
    //操作日志
    const [log,setLog] = useState(null);

    const [authUser, setAuthUser] = useState();

    const [cloudProductInfo, setCloudProductInfo] = useState();

    useEffect(async() => {
        const info = await Axios.post('/system/count', null);
        setCount(info.data);
    }, []);

    useEffect(async ()=>{
        let licenceInfo = await findUseLicence()
        setLicence(licenceInfo)
    },[])

    useEffect(async ()=>{
        let logInfo =  await Axios.post("/oplog/findlogpage", {"bgroup":"teston","userId":getUser().userId});
        setLog(logInfo.data)
    },[])

    useEffect(async ()=>{
        let info = await Axios.post("/applyAuth/findApplyAuth",null)
        setAuthUser(info.data.userNumber)
    },[])

    useEffect(async ()=>{
        if(version==="cloud"){
            let info = await Axios.post("/system/productInfo",null)
            setCloudProductInfo(info.data)
        }

    },[])



    const showProductInfo = () =>{
        if(version==="cloud"){
            if(!cloudProductInfo) return ;

            let expired;
            if( cloudProductInfo?.isSubScribe===1|| cloudProductInfo?.isSubScribe===2){
                expired=false
            }else {
                expired=true
            }
            return{
                expired:expired,
                time:cloudProductInfo?.endDate,
                authUser:cloudProductInfo?.authUser,
                userNum:cloudProductInfo?.userNum||0
            }
        }else {
            return{
                expired:getVersionInfo()?.expired,
                time:licence?.issuedTime,
                authUser:authUser,
                userNum:licence?.userNum||0
            }
        }
    }

    /**
     * 路由跳转
     */
    const li = ['orga','user','userGroup','dir'];
    const goPath = path => {
        const authConfig = JSON.parse(localStorage.getItem("authConfig"))
        if(!authConfig.authType){
            const isAuth = li.some(item => item===path)
            if(isAuth){
                return applyJump(`${authConfig.authServiceUrl}/#/setting/${path}`)
            }
        }
        props.history.push(`/setting/${path}`)
    }

    const goAuth = () => {
        if(version==='cloud'){
            return applyJump('https://work.cloud.tiklab.net/#/enterprise/auth/postin')
        }
        props.history.push(`/setting/productAuth`)
    }

    return (
        <Row className='setting-home'>
            <Col
                xs={{ span: "24" }}
                sm={{ span: "24" }}
                md={{ span: 24, offset: 0 }}
                lg={{ span: 20, offset: 2 }}
                xl={{ span: 18, offset: 3 }}
                xll={{ span: 16, offset: 4 }}
            >
                <div className='system-home-box'>

                    <div className='home-licence-box'>
                        <div className='home-licence'>
                            <div className='home-licence-item'>
                                <div className='home-licence-item-level'>
                                    <div className='licence-level-img'>
                                        <img src={showProductInfo()?.expired ? vipDark:vipLight} alt={''}/>
                                    </div>
                                    <div>
                                        <div>
                                            <span className='licence-level-info'>
                                                {
                                                    version==="cloud"
                                                        ? IsSubScribeMap[cloudProductInfo?.isSubScribe]
                                                        : disableFunction() ? '社区版' : '企业版'
                                                }
                                            </span>
                                            {showProductInfo()?.time &&
                                            <span className='licence-level-issuedTime'>
                                                {moment(showProductInfo()?.time).format('YYYY-MM-DD HH:mm:ss')}到期
                                            </span>}
                                        </div>
                                        <div className='licence-level-applyAuth'>
                                            <span className='licence-level-applyAuth-title'>授权人数：</span>
                                            <span className='licence-level-info' onClick={goAuth} style={{cursor:"pointer"}}>
                                                {showProductInfo()?.authUser } / {showProductInfo()?.expired ? "不限制" : showProductInfo()?.userNum > 0 ? showProductInfo().userNum+'人' : "不限制"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='home-licence-sub' onClick={()=>applySubscription('teston')}>
                                {showProductInfo()?.expired ? '订阅' : '续订'}
                            </div>
                        </div>
                    </div>

                    <div className='home-chunk-box'>
                        <div className='home-user-box'>
                            {
                                version==="cloud"
                                    ? <>
                                        <div className='home-title'>权限</div>
                                        <div className='home-user'>
                                            <div className='home-user-item' onClick={()=>goPath('systemRole')}>
                                                <div className='home-icon'><ScheduleOutlined /></div>
                                                <div className='home-label'>权限</div>
                                                <div className='home-info'>
                                                    {count?.roleCount || 0}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                    :<>
                                        <div className='home-title'>用户与权限</div>
                                        <div className='home-user'>
                                            <div className='home-user-item' onClick={()=>goPath('user')}>
                                                <div className='home-icon'><UserOutlined/></div>
                                                <div className='home-label'>用户</div>
                                                <div className='home-info'>
                                                    {count?.userCount || 0}
                                                </div>
                                            </div>
                                            <div className='home-user-item' onClick={()=>goPath('orga')}>
                                                <div className='home-icon'><ApartmentOutlined /></div>
                                                <div className='home-label'>部门</div>
                                                <div className='home-info'>
                                                    {count?.orgaCount || 0}
                                                </div>
                                            </div>
                                            <div className='home-user-item' onClick={()=>goPath('userGroup')}>
                                                <div className='home-icon'><GroupOutlined /></div>
                                                <div className='home-label'>用户组</div>
                                                <div className='home-info'>
                                                    {count?.userGroupCount || 0}
                                                </div>
                                            </div>
                                            <div className='home-user-item' onClick={()=>goPath('systemRole')}>
                                                <div className='home-icon'><ScheduleOutlined /></div>
                                                <div className='home-label'>权限</div>
                                                <div className='home-info'>
                                                    {count?.roleCount || 0}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                            }
                        </div>
                        <div className='home-message-box'>
                            <div className='home-title'>消息</div>
                            <div className='home-message'>
                                <div className='home-message-item' onClick={()=>goPath('messageNotice')}>
                                    <div className='home-icon'><MessageOutlined/></div>
                                    <div className='home-label'>消息通知方案</div>
                                    <div className='home-info'>
                                        {count?.msgNoticeCount || 0}
                                    </div>
                                </div>
                                <div className='home-message-item' onClick={()=>goPath('messageSendType')}>
                                    <div className='home-icon'><AlertOutlined /></div>
                                    <div className='home-label'>消息发送方式</div>
                                    <div className='home-info'>
                                        {count?.msgSendTypeCount || 0}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='home-security-box'>
                            <div className='home-title'>安全</div>
                            <div className='home-security'>
                                <div className='home-security-item' onClick={()=>goPath('backups')}>
                                    <div className='home-icon'><HistoryOutlined /></div>
                                    <div className='home-label'>上次备份时间</div>
                                    <div className='home-info'>{count?.lastBackupsTime && moment(count.lastBackupsTime).format('YYYY-MM-DD') || '无'}</div>
                                </div>
                                <div className='home-security-item' onClick={()=>goPath('log')}>
                                    <div className='home-icon'><LaptopOutlined /></div>
                                    <div className='home-label'>操作日志</div>
                                    <div className='home-info'>{log?.totalRecord || '0'}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    )
};

export default SettingHome;
