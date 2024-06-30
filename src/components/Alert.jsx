import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimesCircle } from 'react-icons/fa';
import { CSSTransition } from 'react-transition-group';
import '../assets/Alert.css';

const alertStyles = {
  success: 'bg-white border-green-700 text-green-700',
  error:  'bg-white border-red-700 text-red-700',
  warning: 'bg-white border-yellow-700 text-yellow-700',
  info: 'bg-white border-blue-700 text-blue-700',
};

const iconStyles = {
  success: <FaCheckCircle className="w-5 h-5 inline mr-2" />,
  error: <FaTimesCircle className="w-5 h-5 inline mr-2" />,
  warning: <FaExclamationCircle className="w-5 h-5 inline mr-2" />,
  info: <FaInfoCircle className="w-5 h-5 inline mr-2" />,
};

const progressBarColors = {
  success: 'bg-green-700',
  error: 'bg-red-700',
  warning: 'bg-yellow-700',
  info: 'bg-blue-700',
};

function Alert({ type = 'info', message, duration = 3000 }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <CSSTransition
      in={visible}
      timeout={300}
      classNames="alert"
      unmountOnExit
    >
      <div className={`fixed top-20 right-4 max-w-sm z-50 border-l-4 p-4 mb-4 ${alertStyles[type]} rounded shadow-md transition-all duration-300 ease-in-out`}>
        <div className="flex items-center">
          {iconStyles[type]}
          <span>{message}</span>
        </div>
        <div className={`absolute bottom-0 left-0 h-1 ${progressBarColors[type]} progress-bar`} style={{ animationDuration: `${duration}ms` }} />      </div>
    </CSSTransition>
  );
}

export default Alert;
