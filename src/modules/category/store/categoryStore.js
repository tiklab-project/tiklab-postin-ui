import { observable,  action } from "mobx";
import {
    FindCategory,
    CreateCategory,
    DeleteCategory,
    UpdateCategory,
    FindCategoryListTree
} from '../api/categoryApi';

export class CategoryStore{
    @observable categoryList = [];
    @observable categoryInfo = [];
    @observable workspaceId = '';
    @observable categoryId= '';
    @observable categoryName='';
    @observable categoryLength = 0;

    @action
    findCategoryList = async (id,categoryName) => {
        this.workspaceId = id;
        const params = {
            name:categoryName,
            workspaceId: id,
            orderParams:[{name:'name', orderType:'asc'}],
        }

        let res = await FindCategoryListTree(params)
        if(res.code === 0) {
            this.categoryLength = res.data.length
            this.categoryList = res.data;
            return res.data;
        }
    }

    @action
    findCategory = async (id) => {
        this.categoryId = id;
        const param = new FormData();
        param.append('id', id);
        let res = await FindCategory(param)

        if(res.code === 0){
            if(res.data){
                this.categoryName = res.data.name;
            }
            return res.data;
        }
    }

    @action
    createCategory = async (values) => {
        let res = await CreateCategory(values)
        if(res.code === 0){
           await this.findCategoryList(this.workspaceId)
        }
    }

    @action
    updateCategory = async (values) => {
        values.id = this.categoryId;
        let res = await UpdateCategory(values)

        if(res.code === 0){
            await this.findCategoryList(this.workspaceId);
        }
    }

    @action
    deleteCategory = async (categoryId) => {
        const param = new FormData();
        param.append('id', categoryId)
        const res = await DeleteCategory(param)

        if(res.code === 0){
            await this.findCategoryList(this.workspaceId);
        }
    }

}


export const CATEGORY_STORE = 'categoryStore';
