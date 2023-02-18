import { eam_cn} from 'tiklab-eam-ui/es/_utils';
import {  privilege_cn } from 'tiklab-privilege-ui/es/_utils';
import { message_cn } from 'tiklab-message-ui/es/_utils';
import { orga_cn } from 'tiklab-user-ui/es/_utils';
import oplog_cn from 'tiklab-oplog-ui/es/_utils/language';
import zhCnTrans from "./cn/zhCnTrans.json";
const resources= {
    zh:{
        translation:{
            ...zhCnTrans,
            ...orga_cn,
            ...eam_cn,
            ...privilege_cn,
            ...message_cn,
            ...oplog_cn
        },
    },
    en:{
        // translation:{...orga_en,...privilege_en, ...message_en},
    },

}

export default resources
