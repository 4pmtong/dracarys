import React from 'react';
import './index.scss';

import {
  Form,
  Input,
  Tooltip,
  Icon,
  Col,
  Button,
} from 'antd';

const { TextArea } = Input;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const rowGutter = 0;
    const colSpan = 12;

    return (
      <React.Fragment>
        {/* name */}
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item
            label="name"
            className="formItemOverride"
            label={
              <span>
                Event Name&nbsp;
                <Tooltip title="The title where everyone will see.">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            <Col span={colSpan}>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: 'Please enter a title!',
                },
              ],
            })(<Input placeholder="E.g Shopee Xplores! City Cycling" />)}
            </Col>
          </Form.Item>
          {/* abstract */}
          <Form.Item
            label="abstract"
            className="formItemOverride"
            label={
              <span>
                Abstract&nbsp;
                <Tooltip title="The summary of your event">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            <Col span={colSpan}>
            {getFieldDecorator('abstract', {
              rules: [
                {
                  required: true,
                  message: 'Please enter an abstract!',
                },
              ],
            })(<TextArea placeholder="E.g In the second part of the Shopee Xplores! series, we will embark on a scenic cycling trail from East Coast Park and stop by the wide, open space at Marina Barrage to fly kites!" autosize />)}
            </Col>
          </Form.Item>
          {/* Introduction */}
          <Form.Item
            label="abstract"
            className="formItemOverride"
            label={
              <span>
                Event Introduction&nbsp;
                <Tooltip title="The summary of your event">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            <Col span={colSpan}>
            {getFieldDecorator('introduction', {
              rules: [
                {
                  required: true,
                  message: 'Please enter your event introduction!',
                },
              ],
            })(<TextArea placeholder={`E.g Hi everyone,

Wondering what to do on a Saturday morning? How about getting up to explore a part of this sunny island on two wheels?

In the second part of the Shopee Xplores! series, we will embark on a scenic cycling trail from East Coast Park and stop by the wide, open space at Marina Barrage to fly kites! You will zoom past beaches, jetties, the Singapore Flyer, Marina Barrage and the Flower Dome - making this a wholesome and leisurely ride to get your cardio in all while catching up with old friends and new.

Come along to enjoy the fun!`} autosize />)}
            </Col>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </React.Fragment>
    );
  }
}

const EventsForm = Form.create({ name: 'eventsForm' })(RegistrationForm);

export default EventsForm;
