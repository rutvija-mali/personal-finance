import { useState, useMemo } from "react"
import { type SignUpFormState, validateSignUpForm } from "../validators/signupValidator"

export function useSignUpForm(){
    const [formData, setFormData] = useState<SignUpFormState>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agree: false
    })

    const [touched, setTouched] = useState<Partial<Record<keyof SignUpFormState, boolean>>>({})
   
    const errors = useMemo(()=>{
       return validateSignUpForm(formData)
    },[formData])

    function updateField <K extends keyof SignUpFormState>(
        key: K,
        value: SignUpFormState[K]
    ){
        setFormData((prev) => ({...prev,  [key]: value}))
    }

    function touchedField(field: keyof SignUpFormState){
        setTouched((prev) => ({...prev, [field]:true}))
    }
   
    const visibleErrors : typeof errors = {}

    for (const key of Object.keys(errors) as (keyof typeof errors)[]) {
        if (touched[key]) {
            visibleErrors[key] = errors[key]
        }
    }
    

    return {
       formData,
       errors,
       updateField,
       touchedField,
       visibleErrors
    }
}