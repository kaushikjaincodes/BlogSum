"use client"
import { FaGoogle } from 'react-icons/fa'
import { signIn } from "next-auth/react"
import { revalidatePath } from "next/cache";

const  LoginGoogle= ()=>{ 
    return (
        <div onClick={async ()=>{await signIn("google",{redirectTo:"/"});
            revalidatePath("/");}}>
            <FaGoogle className="text-white"/>
        </div>
    )
}

export default LoginGoogle