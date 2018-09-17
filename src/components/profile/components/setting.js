import React from 'react'
import { connect } from 'dva'
import { BackTop, Drawer, List, Avatar, Divider, Col, Row, Modal, Button } from 'antd'
import { Link } from 'dva/router'
// import styles from './IndexPage.css'

const { confirm } = Modal

function Setting (props) {
  return (
    <div>
      <Drawer
        title="Setting"
        width={320}
        closable={false}
        onClose={props.hideSettingDrawer}
        visible={props.visible}
      >
    This is two-level drawer
        <div
          style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e8e8e8',
              padding: '10px 16px',
              textAlign: 'right',
              left: 0,
              background: '#fff',
              borderRadius: '0 0 4px 4px',
            }}
        >
          <Button
            style={{
                marginRight: 8,
              }}
            onClick={props.hideSettingDrawer}
          >
              Cancel
          </Button>
          <Button type="primary">
              Submit
          </Button>
        </div>
      </Drawer>
    </div>


  )
}

Setting.propTypes = {
}

export default Setting
