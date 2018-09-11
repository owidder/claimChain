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

const renderClaimCardRows = (claimList) => {
    return claimList.map((claim, i) =>
        <Row key={i}>
            <Col span={1}/>
            <Col span={22}>
                <ClaimCard {...claim}/>
            </Col>
            <Col span={1}/>
        </Row>
    )
}

class ClaimCheckerBase extends Component {

    constructor(props) {
        super(props);

        this.state = {claimList: []};
    }

    check(e){
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if(!err) {
                try {
                    const hash = await hashSHA512FromUtf8(values.textToClaim);
                    const claimList = await claims.check2(hash);
                    if (claimList && claimList.length > 0) {
                        this.setState({claimList});
                    }
                    else {
                        this.setState({claimList: [{...EMPTY, hash}]});
                    }
                } catch (e) {
                    console.log(e);
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
                {renderClaimCardRows(this.state.claimList)}
            </Form>
        )
    }
}

export const ClaimChecker = Form.create()(ClaimCheckerBase);
