import React from 'react';
import axios from 'axios';
import { Table } from 'antd';

import dayjs from 'dayjs';

import getQueryVariable from '../../../../logic/urllogic';
import './index.scss';

const columns = [
  {
    title: 'name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Join Time',
    dataIndex: 'joinTime',
    key: 'joinTime',
  },
  {
    title: 'Pax',
    key: 'pax',
    dataIndex: 'pax'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
];

export default class EventUserList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userList: [],
      staticUserList: []
    };
  }

  componentDidMount() {
    this.getUserListByEvent();
  }

  setStaticUserList(userList) {
    const staticUserList = [];

    userList.map(item => {
      staticUserList.push({
        name: `${item.firstname} ${item.lastname}`,
        email: item.email,
        joinTime: `${dayjs(item.join_time).format('ddd, MMM DD hh:mm:s')}`,
        pax: item.pax,
        status: `${item.status === 1 ? 'Joined' : 'Queue'}`
      });

      return item;
    });
    return staticUserList;
  }

  getUserListByEvent() {
    const eid = getQueryVariable('eid');
    !!eid && axios.get(`/api/event/${eid}/users`)
      .then((response) => {
        // handle success
        console.log(response);
        if (response && response.data && response.data.code === 200) {
          this.setState({
            userList: response.data.data,
            staticUserList: this.setStaticUserList(response.data.data),
          })
        }
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .finally(() => {
        // always executed
      });
  }

  render() {
    return(
      <div className='event-user-list-box'>
        <h3 className='title'>User Joined</h3>

        <div>
          <Table columns={columns} dataSource={this.state.staticUserList} />
        </div>
      </div>
    );
  }
}
