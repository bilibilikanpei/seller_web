// 订单管理
import React, {Component} from 'react';
import {Form, Button, Table, Row, Col} from 'antd';
import app from './app';
import {order} from './apiValue';
import moment from 'moment'
import {OrderDetailManage} from '../components/DetailManage';

const perPageSize = 100;

class OrderManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            pagination: {
                showQuickJumper: true,
                showSizeChanger: true,
                current: 0,
                pageSizeOptions: app.pageSizeOptions
            },
            data: []
        };
    }

    columns = [
        {title: '订单号', dataIndex: 'order_no', key: 'order_no'},
        {
            title: '订单类型', dataIndex: 'order_type',
            render: (orderType) => {
                let text = '';
                switch (orderType) {
                    case 0:
                        text = '排位赛（主队）';
                        break;
                    case 1:
                        text = '友谊赛,羽毛球';
                        break;
                    case 2:
                        text = '充值';
                        break;
                    case 3:
                        text = '应战(客队)';
                        break;
                    case 4:
                        text = '报名参加赛事';
                        break;
                    case 5:
                        text = '普通商品';
                        break;
                }
                return (
                    <span>{text}</span>
                )
            }
        },
        {
            title: '支付类型', dataIndex: 'pay_type',
            render: (payType) => {
                let text = '';
                switch (payType) {
                    case 0:
                        text = '三联币支付';
                        break;
                    case 1:
                        text = '支付宝支付';
                        break;
                    case 2:
                        text = '微信支付';
                        break;
                    case 3:
                        text = '会员卡';
                        break;
                    case 4:
                        text = '微信小程序';
                        break;
                    case 5:
                        text = '支付宝小程序';
                        break;
                }
                return (
                    <span>{text}</span>
                )
            }
        },
        {title: '支付金额', dataIndex: 'price', key: 'price'},
        {title: '三联币折扣', dataIndex: 'san_money', key: 'san_money'},
        {
            title: '退款类型', dataIndex: 'refund_type',
            render: (refundType) => {
                let text = '';
                switch (refundType) {
                    case 0:
                        text = '可申请退款';
                        break;
                    case 1:
                        text = '不可退款';
                        break;
                    case 2:
                        text = '已使用';
                        break;
                    case 3:
                        text = '可申请退款';
                        break;
                    case 4:
                        text = '不可退款';
                        break;
                }
                return (
                    <span>{text}</span>
                )
            }
        },
        {
            title: '订单状态', dataIndex: 'status',
            render: (status) => {
                let text = '';
                switch (status) {
                    case 0:
                        text = '未支付';
                        break;
                    case 1:
                        text = '已支付';
                        break;
                    case 2:
                        text = '退款中';
                        break;
                    case 3:
                        text = '已退款';
                        break;
                }
                return (
                    <span>{text}</span>
                )
            }
        },
        {title: '用户昵称', dataIndex: 'nickname', key: 'nickname'},
        {
            title: '创建时间', dataIndex: 'create_time', render: (create_time) =>
                <span>{moment(create_time).format('YYYY-MM-DD HH:mm')}</span>
        },
        {
            title: '操作',

            key: 'x', render: (data) =>
                <OrderDetailManage
                    data={data}/>
        },
    ];

    render() {
        const {getFieldDecorator} = this.props.form;
        const {loading} = this.state;
        return (
            <span>
            <Row>
                <Col span={24}>
                        <Table
                            columns={this.columns}
                            dataSource={this.state.data}
                            rowKey={record => record.order_no}
                            pagination={this.state.pagination}
                            loading={this.state.loading}
                            onChange={this.handleTableChange}
                        />
                </Col>
            </Row>
           </span>
        )
    }

    componentDidMount() {
        this.initTable()
    }

    initTable() {
        let param = {
            offset: 0,
            perPageSize: perPageSize,
        };
        this.setState({loading: true});
        app.post(order.SEARCH_ORDER, param).then((req) => {
            this.setState({loading: false});
            if (req.code == 200) {
                this.setState({
                    data: req.data
                })
            }
        })
    }

    handleTableChange = (pagination) => {
        this.setState({pagination})
    }

}

const OrderManageForm = Form.create()(OrderManage);
export default OrderManageForm;