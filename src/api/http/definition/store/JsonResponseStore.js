import { observable,  action, toJS } from "mobx";
import {Axios} from "tiklab-core-ui";


/**
 * 定义
 * http
 * 响应json store
 */
export class JsonResponseStore {

    @observable jsonResponseList = [];
    @observable jsonResponseInfo = [];
    @observable jsonResponseDataSource= [];
    @observable apxMethodId = '';

    @action
    addList = (values) => {
        this.jsonResponseList = [...this.jsonResponseList,...values]
    }
    @action
    setList = (values) => {
        this.jsonResponseList = [...values]
    }

    /**
     * 根据查询对象按分页查询响应结果列表
     */
    @action
    findJsonResponseListTree = async (id) => {
        this.apxMethodId = id;
        const params = {
            httpId: id,
            orderParams:[{ name:'propertyName', orderType:'asc'}],
        }

        const newRow =[ { id: 'JsonResponseInitRow'}]

        const res = await Axios.post("/jsonResponse/findJsonResponseListTree",params)
        if( res.code === 0){
            this.jsonResponseDataSource = res.data;
            if( res.data.length === 0){
                this.jsonResponseList=newRow
            }else {
                this.jsonResponseList = res.data;
            }

            return res.data;
        }
    }

    /**
     * 根据ID查找响应结果
     */
    @action
    findJsonResponse = async (id) => {

        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/jsonResponse/findJsonResponse",param);
        if( res.code === 0){
            this.jsonResponseInfo = res.data;
            return res.data;
        }
    }

    /**
     * 添加
     */
    @action
    createJsonResponse = async (values) => {
        const res = await Axios.post("/jsonResponse/createJsonResponse",values)
        if( res.code === 0){
            this.findJsonResponseListTree(this.apxMethodId);
        }
    }

    /**
     * 更改
     */
    @action
	updateJsonResponse = async (values) => {
		const res = await Axios.post("/jsonResponse/updateJsonResponse",values)
        if( res.code === 0){
            this.findJsonResponseListTree(this.apxMethodId);
        }
    }

    /**
     *  删除
     */
    @action
	deleteJsonResponse = async (id) => {
        const param = new FormData();
        param.append('id', id);

		const res = await Axios.post("/jsonResponse/deleteJsonResponse",param)
        if( res.code === 0){
            this.findJsonResponseListTree(this.apxMethodId);
        }
    }

    /**
     * 新增子集
     */
    @action
	setJsonResponseListChild = (parentId) => {
        const pid = ({id: parentId })
        const newChild = {
            id:'c1',
            parent: pid
        }
        const loop = (data,newChild)=>{
             let newdata = data.map((item) => {
                if(item.id && item.id === parentId) {
                    if(item.children === null){
                        item.children = [newChild]
                    }else {
                        item.children.push({
                            ...newChild,
                        })
                    }
                }else if(item.children && item.children.length > 0){
                    loop(item.children, newChild)
                }
                return item
            })
            return newdata;
        }

        const data = toJS(this.jsonResponseList);
        let result = loop(data,newChild);
        this.jsonResponseList = result;

    }

}

export const JSONRESPONSE_STORE = 'jsonResponseStore';
