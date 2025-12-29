import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

const Alert = ({ type = 'info', message, onClose, duration = 5000 }) => {
  const types = {
    success: {
      icon: CheckCircle,
      className: 'bg-green-50 border-green-500 text-green-800',
      iconColor: 'text-green-500',
    },
    error: {
      icon: XCircle,
      className: 'bg-red-50 border-red-500 text-red-800',
      iconColor: 'text-red-500',
    },
    warning: {
      icon: AlertCircle,
      className: 'bg-yellow-50 border-yellow-500 text-yellow-800',
      iconColor: 'text-yellow-500',
    },
    info: {
      icon: AlertCircle,
      className: 'bg-blue-50 border-blue-500 text-blue-800',
      iconColor: 'text-blue-500',
    },
  };

  const { icon: Icon, className, iconColor } = types[type];

  // Auto close after duration
  if (duration && onClose) {
    setTimeout(onClose, duration);
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={`flex items-start gap-3 p-4 rounded-lg border-l-4 shadow-lg ${className}`}
      >
        <Icon className={`flex-shrink-0 ${iconColor}`} size={20} />
        <p className="flex-1 text-sm font-medium">{message}</p>
        {onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 hover:opacity-70 transition-opacity"
          >
            <X size={18} />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Alert;
