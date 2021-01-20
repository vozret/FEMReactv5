import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  // I always want to refer to the same element
  // I want to destroy modal when I pop the modal
  // else: memory leak, clean up garbage
  const elRef = useRef(null);

  if (!elRef.current) {
    const div = document.createElement("div");
    elRef.current = div;
  }

  // we want the effect to run once -> , []
  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);

    // componentUnmount for hooks
    return () => {
      modalRoot.removeChild(elRef.current);
    };
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
