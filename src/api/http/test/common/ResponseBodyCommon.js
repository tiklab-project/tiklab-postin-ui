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
            return data;
        } else if (mime && mime.includes('image')) {
            return data;
        } else if (mime && mime.includes('javascript')) {
            return data;
        } else {
            setLanguage('plaintext');
            return data.toString();
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