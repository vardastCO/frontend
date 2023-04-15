import { useDescription, useTsController } from "@ts-react/form";

function TextField() {
  const { field, error } = useTsController<string>();
  const { label, placeholder } = useDescription();
  return (
    <>
      <div className="form-field">
        <label className="form-label">{label}</label>
        <div className="form-control">
          <input
            className="input-field"
            value={field.value ? field.value : ""}
            placeholder={placeholder}
            onChange={(e) => {
              field.onChange(e.target.value);
            }}
          />
        </div>
        {error?.errorMessage && (
          <span className="form-message error">{error?.errorMessage}</span>
        )}
      </div>
    </>
  );
}

export default TextField;
