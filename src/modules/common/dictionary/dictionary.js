
export const dir = {
    protocolType:{
        http:"http",
        https:"https",
        ws:"ws"
    },
    httpCode:[200,201,403,404,410,422,500,502,503,504]

}

export const requestTabDictionary = {
    "header":"请求头",
    "query":"查询参数",
    "body":"请求体",
    "pre":"前置脚本",
    "after":"后置脚本",
    "assert":"断言"
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

export const mediaTypeDictionary={
    none:"none",
    formdata:"multipart/form-data",
    formUrlencoded:"application/x-www-form-urlencode",
    // json:"application/json",
    raw:"raw",
    // binary:"binary"
}

//body中radio渲染使用
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
        "name":"Json(application/json)",
        "value":"application/json",
        "key":"json"
    },
    {
        "name":"Text(text/plain)",
        "value":"text/plain",
        "key":"text"
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


export const MOCK_SOURCE= [
        { name: '字符串', mock: '@string' },
        { name: '自然数', mock: '@natural' },
        { name: '浮点数', mock: '@float' },
        { name: '字符', mock: '@character' },
        { name: '布尔', mock: '@boolean' },
        { name: 'url', mock: '@url' },
        { name: '域名', mock: '@domain' },
        { name: 'ip地址', mock: '@ip' },
        { name: 'id', mock: '@id' },
        { name: 'guid', mock: '@guid' },
        { name: '当前时间', mock: '@now' },
        { name: '时间戳', mock: '@timestamp'},
        { name: '日期', mock: '@date' },
        { name: '时间', mock: '@time' },
        { name: '日期时间', mock: '@datetime' },
        { name: '图片连接', mock: '@image' },
        { name: '图片data', mock: "@imageData" },
        { name: '颜色', mock: '@color' },
        { name: '颜色hex', mock: '@hex' },
        { name: '颜色rgba', mock: '@rgba' },
        { name: '颜色rgb', mock: '@rgb' },
        { name: '颜色hsl', mock: '@hsl' },
        { name: '整数', mock: '@integer' },
        { name: 'email', mock: '@email' },
        { name: '大段文本', mock: '@paragraph' },
        { name: '句子', mock: '@sentence' },
        { name: '单词', mock: '@word' },
        { name: '大段中文文本', mock: '@cparagraph' },
        { name: '中文标题', mock: '@ctitle' },
        { name: '标题', mock: '@title' },
        { name: '姓名', mock: '@name' },
        { name: '中文姓名', mock: '@cname' },
        { name: '中文姓', mock: '@cfirst' },
        { name: '中文名', mock: '@clast' },
        { name: '英文姓', mock: '@first' },
        { name: '英文名', mock: '@last' },
        { name: '中文句子', mock: '@csentence' },
        { name: '中文词组', mock: '@cword' },
        { name: '地址', mock: '@region' },
        { name: '省份', mock: '@province' },
        { name: '城市', mock: '@city' },
        { name: '地区', mock: '@county' },
        { name: '转换为大写', mock: '@upper' },
        { name: '转换为小写', mock: '@lower' },
        { name: '挑选（枚举）', mock: '@pick' },
        { name: '打乱数组', mock: '@shuffle' },
        { name: '协议', mock: '@protocol' }
    ]
