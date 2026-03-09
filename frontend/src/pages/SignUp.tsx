import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from 'lucide-react'
import FormField from '../components/FormField'
import { inputClass } from '../utils/InputClass'
import { useSignUpForm } from '../hooks/useSignupForm'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
import axios from 'axios'



export default function SignUp() {
  const navigate = useNavigate()

  const {formData, errors, updateField, touchedField, visibleErrors} =useSignUpForm()


  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

   async function onSubmit(e:FormEvent){
     e.preventDefault()
     setSubmitError(null)
     if(Object.keys(errors).length > 0) return

      try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`,formData)
       console.log(response);
       
        navigate("/login", {replace:true})
      } catch (error) {  
        
        setSubmitError('Something went wrong. Please try again.', )
      }finally{
        setSubmitting(false)
      }
   }


  return (
    <div className="min-h-screen bg-bg px-6 py-12">
      <div className="mx-auto w-full max-w-md">

        <section className="card p-6 sm:p-8">
          <header className="space-y-1">
            <h2 className="text-xl font-semibold tracking-tight text-text">Sign up</h2>
            <p className="text-sm text-text-muted">Start building better money habits today.</p>
          </header>

          <form className="mt-6 space-y-4" onSubmit={onSubmit} noValidate>
                {/* Full name */}
                <FormField label='Full name' error={visibleErrors.name}>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      value={formData.name}
                      onChange={(e)=> updateField("name", e.target.value)}
                      onBlur={() => touchedField("name")}
                      className={`${inputClass(Boolean(visibleErrors.name))} pl-9`}
                      placeholder="Jane Doe"
                    />
                  </div>
                </FormField>

                {/* Email */}
                <FormField label='Email' error={visibleErrors.email}>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      onBlur={() => touchedField('email')}
                      className={`${inputClass(Boolean(visibleErrors.email))} pl-9`}
                      placeholder="jane@company.com"
                    />
                  </div>
                </FormField>

                {/* Password */}
                <FormField label='Password' error={visibleErrors.password}>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      value={formData.password}
                      onChange={(e) => updateField("password", e.target.value)}
                      onBlur={() => touchedField("password")}
                      className={`${inputClass(Boolean(visibleErrors.password))} pl-9 pr-10`}
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-md text-text-muted hover:bg-muted-surface hover:text-text"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>

                </FormField>

                {/* Confirm */}
                <FormField label='Confirm password' error={visibleErrors.confirmPassword}>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
                    <input
                      id="confirmPassword"
                      type={showConfirm ? 'text' : 'password'}
                      autoComplete="new-password"
                      value={formData.confirmPassword}
                      onChange={(e) => updateField("confirmPassword", e.target.value)}
                      onBlur={() => touchedField("confirmPassword")}
                      className={`${inputClass(Boolean(visibleErrors.confirmPassword))} pl-9 pr-10`}
                      placeholder="Repeat your password"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-md text-text-muted hover:bg-muted-surface hover:text-text"
                      onClick={() => setShowConfirm((v) => !v)}
                      aria-label={showConfirm ? 'Hide password' : 'Show password'}
                    >
                      {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </FormField>

                {/* Terms */}
                <div>
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={formData.agree}
                      onChange={(e) => updateField("agree", e.target.checked)}
                      onBlur={() => touchedField('agree')}
                      className="mt-1 size-4 rounded border-border-strong bg-surface text-primary focus:ring-2 focus:ring-primary/35"
                    />
                    <span className="text-sm text-text-muted">
                      I agree to the{' '}
                      <span className="text-text underline decoration-border-strong underline-offset-4">
                        Terms
                      </span>{' '}
                      and{' '}
                      <span className="text-text underline decoration-border-strong underline-offset-4">
                        Privacy Policy
                      </span>
                      .
                    </span>
                  </label>
                  {visibleErrors.agree ? (
                    <p className="mt-1 text-xs text-danger">{visibleErrors.agree}</p>
                  ) : null}
                </div>

                {submitError ? (
                  <div className="rounded-lg border border-border bg-muted-surface p-3">
                    <p className="text-sm text-danger">{submitError}</p>
                  </div>
                ) : null}

                <button type="submit" className="btn-primary w-full" disabled={submitting}>
                  {submitting ? 'Creating account…' : 'Create account'}
                  <ArrowRight className="size-4" />
                </button>
          </form>
        </section>

        <p className="mt-6 text-center text-sm text-text-muted">
          Already have an account?{' '}
          <Link className="font-medium text-primary hover:opacity-90" to="/login">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

