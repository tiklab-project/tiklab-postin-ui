
import React from 'react';
import { observer, inject } from 'mobx-react';
import ScriptCommon from "../../../common/tableCommon/components/scriptCommon";

const TestPreParam = (props) => {
    const { preParamTestStore }  = props;
    const { getPreInfo,setPreInfo } = preParamTestStore;

    return (
        <ScriptCommon
            getInfo={getPreInfo}
            setInfo={setPreInfo}
        />
    )

}

export default inject('preParamTestStore')(observer(TestPreParam));
