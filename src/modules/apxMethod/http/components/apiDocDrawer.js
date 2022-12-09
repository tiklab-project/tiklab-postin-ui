import React, {useState} from "react";
import {Button, Drawer} from "antd";
import IconBtn from "../../../common/iconBtn/IconBtn";
import {inject, observer} from "mobx-react";
import ApiDocContent from "../../../share/components/apiDocContent";
import ShareModal from "../../../share/components/shareModal";

const DocDrawer = (props) =>{
    const {apxMethodStore,apxMethodId} = props;
    const { findApxMethod } = apxMethodStore;
    const [open, setOpen] = useState(false);
    const [apiData, setApiData] = useState();
    const [name, setName] = useState();

    const showDrawer = async () => {
        let res = await findApxMethod(apxMethodId);
        setName(res.apix.name)
        setApiData(res)

        setOpen(true);
    }

    const onClose = () =>  setOpen(false);

    return (
        <>
            <IconBtn
                className="pi-icon-btn-grey"
                icon={"rizhijilu"}
                onClick={showDrawer}
                name={"文档"}
            />
            <Drawer
                title="文档预览"
                placement="right"
                onClose={onClose}
                width={800}
                visible={open}
                extra={
                    <ShareModal
                        btn={true}
                        targetName={name}
                        targetId={apxMethodId}
                        targetType={"api"}
                    />
                }
            >

                <ApiDocContent apiDoc={apiData}/>

            </Drawer>
        </>
    );

}

export default inject("apxMethodStore")(observer(DocDrawer));