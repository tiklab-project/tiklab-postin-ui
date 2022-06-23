import {message} from "antd";

const messageFun = (text) =>{
    message.success({
        content: text,
        className: 'custom-class',
        style: {
            marginTop: '5vh',
        },
    });
}


const copyMockUrl = (id) =>{
    const link = document.getElementById(id)
    if (document.body.createTextRange) {
        let range = document.body.createTextRange();
        range.moveToElementText(link);
        range.select();
    } else if (window.getSelection) {
        let selection = window.getSelection();
        let range = document.createRange();
        range.selectNodeContents(link);
        selection.removeAllRanges();
        selection.addRange(range);
    }
    const successful =document.execCommand("Copy"); // 执行浏览器复制命令
    if(successful){
        messageFun('复制成功');
    }else {
        messageFun('复制失败');
    }
}

export default copyMockUrl;