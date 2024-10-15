import React from "react";
import {Button, Popconfirm} from "antd";
import {Axios} from "tiklab-core-ui";

const HtmlExport = () =>{

    const exportHtml = () =>{
        let param = new FormData()
        param.append("workspaceId",localStorage.getItem("workspaceId"))
        Axios.post("/port/exportHtml",param)
            .then(response => {
                // 创建一个 Blob 对象
                const blob = new Blob([response], { type: 'text/html' });

                // 创建一个 <a> 标签并设置相关属性
                const a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = 'export.html';

                // 将 <a> 标签添加到页面，并模拟点击下载
                document.body.appendChild(a);
                a.click();

                // 下载完成后移除 <a> 标签
                document.body.removeChild(a);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return(
        <Popconfirm
            title="确定导出？"
            onConfirm={exportHtml}
            okText='确定'
            cancelText='取消'
        >
            <Button>Html导出</Button>
        </Popconfirm>
    )
}

export default HtmlExport;