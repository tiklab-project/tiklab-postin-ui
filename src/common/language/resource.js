import { eam_cn} from 'thoughtware-eam-ui/es/utils';
import { message_cn } from 'thoughtware-message-ui/es/utils';
import { user_cn } from 'thoughtware-user-ui/es/utils';
import oplog_cn from 'thoughtware-security-ui/es/utils/language';
import zhCnTrans from "./cn/zhCnTrans.json";

import {privilege_cn} from "thoughtware-privilege-ui/es/utils";
const resources= {
    zh:{
        translation:{
            ...zhCnTrans,
            ...user_cn,
            ...eam_cn,
            ...message_cn,
            ...oplog_cn,
            ...privilege_cn
        },
    },
    en:{
        // translation:{...orga_en, ...message_en},
    },

}

export default resources
