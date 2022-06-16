import React, {useState} from "react";
import {Button} from "antd";
import qs from "qs";
const HTTP = require('http')
import {Input} from "antd";
const {TextArea} = Input


// 格式化返回的参数 对json格式的数据进行格式化
function formatResData(data, headers) {
    let type = headers['content-type'];
    if (!type || type && type.indexOf('application/json') !== -1) {
        if (typeof data === 'string') {
            try {
                data = JSON.parse(data);
            } catch (e) { /* Ignore */
            }
        }
    }
    return data;
}


// 调用示例
const POST_DATA =  {"account":"admin","password":"12345","userType":"1"}

const POST_OPTIONS = {
    port: 8080,
    host: "192.168.10.16",
    path: "/passport/login",
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        'user-agent': 'apiBox/1.0.0',
        accept: '*/*'
    }
};


const RecentBrowing = (props)=>{


    const [resData, setResData] = useState();
    const [headers, setHeaders] = useState();
    const [rawHeaders, setRawHeaders] = useState();
    const [reqHeader, setReqHeader] = useState();

// 接受返回的数据
    function requestOnResponse(incomingMessage){
        setResData(JSON.stringify(incomingMessage,null,4))
        setHeaders(JSON.stringify(incomingMessage.headers,null,4))
        setRawHeaders(JSON.stringify(incomingMessage.rawHeaders))
        console.log('STATUS: ' + incomingMessage.statusCode);
        console.log('HEADERS: ' + JSON.stringify(incomingMessage.headers));
        console.log('HEADERS: ' + JSON.stringify(incomingMessage.rawHeaders));
        console.log('HEADERS: ' ,incomingMessage);
        incomingMessage.setEncoding('utf8');

        let data = []
        let dataStr = '';
        incomingMessage.on('data', chunk => {
            dataStr=chunk
            // data.push(...chunk)
        })

        incomingMessage.on('end', () => {
            // let _date = JSON.parse( new TextDecoder().decode(new Uint8Array(data)))
            console.log('data: ', dataStr)
        })
    }


    const test =async ()=>{
        // 创建 http 连接
        const REQUEST = HTTP.request(POST_OPTIONS, requestOnResponse)
        setReqHeader(JSON.stringify(REQUEST,null,4))
       console.log("header----",REQUEST.headers)
// 超时 事件处理器
        function requestOnTimeout(){
            REQUEST.destroy()
        }

// 错误  事件处理器
        function requestOnError(err){
            console.log('err: ', err)
        }


// 添加事件监听
        REQUEST.on('error', requestOnError)
        REQUEST.on('timeout', requestOnTimeout)

// 设置超时
        REQUEST.setTimeout(6000)

// 通过连接发送数据
        REQUEST.write(JSON.stringify(POST_DATA), 'utf8')
        REQUEST.end()


    }



    return(
        <div>
            <Button onClick={test}>test</Button>
            <TextArea value={resData} autoSize={true}/>
            <div>{headers}</div>
            <div>{rawHeaders}</div>

            <TextArea value={reqHeader} autoSize={true}/>
        </div>
    )
}
export default RecentBrowing

