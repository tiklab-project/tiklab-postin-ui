import React from "react";
import { RoleList } from 'doublekit-privilege-ui';

const SystemRole = props => {

    return (
            <RoleList {...props} group={'system'} />
    )
}

export default SystemRole;
