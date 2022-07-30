import {Axios as service} from "tiklab-core-ui";

export function createRequestHeaderMock(data){
    return service.request({
        url: "/requestHeaderMock/createRequestHeaderMock",
        method: "post",
        data 
    })
}
export function updateRequestHeaderMock(data){
    return service.request({
        url: "/requestHeaderMock/updateRequestHeaderMock",
        method: "post",
        data 
    })
}

export function deleteRequestHeaderMock(data){
    return service.request({
        url: "/requestHeaderMock/deleteRequestHeaderMock",
        method: "post",
        data 
    })
}

export function findRequestHeaderMock(data){
    return service.request({
        url: "/requestHeaderMock/findRequestHeaderMock",
        method: "post",
        data 
    })
}

export function findRequestHeaderMockList(data){
    return service.request({
        url: "/requestHeaderMock/findRequestHeaderMockList",
        method: "post",
        data 
    })
}
