

//防抖
export const debounce = (fn, ms)=> {
    let timer;
    return function (e) {
        e.persist();//不加这个取不到e.target.value 的值
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments)
        }, ms)
    }
}