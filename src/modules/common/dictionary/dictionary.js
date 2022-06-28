
export const requestTabDictionary = {
    "header":"请求头",
    "query":"查询参数",
    "body":"请求体",
    "pre":"前置脚本",
    "after":"后置脚本"
}


export const methodDictionary = [
    "post",
    "get",
    "head",
    "put",
    "delete",
    "options",
    "patch"
]
export const methodJsonDictionary = {
    "get":"GET",
    "post":"POST",
    "head":"HEAD",
    "put":"PUT",
    "delete":"DELETE",
    "options":"OPTIONS",
    "patch":"PATCH",
}

export const bodyTypeDictionary ={
    none:"none",
    formdata:"form-data",
    formUrlencoded:"x-www-form-urlencoded",
    json:"json",
    raw:"raw",
    // binary:"binary"
}


export const bodyTypeJsonDictionary = {
    "none":"none",
    "formdata":"formdata",
    "formUrlencoded":"formUrlencoded",
    "json":"json",
    "raw":"raw"
}


export const rawTypeDictionary = [
    {
        "name":"Text(text/plain)",
        "value":"text/plain",
        "key":"text"
    },
    {
        "name":"Json(application/json)",
        "value":"application/json",
        "key":"json"
    },
    {
        "name":"Javascript(application/javascript)",
        "value":"application/javascript",
        "key":"javascript"
    },
    {
        "name":"Xml(text/xml)",
        "value":"text/xml",
        "key":"xml"
    },
    {
        "name":"Html(text/html)",
        "value":"text/html",
        "key":"html"
    },
]

export const rawTypeJsonDictionary ={
    "text":"text/plain",
    "json":"application/json",
    "javascript":"application/javascript",
    "xml":"text/xml",
    "html":"text/html"
}


export const headerParamDictionary = [
    'accept',
    'accept-charset',
    'accept-encoding',
    'accept-language',
    'authorization',
    'connection',
    'content-length',
    'cookie',
    'from',
    'host',
    'referer',
    'user-agent',
];


export const mockValueDictionary = [
    '@id',
    '@url',
    '@guid',
    '@integer',
    '@word',
    '@first',
    '@last',
    '@name',
    '@cfirst',
    '@clast',
    '@domain',
    '@email',
    '@ip',
    '@boolean',
    '@date',
    '@time',
    '@color',
];

export const dataTypeDictionary = [
    'string',
    'int',
    'object',
    'boolean',
    'number',
    'short',
    'long',
    'null'
]
