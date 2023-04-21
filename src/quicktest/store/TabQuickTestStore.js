import {action, observable} from "mobx";
import {initTabPane} from "../common/quickTestCommon";


export class TabQuickTestStore {
    //
    @observable activeKey=0;
    //接口调试中的tab页初始值
    @observable tabPaneInfo = {
        "activeKey": "0",
        "tabList": [initTabPane]
    }

    @observable newHeaderRow=[{id: 'InitRowId'}];
    @observable currentTabInfo = this.tabPaneInfo.tabList[this.activeKey]
    @observable baseInfo = this.tabPaneInfo.tabList[this.activeKey].data.baseInfo;
    @observable headerList = this.tabPaneInfo.tabList[this.activeKey].data.header;
    @observable queryList = this.tabPaneInfo.tabList[this.activeKey].data.query;
    @observable requestBodyType = this.tabPaneInfo.tabList[this.activeKey].data.body.bodyType;
    @observable formList = this.tabPaneInfo.tabList[this.activeKey].data.body.form;
    @observable formUrlList = this.tabPaneInfo.tabList[this.activeKey].data.body.formUrl;
    @observable rawInfo = this.tabPaneInfo.tabList[this.activeKey].data.body.raw;
    @observable preScript = this.tabPaneInfo.tabList[this.activeKey].data.preScript;
    @observable afterScript = this.tabPaneInfo.tabList[this.activeKey].data.afterScript;
    @observable assertList = this.tabPaneInfo.tabList[this.activeKey].data.assert;

    @action
    setTabPaneInfo = (data) =>{
        this.tabPaneInfo = data;

        //当前tabPane下标
        this.activeKey = Number(this.tabPaneInfo.activeKey)
        //拿到当前标签页下的数据
        let curTab = this.tabPaneInfo.tabList[this.activeKey]

        let {baseInfo,header,query,body,preScript,afterScript,assert } =  curTab.data
        this.baseInfo = baseInfo
        this.headerList = header
        this.queryList = query
        this.requestBodyType = body.bodyType
        this.formList = body.form
        this.formUrlList = body.formUrl
        this.rawInfo = body.raw
        this.preScript = preScript
        this.afterScript = afterScript
        this.assertList = assert
    }

    @action
    updateBaseInfo = (info) =>{
        this.baseInfo = {...this.baseInfo,...info};
        this.tabPaneInfo.tabList[this.activeKey].data.baseInfo=this.baseInfo;
    }

    /**
     * 删除请求头
     */
    @action
    deleteRequestHeaderList = (id) =>{
        this.headerList = this.deleteFn(id,this.headerList)
        this.tabPaneInfo.tabList[this.activeKey].data.header=this.headerList
    }

    /**
     * 保存请求头
     */
    @action
    saveRequestHeaderList = (list) => {
        this.headerList = [...list]
        this.tabPaneInfo.tabList[this.activeKey].data.header=this.headerList
    }


    /**
     * 删除query
     */
    @action
    deleteQueryList = (id) =>{
        this.queryList = this.deleteFn(id,this.queryList)
        this.tabPaneInfo.tabList[this.activeKey].data.query=this.queryList
    }

    /**
     * 保存query
     */
    @action
    saveQueryList = (list) => {
        this.queryList = [...list]
        this.tabPaneInfo.tabList[this.activeKey].data.query=this.queryList
    }


    /**
     *  更新bodyType
     */
    @action
    updateBodyType = (data) => {
        this.requestBodyType  = data.bodyType
        this.tabPaneInfo.tabList[this.activeKey].data.body.bodyType= this.requestBodyType
    }


    /**
     * 删除form
     */
    @action
    deleteFormList = (id) =>{
        this.formList = this.deleteFn(id,this.formList)
        this.tabPaneInfo.tabList[this.activeKey].data.body.form=this.formList
    }

    /**
     * 保存form
     */
    @action
    saveFormList = (list) => {
        this.formList = [...list]
        this.tabPaneInfo.tabList[this.activeKey].data.body.form=this.formList
    }

    /**
     * 删除formUrl
     */
    @action
    deleteFormUrlList = (id) =>{
        this.formUrlList = this.deleteFn(id,this.formUrlList)
        this.tabPaneInfo.tabList[this.activeKey].data.body.formUrl=this.formUrlList
    }

    /**
     * 保存formUrl
     */
    @action
    saveFormUrlList = (list) => {
        this.formUrlList = [...list]
        this.tabPaneInfo.tabList[this.activeKey].data.body.formUrl=this.formUrlList
    }


    /**
     * 更新raw
     */
    @action
    updateRawInfo = (info)=>{
        this.rawInfo = {...this.rawInfo,...info};
        this.tabPaneInfo.tabList[this.activeKey].data.body.raw=this.rawInfo
    }

    /**
     * 设置raw
     */
    @action
    setRawInfo = async ()=>{
        return this.rawInfo;
    }


    /**
     * 更新前置
     */
    @action
    updatePreScript = (value)=>{
        this.preScript = {...this.preScript,...value};
        this.tabPaneInfo.tabList[this.activeKey].data.preScript=this.preScript
    }

    /**
     * 设置参数
     */
    @action
    setPreScript = async ()=>{
        return this.preScript
    }

    /**
     * 更新后置
     */
    @action
    updateAfterScript = (value)=>{
        this.afterScript = {...this.afterScript,...value};
        this.tabPaneInfo.tabList[this.activeKey].data.afterScript=this.afterScript
    }

    /**
     * 设置参数
     */
    @action
    setAfterScript = async ()=>{
        return this.afterScript
    }

    /**
     * 删除assert
     */
    @action
    deleteAssertList = (id) =>{
        this.assertList = this.deleteFn(id,this.assertList)
        this.tabPaneInfo.tabList[this.activeKey].data.assert=this.assertList
    }

    /**
     * 保存assert
     */
    @action
    saveAssertList = (list) => {
        this.assertList = [...list]
        this.tabPaneInfo.tabList[this.activeKey].data.assert=this.assertList
    }



    @action
    deleteFn = (id,list)=>{
        let newList  = list.filter((item)=> {
            return item.id !== id
        })

        if(newList.length === 0){
            list = this.newHeaderRow;
        }else {
            list = newList;
        }

       return list;
    }
}


export const TAB_QUICK_TEST_STORE = 'tabQuickTestStore';