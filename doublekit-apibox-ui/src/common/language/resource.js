import { eam_cn} from 'doublekit-eam-ui';
import { privilege_en, privilege_cn } from 'doublekit-privilege-ui';
import { message_cn, message_en } from 'doublekit-message-ui';
import { orga_cn, orga_en } from 'doublekit-user-ui';
import zhCnTrans from "./cn/zhCnTrans.json";
const resources= {
    zh:{
        translation:{...zhCnTrans,...orga_cn,...eam_cn,...privilege_cn,...message_cn},
    },
    en:{
        translation:{...orga_en,...privilege_en, ...message_en},
    },

}

export default resources
