import React, {useState} from "react";
import {Drawer} from "antd";
import {observer} from "mobx-react";
import ShareModal from "./ShareModal";
import IconBtn from "../../../common/iconBtn/IconBtn";
import ApiDocContent from "../../../api/http/common/apiDoc/ApiDocContent";
import noneImg from "../../../assets/img/nonedoc.png"
import categoryStore from "../../../category/store/CategoryStore";
import NodeTreeDocDrawer from "./NodeTreeDocDrawer";
import WSDocContent from "./WSDocContent";


const EmptyPage =() => {

    return(
        <div style={{
            width:100,
            "display": "flex",
            "alignItems": "center",
            "justifyContent": "center",
            "flex":1
        }}>
            <div>
                <img src={noneImg} alt={"none-img"} width={200} />
                <div style={{textAlign:"center"}}>点击接口查看</div>
            </div>
        </div>
    )
}
/**
 * 文档中目录
 */
const CategoryDocDrawer = (props) =>{
    const {categoryId} = props;
    const { findNode } = categoryStore;
    const [open, setOpen] = useState(false);
    const [treeList, setTreeList] = useState();
    const [name, setName] = useState();
    const [apiData, setApiData] = useState();
    const [wsData, setWsData] = useState();
    const [nodeType, setNodeType] = useState();

    const showDrawer = async () => {
        let res = await findNode(categoryId);
        setName(res.data.name)
        setTreeList([res.data])
        setOpen(true);
    }

    const onClose = () =>  setOpen(false);

    const showDoc = (nodeType)=>{
        if(nodeType){
            switch (nodeType) {
                case "http":
                    if(apiData){
                        return <ApiDocContent
                            style={{
                                display:"flex",
                                gap:10,
                                width:975,
                                padding: "0 0 0 248px",
                                height: "100%",
                            }}
                            apiData={apiData}
                        />
                    }else {
                        return <EmptyPage />;
                    }
                case "ws":
                    if(wsData){
                        return <WSDocContent
                            style={{
                                display:"flex",
                                gap:10,
                                width:975,
                                padding: "0 0 0 248px",
                                height: "100%",
                            }}
                            wsData={wsData}
                        />
                    }else {
                        return <EmptyPage />;
                    }
            }
        }else {
            return <EmptyPage />;
        }
    }


    return (
        <>
            <IconBtn
                className="pi-icon-btn-grey"
                onClick={showDrawer}
                name={"文档"}
            />
            <Drawer
                title="文档预览"
                placement="right"
                onClose={onClose}
                width={"80%"}
                visible={open}
                extra={
                    <ShareModal
                        btn={true}
                        targetName={name}
                        targetId={categoryId}
                        targetType={"category"}
                    />
                }
            >
                <div style={{"display":"flex","gap":"5px",height:"100%"}}>
                    <div
                        className={"share-box-left"}
                        style={{background:"#fff",border:"1px solid var(--pi-border-color)"}}
                    >
                        <NodeTreeDocDrawer
                            treeList={treeList}
                            setApiData={setApiData}
                            setWsData={setWsData}
                            setNodeType={setNodeType}
                        />
                    </div>
                    {
                        showDoc(nodeType)
                    }

                </div>
            </Drawer>
        </>
    );
}

export default observer(CategoryDocDrawer);

