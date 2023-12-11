import React from "react";
import {Button, Popconfirm} from "antd";
import {Axios} from "thoughtware-core-ui";

const PdfExport = () =>{

    const exportPDF = () => {
        let param = new FormData();
        param.append("workspaceId", localStorage.getItem("workspaceId"));
        Axios.post("/port/exportPdf", param,{},{
            responseType:"blob"
        })
            .then(response => {
                console.log(response)
                const blob = new Blob([response], { type: 'application/pdf' });
                const a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = 'export.pdf';
                a.style.display = 'none';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return(
        <Popconfirm
            title="确定导出？"
            onConfirm={exportPDF}
            okText='确定'
            cancelText='取消'
        >
            <Button>PDF导出</Button>
        </Popconfirm>
    )
}

export default PdfExport;