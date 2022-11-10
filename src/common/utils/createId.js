//生成Id
export let createID=() => {
    // return Math.random().toString(5)
    // return Date.now().toString(5);
    return URL.createObjectURL(new Blob()).substr(-32)
}

//生成Id
export let uuid=() =>{
    let s = [];
    // 随机的id值从以下字符串中产生
    let uuidData = "0123456789abcdefghijklmnopqrstuvwxyz";
    let uuidDataLength = uuidData.length;
    //此处循环了18次，可以修改循环次数，循环次数决定生成id长度
    for (let i = 0; i < 18; i++) {
        // 从uuidData中随机截取一个字符
        s[i] = uuidData.substr(Math.floor(Math.random() * uuidDataLength), 1);
    }
    //下方为自定义格式操作，可忽略
    // s[14] = "4"; 
    // s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    // s[8] = s[13] = s[18] = s[23] = "-";
    return s.join("");
}