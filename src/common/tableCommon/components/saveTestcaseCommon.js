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
        "headerList":processList(data.headerList),
        "queryList":processList(data.queryList),
        "request":{
            "bodyType":data.bodyType,
            "preScript":processInfo(data.preInfo),
            "afterScript":processInfo(data.afterInfo),
        },

        "assertList":processList(data.assertList)
    }

    switch (data.bodyType) {
        case "formdata":
            dataInfo.formList=processList(data.formDataList)
            break;
        case "formUrlencoded":
            dataInfo.urlencodedList = processList(data.formUrlencodedList)
            break;
        case "json":
            dataInfo.jsonList = processList(data.jsonList)
            break;
        case "raw":
            dataInfo.rawParamCase = processInfo(data.rawInfo);
            break;
    }

    return dataInfo

}
