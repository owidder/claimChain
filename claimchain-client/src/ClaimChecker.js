import React, {Component} from 'react';
import {Form, Input, Button, Row, Col} from 'antd';

import {hashSHA512FromUtf8} from './hash';

import 'antd/dist/antd.css';

const FormItem = Form.Item;
const {TextArea} = Input;

class ClaimCheckerBase extends Component {

    check(e){
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if(!err) {
                const hashValue = await hashSHA512FromUtf8(values.textToClaim);
                console.log(hashValue);
            }
            else {
                console.error(err);
            }
        })
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        return (
            <Form>
                <Row>
                    <Col span={1}/>
                    <Col span={22}>
                        <FormItem label="text to claim">
                            {getFieldDecorator('textToClaim', {
                                rules: [{
                                    required: true,
                                    message: 'Input text to claim',
                                }],
                            })(
                                <TextArea placeholder="text to claim" autosize/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={1}/>
                </Row>
                <Row>
                    <Col span={1}/>
                    <Col span={22}>
                        <Button type="primary" onClick={(e) => this.check(e)}>Check</Button>
                    </Col>
                    <Col span={1}/>
                </Row>
            </Form>
        )
    }
}

export const ClaimChecker = Form.create()(ClaimCheckerBase);
