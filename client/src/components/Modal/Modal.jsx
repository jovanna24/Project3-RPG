import "./Modal.css";
import { useEffect } from "react";

function Modal({ title, body, showModal, setShowModal }) {
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
      document.querySelector(".modal").style.display = "block";
    } else {
      document.body.style.overflow = "auto";
      document.querySelector(".modal").style.display = "none";
    }
  }, [showModal]);

  return (
    <div 
    onClick={() => {
      setShowModal(false);
    }}
    className="modal">
      <div className="modal-content">
        <button
          onClick={() => {
            setShowModal(false);
          }}
          type="button"
          className="close-modal btn btn-secondary"
          data-bs-dismiss="modal"
        >
          X
        </button>

        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
        </div>
        <div className="modal-body">
          <h4>{body}</h4>
        </div>
      </div>
    </div>
  );
}

export default Modal;
