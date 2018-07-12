import React, {Component} from 'react';
import {Form, Input, Button, Row, Col} from 'antd';

import {hashSHA512FromUtf8} from './hash';
import * as claims from './claims';
import {ClaimCard} from './ClaimCard';

import 'antd/dist/antd.css';

const FormItem = Form.Item;
const {TextArea} = Input;

const EMPTY = {
    hash: undefined,
    account: undefined,
    blockNo: undefined,
    blockTime: undefined,
}

class ClaimCheckerBase extends Component {

    constructor(props) {
        super(props);

        this.state = EMPTY
    }

    check(e){
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if(!err) {
                const hash = await hashSHA512FromUtf8(values.textToClaim);
                const claim = await claims.check(hash);
                if(claim.account) {
                    this.setState({...claim});
                }
                else {
                    this.setState({...EMPTY, hash});
                }
            }
            else {
                console.error(err);
            }
        })
    }

    componentDidMount() {
        claims.init();
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
                <Row>
                    <Col span={1}/>
                    <Col span={22}>
                        <ClaimCard {...this.state}/>
                    </Col>
                    <Col span={1}/>
                </Row>
            </Form>
        )
    }
}

export const ClaimChecker = Form.create()(ClaimCheckerBase);
