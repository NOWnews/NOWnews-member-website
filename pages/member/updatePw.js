import React, { Component } from 'react'
import { initStore } from '../../modules/store'
import withRedux from 'next-redux-wrapper'
import standardLayout from '../../hocs/standardLayout'
import UpdatePwForm from '../../components/member/UpdatePwForm'

const pageTitle = 'NOWnews 會員系統 | 更新密碼'
const activeItem = 'updatepw'

export class UpdatePwPage extends Component {
  render () {
    return (<UpdatePwForm />)
  }
}

export default withRedux(initStore)(standardLayout(UpdatePwPage, activeItem, pageTitle))
