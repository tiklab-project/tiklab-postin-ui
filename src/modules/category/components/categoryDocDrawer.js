import React, {useState} from "react";
import { Drawer} from "antd";
import {inject, observer} from "mobx-react";
import ShareModal from "../../share/components/shareModal";
import IconBtn from "../../common/iconBtn/IconBtn";
import CategoryDocTree from "./categoryDocTree";
import DocContent from "../../common/apiDoc/docContent";
import noneImg from "../../../assets/img/nonedoc.png"

const CategoryDocDrawer = (props) =>{
    const {categoryStore,categoryId} = props;
    const { findCategoryAddSon } = categoryStore;
    const [open, setOpen] = useState(false);
    const [treeList, setTreeList] = useState();
    const [name, setName] = useState();
    const [apiDoc, setApiDoc] = useState();

    const showDrawer = async () => {
        let res = await findCategoryAddSon(categoryId);
        // setName(res.apix.name)
        setName(res[0].name)
        setTreeList(res)

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
                width={1200}
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
                <div style={{"display":"flex","gap":"10px",height:"100%"}}>
                    <div
                        className={"share-box-left"}
                        style={{background:"#fff",border:"1px solid var(--pi-border-color)"}}
                    >
                        <CategoryDocTree
                            treeList={treeList}
                            setApiDoc={setApiDoc}
                            categoryId={categoryId}
                        />
                    </div>
                    {
                        apiDoc
                            ?<DocContent
                                style={{
                                    display:"flex",
                                    gap:10,
                                    width:960,
                                    height: "100%",
                                    margin:"0 auto",
                                    overflow:"auto"
                                }}
                                apiDoc={apiDoc}
                            />
                            :<div style={{
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
                    }

                </div>
            </Drawer>
        </>
    );

}

export default inject("categoryStore")(observer(CategoryDocDrawer));