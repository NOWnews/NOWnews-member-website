import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import renderInput from '../form/renderInput'
import renderSelect from '../form/renderSelect'
import { switchType, getVerifyCode, onSignup }  from '../../modules/auth'
import { Button, Form, Modal, Header } from 'semantic-ui-react'

export class MeComponent extends Component {
  constructor (props, context) {
    super(props, context)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  async handleFormSubmit (formProps) {
    try {
      const response = await this.props.onSignup(formProps)
      window.alert('更新完成');
    } catch (e) {

    }
  }

  render () {
    const { type, verifyCodeTimer, isLoading } = this.props.auth;
    const isPhone = type === 'phone';
    const isEmail = type === 'email';
    const showVerifyCodeTimer = verifyCodeTimer > 0;
    return (
      <div>
        <Header textAlign='center' as='h1' >會員資料</Header>
        <Form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
          <Form.Field>
            <Field component={renderInput} type='text' required label='暱稱（可中文、英文、數字）' name='nickname' />
          </Form.Field>
          <Button type='submit' fluid primary loading={isLoading}>送出</Button>
        </Form>
      </div>
    )
  }
}

const validate = (formProps) => {
  let errors = {}
  const requiredFields = ['areaCode', 'code', 'nickname']

  requiredFields.forEach(field => {
    if (!formProps[field]) {
      errors[field] = 'Required'
    }
  })

  if (formProps.password != formProps.confirmPassword) {
    errors.confirmPassword = '需與密碼相同'
  }

  return errors
}

const MeForm = reduxForm({
  form: 'me',
  destroyOnUnmount: false,
  validate,
})(MeComponent)

const mapStateToProps = state => ({
  auth: state.auth,
  me: state.form.me
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({switchType, getVerifyCode, onSignup}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(MeForm)
