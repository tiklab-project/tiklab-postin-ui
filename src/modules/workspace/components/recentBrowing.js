import React from "react";
import {Button} from "antd";


const RecentBrowing = (props)=>{

    var ws = new WebSocket('ws://127.0.0.1:8080');
    const clickSocket = ()=>{
            switch (ws.readyState) {
                case WebSocket.CONNECTING:
                    // do something
                    console.log("CONNECTING ...");
                    break;
                case WebSocket.OPEN:
                    // do something
                    console.log("OPEN ...");
                    ws.send("hello Netty!!!");
                    break;
                case WebSocket.CLOSING:
                    // do something
                    console.log("CLOSING ...");
                    break;
                case WebSocket.CLOSED:
                    // do something
                    console.log("CLOSED...");
                    break;
                default:
                    // this never happens
                    break;
            }
    }




    return(
        <div>
            <Button onClick={clickSocket}>test</Button>
            <div>recent Page</div>

        </div>
    )
}
export default RecentBrowing

