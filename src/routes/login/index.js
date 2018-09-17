import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Form, Input, Tabs, Icon, Col } from 'antd'
import LoginTab from './components/login'
import RegisterTab from './components/register'


const { TabPane } = Tabs
const FormItem = Form.Item


class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  render () {
    return (
      <div>
        <div className="login_wrapper">
          <div className="login_container">
            <div className="columns">
              <div className="column col-5">
                <section className="tab-section">
                  <Tabs
                    defaultActiveKey="1"
                    tabPosition="top"
                  >
                    <TabPane tab="Sign In" key="1">
                      <LoginTab />

                      <div className="columns">
                        <div className="column col-12 divider-pushRight">
                          <div className="divider text-center" data-content="OR" />
                        </div>
                      </div>

                      <div className="columns pushdwn">
                        <div className="columns col-12">
                          <a href="sdfljdsf" className="alt-login fb-bg"> <i className="fab fa-facebook-f" /> Login with Facebook </a>
                        </div>
                        <div className="columns col-12">
                          <a href="sdfsdfs" className="alt-login gl-bg"> <i className="fab fa-google" /> Login with Google </a>
                        </div>
                      </div>
                    </TabPane>
                    <TabPane tab="Register" key="2">
                      <RegisterTab />
                    </TabPane>

                  </Tabs>
                </section>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {

}

export default connect(({ login, loading }) => ({ login, loading }))(Form.create()(Login))

