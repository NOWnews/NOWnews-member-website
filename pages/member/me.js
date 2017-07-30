import React, { Component } from 'react'
import { initStore } from '../../modules/store'
import withRedux from 'next-redux-wrapper'
import standardLayout from '../../hocs/standardLayout'
import MeForm from '../../components/member/MeForm'

const pageTitle = 'NOWnews 會員系統'
const activeItem = 'me'

export class MePage extends Component {
  render () {
    return (<MeForm />)
  }
}

export default withRedux(initStore)(standardLayout(MePage, activeItem, pageTitle))
