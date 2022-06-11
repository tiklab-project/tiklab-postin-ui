import React from "react";

import CategoryAside from "../../../category/components/categoryAside";
import RightContent from "../../../common/rightContent";

const LayoutApiContent = (props) =>{

    return(
        <RightContent
            left={<CategoryAside {...props} />}
            {...props}
        />
    )
}

export default LayoutApiContent