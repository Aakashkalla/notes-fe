import {useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../lib/axios";

const Register = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    async function registerUser(){
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if(!email || !password){
            setError("Email and Password Are Both Required");
            return;
        }

        setError(null);
        setLoading(true);
        try{
            await api.post('/auth/register', {
                email,
                password
            })
            navigate('/login')
        }catch(e){
            setError("Check Email and Password")
        }finally{
            setLoading(false)
        }
    }
    return (
        <div>
            <label>Email</label>
            <input ref={emailRef} type="email" placeholder="Email"/>
            <label>Password</label>
            <input ref={passwordRef} type="password" placeholder="Password"/>
            <button disabled={loading} onClick={()=>registerUser()}>{loading ? "Registering..." : "Submit"}</button>
            {error && <p>{error}</p>}
        </div>
    )
}

export default Register
