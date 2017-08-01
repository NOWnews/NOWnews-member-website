import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import { bindActionCreators } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Modal, Segment } from 'semantic-ui-react'
import renderInput from '../form/renderInput'
import renderSelect from '../form/renderSelect'
import { switchType, onForgotPw, onResetPw }  from '../../modules/auth'

export class ForgotPwComponent extends Component {
  constructor (props, context) {
    super(props, context)
    this.getVerifyCode = this.getVerifyCode.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  async handleFormSubmit (formProps) {
    try {
      await this.props.onResetPw(formProps)
      toastr.success('密碼更新成功，請用新密碼嘗試登入！');
    } catch (e) {
      toastr.error(e.Message);
    }
  }

  async getVerifyCode () {
    try {
      const response = await this.props.onForgotPw({
        provider: this.props.auth.type,
        ...this.props.forgotPw.values
      });
    } catch (e) {
      toastr.error(e.Message);
    }
  }

  render () {
    const { type, verifyCodeTimer, isLoading } = this.props.auth;
    const isPhone = type === 'phone';
    const isEmail = type === 'email';
    const showVerifyCodeTimer = verifyCodeTimer > 0;
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

            <Form.Group widths='equal'>
              <Form.Field width={10}>
                <Field component={renderInput} type='text' required label='驗證碼' name='verifyCode' />
              </Form.Field>
              <Form.Field width={3}>
                <Button type='button' content='取得驗證碼' fluid
                  color='yellow'
                  loading={showVerifyCodeTimer}
                  onClick={this.getVerifyCode} />
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
        <Segment textAlign='center'>
          想起密碼了 ?  <a href='/auth/login'>登入</a>
        </Segment>
      </div>
    )
  }
}

const validate = (formProps) => {
  let errors = {}
  const requiredFields = ['email', 'password', 'confirmPassword', 'countryCode', 'verifyCode', 'nickname', 'phone']

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
  return bindActionCreators({switchType, onForgotPw, onResetPw}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPwForm)
