import {Axios} from "tiklab-core-ui";

export function findWorkspaceHomeTotal(data,apiUrl){
    let url
    if(apiUrl){
         url = apiUrl+"/workspace/findWorkspaceHomeTotal"
    }else{
        url="/workspace/findWorkspaceHomeTotal"
    }


    return Axios.post(url,data)
}

