import React, { Component } from 'react'
import { initStore } from '../store'
import withRedux from 'next-redux-wrapper'
import guestLayout from '../hocs/guestLayout'
import ResetPwForm from '../components/auth/ResetPwForm'

const pageTitle = '重設密碼 | NOWnews 會員系統'

export class ResetPwPage extends Component {
  render () {
    return (<ResetPwForm />)
  }
}

export default withRedux(initStore)(guestLayout(ResetPwPage, pageTitle))
