import React from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'
import Head from 'next/head'
import { Container, Header, Image, Menu } from 'semantic-ui-react';

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

    render () {
      return (
        <div>
          <Menu stackable inverted>
            <Menu.Item>
              NOWnews 會員系統
            </Menu.Item>
            <Menu.Item active={activeItem === 'me'}>
              <a href='/member/me'>會員資料</a>
            </Menu.Item>
            <Menu.Item position='right'>
              <a href='/auth/logout'>登出</a>
            </Menu.Item>
          </Menu>
          <Container className='standard-layout'>
            <Page {...this.props} />
          </Container>
        </div>
      )
    }
  }

  return connect()(standardLayout)
}

export default standardLayoutHoc
