import React from "react";
import { PrivilegeDomainRole } from 'doublekit-privilege-ui';

const WorkspacePrivilege = props => {
    const workspaceId = localStorage.getItem('workspaceId')
    return (
            <PrivilegeDomainRole  
                {...props} 
                domainId = {workspaceId}
            />
    )
}

export default WorkspacePrivilege
