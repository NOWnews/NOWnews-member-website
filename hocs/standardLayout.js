import React from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'
import Head from 'next/head'
import { Sidebar, Icon, Container, Menu } from 'semantic-ui-react';

const standardLayoutHoc = (Page, activeItem, title) => {
  class standardLayout extends React.Component {
    static async getInitialProps (ctx) {
      // send props to the parent > child container
      const pageProps =
        (await Page.getInitialProps) && (await Page.getInitialProps(ctx))

      return {
        ...pageProps,
        currentUrl: ctx.pathname
      }
    }
  state = { visible: false }
  toggleVisibility = () => this.setState({ visible: !this.state.visible })

    render () {
      const { visible } = this.state
      const menus = [
        {href: '/member', icon: 'user', name: '會員資料', isActive: 'me' === activeItem},
        {href: '/member/updatepw', icon: 'privacy', name: '修改密碼', isActive: 'updatepw' === activeItem},
      ];
      return (
        <div>
          <Head>
            <title>{title}</title>
          </Head>
          <style>{`
              #root {
                height: 100vh;
                margin-top: 20px;
              }
              #mainMenu {
                margin: 0 !important;
                border-radius: 0;
              }
          `}</style>
          <Menu inverted id='mainMenu'>
            <Menu.Item onClick={this.toggleVisibility}>
              <Icon name='content' />
            </Menu.Item>
            <Menu.Item>
              <a href='/'>NOWnews 會員系統</a>
            </Menu.Item>
          </Menu>
          <Sidebar.Pushable>
            <Sidebar
              as={Menu}
              animation='overlay'
              width='thin'
              visible={visible}
              icon='labeled'
              vertical
              inverted>
              {menus.map(({ href, icon, key, name, isActive }) =>
                <Menu.Item key={icon} active={isActive}>
                  {isActive && <span><Icon name={icon} />{name}</span>}
                  {!isActive && <a href={href}>
                    <Icon name={icon} />{name}
                  </a>}
                </Menu.Item>)}
              <Menu.Item>
                <a href='/api/auth/logout'>
                  <Icon name='log out' />登出
                </a>
              </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher>
              <div id='root'>
                <Container className='standard-layout'>
                  <Page {...this.props} />
                </Container>
              </div>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>
      )
    }
  }

  return connect()(standardLayout)
}

export default standardLayoutHoc
