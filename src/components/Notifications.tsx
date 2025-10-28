"use client";

import { useState, useEffect } from "react";
import { FiBell, FiX, FiCheck, FiInfo, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { Notification, NotificationType } from "@/types";

interface NotificationProps {
  notification: Notification;
  onClose: (id: string) => void;
  onMarkRead: (id: string) => void;
}

interface ToastNotificationProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

// Individual Notification Component
export function NotificationItem({ notification, onClose, onMarkRead }: NotificationProps) {
  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'booking_confirmed':
        return <FiCheckCircle className="h-5 w-5 text-green-500" />;
      case 'booking_cancelled':
        return <FiAlertCircle className="h-5 w-5 text-red-500" />;
      case 'payment_received':
        return <FiCheckCircle className="h-5 w-5 text-blue-500" />;
      case 'review_received':
        return <FiInfo className="h-5 w-5 text-yellow-500" />;
      default:
        return <FiBell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  };

  return (
    <div className={`p-4 border-l-4 ${
      notification.isRead 
        ? 'border-gray-200 bg-gray-50' 
        : 'border-primary-500 bg-white'
    } rounded-r-lg shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-start space-x-3">
        {getIcon(notification.type)}
        <div className="flex-1 min-w-0">
          <h4 className={`text-sm font-medium ${
            notification.isRead ? 'text-gray-700' : 'text-gray-900'
          }`}>
            {notification.title}
          </h4>
          <p className={`text-sm mt-1 ${
            notification.isRead ? 'text-gray-500' : 'text-gray-600'
          }`}>
            {notification.message}
          </p>
          <p className="text-xs text-gray-400 mt-2">
            {getTimeAgo(notification.createdAt)}
          </p>
        </div>
        <div className="flex space-x-1">
          {!notification.isRead && (
            <button
              onClick={() => onMarkRead(notification.id)}
              className="p-1 text-gray-400 hover:text-green-600 transition-colors"
              title="Mark as read"
            >
              <FiCheck className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={() => onClose(notification.id)}
            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
            title="Dismiss"
          >
            <FiX className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Toast Notification Component
export function ToastNotification({ type, title, message, isVisible, onClose }: ToastNotificationProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // Auto-dismiss after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FiCheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <FiAlertCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <FiAlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'info':
        return <FiInfo className="h-5 w-5 text-blue-500" />;
      default:
        return <FiBell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-sm w-full border rounded-lg shadow-lg ${getStyles()} transform transition-transform duration-300 ${
      isVisible ? 'translate-x-0' : 'translate-x-full'
    }`}>
      <div className="p-4">
        <div className="flex items-start space-x-3">
          {getIcon()}
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium">{title}</h4>
            <p className="text-sm mt-1 opacity-90">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 opacity-70 hover:opacity-100 transition-opacity"
          >
            <FiX className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Notification Center Component
export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      userId: '1',
      type: 'booking_confirmed',
      title: 'Booking Confirmed',
      message: 'Your appointment with Ahmed Hassan is confirmed for today at 2:00 PM',
      isRead: false,
      createdAt: new Date(Date.now() - 30 * 60 * 1000) // 30 minutes ago
    },
    {
      id: '2',
      userId: '1',
      type: 'payment_received',
      title: 'Payment Processed',
      message: 'Payment of ₦4,500 has been successfully processed',
      isRead: false,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
    },
    {
      id: '3',
      userId: '1',
      type: 'review_received',
      title: 'Review Request',
      message: 'Please rate your recent service with David Okonkwo',
      isRead: true,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
    }
  ]);

  const [isOpen, setIsOpen] = useState(false);

  const handleMarkRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const handleClose = (id: string) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== id)
    );
  };

  const handleMarkAllRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <FiBell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Notification Panel */}
          <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border z-20 max-h-96 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Notifications
                </h3>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    Mark all read
                  </button>
                )}
              </div>
            </div>

            {/* Notification List */}
            <div className="max-h-80 overflow-y-auto">
              {notifications.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="px-4 py-3">
                      <NotificationItem
                        notification={notification}
                        onClose={handleClose}
                        onMarkRead={handleMarkRead}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <FiBell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No notifications</p>
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-gray-200">
                <button className="w-full text-center text-sm text-primary-600 hover:text-primary-700">
                  View all notifications
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// Hook for managing toast notifications
export function useToast() {
  const [toasts, setToasts] = useState<Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
  }>>([]);

  const showToast = (
    type: 'success' | 'error' | 'warning' | 'info',
    title: string,
    message: string
  ) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, title, message }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const ToastContainer = () => (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <ToastNotification
          key={toast.id}
          type={toast.type}
          title={toast.title}
          message={toast.message}
          isVisible={true}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );

  return {
    showToast,
    ToastContainer
  };
}