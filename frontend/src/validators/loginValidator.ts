
import { isValidEmail, isStrongPassword } from "../utils/Validator"

export type LoginFormState = {
    email:string
    password:string
}

export type LoginErrors = Partial<Record<keyof LoginFormState, string>>

export function validateLoginForm(fromData: LoginFormState): LoginErrors{
    const errors: LoginErrors = {}
     if(!fromData.email.trim())
        errors.email = 'Email is required'
    else if(!isValidEmail(fromData.email))
        errors.email = 'Invalid email address'

    if(!fromData.password.trim())
        errors.password = 'Password is required'
    else if(!isStrongPassword(fromData.password))
        errors.password = 'Password must be at least 8 characters long'
    return errors
}