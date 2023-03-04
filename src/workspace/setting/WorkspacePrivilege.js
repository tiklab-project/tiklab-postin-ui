import React from "react";
import { DomainRoleList } from 'tiklab-privilege-ui';

/**
 * 包装权限
 */
const WorkspacePrivilege = props => {
    const workspaceId = localStorage.getItem('workspaceId')
    return (
            <DomainRoleList
                {...props} 
                domainId = {workspaceId}
                bgroup={"postin"}
            />
    )
}

export default WorkspacePrivilege
