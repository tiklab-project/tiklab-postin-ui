import React, {useState} from "react";
import {Select} from "antd";
import HttpTest from "../http/components/HttpTest";
import WSTest from "../ws/components/WSTest";

const {Option} = Select;

const TestContent = (props) =>{

    const [protocol, setProtocol] = useState("http");

    const toggleProtocol = () =>{
        return <div style={{height:"40px"}}>
            <Select
                style={{
                    width:"100px",
                    borderRight:"0px",
                }}
                size={"large"}
                value={protocol}
                onSelect={(value)=>setProtocol(value)}
            >
                <Option value={"http"}>HTTP</Option>
                <Option value={"ws"}>WS</Option>
            </Select>
        </div>
    }


    return(
        <>
            {
                protocol==="http"
                    ?<HttpTest
                        toggleProtocol={toggleProtocol}
                        {...props}
                    />
                    :<WSTest
                        toggleProtocol={toggleProtocol}
                        {...props}
                    />
            }
        </>
    )
}

export default TestContent;