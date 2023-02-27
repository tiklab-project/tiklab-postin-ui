import React from "react";

//响应后的一些信息：状态码、时间、大小
const ResponseInfo = (props)=>{
    let {status,time,size} = props;


    //状态码显示
    const showStatus = (status) =>{
        if(!status) return

        let statusPre = JSON.stringify(status).split(0,1)[0]

        switch (statusPre) {
            case "1":
            case "2":
                return<span style={{color:"green"}}>{status}</span>
            case "3":
                return<span style={{color:"#ff9800"}}>{status}</span>
            case "4":
            case "5":
                return<span style={{color:"red"}}>{status}</span>
        }
    }

    const showTime = (time) =>{
        if(!time) return

        if(JSON.stringify(time).length>3){
            return<span style={{color:"green"}}> {time/1000} ms</span>
        }else {
            return <span style={{color:"green"}}>{time} ms</span>
        }
    }

    const showSize = (size) =>{
        if(!size) return

        if(JSON.stringify(size).length>3){
            return<span style={{color:"green"}}>{size/1000} kb</span>
        }else {
            return <span style={{color:"green"}}>{size} b</span>
        }
    }

    return(
        <div className="test-responseInfo">
            <div>status: {showStatus(status)} </div>
            <div>time: {showTime(time)}</div>
            <div>size: {showSize(size)}</div>
        </div>
    )
}

export default ResponseInfo;