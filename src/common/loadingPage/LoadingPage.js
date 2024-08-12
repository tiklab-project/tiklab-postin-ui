import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';

const LoadingPage = ({ children }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleLoad = () => {
            setLoading(false);
        };

        if (document.readyState === 'complete') {
            setLoading(false);
        } else {
            window.addEventListener('load', handleLoad);
        }

        return () => {
            window.removeEventListener('load', handleLoad);
        };
    }, []);

    if (loading) {
        return (
            <Spin size="large" />
        );
    }

    return <>{children}</>;
};

export default LoadingPage;