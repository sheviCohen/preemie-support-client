import React, { useState } from "react";
import {useNavigate } from "react-router";
import { useLogin } from "../api/auth";
export default function LoginForm()
{
    
const[email,setEmail]=useState("");
const [password,setPassword]=useState("");
const login=useLogin();
const navigate=useNavigate();
const handleSubmit=(e:React.SubmitEvent)=>
{
    e.preventDefault();
    login.mutate(
        {email,password},
        {onSuccess:()=> navigate("/",{replace:true})}
    );
    
}

    return(

        <form className="flex animate-fade-up flex-col gap-4" onSubmit={handleSubmit}>
            <input className="field" type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="מייל" required/>
            <input className="field" type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="סיסמה" required/>
            <button className="btn-primary mt-2" disabled={login.isPending}>{login.isPending?"...מתחבר":"התחבר"}</button>
            {login.isError  && <p className="rounded-xl bg-rose-50 px-3 py-2 text-center text-sm text-rose-600">{login.error.message}</p>}
        </form>
    )
}