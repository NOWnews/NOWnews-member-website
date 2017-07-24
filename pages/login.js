import React, { Component } from 'react'
import { initStore } from '../store'
import withRedux from 'next-redux-wrapper'
import guestLayout from '../hocs/guestLayout'
import LoginForm from '../components/auth/LoginForm'

const pageTitle = 'NOWnews 會員系統'

export class LoginPage extends Component {
  render () {
    return (<LoginForm />)
  }
}

export default withRedux(initStore)(guestLayout(LoginPage, pageTitle))
