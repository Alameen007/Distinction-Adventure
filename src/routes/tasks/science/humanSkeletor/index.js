import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Link } from 'dva/router'
import { Button, Modal } from 'antd'
import styles from './styles.css'
import { tags } from './tags'
import CongratPage from './congratPage'
import skeletor from './../../../../assets/images/Skeletal-System.png'

const currentTask = localStorage.getItem('currentTask')
const currtask = JSON.parse(currentTask)


class SkeletalSystem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tasks: this.props.tasks.tags,
      right: {
        display: 'inline-block',
        whiteSpace: 'nowrap',
        padding: '5px 10px',
        background: '#b6e98f',
        color: 'rgba(0, 0, 0, 0.65)',
        fontSize: '12px',
        marginBottom: '-20px',
        position: 'absolute',
        marginTop: '-6px',
      },
      drop: {
        display: 'inline-block',
        whiteSpace: 'nowrap',
        padding: '5px 10px',
        background: '#7A57D1',
        color: 'FFF',
        fontSize: '12px',
        marginBottom: '-20px',
        position: 'absolute',
        marginTop: '-6px',
      },
      wrong: {
        display: 'inline-block',
        whiteSpace: 'nowrap',
        padding: '5px 10px',
        background: '#ffa39e',
        color: 'rgba(0, 0, 0, 0.65)',
        fontSize: '12px',
        marginBottom: '-20px',
        position: 'absolute',
        marginTop: '-6px',
      },
      dragSec: {
        padding: '5px 10px',
        background: '#7A57D1',
        color: '#FFF',
        fontSize: '12px',
        marginBottom: '-20px',
      },
    }
  }

  componentWillMount () {
    const id = this.props.tasks.currentTask._id || currtask._id

    this.props.dispatch({ type: 'tasks/getTaskData', id })
  }

  componentDidMount () {
    const status = this.props.tasks.currentTask.status || currtask.status
    if (this.state.tasks.length < 1 || this.state.tasks === undefined) {
      this.setState({ tasks: tags })
    }

    const { dispatch } = this.props
    if (status === 'Progress') {
      dispatch({ type: 'tasks/save', payload: { modalVisible: false } })
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.tasks.tags < 1) {
      this.setState({ tasks: tags })
    } else {
      this.setState({ tasks: nextProps.tasks.tags })
    }
  }

  onDragStart = (ev, id) => {
    ev.dataTransfer.setData('id', id)
  }

onDragOver = (ev) => {
  ev.preventDefault()
}


onDrop = (ev, cat) => {
  const taskId = this.props.tasks.currentTask._id || currtask._id
  let id = ev.dataTransfer.getData('id')

  let tasks = this.state.tasks.filter((task) => {
    if (task.name === id) {
      task.category = cat
      task.style = this.state.drop
    }
    return task
  })

  const completeTags = this.state.tasks.map(tag => {
    return { ...tag }
  })

  this.props.dispatch({ type: 'tasks/save', payload: { tags: tasks, completeTags } })
  this.props.dispatch({ type: 'tasks/updateTaskData', tags: tasks, taskId })
}

onComplete = (ev, cat) => {
  const taskId = this.props.tasks.currentTask._id || currtask._id
  const { dispatch } = this.props
  let id = ev.dataTransfer.getData('id')

  let tasks = this.state.tasks.filter((task) => {
    if (task.name === id) {
      task.category = cat
      task.style = this.state.dragSec
    }
    return task
  })

  const completeTags = this.state.tasks.map(tag => {
    return { ...tag }
  })

  dispatch({ type: 'tasks/save', payload: { tags: tasks, completeTags } })
  this.props.dispatch({ type: 'tasks/updateTaskData', tags: tasks, taskId })
}

handleSubmit = () => {
  let { completeTags } = this.props.tasks
  let point = 0

  for (let i = 0; i < completeTags.length; i++) {
    if (completeTags[i].tag === completeTags[i].category) {
      completeTags[i].style = this.state.right
      point++
    } else {
      completeTags[i].style = this.state.wrong
    }
  }


  this.props.dispatch({
    type: 'tasks/save',
    payload: {
      completeTags,
      markLoader: true,
      point,
    },
  })

  setTimeout(() => { this.props.dispatch({ type: 'tasks/save', payload: { congratModalVisible: true, markLoader: false } }) }, 1500)
}

updateTaskStatus = () => {
  const taskId = this.props.tasks.currentTask._id || currtask._id
  this.props.dispatch({ type: 'tasks/updateTaskStatus', id: taskId })
}

