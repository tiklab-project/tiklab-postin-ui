
import {action, observable} from "mobx";

/**
 * json schema
 */
export class JsonSchemaStore{
    @observable schemaData={};

    /**
     * 获取schema值
     */
    @action
    getSchemaData = (data) =>{
        this.schemaData = data;
    }

    /**
     * 获取schema值
     */
    @action
    setSchemaData = (data) =>{
        this.schemaData = data;
    }

}

export const JSON_SCHEMA_STORE = "jsonSchemaStore";