import React from "react";
import {Empty} from "antd";

/**
 * 接口初始页
 */
const ApiInitPage = (props) =>{

    return(
        <div style={{
            "height": "100%",
            "display": "flex",
            "alignItems": "center",
            "justifyContent": "center",
            "flex":1,
            "overflow":"hidden"
        }}>
            <Empty
                imageStyle={{height: 120}}
                description={<span>点击目录查看</span>}
            />
        </div>
    )
}

export default ApiInitPage;