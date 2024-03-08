//接口调试初始化的tabPane http 协议的
export let initTabPane = {
    "id": Date.now(),
    "protocol": "http",
    "data":{
        "baseInfo":{
            "path":null,
            "methodType":"get",
        },
        "header":[{id: 'InitRowId'}],
        "query":[{id: 'InitRowId'}],
        "body":{
            "bodyType":"none",
            "form":[{id: 'InitRowId'}],
            "formUrl":[{id: 'InitRowId'}],
            "raw":{
                "type":"application/json",
                "raw":null
            }
        },
        "preScript":{"scriptex":null},
        "afterScript":{"scriptex":null},
        "assert":[{id: 'InitRowId'}],

        response:{
            body:null,
            headers:null,
            size:null,
            statusCode:null,
            time:null,
            errorMessage:null
        }
    }
}

export let initWSTabPane = {
    "id": Date.now(),
    "protocol": "ws",
    "data":{
        "baseInfo":{
            "path":null,
        },
        "body":{
            "raw":{
                type:"text",
                raw:""
            },
        },
        "header":[{id: 'InitRowId'}],
        "query":[{id: 'InitRowId'}]
    }
}