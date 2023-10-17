import {action, observable} from "mobx";

class WebSocketFnStore{
    @observable ws;
    @observable CONNECT_TYPE = {
        SEND:"send",
        RECEIVE:"receive",
        CONNECT:"connect",
        DISCONNECT:"disconnect",
        ERROR:"error"
    }
    @observable INIT_MESSAGE = {
        content:"",
        type:"",
        time:"",
    }
    @observable messageList=[]
    //0:正在进行连接,1:已建立连接,2:正在断开连接,3:断开
    @observable readyState;


    @action
    connectWebSocket = (url) => {
        // 创建WebSocket连接，指定WebSocket服务器地址和查询参数
        this.ws = new WebSocket(url );

        // 设置WebSocket事件处理程序
        this.ws.onopen = (event ) => {
            // WebSocket连接已建立
            this.updateWSData(
                "Connected to "+url,
                this.CONNECT_TYPE.CONNECT,
            )
        };

        this.ws.onmessage = (event) => {
            // 收到WebSocket消息
            console.log('收到消息:', event);

            this.updateWSData(
                event.data,
                this.CONNECT_TYPE.RECEIVE,
            )
        };

        this.ws.onerror = (e) =>{
            this.updateWSData(
                "WebSocket connect Error",
                this.CONNECT_TYPE.ERROR,
            )
        }
    };

    @action
    disconnectWebSocket = () => {
        // 在组件卸载时关闭WebSocket连接
        if (this.ws) {
            this.ws.close()
            this.updateWSData(
                "WebSocket disconnect",
                this.CONNECT_TYPE.DISCONNECT,
            )
        }
    };

    @action
    sendMessage = (message) => {
        if (this.ws) {
            this.ws.send(message);
            this.updateWSData(
                message,
                this.CONNECT_TYPE.SEND,
            )
        }
    };

    @action
    updateWSData = (message, type) => {
        const data = {
            ...this.INIT_MESSAGE,
            content: message,
            type:type,
            time: this.getDate(Date.now()),
        };

        this.messageList= [data, ...this.messageList]
        this.readyState = this.ws.readyState;
    };

    @action
    clearAll = () =>{
        this.messageList=[]
    }


    /**
     * 获取时间
     */
     @action
     getDate = (timestamp) =>{
        const date = new Date(timestamp); // 通过时间戳创建日期对象

        const hours = date.getHours(); // 获取小时
        const minutes = date.getMinutes(); // 获取分钟
        const seconds = date.getSeconds(); // 获取秒

        return hours+":"+minutes+":"+seconds
    }

}
let webSocketFnStore = new WebSocketFnStore()
export default webSocketFnStore

