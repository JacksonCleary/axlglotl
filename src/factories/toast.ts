import { type AlertOptions } from "~/models";
import toast, { type ToastOptions } from "react-hot-toast";

// https://react-hot-toast.com/docs/toast
export function createToast(message: string, severity: AlertOptions = "info") {
  const options: ToastOptions = {
    duration: 4000,
    position: "top-right",

    // Styling
    style: {},
    className: "",

    // Custom Icon
    // icon: "🌍",
  };

  let fn;

  switch (severity) {
    case "error":
      fn = toast.error;
      break;
    case "success":
      fn = toast.success;
      break;
    default:
      fn = toast;
      break;
  }

  fn(message, options);
}
