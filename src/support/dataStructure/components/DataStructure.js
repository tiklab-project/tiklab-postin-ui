import React, {useEffect,useState} from 'react'
import {Input, Popconfirm, Space, Table} from "antd";
import DataStructureEdit from "./DataStructureEdit";
import { observer} from "mobx-react";
import "./structureStyle.scss"
import DetailHeader from "../../../common/DetailHeader";
import {SearchOutlined} from "@ant-design/icons";
import dataStructureStore from "../store/DataStructureStore";
import HideDelete from "../../../api/common/hideDelete/HideDelete";
import {debounce} from "../../../common/commonUtilsFn/CommonUtilsFn";

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
            width: '25%',
            render:(text,record)=> <a onClick = {()=>toModeDetail(record.id)}>{text}</a>
        },
        {
            title: `类型`,
            dataIndex: "dataType",
            key: "dataType",
            width: '20%',
        },
        {
            title: `创建人`,
            dataIndex: "createUser",
            key: "user",
            width: '20%',
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
        },
        {
            title: `操作`,
            key: "action",
            width: '15%',
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
    let workspaceId= localStorage.getItem("workspaceId")

    useEffect(()=>{
        let params = {
            workspaceId:workspaceId,
            orderParams:[{
                name:sortBy.name,
                orderType:sortBy.sort
            }]
        }
        findDataStructureList(params)
    },[])

    /**
     *  删除
     */
    const deleteFn=(id)=>{
        deleteDataStructure(id).then(()=> {
            findDataStructureList({workspaceId: workspaceId})
        })
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
        <div className={"page-center"}>
            <DetailHeader
                left={
                    <div style={{
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"space-between",
                        width: 90
                    }}>
                        <svg style={{width:20,height:20}} aria-hidden="true" >
                            <use xlinkHref= {`#icon-changjing`} />
                        </svg>
                        <span>数据结构</span>
                    </div>
                }
                right={ <DataStructureEdit type={"add"} name={'+添加数据结构'}  /> }
            />


            <div className={"flex-box"}>
                <div className={"flex-box structure-header-box"}>
                    {/*<Select*/}
                    {/*    // defaultValue={null}*/}
                    {/*    placeholder={"数据类型"}*/}
                    {/*    className={"structure-box-select"}*/}
                    {/*    onChange={clickSelect}*/}
                    {/*    options={[*/}
                    {/*        {*/}
                    {/*            value: null,*/}
                    {/*            label: '所有',*/}
                    {/*        },{*/}
                    {/*            value: 'enum',*/}
                    {/*            label: 'enum',*/}
                    {/*        },{*/}
                    {/*            value: 'json',*/}
                    {/*            label: 'json',*/}
                    {/*        },*/}
                    {/*    ]}*/}
                    {/*/>*/}
                    <Input
                        prefix={<SearchOutlined />}
                        placeholder={`搜索名称`}
                        onPressEnter={onSearch}
                        onChange={debounce(onSearch,500) }
                        allowClear
                        style={{width:200,margin:"10px 0"}}
                    />
                </div>


                <div className={"sort-box"}>
                    <div className={'sort-box-title'}>
                        <svg className={"icon-s"} aria-hidden="true"  >
                            <use xlinkHref= {`#icon-icon-`} />
                        </svg>
                        <span>排序</span>
                    </div>

                    <div  className={`sort-show-box`}>
                        {
                            showSortItem(sortItem)
                        }
                    </div>
                </div>
            </div>

            <div className={"out-table-box"}>
                <Table
                    columns={columns}
                    dataSource={dataStructureList}
                    rowKey={record => record.id}
                    pagination={false}
                />
            </div>
        </div>

    )
}

export default observer(DataStructure);
