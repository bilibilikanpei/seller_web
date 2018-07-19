// 会员卡管理
import React, {Component} from 'react';
import {Form, Button, Table, Row, Col} from 'antd';
import app from './app';
import {order,vip} from './apiValue';
import moment from 'moment'
import {OrderDetailManage} from '../components/DetailManage';
const FormItem = Form.Item;
const perPageSize = 100;

class Vip extends React.PureComponent {
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
        }
    }

    render() {
        return (
            <Row>
                <Col span={24}>
                    <Table
                        columns={this.getColumns()}
                        dataSource={this.state.data}
                        rowKey={record => record.order_no}
                        pagination={this.state.pagination}
                        loading={this.state.loading}
                        onChange={this.handleTableChange}
                    />
                </Col>
            </Row>
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
        app.post(vip.SEARCH_VIPUSERINFOS, param).then((req) => {
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

    getColumns = () => {
        return (
            [{
                title: '用户姓名',
                dataIndex: 'nickname',
                key: 'nickname',
            }, {
                title: '手机号',
                dataIndex: 'phone',
                key: 'phone',
            }, {
                title: 'vip卡号',
                dataIndex: 'vip_card_id',
                key: 'vip_card_id',
            }, {
                title: '可用金额',
                dataIndex: 'vip_venue_money',
                key: 'vip_venue_money',
            }, {
                title: '所享折扣',
                dataIndex: 'vip_grade',
                key: 'vip_grade',
            }, {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
            <a onClick={e => this.showModal(record, "编辑")} href="javascript:;">编辑</a>

            <a onClick={e => this.showModal(record, "详情")} href="javascript:;">详情</a>
          </span>
                ),
            }]
        )
    }
}

const VipManage = Form.create()(Vip);
export default VipManage;