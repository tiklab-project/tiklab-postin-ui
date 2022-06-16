import { EamStore,EAM_STORE } from 'doublekit-eam-ui';
import {PluginStore, PLUGIN_STORE} from "doublekit-plugin-ui"
import { SEARCHSTORE, SearchStore } from './modules/integration/search'

import {USERSELECT_STORE, UserSelectStore} from './modules/integration/userSelect/store/userSelectStore'

import {
    WORKSPACE_STORE, WorkspaceStore,
    WORKSPACE_RECENT_STORE,WorkspaceRecentStore
} from './modules/workspace';

import {DYNAMIC_STORE,DynamicStore} from "./modules/integration/dynamic/store/dynamicStore";

import {CATEGORY_STORE, CategoryStore} from "./modules/category";

import {
    APXMETHOD_STORE, ApxMethodStore,

    REQUESTHEADER_STORE , RequestHeaderStore,
    QUERYPARAM_STORE, QueryParamStore,
    FORMPARAM_STORE, FormParamStore,
    FORM_URLENCODED_STORE,FormUrlencodedStore,
    JSONPARAM_STORE, JsonParamStore,
    RAWPARAM_STORE, RawParamStore,
    PREPARAM_STORE, PreParamStore,
    AFTERPARAM_STORE, AfterParamStore,
    REQUESTBODY_STORE, RequestBodyStore,
    BINARY_PARAM_STORE, BinaryParamStore,

    RESPONSEHEADER_STORE, ResponseHeaderStore,
    JSONRESPONSE_STORE, JsonResponseStore,
    RAWRESPONSE_STORE, RawResponseStore,
    RESPONSERESULT_STORE, ResponseResultStore,


} from "./modules/apxMethod";

import {
    TEST_STORE, TestStore,

    ASSERTPARAM_TEST_STORE, AssertParamTestStore,
    REQUESTHEADER_TEST_STORE, RequestHeaderTestStore,
    QUERYPARAM_TEST_STORE, QueryParamTestStore,
    REQUESTBODY_TEST_STORE, RequestBodyTestStore,
    FORMPARAM_TEST_STORE, FormParamTestStore,
    FORM_URLENCODED_TEST_STORE, FormUrlencodedTestStore,
    JSONPARAM_TEST_STORE, JsonParamTestStore,
    RAWPARAM_TEST_STORE, RawParamTestStore,
    PRE_PARAM_TEST_STORE, PreParamTestStore,
    AFTER_PARAM_TEST_STORE, AfterParamTestStore,

    TESTCASESTORE, TestCaseStore,

    REQUESTHEADER_TESTCASE_STORE, RequestHeaderTestCaseStore,
    QUERYPARAM_TESTCASE_STORE, QueryParamTestCaseStore,
    REQUESTBODY_TESTCASE_STORE, RequestBodyTestCaseStore,
    FORMPARAM_TESTCASE_STORE, FormParamTestCaseStore,
    FORM_URLENCODED_TESTCASE_STORE, FormUrlencodedTestCaseStore,
    JSONPARAM_TESTCASE_STORE, JsonParamTestCaseStore,
    RAWPARAM_TESTCASE_STORE, RawParamTestCaseStore,
    PREPARAM_TESTCASE_STORE, PreParamTestCaseStore,
    BACKPARAM_TESTCASE_STORE, AfterScriptTestCaseStore,
    ASSERTPARAM_TESTCASE_STORE, AssertParamTestCaseStore,
    BINARY_PARAM_TESTCASE_STORE, BinaryParamTestCaseStore,

    INSTANCE_STORE, InstanceStore,
} from "./modules/apitest";

import {
    MOCKSTORE, MockStore ,
    MOCK_REQUESTHEADER_STORE, MockRequestHeaderStore,
    MOCK_QUERYPARAM_STORE, MockQueryParamStore,
    REQUESTBODY_MOCK_STORE, RequestBodyMockStore,
    MOCK_FORMPARAM_STORE ,MockFormParamStore,
    MOCK_JSONPARAM_STORE, MockJsonParamStore,
    MOCK_RESPONSEHEADER_STORE, MockResponseHeaderStore,
    MOCK_JSONRESPONSE_STORE, MockJsonResponseStore,
    MOCK_RAWRESPONSE_STORE,MockRawResponseStore,
    MOCK_RESPONSERESULT_STORE, ResponseResultMockStore,
    MOCK_RESPONSE_STORE, ResponseMockStore,
} from "./modules/apimock"

