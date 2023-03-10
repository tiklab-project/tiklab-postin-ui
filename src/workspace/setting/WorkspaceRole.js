import React from "react";
import { DomainUser  } from 'tiklab-user-ui';

/**
 * 包装成员
 */
const WorkspaceRole = props => {
    const workspaceId = localStorage.getItem('workspaceId')
    return (
        // <div>1111</div>
            <DomainUser
                {...props}
                domainId = { workspaceId }
                bgroup={"postin"}
            />
    )
}

export default WorkspaceRole
