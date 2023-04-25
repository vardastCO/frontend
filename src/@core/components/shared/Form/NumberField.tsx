import { useDescription, useTsController } from "@ts-react/form"

function NumberField() {
  const {
    field: { onChange, value },
    error
  } = useTsController<number>()
  const { label, placeholder } = useDescription()
  return (
    <>
      <div className="form-field">
        <label className="form-label">{label}</label>
        <div className="form-control">
          <input
            type="number"
            className="input-field"
            placeholder={placeholder}
            value={value !== undefined ? value + "" : ""}
            onChange={(e) => {
              const value = parseInt(e.target.value)
              if (isNaN(value)) onChange(undefined)
              else onChange(value)
            }}
          />
        </div>
        {error?.errorMessage && (
          <span className="form-message error">{error?.errorMessage}</span>
        )}
      </div>
    </>
  )
}

export default NumberField
