import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FiltersSection = props => {
  const {changeEmploymentType, changeSalaryRange} = props

  return (
    <div className="filter-container">
      <h1>Type of Employment</h1>
      <ul>
        {employmentTypesList.map(eachType => {
          const {employmentTypeId, label} = eachType
          const onChangeEmployType = event => {
            changeEmploymentType(event.target.value)
          }
          return (
            <li
              className="checkbox-list-items"
              key={employmentTypeId}
              onChange={onChangeEmployType}
            >
              <input
                type="checkbox"
                className="check-radio"
                id={employmentTypeId}
                value={employmentTypeId}
              />
              <label htmlFor={employmentTypeId} className="check-label">
                {label}
              </label>
            </li>
          )
        })}
      </ul>
      <hr />
      <h1>Salary Range</h1>
      <ul>
        {salaryRangesList.map(eachRange => {
          const {salaryRangeId, label} = eachRange
          const onChangeSalary = () => {
            changeSalaryRange(salaryRangeId)
          }
          return (
            <li key={salaryRangeId} onClick={onChangeSalary}>
              <input type="radio" name="salary" id={salaryRangeId} />
              <label htmlFor={salaryRangeId}>{label}</label>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export default FiltersSection
