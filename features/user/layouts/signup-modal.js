import { useState } from "react";
import Link from "next/link";
import { studentURL, userURL } from "../../utils/links";
import Image from "next/image";
import InputGroup from "../components/input-group";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons"
import Authentication from "../../../pages/api/student-auth/AuthService"
// import { url } from "inspector";
import Spinner from '../../ui/spinner'

export default function SignupForm({
    handlePushPopup, inputOTP, redirect
}) {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError]= useState(undefined)
    const [isLoading, setIsLoading] = useState(false)
    async function handleSubmitSignup(e){
        e.preventDefault()
        setIsLoading(true)
        const response = await Authentication.register(id, password).then(res=>{
            handlePushPopup()
            inputOTP({"id":id,"password": password})
            redirect(userURL.login)
        })
        .catch((error)=>{
            if( error.response ){
                setPasswordError(error.response.data)
                
            }
          })
        setIsLoading(false)
        return response
    }

    return (
        <form onSubmit={handleSubmitSignup} className='relative mt-1 pt-8 flex flex-col px-4'>
            <h3 className='mb-8 w-72 text-b flex flex-col items-center text-2xl font-bold'>
                <Image 
                    src="/svg/ID.svg"
                    width={80}
                    height={80}
                    alt='welcome pic'
                />
                Sign up
            </h3>
            
            <InputGroup  
                name="identifier"
                type="text"
                placeholder="N19DCCN001"
                value={id}
                icon={faUser}
                handleChange={nextID => setId(nextID)}
            />
            <InputGroup  
                name="password"
                type="password"
                placeholder="At least 6 characters"
                value={password}
                icon={faKey}
                handleChange={nextPassword => setPassword(nextPassword)}
            />
            <InputGroup  
                name="confirm password"
                type="password"
                placeholder="Enter your password again"
                value={confirmPassword}
                icon={faKey}
                handleChange={nextPassword => setConfirmPassword(nextPassword)}
                error={passwordError}
            /> 
            {isLoading && 
            <>
                <Spinner contentIsLoading="Please check your mail"/>
                <div className="mt-14 text-primary text-center w-full">Please check your mail</div>
            </>}
            <div className='absolute bottom-0'>
                <button 
                    className='w-72 py-2 bg-p text-white font-bold rounded-md'>
                    Create account
                </button>
                <p className='mt-1 text-center text-sm'>Already have an account?
                    {' '}
                    <Link href={userURL.login} className="underline">Login</Link>
                </p>
            </div>  
        </form>
    )
}