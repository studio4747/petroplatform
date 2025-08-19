'use client';

import { useState } from 'react';
import { sendMessage } from '@/services/messageService';
import { useAuth } from '@/context/AuthContext';

// تعریف اینترفیس‌ها
interface MessageModalProps {
  isOpen: boolean;
  onClose: (success?: boolean) => void;
  recipientId: string;
  relatedProduct?: string;
}

interface PocketBaseError extends Error {
  response?: {
    data?: any;
  };
}

export function MessageModal({
  isOpen,
  onClose,
  recipientId,
  relatedProduct,
}: MessageModalProps) {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await sendMessage({
        recipient: recipientId,
        content: message,
        relatedProduct
      });
      onClose(true);
    } catch (err: unknown) {
      let errorMessage = 'ارسال پیام با خطا مواجه شد';
      
      if (typeof err === 'object' && err !== null) {
        const pbError = err as PocketBaseError;
        
        if (pbError.message) {
          errorMessage = pbError.message;
        }
        
        if (pbError.response?.data) {
          errorMessage += `: ${JSON.stringify(pbError.response.data)}`;
        }
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-right">ارسال پیام</h2>
            <button
              onClick={() => onClose()}
              className="text-gray-500 hover:text-gray-700"
              disabled={isLoading}
            >
              ✕
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-right">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} dir="rtl">
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-right">متن پیام</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-right"
                rows={5}
                required
                disabled={isLoading}
                placeholder="متن پیام خود را وارد کنید..."
              />
            </div>

            <div className="flex justify-start gap-3">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? 'در حال ارسال...' : 'ارسال پیام'}
              </button>
              <button
                type="button"
                onClick={() => onClose()}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                disabled={isLoading}
              >
                انصراف
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}