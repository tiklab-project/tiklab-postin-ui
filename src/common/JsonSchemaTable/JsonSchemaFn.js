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
                ...(item.required && { required: [item.name] }), // 添加 required 属性，仅当 required 存在时
                ...(item.mock && { mock: { mock: item.mock } }), // 添加 mock 属性，仅当 mock 存在时
                ...(item.description && { description: item.description }) // 添加 description 属性，仅当 description 存在时
            };
            if (item.children.some(child => child.required)) {
                schema[item.name].required = item.children.filter(child => child.required).map(child => child.name);
            }
        } else if (item.dataType) {
            schema[item.name] = {
                type: item.dataType,
                ...(item.mock && { mock: { mock: item.mock } }), // 添加 mock 属性，仅当 mock 存在时
                ...(item.description && { description: item.description }) // 添加 description 属性，仅当 description 存在时
            };
        }
    }

    return schema;
};

/**
 *  jsonschema 转换成 tableList
 */
export const schemaToTable = (properties,  requiredFields = []) => {
    return Object.keys(properties).map(subKey => {
        const subProperty = properties[subKey];
        return {
            id: uuid(),
            name: subKey,
            dataType:subProperty.type,
            mock: subProperty.mock?.mock,
            required: requiredFields.includes(subKey), // 根据 requiredFields 判断是否设置为 true
            description:subProperty.description,
            children: subProperty.properties
                ? schemaToTable(subProperty.properties,  subProperty.required || []) // 递归传入当前属性的 required 数组
                : undefined,
        };
    });
};