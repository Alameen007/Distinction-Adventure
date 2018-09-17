import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Form, Input, Tabs, Icon, Radio } from 'antd'

const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const { TabPane } = Tabs


class RegisterTab extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      confirmDirty: false,
    }
  }

  handleConfirmBlur = (e) => {
    const { target } = e
    const { value } = target
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  checkPassword = (rule, value, callback) => {
    if (value && value !== this.props.form.getFieldValue('password')) {
      callback('Inconsistent passwords!')
    } else {
      callback()
    }
  }

  checkConfirm = (rule, value, callback) => {
    if (value && this.state.confirmDirty) {
      this.props.form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  register = () => {
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return
      }
      const {
        email, password, firstName, lastName, gender,
      } = values


      const parameter = {
        email,
        password,
        firstName,
        lastName,
        gender,
      }

      this.props.dispatch({ type: 'login/register', parameter })
    })
  }


  render () {
    const {
      getFieldDecorator,
    } = this.props.form
    return (

      <form >
        <FormItem
          hasFeedback
          style={{ marginBottom: '19px' }}
        >
          {getFieldDecorator('email', {
          rules: [{
            type: 'email', message: 'The input is not valid E-mail!',
          }, {
            required: true, message: 'Please input your E-mail!',
          }],
        })(<Input placeholder="email" />)}
        </FormItem>
        <FormItem
          style={{ marginBottom: '19px' }}
          hasFeedback
        >
          {getFieldDecorator('password', {
              rules: [{
                required: true, message: 'Please input your password!',
              }, {
                validator: this.checkConfirm,
              }],
            })(<Input type="password" placeholder="password" />)}
        </FormItem>
        <FormItem
          style={{ marginBottom: '19px' }}
          hasFeedback
        >
          {getFieldDecorator('passwordConfirmation', {
              rules: [{
                required: true, message: 'Please confirm your password!',
              }, {
                validator: this.checkPassword,
              }],
            })(<Input type="password" onBlur={this.handleConfirmBlur} placeholder="confirm password" />)}
        </FormItem>
        <FormItem hasFeedback
          style={{ marginBottom: '19px' }}
        >
          {getFieldDecorator('firstName', {
rules: [
{
required: true,
},
],
})(<Input placeholder="First Name" />)}
        </FormItem>
        <FormItem style={{ marginBottom: '19px' }} hasFeedback>
          {getFieldDecorator('lastName', {
rules: [
{
required: true,
},
],
})(<Input placeholder="Last Name" />)}
        </FormItem>
        <FormItem
          style={{ marginBottom: '19px' }}
          hasFeedback
        >
          {getFieldDecorator('gender', {
              rules: [
                {
                  required: true,
                  message: 'Please select your Gender!',
                },
              ],
            })(<RadioGroup>
              <RadioButton value="MALE">Male</RadioButton>
              <RadioButton value="FEMALE">Female</RadioButton>
            </RadioGroup>)}
        </FormItem>
        <Row>
          <Button type="primary" onClick={this.register}>
             Register
          </Button>
        </Row>
      </form>

    )
  }
}

RegisterTab.propTypes = {
}

export default connect(({ loading }) => ({ loading }))(Form.create()(RegisterTab))
