import React from "react";
import { PrivilegeSystemRole } from 'doublekit-privilege-ui';

const SystemRole = props => {

    return (
            <PrivilegeSystemRole {...props} group={'system'} />
    )
}

export default SystemRole;
