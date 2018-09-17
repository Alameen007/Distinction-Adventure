import React from 'react'
import { connect } from 'dva'
import { BackTop, Drawer, List, Avatar, Divider, Col, Row, Modal, Button } from 'antd'
import { Link } from 'dva/router'
import Setting from './components/setting'
// import styles from './IndexPage.css'

const { confirm } = Modal

function Profile (props) {
  const { showSettingDrawer, hideSettingDrawer, settingVisible } = props
  return (
    <div>
      <Drawer
        width={640}
        placement="right"
        closable={false}
        onClose={props.hideProfileDrawer}
        visible={props.visible}
      >
        <Setting visible={settingVisible} hideSettingDrawer={hideSettingDrawer} />


        <div className="text-center">
          <figure className="avatar avatar-xl">
            <img src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" alt="..." />
          </figure>

          <p className="header-four profile-name"> Dave Lee  <Button onClick={showSettingDrawer}> <i className="fas fa-pencil-alt" /> Edit profile</Button> </p>
        </div>

        <Divider />
        <div className="progress-task">
          <div className="thin-line" />

          <p> TASK NAME </p>
          <small> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </small>

          <div className="task-info-sec">
            <div className="plc">
              <small> Small Info </small>
            </div>
            <div className="plc">
              <div className="circle badge--place" />
            </div>
          </div>
        </div>
        <Divider />

      </Drawer>
    </div>


  )
}

Profile.propTypes = {
}

export default Profile
