import {useState, useEffect} from 'react';
import './Select.css';


type EmailInputProps = {
    onEmailChange: (year_change: React.ChangeEvent<HTMLInputElement>) => void;
    onEmailValidation: (validation: boolean) => void;
    loginEmail: string, 
    isFileProcessed: boolean;
    isFileProcessing: boolean;
};

function Email({onEmailChange, onEmailValidation, loginEmail, isFileProcessed, isFileProcessing}: EmailInputProps){

    const [email, setEmail] = useState<string>('');
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        onEmailChange(event);
    };

    const [isFocused, setIsFocused] = useState<boolean>(false);
    const handleFocus = () =>{
        setIsFocused(true);
    }
    const handleBlur = () =>{
        setIsFocused(false);
    }
    
    const [isValid, setIsValid] = useState<boolean>(true);
    const handleEmailValidation = (validation: boolean) => {
        setIsValid(validation);
        onEmailValidation(validation);
    }
    useEffect(()=>{
        const debounceTimer = setTimeout(() => {
            handleEmailValidation(validateEmail(email, loginEmail));
          }, 500);
      
        return () => clearTimeout(debounceTimer);
    },[isFocused, email]);


    useEffect(()=>{
        setEmail('');
    },[isFileProcessed]);

    return(
        <div className='Select'>
          <div
            style={{display: 'flex', flexDirection: 'column', 
            justifyContent: 'center', alignItems: 'center',
            }}
          >
            <label htmlFor="email-input">Email Address:</label>
            <input 
            type="text" value={email}
            placeholder="Enter your email"
            disabled={isFileProcessing}
            onChange={handleEmailChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            >
            </input>
            {!isValid && isFocused && <p style={{padding: '0', margin: '0', fontSize: '10px', color: 'rgb(255, 188, 72'}}>Please make sure to enter the email used on log-in.</p>}
          </div>
        </div>
    );
}

function validateEmail(inputEmail: string, loginEmail: string){
    if(inputEmail == '') return true;
    else if(!inputEmail.includes('@')) return false;
    else if(inputEmail != loginEmail) return false;
    return true;
}


export default Email;