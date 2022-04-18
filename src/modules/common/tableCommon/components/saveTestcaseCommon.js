//处理list 公共方法
const processList = (list) =>{
    let newList = list.filter((item)=>{
        let itemKeys = Object.keys(item);
        return !(itemKeys.length === 1 && itemKeys[0] === "id")
    });

    return newList
}

//处理info 公共方法
const processInfo = (info) =>{
    if(!info||Object.keys(info).length===0){
        return null
    }else {
        return info
    }
}


//保存用例 数据处理
export const saveTestcaseProcess = (data) =>{

    const dataInfo = {
        "requestHeaderCaseList":processList(data.headerList),
        "queryParamCaseList":processList(data.queryList),
        "requestBodyCase":{"bodyType":data.bodyType},
        "preScriptCase":processInfo(data.preInfo),
        "afterScriptCase":processInfo(data.afterInfo),
        "assertCaseList":processList(data.assertList)
    }

    switch (data.bodyType) {
        case "formdata":
            dataInfo.formParamCaseList=processList(data.formDataList)
            break;
        case "formUrlencoded":
            dataInfo.formUrlencodedCaseList = processList(data.formUrlencodedList)
            break;
        case "json":
            dataInfo.jsonParamCaseList = processList(data.jsonList)
            break;
        case "raw":
            dataInfo.rawParamCase = processInfo(data.rawInfo);
            break;
    }

    return dataInfo

}
