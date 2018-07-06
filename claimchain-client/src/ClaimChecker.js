import React, {Component} from 'react';
import {Form, Input, Button, Row, Col} from 'antd';

import 'antd/dist/antd.css';

const FormItem = Form.Item;

class ClaimCheckerBase extends Component {

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
                                <Input placeholder="text to claim" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={1}/>
                </Row>
            </Form>
        )
    }
}

export const ClaimChecker = Form.create()(ClaimCheckerBase);
