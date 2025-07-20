import { useState } from 'react'
import '../App.css';
import DashboardSummary from './DashboardSummary';

function Dashboard() {

  return (
    <>
    <div className='dashboard-main-container'>
      <h1 className='dashboard-header'> Hi, Joshua! </h1>
      <DashboardSummary/>
    </div>
      
    </>
  )
}

export default Dashboard;