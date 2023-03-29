import React, {useCallback, useState} from "react";
import {Checkbox, Divider, Input, Select, Tag} from "antd";
import {schemaEnum} from "./SchemaEnum";
import MockSelect from "./MockSelect";
import IconCommon from "../IconCommon";
import {toJS} from "mobx";
import {messageFn} from "../messageCommon/MessageCommon";
import {RightOutlined} from "@ant-design/icons";
import ModeModal from "../../support/dataStructure/components/modeModal";
const {Option} = Select

/**
 * JSONSchema
 * todo组件后面需要从新开发
 */
const ToggleSchema = (props) =>{
    const {data,schemaData,deep,preKey,parent,root,setSchemaData,updateFn,httpId,resultId} = props


    const [toggleShow, setToggleShow] = useState(false);



    //改变名称
    const changeName = (e) =>{
        let newKey =e.target.value

        // if (Object.keys(parent.properties)) {
        //     return messageFn("error",`The field "${newKey}" already exists.`);
        // }

        let loop = (inlineDeep,data,result ) =>{
            let properties = data.properties;

            Object.keys(properties).forEach(key=>{
                let d = { ...properties[key] }

                if(deep===inlineDeep&&key===preKey){
                    result[newKey] =  d
                }else {
                    result[key] = d
                }

                if (properties[key].properties) {
                    loop(inlineDeep + 1, properties[key], d.properties);
                }
            })
        }

        let result = {};
        let inlineDeep=1;
        loop(inlineDeep,schemaData,result)

        let newResult = {
            ...schemaData,
            properties:result
        }

        console.log(toJS(newResult))

        setSchemaData(newResult)
        const param = {
            id: resultId,
            httpId:httpId,
            jsonText:JSON.stringify(newResult)
        }

        updateFn(param)
    }

    const changeCheckbox = (e) =>{
        let checked = e.target.checked

        let checkedLoop = (inlineDeep,data,result) =>{
            const keys = Object.keys(data.properties);

            keys.forEach(key=>{
                let a = {...data}
                let required

                if (checked) {
                    required = data.required ? [...data.required, preKey] : [key];
                } else {
                    required = data.required?.filter((item) => item !== preKey);
                }

                result = {
                    ...data,
                    required: [...required],
                };

                if (data.properties[key].properties) {
                    checkedLoop(
                        inlineDeep + 1,
                        data.properties[key],
                        a.properties[key].properties
                    )
                }
            })
        }

        let result = {}
        let inlineDeep = 1

        checkedLoop(inlineDeep,schemaData,result)


        console.log(result)
    }

    //改变类型
    const changeType = (type,preKey,dataModel)=>{

        let loop = (inlineDeep,data, result={} ) =>{
            const keys = Object.keys(data.properties);

            keys.forEach((key) => {
                const { ...res } = data.properties[key];
                let d = {...res};

                if (deep === inlineDeep && key === preKey) {

                    if(type === "object"&&!!dataModel){
                        result[dataModel.properties]={
                            type:"object",
                            isModel:true,
                            id:dataModel.id
                        }
                        return
                    }

                    if (type === "object") {
                        result[key] = {
                            ...d,
                            type: type,
                            properties: {},
                        };
                    }else {
                        result[key] = {
                            ...d,
                            type: type,
                        };
                    }
                } else {
                    result[key] = d;
                }

                if (data.properties[key].properties) {
                    loop(
                        inlineDeep + 1,
                        data.properties[key],
                        d.properties
                    );
                }
            });
        };


        let result = {};
        let inlineDeep=1;
        loop(inlineDeep,schemaData,result)

        let newResult = {
            ...schemaData,
            properties:result
        }

        console.log(toJS(newResult))

        setSchemaData(newResult)
        const param = {
            id: resultId,
            httpId:httpId,
            jsonText:JSON.stringify(newResult)
        }
        updateFn(param)

    }

    //改变参数值
    const changeValue = (value) => {

        let loop = (inlineDeep,data, result={} ) =>{
            const keys = Object.keys(data.properties);

            keys.forEach(key=>{
                const {...res} = data.properties[key];
                let d = {
                    ...res,

                }

                if(deep===inlineDeep&&key===preKey){
                    result[key] = {
                        ...d,
                        mock:{mock:value}
                    }
                }else {
                    result[key] = d
                }

                if (data.properties[key].properties) {
                    loop(
                        inlineDeep+1,
                        data.properties[key],
                        d.properties
                    )
                }

            })
        }

        let result = {};
        let inlineDeep=1;
        loop(inlineDeep,schemaData,result)

        let newResult = {
            ...schemaData,
            properties:result
        }

        console.log(toJS(newResult))

        setSchemaData(newResult)

        const param = {
            id: resultId,
            httpId:httpId,
            jsonText:JSON.stringify(newResult)
        }
        updateFn(param)

    };

    const changeDesc = (value) =>{

        let loop = (inlineDeep,data, result={} ) =>{
            const keys = Object.keys(data.properties);

            keys.forEach(key=>{
                const {...res} = data.properties[key];
                let d = { ...res  }

                if(deep===inlineDeep&&key===preKey){
                    result[key] = {
                        ...d,
                        description:value
                    }
                }else {
                    result[key] = d
                }

                if (data.properties[key].properties) {
                    loop(
                        inlineDeep+1,
                        data.properties[key],
                        d.properties
                    )
                }

            })
        }

        let result = {};
        let inlineDeep=1;
        loop(inlineDeep,schemaData,result)

        let newResult = {
            ...schemaData,
            properties:result
        }

        console.log(toJS(newResult))

        setSchemaData(newResult)
    }



    const [countAdd, setCountAdd] = useState(1);
    const _joinName = (deep) => {
        setCountAdd(countAdd+1);
        return  `field_${deep}_${countAdd+1}`
    }
    const addChild =(deep) => {
        const newKey = _joinName(deep)

        let loopAddChild = (inlineDeep,data,result)=>{
            let properties = data.properties


            let newChild = {[newKey]:{ "type":"string" }}

            if(deep===inlineDeep&&root){
                properties=Object.assign({},properties,newChild)
            }

            if(deep===inlineDeep&&!root){
                properties=Object.assign({},properties,newChild)
            }

            const keys = Object.keys(properties);


            keys.forEach(key=>{
                let d = { ...properties[key] }
                result[key] = d

                if (properties[key].properties) {
                    loopAddChild(
                        inlineDeep+1,
                        properties[key],
                        d.properties
                    )
                }
            })
        }

        let result = {}
        let inlineDeep=0;
        loopAddChild(inlineDeep,schemaData,result)

        let newResult = {
            ...schemaData,
            properties:result
        }
        setSchemaData(newResult)

        const param = {
            id: resultId,
            httpId:httpId,
            jsonText:JSON.stringify(newResult)
        }
        updateFn(param)
    }

    //删除
    const deleteChild = () =>{

        const loopDel = (inlineDeep,data,result) =>{
            let properties = data.properties

            if(deep===inlineDeep){
                delete properties[preKey]
            }

            let keys=Object.keys(properties)

            keys.forEach(key=>{
                let d = { ...properties[key] }
                result[key] = properties[key]

                if (result[key].properties) {
                    loopDel(
                        inlineDeep+1,
                        properties[key],
                        result[key].properties
                    )
                }

            })
        }

        let result = {}
        let inlineDeep = 1
        loopDel(inlineDeep,schemaData,result)

        let newResult = {
            ...schemaData,
            properties:result
        }
        setSchemaData(newResult)
        const param = {
            id: resultId,
            httpId:httpId,
            jsonText:JSON.stringify(newResult)
        }
        updateFn(param)
    }

    //CheckBox
    const getCheckBox=()=>{
        return !!(parent && parent.required && parent.required.indexOf(preKey) >= 0);
    }

    //展示前面是否展开图标
    const showPreIcon = (data)=>{
        if(data?.isModel ===true){
            return <div style={{width:"28px"}}/>
        }else {
            if(data?.type==="object"||data?.type==="array"){
                return <div
                    className={"schema-item"}
                    onClick={()=>setToggleShow(!toggleShow)}
                >
                    <IconCommon
                        icon={`${toggleShow?"Solid-up":"Solid-right"}`}
                        className={"icon-m pi-schema-prefix-icon"}
                    />
                </div>
            }else {
                return <div style={{width:"28px"}}/>
            }
        }


    }

    //展示后面是否添加图标
    const showAddIcon = (data) =>{
        if(data?.type==="object" && data?.isModel !==true){
            return <IconCommon
                icon={"tianjia-"}
                style={{"cursor":"pointer"}}
                className={"icon-s"}
                onClick={()=>addChild(deep,data)}
            />
        }else{
            return <span style={{width:16}}  />
        }
    }

    const showDelIcon = () =>{
        if(!root){
            return <IconCommon
                icon={"shanchu2"}
                style={{"cursor":"pointer"}}
                className={"icon-s"}
                onClick={deleteChild}
            />
        }
    }

    const showInputName = () =>{
        if(root){
            return <Input disabled={true}  value={"root"}/>
        }else {
            return <Input
                defaultValue={preKey}
                onBlur={(e)=>changeName(e)}
                disabled={data?.isModel===true}
            />
        }

    }

    //如果还有子集， 就调自己递归循环
    const showChild = (data)=>{

        if(!data) return

        if(data.type==="object"){
            if(!data.properties||Object.keys(data.properties).length===0) return null


            return  Object.keys(data.properties).map(preKey=>{
                return <ToggleSchema
                    data={data.properties[preKey]}
                    schemaData={schemaData}
                    setSchemaData={setSchemaData}
                    deep={deep+1}
                    parent={data}
                    preKey={preKey}
                    updateFn={updateFn}
                    httpId={httpId}
                    resultId={resultId}
                />
            })
        }
    }

    return(
        <div key={`${preKey+deep}`} >
            <div  key={`${preKey+deep}`} className={"pi-schema-box"}>
                <div className={"pi-schema-root"}>
                    <div className={"schema-item schema-item-flex-1"}>
                        <div className={"schema-item-pre"} style={{marginLeft: `${20 * deep}px`}}>
                            {
                                showPreIcon(data)
                            }
                            {
                                showInputName(data)
                            }
                        </div>
                    </div>
                    <div className={"schema-item"}>
                        <Checkbox
                            disabled={root || data?.isModel===true}
                            defaultChecked={getCheckBox()}
                            onChange={(e)=>changeCheckbox(e)}
                        />
                    </div>
                    <div className={"schema-item "}>
                        <Select
                            disabled={data?.isModel===true}
                            className={"schema-item-select"}
                            onChange={(type) =>changeType(type,preKey)}
                            defaultValue={ data?.type||"Object"}
                            dropdownRender={(item)=>(
                                <>
                                    <div style={{"overflow":"auto"}}>{item}</div>
                                    <Divider style={{ margin: '8px 0' }} />

                                    <ModeModal changeType={changeType} preKey={preKey}/>
                                </>
                                )
                            }
                        >
                            {
                                schemaEnum.SCHEMA_TYPE.map(itemEnum=>{
                                    return <Option value={itemEnum} key={itemEnum}> {itemEnum} </Option>
                                })
                            }

                        </Select>
                    </div>
                    <div className={"schema-item "}>
                        <MockSelect
                            // schema={schema}

                            defaultValue={  data?.mock?.mock ||  data?.isModel===true?preKey+"模型":null  }
                            disabled={deep === 0|| data?.isModel===true}
                            onChange={e => changeValue( e)}
                        />

                    </div>
                    <div className={"schema-item schema-item-flex-1"}>
                        <Input
                            disabled={data?.isModel===true}
                            defaultValue={  data?.description }
                            onBlur={e => changeDesc(e.target.value)}
                        />

                    </div>
                    <div className={"schema-item schema-item-action "}>
                        {
                            showDelIcon()
                        }
                        {
                            showAddIcon(data)
                        }
                    </div>
                </div>
            </div>
            {
                toggleShow&&showChild(data)
            }
        </div>
    )
}

export default ToggleSchema