import React,{ Component } from 'react';
import './homestyle.css';
import { Layout } from 'antd';
const {  Content } = Layout;

// 首页
class Home extends Component {

    render() {
        return(
            <div className={"home-content"}>
                <div className="content-left content-div">home</div>
                <div className="content-right content-div">home</div>
            </div>
        )
    }
}

export default Home;
