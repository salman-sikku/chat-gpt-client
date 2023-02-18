import React, { useState } from 'react'

import logo from './images/logo.png'

const Sidebar = (props) => {
    const [mode, setmode] = useState(true);
    const [openSty, setopenSty] = useState({
        color: '#fff'
    });
    const [hide, sethide] = useState(false);

    return (
        <>
            <div className='openBtn' onClick={() => sethide(true)} ><i className="bi bi-list" style={openSty}></i></div>
            <div className={`sidebar-div ${hide ? 'sideOpen' : ' sideClosed'}`}>
                <div className='closedBtn' onClick={() => sethide(false)}><i className="bi bi-x-lg" style={openSty}></i></div>
                <div className='imgclass'>
                    <img src={logo} alt="logo" />
                </div>
                <div className='list-div'>
                    <ul>
                        <li onClick={() => props.daletData()}> <spna><i className="bi bi-trash3"></i></spna> clear conversations</li>
                        <li onClick={() => setmode(!mode)}>
                            {
                                mode ? <p onClick={() => props.setlightmode({ background: 'white' }, props.setlightmodeinInpu({ background: '#dcdde1', color: 'black' }, setopenSty({ color: 'black' })))}><span><i className="bi bi-brightness-high"></i></span> <span>Light mode</span></p> : <p onClick={() => props.setlightmode({ background: '#1c1c25' }, props.setlightmodeinInpu({ background: '#2b2b36', color: '#fff' }, setopenSty({ color: '#fff' })))}><span><i className="bi bi-moon"></i></span> <span>Dark mode</span></p>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Sidebar
