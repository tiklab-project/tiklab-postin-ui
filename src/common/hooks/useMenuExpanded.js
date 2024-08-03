import {useEffect, useState} from "react";

/**
 * 导航展示收缩
 */
export const useMenuExpanded = () => {
    const [isExpanded, setIsExpanded] = useState(() => {
        // 从 localStorage 获取值并转换为布尔值
        const storedValue = localStorage.getItem("menuExpanded");
        return storedValue === "true" || false;
    });

    useEffect(() => {
        // 当 menuExpanded 改变时，更新 localStorage
        localStorage.setItem("menuExpanded", isExpanded);
    }, [isExpanded]);

    return [isExpanded, setIsExpanded];
};
