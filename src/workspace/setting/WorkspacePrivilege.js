import React from "react";
import { DomainRole } from 'tiklab-user-ui';

/**
 * 包装权限
 */
const WorkspacePrivilege = props => {
    const workspaceId = localStorage.getItem('workspaceId')
    return (
            <DomainRole
                {...props} 
                domainId = {workspaceId}
                bgroup={"postin"}
            />
    )
}

export default WorkspacePrivilege
