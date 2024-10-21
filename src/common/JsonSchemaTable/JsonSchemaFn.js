import {uuid} from "../utils/createId";

/**
 * tableList 转换成 jsonschema
 */
export const convertTableDataToJsonSchema = (data) => {
    const schema = {};

    for (const item of data) {
        if (item.dataType === 'object') {
            const childSchema = convertTableDataToJsonSchema(item.children);
            schema[item.name] = {
                type: 'object',
                properties: childSchema,
                required: item.children?.some(child => child.required) ? item.children.filter(child => child.required).map(child => child.name) : undefined,
                mock: item.mock ? { mock: item.mock } : undefined,
                description: item.description ?? undefined,
            };
        } else if (item.dataType==="array") {
            const arraySchema = convertTableDataToJsonSchema(item.children);
            schema[item.name] = {
                type: 'array',
                properties: arraySchema,
                required: item.children?.some(child => child.required) ? item.children.filter(child => child.required).map(child => child.name) : undefined,
                mock: item.mock ? { mock: item.mock } : undefined,
                description: item.description ?? undefined,
            };
        }else {
            schema[item.name] = {
                type: item.dataType,
                mock: item.mock ? { mock: item.mock } : undefined,
                description: item.description ?? undefined,
            };
        }
    }

    return schema;
};

/**
 *  jsonschema 转换成 tableList
 */
export const schemaToTable = (properties,  requiredFields = []) => {
    if(properties){
        return Object.keys(properties).map(subKey => {
            const subProperty = properties[subKey];
            return {
                id: uuid(),
                name: subKey,
                dataType: subProperty.type,
                mock: subProperty.mock?.mock,
                required: requiredFields.includes(subKey),
                description: subProperty.description,
                children: subProperty.properties ? schemaToTable(subProperty.properties, subProperty.required ?? []) : undefined,
            };
        });
    }

};