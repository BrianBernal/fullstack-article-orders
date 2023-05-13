import { toast } from "react-toastify";

function error(msg: string) {
  toast.error(msg, {
    position: toast.POSITION.BOTTOM_LEFT,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}

const notify = {
  error,
};

export default notify;
