"use client"

import {
  Checkbox as AriaCheckbox,
  CheckboxProps as AriaCheckboxProps
} from "react-aria-components"
import { Control } from "react-hook-form"

interface CheckboxFieldProps extends AriaCheckboxProps {
  name: string
  control: Control
  label?: string
  description?: string
  errorMessage?: string
}

function CheckboxField({ label, errorMessage, ...props }: CheckboxFieldProps) {
  return (
    <div className="form-field">
      <div className="form-control">
        <AriaCheckbox className="checkbox" {...props}>
          <div className="checkbox-indicator" aria-hidden="true">
            <svg viewBox="0 0 18 18" className="h-3 w-3">
              <polyline points="1 9 7 14 15 4" />
            </svg>
          </div>
          {label}
        </AriaCheckbox>
      </div>
      {errorMessage && (
        <span className="form-message error">{errorMessage}</span>
      )}
    </div>
    // <>
    //   <div className="form-field">
    //     <div className="flex items-center gap-1">
    //       <div className="form-control">
    //         <input
    //           type="checkbox"
    //           name={name}
    //           checked={value ? value : false}
    //           onChange={(e) => onChange(e.target.checked)}
    //         />
    //       </div>
    //       <label className="form-label">{label}</label>
    //     </div>
    //     {error?.errorMessage && (
    //       <span className="form-message error">{error?.errorMessage}</span>
    //     )}
    //   </div>
    // </>
  )
}

export default CheckboxField
