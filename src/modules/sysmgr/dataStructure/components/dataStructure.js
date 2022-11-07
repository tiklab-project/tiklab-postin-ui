/**
 * @description：数据结构页
 * @date: 2021-07-29 09:54
 */
import React, {useEffect,useState} from 'react'
import { Input, Popconfirm, Space, Table} from "antd";
import DataStructureEdit from "./dataStructureEdit";
import {inject, observer} from "mobx-react";
import SetData from "./setData";
import DetailHeader from "../../../common/detailHeader";
import {SearchOutlined} from "@ant-design/icons";
import {Profile} from "tiklab-eam-ui";

const DataStructure = (props) => {
    const {dataStructureStore} = props;
    const {findDataStructureList,deleteDataStructure,dataStructureList} = dataStructureStore;

    const columns = [
        {
            title:`名称`,
            dataIndex: "name",
            key: "name",
            render:(text,record)=>(
                <SetData name={text} dataType={record.dataType} dataStructureId={record.id}/>
            )
        },
        {
            title: `类型`,
            dataIndex: "dataType",
            key: "dataType",
        },
        {
            title: `创建人`,
            dataIndex: "createUser",
            key: "user",
            render: (text, record) => (
                <Profile userInfo={record.createUser}/>
            )
        },
        {
            title: `创建时间`,
            dataIndex: "createTime",
            key: "time",
        },
        {
            title: `操作`,
            key: "action",
            render: (text, record) => (
                <Space size="middle">
                    <DataStructureEdit
                        name={'编辑'}
                        type={"edit"}
                        icon={true}
                        dataStructureId={record.id}
                    />
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() =>deleteDataStructure(record.id)}
                        okText='确定'
                        cancelText='取消'
                    >
                        <svg className="edit-icon" aria-hidden="true">
                            <use xlinkHref= {`#icon-shanchu3`} />
                        </svg>
                    </Popconfirm>

                </Space>
            ),
        },
    ]


    const [toggleSort, setToggleSort] = useState(false);
    const [sortBy, setSortBy] = useState({name:"name",sort:"asc"});


    useEffect(()=>{
        let params = {
            orderParams:[{
                name:sortBy.name,
                orderType:sortBy.sort
            }]
        }
        findDataStructureList(params)
    },[])


    //搜索
    const onSearch = (e) => {
        let params = {
            name: e.target.value,
            orderParams:[{
                name:sortBy.name,
                orderType:sortBy.sort
            }]
        }
        findDataStructureList(params)
    }


    const sortItem =[
        {
            title:"名称",
            key:"name"
        },{
            title:"创建时间",
            key:"createTime"
        }
    ]

    const setSortByDesc = (name) =>{
        let sort = "desc";

        setSortBy({name:name,sort:sort})
        let params = {
            orderParams:[{
                name:name,
                orderType:sort
            }]
        }
        findDataStructureList(params)
    }

    const setSortByAsc = (name) =>{
        let sort = "asc";

        setSortBy({name:name,sort:sort})

        let params = {
            orderParams:[{
                name:name,
                orderType:sort
            }]
        }
        findDataStructureList(params)
    }

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


            <div style={{"display":"flex","justifyContent":"space-between","alignItems":"center"}}>
                <Input
                    prefix={<SearchOutlined />}
                    placeholder={`搜索`}
                    onPressEnter={onSearch}
                    style={{width:200,margin:"10px 0"}}
                />

                <div className={"sort-box"}>
                    <svg style={{width:20,height:20,"cursor":"pointer"}} aria-hidden="true"  >
                        <use xlinkHref= {`#icon-icon-`} />
                    </svg>
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

export default inject('dataStructureStore')(observer(DataStructure));
