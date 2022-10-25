import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {Button, Input, Modal, Select, Table} from "antd";

const columns = [
    {
        title: `姓名`,
        dataIndex: ["user","name"],
        key: "name",
        // align:"center",
    },{
        title: `手机`,
        dataIndex: ["user","phone"],
        key: "phone",
        // align:"center",
    },{
        title: `邮箱`,
        dataIndex: ["user","email"],
        key: "email",
        // align:"center",
    },{
        title: `类型`,
        dataIndex: ["user","userType"],
        key: "userType",
        // align:"center",
        render: (text,record) =>(text===1?'内部':'第三方')
    },
]

const UserSelect =(props) =>{
    const {userSelectStore} = props;
    const {findUserSelectPage,userSelectList,totalRecord,getUserId,userName} = userSelectStore;

    const [tableLoading,setTableLoading] = useState(true);
    const [pageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [params, setParams] = useState({
        pageParam: {
            pageSize: pageSize,
            currentPage: currentPage
        }
    })
    const [visible, setVisible] = useState(false);
    const [selectRow,setSelectRow]=useState();
    const [selectName,setSelectName]=useState();
    const workspaceId = localStorage.getItem('workspaceId')

    useEffect(()=>{
        findUserSelectPage(workspaceId,params).then(()=>{
            setTableLoading(false)
        })
    },[workspaceId,params])

    const rowSelection = {
        type:'radio',
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectRow(selectedRows[0].user.id);
            setSelectName(selectedRows[0].user.name)
            console.log(selectedRowKeys, selectedRows)
        },
    };

    //提交
    const onFinish = () => {
        getUserId(selectRow)
        setVisible(false)
    }

    //分页
    const onTableChange = (pagination) => {
        setCurrentPage(pagination.current)
        const newParams = {
            ...params,
            pageParam: {
                pageSize: pageSize,
                currentPage: pagination.current
            },
        }
        setParams(newParams)
    }

    //搜索
    const onSearch = (e) => {
        setCurrentPage(1)
        let newParams = {
            pageParam: {
                pageSize: pageSize,
                currentPage: 1
            },
        }
        if (e.target.value) {
            newParams = {
                pageParam: {
                    pageSize: pageSize,
                    currentPage: 1
                },
                name:e.target.value,
            }
        }
        setParams(newParams)
    }

    // 弹框展示
    const showModal = () => { setVisible(true)};
    // 关闭弹框
    const onCancel = () => {
        setVisible(false);

    };

    return(
        <>
            {
                selectName||userName
                    ?<a onClick={showModal}>{selectName||userName}</a>
                    :<a onClick={showModal}>待认领</a>
            }

            <Modal
                destroyOnClose={true}
                title='执行者选择'
                open={visible}
                onCancel={onCancel}
                onOk={onFinish}
                okText="提交"
                cancelText="取消"
                centered
                width={600}
            >
                <Input
                    placeholder={`搜索`}
                    onPressEnter={onSearch}
                    className='search-input'
                />
                <Table
                    className="tablelist"
                    columns={columns}
                    dataSource={userSelectList}
                    rowKey={record => record.id}
                    rowSelection={{...rowSelection}}
                    pagination={{
                        current:currentPage,
                        pageSize:pageSize,
                        total:totalRecord,
                    }}
                    onChange = {(pagination) => onTableChange(pagination)}
                    loading={tableLoading}
                />
            </Modal>
        </>
    )
}

export default inject('userSelectStore')(observer(UserSelect));