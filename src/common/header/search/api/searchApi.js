import {Axios as service} from "thoughtware-core-ui";

export function searchForTop(data){
    return service.request({
        url: "/search/searchForTop",
        method: "post",
        data 
    })
}

export function searchForCount(data){
    return service.request({
        url: "/search/searchForCount",   
        method: "post",
        data 
    })
}

export function searchForPage(data){
    return service.request({
        url: "/search/searchForPage",  
        method: "post",
        data 
    })
}

