import './index.css'

import {Component} from 'react'

import {Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {BiSearch} from 'react-icons/bi'

import ProfileSection from '../ProfileSection'

import FiltersSection from '../FiltersSection'

import JobCard from '../JobCard'

import Header from '../Header'

const statusOptions = {
  initial: 'INITIAL',
  loading: 'LOADING',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class Jobs extends Component {
  state = {
    jobList: [],
    showJobs: statusOptions.initial,
    searchInput: '',
    employmentType: [],
    salary: 0,
  }

  componentDidMount = () => {
    this.getJobsList()
  }

  renderNoJobs = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters.</p>
    </div>
  )

  renderJobList = data => {
    if (data.total === 0) {
      return this.renderNoJobs()
    }
    const updatedList = data.jobs.map(eachJob => ({
      companyLogoUrl: eachJob.company_logo_url,
      employmentType: eachJob.employment_type,
      id: eachJob.id,
      jobDescription: eachJob.job_description,
      location: eachJob.location,
      packagePerAnnum: eachJob.package_per_annum,
      rating: eachJob.rating,
      title: eachJob.title,
    }))
    return this.setState({
      showJobs: statusOptions.success,
      jobList: updatedList,
    })
  }

  getJobsList = async () => {
    this.setState({showJobs: statusOptions.loading})
    const {searchInput, employmentType, salary} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiJobsUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${salary}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiJobsUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.renderJobList(data)
    } else {
      this.setState({showJobs: statusOptions.failure})
    }
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderFailure = () => (
    <div>
      <input type="search" />
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <Link to="/jobs">
        <button type="button">Retry</button>
      </Link>
    </div>
  )

  renderJobsDetails = () => {
    const {jobList} = this.state
    return (
      <div>
        <ul>
          {jobList.map(eachJob => (
            <JobCard key={eachJob.id} jobDetails={eachJob} />
          ))}
        </ul>
      </div>
    )
  }

  renderJobsDetailsState = () => {
    const {showJobs} = this.state
    switch (showJobs) {
      case statusOptions.success:
        return this.renderJobsDetails()
      case statusOptions.loading:
        return this.renderLoading()
      case statusOptions.failure:
        return this.renderFailure()

      default:
        return null
    }
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.setState({searchInput: event.target.value}, this.getJobsList)
    }
  }

  changeSalaryRange = salaryRange => {
    this.setState({salary: salaryRange}, this.getJobsList)
  }

  changeEmploymentType = type => {
    this.setState(
      prevState => ({employmentType: [...prevState.employmentType, type]}),
      this.getJobsList,
    )
  }

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {searchInput} = this.state
    return (
      <div>
        <Header />

        <div className="jobs-container">
          <div className="filters-container">
            <ProfileSection />
            <hr />
            <FiltersSection
              changeEmploymentType={this.changeEmploymentType}
              changeSalaryRange={this.changeSalaryRange}
            />
          </div>
          <div className="jobs-list-container">
            <div className="search-container">
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                onKeyDown={this.onEnterSearchInput}
                value={searchInput}
                onChange={this.onChangeInput}
              />
              <button
                type="button"
                className="search-icon"
                data-testid="searchButton"
                onClick={this.getJobsList}
              >
                <BiSearch />
              </button>
            </div>
            {this.renderJobsDetailsState()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
