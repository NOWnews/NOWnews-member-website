import React from 'react'
import { Form, Label } from 'semantic-ui-react'

export const rednerInput = ({ input, label, type, meta, required }) => {
  const { pristine, touched, error, invalid } = meta
  return (
    <div>
      <Form.Input
        {...input}
        required={required}
        error={invalid}
        placeholder={label}
        type={type} />
      {invalid && error !== 'Required' && <Label basic color='red' pointing>{error}</Label>}
    </div>
  )
}

export default rednerInput
