import React, {useEffect, useRef, useState} from 'react';
import { Input } from 'antd';
import {inject, observer} from 'mobx-react';
import './search.scss'
import {SearchOutlined} from "@ant-design/icons";
import ShowSearchResult from "./ShowSearchResult";
import workspaceRecentStore from "../../../../workspace/workspace/store/WorkspaceRecentStore";
import apiRecentStore from "../../../../home/apiRecent/store/ApiRecentStore";
import categoryStore from "../../../../category/store/CategoryStore";

/**
 * 头部搜索
 */
const Search = (props) => {
    const {workspaceStore} = props;
    const {findWorkspaceJoinList} = workspaceStore
    const {findWorkspaceRecentPage}=workspaceRecentStore;
    const {findApiRecentPage}=apiRecentStore;
    const {findNodePage} = categoryStore


    //头部搜索，防抖
    const debounce = (fn, ms)=> {
        let timer;
        return function (e) {
            e.persist();//不加这个取不到e.target.value 的值
            if(timer){
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                fn.apply(this, arguments)
            }, ms)
        }
    }

    const [workspaceRecentList, setWorkspaceRecentList] = useState([]);
    const [apiRecentList, setApiRecentList] = useState([]);
    const [workspaceSearchList, setWorkspaceSearchList] = useState([]);
    const [apiSearchList, setApiSearchList] = useState([]);

    const [toggleSearch, setToggleSearch] = useState(false)
    const [isSearch, setIsSearch] = useState(false);
    const elementRef = useRef(null);


    useEffect(() => {
        const handleOutsideClick = (event) => {
            // 检查点击的目标是否在下拉框内
            if (elementRef.current && !elementRef.current.contains(event.target)) {
                setToggleSearch(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    /**
     * 搜索框，键入自动请求
     */
    const changeValue = async (e) => {
        let value = e.target.value;
        if (value.length > 0) {
            setIsSearch(true)
        }else {
            setIsSearch(false)
        }

        let params = {
            workspaceName:value
        }
        let workspaceList = await findWorkspaceJoinList(params)
        setWorkspaceSearchList(workspaceList)

        let apiParams = {
            name:value,
            apiTypeList:["http","ws"]
        }
        let res = await findNodePage(apiParams)
        setApiSearchList(res.data.dataList)
    }


    const onFocus = async ()=>{
        let params = {
            pageParam: {
                pageSize: 3,
                currentPage:1
            }
        }
        let workspaceList =  await findWorkspaceRecentPage(params)
        setWorkspaceRecentList(workspaceList)
        let apiList = await findApiRecentPage(params)
        setApiRecentList(apiList)

        setToggleSearch(true);
    }

    return(
        <div ref={elementRef}>
            <div className={"header-search-input"}>
                <Input
                    prefix={<SearchOutlined />}
                    placeholder="搜索空间、接口"
                    onChange={debounce(changeValue,500) }
                    // onPressEnter={toSearchResult}
                    // onBlur={onBlur}
                    onFocus={onFocus}
                    className={`${toggleSearch?"search-action-width":"search-action-width-back"}`}
                />
            </div>

            <div className={`search-list ${ toggleSearch ? 'search-show': 'search-hide'}`}>
               <ShowSearchResult
                   workspaceRecentList={workspaceRecentList}
                   apiRecentList={apiRecentList}
                   workspaceSearchList={workspaceSearchList}
                   apiSearchList={apiSearchList}
                   isSearch={isSearch}
                   setToggleSearch={setToggleSearch}
               />
            </div>
        </div>
    )
}

export default inject('workspaceStore')(observer(Search));


