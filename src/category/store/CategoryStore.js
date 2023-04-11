import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";
/**
 * 目录
 */
export class CategoryStore{
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

        let res = await Axios.post("/category/likeFindCategoryListTree",params)
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
     * 删除目录
     */
    @action
    deleteCategory = async (categoryId) => {
        const param = new FormData();
        param.append('id', categoryId)
        const res = await Axios.post("/category/deleteCategory",param)

        if(res.code === 0){
            await this.findCategoryList(this.workspaceId);
        }
    }

}


export const CATEGORY_STORE = 'categoryStore';