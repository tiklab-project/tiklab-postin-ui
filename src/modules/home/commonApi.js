import {Axios, getUser} from "tiklab-core-ui";

export const findLogList = async (value)=>{

    const params = {
        // sendType: 'site',
        ...value,
        userId:getUser().userId,
        bgroup:"postin"
    }
    let res = await Axios.post('/oplog/findlogpage', params)
    if (res.code === 0) {


        return res.data;
    }
}