import React from "react";
import { DomainRoleList } from 'doublekit-privilege-ui';

const WorkspacePrivilege = props => {
    const workspaceId = localStorage.getItem('workspaceId')
    return (
            <DomainRoleList
                {...props} 
                domainId = {workspaceId}
            />
    )
}

export default WorkspacePrivilege
