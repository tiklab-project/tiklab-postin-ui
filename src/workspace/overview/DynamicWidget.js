import React, {useEffect, useState} from "react";
import {Empty, List, Skeleton} from "antd";
import {Axios} from "thoughtware-core-ui";
import emptyImg from "../../assets/img/empty.png";
import logImg from "../../assets/img/logimg.png";
import DynamicList from "../../common/templateList/TemplateList";

/**
 * 首页中动态
 */
const DynamicWidget = (props) =>{
    const {screen} = props;

    const [list, setList] = useState([]);

    useEffect(async () => {
        let params = {
            data:screen,
            pageParam: {
                pageSize: 8,
                currentPage:1
            },
        }
        findList(params).then(res=>{
            setList(res);
        })
    }, []);

    /**
     * 查询日志列表
     */
    const findList = async (param) => {
        let params = {
            ...param,
            bgroup:"postin"
        }

        let res = await Axios.post('/oplog/findlogpage',params);
        let data = res.data

        let list = data.dataList;

        //datalist 处理
        let newArr = []
        let newList = (data)=>{
            return data&&data.map(item=>{
                newArr.push({
                    ...item,
                    content: {...JSON.parse(item.content)}
                })
            })
        }
        newList(list)

        return newArr;
    };

    return (
        <DynamicList dynamicList={list}/>
    );
}

export default DynamicWidget;