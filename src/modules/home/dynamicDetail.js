import React, {useEffect, useState} from "react";
import IconCommon from "../common/iconCommon";
import {List, Select, Skeleton} from "antd";
import {findLogList} from "./commonApi";
import PaginationCommon from "../common/page/page";
import Avatar from "antd/es/avatar/avatar";

const DynamicDetail = (props) =>{

    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataList, setDataList] = useState();

    useEffect(()=>{
        let  param = {

            pageParam: {
                pageSize: 10,
                currentPage:1
            }
        }

        findList(param).then(res => {
            console.log(res)
            setDataList(res)
        })
    },[])


    const findList = async (params) => {
        let res =  await findLogList(params);
        setTotalPage(res.totalPage)
        setCurrentPage(res.currentPage)
        return res.dataList
    };



    //返回首页
    const backToHome = () => props.history.push("/home")


    //类型筛选
    const typeSelect =(type) =>{
        let  param = {
            module:type,
            pageParam: {
                pageSize: 10,
                currentPage:1
            }
        }

        findList(param).then(res => {
            setDataList(res)
        })
    }

    //操作筛选
    const actionSelect = (action) =>{
        let  param = {
            actionType:action,
            pageParam: {
                pageSize: 10,
                currentPage:1
            }
        }

        findList(param).then(res => {
            setDataList(res)
        })
    }

    //分页改变
    const changePage = (current) =>{
        let  param = {
            pageParam: {
                pageSize: 10,
                currentPage:current
            }
        }

        findList(param).then(res => {
            setDataList(res)
        })
    }

    return(
        <div className={"dynamic-detail"}>
            <div className={"dynamic-detail-box"}>
                <div className={"dynamic-detail-header"} >
                    <IconCommon
                        icon={"31fanhui1"}
                        style={{margin:"0 10px","cursor": "pointer"}}
                        className={"icon-s"}
                        onClick={backToHome}
                    />
                    <span style={{"fontWeight":"600","fontSize":"16px"}}>动态详情</span>
                </div>
                <div className={"dynamic-select-box"}>
                    <Select
                        // defaultValue={null}
                        placeholder={"类型"}
                        className={"dynamic-select-box-item"}
                        onChange={typeSelect}
                        options={[
                            {
                                value: null,
                                label: '所有',
                            },{
                                value: 'workspace',
                                label: '空间',
                            },{
                                value: 'category',
                                label: '分组',
                            },{
                                value: 'api',
                                label: '接口',
                            },
                        ]}
                    />
                    <Select
                        // defaultValue={null}
                        placeholder={"操作"}
                        className={"dynamic-select-box-item"}
                        onChange={actionSelect}
                        options={[
                            {
                                value: null,
                                label: '所有',
                            },{
                                value: '新增',
                                label: '新增',
                            },{
                                value: '删除',
                                label: '删除',
                            },{
                                value: '更新',
                                label: '更新',
                            },
                        ]}
                    />
                </div>
                <List
                    className="demo-loadmore-list"
                    itemLayout="horizontal"
                    dataSource={dataList}
                    renderItem={(item) => (
                        <List.Item >
                            <List.Item.Meta
                                avatar={<Avatar
                                    style={{ backgroundColor: '#fff' }}
                                    icon={ <svg className="dynamic-item-box-icon" aria-hidden="true">
                                        <use xlinkHref= {`#icon-dongtai`} />
                                    </svg>}
                                />}
                                title={item.content?.module}
                                description={<div  dangerouslySetInnerHTML={{__html: item.opLogTemplate?.content}} />}
                            />
                            <div>{item.timestamp}</div>
                        </List.Item>
                    )}
                />

                <div>
                    <PaginationCommon
                        currentPage={currentPage}
                        totalPage={totalPage}
                        changePage={changePage}
                    />
                </div>
            </div>
        </div>
    )
}

export default DynamicDetail;