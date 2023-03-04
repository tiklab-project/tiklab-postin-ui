/**
 * @description：可编辑表格里的公用部分
 * @date: 2021-07-21 14:10
 */
import React, {useEffect, useState, useRef, useContext} from 'react';
import {Form, Input, Table} from "antd";


/**
 * 共享父组件的值
 */
const EditableContext = React.createContext();

/**
 * 可编辑行
 */
const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false} >
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

/**
 *可编辑单元格
 */
const EditableCell = ({
          title,
          editable,
          children,
          dataIndex,
          record,
          handleSave,
          ...restProps
      }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef();
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    //点击单元格可编辑
    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    // 保存值
    const save =  () => {
        try {
            form.validateFields().then(values => {
                // record 一整行的值，value 当前单元格的值
                handleSave({ ...record, ...values });
            })
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{margin: 0}}
                name={dataIndex}
            >
                <Input ref={inputRef} onPressEnter={toggleEdit} onBlur={toggleEdit} onChange={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{paddingRight: 24}}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};


/**
 * 覆盖默认的 table 元素
 */
const components = {
    body: {
        row: EditableRow,
        cell: EditableCell,
    },
};

/**
 * 表格列的配置,是否可编辑
 */
const column = (columns,handleSave) => {
    return columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave: handleSave,
            }),
        };
    });
}


const ExTable = (props) => {
    const {dataSource,columns,handleSave,rowSelection} = props;

    // 覆盖默认的 table 元素
    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    let column = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave: handleSave,
            }),
        };
    });

    return(
        <Table
            bordered
            components={components}
            rowClassName={'editable-row'}
            pagination={false}
            rowKey = {record => record.id}
            expandable={{
                indentSize:20
            }}
            dataSource={dataSource}
            columns={column}
            rowSelection={rowSelection}
        />
    )
}



export {
    // ComOperation,
    components,
    column,
    ExTable
}
