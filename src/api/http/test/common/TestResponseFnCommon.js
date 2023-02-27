
//处理测试后，响应头的数据
export const processResHeader = (data)=>{

    if(!data) return

    let resHeader = JSON.parse(data)

    let arr = Object.keys(resHeader)

    let list = []
    arr.map(item=>{
        list.push(
            {
                key:item,
                value:resHeader[item],
                id:item
            }
        )
    })

    return list
}


export const processAssert = (data) =>{
    return data && data.filter((item) => {
        let itemKeys = Object.keys(item);
        return !(itemKeys.length === 1 && itemKeys[0] === "id")
    });
}