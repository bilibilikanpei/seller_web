import React, {Component} from 'react';
import {Form, Input, Card, Button, Icon} from 'antd';
import app from './app';
import {login} from './apiValue';
import {hex_md5} from '../js/index'
import logo from '../image/login-logo.png'
import '../css/login.css'
const FormItem = Form.Item;

// 登陆界面
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinning: false,
        };
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {spinning} = this.state;
        return (
            <div className="login-box">
                <div className="logo-box">
                    <img src={logo} alt=""/>
                </div>
                <div className="login-wrap">
                    <Card>
                        <Form>
                            <FormItem>
                                {getFieldDecorator('loginName', {
                                    rules: [{required: true, whitespace: true, message: '请输入账号！'}],
                                })(
                                    <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                           placeholder="请输入账号"></Input>
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [{required: true, whitespace: true, message: '请输入登录密码!'}],
                                })(
                                    <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                           type="password" placeholder="请输入登录密码"></Input>
                                )}
                            </FormItem>
                            <FormItem>
                                <Button loading={this.state.loading} onClick={(event) => {
                                    this.handleSubmit(event)
                                }} type="primary">登录</Button>
                            </FormItem>
                        </Form>
                    </Card>
                </div>
            </div>
        )
    }

    componentDidMount() {

    }

    handleSubmit = (e) => {
        let that = this;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({loading: true});
                values.password = hex_md5(hex_md5(values.password) + 'xbcrm');
                app.post(login.TO_LOGIN, values).then(req => {
                    this.setState({loading: false});
                    if (req.code == 200) {
                        app.alert('登录成功','success',3);
                        let data = req.data;
                        app.setToken(data.venue_id);
                        app.setData('userName',values.loginName);
                        app.setData('accessToken',data.token);
                        app.setData('currentUser',data.id);
                        this.props.history.push('home/orderManage')
                    }
                    else {
                        app.alert(req.msg, 'error', 3);
                    }

                })
            }
        });
    }
}

const LoginForm = Form.create()(Login);
export default LoginForm;