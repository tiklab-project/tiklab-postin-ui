# `darth-flow-ui`

> 内部的流程模块

## Usage

```
npm i darth-flow-ui
```

## 模块包含的组件
|  组件名称   | 描述  |
|  ----  | ----  |
| DARTH_FLOW_STORE  | 系统流程store的key值 |
| DARTH_FLOW_PROJECT_STORE  | 项目流程store的key值 |
| darthFlowStores  | 导出的mobx的store数据 |
| flow_cn  | 表单的中文语言数据 |
| flow_en  | 表单的英文语言数据 |
| DarthSystemFlow  | 系统流程组件 |
| DarthProjectFlow  | 项目流程组件 |
| FlowDesign  | 流程详情 |

### FlowDesign
|  api   | 描述  | 值  | 是否必填  |
|  ----  | ----  | ----  | ----  |
| props  | 父级数据 | object | 是 |
| id  | 流程详情id | string | 是 |
| breadcrumbProps  | 自定义面包屑 | array | 否 |
 > breadcrumbProps 数据格式 :

```
[{
    breadcrumbName: '流程', // 标题名称
    disabled:true,          // 禁用
    click: function,        // 如果是在组件内部调整使用click方法来控制显示, 如果有click字段优先选用这个
    path: '路由'              // 路由地址
}]
```


### DarthSystemFlow
 > 注意 在创建的文件中引入改组件，需要在改组件中使用  `inject(DARTH_FLOW_STORE)(observer
>(SystemFlowComponent))`， 使其组件可以通过props获取到store

|  api   | 描述  | 值  | 是否必填  |
|  ----  | ----  | ----  | ----  |
| props  | 父级数据 | object | 是 |

### DarthProjectFlow
 > 注意 在创建的文件中引入改组件，需要在改组件中使用  `inject(DARTH_FLOW_PROJECT_STORE)(observer
>(ProjectFlowComponent))`， 使其组件可以通过props获取到store

|  api   | 描述  | 值  | 是否必填  |
|  ----  | ----  | ----  | ----  |
| props  | 父级数据 | object | 是 |
| domainId  | 项目域id | string | 是 |


### 是使用步骤

1. 第一步
    - 将表单的国际化的数据合并
    - 在 `i18n.js` 中配置
    ```$jsx
            import i18n from "i18next";
            import LanguageDetector from 'i18next-browser-languagedetector';
            import Backend from 'i18next-http-backend';
            import {initReactI18next} from 'react-i18next';
            
            import {form_cn, form_en} from 'darth-form-ui'
            import {flow_cn, flow_en} from 'darth-flow-ui'
            
            i18n.use(Backend).use(LanguageDetector) //嗅探当前浏览器语言
                .use(initReactI18next) //init i18next
                .init({
                    //引入资源文件
                    resources: {
                        zh: {
                            translation: {...form_cn, ...flow_cn},
                        },
                        en: {
                            translation: {...form_en, ...flow_en},
                        },
            
                    },
                    //选择默认语言，选择内容为上述配置中的key，即en/zh
                    fallbackLng: "zh",
                    lng: 'zh',
                    debug: false,
                    interpolation: {
                        escapeValue: false, // not needed for react as it escapes by default
                    },
                })
            
            export default i18n;
   ```
2. 第二步
      - 将表单的store放置在项目的全局
      - 在项目启动路径中配置
        ```
         import React from 'react';
         import ReactDOM from 'react-dom';
         import {BrowserRouter, Route} from 'react-router-dom'
         import routes from "./routers";
         import {renderRoutes} from "react-router-config";
         import { Provider } from 'mobx-react';
         import { stores } from './stores';
         import{privilegeStores} from 'darth-privilege-ui'
         import{stores as portalStores} from 'darth-portal-ui'
         import{darthFormStores} from 'darth-form-ui'
         import{orgStores} from 'darth-orga-ui'
         import{darthFlowStores} from 'darth-flow-ui'
         import './common/language/i18n'
         
         const App = () => {
             // 将所有模块的store配置到全局
             let allStore = {...stores, ...privilegeStores, ...portalStores, ...orgStores, ...darthFormStores, ...darthFlowStores}
         
             // 检测用户是否登录
             const userInfo = JSON.parse(localStorage.getItem('darthPortalUser'))
             if (userInfo && userInfo.ticket) {
                 allStore.darthRoleStore.getSystemPermissions(userInfo.ticket)
             }
             return (
         
                 <Provider {...allStore}>
                     <BrowserRouter>
                         {renderRoutes(routes)}
                     </BrowserRouter>
                 </Provider>
             )
         };
         
         ReactDOM.render(<App/>, document.getElementById('root'));
         
         if (module.hot) {
             module.hot.accept()
         }
         
      ```
3. 创建模块路由
   - 将表单的store放置在项目的全局
   - 在`router.js`配置 (在自己路由文件中配置)
   ```
   // 流转中心
   // 系统流转
   const AnsycSystemFlow = SyncComponent(() => import('./contains/system-flow'));
   // 项目流转
   const AnsycProjectFlow = SyncComponent(() => import('./contains/project-flow'));
   
   const routes = [
         {
            path: "/flow/system-flow",
            exact: true,
            component: AnsycSystemFlow,
            key:'system-flow',
        },
        {
            path: "/flow/project-flow",
            exact: true,
            component: AnsycProjectFlow,
            key:'project-flow',
        },

        {
            path: "/flow",
            exact: true,
            component: () => <Redirect to="/flow/system-flow"/>
        },
        {
            path: "/flow/*",
            exact: true,
            component: () => <Redirect to="/flow/system-flow"/>
        }
   ]

   ```
   
   3. 根据上面的模块创建对应的文件 `system-flow.js, project-flow.js`
   
      - `project-flow.js` demo
      ```
       import React from 'react';
       import {inject, observer} from "mobx-react";
       import {DARTH_FLOW_PROJECT_STORE, DarthProjectFlow} from "darth-flow-ui";
       import {MenuList} from "darth-privilege-ui";
       import {flowMenuData, flowOnSelectMenuSwitch} from "../../unit/staticConfig";
       
       
       const ProjectFlowComponent = props => {
           const onSelectMenu = e => {
               const key = e.key;
               flowOnSelectMenuSwitch(props.history, key)
           }
           return(
               <div style={{    display: 'flex',height: '100%'}}>
                   <MenuList
                       data={flowMenuData}
                       onSelectMenu={onSelectMenu}
                       defaultSelectedKeys={['2']}
                       allPromise={props.darthSystemRoleStore.systemPermissions}
                   />
                   <DarthProjectFlow {...props} domainId={'demo-flow-01'}/>
               </div>
           )
       }
       
       export default inject(DARTH_FLOW_PROJECT_STORE,'darthRoleStore')(observer(ProjectFlowComponent))

      ```
