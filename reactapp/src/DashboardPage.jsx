import React from 'react'

const DashboardPage = (props) => {
  return (
    <div>
      <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Go to Login</button>
    </div>
  )
}

export default DashboardPage
