import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import '../css/navbar.css'

export default function Navbar(props) {
    let location = useLocation();
    useEffect(() => {
    }, [location]);
    const [mobile,setMobile]=useState('');
    const HandleClick=()=>{
        if(mobile==='show'){
            setMobile('');
        }
        else{
            setMobile('show');
        }
        
    }
    const HandleLogout=()=>{
        localStorage.removeItem('token');

    }
   
    const [modeLabel,setModeLabel]=useState('Dark Mode')
    const HandleMode=()=>{
        props.toggleMode();
        if(props.mode==='dark'){
            setModeLabel('Light Mode');
        }
        else{
            setModeLabel('Dark Mode');
        }
    }
    return (
        <>
            <div className="navbar" style={props.mode==='dark'?{backgroundColor:'black'}:null}>
                <div className="hamburger">
                    <button id="hamburger-btn" onClick={HandleClick}  style={props.mode==='dark'?{backgroundColor:'black'}:null}    ><img  src={require("./img/icons8-hamburger-menu-64.png")}alt="Hamburger"/></button>
                </div>
                <h1>iNoteBook</h1>
                <ul className={`left nav-list ${mobile}`}>
                    
                    <li><Link to="/" className= {`${location.pathname==='/'?'active':''}`}>Home</Link></li>
                    <li><Link to="/about" className= {`${location.pathname==='/about'?'active':''}`}>About</Link></li>

                </ul>
                <ul className={`right nav-list ${mobile}`}>
                    <li id="switch"><div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={HandleMode} />
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault" style={{color:'#a21caf'} }>{modeLabel}</label>
                    </div></li>
                    {!localStorage.getItem('token')?<div className={`right nav-list ${mobile}`}>
                    <li><Link to="/login" className= {`${location.pathname==='/login'?'active':''}`}>Login</Link></li>
                    <li><Link to="/signup" className= {`${location.pathname==='/signup'?'active':''}`}>Sign Up</Link></li>
                    </div>: <li><Link onClick={HandleLogout} to="/login" className= {`${location.pathname==='/login'?'active':''}`}>Logout</Link></li>}
                    
                    
                </ul>
            </div>
        </>

    )
}
