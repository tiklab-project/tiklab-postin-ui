/**
 * @description：
 * @date: 2021-07-23 11:06
 */
import React, { Fragment } from 'react';
import {
    headerParam,
    queryParam,
    formParam,
    jsonParam,
    ExTable
} from './common'

import RawParam from './rawParam';
import PreParam from './preParam';
import AfterParam from './afterParam';

// 输出参数 请求头部与请求参数的切换
const RequestVersion = (props) => {
    console.log(props,'req')
    const { verRequest } = props;
    const {
        requestBodyExList,
        requestHeaderList,
        queryParamList,
        formParamList,
        jsonParamList,
        rawParamList,
        preScriptList,
        afterScriptList,
    } = verRequest;

    //根据bodyType 渲染相应组件
    const changeFormat = (radioValue) => {
        switch(radioValue) {
            case 'form':
                return <ExTable dataSource={formParamList} columns={formParam} />
            case 'json':
                return <ExTable dataSource={jsonParamList} columns={jsonParam} />
            case 'raw':
                return <RawParam rawParam={rawParamList}/>
            case 'binary':
                return <ExTable dataSource={formParamList} columns={formParam} />
        }
    }

    return(
        <Fragment>
            <div className='ver-title'>请求头部</div>
            <ExTable dataSource={requestHeaderList} columns={headerParam}/>
            <div className='ver-title'>查询参数</div>
            <ExTable dataSource={queryParamList} columns={queryParam}/>
            <div className='ver-title'>请求体</div>
            {
                changeFormat(requestBodyExList&&requestBodyExList[0].bodyType)
            }
            <div className='ver-title'>前置脚本</div>
            <PreParam preParam={preScriptList}/>
            <div className='ver-title'>后置脚本</div>
            <AfterParam  afterParam={afterScriptList}/>
        </Fragment>
    )

}

export default RequestVersion;
