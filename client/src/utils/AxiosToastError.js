import toast from "react-hot-toast"

const AxiosToastError = (error) => {
    console.log("🔥 AxiosToastError called:", error?.response?.data?.message)
    const errorMessage = error?.response?.data?.message || "Something went wrong"
    
    // Prevent duplicate error toasts with same message
    toast.error(errorMessage, {
        id: errorMessage // This prevents duplicate toasts with same message
    });
}

export default AxiosToastError