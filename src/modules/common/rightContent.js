/*
 * @Description: 分为 左侧分组树形结构和右侧详情
 */

import React, { useRef, useState} from 'react';
import { renderRoutes } from "react-router-config";

const RightContent = (props) => {
    const route = props.route.routes;

    const [leftBoxWidth, setLeftBoxWidth] = useState();
    const [rightBoxWidth, setRightBoxWidth] = useState();
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

                    let width= mouseMoveX-mouseDownX-80;

                    setLeftBoxWidth(width)

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
                style={{width:` ${leftBoxWidth&&leftBoxWidth>240?leftBoxWidth:"240"}px`}}
                className={'changeBox'}
            >
                {props.left}
            </div>
            <div
                ref={boxRef}
                onMouseMove={changeBox}
                className={"middleBox"}
            > </div>
            <div className='wscontant-contant'>
                <div className={"wscontant-box"}>
                    {renderRoutes(route)}
                </div>
            </div>
        </div>
    )
}


export default RightContent;
