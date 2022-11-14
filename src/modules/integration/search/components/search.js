import React, { Fragment, useState } from 'react';
import { Input } from 'antd';
import { observer,inject } from 'mobx-react';
import './search.scss'
import {SearchOutlined} from "@ant-design/icons";

const Search = (props) => {
    const { searchStore } = props;
    const { searchForTop,  searchForCount, setKeyword } = searchStore;

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

    const [searchList, setSearchList] = useState([]);
    const [toggleSearch, setToggleSearch] = useState('hide')

    // 搜索框，键入自动请求
    const changeValue = (e) => {
        let value = e.target.value;
        searchForTop(value).then(res=>{
            setSearchList(res.responseList)
        });
        setToggleSearch('show');
    }

    //点击搜索到空间，跳到对应的空间
    const toWorkspace = (id) =>{
        localStorage.setItem('workspaceId',id);
        props.history.push('/workspace');
        setToggleSearch('hide');
    }

    //点击搜索到接口，跳到对应的接口
    const toMethod = (apxMethodId,workspaceId) => {
        localStorage.setItem('workspaceId',workspaceId);
        localStorage.setItem('apxMethodId',apxMethodId);
        props.history.push('/workspace/apis/detail/interface');
        setToggleSearch('hide');
    }

    // 搜索框回车跳到详细搜索页
    const toSearchResult = (e) => {
        props.history.push("/searchResult");
        setToggleSearch('hide');
        searchForCount(e.target.value);
        setKeyword(e.target.value);
    }



    const showWorkspaceItem = (data)=>{
        return data&&data.map(item=>{
            if(item.index === 'Workspace'){
                return item.dataList&&item.dataList.map(dataItem=>{
                    return (
                        <div key={dataItem.id}>
                            <div className="list" onClick={()=>toWorkspace(dataItem.id)}>
                                <span>{dataItem.workspaceName}</span>
                            </div>
                        </div>
                    )
                })
            }
        })
    }

    const showApiItem =(data)=>{
        return data&&data.map(item=> {
            if (item.index === "Apix"&&item.dataList.length>0) {
                return item.dataList && item.dataList.map(dataItem => {
                    return (
                        <div key={dataItem.id}>
                            <div className="list" onClick={() => toMethod(dataItem.id, dataItem.category.workspace.id)}>
                                <span>{dataItem.name}</span>
                                <span>{dataItem.protocolType}</span>
                            </div>
                        </div>
                    )
                })
            }else {
                return <div> 无 </div>
            }
        })
    }


    const onBlur = () =>{
        setToggleSearch('hide');
        setSearchList([])
    }
    //
    const onFocus = ()=>{
        setToggleSearch('show');
    }

    return(
        <>
            <div className={"header-search-input"}>
                <Input
                    prefix={<SearchOutlined />}
                    placeholder="搜索空间、接口"
                    onChange={debounce(changeValue,500) }
                    // onPressEnter={toSearchResult}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    className={`${toggleSearch==="show"?"search-action-width":"search-action-width-back"}`}
                />
            </div>

            <div className={`search-list ${ toggleSearch ==='show' ? 'search-show': 'search-hide'}`}>
                <div className="same-result" >
                    <div className="search-title">空间 :</div>
                    <div style={{"minHeight": 50}}>
                        {
                            showWorkspaceItem(searchList)
                        }
                    </div>

                </div>
                <div className="same-result" >
                    <div className="search-title">接口 :</div>
                    <div style={{"minHeight": 50}}>
                        {
                            showApiItem(searchList)
                        }
                    </div>

                </div>
            </div>
        </>
    )
}

export default inject('searchStore')(observer(Search));


