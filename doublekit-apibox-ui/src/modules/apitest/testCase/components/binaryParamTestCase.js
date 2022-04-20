import React, {useEffect, useState} from "react";
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {getUser} from "doublekit-portal-ui";
import {inject, observer} from "mobx-react";

const BinaryParamTestCase = (props) => {
    const {binaryParamTestCaseStore} = props;
    const {findBinaryParamTestCaseList,createBinaryParamTestCase,deleteBinaryParamTestCase} = binaryParamTestCaseStore;
    const ticket = getUser().ticket;
    const testCaseId = localStorage.getItem('testCaseId');
    const [fileList,setFileList] = useState([])

    useEffect(()=>{
        findBinaryParamTestCaseList(testCaseId).then(res=>{
            setFileList(res)
        })
    },[]);

    //改变数据的时候调用
    const onChange = (info) => {
        setFileList(info.fileList);
        if(info.file.status === 'done'){
            let fileName= info.file.response.data.fileName
            const param = {
                testcase:{id:testCaseId},
                fileName:fileName
            }
            createBinaryParamTestCase(param).then(res=>setFileList(res));
            message.success(`${info.file.name} file uploaded successfully`);
        }else if (info.file.status === 'removed'){
            deleteBinaryParamTestCase(info.file.uid).then(res=>setFileList(res))
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

export default inject('binaryParamTestCaseStore')(observer(BinaryParamTestCase));