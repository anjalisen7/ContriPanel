import React from "react";

export default function Input(props) {
  return (
    <div className="mb-3">
      {props.label && (
        <label htmlFor={props.id} className="form-label">
          {props.label}
        </label>
      )}

      {props.type === "select" ? (
        <select
          id={props.id}
          className={props.className || "form-select"}
          value={props.value}
          onChange={props.onChange}
          required={props.required}
        >
          <option value="">-- Select --</option>
          {props.options &&
            props.options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
        </select>
      ) : (
        <input
          type={props.type || "text"}
          className={props.className || "form-control"}
          id={props.id}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          required={props.required}
          disabled={props.disabled}
          autocomplete={props.autocomplete}
        />
      )}
    </div>
  );
}
