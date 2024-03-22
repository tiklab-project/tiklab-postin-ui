import React, {useEffect, useState} from "react";
import "./testResponseStyle.scss"
import ReactMonacoEditor from "../../../../common/monacoEditor/ReactMonacoEditor";

const ResponseBodyCommon = (props) => {
    const {responseBodyData,mediaType} = props;


    const [language, setLanguage] = useState('plaintext');
    const [precessValue, setPrecessValue] = useState("");

    useEffect(()=>{
        setPrecessValue(processData(responseBodyData, mediaType));

    },[responseBodyData])

    const processData = (data, mime) => {
        if (!data) return '';

        if (mime && mime.includes('json')) {
            setLanguage('json');
            return JSON.stringify(data, null, 2);
        } else if (mime && mime.includes('html')) {
            setLanguage('html');
            return data; // Assuming HTML is provided as is
        } else if (mime && mime.includes('image')) {
            // const binaryDataWithoutQuotes = data.slice(1, data.length - 1);
            //
            // const bytes = new Uint8Array(binaryDataWithoutQuotes.length);
            // for (let i = 0; i < binaryDataWithoutQuotes.length; i++) {
            //     bytes[i] = binaryDataWithoutQuotes.charCodeAt(i);
            // }
            // const base64String = btoa(String.fromCharCode.apply(null, bytes));
            // setImageData(`data:${mime};base64,${base64String}`)
            return data;
        } else if (mime && mime.includes('javascript')) {
            return data;
        } else {
            setLanguage('plaintext');
            return data.toString();
        }
    };


    //数据处理
    // const processData =(data)=>{
    //
    //     //空值
    //     if(!data) return "";
    //     if (data instanceof Object ) {
    //         setLanguage("json")
    //         return JSON.stringify(responseBodyData);
    //     }
    //
    //     let language = getLanguageFromMIME(mediaType)
    //     setLanguage(language)
    //
    //     return  responseBodyData
    // }
    //
    // /**
    //  * 根据mediaType，获取monaco-editor响应的language
    //  */
    // const getLanguageFromMIME = (mime) => {
    //     if(!mime) return 'plaintext'
    //
    //     let mimeObj = {
    //         "html":"html",
    //         "javascript":"javascript",
    //         "json":"json",
    //         "text":"plaintext"
    //     }
    //
    //     //如果包含某个key，就会返回对应的key
    //     const matchingMime = Object.keys(mimeObj).find((key) => mime.includes(key));
    //
    //     //通过key获取相应的language
    //     if (matchingMime) {
    //         return mimeObj[matchingMime];
    //     } else {
    //         return 'plaintext';
    //     }
    // }

    return(
        <div className={"codemirror-box"}>
            <ReactMonacoEditor
                value={precessValue}
                language={language}
                height={"400px"}
                width={"100%"}
                readOnly={true}
            />
            {/*<img src={imageData} alt="Response Image" />*/}
        </div>
    )

}

export default ResponseBodyCommon;