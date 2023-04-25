import { useDescription, useTsController } from "@ts-react/form"

function TextField() {
  const {
    field: { onChange, value },
    error
  } = useTsController<string>()
  const { label, placeholder } = useDescription()
  return (
    <>
      <div className="form-field">
        <label className="form-label">{label}</label>
        <div className="form-control">
          <input
            type="text"
            className="input-field"
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            value={value ? value : ""}
          />
        </div>
        {error?.errorMessage && (
          <span className="form-message error">{error?.errorMessage}</span>
        )}
      </div>
    </>
  )
}

export default TextField
