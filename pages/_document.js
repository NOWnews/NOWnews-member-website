import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document'
import { initStore } from '../modules/store'

class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const {html, head, errorHtml, chunks} = renderPage()
    return { html, head, errorHtml, chunks }
  }

  render () {
    return (
      <html>
        <Head>
          <meta charSet='utf-8' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          <script src="https://unpkg.com/axios/dist/axios.min.js" />
          <link rel="stylesheet" type="text/css" href='//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css' />
          <link rel="stylesheet" type="text/css" href="http://diegoddox.github.io/react-redux-toastr/7.0/react-redux-toastr.min.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}


export default MyDocument
