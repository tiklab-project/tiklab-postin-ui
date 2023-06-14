import React from 'react';
import { Table } from 'antd';

// 假设这是你的 JSON Schema
const jsonSchema = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            description: 'Name',
        },
        age: {
            type: 'number',
            description: 'Age',
        },
        address: {
            type: 'object',
            properties: {
                street: {
                    type: 'string',
                    description: 'Street',
                },
                city: {
                    type: 'string',
                    description: 'City',
                },
                country: {
                    type: 'string',
                    description: 'Country',
                },
            },
        },
    },
};

// 表格组件
const SchemaTable = ({ schema, level = 0 }) => {
    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => ({
                children: <div style={{ paddingLeft: `${level * 20}px` }}>{text}</div>,
            }),
        },
        {
            title: '是否必选',
            dataIndex: 'required',
            key: 'required',
        },
        {
            title: '数据类型',
            dataIndex: 'dataType',
            key: 'dataType',
        },
        {
            title: 'mock',
            dataIndex: 'mock',
            key: 'mock',
        },
        {
            title: '说明',
            dataIndex: 'description',
            key: 'description',
        },
    ];

    const dataSource = [];

    const renderRows = (properties, parentName = '') => {
        for (const [fieldName, fieldSchema] of Object.entries(properties)) {
            const { type, description } = fieldSchema;
            const required = schema.required && schema.required.includes(fieldName);
            const mock = `@${fieldName}`;

            dataSource.push({
                name: fieldName,
                required: required ? '是' : '否',
                dataType: type,
                mock: mock,
                description: description,
                key: `${parentName}_${fieldName}`,
            });

            if (type === 'object' && fieldSchema.properties) {
                renderRows(fieldSchema.properties, `${parentName}_${fieldName}`);
            }
        }
    };

    renderRows(schema.properties);

    return (
        <Table
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            bordered
        />
    );
};

// 在应用中使用表格组件
const App = () => {
    return (
        <div>
            <h1>层级表格</h1>
            <SchemaTable schema={jsonSchema} />
        </div>
    );
};

export default App;
