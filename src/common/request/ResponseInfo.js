import React from "react";

/**
 * 响应后的一些信息：状态码、时间、大小
 */
const ResponseInfo = (props)=>{
    let {status,time,size} = props;


    //状态码显示
    const showStatus = (status) =>{
        if(!status) return

        let statusPre = JSON.stringify(status).split("")[0]

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

    /**
     * 响应时间展示
     */
    const showTime = (time) => {
        if (!time) return;

        const timeString = time.toString();
        if (timeString.length > 3) {
            return <span style={{ color: "green" }}>{time / 1000} ms</span>;
        } else {
            return <span style={{ color: "green" }}>{time} ms</span>;
        }
    };

    /**
     * 响应数据大小展示
     */
    const showSize = (size) => {
        if (!size) return null;

        const sizeString = JSON.stringify(size);
        const isKb = sizeString.length > 3;
        const sizeValue = isKb ? size / 1024 : size;
        const sizeUnit = isKb ? "kb" : "b";

        return (
            <span style={{ color: "green" }}>
              {sizeValue.toFixed(2)} {sizeUnit}
            </span>
        );
    };

    return(
        <div className="test-responseInfo">
            <div>status: {showStatus(status)} </div>
            <div>time: {showTime(time)}</div>
            <div>size: {showSize(size)}</div>
        </div>
    )
}

export default ResponseInfo;