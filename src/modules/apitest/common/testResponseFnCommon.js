
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
