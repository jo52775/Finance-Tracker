import { useState } from 'react'
import '../App.css';
import DashboardSummary from './DashboardSummary';
import AddTransactionButton from './AddTransactionButton';
import TransactionModal from '../transactionModal/AddTransactionModal';

function Dashboard() {

  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
    <div className='dashboard-main-container'>
      <h1 className='dashboard-header'> Hi, Joshua! </h1>
      <DashboardSummary/>
      <AddTransactionButton setOpen={setOpenModal}/>
      {openModal && <TransactionModal open={openModal} setOpen={setOpenModal}/>}
    </div>
      
    </>
  )
}

export default Dashboard;