
import {WORKSPACE_STORE,WorkspaceStore} from "./workspace/workspace/store/WorkspaceStore";
import {USERSELECT_STORE, UserSelectStore} from './support/userSelect/store/UserSelectStore'
import {GLOBAL_HEADER_STORE,GlobalHeaderStore} from "./support/globalParam/header/globalHeaderStore";
import {INSTANCE_STORE,InstanceStore} from "./api/http/test/instance/store/InstanceStore";


function createStores() {
    return {
        // search
        [INSTANCE_STORE]:new InstanceStore(),

        [WORKSPACE_STORE]: new WorkspaceStore(),

        //执行人
        [USERSELECT_STORE]: new UserSelectStore(),

        [GLOBAL_HEADER_STORE]: new GlobalHeaderStore()

    };
}

const stores = createStores();

export {
    stores
}

