import React from "react";

import CategoryAside from "../../../../category/components/categoryAside";
import RightContent from "../../../../common/rightContent";

//api 的盒子，  包含左侧列表树，可以拖拽的div，右侧的内容
const LayoutApiContent = (props) =>{

    return(
        <RightContent
            left={<CategoryAside {...props} />}
            {...props}
        />
    )
}

export default LayoutApiContent