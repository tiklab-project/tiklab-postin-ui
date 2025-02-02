
import React, {useEffect, useState} from 'react';
import {Checkbox, Tag, Tooltip} from "antd";
import ExSelect from "../ExSelect";
import {mockValueDictionary} from "../dictionary/dictionary";
import {ExTable} from "../EditTable";
import DataTypeSelect from "../DataTypeSelect";
import {uuid} from "../utils/createId";
import {convertTableDataToJsonSchema, schemaToTable} from "./JsonSchemaFn";

/**
 * @Description: JsonSchema table组件
 * @Author: sunxiancheng
 */
const JsonSchemaTable = ({schema,updateFn}) => {

    //表头
    let columns= [
        {
            title: '参数名称',
            dataIndex: 'name',
            width: "20%",
            editable: true,
            ellipsis:true,
            render:(text,record) =>  (showName(record))
        },{
            title: '必须',
            dataIndex: 'required',
            width: "8%",
            align:"center",
            render:(text,record) =>  (
                <Checkbox
                    defaultChecked={record.required}
                    onChange={(value) => toggleChecked(value, record)}
                />
            )
        },{
            title: '数据类型',
            width: 120,
            dataIndex: 'dataType',
            render: (text, record)=>(
                <DataTypeSelect
                    defaultValue={record.dataType}
                    handleSave={toggleSelect}
                    rowData={record}
                    model={true}
                />
            )
        },
        {
            title: 'mock',
            dataIndex: 'mock',
            width:  "15%",
            render: (text, record)=>(
                <ExSelect
                    dictionary={mockValueDictionary}
                    defaultValue={text}
                    handleSave={handleSave}
                    rowData={record}
                    dataIndex={'mock'}
                    // setNewRowAction={setNewRowAction}
                    disabled={record.dataType === "object"}
                />
            )
        },
        {
            title: '说明',
            dataIndex: 'description',
            editable: true,
            ellipsis:true
        },
        {
            title: '操作',
            width:  "10%",
            dataIndex: 'operation',
            fixed: 'right',
            render: (text, record) => (showOperation(record)),
        }
    ]

    const showName = (record)=>{
        if(record.id==="root"){
            return <Tag color={"blue"} >根目录</Tag>
        }

        if(record.name==="ITEMS"){
            return <Tag color={"blue"}>ITEMS</Tag>
        }

        return record.name;
    }

    /**
     * 操作项按钮显示
     */
    const showOperation = (record) => {
        let buttons = [];

        if(record.name==="ITEMS"){
            return ;
        }

        if (record.id !== "root") {
            if (record.dataType === 'object') {
                buttons.push(
                    <Tooltip title="添加子节点"  placement="top">
                        <svg
                            className="icon-s "
                            style={{ "cursor":"pointer"}}
                            aria-hidden="true"
                            onClick={() => handleAddChild(record)}
                        >
                            <use xlinkHref={`#icon-tianjia-`}/>
                        </svg>
                    </Tooltip>
                );
            } else {
                buttons.push(
                    <Tooltip title="添加相邻节点"  placement="top">
                        <svg
                            className="icon-s"
                            style={{ "cursor":"pointer"}}
                            aria-hidden="true"
                            onClick={() => handleAddSibling(record)}
                        >
                            <use xlinkHref={`#icon-tianjia-`}/>
                        </svg>
                    </Tooltip>
                );
            }
            buttons.push(
                <svg
                    className="icon-s"
                    style={{ "cursor":"pointer","marginLeft":"10"}}
                    aria-hidden="true"
                    onClick={() => handleDelete(record)}
                >
                    <use xlinkHref= {`#icon-shanchu3`} />
                </svg>
            );
        } else if (record.dataType === 'object') {
            buttons.push(
                <Tooltip title="添加子节点"  placement="top">
                    <svg
                        className="icon-s"
                        style={{ "cursor":"pointer"}}
                        aria-hidden="true"
                        onClick={() => handleAddChild(record)}
                    >
                        <use xlinkHref={`#icon-tianjia-`}/>
                    </svg>
                </Tooltip>
            );
        }

        return buttons;
    };

    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const [tableData, setTableData] = useState();

    useEffect(()=>{
        const initSchema = {
            id: 'root',
            name: 'root',
            dataType: 'object', // 默认数据类型
            mock: '',
            description: '',
            required: true,
        }
        let tableList;
        if(schema){
            tableList = [{
                ...initSchema,
                children: schemaToTable(schema.properties, schema.required)
            }];
        }else {
            tableList = [initSchema];
        }
        setTableData(tableList)

        const allExpandedKeys = flattenChildIds(tableList);
        setExpandedRowKeys(allExpandedKeys); // 初始化展开的行的keys
    },[schema])

    /**
     * 获取所有展开的行
     */
    const flattenChildIds = (data) => {
        return data.flatMap(item => {
            if (item.children) {
                return [item.id, ...flattenChildIds(item.children)];
            }
            return [item.id];
        });
    };

    /**
     * 点击收缩
     */
    const handleExpand = (expanded, record) => {
        if (expanded) {
            setExpandedRowKeys([...expandedRowKeys, record.id]);
        } else {
            setExpandedRowKeys(expandedRowKeys.filter(key => key !== record.id));
        }
    };

    /**
     * 表格checked
     */
    const toggleChecked= (e,row)=> {
        const data = {
            ...row,
            required: e.target.checked
        }
        handleSave(data)
    }

    /**
     * 表格中的select
     */
    const toggleSelect = (row) =>{
        if(row.dataType === 'object') {

            if(!row.model){
                // 如果切换到 object,生成子节点
                row.children = [{
                    id: uuid(),
                    name: 'newChild',
                    dataType: 'string', // 默认数据类型
                    description: '',
                    required: true,
                }];
            }
            setExpandedRowKeys([...expandedRowKeys, row.id]);
        } else if(row.dataType === 'array') {
            // 如果切换到 array,生成子节点
            row.children = [{
                id: uuid(),
                name: 'ITEMS',
                dataType: 'string', // 默认数据类型
                description: '',
                required: true,
            }];

            setExpandedRowKeys([...expandedRowKeys, row.id]);
        }else  {
            // 如果切换到非object,清空子节点
            row.children = undefined;
        }

        handleSave(row)
    }

    /**
     * 生成唯一名称
     */
    const generateUniqueName = (data, baseName) => {
        let name = baseName;
        let counter = 1;
        while (data.some(item => item.name === name)) {
            name = `${baseName}${counter}`;
            counter++;
        }
        return name;
    };

    /**
     * 新增相邻节点
     */
    const addNewSibling = (data, sibling) => {
        const newData = data.slice(); // 复制一份数据以进行操作，避免直接修改原始数据
        const index = newData.findIndex(item => item.id === sibling.id);
        const newSibling = {
            id: uuid(),
            name: generateUniqueName(newData, 'fieldName'),// 生成唯一名称
            dataType: 'string',
            mock: '',
            description: '',
            required: true,
        };
        if (index !== -1) {
            newData.splice(index + 1, 0, newSibling);
        } else {
            for (let i = 0; i < newData.length; i++) {
                if (newData[i].children) {
                    const updatedChildren = addNewSibling(newData[i].children, sibling, newSibling);
                    if (updatedChildren !== newData[i].children) {
                        newData[i] = { ...newData[i], children: updatedChildren };
                        break;
                    }
                }
            }
        }

        return newData;
    };
    const handleAddSibling = (record) => {
        const updatedTableList = addNewSibling(tableData, record);
        setTableData(updatedTableList);
        updateApi(updatedTableList)
    };

    /**
     * 新增子节点
     */
    const addNewChild = (data, parent, newChild) => {
        return data.map(item => {
            if (item.id === parent.id) {
                const updatedChildren = item.children ? [...item.children, newChild] : [newChild];
                return { ...item, children: updatedChildren };
            }

            if (item.children) {
                const updatedChildren = addNewChild(item.children, parent, newChild);
                return { ...item, children: updatedChildren };
            }

            return item;
        });
    };
    const handleAddChild = (record) => {
        const newChild = {
            id: uuid(),
            name: generateUniqueName(record.children || [], 'fieldName'), // 生成唯一名称
            dataType: 'string', // 默认数据类型
            mock: '',
            description: '',
            required: true,
        };

        const updatedTableList = addNewChild(tableData, record, newChild);
        setTableData(updatedTableList);
        updateApi(updatedTableList)
    };

    /**
     * 删除
     */
    const deleteRowAndChildren = (data, rowToDelete) => {
        return data.filter(item => {
            if (item.id === rowToDelete.id) {
                return false; // 删除当前行
            }
            if (item.children) {
                item.children = deleteRowAndChildren(item.children, rowToDelete); // 递归删除子节点
            }
            return true; // 保留其他行
        });
    };
    const handleDelete = (record) => {
        const updatedTableList = deleteRowAndChildren(tableData, record);
        setTableData(updatedTableList);
        updateApi(updatedTableList)
    };

    //更新某一单元格
    const updateData = (data, updatedRow) => {
        return data.map(item => {
            if (item.id === updatedRow.id) {
                return { ...item, ...updatedRow };
            }

            if (item.children) {
                const updatedChildren = updateData(item.children, updatedRow);
                return { ...item, children: updatedChildren };
            }

            return item;
        });
    };
    const handleSave = (row)=>{
        const updatedTableList = updateData(tableData, row);
        setTableData(updatedTableList);
        updateApi(updatedTableList)
    }

    /**
     * 调用接口保存
     */
    const updateApi = (updatedTableList)=>{
        //转换成schema
        let convertTableListToSchemaData = convertTableDataToJsonSchema(updatedTableList);
        console.log(convertTableListToSchemaData)
        // 更新接口
        updateFn(convertTableListToSchemaData.root)
    }


    return (
        <ExTable
            columns={columns}
            dataSource={tableData}
            handleSave={handleSave}
            expandedRowKeys={expandedRowKeys}
            onExpand={handleExpand}
        />
    );
}
export default JsonSchemaTable;
