import React from "react";
import {Select} from "antd";

const {Option} = Select;

/**
 * http状态码
 */
const HttpCodeSelect = (props) =>{


    const item = [200,201,403,404,410,422,500,502,503,504]


    const showOption = (data)=>{
        return data.map(item=>{
            return <Option value={item} key={item}>{item}</Option>
        })
    }

    const onChange=(e)=>{
        console.log(e)
    }

    const onSearch=(e)=>{
        console.log(e)
    }

    return(
        <Select
            showSearch
            style={{width:200}}
            onChange={onChange}
            onSearch={onSearch}
        >
            {
                showOption(item)
            }
        </Select>
    )
}

export default HttpCodeSelect;