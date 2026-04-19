import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { navItems } from '../../static/data';
import styles from '../../styles/styles';

const Navbar = ({active}) => {
  const [activeIndex, setActiveIndex] = useState(null);  

  return (
    <div className={`block 800px:${styles.noramlFlex}`}>
      {navItems && navItems.map((i, index) => (
        <div className="flex mr-20" key={index}> 
          <Link
            to={i.url}
            className={`${activeIndex === index ? "text-[#03037B]" : "text-black 800px:text-[#fff]"} pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer text-xl`}
            onClick={() => setActiveIndex(index)} 
          >
            {i.title}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Navbar;
