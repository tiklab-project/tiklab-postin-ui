import React from "react";
import {Button} from "antd";


const RecentBrowing = (props)=>{

    var ws = new WebSocket('ws://192.168.10.6:8080/ws?userId=16');
    ws.onopen = function(event) {
        console.log('open');
        ws.send('{"type":"getRecentBrowing"}');
    };

    ws.onmessage = function(event) {
        console.log(event.data);
    };

    ws.onclose = function(event) {
        console.log('close');
    };

    ws.onerror = function(event) {
        console.log('error');
    };

    const clickSocket = ()=>{
        // ws.on('open', () => {
        //     console.log('客户端已连接')
        // })


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

    const test =async ()=>{
        let url = 'http://192.168.10.16:8080/passport/login';
        try {
            let response = await fetch(url, {
                    method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                    body: JSON.stringify({"account":"admin@dc.com","password":"123456","userType":"1"}),
                }
            );
            let json = await response.json()
            let header = await response.headers
            console.log(response,json)
            console.log(header,response.url,response.body)
            // return await response.json();


        } catch (error) {
            console.log('Request Failed', error);
        }

    }



    return(
        <div>
            <Button onClick={test}>test</Button>
            <div>recent Page</div>

        </div>
    )
}
export default RecentBrowing

