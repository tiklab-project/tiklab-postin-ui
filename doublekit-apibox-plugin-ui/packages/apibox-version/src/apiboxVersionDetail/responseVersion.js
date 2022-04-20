/**
 * @description：
 * @date: 2021-07-23 11:06
 */
import React from 'react';
import {
    headerResponse,
    jsonResponse,
    ExTable
}from './common';
import RawResponse from './rawResponse';

// 输出参数 返回头部与返回结果的切换
const ResponseVersion = (props) =>{
    console.log(props,'res')
    const { verResponse } = props;
    const {
        responseResultList,
        responseHeaderList,
        rawResponseList,
        jsonResponseList
    }=verResponse;

    return(
        <>
            <div className='ver-title'>响应头</div>
            <ExTable  dataSource={responseHeaderList} columns={headerResponse}/>
            <div className='ver-title'>响应体</div>
            {
                (()=> {
                    switch(responseResultList && responseResultList[0].resultType) {
                        case 'json':
                            return <ExTable dataSource={jsonResponseList} columns={jsonResponse}/>
                        case 'raw':
                            return <RawResponse rawParam={rawResponseList}/>
                        default:
                            return <ExTable dataSource={jsonResponseList} columns={jsonResponse}/>
                    }
                })()
            }
        </>
    )
}

export default ResponseVersion;
