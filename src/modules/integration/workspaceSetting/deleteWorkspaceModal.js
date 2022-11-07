import React, {useState} from "react";
import {Button, Form, Input, Modal} from "antd";

const DeleteWorkspaceModal = (props) =>{
    const {workspaceStore,workspaceName} = props;
    const {deleteWorkspace} = workspaceStore;

    const [visible, setVisible] = React.useState(false);
    const [disable, setDisable] = useState(true);
    let workspaceId = localStorage.getItem("workspaceId");

    const onFinish = (e) => {

        if(e.target.value!==workspaceName) {
            setDisable(true)
            return
        };

        setDisable(false)
    }


    const showModal = () =>{ setVisible(true); }
    const onCancel = () => { setVisible(false) };

    const deleteFn = () =>{
        deleteWorkspace(workspaceId).then(()=>{
            props.history.push("/workspacePage")
        })
    }

    return(
        <>
            <Button type="primary" danger onClick={showModal}>删除空间</Button>
            <Modal
                destroyOnClose={true}
                title="你确定删除空间吗？"
                open={visible}
                onCancel={onCancel}
                footer={false}
                width={440}
                centered
            >
                <div className={"ws-delete-box"}>
                    <div className={"ws-delete-tip"}>
                        此操作<span className={"ws-delete-text-bold"}>无法</span>撤消,这将永久删除:
                        <span className={"ws-delete-text-bold"}>{workspaceName}</span>
                    </div>
                    <div className={"ws-delete-input-title"}>请输入  <span className={"ws-delete-text-bold"}>{workspaceName}</span>  进行确认。</div>

                    <Input onChange={onFinish} />
                    <Button
                        type="primary"
                        danger
                        disabled={disable}
                        onClick={deleteFn}
                        className={"ws-delete-modal-btn"}
                    >
                        我了解后果，删除此空间
                    </Button>
                </div>

            </Modal>
        </>
    )
}

export default DeleteWorkspaceModal;