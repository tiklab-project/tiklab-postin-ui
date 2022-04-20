import React,{ Component } from 'react';
import './homestyle.css';
import { Layout } from 'antd';
const {  Content } = Layout;

// 首页
class Home extends Component {
    render() {
        return(
            <Layout >
                <Content className="home-content">
                    <div className="content-left content-div"></div>
                    <div className="content-right content-div"></div>
                </Content>
            </Layout>
        )
    }
}

export default Home;
