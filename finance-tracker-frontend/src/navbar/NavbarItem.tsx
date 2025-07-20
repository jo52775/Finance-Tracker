import { useState } from "react";
import "../App.css";

type NavBarItemProps = {
  text: string;
  activeItem: string;
  setActiveItem: (item: string) => void;
};

function NavBarItem({ text, activeItem, setActiveItem }: NavBarItemProps) {
    
    const isActive = (text === activeItem);

    return (
    <div className="navbar-item-container" onClick={() => setActiveItem(text)}>
      <a className={`navbar-item-text${isActive ? '-active' : ''}`}> {text} </a>
    </div>
  );
}

export default NavBarItem;
