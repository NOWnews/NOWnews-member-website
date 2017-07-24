import React, { Component } from 'react'
import { initStore } from '../../store'
import withRedux from 'next-redux-wrapper'
import guestLayout from '../../hocs/guestLayout'
import ForgotPwForm from '../../components/auth/ForgotPwForm'

const pageTitle = '重設密碼 | NOWnews 會員系統'

export class ForgotPwPage extends Component {
  render () {
    return (<ForgotPwForm />)
  }
}

export default withRedux(initStore)(guestLayout(ForgotPwPage, pageTitle))
