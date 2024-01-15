import { IModal } from "@/interfaces/Modal";
import { useState } from "react";

export default function Modal({ id, title, children, button }: IModal) {
  const [active, setActive] = useState(false);

  async function handleButtonClick() {
    if(!button) return;
    if (!button.onClick) return setActive(false);

    const result = await button.onClick();
    setActive(result);
  }

  return (
    <div
      className={`modal fade ${active && "show"}`}
      style={{ display: active ? "block" : "none" }}
      aria-modal="true"
      role="dialog"
      id={id}
    >
      <div
        className="modal-dialog modal"
        style={{ display: active ? "block" : "none" }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">{title}</h4>
            <button
              id={`${id}-toggle`}
              onClick={() => setActive((active) => !active)}
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body overflow-auto" style={{ maxHeight: "70vh" }}>
            {children}
          </div>
          <div className="modal-footer justify-content-between">
            <button
              type="button"
              className="btn btn-default"
              data-dismiss="modal"
              onClick={() => setActive((active) => !active)}
            >
              Fechar
            </button>
            {button && (
              <button
                type="button"
                className={`btn ${button.type ? `btn-${button.type}` : "btn-primary"}`}
                onClick={handleButtonClick}
              >
                {button.label}
              </button>
            )}
          </div>
        </div>
        {/* /.modal-content */}
      </div>
      {/* /.modal-dialog */}
    </div>
  );
}
