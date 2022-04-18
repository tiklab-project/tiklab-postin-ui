
import React from 'react';
import { observer, inject } from 'mobx-react';
import ScriptCommon from "../../common/tableCommon/components/scriptCommon";

const AfterQuickTest = (props) => {
    const {afterScriptQuickTestStore}  = props;
    const {getAfterInfo,setAfterInfo} = afterScriptQuickTestStore;

    return (
        <ScriptCommon
            getInfo={getAfterInfo}
            setInfo={setAfterInfo}
        />
    )
}

export default inject('afterScriptQuickTestStore')(observer(AfterQuickTest));