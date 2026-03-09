import { useState , type FormEvent} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from 'lucide-react'
import FormField from '../components/FormField'
import { inputClass } from '../utils/InputClass'
import { useLoginForm } from '../hooks/useLoginForm'
import axios from 'axios'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL


export default function Login() {
  const navigate = useNavigate()

  const {formData, errors, updateField, touchedField, visibleErrors} = useLoginForm()


  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)


  async function onSubmit(e:FormEvent){
    e.preventDefault()
    setSubmitError(null)
    if(Object.keys(errors).length > 0) return

     try {
     const response = await axios.post(`${API_BASE_URL}/auth/login`,formData)
      alert("successful")
      //  navigate("/login", {replace:true})
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
            <h2 className="text-xl font-semibold tracking-tight text-text">Sign In</h2>
            <p className="text-sm text-text-muted">Start building better money habits today.</p>
          </header>

          <form className="mt-6 space-y-4" onSubmit={onSubmit} noValidate>

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
                      placeholder="Enter the password"
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


                {submitError ? (
                  <div className="rounded-lg border border-border bg-muted-surface p-3">
                    <p className="text-sm text-danger">{submitError}</p>
                  </div>
                ) : null}

                <button type="submit" className="btn-primary w-full" disabled={submitting}>
                  {submitting ? 'Sign In...' : 'Sign in'}
                  <ArrowRight className="size-4" />
                </button>
          </form>
        </section>

        <p className="mt-6 text-center text-sm text-text-muted">
          Don't have account?{' '}
          <Link className="font-medium text-primary hover:opacity-90" to="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

