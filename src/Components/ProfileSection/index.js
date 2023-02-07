import './index.css'

import {Component} from 'react'

import Cookies from 'js-cookie'

class ProfileSection extends Component {
  state = {
    profileDetails: {},
    showProfile: true,
  }

  componentDidMount = () => {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedProfileDetails = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({profileDetails: updatedProfileDetails, showProfile: true})
    } else {
      this.setState({showProfile: false})
    }
  }

  renderProfileDetails = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-container">
        <img className="profile-url" src={profileImageUrl} alt="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="bio">{shortBio}</p>
      </div>
    )
  }

  render() {
    const {showProfile} = this.state
    return (
      <div>
        {showProfile ? (
          this.renderProfileDetails()
        ) : (
          <button type="button">Retry</button>
        )}
      </div>
    )
  }
}

export default ProfileSection
