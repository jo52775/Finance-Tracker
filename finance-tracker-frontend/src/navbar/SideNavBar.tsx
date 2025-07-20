import { useState } from 'react'
import '../App.css';
import NavBarItem from './NavbarItem';

function SideNavBar() {

  const [activeItem, setActiveItem] = useState('Dashboard');

  return (
    <div className='side-nav-container'>
      <NavBarItem text='Dashboard' activeItem={activeItem} setActiveItem={setActiveItem}/>
      <NavBarItem text='Add Transaction' activeItem={activeItem} setActiveItem={setActiveItem}/>
      <NavBarItem text='Transactions' activeItem={activeItem} setActiveItem={setActiveItem}/>
      <NavBarItem text='My Monthly Budget' activeItem={activeItem} setActiveItem={setActiveItem}/>
      <NavBarItem text='Insights & Projections' activeItem={activeItem} setActiveItem={setActiveItem}/>
    </div>
  )
}

export default SideNavBar;