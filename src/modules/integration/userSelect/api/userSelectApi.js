import {Axios as service} from "tiklab-core-ui";

export function findUserSelectPage(data){
    return service.request({
        url: "/dmUser/findDmUserPage",
        method: "post",
        data
    })
}

