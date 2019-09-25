import React from 'react'
import { Button, Modal } from 'antd'
import styles from './styles.css'
import skeletor from './../../../../assets/images/Skeletal-System.png'
import verybad from './../../../../assets/images/unhappy.png'
import poor from './../../../../assets/images/sad.png'
import fair from './../../../../assets/images/confused.png'
import good from './../../../../assets/images/smiling.png'
import veryGood from './../../../../assets/images/veryGood.png'
import excellent from './../../../../assets/images/happy.png'

const congratPage = ({ completeTags, point }) => {
  let rate = ''
  let color
  let icon = ''

  if (point === 0) {
    rate = 'Very Bad'
    color = '#bd3227'
    icon = verybad
  } else if (point >= 1 && point <= 4) {
    color = '#ef4828'
    rate = 'Poor'
    icon = poor
  } else if (point >= 5 && point <= 8) {
    rate = 'Fair'
    color = '#f68f36'
    icon = fair
  } else if (point >= 9 && point <= 12) {
    rate = 'Good'
    color = '#fdce46'
    icon = good
  } else if (point >= 13 && point <= 16) {
    rate = 'Very Good'
    color = '#7dbb42'
    icon = veryGood
  } else if (point >= 17 && point <= 20) {
    rate = 'Excellent'
    color = '#439347'
    icon = excellent
  }

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

  completeTags.forEach((t) => {
    tasks[t.category].push(<div key={t.name}
      className="drag-chip"
      style={t.style}
    >
      {t.name}
    </div>)
  })
  return (
    <div>
      <Modal
        visible={visible}
        width={1000}
        footer={[
          <Button onClick={this.updateTaskStatus} key="submit" type="primary">
      Continue
          </Button>,
  ]}
      >
        <div className={styles.skl}>
          <img src={skeletor} className="skl-img" alt="" />
          <div className={
                `${styles.dot1} ${styles.dot}`
              }
          >
            {
                  tasks.Cranium
                } </div> <div className={`${styles.dot2} ${styles.dot}`}>
                  {
                  tasks.Sternum
                } </div> <div className={
                `${styles.dot3} ${styles.dot}`
                }
                >
                  {
                  tasks.Clavicle
                } </div> <div className={
                `${styles.dot4} ${styles.dot}`
                }
                >
                  {
                  tasks.Ribs
                } </div> <div className={
                `${styles.dot5} ${styles.dot}`
                }
                >
                  {
                  tasks.Humerus
                } </div> <div className={
                `${styles.dot6} ${styles.dot}`
                }
                >
                  {
                  tasks.Ulna
                } </div> <div className={
                `${styles.dot7} ${styles.dot}`
                }
                >
                  {
                  tasks.Radius
                } </div> <div className={
                `${styles.dot8} ${styles.dot}`
                }
                >
                  {
                  tasks.Carpals
                } </div> <div className={
                `${styles.dot9} ${styles.dot}`
                }
                >
                  {
                  tasks.PhalangesHand
                } </div> <div className={
                `${styles.dot10} ${styles.dot}`
                }
                >
                  {
                  tasks.Femur
                } </div> <div className={
                `${styles.dot11} ${styles.dot}`
                }
                >
                  {
                  tasks.Tibia
                } </div> <div className={
                `${styles.dot12} ${styles.dot}`
                }
                >
                  {
                  tasks.Fibula
                } </div> <div className={
                `${styles.dot13} ${styles.dot}`
                }
                >
                  {
                  tasks.Tarsals
                } </div> <div className={
                `${styles.dot14} ${styles.dot}`
                }
                >
                  {
                  tasks.PhalangesFoot
                } </div> <div className={
                `${styles.dot15} ${styles.dot}`
                }
                >
                  {
                  tasks.Cervical
                } </div> <div className={
                `${styles.dot16} ${styles.dot}`
                }
                >
                  {
                  tasks.Scapula
                } </div> <div className={
                `${styles.dot17} ${styles.dot}`
                }
                >
                  {
                  tasks.LumbarVertebrae
                } </div> <div className={
                `${styles.dot18} ${styles.dot}`
                }
                >
                  {
                  tasks.ThoracicVertebrae
                } </div> <div className={
                `${styles.dot19} ${styles.dot}`
                }
                >
                  {
                  tasks.PelvicGirdle
                } </div> <div className={
                `${styles.dot20} ${styles.dot}`
                }
                >
                  {
                  tasks.SacrumCoccyx
                } </div>

          <div className={styles.congrat}>
            <h1 style={{ color }}>{rate}</h1>
            <h3>You got {point}/20</h3>
            <img style={{ width: '128px', height: '128px' }} src={icon} alt="Rating emoji" />
          </div>
        </div>

      </Modal>
    </div>
  )
}

export default congratPage
