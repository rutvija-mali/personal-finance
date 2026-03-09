type FormFieldProps = {
    label: string
    error?: string
    children: React.ReactNode
  }
  
  export default function FormField({ label, error, children }: FormFieldProps) {
    return (
      <div>
        <label className="text-sm font-medium text-text">{label}</label>
  
        {children}
  
        {error && (
          <p className="mt-1 text-xs text-danger">
            {error}
          </p>
        )}
      </div>
    )
  }