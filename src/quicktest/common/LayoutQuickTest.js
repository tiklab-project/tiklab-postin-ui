import React, {useState} from "react";
import "../http/components/quickTestStyle.scss";
import LeftNavListQuickTest from "./LeftNavListQuickTest";
import RightContent from "../../common/RightContent";
import {Spin} from "antd";
import "./qtestStyle.scss"
/**
 * 快捷测试
 * 布局
 */
const LayoutQuickTest = (props) =>{
    const [loading, setLoading] = useState(false);

    return(
        <Spin size="large" spinning={loading} style={{height:"100%"}}>
            <RightContent
                left={ <LeftNavListQuickTest setLoading={setLoading}  {...props}/>}
                {...props}
            />
        </Spin>

    )
}

export default LayoutQuickTest;