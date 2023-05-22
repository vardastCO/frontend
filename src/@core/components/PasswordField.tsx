import { useDescription, useTsController } from "@ts-react/form"

interface PasswordFieldProps {
  direction?: "rtl" | "ltr"
  prefixAddon?: React.ReactNode
  suffixAddon?: React.ReactNode
  prefixElement?: React.ReactNode
  suffixElement?: React.ReactNode
}

function PasswordField(props: PasswordFieldProps) {
  const {
    field: { onChange, value, name },
    error
  } = useTsController<string>()
  const { label, placeholder } = useDescription()

  return (
    <>
      <div className="form-field">
        <label className="form-label">{label}</label>
        <div className="form-control" dir={props.direction}>
          <div className="input-group">
            {props.prefixAddon && (
              <div className="input-addon">{props.prefixAddon}</div>
            )}
            <div className="input-inset">
              {props.prefixElement && (
                <div className="input-element">{props.prefixElement}</div>
              )}
              <input
                type="password"
                name={name}
                className="input-field"
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                value={value ? value : ""}
              />
              {props.suffixElement && (
                <div className="input-element">{props.suffixElement}</div>
              )}
            </div>
            {props.suffixAddon && (
              <div className="input-addon">{props.suffixAddon}</div>
            )}
          </div>
        </div>
        {error?.errorMessage && (
          <span className="form-message error">{error?.errorMessage}</span>
        )}
      </div>
    </>
  )
}

export default PasswordField
