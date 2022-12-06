/*
 * @Description:用于打包
 * @LastEditTime: 2021-05-31 13:29:01
 */
import { stores as postinStore  } from './components/stores';
import routers from './components/routers';
import App from "./components/app";

import {
    Home,PageContent,HeaderContent,

    SysManage,
    LoginOut,LoginContent,
    ElectronLoginContant,
    LayoutQuickTest,TabsQuickTest,
    Test, TestdetailQuickTest,TestCaseDetail,
} from "./components/modules/index"


export {
    postinStore, routers, App,
    Home,PageContent,HeaderContent,
    LayoutQuickTest,TabsQuickTest,
    Test, TestdetailQuickTest,TestCaseDetail,

    SysManage,
    LoginOut,LoginContent,
    ElectronLoginContant,


}
