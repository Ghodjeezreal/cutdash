"use client";

import { useState } from "react";
import { FiCreditCard, FiLock, FiCheck, FiAlertCircle, FiX } from "react-icons/fi";
import { PaymentMethod, PaymentData } from "@/types";

interface PaymentFormProps {
  amount: number;
  onPaymentSuccess: (paymentData: PaymentData) => void;
  onPaymentError: (error: string) => void;
  onCancel: () => void;
}

interface PaymentMethodCardProps {
  method: PaymentMethod;
  isSelected: boolean;
  onSelect: () => void;
}

// Payment Method Selection Card
function PaymentMethodCard({ method, isSelected, onSelect }: PaymentMethodCardProps) {
  return (
    <div
      className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
        isSelected
          ? 'border-primary-500 bg-primary-50'
          : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center space-x-3">
        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
          isSelected ? 'border-primary-500 bg-primary-500' : 'border-gray-300'
        }`}>
          {isSelected && <FiCheck className="w-2.5 h-2.5 text-white" />}
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <FiCreditCard className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-900">{method.type}</span>
          </div>
          {method.lastFour && (
            <p className="text-sm text-gray-500 mt-1">
              **** **** **** {method.lastFour}
            </p>
          )}
          {method.description && (
            <p className="text-sm text-gray-500 mt-1">{method.description}</p>
          )}
        </div>
        {method.isDefault && (
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
            Default
          </span>
        )}
      </div>
    </div>
  );
}

// Card Details Form
interface CardFormProps {
  onSubmit: (cardData: any) => void;
  isLoading: boolean;
}

function CardForm({ onSubmit, isLoading }: CardFormProps) {
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    saveCard: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateCard = () => {
    const newErrors: Record<string, string> = {};

    if (!cardData.cardNumber || cardData.cardNumber.length < 16) {
      newErrors.cardNumber = 'Please enter a valid card number';
    }

    if (!cardData.expiryDate || !/^\d{2}\/\d{2}$/.test(cardData.expiryDate)) {
      newErrors.expiryDate = 'Please enter expiry date (MM/YY)';
    }

    if (!cardData.cvv || cardData.cvv.length < 3) {
      newErrors.cvv = 'Please enter a valid CVV';
    }

    if (!cardData.cardholderName.trim()) {
      newErrors.cardholderName = 'Please enter cardholder name';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateCard()) {
      onSubmit(cardData);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Card Number
        </label>
        <input
          type="text"
          value={cardData.cardNumber}
          onChange={(e) => setCardData(prev => ({
            ...prev,
            cardNumber: formatCardNumber(e.target.value)
          }))}
          placeholder="1234 5678 9012 3456"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
            errors.cardNumber ? 'border-red-500' : 'border-gray-300'
          }`}
          maxLength={19}
        />
        {errors.cardNumber && (
          <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expiry Date
          </label>
          <input
            type="text"
            value={cardData.expiryDate}
            onChange={(e) => setCardData(prev => ({
              ...prev,
              expiryDate: formatExpiryDate(e.target.value)
            }))}
            placeholder="MM/YY"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.expiryDate ? 'border-red-500' : 'border-gray-300'
            }`}
            maxLength={5}
          />
          {errors.expiryDate && (
            <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CVV
          </label>
          <input
            type="text"
            value={cardData.cvv}
            onChange={(e) => setCardData(prev => ({
              ...prev,
              cvv: e.target.value.replace(/\D/g, '')
            }))}
            placeholder="123"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.cvv ? 'border-red-500' : 'border-gray-300'
            }`}
            maxLength={4}
          />
          {errors.cvv && (
            <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Cardholder Name
        </label>
        <input
          type="text"
          value={cardData.cardholderName}
          onChange={(e) => setCardData(prev => ({
            ...prev,
            cardholderName: e.target.value
          }))}
          placeholder="John Doe"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
            errors.cardholderName ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.cardholderName && (
          <p className="text-red-500 text-sm mt-1">{errors.cardholderName}</p>
        )}
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="saveCard"
          checked={cardData.saveCard}
          onChange={(e) => setCardData(prev => ({
            ...prev,
            saveCard: e.target.checked
          }))}
          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
        />
        <label htmlFor="saveCard" className="ml-2 text-sm text-gray-700">
          Save this card for future payments
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary-600 text-white py-3 rounded-md font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        <FiLock className="w-4 h-4" />
        <span>{isLoading ? 'Processing...' : 'Pay Securely'}</span>
      </button>
    </form>
  );
}

