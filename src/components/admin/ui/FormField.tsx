import { type ReactNode, type InputHTMLAttributes, type TextareaHTMLAttributes, useId } from 'react'

type BaseProps = {
  label: string
  hint?: string
  error?: string
  children?: ReactNode
}

// Label-above-input, helper text, inline error below — the one shape every
// admin form field uses (login, category, item, change-password).
export const FormField = ({ label, hint, error, children, id }: BaseProps & { id: string }) => (
  <div className={`adm-field ${error ? 'has-error' : ''}`}>
    <label className="adm-field__label" htmlFor={id}>{label}</label>
    {children}
    {error ? <span className="adm-field__error">{error}</span> : hint ? <span className="adm-field__hint">{hint}</span> : null}
  </div>
)

type TextFieldProps = BaseProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'id'>

export const TextField = ({ label, hint, error, ...inputProps }: TextFieldProps) => {
  const id = useId()
  return (
    <FormField label={label} hint={hint} error={error} id={id}>
      <input id={id} className="adm-input" {...inputProps} />
    </FormField>
  )
}

type TextAreaFieldProps = BaseProps & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'>

export const TextAreaField = ({ label, hint, error, ...textareaProps }: TextAreaFieldProps) => {
  const id = useId()
  return (
    <FormField label={label} hint={hint} error={error} id={id}>
      <textarea id={id} className="adm-textarea" rows={3} {...textareaProps} />
    </FormField>
  )
}
