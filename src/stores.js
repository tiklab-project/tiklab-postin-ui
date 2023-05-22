import {EAM_STORE, EamStore} from 'tiklab-eam-ui/es/store'
import { SEARCHSTORE, SearchStore } from './common/header/search'

import {USERSELECT_STORE, UserSelectStore} from './support/userSelect/store/UserSelectStore'

import {JSON_SCHEMA_STORE,JsonSchemaStore} from "./common/jsonSchema/JsonSchemaStore";

import {
    WORKSPACE_STORE, WorkspaceStore,
    WORKSPACE_RECENT_STORE,WorkspaceRecentStore,
    WORKSPACE_FOLLOW_STORE,WorkspaceFollowStore
} from './workspace';


import {CATEGORY_STORE, CategoryStore} from "./category";

import {API_RECENT_STORE,ApiRecentStore} from "./api/apix/store/ApiRecentStore";
import {
    APXMETHOD_STORE, ApxMethodStore,
    APIREQUEST_STORE,ApiRequestStore,
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
    APIRESPONSE_STORE, ApiResponseStore,

} from "./api/http/definition";

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
    REQUEST_CASE_STORE, RequestCaseStore,
    FORMPARAM_TESTCASE_STORE, FormParamTestCaseStore,
    FORM_URLENCODED_TESTCASE_STORE, FormUrlencodedTestCaseStore,
    JSONPARAM_TESTCASE_STORE, JsonParamTestCaseStore,
    RAWPARAM_TESTCASE_STORE, RawParamTestCaseStore,
    PREPARAM_TESTCASE_STORE, PreParamTestCaseStore,
    BACKPARAM_TESTCASE_STORE, AfterScriptTestCaseStore,
    ASSERTPARAM_TESTCASE_STORE, AssertParamTestCaseStore,
    BINARY_PARAM_TESTCASE_STORE, BinaryParamTestCaseStore,

    INSTANCE_STORE, InstanceStore,
} from "./api/http/test";

import {
    MOCKSTORE, MockStore ,
    MOCK_REQUESTHEADER_STORE, MockRequestHeaderStore,
    MOCK_QUERYPARAM_STORE, MockQueryParamStore,
    REQUEST_MOCK_STORE, RequestMockStore,
    MOCK_FORMPARAM_STORE ,MockFormParamStore,
    MOCK_JSONPARAM_STORE, MockJsonParamStore,
    MOCK_RESPONSEHEADER_STORE, MockResponseHeaderStore,
    MOCK_JSONRESPONSE_STORE, MockJsonResponseStore,
    MOCK_RAWRESPONSE_STORE,MockRawResponseStore,
    MOCK_RESPONSERESULT_STORE, ResponseResultMockStore,
    MOCK_RESPONSE_STORE, ResponseMockStore,
} from "./api/http/mock"

import {IM_EX_PORT_STORE, ImexportStore} from "./support/imexport/store/ImexportStore"

import {
    HEADER_QUICKTEST_STORE, HeaderQuickTestStore,
    REQUESTBODY_QUICKTEST_STORE,RequestBodyQuickTestStore,
    QUERY_QUICKTEST_STORE, QueryQuickTestStore,
    FORMDATA_QUICKTEST_STORE, FormDataQuickTestStore,
    FORMURLENCODED_QUICKTEST_STORE, FormUrlencodedQuickTestStore,
    JSON_QUICKTEST_STORE, JsonQuickTestStore,
    RAW_QUICKTEST_STORE, RawQuickTestStore,
    PRESCRIPT_QUICKTEST_STORE, PreScriptQuickTestStore,
    QUICKTEST_STORE, QuickTestStore
} from "./quicktest/index"
import {TAB_QUICK_TEST_STORE,TabQuickTestStore} from "./quicktest/store/TabQuickTestStore";


import {SHARE_STORE,ShareStore} from "./api/http/document/store/ShareStore";
import {APXMETHOD_STATUS_STORE, ApxMethodStatusStore} from "./support/apiStatus/store/ApxMethodStatusStore";
import {ENVIRONMENT_STORE, EnvironmentStore} from "./support/environment/store/environmentStore";
import {DATASTRUCTURE_STORE, DataStructureStore} from "./support/dataStructure/store/DataStructureStore";
import {ENUMPARAMDS_STORE, EnumParamDSStore} from "./support/dataStructure/store/EnumParamDSStore";
import {JSONPARAMDS_STORE, JsonParamDSStore} from "./support/dataStructure/store/JsonParamDSStore";

import {GLOBAL_HEADER_STORE,GlobalHeaderStore} from "./support/globalParam/header/globalHeaderStore";

function createStores() {
    return {
        [EAM_STORE]: new EamStore(),
        // search
        [SEARCHSTORE]: new SearchStore(),

        // workspace
        [WORKSPACE_STORE]: new WorkspaceStore(),
        [WORKSPACE_RECENT_STORE]: new WorkspaceRecentStore(),
        [WORKSPACE_FOLLOW_STORE]: new WorkspaceFollowStore(),


        // 目录
        [CATEGORY_STORE]: new CategoryStore(),

        // 接口
        [API_RECENT_STORE]: new ApiRecentStore(),
        [APIREQUEST_STORE]: new ApiRequestStore(),
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
        [APIRESPONSE_STORE]: new ApiResponseStore(),


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
        [REQUEST_CASE_STORE]: new RequestCaseStore(),
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
        [REQUEST_MOCK_STORE]: new RequestMockStore(),
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

        [HEADER_QUICKTEST_STORE]:new HeaderQuickTestStore(),
        [REQUESTBODY_QUICKTEST_STORE]:new RequestBodyQuickTestStore(),
        [QUERY_QUICKTEST_STORE]: new QueryQuickTestStore(),
        [FORMDATA_QUICKTEST_STORE]: new FormDataQuickTestStore(),
        [FORMURLENCODED_QUICKTEST_STORE]: new FormUrlencodedQuickTestStore(),
        [JSON_QUICKTEST_STORE]: new JsonQuickTestStore(),
        [RAW_QUICKTEST_STORE]: new RawQuickTestStore(),
        [PRESCRIPT_QUICKTEST_STORE]:new PreScriptQuickTestStore(),
        [QUICKTEST_STORE]: new QuickTestStore(),

        [TAB_QUICK_TEST_STORE]: new TabQuickTestStore(),

        [JSON_SCHEMA_STORE]: new JsonSchemaStore(),
        [SHARE_STORE]: new ShareStore(),

        [GLOBAL_HEADER_STORE]: new GlobalHeaderStore()

    };
}

const stores = createStores();

export {
    stores
}

