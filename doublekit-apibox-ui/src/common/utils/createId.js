//生成Id
export let createID=() => {
    // return Math.random().toString(5)
    // return Date.now().toString(5);
    return URL.createObjectURL(new Blob()).substr(-32)
}

