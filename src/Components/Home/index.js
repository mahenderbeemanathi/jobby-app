import './index.css'

import {Link} from 'react-router-dom'

import Header from '../Header'

const Home = props => {
  const onClickFindJob = () => {
    const {history} = props
    history.replace('/jobs')
  }

  return (
    <div className="home-container">
      <Header />
      <div className="home-content">
        <h1>Find The Job That Fits Your Life</h1>
        <p>
          Millions of people are searching for jobs, salary, infermation,
          company reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs" className="find-job-link">
          <button type="button" className="find-job" onClick={onClickFindJob}>
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home
