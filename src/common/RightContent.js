

import React, { useRef, useState} from 'react';
import { renderRoutes } from "react-router-config";

/**
 * 可以拖拽
 * 分为 左侧分组树形结构和右侧详情
 */
const RightContent = (props) => {
    const route = props.route.routes;

    const [leftBoxWidth, setLeftBoxWidth] = useState();
    const boxRef = useRef()

    const changeBox = () =>{
        const middleBox = boxRef.current;

        middleBox.onmousedown=(e)=>{
            let mouseDownX = e.offsetX;
            let middleBoxLeft = middleBox.offsetLeft;
            let middleBoxWidth = middleBox.offsetWidth;

            if(middleBoxLeft < (mouseDownX+middleBoxLeft)&&mouseDownX<(middleBoxLeft+middleBoxWidth)){

                document.onmousemove=(e)=>{
                    e = e || event;
                    let mouseMoveX = e.clientX;

                    // console.log(mouseDownX,mouseMoveX)
                    //鼠标移动的地方减去鼠标一开始点击的地方 再减去 最左侧导航 80
                    let width= mouseMoveX-mouseDownX-80;

                    if(width>=400){
                        setLeftBoxWidth(400)
                    }else if(width<=280) {
                        setLeftBoxWidth(280)
                    }else {
                        setLeftBoxWidth(width)
                    }
                    return false;
                }
            }

            document.onmouseup = function() {
                document.onmousemove = null;
                document.onmouseup = null;
            };
            if (e.preventDefault){
                e.preventDefault();
            }
        }
    }

    return(
        <div className='wscontant'>
            <div
                style={{  width:` ${leftBoxWidth?leftBoxWidth:280}px`,flex:"none"  }}
                className={"left-tree-box"}
            >
                <div  className={'left-tree-content'} >
                    {props.left}
                </div>
                <div
                    ref={boxRef}
                    onMouseMove={changeBox}
                    className={"middleBox"}
                    style={{  left:` ${leftBoxWidth?leftBoxWidth-10:270}px`  }}
                >
                    <div className={"middleBox-show"}> </div>
                </div>
            </div>
            <div className='wscontant-contant'>
                <div className={"wscontant-box"}>
                    {renderRoutes(route)}
                </div>
            </div>
        </div>
    )
}


export default RightContent;
