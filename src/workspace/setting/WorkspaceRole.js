import React from "react";
import { DomainUser  } from 'thoughtware-user-ui';

/**
 * 包装成员
 */
const WorkspaceRole = props => {
    const workspaceId = localStorage.getItem('workspaceId')
    return (
            <DomainUser
                {...props}
                domainId = { workspaceId }
                bgroup={"postin"}
            />
    )
}

export default WorkspaceRole
