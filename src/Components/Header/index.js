import './index.css'

import {Link, withRouter} from 'react-router-dom'

import {AiFillHome} from 'react-icons/ai'

import {BsFillBriefcaseFill} from 'react-icons/bs'

import {FiLogOut} from 'react-icons/fi'

import Cookies from 'js-cookie'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <Link to="/" className="nav-link">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-logo"
        />
      </Link>
      <div className="desktop-header">
        <ul className="link-container">
          <Link to="/" className="nav-link">
            <li>Home</li>
          </Link>
          <Link to="/jobs" className="nav-link">
            <li>Jobs</li>
          </Link>
        </ul>
        <button type="button" onClick={onClickLogout} className="logout">
          Logout
        </button>
      </div>
      <div>
        <ul className="mobile-header">
          <Link to="/" className="nav-link">
            <li>
              <AiFillHome />
            </li>
          </Link>
          <Link to="/jobs" className="nav-link">
            <li>
              <BsFillBriefcaseFill />
            </li>
          </Link>
          <li>
            <button
              type="button"
              onClick={onClickLogout}
              className="logout-logo"
            >
              <FiLogOut />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}
export default withRouter(Header)
