import React from 'react'
import { connect } from 'dva'
import { BackTop, Drawer, List, Avatar, Divider, Col, Row, Modal } from 'antd'
import { Link } from 'dva/router'
import Profile from './../../components/profile'
import TaskBag from '../../assets/images/task-bg.png'
import NaijaFlag from '../../assets/images/9ja-flag.png'

const { confirm } = Modal

function Tasks (props) {
  const {
    user, tasks, profileVisible, settingVisible,
  } = props.tasks


  const logout = () => {
    const { dispatch } = props
    confirm({
      title: 'Are you sure you want to Logout?',
      onOk () {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
          return Promise.resolve()
        })
          .then(() => dispatch({ type: 'tasks/logout' }))
          .catch(() => dispatch({ type: 'tasks/logout' }))
      },
      onCancel () {},
    })
  }

  const handleCurrentTask = (currentTask) => {
    const { dispatch } = props
    localStorage.setItem('currentTask', JSON.stringify(currentTask))

    dispatch({ type: 'tasks/save', payload: { currentTask } })
  }

  const showProfileDrawer = () => {
    const { dispatch } = props
    dispatch({ type: 'tasks/save', payload: { profileVisible: true } })
  }

  const hideProfileDrawer = () => {
    const { dispatch } = props
    dispatch({ type: 'tasks/save', payload: { profileVisible: false } })
  }

  const profileProps = {
    visible: profileVisible,
    hideProfileDrawer,
    settingVisible,
    showSettingDrawer () {
      const { dispatch } = props
      dispatch({ type: 'tasks/save', payload: { settingVisible: true } })
    },
    hideSettingDrawer () {
      const { dispatch } = props
      dispatch({ type: 'tasks/save', payload: { settingVisible: false } })
    },
  }


  return (
    <div>
      <Profile {...profileProps} />
      <header className="navbar">
        <section className="navbar-section">
          <a href="index.html" className="btn btn-link">
            dis.adventure
          </a>
        </section>
        <section className="navbar-section">
          <List
            dataSource={[
          {
            name: `${user.firstName} ${user.lastName}`,
          },
        ]}
            className="ad-link"
            renderItem={item => (
              <List.Item key={item.id} actions={[<a onClick={logout}>Logout</a>]}>
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
              }
                  title={<a onClick={showProfileDrawer}>{item.name}</a>}
                />
              </List.Item>
        )}
          />
        </section>
      </header>

      <div className="block -berry edge--bottom">
        <h1>Welcome To Distinction Adventure</h1>
      </div>
      <div className="task-bg">
        <img src={TaskBag} alt="" />
      </div>

      <div className="container">
        <div className="columns col-gapless task-list">
          {tasks && tasks.map((task) => {
            return (
              <div className="column col-4" key={task.name}>
                <Link className="task-link" to={`/${task.url}`} onMouseOver={() => handleCurrentTask(task)}>
                  <div className="task-holder">
                    <div className="thin-line" />
                    <img src={NaijaFlag} className="task-flag" alt="" />

                    <p> {task.name.toUpperCase()}</p>
                    <small> {task.description}</small>

                    <div className="task-info-sec">
                      <div className="plc">
                        <small> {task.category} </small>
                      </div>
                      <div className="plc">
                        <div className="circle badge--place" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}


        </div>
      </div>

    </div>


  )
}

Tasks.propTypes = {
}

export default connect(({ tasks }) => ({ tasks }))(Tasks)

