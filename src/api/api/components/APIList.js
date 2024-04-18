import React, {useEffect,useState} from 'react';
import { observer } from "mobx-react";
import {Empty, Input, Space, Table} from 'antd';
import ApxMethodEdit from '../../http/definition/components/ApxMethodEdit';
import MethodType from "../../../common/MethodType";
import {SearchOutlined} from "@ant-design/icons";
import CategoryDocDrawer from "../../../support/share/components/CategoryDocDrawer";
import {getUser} from "thoughtware-core-ui";
import categoryStore from "../../../category/store/CategoryStore";
import apiStore from "../store/APIStore";
import emptyImg from "../../../assets/img/empty.png"
import APIEdit from "./APIEdit";
import "../../../support/share/components/shareStyle.scss"
import "../../http/definition/components/apxMethod.scss"
import '../../../category/components/category.scss';
import PaginationCommon from "../../../common/pagination/Page";
import HideDelete from "../../common/hideDelete/HideDelete";

/**
 * 点击左侧导航栏目录，查看的所在目录中的接口列表
 */
const APIList = (props) => {
    const {findNodeTree,apiRecent,deleteNode} = categoryStore;
    const {findApiPage} = apiStore;

    //接口列表头
    const columns = [
        {
            title: '名称',
            dataIndex: "name",
            width: '25%',
            render: (text,record) => (<span className={"link-text"} onClick={()=>toApiDetailPage(record)}>{text}</span> )
        },
        {
            title: '协议/方法',
            dataIndex: 'type',
            width: '10%',
            render: (text,record) => (
                <Space>
                    {record.protocolType==="ws" &&
                        <span style={{color:"white",background: "rgb(46 167 255)"}} className={"requestType"}>
                            {record?.protocolType?.toUpperCase()}
                        </span>
                    }
                    {record.protocolType==="http"&&<MethodType type={record.methodType}/>}
                </Space>
            )
        },
        {
            title: '地址',
            dataIndex: 'path',
            width: '35%',
        },
        {
            title: '状态',
            dataIndex: ['status','name'],
            width: '15%',
            render:(text,record) =>(
                <span style={{color:`${record.status.color}`}}>{text}</span>
            )
        },
        {
            title: '执行人',
            dataIndex: ['executor','nickname'],
            width: '15%',
            render:(text) =>(
                <span >{text||"未设置"}</span>
            )
        },
        {
            title: '操作',
            dataIndex: 'operation',
            width: 100,
            render: (text, record) =>(
                <Space  size="middle">
                    <APIEdit
                        name="编辑"
                        apiId={record.id}
                        findPage={findPage}
                        icon={true}
                    />
                    <HideDelete
                        deleteFn={() =>deleteMethod(record.id)}
                    />
                </Space>
            )
        }
    ]

    //获取id
    const categoryId =  localStorage.getItem('categoryId');
    const workspaceId = localStorage.getItem('workspaceId');
    const [apiList, setApiList] = useState([]);
    const [totalPage, setTotalPage] = useState();
    const [pageSize] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(async ()=>{
        await findPage();
    },[categoryId])

    const findPage = (params) =>{
        let param = {
            pageParam: {
                pageSize: pageSize,
                currentPage:1
            },
            categoryId:categoryId,
            ...params
        }
        findApiPage(param).then((res)=>{
            setTotalPage(res.totalPage);
            setApiList(res.dataList)
        })
    }

    /**
     * 保存接口id，并跳往接口页面
     */
    const toApiDetailPage = async (record) => {
        //设置最近打开的接口
        let params = {
            workspace:{id:workspaceId},
            user:{id:getUser().userId},
            apix:{id:record.id},
        }
        await apiRecent(params)

        localStorage.setItem('apiId',record.id);
        if(record.protocolType==="http"){
            props.history.push('/workspace/apis/http/document');
        }else {
            props.history.push('/workspace/apis/ws/document');
        }
    }

    /**
     * 删除接口
     */
    const deleteMethod = (id) =>{
        deleteNode(id).then(async ()=> {
            await findPage();
            await findNodeTree({workspaceId:workspaceId});
        })
    }

    /**
     * 搜索接口
     */
    const onSearch = async (e) => {
        setCurrentPage(1)
        await findPage({name:e.target.value});
    }

    /**
     * 分页
     */
    const onTableChange = (current) => {
        setCurrentPage(current)
        const newParams = {
            ...pageParam,
            pageParam: {
                pageSize: pageSize,
                currentPage: current
            },
        }

        findPage(newParams)
    }


    return(
        <div className={"content-margin padding-left-right padding-top-bottom"} >
            <div className='content-margin-box list-content-center'>
                <div className={'category-search'}>
                    <Input
                        prefix={<SearchOutlined />}
                        placeholder={'搜索接口'}
                        onPressEnter={onSearch}
                        className='search-input'
                        style={{width:240}}
                    />
                    <Space>
                        <CategoryDocDrawer categoryId={categoryId}/>
                        <ApxMethodEdit
                            name="+添加接口"
                            type="add"
                            isBtn={'btn'}
                            {...props}
                        />
                    </Space>
                </div>
                <div className={"pi-list-box"}>
                    <Table
                        dataSource={apiList}
                        columns={columns}
                        rowKey={record => record.id}
                        pagination={false}
                        locale={{
                            emptyText: <Empty
                                imageStyle={{height: 120}}
                                description={<span>暂无接口</span>}
                                image={emptyImg}
                            />,
                        }}
                    />
                </div>
                <PaginationCommon
                    currentPage={currentPage}
                    totalPage={totalPage}
                    changePage={onTableChange}
                />
            </div>
        </div>
    )
}

export default observer(APIList);

