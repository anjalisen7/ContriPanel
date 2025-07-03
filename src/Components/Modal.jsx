import React, { useEffect, useRef } from "react";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min";
import Input from "./Input"; // Your reusable input component

export default function Modal({
  show,
  onClose,
  onSubmit,
  title = "Modal Title",
  fields = [],
  submitText = "Submit",
  cancelText = "Cancel",
  data,
  setData,
}) {
  const modalRef = useRef(null);
  const bsModal = useRef(null);

  // Initialize Bootstrap modal on mount
  useEffect(() => {
    if (modalRef.current) {
      bsModal.current = new bootstrap.Modal(modalRef.current, { backdrop: "static" });
    }
  }, []);

  // Show/hide modal based on prop
  useEffect(() => {
    if (bsModal.current) {
      if (show) {
        bsModal.current.show();
      } else {
        bsModal.current.hide();
      }
    }
  }, [show]);

  // Hide modal and notify parent
  const handleClose = () => {
    bsModal.current?.hide();
    onClose(); // close state control in parent
  };

  // Handle input change
  const handleChange = (e, name) => {
    const value =
      e.target.type === "checkbox"
        ? e.target.checked
          ? [...(data[name] || []), e.target.value]
          : (data[name] || []).filter((v) => v !== e.target.value)
        : e.target.value;

    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <div className="modal fade" ref={modalRef} tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <form className="modal-content" onSubmit={onSubmit}>
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>

          <div className="modal-body">
            {fields.map((field, index) => (
              <div className="mb-3" key={index}>
                {field.type === "checkbox-list" ? (
                  <>
                    <label className="form-label">{field.label || field.name}</label>
                    <div className="border rounded p-2" style={{ maxHeight: 150, overflowY: "auto" }}>
                      {field.options?.map((opt) => (
                        <div className="form-check" key={opt.value}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`checkbox-${opt.value}`}
                            value={opt.value}
                            checked={(data[field.name] || []).includes(opt.value)}
                            onChange={(e) => handleChange(e, field.name)}
                          />
                          <label className="form-check-label" htmlFor={`checkbox-${opt.value}`}>
                            {opt.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <Input
                    label={field.label}
                    name={field.name}
                    type={field.type}
                    value={data[field.name] || ""}
                    onChange={(e) => handleChange(e, field.name)}
                    required={field.required}
                    options={field.options}
                    placeholder={field.placeholder}
                    disabled={field.disabled}
                    autoComplete={field.autoComplete}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>
              {cancelText}
            </button>
            <button type="submit" className="btn btn-primary">
              {submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
