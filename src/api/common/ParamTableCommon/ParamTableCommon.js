import React from 'react';
import IconCommon from "../../../common/IconCommon";
import {uuid} from "../../../common/utils/createId";
import {ExTable} from "../../../common/EditTable";


/**
 * 测试页
 * 请求头
 */
const ParamTableCommon = (props) =>{
    const {sourceList,setList,isQuery} = props;

    let columns= [

        isQuery
            ?{
                title: '参数名称',
                dataIndex: 'paramName',
                width: '40%',
                editable: true,
            }
            :{
                title: '参数名称',
                dataIndex: 'headerName',
                width: '40%',
                editable: true,
            }
        ,{
            title: '参数值',
            width: '40%',
            dataIndex: 'value',
            editable: true,
        },{
            title: '操作',
            width: '150',
            fixed: 'right',
            dataIndex: 'operation',
            render: (text, record) =>(
                <>
                    {
                        Object.keys(record).length===1
                            ?null
                            :<IconCommon
                                icon={"shanchu3"}
                                className="icon-s table-edit-icon"
                                onClick={()=>deleteList(record.id)}
                            />
                    }

                </>

            )
        },
    ]

    /**
     * 删除
     */
    const deleteList = (id) =>{
        let newList = sourceList.filter(item => item.id !== id);

        if(newList.length === 0){
            newList = [{id: uuid()}];
        }

        setList([...newList]);
    }

    /**
     * 保存数据
     */
    const handleSave =  (row) => {
        let newData = [...sourceList];
        //获取当前行对应的下标
        let index = newData.findIndex(item => row.id === item.id);

        //替换
        newData.splice(index, 1, {
            ...newData[index],
            ...row
        });

        if(index === newData.length-1){
            newData.push({id: uuid()});
        }

        setList(newData);
    };

    
    return (
        <>
            <ExTable
                columns={columns}
                dataSource={sourceList}
                handleSave={handleSave}
            />
        </>

    );
}

export default ParamTableCommon;
