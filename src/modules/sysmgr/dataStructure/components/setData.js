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
                return <div className={"tabPane-item-box"}><EnumParamDS dataStructureId={props.dataStructureId} /></div>
            case 'json':
                return <div className={"tabPane-item-box"}><JsonParamDS dataStructureId={props.dataStructureId} /></div>
            default:
                return <div className={"tabPane-item-box"}><EnumParamDS dataStructureId={props.dataStructureId} /></div>
        }
    }

    return(
        <>
            <a onClick={showModal}>{props.name}</a>
            <Modal
                destroyOnClose={true}
                title='数据设置'
                open={visible}
                onCancel={onCancel}
                footer={null}
                width={1080}
                className={"dataStructure-modal-box"}
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
