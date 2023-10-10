import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";
import {Button, message, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";

/**
 * 测试页
 * binary
 */
const TestBinaryParam = (props) => {
    const {binaryParamStore} = props;
    const {findBinaryParamList,createBinaryParam,deleteBinaryParam,findBinaryParamByte} = binaryParamStore;
    const ticket = getUser().ticket;
    const apiId = localStorage.getItem('apiId');
    const [fileList,setFileList] = useState([])

    useEffect(()=>{
        findBinaryParamByte(apiId);
    },[])

    useEffect(()=>{
        findBinaryParamList(apiId).then(res=>{
            setFileList(res)
        })
    },[]);

    //改变数据的时候调用
    const onChange = (info) => {
        setFileList(info.fileList);
        if(info.file.status === 'done'){
            let fileName= info.file.response.data.fileName
            const param = {
                http:{id:apiId},
                fileName:fileName
            }
            createBinaryParam(param).then(res=>setFileList(res));
            message.success(`${info.file.name} file uploaded successfully`);
        }else if (info.file.status === 'removed'){
            deleteBinaryParam(info.file.uid).then(res=>setFileList(res))
        } else if (info.file.status === 'error'){
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    const uploadParams = {
        name: 'uploadFile',
        action: `${base_url}dfs/upload`,
        fileList:fileList,
        headers: {ticket: ticket},
    };

    return(
        <div className={'binary-box'}>
            <Upload
                {...uploadParams}
                maxCount={1}
                onChange={onChange}
            >
                {
                    fileList.length < 1
                        ? <Button icon={<UploadOutlined/>}>Click to Upload</Button>
                        : null
                }
            </Upload>
        </div>
    )
}
export default inject("binaryParamStore")(observer(TestBinaryParam))