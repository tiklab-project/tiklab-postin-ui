import React from "react";
import noneImg from "../../assets/img/nonedoc.png";

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
            <div>
                <img src={noneImg} alt={"none-img"} width={200} />
                <div style={{textAlign:"center"}}>点击目录查看</div>
            </div>
        </div>
    )
}

export default ApiInitPage;