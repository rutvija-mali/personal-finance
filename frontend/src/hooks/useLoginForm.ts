import { useState, useMemo } from "react";
import {type LoginFormState, validateLoginForm } from "../validators/loginValidator";

export function useLoginForm(){
    const [formData, setFormData] = useState<LoginFormState>({
        email:'',
        password:''
    })

    const [touched, setTouched] = useState<Partial<Record<keyof LoginFormState, boolean>>>({})

    const errors = useMemo(()=>{
        return validateLoginForm(formData)
    },[formData])

    function updateField< K extends keyof LoginFormState>(
        key: K,
        value: LoginFormState[K]
    ){
        setFormData((prev)=>({ ...prev, [key]:value}))
    }

    function touchedField (field: keyof LoginFormState){
        setTouched((prev) => ({ ...prev, [field]:true }))
        
        
    }
    const visibleErrors :typeof errors = {}

    for( const key of Object.keys(errors) as (keyof typeof errors)[]){
       if(touched[key]){
         visibleErrors[key] = errors[key]
       }
    }
    return{
        formData,
        errors,
        updateField,
        touchedField,
        visibleErrors

    }
}