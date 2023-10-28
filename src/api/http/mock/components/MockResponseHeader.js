
import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import {Space, Popconfirm} from 'antd';
import ExSelect from "../../../../common/ExSelect";
import {headerParamDictionary} from "../../../../common/dictionary/dictionary";
import {ExTable} from "../../../../common/EditTable";
import IconCommon from "../../../../common/IconCommon";
import mockResponseHeaderStore from "../store/MockResponseHeaderStore";
/**
 * mock
 * 响应头可编辑表格
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const MockResponseHeader = (props) => {
    const {
        findResponseHeaderMockList,
        deleteResponseHeaderMock,
        createResponseHeaderMock,
        updateResponseHeaderMock,
        dataLength,
        setList,
        mockResponseHeaderList
    } = mockResponseHeaderStore;

    const [dataSource,setDataSource] = useState([])
    const mockId = localStorage.getItem('mockId')

    useEffect( async ()=>{
        await findList()
    },[dataLength])

    const findList = () =>{
        findResponseHeaderMockList(mockId).then(list=>setDataSource(list));
    }

    let columns= [
        {
            title: '属性名称',
            dataIndex: 'headerName',
            width: '40%',
            editable: true,
        },
        {
            title: '属性值',
            width: '40%',
            dataIndex: 'value',
            editable: true,
        },
        {
            title: '操作',
            width: '100',
            dataIndex: 'operation',
            render: (text, record) =>( operation(record,dataSource) )
        }
    ]

    /**
     * 取消编辑
     */
    const onCancel = () =>{
        let data = {
            id:"InitNewResHeadRowId",
            "headerName":null,
            "value":null
        }
        handleSave(data)

        //新行隐藏后面操作按钮
        setNewRowAction(false)
    }

    const [newRowAction, setNewRowAction] = useState(false);

    /**
     * 表格里的操作列展示
     */
    const operation = (record,data) => {
        if(record.id === 'InitNewResHeadRowId'){
            return <div className={`${newRowAction?"newRow-action-show":"newRow-action-hidden"}`}>
                <Space>
                    <a onClick={() =>onCreated(record)}> 保存</a>
                    <a onClick={()=>onCancel()}> 取消</a>
                </Space>
            </div>
        }else{
            return <Space key={record.id}>
                {
                    updateView(record,data)
                }
                <Popconfirm
                    title="确定删除？"
                    onConfirm={() => deleteResponseHeaderMock(record.id).then(() => findList())}
                    okText='确定'
                    cancelText='取消'
                >
                    <svg className="icon-s table-edit-icon" aria-hidden="true">
                        <use xlinkHref= {`#icon-shanchu3`} />
                    </svg>
                </Popconfirm>
            </Space>
        }
    }

    /**
     * 本地编辑的值和返回的值比较，不想同的会显示更新按钮
     */
    const updateView = (record,data)=>{
        return data&&data.map((item) => {
            return (
                item.id === record.id
                    ?<>
                        {
                            item.headerName === record.headerName
                            && item.value === record.value
                                ? null
                                :  <IconCommon
                                    icon={"btn_confirm"}
                                    className="icon-s table-edit-icon"
                                    onClick={() => upData(record)}
                                />
                        }
                    </>
                    :null
            )
        })
    }

    /**
     * 添加
     */
    const onCreated = async (values) => {
        if(Object.keys(values).length === 1){
            return null
        }else {
            // 创建新行的时候自带一个id，所以删了，后台会自行创建id
            delete values.id;
            values.mock={id:mockId};
            await createResponseHeaderMock(values).then(() => findList())
        }

        setNewRowAction(false)
    }

    /**
     * 更新
     */
    const upData = (value) => {
        updateResponseHeaderMock(value).then(() => findList())
    }

    /**
     * 保存数据
     */
    const handleSave = (row) => {
        const newData = [...mockResponseHeaderList];
        //获取当前行对应的下标
        let index = newData.findIndex((item) => row.id === item.id);
        //替换上一次录入的数据
        newData.splice(index, 1, { ...newData[index], ...row });

        setList(newData);

        //如果是新行 操作 显示操作按钮
        if(row.id==="InitNewResHeadRowId"){
            document.addEventListener('keydown', (e) =>{
                setNewRowAction(true)
            });
        }
    };

    return (
        <ExTable
            columns={columns}
            handleSave={handleSave}
            dataSource={mockResponseHeaderList}
        />
    );
}

export default observer(MockResponseHeader);
