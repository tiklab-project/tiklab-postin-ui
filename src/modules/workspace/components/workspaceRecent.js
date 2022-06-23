import React from "react";
import BreadcrumbEx from "../../common/breadcrumbEx";
import WorkspaceRecentHome from "./workspaceRecentHome";
import {useTranslation} from "react-i18next";

const WorkspaceRecent = (props) =>{

    const { t } = useTranslation();

    return(
        <>
            <BreadcrumbEx
                list={[
                    t('wsMgr'),
                    t('wsList')
                ]}
            />
            <WorkspaceRecentHome {...props}/>
        </>
    )
}

export default WorkspaceRecent;