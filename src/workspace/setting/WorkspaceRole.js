import React from "react";
import { DomainUserList  } from 'tiklab-user-ui';

/**
 * 包装成员
 */
const WorkspaceRole = props => {
    const workspaceId = localStorage.getItem('workspaceId')
    return (
        // <div>1111</div>
            <DomainUserList
                {...props}
                domainId = { workspaceId }
                bgroup={"postin"}
            />
    )
}

export default WorkspaceRole
