// 详情模板
import React, {Component} from 'react';
import {Form, Modal, Button, Table, Row, Col, Input, Icon, Tag} from 'antd';
import app from '../views/app';
import {order} from '../views/apiValue';
import moment from 'moment'

const FormItem = Form.Item;

class OrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 18},
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <span>
                <Tag onClick={() => {
                    this.setModalVisible(true)
                }} color="blue">详情</Tag>
                <Modal
                    width='800px'
                    title={'订单详情'}
                    visible={this.state.visible}
                    onCancel={() => {
                        this.setModalVisible(false)
                    }}
                    footer={[<Button key={'close'} onClick={() => {
                        this.setModalVisible(false)
                    }} type='primary'>关闭</Button>]}
                >
                   <Row>
                       <Col span={24}>
                           <Form>
                               <Col span={12}>
                                   <FormItem  {...this.formItemLayout} label={'订单号'}>
                                       {getFieldDecorator('order_no')(
                                           <Input type='text' disabled/>
                                       )}
                                   </FormItem>
                                   <FormItem  {...this.formItemLayout} label={'订单类型'}>
                                       {getFieldDecorator('order_type')(
                                           <Input type='text' disabled/>
                                       )}
                                   </FormItem>
                                   <FormItem  {...this.formItemLayout} label={'支付类型'}>
                                       {getFieldDecorator('pay_type')(
                                           <Input type='text' disabled/>
                                       )}
                                   </FormItem>
                                   <FormItem  {...this.formItemLayout} label={'支付金额'}>
                                       {getFieldDecorator('price')(
                                           <Input type='text' disabled/>
                                       )}
                                   </FormItem>
                                   <FormItem  {...this.formItemLayout} label={'三联币折扣'}>
                                       {getFieldDecorator('san_money')(
                                           <Input type='text' disabled/>
                                       )}
                                   </FormItem>
                               </Col>
                                <Col span={12}>
                                    <FormItem  {...this.formItemLayout} label={'退款类型'}>
                                       {getFieldDecorator('refund_type')(
                                           <Input type='text' disabled/>
                                       )}
                                   </FormItem>
                                   <FormItem  {...this.formItemLayout} label={'订单状态'}>
                                       {getFieldDecorator('status')(
                                           <Input type='text' disabled/>
                                       )}
                                   </FormItem>
                                   <FormItem  {...this.formItemLayout} label={'用户昵称'}>
                                       {getFieldDecorator('nickname')(
                                           <Input type='text' disabled/>
                                       )}
                                   </FormItem>
                                   <FormItem  {...this.formItemLayout} label={'创建时间'}>
                                       {getFieldDecorator('create_time')(
                                           <Input type='text' disabled/>
                                       )}
                                   </FormItem>
                               </Col>
                           </Form>
                       </Col>
                   </Row>
                </Modal>
            </span>
        )
    }

    componentDidMount() {

    }

    setModalVisible(visible) {
        let formData = {};
        const parentData = this.props.data;
        if (visible) {
            let order_type = '';  //订单类型
            let pay_type = '';  //支付类型
            let refund_type = '';  //退款类型
            let status = '';  //订单状态
            switch (parentData.order_type) {
                case 0:
                    order_type = '排位赛（主队）';
                    break;
                case 1:
                    order_type = '友谊赛,羽毛球';
                    break;
                case 2:
                    order_type = '充值';
                    break;
                case 3:
                    order_type = '应战(客队)';
                    break;
                case 4:
                    order_type = '报名参加赛事';
                    break;
                case 5:
                    order_type = '普通商品';
                    break;
            }
            switch (parentData.pay_type) {
                case 0:
                    pay_type = '三联币支付';
                    break;
                case 1:
                    pay_type = '支付宝支付';
                    break;
                case 2:
                    pay_type = '微信支付';
                    break;
                case 3:
                    pay_type = '会员卡(客队)';
                    break;
                case 4:
                    pay_type = '微信小程序';
                    break;
                case 5:
                    pay_type = '支付宝小程序';
                    break;
            }
            switch (parentData.refund_type) {
                case 0:
                    refund_type = '可申请退款';
                    break;
                case 1:
                    refund_type = '不可退款';
                    break;
                case 2:
                    refund_type = '已使用';
                    break;
                case 3:
                    refund_type = '可申请退款';
                    break;
                case 4:
                    refund_type = '不可退款';
                    break;
            }
            switch (parentData.status) {
                case 0:
                    status = '未支付';
                    break;
                case 1:
                    status = '已支付';
                    break;
                case 2:
                    status = '退款中';
                    break;
                case 3:
                    status = '已退款';
                    break;
            }

            formData['order_no'] = {value: parentData.order_no};
            formData['order_type'] = {value: order_type};
            formData['pay_type'] = {value: pay_type};
            formData['price'] = {value: parentData.price};
            formData['san_money'] = {value: parentData.san_money};
            formData['refund_type'] = {value: refund_type};
            formData['status'] = {value: status};
            formData['nickname'] = {value: parentData.nickname};
            formData['create_time'] = {value: parentData.create_time ? moment(parentData.create_time).format('YYYY-MM-DD HH:mm') : ''};
            this.props.form.setFields(formData);
        }
        this.setState({visible})
    }
}

const OrderDetailManage = Form.create()(OrderDetail);
export {
    OrderDetailManage,  //订单详情
};