import React, { Component } from 'react'
import { initStore } from '../../store'
import withRedux from 'next-redux-wrapper'
import guestLayout from '../../hocs/guestLayout'
import SignupForm from '../../components/auth/SignupForm'

const pageTitle = '註冊 | NOWnews 會員系統'

export class SignupPage extends Component {
  render () {
    return (<SignupForm />)
  }
}

export default withRedux(initStore)(guestLayout(SignupPage, pageTitle))
