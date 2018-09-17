import React from 'react'
import { connect } from 'dva'
import { BackTop } from 'antd'
import { Link } from 'dva/router'
import styles from './IndexPage.css'

function IndexPage () {
  return (
    <div>
      <div className={styles.bg} />
      <div className={styles.bg2} />
      <div className={styles.bg3} />

      <header className="navbar">
        <section className="navbar-section">
          <a href="index.html" className="btn btn-link">dis.adventure
          </a>
        </section>
        <section className="navbar-section">
          <Link href="/login" to="/login" className="btn btn-link ad-link" style={{ zIndex: 2, marginRight: '120px' }}> Login / Register </Link>
        </section>
      </header>
      <div className="hero-section">
        <div className="container">
          <div className="columns">
            <div className="column col-md-6">
              <h2 className="intro-text"> Fun.
                <br /> Thrill.
                <br /> Adventure.
              </h2>
              <a href="ixjkfjg" className="redirect-link"> Get Started </a>
            </div>
          </div>
        </div>
      </div>
      <div className="content-section">
        <div className="container">
          <div className="is-center">
            <h4 className="header-four"> What is Dis.Adventure </h4>
            <span className="sub-header--"> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </span>
          </div>

          <div className="columns pushdwn" />

          <div className="columns pushdwn">
            <div className="column col-3">
              <p className="header-three"> Register
                <span className="main-color"> or</span>
                <br /> Login
              </p>
            </div>
            <div className="column col-6">
              <p> Login to your account to gain access to all task
                <span className="main-color">
                  <b> or</b>
                </span> create a new account if you dont any existing.
              </p>
            </div>
            <div className="column col-3">
              <div className="hovering block-img">
                <img src="/src/assets/images/login1.svg" alt="" className="pushdwn" />
              </div>
            </div>
          </div>

          <div className="columns pushdwn">
            <div className="column col-3">
              <div className="hovering block-img">
                <img src="/src/assets/images/clipboard1.svg" alt="" className="pushdwn" />
              </div>
            </div>
            <div className="column col-6">
              <p> The list of every available task, </p>
            </div>
            <div className="column col-3">
              <p className="header-three"> List Of
                <br /> Tasks
              </p>
            </div>
          </div>

          <div className="columns pushdwn">
            <div className="column col-3">
              <p className="header-three"> Pick a Task
                <br />
                <span className="main-color">&</span> have fun
              </p>
            </div>
            <div className="column col-6">
              <p> Start any of the task to start your Adventure, becareful what you pick no one knows whats on the other side. </p>
            </div>
            <div className="column col-3">
              <div className="hovering block-img">
                <img src="/src/assets/images/win.svg" alt="" className="pushdwn" />
              </div>
            </div>
          </div>

          <div className="columns">
            <div className="column col-12">
              <div className="blub text-center">
                <small> If you are a developer and will love to contribute to what we are going on here, you can find us at our GitHub home at
                  <a href="xklgsjfk"> GitHub name address </a>
                </small>
              </div>
            </div>
          </div>

        </div>

        <div className="container">
          <div className="divider" />

          <footer>
            <div className={`${styles.wrap} ${styles.clear}`}>
              <div className={styles.about}>
                <img src="//dyucxlwplwbvv.cloudfront.net/company_logo.png" alt="" />
                <p>FlexiSAF is commited to bringing the BEST school management, teaching and learning experiences to educators, students and parents accross through its innovative software and technology offerings.</p>
              </div>
              <div className={styles.column}>
                <h4>Products</h4>
                <a href="http://safsms.com" target="_blank" rel="noopener noreferrer">
            SAFSMS
                  <div className={`${styles.desc} ${styles.about}`}>
                    <img src="//dyucxlwplwbvv.cloudfront.net/safsms.png" alt="" />
                A complete Administration Solution for School Managers to run their Schools the Smarter Way.
                  </div>
                </a>
                <a href="http://srms.ng" target="_blank" rel="noopener noreferrer">
            SRMS
                  <div className={`${styles.desc} ${styles.about}`}>
                    <img src="//dyucxlwplwbvv.cloudfront.net/srms.png" alt="" />
              FlexiSAF SRMS is a complete integrated system that provides solution for
              computing, compiling and managing students records using the Grade Point
              Average (GPA) system
                  </div>
                </a>
                <a href="http://skools.ng" target="_blank" rel="noopener noreferrer">Skools.ng
                  <div className={`${styles.desc} ${styles.about}`}>
                    <img src="//dyucxlwplwbvv.cloudfront.net/skools.svg" alt="" />
                Skools, a simple online platform allows users discover their dream school based on their specified preference. Admission applications are now processed at ease from the comfort of your very homes.
                  </div>
                </a>
              </div>
              <div className={styles.column}>
                <h4>Support</h4>
                <a href="http://blogs.flexisaf.com" target="_blank" rel="noopener noreferrer">Blog</a>
                <a href="http://flexisaf.com/contact-us/" target="_blank" rel="noopener noreferrer">Contact</a>
                <a href="http://flexisaf.com/support/" target="_blank" rel="noopener noreferrer">Support</a>
              </div>
            </div>
            <div className={styles.copy}>
        Copyright Ⓒ FlexiSAF {new Date().getFullYear()}
            </div>
          </footer>
        </div>
        <BackTop />
      </div>
    </div>


  )
}

IndexPage.propTypes = {
}

export default connect()(IndexPage)
