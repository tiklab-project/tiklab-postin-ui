
import {
    createVersion,
    compareVersion,
    findVersionList
} from "../api/versionApi"
import {action, observable} from "mobx";

export class VersionStore{
    @observable compareData;
    @observable current;
    @observable version;

    @action
    compareVersion = async (param) =>{
        let res = await compareVersion(param)
        if(res.code===0){
            this.compareData = res.data;
            this.current = res.data.current;
            this.version = res.data.version
            return res.data;
        }
    }
}
let versionStore = new VersionStore()

export default versionStore