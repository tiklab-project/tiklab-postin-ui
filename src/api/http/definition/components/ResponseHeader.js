import React, { useState, useEffect } from 'react';
import { observer } from "mobx-react";
import { Space, Checkbox, Popconfirm} from 'antd';
import { ExTable} from '../../../../common/EditTable'
import responseHeaderStore from "../store/ResponseHeaderStore";
/**
 * 定义
 * http
 * 响应头可编辑表格
 */
const ResponseHeader = (props) =>{
    const {
        findResponseHeaderList,
        deleteResponseHeader,
        createResponseHeader,
        updateResponseHeader,
        setList,
        responseHeaderList,
        responseHeaderDataSource,
        dataLength
    } = responseHeaderStore;

    let columns= [
        {
            title: '参数名称',
            dataIndex: 'headerName',
            width:  "20%",
            // align:'center',
            editable: true,
        },{
            title: '示例值',
            width:  "20%",
            dataIndex: 'value',
            // align:'center',
            editable: true,
        },
        {
            title: '必须',
            dataIndex: 'required',
            width: 50,
            align:'center',
            render:(text,record) =>  (
                <Checkbox
                    defaultChecked={record.required}
                    onChange={(value) => toggleChecked(value, record)}
                />
            )
        },{
            title: '说明',
            dataIndex: 'desc',
            // align:'center',
            editable: true,
        },
        {
            title: '操作',
            width:  "20%",
            dataIndex: 'operation',
            fixed: 'right',
            render: (text, record,index) =>(operation(record,dataSource))
        },
        
    ]

    /**
     * 表格checked
     */
    const toggleChecked= (e,row)=> {
        let checked ;
        if(e.target.checked){
            checked = 1
        }else{
            checked = 0
        }
        const data = {
            ...row,
            required: checked
        }
        handleSave(data)
    }

    /**
     * 取消编辑
     */
    const onCancel = () =>{
        let data = {
            id:"InitNewRowId",
            "headerName":null,
            "value":null,
            "required":1,
            "desc":null
        }
        handleSave(data);

        //隐藏
        setNewRowAction(false)
    }

    const [newRowAction, setNewRowAction] = useState(false);

    /**
     * 表格里的操作列展示
     */
    const operation = (record,data) => {
        if(record.id === 'InitNewRowId'){
            return  <div className={`${newRowAction?"newRow-action-show":"newRow-action-hidden"}`}>
                <Space>
                    <a onClick={() =>onCreated(record)}> 保存</a>
                    <a onClick={()=>onCancel()}> 取消</a>
                </Space>
            </div>
        }else{
            return data&&data.map((item) => {
                return (
                    item.id === record.id
                    ?<Space key={item.id}>
                        {
                            item.headerName === record.headerName
                            && item.required === record.required
                            && item.desc === record.desc
                            && item.value === record.value
                                ?null
                                :<svg className="icon-s table-edit-icon" aria-hidden="true" onClick={() => upData(record)}>
                                <use xlinkHref= {`#icon-btn_confirm`} />
                            </svg>
                        }
                        <Popconfirm
                            title="确定删除？"
                            onConfirm={() =>deleteResponseHeader(record.id)}
                            okText='确定'
                            cancelText='取消'
                        >
                            <svg className="icon-s table-edit-icon" aria-hidden="true">
                                <use xlinkHref= {`#icon-shanchu3`} />
                            </svg>
                        </Popconfirm>
                    </Space>
                    :null
                )
            })
        }
    }

    const [dataSource,setDataSource] = useState([])

    const apxMethodId =  localStorage.getItem('apxMethodId');

    useEffect( ()=>{
        findResponseHeaderList(apxMethodId).then(res=>setDataSource(res))
    },[dataLength])

    /**
     * 添加
     */
    const onCreated = (values) => {
        if(Object.keys(values).length === 1){
            return
        }else {
            // 创建新行的时候自带一个id，所以删了，后台会自行创建id
            delete values.id;
            createResponseHeader(values)
        }

        setNewRowAction(false)
    }

    /**
     * 更新
     */
    const upData = (value) => {
        updateResponseHeader(value).then(res => setDataSource(res))
    }

    /**
     * 保存数据
     */
    const handleSave = (row) => {
        const newData = responseHeaderList;
        const index = newData.findIndex((item) =>row.id === item.id);
        newData.splice(index, 1, { ...newData[index], ...row });
        setList(newData)


        //如果是新行 操作 显示操作按钮
        if(row.id==="InitNewRowId"){
            newRowKeyDown()
        }
    };

    /**
     *  当新行按键按下的时候显示后面的操作按钮
     */
    const newRowKeyDown = () => {
        document.addEventListener('keydown', (e) =>{
            setNewRowAction(true)
        });
    };

    return (
        <>
            <ExTable
                columns={columns}
                dataSource={responseHeaderList}
                handleSave={handleSave}
            />
        </>

    );
}


export default observer(ResponseHeader);
