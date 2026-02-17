import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

interface ToastNotificationProps {
  show: boolean;
  feedback: string | null;
  feedbackType: "success" | "error" | null;
}

export default function ToastNotification({ show, feedback, feedbackType }: ToastNotificationProps) {
  if (!show || !feedback) return null;

  return (
    <div className="toast toast-center toast-top z-50">
      <div className={`alert ${feedbackType === "success" ? "alert-success" : "alert-error"} flex items-center gap-2`}>
        {feedbackType === "success" ? <FaCheckCircle className="text-lg" /> : <FaTimesCircle className="text-lg" />}
        <span>{feedback}</span>
      </div>
    </div>
  );
}