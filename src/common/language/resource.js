import { eam_cn} from 'tiklab-eam-ui/es/utils';
import { message_cn } from 'tiklab-message-ui/es/utils';
import { user_cn } from 'tiklab-user-ui/es/utils';
import oplog_cn from 'tiklab-security-ui/es/utils/language';
import zhCnTrans from "./cn/zhCnTrans.json";
import pluginManage_cn from 'tiklab-plugin-manager-ui/es/utils/language'

const resources= {
    zh:{
        translation:{
            ...zhCnTrans,
            ...user_cn,
            ...eam_cn,
            ...message_cn,
            ...oplog_cn,
            ...pluginManage_cn
        },
    },
    en:{
        // translation:{...orga_en, ...message_en},
    },

}

export default resources
