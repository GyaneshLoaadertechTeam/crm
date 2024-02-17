
/* SidebarStyles.css */

/* Sidebar.js */
"use client"
import React, { useState } from 'react';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBookOpenReader, faMessage, faPencil, faQuestion, faRoadLock, faRocket, faUniversalAccess, faUser, faUsersViewfinder, faWallet } from '@fortawesome/free-solid-svg-icons';
import './page.css';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const images = ['assets/images/logo.png'];


    const handleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div style={{ display: "inline-block" }}>
                <div className={`header ${isOpen ? 'open' : ''}`}>
                </div>
                <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                    <div>
                    </div>
                            <div className='link-with-icon'>
                                <FontAwesomeIcon icon={faBars} />
                                <Link href={'/dashboard'}>Dashboard</Link>
                            </div>
                    <div >
                        <div className="link-with-icon">
                            <FontAwesomeIcon icon={faPencil} />
                            <Link href={'/lead/leadTable'}>Lead</Link>
                        </div>
                        <div className="link-with-icon">
                            <FontAwesomeIcon icon={faUniversalAccess} />
                            
                            <Link href={'/lead/leadTable'}>Sales</Link>
                        </div>

                        <div className="link-with-icon">
                        <FontAwesomeIcon icon={faPencil} />

                            {/* <FontAwesomeIcon icon={faUser} /> */}
                            <Link href={'/driverLead/driverLeadTable'}>Driver Lead</Link>
                        </div>

                        <div className="link-with-icon">
                            <FontAwesomeIcon icon={faUser} />
                            <Link href={'/'}>Hr</Link>
                        </div>

                        <div className="link-with-icon">
                            <FontAwesomeIcon icon={faBars} />
                            <Link href={'/'}>User</Link>
                        </div>
                        <div className="link-with-icon">
                            <FontAwesomeIcon icon={faRoadLock} />
                            <Link href={'/Role/addRole'}>Role</Link>
                        </div>
                        <div className="link-with-icon">
                            <FontAwesomeIcon icon={faBookOpenReader} />
                            <Link href={'/'}>Leaders</Link>
                        </div>
                        <div className="link-with-icon">
                            <FontAwesomeIcon icon={faUsersViewfinder} />
                            <Link href={'/'}>Venders</Link>
                        </div>
                        <div className="link-with-icon">
                            <FontAwesomeIcon icon={faMessage} />
                            <Link href={'/faq/faqTable'}>FaQ</Link>
                        </div> <div className="link-with-icon">
                            <FontAwesomeIcon icon={faWallet} />
                            <Link href={'/'}>Wallet</Link>
                        </div>
                    </div>
                </div>
                <div className={`content ${isOpen ? 'open' : ''}`}>
                </div>
            </div>
        </>
    );
}

