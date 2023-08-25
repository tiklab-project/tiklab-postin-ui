import React, { useState } from 'react';
import { Button, Input, Select, Alert } from 'antd';
import axios from 'axios';

function Demo() {
    const [method, setMethod] = useState('GET');
    const [url, setUrl] = useState('');
    const [params, setParams] = useState({});
    const [response, setResponse] = useState();

    const handleSubmit = () => {
        axios[method.toLowerCase()](url, params)
            .then(res => setResponse(res.data))
            .catch(err => setResponse(err.message));
    }
    const options = [
        { label: 'GET', value: 'GET' },
        { label: 'POST', value: 'POST' },
        { label: 'PUT', value: 'PUT' },
        { label: 'DELETE', value: 'DELETE' }
    ]
    return (
        <div>
            <Select
                value={method}
                onChange={(value) => setMethod(value)}
                options={options}
            />
            <Input
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="Enter URL"
            />

            <Input.TextArea
                value={JSON.stringify(params)}
                onChange={e => setParams(JSON.parse(e.target.value))}
                rows={4}
            />

            <Button onClick={handleSubmit} type="primary">Submit</Button>

            <Alert
                message={<pre>{JSON.stringify(response, null, 2)}</pre>}
                type="info"
            />
        </div>
    )
}

export default Demo;