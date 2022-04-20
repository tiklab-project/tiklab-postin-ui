import React from "react";
import { DomainUserList  } from 'doublekit-user-ui';

const WorkspaceRole = props => {
    const workspaceId = localStorage.getItem('workspaceId')
    return (
            <DomainUserList
                {...props} 
                domainId = { workspaceId }
            />
    )
}

export default WorkspaceRole
