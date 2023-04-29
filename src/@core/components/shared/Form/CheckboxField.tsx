import { useDescription, useTsController } from "@ts-react/form"

function CheckboxField() {
  const {
    field: { onChange, value, name },
    error
  } = useTsController<boolean>()
  const { label, placeholder } = useDescription()
  return (
    <>
      <div className="form-field">
        <div className="flex items-center gap-1">
          <div className="form-control">
            <input
              type="checkbox"
              name={name}
              checked={value ? value : false}
              onChange={(e) => onChange(e.target.checked)}
            />
          </div>
          <label className="form-label">{label}</label>
        </div>
        {error?.errorMessage && (
          <span className="form-message error">{error?.errorMessage}</span>
        )}
      </div>
    </>
  )
}

export default CheckboxField
