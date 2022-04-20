/*
 * @Description:
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:06:47
 */
import React, { Fragment, useEffect } from 'react';
import { observer, inject } from "mobx-react";
import { Breadcrumb, Input, Table, Space, Row, Col, } from 'antd';
import EnvironmentEdit from './environmentEdit';

//
const EvnMana = (props) => {
    const { environmentStore } = props;
    const {
        findEnvironmentPage,
        environmentList,
        deleteEnvironment,
    } = environmentStore;

    const columns = [
        {
            title: "环境名称",
            dataIndex: "name",
            key: "name",
            align:"center",
        },
        {
            title: "环境地址",
            dataIndex: "url",
            key: "url",
            align:"center",
        },
        {
            title: "操作",
            key: "action",
            align:"center",
            render: (text, record) => (
            <Space size="middle">
                <EnvironmentEdit name="编辑" type='edit' environmentId={record.id}></EnvironmentEdit>
                <span style={{'color':'red','cursor':'pointer'}} onClick={()=>deleteEnvironment(record.id)}>删除</span>
            </Space>
            ),
        },
    ]

    useEffect(()=> {
        findEnvironmentPage();
    },[])

    // 搜索
    const onSearch = (e) => {
        findEnvironmentPage(e.target.value);
    }

    return(
        <Row justify={'center'} style={{width:'100%'}}>
            <Col xl={{span: 20}} lg={{span: 24}} xxl={{span:16}}>
                <Breadcrumb separator=">"  className={"apibox-breadcrumb"} >
                    <Breadcrumb.Item> 环境管理 </Breadcrumb.Item>
                    <Breadcrumb.Item>环境列表</Breadcrumb.Item>
                </Breadcrumb>
                <div className='wslist-searchbtn'>
                    <Input
                        placeholder="搜索名称"
                        onPressEnter={onSearch}
                        className='search-input'
                    />
                    <EnvironmentEdit name="+添加环境" type="add"  style={{ width: 200 }}/>
                </div>
                <Table
                    className="tablelist"
                    columns={columns}
                    dataSource={environmentList}
                    rowKey={record => record.id}
                />

            </Col>
        </Row>
    )
}

export default inject('environmentStore')(observer(EvnMana));
