import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import renderInput from '../form/renderInput'
import renderSelect from '../form/renderSelect'
import { onUpdatePw }  from '../../modules/auth'
import { Button, Form, Header, Segment } from 'semantic-ui-react'

export class UpdatePwComponent extends Component {
  constructor (props, context) {
    super(props, context)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  async handleFormSubmit (formProps) {
    try {
      const response = await this.props.onUpdatePw(formProps)
    } catch (e) {

    }
  }

  render () {
    const { isLoading } = this.props.auth;
    return (
      <div>
        <Header textAlign='center' as='h1' >修改密碼</Header>
        <Form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
          <Form.Field>
            <Field component={renderInput} type='password' required label='舊密碼' name='oldPassword' />
          </Form.Field>
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
      </div>
    )
  }
}

const validate = (formProps) => {
  let errors = {}
  const requiredFields = ['oldPassword', 'password', 'confirmPassword']

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

const UpdatePwForm = reduxForm({
  form: 'updatePw',
  validate
})(UpdatePwComponent)

const mapStateToProps = state => ({
  auth: state.auth,
  updatePw: state.form.updatePw
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({onUpdatePw}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(UpdatePwForm)
