import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {LocaleProvider} from 'antd';
import {Layout} from 'antd';
import Home from './Home'
import Login from './Login'
import app from './app';
import '../css/index.css'
import 'antd/dist/antd.css';

class MyRouter extends Component {
    render() {
        const isAuth = app.getToken();
        return (
            <LocaleProvider locale={zhCN}>
                <Router>
                    <Layout style={{height: '100%',width:'100%'}}>
                        <Switch>
                            <Route path={"/login"} component={Login}/>
                           <Route path={"/home"} render={(props) => {
                               const component = isAuth ? (<Home {...props} />) : (<Login />);
                               return component;
                            }}/>
                            <Route component={Login}/>
                        </Switch>
                    </Layout>
                </Router>
            </LocaleProvider>
        )
    }
}

let RouteWithSubRoutes = (route) => (
    <Route path={route.path} render={props => (
        // 把自路由向下传递来达到嵌套。
        <route.component {...props} routes={route.routes}/>
    )}/>
);
export {MyRouter, RouteWithSubRoutes};

