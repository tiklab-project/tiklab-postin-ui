/**
 * @description：
 * @date: 2021-07-29 17:17
 */
import React from 'react';
import EnumParamDS from './enumParamDS';
import JsonParamDS from "./jsonParamDS";
import { Modal} from "antd";

const SetData = (props) => {
    const {dataType} = props

    const [visible, setVisible] = React.useState(false);

    // 弹框展示
    const showModal = () => setVisible(true);

    const onCancel = () => setVisible(false) ;

    //根据dataType切换
    const changeType = (data) => {
        switch(data) {
            case 'enum':
                return <EnumParamDS dataStructureId={props.dataStructureId} />
            case 'json':
                return <JsonParamDS dataStructureId={props.dataStructureId} />
            default:
                return <EnumParamDS dataStructureId={props.dataStructureId} />
        }
    }

    return(
        <>
            {
                <a onClick={showModal}>数据设置</a>
            }

            <Modal
                destroyOnClose={true}
                title='数据设置'
                visible={visible}
                onCancel={onCancel}
                footer={null}
                width={870}
                centered
            >
                {
                    changeType(dataType)
                }
            </Modal>

        </>
    )
}
export default  SetData;
