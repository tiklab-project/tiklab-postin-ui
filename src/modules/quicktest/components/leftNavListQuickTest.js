import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import {quickTestTabProcess} from "../../common/apiTabListInfoProcess";

const LeftNavListQuickTest =(props)=>{
    const {testCaseStore} = props;
    const {findTestCaseList,testCaseList} = testCaseStore;

    useEffect(()=>{
        findTestCaseList("quickTest")
    },[])


    const quickTestTabListInfo = JSON.parse(sessionStorage.getItem("quickTestTabListInfo"))

    const onClick=(item)=>{
        localStorage.setItem("testCaseId",item.id)

        quickTestTabProcess(item,quickTestTabListInfo)

        props.history.push("/workspacepage/quickTest/detail/api")
    }

    const showListView = (data) =>{
        return data&&data.map(item=>{
            return(
                <li
                    className={"qt-left-list-li"}
                    key={item.id}
                    onClick={()=>onClick(item)}
                >
                    {item.name}
                </li>
            )
        })
    }


    return(
        <ul className={"qt-left-list"}>
            {
                showListView(testCaseList)
            }
        </ul>
    )

}

export default inject("testCaseStore")(observer(LeftNavListQuickTest));