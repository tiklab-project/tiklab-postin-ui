import React, { Fragment, useEffect, useState } from 'react';
import { observer, inject } from 'mobx-react';
import { Input, Button, Tabs, Row, Col, Pagination } from 'antd'
import './search.scss'
const { TabPane } = Tabs;

/**
 * 搜索结果页
 */
const SearchResult = (props) => {
    const { searchStore } = props;
    const {
        searchForTop,
        searchForCount,
        searchForPage,
        countList,
        pageList,
        keyword,
        totalRecord,
        searchList
    } = searchStore;

    const [toggleSearch, SetToggleSearch] = useState('hide')
    const [inputValue, setInputValue] = useState()
    const [pageSize] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [params, setParams] = useState({
        pageCondition: {
            pageSize: pageSize,
            currentPage: currentPage
        }
    })

    const [tabIndex, settabIndex]=useState('Workspace')
    const[lastRecord,setLastRecord] = useState({})


    useEffect(()=>{
        const param = {
            index:tabIndex,
            keyword:keyword,
            ...params
        }
        searchForPage(param).then((res)=>{

            setLastRecord(res?.lastRecord)
        })
    },[params,keyword])

    /**
     * 内部搜索
     */
    const handelSearch = () => {
        const param = {
            index:tabIndex,
            keyword:inputValue,
            ...params
        }
        searchForCount(inputValue);
        searchForPage(param);
        SetToggleSearch('hide')
    }

    /**
     * 获取搜索框内容
     */
    const changInput = (e) => { setInputValue(e.target.value) }

    /**
     * 空间与接口切换
     */
    const changeTabs = (value) => {
        const obj = {
            index: value,
            keyword:inputValue,
            pageCondition: {
                pageSize: pageSize,
                currentPage: currentPage,
            },
        }
        searchForPage(obj).then((res)=>{
            setLastRecord(res?.lastRecord)
            setCurrentPage(res?.currentPage)
        })
        settabIndex(value)
    }

    /**
     * 分页
     */
    const changePagination =(value) => {
        console.log(totalRecord)
        setCurrentPage(value)
        const newParams = {
            ...params,
            pageCondition: {
                pageSize: pageSize,
                currentPage: value,
                lastRecord:{...lastRecord}
            },

        }
        setParams(newParams)
    }

    /**
     * 点击搜索到空间，跳到对应的空间
     */
    const toWorkspace = (id) =>{
        localStorage.setItem('workspaceId',id);
        props.history.push('/workspace');
    }

    /**
     * 点击搜索到接口，跳到对应的接口
     */
    const toMethod = (id,workspaceId) => {
        localStorage.setItem('workspaceId',workspaceId)
        localStorage.setItem('apiId',id)
        props.history.push('/workspace/apis')
    }

    /**
     * 渲染查询项
     */
    const childItem = (item,dataItem)=>{
        switch(item.index) {
            case "Workspace":
                return (
                    <div onClick={()=>toWorkspace(dataItem.id)}>
                        <div className='title'>{dataItem.workspaceName}</div>
                        <div>空间ID：{dataItem.id}</div>
                    </div>
                )
            case "Apix":
                return (
                    <div onClick={()=>toMethod(dataItem.id)}>
                        <div className='title'>{dataItem.name}</div>
                        <div>接口ID：{dataItem.id}</div>
                        {/*<div>接口路径：{dataItem.path}</div>*/}
                        {/*<div>接口请求：{dataItem.requestType}</div>*/}
                    </div>
                )
        }
    }

    /**
     * 渲染结果项
     */
    const resutlList = (item,dataItem) => {
        switch(item.index){
            case 'Workspace':
                return (
                    <div className="list" onClick={()=>toWorkspace(dataItem.id)}>
                        <span>{dataItem.workspaceName}</span>
                    </div>
                )
            case 'Apix':
                return (
                    <div className="list" onClick={()=>toMethod(dataItem.id,dataItem.category.workspace.id)}>
                        <span>{dataItem.name}</span>
                    </div>
                )
        }
    }


    /**
     * 防抖
     */
     const debounce = (fn, ms)=> {
        let timer;
        return function (e) {
            //不加这个取不到e.target.value 的值
            e.persist();

            if(timer){
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                fn.apply(this, arguments)
            }, ms)
        }
    }

    /**
     * 搜索框，键入自动请求
     */
    const changeValue = (e) => {
        let value = e.target.value
        setInputValue(value)
        SetToggleSearch('show');
        searchForTop(value)
    }


    const showSearch = (data)=>{
        return  data && data.map((item,index)=> {
            return(
                <div className="same-index" key={item.index}>
                    {
                        item.index==='Workspace'
                            ?<div className="title">空间</div>
                            :<div className="title">接口</div>
                    }
                    {
                        item.dataList && item.dataList.map((dataItem,index)=> {
                            return (
                                <div key={dataItem.id}>
                                    {
                                        resutlList(item,dataItem)
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            )
        })

    }

    return(
        <Fragment>
            <Row justify={'center'} style={{width:'100%'}}>
                <Col xl={{span: 20}} lg={{span: 24}} xxl={{span:16}}>
                    <div className='search-result'>
                        <div className='search-content'>
                        <div className='search-input'>
                            <Input
                                defaultValue={keyword}
                                placeholder="搜索:空间、接口"
                                onChange={debounce(changeValue,500) }
                                onPressEnter={handelSearch}
                            />
                             <div className={`searchresult-list ${searchList.length !== 0 && toggleSearch ==='show' ? 'show':'hide' }`}>
                                {
                                    showSearch(searchList)

                                }
                            </div>
                            <Button type="primary" onClick={handelSearch}>搜索</Button>
                        </div>
                        <Tabs className='tabs' type="card" size={'small'} onChange={changeTabs}>
                            {
                                countList && countList.map((item,index) => {
                                    return (
                                    <TabPane
                                        tab={` ${item.index==='Workspace'?'空间':'接口'}(${item.totalRecord})`}
                                        key={item.index}
                                        className='tabpane'
                                    >
                                        {
                                            pageList && pageList.map((dataItem)=>{
                                                return(
                                                    <div className="item" key={dataItem.id} >
                                                        {
                                                           childItem(item,dataItem)
                                                        }
                                                    </div>
                                                )
                                            })
                                        }
                                    </TabPane>
                                    )
                                })
                            }
                        </Tabs>
                        <Pagination
                            className='pagination'
                            defaultCurrent={1}
                            pageSize={pageSize}
                            current={currentPage}
                            total={totalRecord}
                            onChange={changePagination}
                        />
                    </div>
                    </div>
                </Col>
            </Row>
        </Fragment>
    )
}

export default inject('searchStore')(observer(SearchResult));
