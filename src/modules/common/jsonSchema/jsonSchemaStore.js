
import {action, observable} from "mobx";

export class JsonSchemaStore{
    @observable schemaData={};

    @action
    getSchemaData = (data) =>{
        this.schemaData = data;
    }

    @action
    setSchemaData = (data) =>{
        this.schemaData = data;
    }

}

export const JSON_SCHEMA_STORE = "jsonSchemaStore";