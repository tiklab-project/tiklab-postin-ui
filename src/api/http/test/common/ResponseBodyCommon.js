import React, {useEffect, useState} from "react";
import "./testResponseStyle.scss"
import ReactMonacoEditor from"../../../../common/monacoEditor/MonacoEditor";

const ResponseBodyCommon = (props) => {
    const {responseBodyData,mediaType} = props;

    const [language, setLanguage] = useState('plaintext');
    const [precessValue, setPrecessValue] = useState("");

    useEffect(()=>{
        let data = processData(responseBodyData, mediaType);
        setPrecessValue(data);
    },[responseBodyData])

    const processData = (data, mime) => {
        if (!data) return '';

        if (mime && mime.includes('json')) {
            setLanguage('json');
            try {
                return JSON.stringify(typeof data === 'string' ? JSON.parse(data) : data, null, 2);
            } catch (e) {
                return data;
            }
        } else if (mime && mime.includes('html')) {
            setLanguage('html');
            return data;
        } else if (mime && mime.includes('image')) {
            setLanguage('image');
            return data
        } else if (mime && mime.includes('javascript')) {
            setLanguage('javascript');
            return data;
        } else {
            setLanguage('plaintext');
            return typeof data === 'object' ? JSON.stringify(data, null, 2) : String(data);
        }
    };

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