import { useState } from 'react'
import '../App.css'

type DashBoardSummaryEntryProps = {
  entryType: string;
  amount: string;
};

function DashboardSummary() {
    //Dummy values for now
    let income = '120,000.00';
    let expenses = '8,000';
    let rem = '1,500';


  return (
    <>
      <div className='dashboard-summary-container'>
            <DashboardSummaryEntry entryType='Income' amount={income}/> 
            <DashboardSummaryEntry entryType='Expenses' amount={expenses}/>
            <DashboardSummaryEntry entryType='Rem. Budget' amount={rem}/>
      </div>
    </>
  )
}

function DashboardSummaryEntry( {entryType, amount}: DashBoardSummaryEntryProps ){

    return(
            <div className='dashboard-summary-entry-container'>
                <h2 className='summary-entry-category'> {entryType} </h2>
                <h2 className='summary-entry-text'> ${amount} </h2>
            </div>
    )
}

export default DashboardSummary;