import React,{useEffect,useState,useRef} from "react";
import {message, Radio, Spin} from "antd";
import Btn from "../../../common/btn/Btn";
import BreadCrumb from "../../../common/breadcrumb/Breadcrumb";
import backupRecoveryStore from "../store/BackupRecoveryStore";
import "./Backups.scss";

/**
 * 备份
 */
const Backups = props =>{

    const {backups,findBackups,updateBackups} = backupRecoveryStore

    const scrollRef = useRef();

    // 备份数据
    const [backupsInfo,setBackupsInfo] = useState(null)

    // 日志滚动条
    const [isActiveSlide,setIsActiveSlide] = useState(true)

    // 加载状态
    const [isLoading,setIsLoading] = useState(true)

    useEffect(()=>{
        // 日志滚动条处于最下面
        if(scrollRef?.current && isActiveSlide){
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    },[isActiveSlide,backupsInfo?.log])

    let interval
    useEffect(()=>{
        // 获取备份数据
        doFindBackups()
        return ()=>{
            clearInterval(interval)
            setIsActiveSlide(true)
            setIsLoading(true)
        }
    },[])

    /**
     * 获取备份数据
     */
    const doFindBackups = () =>{
        findBackups().then(res=>{
            setIsLoading(false)
            if(res.code===0){
                setBackupsInfo(res.data)
                if(res.data?.runState==='run'){findInter()}
            }
        })
    }

    /**
     * 开启定时器
     */
    const findInter = () =>{
        clearInterval(interval)
        interval = setInterval(()=>findBackups().then(res=>{
            if(res.code===0){
                setBackupsInfo(res.data)
                if(res.data.runState!=='run'){clearInterval(interval)}
            }
            else {clearInterval(interval)}
        }),1000)
    }

    /**
     * 开始手动备份
     */
    const startBackUps = () =>{
        backups().then(res=>{
            if(res.code===0){
                doFindBackups()
                setIsActiveSlide(true)
            }
            else {message.error(res.msg),0.5}
        })
    }

    /**
     * 定时备份：开启||关闭
     * @param e
     */
    const changScheduled = e => {
        updateBackups(e.target.value).then(res=>{
            if(res.code===0){
                setBackupsInfo({
                    ...backupsInfo,
                    scheduled:e.target.value
                })
            }
        })
    }

    const ResultHtml = () => {
        switch(backupsInfo?.runState){
            case 'success':return "成功"
            case 'error':return "失败"
            case 'run':return "备份中"
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
                    <BreadCrumb firstItem={"备份"}/>
                    <div className="backups-center">
                        <div className="backups-info-item">
                            <span>备份路径：</span>
                            <span>{backupsInfo?.dir || "无"}</span>
                        </div>
                        <div className="backups-info-item">
                            <span>定时备份：</span>
                            <Radio.Group value={backupsInfo?.scheduled || false} onChange={changScheduled}>
                                <Radio value={true}>开启</Radio>
                                <Radio value={false}>关闭</Radio>
                            </Radio.Group>
                            <span className="backups-info-item-desc">
                                (开启定时备份后每天晚上14:00定时备份)
                            </span>
                        </div>
                        <div className="backups-info-item">
                            <span>最近备份记录：</span>
                            <span>{backupsInfo?.createTime || '无'}</span>
                        </div>
                        <div className="backups-info-item">
                            <span>最近备份结果：</span>
                            <span className={`backups-info-item-${backupsInfo?.runState}`}>{ResultHtml()}</span>
                        </div>
                        <div className="backups-info-item">
                            {
                                backupsInfo?.runState === 'run' ?
                                    <Btn
                                        type={"disabled"}
                                        title={"手动备份"}
                                    />
                                    :
                                    <Btn
                                        type={"primary"}
                                        title={"手动备份"}
                                        onClick={startBackUps}
                                    />
                            }
                        </div>
                    </div>
                    <div className="backups-log-title">日志</div>
                    <div className="backups-log-content" ref={scrollRef} onWheel={()=>setIsActiveSlide(false)}>
                        {backupsInfo?.log || '暂无日志'}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Backups