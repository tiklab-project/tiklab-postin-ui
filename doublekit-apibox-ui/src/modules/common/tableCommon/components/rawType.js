import React from "react";
import {Select} from "antd";
import {rawTypeDictionary} from "../../dictionary/dictionary";

const { Option } = Select;

//请求类型中的raw里面的类型
const RawType = () =>{

    const showSelectItem = (data)=>{
        return data&&data.map(item=>{
            return  <Option value={item.value} key={item.value}>{item.name}</Option>
        })
    }

    return(
        <Select
            style={{ width: 200 }}
            // defaultValue={"text/plain"}
        >
            {
                showSelectItem(rawTypeDictionary)
            }
        </Select>
    )
}

export default RawType;
