import React from 'react';
import { Layout, Menu, Dropdown } from 'antd';

import './BasicLayout.scss';

const { Header, Content, Footer } = Layout;

export default class BasicLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logo: 'Event System',
      user: {
        name: 'Dracarys',
        uid: '9527'
      },
      admin: {
        name: 'Dracarys',
        eid: '007'
      },
      headerMenu: [
        {
          value: 'my event',
          link: '/user/9527'
        },
        {
          value: 'admin event',
          link: '/admin/007'
        }
      ],
      footerInfo: 'Dracarys@sHackathon Sea 2019'
    };
  }

  createMenu(menuList) {
    return (
      <Menu>
        {
          menuList && menuList.map((item, key) => {
            return (
              <Menu.Item key={key}>
                <a href={item.link} target='_blank' rel="noopener noreferrer">
                  {item.value}
                </a>
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
          <h1 className='logo'>{this.state.logo}</h1>
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
