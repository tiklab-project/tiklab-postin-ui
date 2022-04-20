import React, { useState, useEffect } from 'react';
import {Button, Space, Tooltip, Upload} from 'antd';
import { mockValueDictionary} from "../../dictionary/dictionary";
import ExSelect from "../../../common/exSelect";
import {ExTable} from "../../editTable";
import {UploadOutlined} from "@ant-design/icons";
import FileTextSelect from "../../../common/fileTextSelect";

// 请求参数的可编辑表格
const FormDataTableCommon = (props) =>{
    const {dataList, saveList, addNewList, deleteList} = props;

    let columns= [
        {
            title: '参数名称',
            dataIndex: 'paramName',
            width: '25%',
            editable: true,
        },
        {
            title: '数据类型',
            width: '10%',
            dataIndex: 'dataType',
            render: (text, record)=>(
                <FileTextSelect
                    defaultValue={record.dataType}
                    handleSave={handleSave}
                    rowData={record}
                />
            )
        },
        {
            title: '参数值',
            width: '40%',
            dataIndex: 'value',
            render: (text, record)=>(
                <>
                    {
                        record.dataType === 'file'
                            ?<Upload
                                beforeUpload={beforeUpload} //返回false时就会停止文件的自动上传。
                                onChange={(e)=>changeUpload(e,record)}
                            >
                                {
                                    fileList&&fileList<1
                                        ?<Button icon={<UploadOutlined />}>Click to upload</Button>
                                        :null
                                }

                            </Upload>
                            :<ExSelect
                                dictionary={mockValueDictionary}
                                defaultValue={record.value}
                                handleSave={handleSave}
                                rowData={record}
                                dataIndex={'value'}
                            />
                    }
                </>
            )
        },
        {
            title: '操作',
            width: '10%',
            dataIndex: 'operation',
            render: (text, record) =>(
                <Space>
                    <a onClick={()=>deleteList(record.id)}> 删除 </a>
                    <a onClick={handleAdd}> 新行 </a>
                </Space>
            )
        }
    ]

    const beforeUpload = ({fileList}) =>  false;

    const [fileList,setFileList] = useState([])

    const changeUpload = (e,record)=>{
        setFileList(e.fileList)
        let newData = {
            ...record,
            value:e.file
        }
        handleSave(newData)
    }


    const [count, setCount] = useState(1);

    const handleAdd = () => {
        setCount(count + 1)
        const newData = {id: count};
        const  dataSource = [...dataList, newData]

        addNewList(dataSource)
    };

    // 保存数据
    const handleSave = (row) => {
        const newData = dataList;
        const index = newData.findIndex((item) => row.id === item.id);
        newData.splice(index, 1, { ...newData[index], ...row });

        saveList(newData)
    };

    return (
        <ExTable
            columns={columns}
            dataSource={dataList}
            handleSave={handleSave}
        />
    );
}

export default FormDataTableCommon;