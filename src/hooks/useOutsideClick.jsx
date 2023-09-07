import { useEffect } from "react";

export default function useOutsideClick(ref, cb) {
  useEffect(() => {
    const handleOutsideClicked = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        cb();
      }
    };
    document.addEventListener("mousedown", handleOutsideClicked);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClicked);
    };
  }, [ref, cb]);
}
