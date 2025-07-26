import { useState } from 'react'
import '../App.css';
import DashboardSummary from './DashboardSummary';
import AddTransactionButton from './AddTransactionButton';

function Dashboard() {

  return (
    <>
    <div className='dashboard-main-container'>
      <h1 className='dashboard-header'> Hi, Joshua! </h1>
      <DashboardSummary/>
      <AddTransactionButton/>
    </div>
      
    </>
  )
}

export default Dashboard;