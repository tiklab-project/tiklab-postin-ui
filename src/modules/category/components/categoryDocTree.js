import React, { useState} from "react";
import {inject, observer} from "mobx-react";

const CategoryDoc = (props) =>{
    const {categoryStore} = props;
    const {findCategoryAddSon} = categoryStore;

    const [apiDoc, setApiDoc] = useState();






    const showContentType =(data)=>{
        switch (data?.request?.bodyType) {
            case "none":
                return "none"
            case "formdata":
                return "multipart/form-data";
            case "formUrlencoded":
                return "application/x-www-form-urlencode";
            case "raw":
                return  data.rawParam.type
        }
    }



    return(
        <>
            <div className={"share-box"}>
                <div className={"share-box-left"}>

                </div>
                <div className={"share-box-right"} >


                </div>
            </div>
        </>
    )
}

export default inject("categoryStore")(observer(CategoryDoc));