// Main Payment Form Component
export function PaymentForm({ amount, onPaymentSuccess, onPaymentError, onCancel }: PaymentFormProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);

  // Mock saved payment methods
  const savedPaymentMethods: PaymentMethod[] = [
    {
      id: '1',
      type: 'Visa',
      lastFour: '4242',
      expiryDate: '12/25',
      isDefault: true,
      isActive: true
    },
    {
      id: '2',
      type: 'Mastercard',
      lastFour: '5555',
      expiryDate: '08/26',
      isDefault: false,
      isActive: true
    }
  ];

  const paymentOptions = [
    ...savedPaymentMethods.map(method => ({
      id: method.id,
      type: 'saved_card',
      method
    })),
    {
      id: 'new_card',
      type: 'new_card',
      method: {
        id: 'new_card',
        type: 'Add New Card',
        description: 'Pay with a new debit or credit card',
        isDefault: false,
        isActive: true
      } as PaymentMethod
    },
    {
      id: 'bank_transfer',
      type: 'bank_transfer',
      method: {
        id: 'bank_transfer',
        type: 'Bank Transfer',
        description: 'Pay directly from your bank account',
        isDefault: false,
        isActive: true
      } as PaymentMethod
    },
    {
      id: 'wallet',
      type: 'wallet',
      method: {
        id: 'wallet',
        type: 'Digital Wallet',
        description: 'Pay with Google Pay, Apple Pay, or PayPal',
        isDefault: false,
        isActive: true
      } as PaymentMethod
    }
  ];

  const handlePaymentMethodSelect = (optionId: string) => {
    setSelectedPaymentMethod(optionId);
    setShowCardForm(optionId === 'new_card');
  };

  const handleCardPayment = async (cardData: any) => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful payment
      const paymentData: PaymentData = {
        id: `pay_${Date.now()}`,
        amount,
        currency: 'NGN',
        status: 'succeeded',
        method: 'card',
        transactionId: `txn_${Date.now()}`,
        createdAt: new Date()
      };

      onPaymentSuccess(paymentData);
    } catch (error) {
      onPaymentError('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSavedCardPayment = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const paymentData: PaymentData = {
        id: `pay_${Date.now()}`,
        amount,
        currency: 'NGN',
        status: 'succeeded',
        method: 'card',
        transactionId: `txn_${Date.now()}`,
        createdAt: new Date()
      };

      onPaymentSuccess(paymentData);
    } catch (error) {
      onPaymentError('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBankTransfer = () => {
    // Redirect to bank transfer flow
    onPaymentError('Bank transfer is not available yet. Please use card payment.');
  };

  const handleWalletPayment = () => {
    // Redirect to wallet payment flow
    onPaymentError('Digital wallet payment is not available yet. Please use card payment.');
  };

  const canProceed = selectedPaymentMethod && (showCardForm || selectedPaymentMethod !== 'new_card');

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Payment</h2>
          <button
            onClick={onCancel}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-2">
          <p className="text-2xl font-bold text-gray-900">
            ₦{amount.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">Total amount</p>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Choose Payment Method
        </h3>
        
        <div className="space-y-3 mb-6">
          {paymentOptions.map((option) => (
            <PaymentMethodCard
              key={option.id}
              method={option.method}
              isSelected={selectedPaymentMethod === option.id}
              onSelect={() => handlePaymentMethodSelect(option.id)}
            />
          ))}
        </div>

        {/* Card Form for New Card */}
        {showCardForm && (
          <div className="mb-6">
            <h4 className="text-md font-medium text-gray-900 mb-4">
              Card Details
            </h4>
            <CardForm
              onSubmit={handleCardPayment}
              isLoading={isProcessing}
            />
          </div>
        )}

        {/* Pay Button for Saved Methods */}
        {selectedPaymentMethod && !showCardForm && (
          <div className="space-y-4">
            <button
              onClick={() => {
                if (selectedPaymentMethod.startsWith('saved_') || savedPaymentMethods.some(m => m.id === selectedPaymentMethod)) {
                  handleSavedCardPayment();
                } else if (selectedPaymentMethod === 'bank_transfer') {
                  handleBankTransfer();
                } else if (selectedPaymentMethod === 'wallet') {
                  handleWalletPayment();
                }
              }}
              disabled={isProcessing}
              className="w-full bg-primary-600 text-white py-3 rounded-md font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <FiLock className="w-4 h-4" />
              <span>{isProcessing ? 'Processing...' : `Pay ₦${amount.toLocaleString()}`}</span>
            </button>
          </div>
        )}

        {/* Security Notice */}
        <div className="mt-6 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-start space-x-2">
            <FiLock className="w-4 h-4 text-gray-500 mt-0.5" />
            <div>
              <p className="text-xs text-gray-600">
                Your payment information is encrypted and secure. We never store your card details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Payment Success Component
interface PaymentSuccessProps {
  paymentData: PaymentData;
  onContinue: () => void;
}

export function PaymentSuccess({ paymentData, onContinue }: PaymentSuccessProps) {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <FiCheck className="w-8 h-8 text-green-600" />
      </div>
      
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        Payment Successful!
      </h2>
      
      <p className="text-gray-600 mb-6">
        Your payment of ₦{paymentData.amount.toLocaleString()} has been processed successfully.
      </p>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Transaction ID:</span>
            <span className="text-sm font-mono">{paymentData.transactionId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Amount:</span>
            <span className="text-sm font-semibold">₦{paymentData.amount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Date:</span>
            <span className="text-sm">{paymentData.createdAt.toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      
      <button
        onClick={onContinue}
        className="w-full bg-primary-600 text-white py-3 rounded-md font-medium hover:bg-primary-700"
      >
        Continue
      </button>
    </div>
  );
}

// Payment Error Component
interface PaymentErrorProps {
  error: string;
  onRetry: () => void;
  onCancel: () => void;
}

export function PaymentError({ error, onRetry, onCancel }: PaymentErrorProps) {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 text-center">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <FiAlertCircle className="w-8 h-8 text-red-600" />
      </div>
      
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        Payment Failed
      </h2>
      
      <p className="text-gray-600 mb-6">
        {error}
      </p>
      
      <div className="space-y-3">
        <button
          onClick={onRetry}
          className="w-full bg-primary-600 text-white py-3 rounded-md font-medium hover:bg-primary-700"
        >
          Try Again
        </button>
        <button
          onClick={onCancel}
          className="w-full border border-gray-300 text-gray-700 py-3 rounded-md font-medium hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}