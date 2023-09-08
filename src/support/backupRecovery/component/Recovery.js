import React,{useState,useEffect,useRef} from "react";
import {message, Spin, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {getUser} from "tiklab-core-ui";
import Btn from "../../../common/btn/Btn";
import BreadCrumb from "../../../common/breadcrumb/Breadcrumb";
import backupRecoveryStore from "../store/BackupRecoveryStore";
import "./Backups.scss";

/**
 * 恢复
 */
const Recovery = props =>{

    const {restore,findRestore} = backupRecoveryStore

    const logRef = useRef();

    // 恢复的数据
    const [recoveryInfo,setRecoveryInfo] = useState(null)

    // 上传文件返回的数据
    const [fileInfo,setFileInfo] = useState(null)

    // 上传文件内容
    const [fileList,setFileList] = useState([])

    // 日志滚动条
    const [isActiveSlide,setIsActiveSlide] = useState(true)

    // 加载状态
    const [isLoading,setIsLoading] = useState(true)

    useEffect(()=>{
        // 日志滚动条处于最下面
        if(logRef?.current && isActiveSlide){
            logRef.current.scrollTop = logRef.current.scrollHeight
        }
    },[isActiveSlide,recoveryInfo?.log])

    let interval
    useEffect(()=>{
        // 获取恢复数据
        doFindRestore()
        return ()=>{
            clearInterval(interval)
            setIsActiveSlide(true)
            setIsLoading(true)
        }
    },[])

    /**
     * 获取恢复数据
     */
    const doFindRestore = () => {
        findRestore().then(res=>{
            setIsLoading(false)
            if(res.code===0){
                setRecoveryInfo(res.data)
                if(res.data?.runState==='run'){findInter()}
            }
        })
    }

    const findInter = () => {
        clearInterval(interval)
        interval = setInterval(()=>findRestore().then(res=>{
            if(res.code===0){
                setRecoveryInfo(res.data)
                if(res.data.runState!=='run'){
                    clearInterval(interval)
                    setFileInfo(null)
                    setFileList([])
                }
            }
            else {clearInterval(interval)}
        }),1000)
    }

    /**
     * 开始恢复
     */
    const startRecovery = () =>{
        if(fileInfo?.resData){
            restore(fileInfo.resData).then(res=>{
                if(res.code===0){
                    doFindRestore()
                    setIsActiveSlide(true)
                }
                else {message.error(res.msg,0.5)}
            })
            return
        }
        message.info("请先上传恢复文件",0.5)
    }

    const url = base_url === '/' ? window.location.origin : base_url

    const fileUpload = {
        accept: '.tar.gz',
        name: 'uploadFile',
        action: url + '/postin/backups/uploadBackups',
        headers:{
            ticket:getUser().ticket,
            tenant:version==='ce'? null:getUser().tenant,
        },
        onChange(info) {
            setFileInfo(null)
            if (info.file.status === 'done') {
                if(info.file.response.code === 0){
                    setFileInfo({
                        name:info.file.name,
                        resData:info.file.response.data
                    })
                    setFileList(info.fileList)
                    message.info("上传成功",0.5)
                }
                else {message.error("上传失败",0.5)}
            }
            if (info.file.status === 'error')  {
                message.error("上传失败",0.5)
            }
        },
    }

    const ResultHtml = () => {
        switch(recoveryInfo?.runState){
            case 'success':return "成功"
            case 'error':return "失败"
            case 'run':return "恢复中"
            default:return "无"
        }
    }

    // 加载状态
    if(isLoading){
        return (
            <div className='backups-loading'>
                <Spin size='large' />
                <div className='backups-loading-title'>加载中</div>
            </div>
        )
    }

    return (
        <div className="backups">
            <div className="backups-content">
                <div className="backups-content-main">
                    <BreadCrumb firstItem={"恢复"}/>
                    <div className="backups-center">
                        <div className='backups-info-item backups-info-item-hint'>请注意：数据恢复，如果有数据，会将你现在的所有数据恢复到备份的版本。</div>
                        <div className='backups-info-item backups-info-item-hint'>为防止误操作，导入需要恢复的备份文件,还需点击恢复按钮才执行恢复操作,仅支持备份的.tar.gz文件。</div>
                        <div className="backups-info-item">
                            <span>最近恢复记录：</span>
                            <span>{recoveryInfo?.createTime || '无'}</span>
                        </div>
                        <div className="backups-info-item">
                            <span>最近恢复结果：</span>
                            <span className={`backups-info-item-${recoveryInfo?.runState}`}>{ResultHtml()}</span>
                        </div>
                        <div className='backups-info-item'>
                            {
                                fileInfo?.name ?
                                    <Upload {...fileUpload} disabled={recoveryInfo?.runState==='run'} fileList={fileList}/>
                                    :
                                    <Upload {...fileUpload} >
                                        <Btn icon={<UploadOutlined />}>上传恢复文件</Btn>
                                    </Upload>
                            }

                        </div>
                        <div className='backups-info-item'>
                            {
                                recoveryInfo?.runState === 'run' ?
                                    <Btn
                                        type={"disabled"}
                                        title={"恢复"}
                                    />
                                    :
                                    <Btn
                                        type={"primary"}
                                        title={"恢复"}
                                        onClick={startRecovery}
                                    />
                            }
                        </div>
                    </div>
                    <div className="backups-log-title">日志</div>
                    <div className="backups-log-content" ref={logRef}
                         onWheel={()=>setIsActiveSlide(false)}
                    >
                        { recoveryInfo?.log || '暂无日志' }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Recovery