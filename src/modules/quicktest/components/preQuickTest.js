
import React from 'react';
import { observer, inject } from 'mobx-react';
import ScriptCommon from "../../common/tableCommon/components/scriptCommon";

const PreQuickTest = (props) => {
    const { preScriptQuickTestStore }  = props;
    const { getPreInfo,setPreInfo } = preScriptQuickTestStore;

    return (
        <ScriptCommon
            getInfo={getPreInfo}
            setInfo={setPreInfo}
        />
    )

}

export default  inject('preScriptQuickTestStore')(observer(PreQuickTest));