render () {
  const {
    modalVisible, congratModalVisible, completeTags, point, markLoader,
  } = this.props.tasks
  const visible = true
  let tasks = {
    Sternum: [],
    Cranium: [],
    Clavicle: [],
    Ribs: [],
    Humerus: [],
    Ulna: [],
    Radius: [],
    Carpals: [],
    PhalangesHand: [],
    Femur: [],
    Tibia: [],
    Fibula: [],
    Tarsals: [],
    PhalangesFoot: [],
    SacrumCoccyx: [],
    PelvicGirdle: [],
    LumbarVertebrae: [],
    ThoracicVertebrae: [],
    Scapula: [],
    Cervical: [],
    dragSec: [],
  }

  this.state.tasks.forEach((t) => {
    tasks[t.category].push(<div key={t.name}
      onDragStart={(e) => this.onDragStart(e, t.name)}
      draggable
      className="drag-chip"
      style={t.style}
    >
      {t.name}
    </div>)
  })
  return (
    <div>
      <header className="navbar sample--task-navbar">
        <section className="navbar-section">
          <a href="index.html" className="btn btn-link">dis.adventure
          </a>
        </section>
        <section className="navbar-center">
          <b> HUMAN SKELETAL SYSTEM </b>
        </section>
        <section className="navbar-section">
          <Link href="/tasks" to="/tasks" className="bck-link" > Back To Tasks </Link>
        </section>
      </header>
      <div />


      <div className="container">
        <div className="columns">
          <div className="column col-9 ">
            <div className={styles.skl}>
              <img src={skeletor} className="skl-img img" alt="" />
              <div className={
                `${styles.dot1} ${styles.dot}`
              }
                onDragOver={
                (e) => this.onDragOver(e)
              }
                onDrop={
                  (e) => {
                    this.onDrop(e, 'Cranium')
                  }
                }
              >
                {
                  tasks.Cranium
                } </div> <div className={`${styles.dot2} ${styles.dot}`}
                  onDragOver={
                (e) => this.onDragOver(e)
              }
                  onDrop={
                  (e) => {
                    this.onDrop(e, 'Sternum')
                  }
                }
                >
                  {
                  tasks.Sternum
                } </div> <div className={
                `${styles.dot3} ${styles.dot}`
                }
                  onDragOver={
                (e) => this.onDragOver(e)
              }
                  onDrop={
                  (e) => {
                    this.onDrop(e, 'Clavicle')
                  }
                }
                >
                  {
                  tasks.Clavicle
                } </div> <div className={
                `${styles.dot4} ${styles.dot}`
                }
                  onDragOver={
                (e) => this.onDragOver(e)
              }
                  onDrop={
                  (e) => {
                    this.onDrop(e, 'Ribs')
                  }
                }
                >
                  {
                  tasks.Ribs
                } </div> <div className={
                `${styles.dot5} ${styles.dot}`
                }
                  onDragOver={
                (e) => this.onDragOver(e)
              }
                  onDrop={
                  (e) => {
                    this.onDrop(e, 'Humerus')
                  }
                }
                >
                  {
                  tasks.Humerus
                } </div> <div className={
                `${styles.dot6} ${styles.dot}`
                }
                  onDragOver={
                (e) => this.onDragOver(e)
              }
                  onDrop={
                  (e) => {
                    this.onDrop(e, 'Ulna')
                  }
                }
                >
                  {
                  tasks.Ulna
                } </div> <div className={
                `${styles.dot7} ${styles.dot}`
                }
                  onDragOver={
                (e) => this.onDragOver(e)
              }
                  onDrop={
                  (e) => {
                    this.onDrop(e, 'Radius')
                  }
                }
                >
                  {
                  tasks.Radius
                } </div> <div className={
                `${styles.dot8} ${styles.dot}`
                }
                  onDragOver={
                (e) => this.onDragOver(e)
              }
                  onDrop={
                  (e) => {
                    this.onDrop(e, 'Carpals')
                  }
                }
                >
                  {
                  tasks.Carpals
                } </div> <div className={
                `${styles.dot9} ${styles.dot}`
                }
                  onDragOver={
                (e) => this.onDragOver(e)
              }
                  onDrop={
                  (e) => {
                    this.onDrop(e, 'PhalangesHand')
                  }
                }
                >
                  {
                  tasks.PhalangesHand
                } </div> <div className={
                `${styles.dot10} ${styles.dot}`
                }
                  onDragOver={
                (e) => this.onDragOver(e)
              }
                  onDrop={
                  (e) => {
                    this.onDrop(e, 'Femur')
                  }
                }
                >
                  {
                  tasks.Femur
                } </div> <div className={
                `${styles.dot11} ${styles.dot}`
                }
                  onDragOver={
                (e) => this.onDragOver(e)
              }
                  onDrop={
                  (e) => {
                    this.onDrop(e, 'Tibia')
                  }
                }
                >
                  {
                  tasks.Tibia
                } </div> <div className={
                `${styles.dot12} ${styles.dot}`
                }
                  onDragOver={
                (e) => this.onDragOver(e)
              }
                  onDrop={
                  (e) => {
                    this.onDrop(e, 'Fibula')
                  }
                }
                >
                  {
                  tasks.Fibula
                } </div> <div className={
                `${styles.dot13} ${styles.dot}`
                }
                  onDragOver={
                (e) => this.onDragOver(e)
              }
                  onDrop={
                  (e) => {
                    this.onDrop(e, 'Tarsals')
                  }
                }
                >
                  {
                  tasks.Tarsals
                } </div> <div className={
                `${styles.dot14} ${styles.dot}`
                }
                  onDragOver={
                (e) => this.onDragOver(e)
              }
                  onDrop={
                  (e) => {
                    this.onDrop(e, 'PhalangesFoot')
                  }
                }
                >
                  {
                  tasks.PhalangesFoot
                } </div> <div className={
                `${styles.dot15} ${styles.dot}`
                }
                  onDragOver={
                (e) => this.onDragOver(e)
              }
                  onDrop={
                  (e) => {
                    this.onDrop(e, 'Cervical')
                  }
                }
                >
                  {
                  tasks.Cervical
                } </div> <div className={
                `${styles.dot16} ${styles.dot}`
                }
                  onDragOver={
                (e) => this.onDragOver(e)
              }
                  onDrop={
                  (e) => {
                    this.onDrop(e, 'Scapula')
                  }
                }
                >
                  {
                  tasks.Scapula
                } </div> <div className={
                `${styles.dot17} ${styles.dot}`
                }
                  onDragOver={
                (e) => this.onDragOver(e)
              }
                  onDrop={
                  (e) => {
                    this.onDrop(e, 'LumbarVertebrae')
                  }
                }
                >
                  {
                  tasks.LumbarVertebrae
                } </div> <div className={
                `${styles.dot18} ${styles.dot}`
                }
                  onDragOver={
                (e) => this.onDragOver(e)
              }
                  onDrop={
                  (e) => {
                    this.onDrop(e, 'ThoracicVertebrae')
                  }
                }
                >
                  {
                  tasks.ThoracicVertebrae
                } </div> <div className={
                `${styles.dot19} ${styles.dot}`
                }
                  onDragOver={
                (e) => this.onDragOver(e)
              }
                  onDrop={
                  (e) => {
                    this.onDrop(e, 'PelvicGirdle')
                  }
                }
                >
                  {
                  tasks.PelvicGirdle
                } </div> <div className={
                `${styles.dot20} ${styles.dot}`
                }
                  onDragOver={
                (e) => this.onDragOver(e)
              }
                  onDrop={
                  (e) => {
                    this.onDrop(e, 'SacrumCoccyx')
                  }
                }
                >
                  {
                  tasks.SacrumCoccyx
                } </div>
            </div>

          </div>
          <div className="column col-3 drag-sec">
            <div className="column col-12 drag-sec"
              onDragOver={(e) => this.onDragOver(e)}
              onDrop={(e) => this.onComplete(e, 'dragSec')}
            >
              {tasks.dragSec}
              <p className={styles.hiddenGuy}>p</p>

              <div className="column col-12">
                <div className="fixd">
                  <Button loading={markLoader} onClick={this.handleSubmit} disabled={tasks.dragSec.length > 0} type="primary" style={{ width: '100%' }} name="button"> SUBMIT </Button>
                </div>
              </div>
            </div>
          </div>
          { modalVisible && <Modal
            visible={visible}
            width={600}
            footer={[
              <Button onClick={this.updateTaskStatus} key="submit" type="primary">
              Continue
              </Button>,
          ]}
          >
            <h5 className={styles.h5}>Drag and drop each <span className={styles.label}>Label</span>  on to the correct <span className={styles.pdot}>Purple Dot</span></h5>
          </Modal>}
        </div>
      </div>
      {congratModalVisible && <CongratPage completeTags={completeTags} point={point} />}
    </div>

  )
}
}

SkeletalSystem.propTypes = {

}

export default connect(({ tasks }) => ({ tasks }))(SkeletalSystem)
