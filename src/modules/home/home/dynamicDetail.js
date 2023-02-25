import React, {useEffect, useState} from "react";
import IconCommon from "../../common/iconCommon";
import {List, Select, Skeleton} from "antd";
import {findLogList} from "./commonApi";
import PaginationCommon from "../../common/pagination/page";
import {inject, observer} from "mobx-react";
import {Axios, getUser} from "tiklab-core-ui";

const {Option} = Select;

const DynamicDetail = (props) =>{
    const {workspaceStore} = props;
    const {findWorkspaceJoinList,} = workspaceStore;

    const [actionList, setActionList] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataList, setDataList] = useState();
    const [workspaceIdList, setWorkspaceIdList] = useState([]);

    useEffect(async ()=>{
        let content
        if(workspaceIdList.length===0){
            let idList=[];
            let res = await findWorkspaceJoinList({userId: getUser().userId})
            res.map(item=>{
                idList.push( item.id)
            })
            content={workspaceId:idList}

            setWorkspaceIdList(idList)
        }else {
            content={workspaceId:workspaceIdList}
        }

        let param = {
            content:content,
            pageParam: {
                pageSize: 10,
                currentPage:1
            }
        }

        findList(param).then(res => {
            setDataList(res)
        })
    },[])

    //查询操作筛选下拉框
    useEffect( async () =>{
        let res = await Axios.post("/oplog/type/findlogtypepage",{"bgroup":"postin"})
        if(res.code===0&&res.data.dataList){
            setActionList(res.data.dataList)
        }
    },[])


    const findList = async (params) => {
        let res =  await findLogList(params);
        setTotalPage(res.totalPage)
        setCurrentPage(res.currentPage)

        return res.dataList
    };



    //返回首页
    const backToHome = () => props.history.push("/home")

    const [typeSelect, setTypeSelect] = useState();
    const [actionSelect, setActionSelect] = useState();

    //类型筛选
    const typeSelectFn =(type) =>{
        let  param = {
            content:{workspaceId:workspaceIdList},
            module:type,
            actionType:actionSelect,
            pageParam: {
                pageSize: 10,
                currentPage:1
            }
        }

        findList(param).then(res => {
            setDataList(res)
        })

        setTypeSelect(type);
    }

    //操作筛选
    const actionSelectFn = (action) =>{
        let  param = {
            content:{workspaceId:workspaceIdList},
            actionType:action,
            module:typeSelect,
            pageParam: {
                pageSize: 10,
                currentPage:1
            }
        }

        findList(param).then(res => {
            setDataList(res)
        })

        setActionSelect(action)
    }

    //分页改变
    const changePage = (current) =>{
        let  param = {
            content:{workspaceId:workspaceIdList},
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
                        onChange={typeSelectFn}
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
                        onChange={actionSelectFn}
                    >
                        <Option key={"default"} value={null} >所有</Option>
                        {
                            actionList.map(item=>{
                                return <Option key={item.id} value={item.id}>{item.name}</Option>
                            })
                        }
                    </Select>
                </div>
                <div className={"dynamic-detail-box-list"}>
                    <List
                        className="demo-loadmore-list"
                        itemLayout="horizontal"
                        dataSource={dataList}
                        renderItem={(item) => (
                            <List.Item >
                                <List.Item.Meta
                                    description={<div  dangerouslySetInnerHTML={{__html: item.data}} />}
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
        </div>
    )
}

export default inject("workspaceStore")(observer(DynamicDetail));