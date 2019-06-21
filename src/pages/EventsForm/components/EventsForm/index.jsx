import React from 'react';
import sanitizeHtml from 'sanitize-html';
import moment from 'moment';
import { pick } from 'lodash';
import './index.scss';
import Store from '../../../../../API/httpCall';


import {
  Form,
  Input,
  Tooltip,
  Icon,
  Row,
  Col,
  Button,
  DatePicker,
  Modal,
  InputNumber,
  notification,
} from 'antd';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const submitValues = ['name', 'abstract', 'intro', 'event_start_time', 'event_end_time', 'apply_start_time', 'apply_end_time', 'quota', 'lucky_quota', 'venue', 'contact', 'contact_email', 'image_url']

const openNotificationWithIcon = (type, message, description) => {
  notification[type]({
    message: message,
    description: description,
  });
};

function getQueryVariable(variable)
{
       let query = window.location.search.substring(1);
       let vars = query.split("&");
       for (let i=0;i<vars.length;i++) {
               let pair = vars[i].split("=");
               if(pair[0] === variable){return pair[1];}
       }
       return(false);
}

class RegistrationForm extends React.Component {
  state = {
    isPreview: false,
    eid: -1,
  };

  componentDidMount() {
    const eid = getQueryVariable('eid');
    if(eid) {
      Store.getEventDetail(eid).then((data) => {
        if(!data.message) {
          this.props.form.setFieldsValue({
            ...pick(data.data, submitValues),
            eventTime: [moment(data.data.event_start_time), moment(data.data.event_end_time)],
            applyTime: [moment(data.data.apply_start_time), moment(data.data.apply_end_time)]
          });
          this.setState({
            eid: eid,
          });
        } else {
          openNotificationWithIcon('error', `Failed to fetch event ${eid}`, data.message);
        }
      }).catch(err => {
        openNotificationWithIcon('error', `Failed to fetch event ${eid}`, err);
      })
    }
  }

