import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Form, Input, Tabs, Icon } from 'antd'

const FormItem = Form.Item
const { TabPane } = Tabs

class LoginTab extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  signIn = () => {
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return
      }
      // console.log(values)


      // const data = {
      //  ,
      // }

      this.props.dispatch({ type: 'login/login', values })
    })
  }
  render () {
    const {
      getFieldDecorator,
    } = this.props.form

    return (


      <form>
        <FormItem
          hasFeedback
        >
          {getFieldDecorator('email', {
        rules: [{
          type: 'email', message: 'The input is not valid E-mail!',
        }, {
          required: true, message: 'Please input your E-mail!',
        }],
      })(<Input placeholder="email" />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
      rules: [
        {
          required: true,
        },
      ],
    })(<Input type="password" placeholder="Password" />)}
        </FormItem>
        <Row>
          <Button type="primary" onClick={this.signIn}>
                   Sign in
          </Button>
        </Row>
      </form>

    )
  }
}

LoginTab.propTypes = {

}

export default connect(({ login, loading }) => ({ login, loading }))(Form.create()(LoginTab))
