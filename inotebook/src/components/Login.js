import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import '../css/Addnote.css'
import Addnote from './Addnote';

export default function Login(props) {
    const [credential, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();


    const onChange = (e) => {
        setCredentials({ ...credential, [e.target.name]: e.target.value });

    }
    const HandleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:8000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credential.email, password: credential.password })
        });
        const json = await response.json()
        console.log(json.authToken)
        if (json.success) {
            //Save the Token And Redirect
            localStorage.setItem('token', json.authToken);
            props.showAlert("Login Successfully", 'success');
            navigate('/');

        }
        else {
            props.showAlert('Invalid Credentials', 'danger')
        }

    }
    return (
        <div className='page'>
            <div class="form-container" style={{display:"flex", minWidth:"22rem",marginTop:"6rem"}}>
                <form class="form" method="POST" onSubmit={HandleSubmit}>
                    <h1 style={{padding:"1rem",fontWeight:"bolder", textDecoration:"underline"}}>Login</h1>
                    <div class="tag form-element">
                        <label for="emial">Email</label>
                        <input type="email" name="email" id="email" value={credential.email} onChange={onChange} />
                    </div>
                    <div class="title form-element">
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password"  value={credential.password} onChange={onChange} />
                    </div>

                    <button type="submit" id="submit-btn">Submit</button>
                </form>
        </div> 
        <div className="border" style={{backgroundColor:"#164e63",position:"absolute",top:"30%",left:'40%',marginRight:"4rem",borderRadius:"20px",width:"40rem"}}>
            <p style={{fontSize:"50px",color:"#fcd34d",padding:"2rem"} }>Take control of your ideas and stay focused with QuickNote.
            </p>
          
            </div>     
    </div>
    )
}
