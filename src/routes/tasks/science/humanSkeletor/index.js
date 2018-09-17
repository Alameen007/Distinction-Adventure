import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Link } from 'dva/router'
import { Button, Modal } from 'antd'
import styles from './styles.css'
import { tags } from './tags'
import skeletor from './../../../../assets/images/Skeletal-System.png'

const currentTask = localStorage.getItem('currentTask')
const currtask = JSON.parse(currentTask)


class SkeletalSystem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tasks: this.props.tasks.tags,
      right: {
        padding: '5px 10px',
        background: '#7A57D1',
        color: '#FFF',
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
    // window.location.reload()
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
      task.style = this.state.right
    }
    return task
  })

  this.props.dispatch({ type: 'tasks/save', payload: { tags: tasks } })
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

  dispatch({ type: 'tasks/save', payload: { tags: tasks } })
  this.props.dispatch({ type: 'tasks/updateTaskData', tags: tasks, taskId })
}

updateTaskStatus = () => {
  const taskId = this.props.tasks.currentTask._id || currtask._id
  this.props.dispatch({ type: 'tasks/updateTaskStatus', id: taskId })
}

render () {
  const { modalVisible } = this.props.tasks
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
    PhalangesH: [],
    Femur: [],
    Tibia: [],
    Fibula: [],
    Tarsals: [],
    PhalangesF: [],
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

      <div className={styles.dot1}
        onDragOver={(e) => this.onDragOver(e)}
        onDrop={(e) => { this.onDrop(e, 'Cranium') }}
      >
        {tasks.Cranium}
      </div>
      <div className={styles.dot2}
        onDragOver={(e) => this.onDragOver(e)}
        onDrop={(e) => { this.onDrop(e, 'Sternum') }}
      >
        {tasks.Sternum}
      </div>
      <div className={styles.dot3}
        onDragOver={(e) => this.onDragOver(e)}
        onDrop={(e) => { this.onDrop(e, 'Clavicle') }}
      >
        {tasks.Clavicle}
      </div>
      <div className={styles.dot4}
        onDragOver={(e) => this.onDragOver(e)}
        onDrop={(e) => { this.onDrop(e, 'Ribs') }}
      >
        {tasks.Ribs}
      </div>
      <div className={styles.dot5}
        onDragOver={(e) => this.onDragOver(e)}
        onDrop={(e) => { this.onDrop(e, 'Humerus') }}
      >
        {tasks.Humerus}
      </div>
      <div className={styles.dot6}
        onDragOver={(e) => this.onDragOver(e)}
        onDrop={(e) => { this.onDrop(e, 'Ulna') }}
      >
        {tasks.Ulna}
      </div>
      <div className={styles.dot7}
        onDragOver={(e) => this.onDragOver(e)}
        onDrop={(e) => { this.onDrop(e, 'Radius') }}
      >
        {tasks.Radius}
      </div>
      <div className={styles.dot8}
        onDragOver={(e) => this.onDragOver(e)}
        onDrop={(e) => { this.onDrop(e, 'Carpals') }}
      >
        {tasks.Carpals}
      </div>
      <div className={styles.dot9}
        onDragOver={(e) => this.onDragOver(e)}
        onDrop={(e) => { this.onDrop(e, 'PhalangesH') }}
      >
        {tasks.PhalangesH}
      </div>
      <div className={styles.dot10}
        onDragOver={(e) => this.onDragOver(e)}
        onDrop={(e) => { this.onDrop(e, 'Femur') }}
      >
        {tasks.Femur}
      </div>
      <div className={styles.dot11}
        onDragOver={(e) => this.onDragOver(e)}
        onDrop={(e) => { this.onDrop(e, 'Tibia') }}
      >
        {tasks.Tibia}
      </div>
      <div className={styles.dot12}
        onDragOver={(e) => this.onDragOver(e)}
        onDrop={(e) => { this.onDrop(e, 'Fibula') }}
      >
        {tasks.Fibula}
      </div>
      <div className={styles.dot13}
        onDragOver={(e) => this.onDragOver(e)}
        onDrop={(e) => { this.onDrop(e, 'Tarsals') }}
      >
        {tasks.Tarsals}
      </div>
      <div className={styles.dot14}
        onDragOver={(e) => this.onDragOver(e)}
        onDrop={(e) => { this.onDrop(e, 'PhalangesF') }}
      >
        {tasks.PhalangesF}
      </div>
      <div className={styles.dot15}
        onDragOver={(e) => this.onDragOver(e)}
        onDrop={(e) => { this.onDrop(e, 'Cervical') }}
      >
        {tasks.Cervical}
      </div>
      <div className={styles.dot16}
        onDragOver={(e) => this.onDragOver(e)}
        onDrop={(e) => { this.onDrop(e, 'Scapula') }}
      >
        {tasks.Scapula}
      </div>
      <div className={styles.dot17}
        onDragOver={(e) => this.onDragOver(e)}
        onDrop={(e) => { this.onDrop(e, 'LumbarVertebrae') }}
      >
        {tasks.LumbarVertebrae}
      </div>
      <div className={styles.dot18}
        onDragOver={(e) => this.onDragOver(e)}
        onDrop={(e) => { this.onDrop(e, 'ThoracicVertebrae') }}
      >
        {tasks.ThoracicVertebrae}
      </div>
      <div className={styles.dot19}
        onDragOver={(e) => this.onDragOver(e)}
        onDrop={(e) => { this.onDrop(e, 'PelvicGirdle') }}
      >
        {tasks.PelvicGirdle}
      </div>
      <div className={styles.dot20}
        onDragOver={(e) => this.onDragOver(e)}
        onDrop={(e) => { this.onDrop(e, 'SacrumCoccyx') }}
      >
        {tasks.SacrumCoccyx}
      </div>
      <div className="container">
        <div className="columns">
          <div className="column col-9 ">
            <div className={styles.skl}>
              <img src={skeletor} className="skl-img" alt="" />
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
                  <button disabled={tasks.dragSec.length > 0} type="button" className="btn btn-primary col-12" name="button"> SUBMIT </button>
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
    </div>

  )
}
}

SkeletalSystem.propTypes = {

}

export default connect(({ tasks }) => ({ tasks }))(SkeletalSystem)
