import React, {useState} from "react";
import {Radio, Space} from "antd";
import {inject, observer} from "mobx-react";
import DetailHeader from "../../common/DetailHeader";

const ProxyPage = (props) =>{
    const {testStore} = props;
    const {getProxySelect,proxyItem} = testStore;

    const PROXY_ITEM =  localStorage.getItem("PROXY_ITEM")

    const [value, setValue] = useState(PROXY_ITEM ?PROXY_ITEM  :"default" );

    const onChange = (e) => {
        getProxySelect(e.target.value)

        setValue(e.target.value)

        localStorage.setItem("PROXY_ITEM",e.target.value)
    };



    return(
        <div className={"ws-setting-flex"}>
            <div className={"ws-setting-box"}>
                <DetailHeader
                    left={
                        <div style={{
                            display:"flex",
                            alignItems:"center",
                            justifyContent:"space-between",
                            width: 90
                        }}>
                            <span>代理配置</span>
                        </div>
                    }
                />
                <div className={"proxy-content"}>
                    <Radio.Group onChange={onChange} value={value} size={"large"}>
                        <Space direction="vertical">
                            <Radio value={"default"}>
                                <div>默认 <span style={{"color":"red"}}>(存在CORS跨域问题)</span></div>
                            </Radio>
                            <Radio value={"local"}>本地Proxy</Radio>
                            <Radio value={"cloud"}>
                                <div>云端Proxy <span style={{"color":"red"}}>(不支持本地接口)</span></div>
                            </Radio>
                        </Space>
                    </Radio.Group>

                </div>



            </div>
        </div>
    )
}

export default inject("testStore")(observer(ProxyPage));