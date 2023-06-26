import React, {useState} from "react";
import { Drawer} from "antd";
import {inject, observer} from "mobx-react";
import ShareModal from "../../api/http/document/components/ShareModal";
import IconBtn from "../../common/iconBtn/IconBtn";
import CategoryDocTree from "./CategoryDocTree";
import DocContent from "../../common/apiDoc/DocContent";
import noneImg from "../../assets/img/nonedoc.png"
import categoryStore from "../store/CategoryStore";
/**
 * 文档中目录
 */
const CategoryDocDrawer = (props) =>{
    const {categoryId} = props;
    const { findCategoryAddSon } = categoryStore;
    const [open, setOpen] = useState(false);
    const [treeList, setTreeList] = useState();
    const [name, setName] = useState();
    const [apiDoc, setApiDoc] = useState();

    const showDrawer = async () => {
        let res = await findCategoryAddSon(categoryId);
        // setName(res.apiRecent.name)
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
                width={1230}
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
                                    width:975,
                                    padding: "0 0 0 248px",
                                    height: "100%",
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

export default observer(CategoryDocDrawer);