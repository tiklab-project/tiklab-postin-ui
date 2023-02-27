import {Axios as service} from "tiklab-core-ui";

export function CreateCategory(data){
    return service.request({
        url: "/category/createCategory",
        method: "post",
        data 
    })
}

export function UpdateCategory(data){
    return service.request({
        url: "/category/updateCategory",
        method: "post",
        data 
    })
}

export function DeleteCategory(data){
    return service.request({
        url: "/category/deleteCategory",
        method: "post",
        data 
    })
}

export function FindCategoryList(data){
    return service.request({
        url: "/category/findCategoryList",
        method: "post",
        data 
    })
}

export function FindCategory(data){
    return service.request({
        url: "/category/findCategory",
        method: "post",
        data 
    })
}

export function findCategoryAddSon(data){
    return service.request({
        url: "/category/findCategoryAddSon",
        method: "post",
        data
    })
}


export function FindCategoryListTree(data){
    return service.request({
        url: "/category/likeFindCategoryListTree",
        method: "post",
        data 
    })
}

