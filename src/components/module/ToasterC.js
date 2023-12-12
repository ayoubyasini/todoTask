import { Toaster } from "react-hot-toast";

function ToasterC() {
  return (
    <Toaster
      toastOptions={{
        success: {
          style: {
            background: "#323232",
            color: "#fff",
            border: "3px solid #3c3c3c",
          },
        },
        error: {
          style: {
            background: "#323232",
            color: "#fff",
            border: "3px solid #3c3c3c",
          },
        },
      }}
    />
  );
}

export default ToasterC;
