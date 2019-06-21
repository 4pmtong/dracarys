import React from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import Link from 'umi/link';

import { getUidByCookie } from '../logic/getUidByCookie';
import Cookies from 'js-cookie';

import './BasicLayout.scss';

const { Header, Content, Footer } = Layout;

const cookie_user_info = Cookies.get('user_info');
const userInfo = !!cookie_user_info ? JSON.parse(cookie_user_info) : {};

export default class BasicLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logo: 'https://tharain.github.io/react-test-css/hackathonlogo.png',
      user: {
        name: userInfo.name || 'Dracrays',
        uid: getUidByCookie(),
      },
      admin: {
        name: 'Dracarys',
        eid: '007'
      },
      headerMenu: [
        {
          value: 'my events',
          link: '/myEvents'
        },
        {
          value: 'admin event',
          link: '/admin'
        }
      ],
      footerInfo: 'Copyright 2019 Event System | Dracarys@Hackathon Sea 2019'
    };
  }

  createMenu(menuList) {
    return (
      <Menu>
        {
          menuList && menuList.map((item, key) => {
            return (
              <Menu.Item key={key}>
                <Link to={item.link}>{item.value}</Link>
              </Menu.Item>
            );
          })
        }
      </Menu>
    );
  }

  render() {
    return (
      <div className='layout-container'>
        <Header className='layout-header'>
          <Link className='logo' to='/'><img className='image' style={{
            width: 200,
            marginLeft: -60,
            marginTop: -10,
          }} src={this.state.logo} alt="logo"/></Link>
          <Dropdown overlay={this.createMenu(this.state.headerMenu)}>
            <div className='user'>{this.state.user.name}</div>
          </Dropdown>
        </Header>
        <Content className='layout-content'>
          {this.props.children}
        </Content>
        <Footer className='layout-footer'>{this.state.footerInfo}</Footer>
      </div>
    );
  }
};
