import {Axios as service} from "tiklab-core-ui";

export function createResponseHeaderMock(data){
    return service.request({
        url: "/responseHeaderMock/createResponseHeaderMock",
        method: "post",
        data 
    })
}
export function updateResponseHeaderMock(data){
    return service.request({
        url: "/responseHeaderMock/updateResponseHeaderMock",
        method: "post",
        data 
    })
}

export function deleteResponseHeaderMock(data){
    return service.request({
        url: "/responseHeaderMock/deleteResponseHeaderMock",
        method: "post",
        data 
    })
}

export function findResponseHeaderMock(data){
    return service.request({
        url: "/responseHeaderMock/findResponseHeaderMock",
        method: "post",
        data 
    })
}

export function findResponseHeaderMockList(data){
    return service.request({
        url: "/responseHeaderMock/findResponseHeaderMockList",
        method: "post",
        data 
    })
}
