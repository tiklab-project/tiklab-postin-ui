/*
 * @Description:用于打包
 * @LastEditTime: 2021-05-31 13:29:01
 */
import { stores as workspaceStore } from './components/stores';
import routers from './components/routers';
import saasrouters from './components/saasrouters';
import {Entry} from "./components/index";
import workspaceResource from './components/common/language/resource';
import { orgStores } from 'doublekit-user-ui';
import { privilegeStores } from 'doublekit-privilege-ui';
import { messageModuleStores } from 'doublekit-message-ui';
import Search from "./components/modules/integration/search/components/search"
import {PortalHeader} from "./components/modules/header/portalHeader"


const  workspaceStores = {
    ...workspaceStore,
    ...orgStores,
    ...privilegeStores,
    ...messageModuleStores
}

const workspaceRouters = routers

export {
    workspaceStores,
    workspaceRouters,
    saasrouters,
    workspaceResource,
    Search,
    Entry,
    PortalHeader
}
