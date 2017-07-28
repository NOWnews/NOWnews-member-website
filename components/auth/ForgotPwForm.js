import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import renderInput from '../form/renderInput'
import renderSelect from '../form/renderSelect'
import { switchType, onForgotPw }  from '../../modules/auth'
import { Button, Form, Modal, Segment } from 'semantic-ui-react'

export class ForgotPwComponent extends Component {
  constructor (props, context) {
    super(props, context)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  async handleFormSubmit (formProps) {
    try {
      const response = await this.props.onForgotPw(formProps)
    } catch (e) {

    }
  }

  render () {
    const { type, verifyCodeTimer, isLoading } = this.props.auth;
    const isPhone = type === 'phone';
    const isEmail = type === 'email';
    const showVerifyCodeTimer = verifyCodeTimer > 0;
    const countryOptions = [
      { key: 'taiwan', value: '+886', text: '台灣 +886'},
      { key: 'china', value: '+86', text: '大陸 +86'}
    ]
    return (
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
              <Field component={renderSelect} required label='區碼' name='areaCode' options={countryOptions} defaultValue='+886' />
            </Form.Field>
            <Form.Field width={12}>
              <Field component={renderInput} type='text' required label='手機' name='phone' />
            </Form.Field>
          </Form.Group>}

          {/* account is email */}
          {isEmail && <Form.Field>
            <Field component={renderInput} type='email' required label='信箱' name='email' />
          </Form.Field>}

          <Form.Group widths='equal'>
            <Form.Field width={10}>
              <Field component={renderInput} type='text' required label='驗證碼' name='code' />
            </Form.Field>
            <Form.Field width={3}>
              <Button type='button' content='取得驗證碼' fluid
                color='yellow'
                loading={showVerifyCodeTimer}
                onClick={this.props.getVerifyCode} />
              {showVerifyCodeTimer && <span>還有 {verifyCodeTimer} 秒 ...</span>}
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <Field component={renderInput} type='password' required label='新密碼' name='password' type='password'/>
            </Form.Field>
            <Form.Field>
              <Field component={renderInput} type='password' required label='確認新密碼' name='confirmPassword' type='password'/>
            </Form.Field>
          </Form.Group>
          <Button type='submit' fluid primary loading={isLoading}>送出</Button>
        </Form>
      </Segment>
    )
  }
}

const validate = (formProps) => {
  let errors = {}
  const requiredFields = ['email', 'password', 'confirmPassword', 'areaCode', 'code', 'nickname', 'phone']

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

const ForgotPwForm = reduxForm({
  form: 'forgotPw',
  validate
})(ForgotPwComponent)

const mapStateToProps = state => ({
  auth: state.auth,
  destroyOnUnmount: false,
  forgotPw: state.form.forgotPw
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({switchType, onForgotPw}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPwForm)
