
import React from 'react';
import { observer, inject } from 'mobx-react';
import ScriptCommon from "../../../common/tableCommon/components/scriptCommon";

const TestAfterParam = (props) => {
    const {afterParamTestStore}  = props;
    const {getAfterInfo,setAfterInfo} = afterParamTestStore;

    return (
        <ScriptCommon
            getInfo={getAfterInfo}
            setInfo={setAfterInfo}
        />
    )
}

export default inject('afterParamTestStore')(observer(TestAfterParam));
