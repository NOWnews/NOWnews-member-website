import React from 'react'
import ReduxToastr from 'react-redux-toastr'
import Router from 'next/router'
import { connect } from 'react-redux'
import Head from 'next/head'
import { Container, Header, Image } from 'semantic-ui-react';

const guestLayoutHoc = (Page, title = '') => {
  class guestLayout extends React.Component {
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
          <Head>
            <title>{title}</title>
          </Head>
          <Container>
            <Header as='h1' textAlign='center'>
              <style>{`
                  .logo-header {
                    color: #565656;
                    padding-top: 20px;
                  }
              `}</style>
              <Header.Content className='logo-header'>
                NOWnews 會員系統
              </Header.Content>
              <Image.Group size='tiny'>
                <Image src='/static/images/logo/NOWnews.jpg' />
                <Image src='/static/images/logo/watchNOW.png' />
                <Image src='/static/images/logo/NOWlink.jpg' />
              </Image.Group>
            </Header>
            <Page {...this.props} />
            <ReduxToastr
              timeOut={3000}
              newestOnTop={false}
              preventDuplicates
              position="top-center"
              transitionIn="fadeIn"
              transitionOut="fadeOut"
              progressBar/>
          </Container>
        </div>
      )
    }
  }

  return connect()(guestLayout)
}

export default guestLayoutHoc
