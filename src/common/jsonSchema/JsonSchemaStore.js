
import {action, observable} from "mobx";

/**
 * json schema
 */
class JsonSchemaStore{
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

let jsonSchemaStore = new JsonSchemaStore();
export default jsonSchemaStore;