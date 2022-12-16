import React from 'react';
import { Table, Form, message } from "antd";
// import { JSONSchema } from "json-schema-typed";


const JsonSchemaList = ({ schema }) => {
    // Parse the JSON Schema and extract the table column definitions
    const schemaObject = new JSONSchema(schema);
    // const columns = schemaObject.getColumns();

    return (
        <Form>
            <Table
                // columns={columns}
                // dataSource={data}
                // Use JSON Schema to validate the user input
                onChange={(pagination, filters, sorter, extra) => {
                    const errors = schemaObject.validate(extra.currentDataSource);
                    if (errors.length > 0) {
                        // Display the error messages
                        errors.forEach(error => message.error(error.message));
                    }
                }}
            />
        </Form>
    );
};

export default JsonSchemaList