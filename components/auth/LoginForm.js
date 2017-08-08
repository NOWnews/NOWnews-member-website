import React, { Component } from 'react'
import { toastr } from 'react-redux-toastr'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Modal, Segment } from 'semantic-ui-react'
import renderInput from '../form/renderInput'
import renderSelect from '../form/renderSelect'
import { switchType, onLogin }  from '../../modules/auth'

export class LoginComponent extends Component {
  constructor (props, context) {
    super(props, context)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  async handleFormSubmit (formProps) {
    try {
      await this.props.onLogin({
        provider: this.props.auth.type,
        ...formProps
      });
      window.location = '/member/me'
    } catch (e) {
      toastr.error(e.msg);
    }
  }

  render () {
    const { type, isLoading } = this.props.auth;
    const isPhone = type === 'phone';
    const isEmail = type === 'email';
    const countryOptions = [
      { key: 'taiwan', value: '886', text: '台灣 +886'},
      { key: 'china', value: '86', text: '大陸 +86'}
    ]
    return (
      <div>
        <Segment stacked>
          <Form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
            <Form.Field>
              <Button.Group widths={3}>
                <Button type='button' icon='mobile' content='手機'
                  positive={isPhone}
                  onClick={()=>{ this.props.switchType('phone')}} />
                <Button.Or />
                <Button type='button' icon='mail' content='信箱'
                  positive={isEmail}
                  onClick={()=>{ this.props.switchType('email')}} />
              </Button.Group>
            </Form.Field>

            {/* account is phone */}
            {isPhone && <Form.Group widths='equal'>
              <Form.Field width={4}>
                <Field component={renderSelect} required label='區碼' name='countryCode' options={countryOptions} defaultValue='+886' />
              </Form.Field>
              <Form.Field width={12}>
                <Field component={renderInput} type='text' required label='手機' name='phone' />
              </Form.Field>
            </Form.Group>}

            {/* account is email */}
            {isEmail && <Form.Field>
              <Field component={renderInput} type='email' required label='信箱' name='email' />
            </Form.Field>}
            <Form.Field>
              <Field component={renderInput} type='password' required label='密碼' name='password' type='password'/>
            </Form.Field>
            <Button type='submit' fluid primary loading={isLoading}>登入</Button>
          </Form>
        </Segment>
        <Segment textAlign='center'>
          沒辦法登入嗎？  <a href='/auth/signup'>註冊</a>  |  <a href='/auth/forgotPw'>忘記密碼</a>
        </Segment>
      </div>
    )
  }
}

const validate = (formProps) => {
  let errors = {}
  const requiredFields = ['countryCode', 'email', 'password', 'phone']

  requiredFields.forEach(field => {
    if (!formProps[field]) {
      errors[field] = 'Required'
    }
  })

  return errors
}

const LoginForm = reduxForm({
  form: 'login',
  destroyOnUnmount: false,
  validate
})(LoginComponent)

const mapStateToProps = state => ({
  auth: state.auth,
  login: state.form.login
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({switchType, onLogin}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
