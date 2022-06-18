import React, { Fragment, useState } from 'react';
import { Input } from 'antd';
import { observer,inject } from 'mobx-react';
import './search.scss'

const Search = (props) => {
    const { searchStore } = props;
    const { searchForTop, searchList, searchForCount, setKeyword } = searchStore;

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

    const [toggleSearch, setToggleSearch] = useState('hide')

    // 搜索框，键入自动请求
    const changeValue = (e) => {
        let value = e.target.value;
        setToggleSearch('show');
        searchForTop(value);
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

    //展示头部搜索列表
    const showSearchList = (data)=>{
        return  data && data.map((item)=> {
            return(
                <div className="same-result" key={item.index}>
                    {
                        item.index==='Workspace'
                            ?<div className="title">空间</div>
                            :<div className="title">接口</div>
                    }
                    {
                        item.dataList && item.dataList.map((dataItem)=> {
                            return (
                                <div key={dataItem.id}>
                                    {
                                        resutlList(item.index,dataItem)
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            )
        })
    }

    //根据类型：Workspace，MethodEx。渲染相应列表
    const resutlList = (type,dataItem) => {
        switch(type){
            case 'Workspace':
                return (
                    <div className="list" onClick={()=>toWorkspace(dataItem.id)}>
                        <span>{dataItem.workspaceName}</span>
                    </div>
                )
            case 'MethodEx':
                return (
                    <div className="list" onClick={()=>toMethod(dataItem.id,dataItem.category.workspace.id)}>
                        <span>{dataItem.name}</span>
                    </div>
                )
        }
    }

    // const onBlur = () =>{
    //     setToggleSearch('hide');
    // }
    //
    // const onFocus = ()=>{
    //     setToggleSearch('show');
    // }

    return(
        <Fragment>
            <Input
                placeholder="搜索: 空间、接口"
                onChange={debounce(changeValue,500) }
                onPressEnter={toSearchResult}
                className='search-input'
                style={{width:260}}
                // onBlur={onBlur}
                // onFocus={onFocus}
            />
            <div className={`search-list ${searchList.length !== 0 && toggleSearch ==='show' ? 'search-show': 'search-hide'}`}>
                {
                    showSearchList(searchList)
                }
            </div>
        </Fragment>
    )
}

export default inject('searchStore')(observer(Search));
