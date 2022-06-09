import {Breadcrumb} from "antd";
import React from "react";

const BreadcrumbEx = ({list}) =>{



    const showBreadcrumbItem = (data)=>{
        return data&&data.map((item,index)=>{
            return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
        })

    }


    return(
        <div className={"apibox-breadcrumb"}>
            <Breadcrumb separator="/"  >
                {
                    showBreadcrumbItem(list)
                }
            </Breadcrumb>
        </div>
    )
}

export default BreadcrumbEx