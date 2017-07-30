import React from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'
import Head from 'next/head'
import { Sidebar, Segment, Icon, Container, Header, Image, Menu, Button } from 'semantic-ui-react';

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
      return (
        <div>
          <style>{`
              #root {
                height: 100vh;
              }
              #root > .grid {
                border-radius: 0;
              }
              .padding0 {
                padding: 0 !important;
              }
          `}</style>
          <Sidebar.Pushable>
            <Sidebar
              as={Menu}
              animation='overlay'
              width='thin'
              direction='right'
              visible={visible}
              icon='labeled'
              vertical
              inverted>
              <Menu.Item name='user' active={activeItem === 'me'}>
                <a href='/member/me'>
                  <Icon name='user' />會員資料
                </a>
              </Menu.Item>
              <Menu.Item>
                <a href='/auth/logout'>
                  <Icon name='log out' />登出
                </a>
              </Menu.Item>
              <Menu.Item position='right'>
                <label onClick={this.toggleVisibility}>
                  <Icon name='angle double right' />返回
                </label>
              </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher>
              <div id='root'>
                <Menu inverted className='grid'>
                  <div className='padding0 row computer only'>
                    <Menu.Item>
                      NOWnews 會員系統
                    </Menu.Item>
                    <Menu.Item  active={activeItem === 'me'}>
                      <a href='/member/me'>會員資料</a>
                    </Menu.Item>
                    <Menu.Item position='right'>
                      <a href='/auth/logout'>登出</a>
                    </Menu.Item>
                  </div>
                  <div className='padding0 row mobile only'>
                    <Menu.Item>
                      NOWnews 會員系統
                    </Menu.Item>
                    <Menu.Item position='right'>
                      <label onClick={this.toggleVisibility}>
                        <Icon name='content' />
                      </label>
                    </Menu.Item>
                  </div>
                </Menu>
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