import {
    ENVIRONMENT_STORE, EnvironmentStore,
    DATASTRUCTURE_STORE, DataStructureStore,
    ENUMPARAMDS_STORE, EnumParamDSStore,
    JSONPARAMDS_STORE, JsonParamDSStore,
    APXMETHOD_STATUS_STORE,ApxMethodStatusStore,
} from './modules/sysmgr'

import {IM_EX_PORT_STORE, ImexportStore} from "./modules/integration/imexport/store/imexportStore"

import {
    HEADER_QUICKTEST_STORE, HeaderQuickTestStore,
    REQUESTBODY_QUICKTEST_STORE,RequestBodyQuickTestStore,
    QUERY_QUICKTEST_STORE, QueryQuickTestStore,
    FORMDATA_QUICKTEST_STORE, FormDataQuickTestStore,
    FORMURLENCODED_QUICKTEST_STORE, FormUrlencodedQuickTestStore,
    JSON_QUICKTEST_STORE, JsonQuickTestStore,
    RAW_QUICKTEST_STORE, RawQuickTestStore,
    PRESCRIPT_QUICKTEST_STORE, PreScriptQuickTestStore,
    AFTERSCRIPT_QUICKTEST_STORE, AfterScriptQuickTestStore,
    ASSERT_QUICKTEST_STORE, AssertQuickTestStore,
    QUICKTEST_STORE, QuickTestStore
} from "./modules/quicktest/index"

