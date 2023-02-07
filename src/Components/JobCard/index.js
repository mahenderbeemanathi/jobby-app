import './index.css'

import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'

import {HiLocationMarker} from 'react-icons/hi'

import {BsFillBriefcaseFill} from 'react-icons/bs'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    id,
    title,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`} className="link-container">
      <li className="list-job-container">
        <div className="list-container-up">
          <div className="title-logo-container">
            <img src={companyLogoUrl} alt="company logo" />
            <div className="title-container">
              <h1>{title}</h1>
              <div className="rating-container">
                <AiFillStar className="star" />
                <p>{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-type-salary-container">
            <div className="location-type-container">
              <div className="location-container">
                <HiLocationMarker />
                <p>{location}</p>
              </div>
              <div className="type-container">
                <BsFillBriefcaseFill />
                <p>{employmentType}</p>
              </div>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
        </div>
        <hr />
        <div className="list-container-down">
          <h1>Description</h1>
          <p>{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
