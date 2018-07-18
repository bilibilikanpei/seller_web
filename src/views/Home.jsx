import React, {Component} from 'react';
import {Layout, Dropdown, Menu, Icon} from 'antd';
import app from './app';
import { Route, Switch} from 'react-router-dom';
import '../css/home.css'
import logo from '../image/logo.png';

import OrderManage from './OrderManage'
const {Header, Sider, Content} = Layout;
// const FormItem = Form.Item;
// const SubMenu = Menu.SubMenu;

// 登陆界面
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
    }

    render() {
        const userName = app.getData('userName');
        const dropdown = (
            <Menu onClick={this.handleClickExit}>
                <Menu.Item key="exit">
                    <span>退出登录</span>
                </Menu.Item>
            </Menu>
        );
        return (
            <Layout style={{minHeight: '100vh'}}>
                {/*侧边菜单*/}
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo">
                        <img src={logo} alt=""/>
                        <span
                            style={{
                                display: this.state.collapsed ? 'none' : 'inline-block',
                                color: 'white'
                            }}>球联后台管理</span>
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                            <Icon type="bank" />
                            <span>订单管理</span>
                        </Menu.Item>
                        {/*<SubMenu*/}
                            {/*key="sub1"*/}
                            {/*title={<span><Icon type="user"/><span>User</span></span>}*/}
                        {/*>*/}
                            {/*<Menu.Item key="3">Tom</Menu.Item>*/}
                            {/*<Menu.Item key="4">Bill</Menu.Item>*/}
                            {/*<Menu.Item key="5">Alex</Menu.Item>*/}
                        {/*</SubMenu>*/}
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background: '#fff', padding: 0}}>
                        <span style={{position: 'absolute', right: '20px'}}>
                             <Dropdown overlay={dropdown}>
                                  <span className="welcome exit">
      欢迎用户，{userName} <Icon type="down"/>
    </span>
  </Dropdown>
                        </span>
                    </Header>
                    <Content style={{margin: '16px',padding: 20,
                        background: '#fff', minHeight: 360,height:'100%'}}>
                        <Switch>
                            <Route path={"/home/orderManage"} component={OrderManage}/>
                            {/*<Route path={path + "/home/orderDetail/:orderId"}*/}
                                   {/*component={OrderDetail}/> */}
                        </Switch>

                    </Content>

                </Layout>
            </Layout>
        )
    }

    componentDidMount() {

    };

    handleClickExit=({item, key, keyPath})=> {
        const _this=this;
        if (key === 'exit') {
            app.clear();
            _this.props.history.push('/login')
        }
    }

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({collapsed});
    }
}

export default Home;