// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  role: 'customer' | 'barber' | 'admin';
  isVerified: boolean;
  isActive: boolean;
}

export interface Customer extends User {
  role: 'customer';
  preferredLocation?: string;
  bookingHistory: Booking[];
  favoriteBarbers: string[]; // Barber IDs
  paymentMethods: PaymentMethod[];
}

export interface Barber extends User {
  role: 'barber';
  businessName?: string;
  bio: string;
  experience: number; // years
  specialties: string[];
  serviceAreas: string[];
  hourlyRate: number;
  rating: number;
  totalReviews: number;
  completedJobs: number;
  isAvailable: boolean;
  portfolio: PortfolioItem[];
  certifications: Certification[];
  workingHours: WorkingHours;
  bankDetails?: BankDetails;
  commissionRate: number; // percentage
}

export interface Admin extends User {
  role: 'admin';
  permissions: AdminPermission[];
}

// Booking Types
export interface Booking {
  id: string;
  customerId: string;
  barberId: string;
  serviceIds: string[];
  scheduledAt: Date;
  duration: number; // minutes
  location: BookingLocation;
  status: BookingStatus;
  totalAmount: number;
  serviceFee: number;
  travelFee: number;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  notes?: string;
  cancellationReason?: string;
  createdAt: Date;
  updatedAt: Date;
  review?: Review;
}

export type BookingStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'in_progress' 
  | 'completed' 
  | 'cancelled' 
  | 'no_show';

export type PaymentStatus = 
  | 'pending' 
  | 'paid' 
  | 'failed' 
  | 'refunded' 
  | 'disputed';

export interface BookingLocation {
  type: 'home' | 'office' | 'pickup_point' | 'custom';
  address: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  instructions?: string;
}

// Service Types
export interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  duration: number; // minutes
  category: ServiceCategory;
  isActive: boolean;
  requirements?: string[];
}

export type ServiceCategory = 
  | 'haircut' 
  | 'beard' 
  | 'styling' 
  | 'treatment' 
  | 'grooming' 
  | 'package';

// Review Types
export interface Review {
  id: string;
  bookingId: string;
  customerId: string;
  barberId: string;
  rating: number; // 1-5
  comment?: string;
  photos?: string[];
  createdAt: Date;
  isVerified: boolean;
}

// Payment Types
export interface PaymentMethod {
  id: string;
  type: string; // Can be card type like 'Visa', 'Mastercard', or method like 'bank_transfer', 'wallet'
  provider?: string; // stripe, paystack, etc.
  lastFour?: string; // Last 4 digits for cards
  last4?: string; // Alternative naming
  expiryDate?: string; // MM/YY format
  expiryMonth?: number;
  expiryYear?: number;
  description?: string; // Human readable description
  isDefault: boolean;
  isActive?: boolean;
}

export interface PaymentData {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'succeeded' | 'failed';
  method: string;
  transactionId: string;
  createdAt: Date;
  metadata?: Record<string, any>;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  providerTransactionId?: string;
  paidAt?: Date;
  refundedAt?: Date;
  createdAt: Date;
}

// Platform Types
export interface PortfolioItem {
  id: string;
  imageUrl: string;
  description?: string;
  serviceType: string;
  uploadedAt: Date;
}

export interface Certification {
  id: string;
  name: string;
  issuedBy: string;
  issuedAt: Date;
  expiresAt?: Date;
  documentUrl?: string;
  isVerified: boolean;
}

export interface WorkingHours {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

export interface DaySchedule {
  isAvailable: boolean;
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  breaks?: TimeSlot[];
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
}

export interface BankDetails {
  bankName: string;
  accountNumber: string;
  accountName: string;
  routingNumber?: string;
  isVerified: boolean;
}

// Admin Types
export type AdminPermission = 
  | 'manage_users' 
  | 'manage_barbers' 
  | 'manage_bookings' 
  | 'manage_payments' 
  | 'view_analytics' 
  | 'manage_platform';

export interface PlatformStats {
  totalUsers: number;
  totalBarbers: number;
  totalBookings: number;
  totalRevenue: number;
  activeBookings: number;
  averageRating: number;
  conversionRate: number;
  monthlyGrowth: number;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: any;
  isRead: boolean;
  createdAt: Date;
}

export type NotificationType = 
  | 'booking_confirmed' 
  | 'booking_cancelled' 
  | 'payment_received' 
  | 'review_received' 
  | 'promotion' 
  | 'system_update';

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface BookingFormData {
  serviceIds: string[];
  barberId?: string;
  scheduledAt: Date;
  location: BookingLocation;
  notes?: string;
}

export interface BarberApplicationForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  experience: string;
  specialties: string[];
  location: string;
  portfolio: File[];
  certifications: File[];
  availability: string;
  bio: string;
}

export interface CustomerProfileForm {
  firstName: string;
  lastName: string;
  phone: string;
  preferredLocation?: string;
  avatar?: File;
}

// Search and Filter Types
export interface BarberFilters {
  location?: string;
  services?: string[];
  minRating?: number;
  maxPrice?: number;
  availability?: 'now' | 'today' | 'this_week';
  sortBy?: 'rating' | 'price' | 'distance' | 'reviews';
}

export interface BookingFilters {
  status?: BookingStatus[];
  dateFrom?: Date;
  dateTo?: Date;
  barberId?: string;
  customerId?: string;
}

// Error Types
export interface ValidationError {
  field: string;
  message: string;
}

export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
}