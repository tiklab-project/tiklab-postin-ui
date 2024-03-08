
export const dir = {
    protocolType:{
        http:"http",
        https:"https",
        ws:"ws"
    },
    httpCode:[200,201,403,404,410,422,500,502,503,504]

}

//请求类型字典项
export const methodDictionary = [
    "post",
    "get",
    // "head",
    // "put",
    // "delete",
    // "options",
    // "patch"
]

//请求中的字典项
export const mediaTypeDir ={
    none:{
        title:"none",
        mediaType:"none",
        radioShow:"none"
    },
    formdata:{
        title:"formdata",
        mediaType:"multipart/form-data",
        radioShow:"form-data"
    },
    formUrlencoded:{
        title:"formUrlencoded",
        mediaType:"application/x-www-form-urlencoded",
        radioShow:"x-www-form-urlencoded"
    },
    json:{
        title:"json",
        mediaType:"application/json",
        radioShow:"json"
    },
    raw:{
        title:"raw",
        mediaType:"raw",
        radioShow:"raw"
    }
}

//raw中的数据字典项
export const rawTypeDictionary = {
    json: {
        "mediaType":"application/json",
        "title":"json"
    },
    text: {
        "mediaType":"text/plain",
        "title":"text"
    },
    javascript: {
        "mediaType":"application/javascript",
        "title":"javascript"
    },
    xml: {
        "mediaType":"text/xml",
        "title":"xml"
    },
    html: {
        "mediaType":"text/html",
        "title":"html"
    },
}

//请求头的字典项
export const headerParamDictionary = [
    'accept',
    'accept-charset',
    'accept-encoding',
    'accept-language',
    'authorization',
    'connection',
    'content-length',
    'cookie',
    'host',
    'referer',
    'user-agent',
];

//mock选项
export const mockValueDictionary = [
    '@ip',
    '@name',
    '@integer',
    '@first',
    '@last',
    '@city',
    '@country',
    '@email',
    '@domain',
    '@date',
    '@company',
    '@title',
    '@phone',
    '@address',
    '@sentence',
    '@paragraph',
    '@id',
    '@url',
    '@word',
    '@words',
    '@image',
    '@timezone',
    '@gender',
];

//数据类型选项
export const dataTypeDictionary = [
    'string',
    'integer',
    'boolean',
    'object',
    'number',
    'null',
    // 'array'
]

//断言大小对比
export const assertCompare = {
    EQUAL:"equal",
    GREATER_THAN:"greater_than",
    LESS_THAN:"less_than",
    GREATER_THAN_EQUAL:"greater_than_equal",
    LESS_THAN_EQUAL:"less_than_equal"
}



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


