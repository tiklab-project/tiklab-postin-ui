import {Axios as service} from "doublekit-core-ui";

export function findUserSelectPage(data){
    return service.request({
        url: "/dmUser/findDmUserPage",
        method: "post",
        data
    })
}