  componentWillUnmount() {

  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        Store.createEvent({
          ...pick(values, submitValues),
          ...!values.quota && { quota: 0 },
          ...!values.lucky_quota && { lucky_quota: 0 },
          ...!values.image_url && { image_url: '' },
          event_start_time: moment(values.eventTime[0]).unix(),
          event_end_time: moment(values.eventTime[0]).unix(),
          apply_start_time: moment(values.applyTime[0]).unix(),
          apply_end_time:moment(values.applyTime[0]).unix(),
        }).then((data) => {
          // TODO: Jump to edit page
        }).catch(err => {
          openNotificationWithIcon('error', `Failed to create event ${values.name}`, err);
        });
      }
    });
  };

  onBack = e => {
    // TODO: goback
    window.location.href = '/';
  }



  render() {
    const { getFieldDecorator } = this.props.form;

    const rangeConfig = (message) => {
      return {
        rules: [{ type: 'array', required: true, message: message }],
      }
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
    const colSpan = 12;
    return (
      <React.Fragment>
        <div className="eventsTitle">
          <div
            className="backButton"
            onClick={this.onBack}
            onKeyPress={this.onBack}
            role="button"
            tabIndex={0}
          ><Icon type="left" /></div>
          Back to Event Status
        </div>
        <div style={{ height: 60 }} />
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
                  message: 'You have to give your event a name!',
                },
              ],
            })(<Input placeholder="Give your event a cool name!" />)}
            </Col>
          </Form.Item>
          {/* Event time */}
          <Form.Item
            label="Event Time"
          >
            {getFieldDecorator('eventTime', rangeConfig('Your event need to have a date-time'))(
              <RangePicker className="dateTimePicker" showTime format="DD-MM-YYYY HH:mm:ss" placeholder={['Start Time', 'End Time']} />,
            )}
          </Form.Item>
          {/* Event Location */}
          <Form.Item
            label="Location"
          >
            <Col span={colSpan}>
            {getFieldDecorator('venue', {
              rules: [
                {
                  required: true,
                  message: 'Everyone needs to know where is your event!',
                },
              ],
            })(<Input placeholder="Specify your event address here" />)}
            </Col>
          </Form.Item>
          {/* event capacity */}
          <Form.Item
            label={
              <span>
                Event Capacity&nbsp;
                <Tooltip title="Number of participants allowed excluding Lucky Quota">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            <Col span={colSpan}>
            {getFieldDecorator('num_of_register', {
              rules: [
                {
                  type: 'number',
                  min: 0,
                  message: 'Only numbers greater than 0 accepted!',
                },
              ],
            })(<InputNumber placeholder="0" />)}
            </Col>
          </Form.Item>
          {/* lucky quota */}
          <Form.Item
            label={
              <span>
                Lucky Quota&nbsp;
                <Tooltip title="The number of slots for everyone in queue will have a chance to be picked to join the event.">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            <Col span={colSpan}>
            {getFieldDecorator('lucky_quota', {
              rules: [
                {
                  type: 'number',
                  min: 0,
                  message: 'Only numbers greater than 0 accepted!',
                },
              ],
            })(<InputNumber placeholder="0" />)}
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
            })(<TextArea placeholder="Enter an eye-catching abstract to entice participation!" autosize />)}
            </Col>
          </Form.Item>
          {/* Introduction */}
          <Form.Item
            label={
              <span>
                Event Introduction&nbsp;
                <Tooltip title="Enter HTML display for your event.">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            <Row gutter={8}>
            <Col span={colSpan}>
            {getFieldDecorator('intro', {
              rules: [
                {
                  required: true,
                  message: 'Please enter your event introduction!',
                },
              ],
            })(<TextArea placeholder={`Tell more details about your event
Example: <b>bold</b> event information`} autosize />)}
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
          {/* Organizer */}
          <Form.Item
            label="Organizer"
          >
            <Col span={colSpan}>
            {getFieldDecorator('contact', {
              rules: [
                {
                  required: true,
                  message: 'You have to give a PIC name!',
                },
              ],
            })(<Input placeholder="Who's organizing this event?" />)}
            </Col>
          </Form.Item>
          {/* Organizer Content */}
          <Form.Item
            label="Organizer Contact"
          >
            <Col span={colSpan}>
            {getFieldDecorator('contact_email', {
              rules: [
                {
                  required: true,
                  message: 'You have to give a PIC email!',
                },
              ],
            })(<Input placeholder="How to contact you?" />)}
            </Col>
          </Form.Item>
          {/* Event URL */}
          <Form.Item
            label="Event Image URL"
          >
            <Col span={colSpan}>
            {getFieldDecorator('image_url')(<Input placeholder="Add an attractive image to attract participants" />)}
            </Col>
          </Form.Item>
          {/* Event time */}
          <Form.Item
            label="Application Time"
          >
            {getFieldDecorator('applyTime', rangeConfig('Your event need to have a time for people to register!'))(
              <RangePicker className="dateTimePicker" showTime format="DD-MM-YYYY HH:mm:ss" placeholder={['Start Time', 'End Time']} />,
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <div className="buttonsBottom">
              {
                this.state.eid > 0 ? (
                  [(
                    <Button
                      key="save"
                      onClick={(e) => {
                        e.preventDefault();
                        this.props.form.validateFieldsAndScroll((err, values) => {
                          if (!err) {
                            Store.updateEvent(this.state.eid, {
                              ...pick(values, submitValues),
                              ...!values.quota && { quota: 0 },
                              ...!values.lucky_quota && { lucky_quota: 0 },
                              ...!values.image_url && { image_url: '' },
                              event_start_time: moment(values.eventTime[0]).unix(),
                              event_end_time: moment(values.eventTime[0]).unix(),
                              apply_start_time: moment(values.applyTime[0]).unix(),
                              apply_end_time:moment(values.applyTime[0]).unix(),
                            }).then((data) => {
                              openNotificationWithIcon('success', `Event ${values.name} updated.`, '');
                            }).catch(err => {
                              openNotificationWithIcon('error', `Failed to update event ${values.name}`, err);
                            });
                          }
                        });
                      }}
                    >
                      Save
                    </Button>),(
                    <Button
                      key="delete"
                      onClick={(e) => {
                        e.preventDefault();
                        Store.deleteEvent(this.state.eid).then((data) => {
                          openNotificationWithIcon('success', `Event deleted.`, '');
                          // TODO: Jump to edit page
                        }).catch(err => {
                          openNotificationWithIcon('error', `Failed to delete event`, err);
                        });
                      }}
                    >
                      Delete
                    </Button>
                  )]
                ) : (
                  <Button type="primary" htmlType="submit">
                    Launch your event
                  </Button>
                )
              }
            </div>
          </Form.Item>
        </Form>
        {/* IGNORE */}
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
            const shaf = sanitizeHtml(this.props.form.getFieldValue('intro') || 'Nothing to Preview', {
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
                a: ['href', 'target'],
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
