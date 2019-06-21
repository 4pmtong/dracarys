import React from 'react';
import sanitizeHtml from 'sanitize-html';
import './index.scss';

import {
  Form,
  Input,
  Tooltip,
  Icon,
  Row,
  Col,
  Button,
  DatePicker,
  TimePicker,
  Modal
} from 'antd';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

class RegistrationForm extends React.Component {
  state = {
    isPreview: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const config = {
      rules: [{ type: 'object', required: true, message: 'Please select time!' }],
    };

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
            label="Event Name"
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
            label="Abstract"
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
            label={
              <span>
                Event Introduction&nbsp;
                <Tooltip title="Display of information in HTML">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            <Row gutter={8}>
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
            <Col span={colSpan}>
              <Button
                onClick={() => {
                  this.setState({
                    isPreview: true,
                  });
                }}
              >
                Preview
              </Button>
            </Col>
            </Row>
          </Form.Item>
          {/* Event start time */}
          <Form.Item
            label="Event Start Time"
          >
            {getFieldDecorator('date-time-picker', config)(
              <DatePicker className="dateTimePicker" showTime format="YYYY-MM-DD HH:mm:ss" />,
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <Modal
          title={`${this.props.form.getFieldValue('name') || 'Event'}'s Introduction Preview`}
          centered
          visible={this.state.isPreview}
          onCancel={() => this.setState({isPreview: false})}
          footer={[
             <Button key="submit" type="primary" onClick={() => this.setState({isPreview: false})}>
               Return
             </Button>,
           ]}
        >
          {(() => {
            const shaf = sanitizeHtml(this.props.form.getFieldValue('introduction'), {
              allowedTags: [
                'h3',
                'h4',
                'h5',
                'h6',
                'blockquote',
                'p',
                'a',
                'ul',
                'ol',
                'nl',
                'li',
                'b',
                'i',
                'strong',
                'span',
                'em',
                'strike',
                'code',
                'hr',
                'br',
                'div',
                'table',
                'thead',
                'caption',
                'tbody',
                'tr',
                'th',
                'td',
                'pre',
                'font',
                'font face',
                'col',
                'colgroup',

              ],
              allowedAttributes: {
                font: ['color'],
                div: ['style'],
                img: ['src'],
                a: ['href'],
                span: ['style'],
                table: ['style'],
                col: ['width', 'height'],
                td: ['style'],
              },
            });
            return <div dangerouslySetInnerHTML={{ __html: shaf }} />;
          })()}
        </Modal>
      </React.Fragment>
    );
  }
}

const EventsForm = Form.create({ name: 'eventsForm' })(RegistrationForm);

export default EventsForm;
