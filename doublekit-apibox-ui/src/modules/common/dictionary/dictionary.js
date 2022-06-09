
const methodDictionary = [
    "post",
    "get",
    "head",
    "put",
    "delete",
    "options",
    "patch"
]

const bodyTypeDictionary = [
    {
        "name":"none",
        "value":"none"
    },{
        "name":"form-data",
        "value":"formdata"
    },{
        "name":"x-www-form-urlencoded",
        "value":"formUrlencoded"
    },{
        "name":"json",
        "value":"json"
    },{
        "name":"raw",
        "value":"raw"
    }
]

export const bodyTypeJsonDictionary = {
    "none":"none",
    "formdata":"formdata",
    "formUrlencoded":"formUrlencoded",
    "json":"json",
    "raw":"raw"
}


const rawTypeDictionary = [
    {
        "name":"Text(text/plain)",
        "value":"text/plain"
    },
    {
        "name":"Json(application/json)",
        "value":"application/json"
    },
    {
        "name":"Javascript(application/javascript)",
        "value":"application/javascript"
    },
    {
        "name":"Xml(text/xml)",
        "value":"text/xml"
    },
    {
        "name":"Html(text/html)",
        "value":"text/html"
    },
]

export const rawTypeJsonDictionary ={
    "text":"text/plain",
    "json":"application/json",
    "javascript":"application/javascript",
    "xml":"text/xml",
    "html":"text/html"
}


const headerParamDictionary = [
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


const mockValueDictionary = [
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

const dataTypeDictionary = [
    'string',
    'int',
    'object',
    'boolean',
    'number',
    'short',
    'long',
    'null'
]


export {
    headerParamDictionary,
    mockValueDictionary,
    dataTypeDictionary,
    methodDictionary,
    rawTypeDictionary,
    bodyTypeDictionary
}
