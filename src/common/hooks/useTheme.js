import {useEffect, useState} from "react";

/**
 * 主题切换
 */
export const useTheme = () => {
    const [themeColor, setThemeColor] = useState(() => {
        // 从 localStorage 获取主题，如果没有则使用默认主题
        return localStorage.getItem("theme") || "theme-default";
    });

    useEffect(() => {
        // 当 themeColor 改变时，更新 localStorage
        localStorage.setItem("theme", themeColor);
    }, [themeColor]);

    return [themeColor, setThemeColor];
};
