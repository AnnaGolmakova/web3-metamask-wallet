import ErrorIcon from "../../assets/error-icon.svg";
import "./ErrorMessage.css";

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="error-message">
      <img src={ErrorIcon} alt="Error" />
      <span>{message}</span>
    </div>
  );
};
