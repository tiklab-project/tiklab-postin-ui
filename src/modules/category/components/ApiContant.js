/*
 * @Description: 接口详情，分为 左侧分组树形结构和右侧详情
 */

import React, {useRef} from 'react';
import { renderRoutes } from "react-router-config";
import CategoryAside from './categoryAside';
import '../../workspace/components/workspace.scss';

const ApiContant = (props) => {

    const route = props.route.routes;

    const boxRef = useRef()

    const changWidth=()=> {
        const oBox = boxRef.current;
        oBox.onmousemove=function(e){
            const dx=e.offsetX;
            const dy=e.offsetY;
            let a= "";
            let b="";
            if(dx>oBox.offsetWidth-10 && dx<oBox.offsetWidth && dy>0 && dy <oBox.offsetWidth ) {
                oBox.style.cursor = "col-resize"
                oBox.onmousedown = function(e){
                    const iEvent = e;
                    const dx=iEvent.clientX;//当你第一次单击的时候，存储x轴的坐标。
                    const dw=oBox.offsetWidth;//存储默认的div的宽度。
                    const disright=oBox.offsetLeft+oBox.offsetWidth;//存储默认div右边距离屏幕左边的距离。
                    if(iEvent.clientX>oBox.offsetLeft+oBox.offsetWidth-10){//判断鼠标是否点在右边还是左边
                        b='right';
                    }
                    if(iEvent.clientX<oBox.offsetLeft+10){//同理
                        b='left';
                    }
                    if(iEvent.clientY<oBox.offsetTop+10){
                        a='top';
                    }
                    if(iEvent.clientY>oBox.offsetTop+oBox.offsetHeight-10){
                        a='bottom';
                    }
                    document.onmousemove=function(ev){
                        const iEvent=ev;
                        if(b=='right'){
                            oBox.style.width=dw+(iEvent.clientX-dx)+'px';
                            //此时的iEvent.clientX的为你拖动时一直改变的鼠标的X坐标，例如你拖动的距离为下图的绿色部分，第二个黑点就表示你此时的iEvent.clientX
                            //所以，此时的盒子宽度就等于绿色部分的距离加上原本盒子的距离
                            if(oBox.offsetWidth<=280){//当盒子缩小到一定范围内的时候，让他保持一个固定值，不再继续改变
                                oBox.style.width='280px';
                            }
                            if(oBox.offsetWidth>=500){
                                oBox.style.width='500px';
                                oBox.style.left=disright-oBox.offsetWidth+'px';//防止抖动
                            }
                        }
                        if(b=='left'){
                            oBox.style.width=dw-(iEvent.clientX-dx)+'px';//iEvent.clientX-dx表示第二次鼠标的X坐标减去第一次鼠标的X坐标，得到绿色移动的距离（为负数），再加上原本的div宽度，就得到新的宽度。 图3
                            oBox.style.left=disright-oBox.offsetWidth+'px';//disright表示盒子右边框距离左边的距离，disright-当前的盒子宽度，就是当前盒子距离左边的距离
                            if(oBox.offsetWidth<=250){
                                oBox.style.width='250px';
                                oBox.style.left=disright-oBox.offsetWidth+'px';//防止抖动
                            }
                        }

                    };
                    document.onmouseup=function(){
                        document.onmousedown=null;
                        document.onmousemove=null;
                    };
                    return false;
                }
            }else {
                oBox.style.cursor = "default"
            }
        }

    }

    return(
        <div className='wscontant'>
            <div

                className={'changeBox'}
            >
                <CategoryAside {...props} />
            </div>
            <div
                ref={boxRef}
                onMouseMove={changWidth}
                className={"dragbox"}
            ></div>
            <div className='wscontant-contant'>
                <div className={"wscontant-box"}>
                    {renderRoutes(route)}
                </div>
            </div>
        </div>
    )
}


export default ApiContant;