function createStores() {
    return {
        [EAM_STORE]: new EamStore(),
        // search
        [SEARCHSTORE]: new SearchStore(),

        // workspace
        [WORKSPACE_STORE]: new WorkspaceStore(),
        [WORKSPACE_RECENT_STORE]: new WorkspaceRecentStore(),

        [DYNAMIC_STORE]:new DynamicStore(),

        // 目录
        [CATEGORY_STORE]: new CategoryStore(),

        // 接口
        [APXMETHOD_STORE]: new ApxMethodStore(),
        [APXMETHOD_STATUS_STORE]: new ApxMethodStatusStore(),
        [REQUESTHEADER_STORE]: new RequestHeaderStore(),
        [QUERYPARAM_STORE]: new QueryParamStore(),
        [FORMPARAM_STORE]: new FormParamStore(),
        [FORM_URLENCODED_STORE]: new FormUrlencodedStore(),
        [JSONPARAM_STORE]: new JsonParamStore(),
        [RAWPARAM_STORE]: new RawParamStore(),
        [PREPARAM_STORE]: new PreParamStore(),
        [AFTERPARAM_STORE]: new AfterParamStore(),
        [REQUESTBODY_STORE]: new RequestBodyStore(),
        [BINARY_PARAM_STORE]: new BinaryParamStore(),

        [RESPONSEHEADER_STORE]: new ResponseHeaderStore(),
        [JSONRESPONSE_STORE]: new JsonResponseStore(),
        [RAWRESPONSE_STORE]: new RawResponseStore(),
        [RESPONSERESULT_STORE]: new ResponseResultStore(),


        // test
        [TEST_STORE]: new TestStore(),
        [ASSERTPARAM_TEST_STORE]: new AssertParamTestStore(),
        [REQUESTHEADER_TEST_STORE]: new RequestHeaderTestStore(),
        [QUERYPARAM_TEST_STORE]: new QueryParamTestStore(),
        [REQUESTBODY_TEST_STORE]: new RequestBodyTestStore(),
        [FORMPARAM_TEST_STORE]: new FormParamTestStore(),
        [FORM_URLENCODED_TEST_STORE]: new FormUrlencodedTestStore(),
        [JSONPARAM_TEST_STORE]: new JsonParamTestStore(),
        [RAWPARAM_TEST_STORE]: new RawParamTestStore(),
        [PRE_PARAM_TEST_STORE]: new PreParamTestStore(),
        [AFTER_PARAM_TEST_STORE]: new AfterParamTestStore(),

        [TESTCASESTORE]: new TestCaseStore(),
        [REQUESTHEADER_TESTCASE_STORE]: new RequestHeaderTestCaseStore(),
        [QUERYPARAM_TESTCASE_STORE]: new QueryParamTestCaseStore(),
        [REQUESTBODY_TESTCASE_STORE]: new RequestBodyTestCaseStore(),
        [FORMPARAM_TESTCASE_STORE]: new FormParamTestCaseStore(),
        [FORM_URLENCODED_TESTCASE_STORE]: new FormUrlencodedTestCaseStore,
        [JSONPARAM_TESTCASE_STORE]: new JsonParamTestCaseStore(),
        [RAWPARAM_TESTCASE_STORE]: new RawParamTestCaseStore(),
        [PREPARAM_TESTCASE_STORE]: new PreParamTestCaseStore(),
        [BACKPARAM_TESTCASE_STORE]: new AfterScriptTestCaseStore(),
        [ASSERTPARAM_TESTCASE_STORE]: new AssertParamTestCaseStore(),
        [BINARY_PARAM_TESTCASE_STORE]: new BinaryParamTestCaseStore(),

        [INSTANCE_STORE]: new InstanceStore(),

        // mock
        [MOCKSTORE]: new MockStore(),
        [MOCK_REQUESTHEADER_STORE]: new MockRequestHeaderStore(),
        [MOCK_QUERYPARAM_STORE]: new MockQueryParamStore(),
        [REQUESTBODY_MOCK_STORE]: new RequestBodyMockStore(),
        [MOCK_FORMPARAM_STORE]: new MockFormParamStore(),
        [MOCK_JSONPARAM_STORE]: new MockJsonParamStore(),
        [MOCK_RESPONSEHEADER_STORE]: new MockResponseHeaderStore(),
        [MOCK_JSONRESPONSE_STORE]: new MockJsonResponseStore(),
        [MOCK_RAWRESPONSE_STORE]: new MockRawResponseStore(),
        [MOCK_RESPONSERESULT_STORE]: new ResponseResultMockStore(),
        [MOCK_RESPONSE_STORE]: new ResponseMockStore(),

        //sysmgr
        [ENVIRONMENT_STORE]: new EnvironmentStore(),
        [DATASTRUCTURE_STORE]: new DataStructureStore(),
        [ENUMPARAMDS_STORE]: new EnumParamDSStore(),
        [JSONPARAMDS_STORE]: new JsonParamDSStore(),

        //执行人
        [USERSELECT_STORE]: new UserSelectStore(),

        //导入导出
        [IM_EX_PORT_STORE]: new ImexportStore(),

        [PLUGIN_STORE]: new PluginStore(),

        [HEADER_QUICKTEST_STORE]:new HeaderQuickTestStore(),
        [REQUESTBODY_QUICKTEST_STORE]:new RequestBodyQuickTestStore(),
        [QUERY_QUICKTEST_STORE]: new QueryQuickTestStore(),
        [FORMDATA_QUICKTEST_STORE]: new FormDataQuickTestStore(),
        [FORMURLENCODED_QUICKTEST_STORE]: new FormUrlencodedQuickTestStore(),
        [JSON_QUICKTEST_STORE]: new JsonQuickTestStore(),
        [RAW_QUICKTEST_STORE]: new RawQuickTestStore(),
        [PRESCRIPT_QUICKTEST_STORE]:new PreScriptQuickTestStore(),
        [AFTERSCRIPT_QUICKTEST_STORE]: new AfterScriptQuickTestStore(),
        [ASSERT_QUICKTEST_STORE]: new AssertQuickTestStore(),
        [QUICKTEST_STORE]: new QuickTestStore(),

    };
}

const stores = createStores();

export {
    stores
}

