import React, {useEffect,useState} from 'react'
import {Col, Row, Input, Space, Table, Empty} from "antd";
import DataStructureEdit from "./DataStructureEdit";
import { observer} from "mobx-react";
import "./structureStyle.scss"
import DetailHeader from "../../../common/DetailHeader";
import {SearchOutlined} from "@ant-design/icons";
import dataStructureStore from "../store/DataStructureStore";
import HideDelete from "../../../api/common/hideDelete/HideDelete";
import {debounce} from "../../../common/commonUtilsFn/CommonUtilsFn";
import moment from "moment"
/**
 * @description：数据结构页
 * @date: 2021-07-29 09:54
 */
const DataStructure = (props) => {
    const {findDataStructureList,deleteDataStructure,dataStructureList} = dataStructureStore;

    const columns = [
        {
            title:`名称`,
            dataIndex: "name",
            key: "name",
            width: '40%',
            render:(text,record)=> <span className={"link-text"} onClick = {()=>toModeDetail(record.id)}>{text}</span>,
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: `类型`,
            dataIndex: "dataType",
            key: "dataType",
            width: '15%',
        },
        {
            title: `创建人`,
            dataIndex: "createUser",
            key: "user",
            width: '15%',
            render: (text, record) => (
                <div className={"ws-user-item"}>
                    {/*<Profile userInfo={record.createUser}/>*/}
                    <span>{record.createUser.nickname} </span>
                </div>
            )
        },
        {
            title: `创建时间`,
            dataIndex: "createTime",
            key: "time",
            width: '20%',
            render: (text) => moment(text, 'YYYY-MM-DD').format('YYYY-MM-DD'), // 格式化显示
            sorter: (a, b) => moment(a.createTime, 'YYYY-MM-DD').unix() - moment(b.createTime, 'YYYY-MM-DD').unix(), // 改进排序
        },
        {
            title: `操作`,
            key: "action",
            width: '10%',
            render: (text, record) => (
                <Space size="middle">
                    <DataStructureEdit
                        name={'编辑'}
                        type={"edit"}
                        icon={true}
                        dataStructureId={record.id}
                    />

                    <HideDelete
                        deleteFn={() =>deleteFn(record.id)}
                    />
                </Space>
            ),
        },
    ]

    const [toggleSort, setToggleSort] = useState(false);
    const [sortBy, setSortBy] = useState({name:"name",sort:"asc"});
    const [loading, setLoading] = useState(false);
    let workspaceId= localStorage.getItem("workspaceId")

    useEffect(()=>{
        findPage()
    },[])

    /**
     *  删除
     */
    const deleteFn=(id)=>{
        deleteDataStructure(id).then(()=> {
            findPage()
        })
    }

    const findPage = async () =>{
        setLoading(true)
        let params = {
            workspaceId:workspaceId,
            orderParams:[{
                name:sortBy.name,
                orderType:sortBy.sort
            }]
        }
        await findDataStructureList(params)
        setLoading(false)
    }

    /**
     * 搜索
     */
    const onSearch = (e) => {
        let params = {
            name: e.target.value,
            workspaceId:workspaceId,
            orderParams:[{
                name:sortBy.name,
                orderType:sortBy.sort
            }]
        }
        findDataStructureList(params)
    }

    /**
     * 去往模型详情页
     */
    const toModeDetail = (id) =>{
        localStorage.setItem("dataStructureId",id);

        props.history.push("/workspace/structure-detail")
    }


    /**
     * 降序
     */
    const setSortByDesc = (name) =>{
        let sort = "desc";

        setSortBy({name:name,sort:sort})
        let params = {
            workspaceId:workspaceId,
            orderParams:[{
                name:name,
                orderType:sort
            }]
        }
        findDataStructureList(params)
    }

    /**
     *  升序
     */
    const setSortByAsc = (name) =>{
        let sort = "asc";

        setSortBy({name:name,sort:sort})

        let params = {
            workspaceId:workspaceId,
            orderParams:[{
                name:name,
                orderType:sort
            }]
        }
        findDataStructureList(params)
    }

    /**
     * 排序切换
     */
    const clickSort = (key) =>{

        setToggleSort(!toggleSort);

        if(toggleSort){
            setSortBy({name:key,sort:"desc"})
            setSortByDesc(key)
        }else {
            setSortBy({name:key,sort:"asc"})
            setSortByAsc(key)
        }
    }


    //筛选项
    const sortItem =[
        {
            title:"名称",
            key:"name"
        },{
            title:"创建时间",
            key:"createTime"
        }
    ]


    /**
     * 渲染筛选项
     */
    const showSortItem = (list) =>{
        return list&&list.map((item=>{
            return (
                <div
                    key={item.key}
                    className={`sort-show-box-item ${item.key===sortBy.name?"sort-item-action":""}`}
                    onClick={()=>clickSort(item.key)}
                >
                    <div>{item.title}</div>
                    <div className={"sort-show-box-item-sort"}>
                        <svg
                            aria-hidden="true"
                            className={`sort-icon sort-icon-desc ${sortBy.name===item.key&&sortBy.sort==="desc"?"action-sort":""}`}
                            // onClick={()=>setSortByDesc(item.key)}
                        >
                            <use xlinkHref= {`#icon-paixu-jiangxu`} />
                        </svg>
                        <svg
                            aria-hidden="true"
                            className={` sort-icon sort-icon-asc ${sortBy.name===item.key&&sortBy.sort==="asc"?"action-sort":""}`}
                            // onClick={()=>setSortByAsc(item.key)}
                        >
                            <use xlinkHref= {`#icon-paixu-shengxu`} />
                        </svg>
                    </div>
                </div>
            )
        }))
    }

    /**
     * 点击筛选
     */
    // const clickSelect=(type)=>{
    //     let params = {
    //         dataType:type,
    //         workspaceId:workspaceId,
    //         orderParams:[{
    //             name:sortBy.name,
    //             orderType:sortBy.sort
    //         }]
    //     }
    //     findDataStructureList(params)
    // }


    return(
        <Row style={{height:"100%"}}>
            <Col
                xs={{ span: "24" }}
                sm={{ span: "24" }}
                md={{ span: 24, offset: 0 }}
                lg={{ span: 20, offset: 2 }}
                xl={{ span: 18, offset: 3 }}
                xll={{ span: 16, offset: 4 }}
            >
            <div className={"page-center"}>
                <DetailHeader
                    left={<span>数据结构</span>}
                    right={ <DataStructureEdit type={"add"} name={'+添加数据结构'}  /> }
                />


                <div className={"flex-box"}>
                    <div className={"flex-box structure-header-box"}>
                        <Input
                            prefix={<SearchOutlined style={{fontSize:"16px"}} />}
                            placeholder={`搜索名称`}
                            onPressEnter={onSearch}
                            onChange={debounce(onSearch,500) }
                            allowClear
                            className='search-input'
                        />
                    </div>


                    {/*<div className={"sort-box"}>*/}
                    {/*    <div className={'sort-box-title'}>*/}
                    {/*        <svg className={"icon-s"} aria-hidden="true"  >*/}
                    {/*            <use xlinkHref= {`#icon-icon-`} />*/}
                    {/*        </svg>*/}
                    {/*        <span>排序</span>*/}
                    {/*    </div>*/}

                    {/*    <div  className={`sort-show-box`}>*/}
                    {/*        {*/}
                    {/*            showSortItem(sortItem)*/}
                    {/*        }*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>

                <div className={"pi-list-box"}>
                    <Table
                        columns={columns}
                        dataSource={dataStructureList}
                        rowKey={record => record.id}
                        pagination={false}
                        loading={loading}
                        locale={{
                            emptyText: <Empty
                                imageStyle={{height: 80}}
                                description={<span>暂无模型</span>}
                            />
                        }}
                    />
                </div>
            </div>
            </Col>
        </Row>
    )
}

export default observer(DataStructure);
