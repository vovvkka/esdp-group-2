import {toast} from "react-toastify";

export const addNotification = (message, type, options) => {
    const defaultOptions = {
        position: "bottom-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
    };

    return () => {
        switch (type) {
            case 'info':
                toast.info(message, {...defaultOptions, ...options});
                break;
            case 'success':
                toast.success(message, {...defaultOptions, ...options});
                break;
            case 'warn':
                toast.warn(message, {...defaultOptions, ...options});
                break;
            case 'error':
                toast.error(message, {...defaultOptions, ...options});
                break;
            default:
                console.error('Incorrect type');
        }
    }
};