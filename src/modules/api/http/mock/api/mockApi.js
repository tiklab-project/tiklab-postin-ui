import {Axios as service} from "tiklab-core-ui";

export function createMock(data){
    return service.request({
        url: "/mock/createMock",
        method: "post",
        data 
    })
}
export function updateMock(data){
    return service.request({
        url: "/mock/updateMock",
        method: "post",
        data 
    })
}

export function deleteMock(data){
    return service.request({
        url: "/mock/deleteMock",
        method: "post",
        data 
    })
}

export function findMock(data){
    return service.request({
        url: "/mock/findMock",
        method: "post",
        data 
    })
}


export function findMockPage(data){
    return service.request({
        url: "/mock/findMockPage",
        method: "post",
        data 
    })
}

