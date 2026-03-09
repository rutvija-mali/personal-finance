import { isValidEmail, isStrongPassword } from "../utils/Validator"
export type SignUpFormState = {
    name: string
    email: string
    password: string
    confirmPassword: string
    agree: boolean
}

export type SignupErrors  = Partial<Record<keyof SignUpFormState, string>>

export function validateSignUpForm(formData: SignUpFormState): SignupErrors{
    const errors: SignupErrors = {}

    if(!formData.name.trim())
        errors.name = 'Full name is required'

    if(!formData.email.trim())
        errors.email = 'Email is required'
    else if(!isValidEmail(formData.email))
        errors.email = 'Invalid email address'

    if(!formData.password.trim())
        errors.password = 'Password is required'
    else if(!isStrongPassword(formData.password))
        errors.password = 'Password must be at least 8 characters long'

    if(!formData.confirmPassword.trim())
        errors.confirmPassword = 'Confirm password is required'
    else if(formData.confirmPassword !== formData.password)
        errors.confirmPassword = 'Passwords do not match'

    return errors;
}