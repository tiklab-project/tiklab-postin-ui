import { observable,  action } from "mobx";
import {Axios} from "thoughtware-core-ui";

/**
 * 目录
 */
class CategoryStore{
    @observable categoryList = [];
    @observable categoryInfo = [];
    @observable workspaceId = '';
    @observable categoryId= '';
    @observable categoryName='';
    @observable categoryLength = 0;

    /**
     * 查询目录树
     * 带接口
     */
    @action
    findCategoryList = async (id,categoryName) => {
        this.workspaceId = id;
        const params = {
            name:categoryName,
            workspaceId: id,
            orderParams:[{name:'name', orderType:'asc'}],
        }

        let res = await Axios.post("/category/findCategoryListTree",params)
        if(res.code === 0) {
            this.categoryList = res.data;
            return res.data;
        }
    }

    /**
     * 查询目录树
     * 带接口
     */
    @action
    findCategoryTreeList = async (id) => {
        this.workspaceId = id;
        const params = {
            workspaceId: id,
            orderParams:[{name:'name', orderType:'asc'}],
        }

        let res = await Axios.post("/category/findCategoryListTree",params)
        if(res.code === 0) {
            return res.data;
        }
    }

    /**
     * 通过id查询单个目录
     */
    @action
    findCategory = async (id) => {
        this.categoryId = id;
        const param = new FormData();
        param.append('id', id);
        let res = await Axios.post("/category/findCategory",param)

        if(res.code === 0){
            if(res.data){
                this.categoryName = res.data.name;
            }
            return res.data;
        }
    }

    /**
     * 通过id查询单个目录
     * 包含接口
     */
    @action
    findCategoryAddSon = async (id) => {
        const param = new FormData();
        param.append('id', id);

        let res = await Axios.post("/category/findCategoryAddSon",param)

        if(res.code === 0){
            return res.data
        }
    }

    /**
     * 创建目录
     */
    @action
    createCategory = async (values) => {
        let res = await Axios.post("/category/createCategory",values)
        if(res.code === 0){
           await this.findCategoryList(this.workspaceId)
        }
    }

    /**
     * 更新目录
     */
    @action
    updateCategory = async (values) => {
        values.id = this.categoryId;
        let res = await Axios.post("/category/updateCategory",values)

        if(res.code === 0){
            await this.findCategoryList(this.workspaceId);
        }
    }

    /**
     * 设置最近访问的接口
     */
    @action
    apiRecent = async (values) => {
        const res = await Axios.post("/apiRecent/apiRecent",values);
        if(res.code === 0 ) {
            return res.data;
        }
    }

    @action
    findCategoryTree = async (param) => {
        const params = {
            type:"category",
            orderParams:[{name:'createTime', orderType:'desc'}],
            ...param
        }

        let res = await Axios.post("/node/findNodeTree",params)
        if(res.code === 0) {
            return res.data;
        }
    }

    @action
    findNodeTree = async (param) => {
        const params = {
            orderParams:[{name:'createTime', orderType:'desc'}],
            ...param
        }

        let res = await Axios.post("/node/findNodeTree",params)
        if(res.code === 0) {
            this.categoryList = res.data;
            return res.data;
        }
    }


    @action
    deleteNode = async (id) => {
        const param = new FormData();
        param.append('id', id)
        await Axios.post("/node/deleteNode",param)
    }




}

let categoryStore =new CategoryStore();
export default categoryStore;
