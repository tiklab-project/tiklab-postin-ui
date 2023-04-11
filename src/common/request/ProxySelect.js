import React, {useState} from "react";
import {Radio, Space} from "antd";
import {inject, observer} from "mobx-react";

const ProxySelect = (props) =>{
    const {testStore} = props;
    const {getProxySelect,proxyItem} = testStore;

    const PROXY_ITEM =  localStorage.getItem("PROXY_ITEM")

    const [value, setValue] = useState(PROXY_ITEM ?PROXY_ITEM  :"default" );

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        getProxySelect(e.target.value)

        setValue(e.target.value)

        localStorage.setItem("PROXY_ITEM",e.target.value)

        localStorage.setItem("LEFT_MENU_SELECT","proxy")
    };



    return(
        <div className={"proxy-box ws-detail-left-nav-item "}>
            <div className={`ws-detail-left-nav-item-box`}>
                <div className={"ws-detail-left-nav-item-detail"}>
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref= {`#icon-jiekou`} />
                    </svg>
                </div>
                <div  className={"ws-detail-left-nav-item-detail"}>
                    代理
                </div>
            </div>
            <div className={"proxy-content"}>
                <Radio.Group onChange={onChange} value={value}>
                    <Space direction="vertical">
                        <Radio value={"default"}>
                            <div>默认</div>
                            <div>(存在CORS跨域问题)</div>
                        </Radio>
                        <Radio value={"local"}>本地Proxy</Radio>
                        <Radio value={"cloud"}>
                            <div>云端Proxy</div>
                            <div>(不支持本地接口)</div>
                        </Radio>
                    </Space>
                </Radio.Group>
            </div>
        </div>
    )
}

export default inject("testStore")(observer(ProxySelect));