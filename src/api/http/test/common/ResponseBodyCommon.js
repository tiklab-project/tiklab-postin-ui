import React, {useEffect, useState} from "react";
import "./testResponseStyle.scss"
import ReactMonacoEditor from "../../../../common/monacoEditor/ReactMonacoEditor";

const ResponseBodyCommon = (props) => {
    const {responseBodyData,mediaType} = props;


    const [language, setLanguage] = useState('plaintext');
    const [precessValue, setPrecessValue] = useState();

    useEffect(()=>{
        setPrecessValue(processData(responseBodyData))

    },[responseBodyData])

    //数据处理
    const processData =(data)=>{

        //空值
        if(!data) return "";
        if (data instanceof Object && Object.keys(data).length === 0) {
            return JSON.stringify(responseBodyData);
        }


        let language = getLanguageFromMIME(mediaType)
        setLanguage(language)

        if(language==="json"){
            return JSON.stringify(responseBodyData)
        }

        return  responseBodyData
    }

    /**
     * 根据mediaType，获取monaco-editor响应的language
     */
    const getLanguageFromMIME = (mime) => {
        if(!mime) return 'plaintext'

        let mimeObj = {
            "html":"html",
            "javascript":"javascript",
            "json":"json",
            "text":"plaintext"
        }

        //如果包含某个key，就会返回对应的key
        const matchingMime = Object.keys(mimeObj).find((key) => mime.includes(key));

        //通过key获取相应的language
        if (matchingMime) {
            return mimeObj[matchingMime];
        } else {
            return 'plaintext';
        }
    }

    return(
        <div className={"codemirror-box"}>
            <ReactMonacoEditor
                value={precessValue}
                language={language}
                height={"400px"}
                width={"100%"}
                readOnly={true}
            />
        </div>
    )

}

export default ResponseBodyCommon;