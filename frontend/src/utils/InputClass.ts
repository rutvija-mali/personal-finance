export function inputClass(hasError: boolean) {
    const base =
      'mt-1 w-full rounded-lg border bg-surface px-3 py-2 text-sm text-text ' +
      'placeholder:text-text-muted shadow-sm outline-none transition ' +
      'focus:ring-2 focus:ring-primary/35'
    const ok = 'border-border focus:border-primary'
    const bad = 'border-danger focus:border-danger focus:ring-danger/25'
    return `${base} ${hasError ? bad : ok}`
  }