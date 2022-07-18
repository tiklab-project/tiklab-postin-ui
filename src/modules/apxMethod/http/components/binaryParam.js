import React, {useEffect, useState} from "react";
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {getUser} from "doublekit-core-ui";
import {inject, observer} from "mobx-react";

const BinaryParam = (props) => {
    const {binaryParamStore} = props;
    const {findBinaryParamList,createBinaryParam,deleteBinaryParam} = binaryParamStore;
    const ticket = getUser().ticket;
    const apxMethodId = localStorage.getItem('apxMethodId');
    const [fileList,setFileList] = useState([])

    useEffect(()=>{
        findBinaryParamList(apxMethodId).then(res=>{
            setFileList(res)
        })
    },[]);

    //改变数据的时候调用
    const onChange = (info) => {
        setFileList(info.fileList);
        if(info.file.status === 'done'){
            let fileName= info.file.response.data.fileName
            const param = {
                method:{id:apxMethodId},
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
        maxCount:1
    };

    return(
        <div className={'binary-box'}>
            <Upload
                {...uploadParams}
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

export default inject('binaryParamStore')(observer(BinaryParam));