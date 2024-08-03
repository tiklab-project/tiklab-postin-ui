import {Input, Modal, Tooltip} from 'antd';
import React, { useState } from 'react';
import { SearchOutlined} from "@ant-design/icons";
import workspaceRecentStore from "../../../../workspace/workspace/store/WorkspaceRecentStore";
import apiRecentStore from "../../../../home/apiRecent/store/ApiRecentStore";
import categoryStore from "../../../../category/store/CategoryStore";
import {getUser} from "thoughtware-core-ui";
import ShowSearchResult from "./ShowSearchResult";
import {debounce} from "../../../commonUtilsFn/CommonUtilsFn";
import {inject, observer} from "mobx-react";
import "./search.scss"

const SearchModal = (props) => {
    const {themeColor,isExpanded,workspaceStore} = props;
    const {findWorkspaceJoinList} = workspaceStore
    const {findWorkspaceRecentPage}=workspaceRecentStore;
    const {findApiRecentPage}=apiRecentStore;
    const {findNodePage} = categoryStore

    const [workspaceRecentList, setWorkspaceRecentList] = useState([]);
    const [apiRecentList, setApiRecentList] = useState([]);
    const [workspaceSearchList, setWorkspaceSearchList] = useState([]);
    const [apiSearchList, setApiSearchList] = useState([]);
    const [isSearch, setIsSearch] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);


    /**
     * 搜索框，键入自动请求
     */
    const changeValue = async (e) => {
        let value = e.target.value;
        if (value.length > 0) {
            setIsSearch(true)
        }else {
            setIsSearch(false)
        }

        let params = {
            workspaceName:value,
            userId:getUser().userId
        }
        let workspaceList = await findWorkspaceJoinList(params)
        setWorkspaceSearchList(workspaceList)

        let apiParams = {
            name:value,
            apiTypeList:["http","ws"]
        }
        let res = await findNodePage(apiParams)
        setApiSearchList(res.data.dataList)
    }


    const showModal = async () => {
        let params = {
            pageParam: {
                pageSize: 3,
                currentPage:1
            }
        }
        let workspaceList =  await findWorkspaceRecentPage(params)
        setWorkspaceRecentList(workspaceList)
        let apiList = await findApiRecentPage(params)
        setApiRecentList(apiList)

        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            {isExpanded
                ? <div className={`search-box message-icon-${themeColor}`} onClick={showModal}>
                    <SearchOutlined style={{fontSize:"18px"}}/>
                    <div>搜索</div>
                </div>
                : <Tooltip placement="right" title={"搜索"}>
                    <div className={`search-box  message-icon-${themeColor} search-box-not-isExpanded`} onClick={showModal}>
                        <SearchOutlined style={{fontSize:"18px"}}/>
                    </div>
                </Tooltip>
            }
            <Modal
                title="搜索"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={false}
                centered
                className={"search-modal"}
            >
                <div className={"search-modal-input"}>
                    <Input
                        width={"100%"}
                        prefix={<SearchOutlined />}
                        placeholder="搜索空间、接口"
                        onChange={debounce(changeValue,500) }
                        allowClear
                    />
                </div>
                <div className={"search-modal-box"}>
                    <ShowSearchResult
                        workspaceRecentList={workspaceRecentList}
                        apiRecentList={apiRecentList}
                        workspaceSearchList={workspaceSearchList}
                        apiSearchList={apiSearchList}
                        isSearch={isSearch}
                        setIsModalOpen={setIsModalOpen}
                    />
                </div>
            </Modal>
        </>
    );
};
export default inject("workspaceStore")(observer(SearchModal));