import { observable,  action , toJS} from "mobx";

import { 
    findJsonParamTestCaseListTree, 
    createJsonParamTestCase, 
    findJsonParamTestCase,
    updateJsonParamTestCase, 
    deleteJsonParamTestCase 
} from '../api/jsonParamTestCaseApi';

export class JsonParamTestCaseStore {

    @observable jsonParamTestCaseList = [];
    @observable jsonParamTestCaseInfo = [];
    @observable testCaseId = '';
    @observable jsonParamTestCaseId= '';
    @observable mockValueData = [];
   
    @action 
    addList = (values) => {
        this.jsonParamTestCaseList = [...this.jsonParamTestCaseList,...values]
    }

    @action 
    setList = (values) => {
        this.jsonParamTestCaseList = [...values]
    }

    //处理list
    @action
    processJsonParamList = (data)=>{
        this.jsonParamTestCaseList = data;
        const newRow =[ { id: 'InitNewRowId'}];
        if(data.length===0){
            this.formParamTestCaseList=newRow;
        }else {
            this.formParamTestCaseList=[...data,...newRow];
        }
    }


    @action
    findJsonParamTestCaseListTree = async (id) => {
        this.testCaseId = id;
        const params = {
            testcaseId: id,
            orderParams:[{name:'paramName',orderType:'asc' }],
        }

        const res = await findJsonParamTestCaseListTree(params)
        if(res.code === 0 ) {
            if( res.data.length === 0){
                this.jsonParamTestCaseList=[{id: '1'}]
            }else {
                this.jsonParamTestCaseList = res.data;
            }
            return res.data;
        }
    }

    @action
    findJsonParamTestCase = async (id) => {
        this.jsonParamTestCaseId = id;

        const param = new FormData();
        param.append('id', id);

        const res = await findJsonParamTestCase(param);
        if(res.code === 0 ){
            this.jsonParamTestCaseInfo = res.data;
            return res.data;
        }
    }


    @action
    createJsonParamTestCase = async (values) => {
        values.httpCase = {id:this.testCaseId}

        const res = await createJsonParamTestCase(values)
        if(res.code === 0 ){
            this.findJsonParamTestCaseListTree(this.testCaseId)
        }
    }

    @action
	updateJsonParamTestCase = async (values) => {
		const res = await updateJsonParamTestCase(values)
        if(res.code === 0 ){
            this.findJsonParamTestCaseListTree(this.testCaseId)
        }
    }

    @action
	deleteJsonParamTestCase = async (id) => {
        const param = new FormData();
        param.append('id', id);

		const res = await deleteJsonParamTestCase(param)
        if(res.code === 0 ){
            this.findJsonParamTestCaseListTree(this.testCaseId)
        }
    }

    @action
	setJsonParamTestCaseListChild = (parentId) => {
        const pid = ({id: parentId})
        const newChild = {id:'c1', parent: pid}

        const loop = (data,newChild)=>{
             let newdata = data.map((item) => {
                if(item.id && item.id === parentId) {
                    if(!item.children){
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
        const data = toJS(this.jsonParamTestCaseList);
        let result = loop(data,newChild);
        this.jsonParamTestCaseList = result;
    }

    @action
    getMockValue = (data) => {
        this.mockValueData = data
    }

}



export const JSONPARAM_TESTCASE_STORE = 'jsonParamTestCaseStore';