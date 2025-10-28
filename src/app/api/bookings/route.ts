import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse, Booking, BookingStatus } from '@/types';

// Mock booking data - In production, this would come from a database
const mockBookings: Booking[] = [
  {
    id: '1',
    customerId: '1',
    barberId: '1',
    serviceIds: ['haircut', 'beard-trim'],
    scheduledAt: new Date('2024-01-20T14:00:00'),
    duration: 45,
    location: {
      type: 'home',
      address: '123 Victoria Island, Lagos',
      coordinates: { latitude: 6.4281, longitude: 3.4219 },
      instructions: 'Ring doorbell, apartment 3B'
    },
    status: 'completed',
    totalAmount: 4500,
    serviceFee: 200,
    travelFee: 500,
    paymentStatus: 'paid',
    paymentMethod: 'card',
    notes: 'Please bring fade clippers',
    createdAt: new Date('2024-01-19T10:00:00'),
    updatedAt: new Date('2024-01-20T15:00:00')
  },
  {
    id: '2',
    customerId: '2',
    barberId: '1',
    serviceIds: ['haircut'],
    scheduledAt: new Date('2024-01-21T16:30:00'),
    duration: 30,
    location: {
      type: 'office',
      address: '456 Ikoyi Business District, Lagos',
      instructions: 'Security will escort to 5th floor'
    },
    status: 'confirmed',
    totalAmount: 3800,
    serviceFee: 200,
    travelFee: 600,
    paymentStatus: 'pending',
    paymentMethod: 'card',
    createdAt: new Date('2024-01-20T12:00:00'),
    updatedAt: new Date('2024-01-20T12:00:00')
  },
  {
    id: '3',
    customerId: '1',
    barberId: '2',
    serviceIds: ['full-service'],
    scheduledAt: new Date('2024-01-22T10:00:00'),
    duration: 60,
    location: {
      type: 'pickup_point',
      address: 'Lekki Phase 1 Pickup Point',
      coordinates: { latitude: 6.4474, longitude: 3.4553 }
    },
    status: 'pending',
    totalAmount: 5000,
    serviceFee: 200,
    travelFee: 0,
    paymentStatus: 'pending',
    paymentMethod: 'wallet',
    createdAt: new Date('2024-01-21T09:00:00'),
    updatedAt: new Date('2024-01-21T09:00:00')
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get('customerId');
    const barberId = searchParams.get('barberId');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');

    let filteredBookings = [...mockBookings];

    // Apply filters
    if (customerId) {
      filteredBookings = filteredBookings.filter(booking => booking.customerId === customerId);
    }

    if (barberId) {
      filteredBookings = filteredBookings.filter(booking => booking.barberId === barberId);
    }

    if (status) {
      filteredBookings = filteredBookings.filter(booking => booking.status === status);
    }

    // Sort by scheduled date (newest first)
    filteredBookings.sort((a, b) => new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime());

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedBookings = filteredBookings.slice(startIndex, endIndex);

    const response: ApiResponse<Booking[]> = {
      success: true,
      data: paginatedBookings,
      message: 'Bookings retrieved successfully'
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to retrieve bookings'
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const bookingData = await request.json();
    
    // Validate required fields
    const requiredFields = ['customerId', 'barberId', 'serviceIds', 'scheduledAt', 'location'];
    for (const field of requiredFields) {
      if (!bookingData[field]) {
        const response: ApiResponse = {
          success: false,
          error: `${field} is required`
        };
        return NextResponse.json(response, { status: 400 });
      }
    }

    // Calculate pricing (this would normally be more complex)
    const baseServicePrice = bookingData.serviceIds.length * 3000; // Base price per service
    const travelFee = bookingData.location.type === 'home' ? 500 : 
                     bookingData.location.type === 'office' ? 800 : 0;
    const serviceFee = 200;
    const totalAmount = baseServicePrice + travelFee + serviceFee;

    // Create new booking
    const newBooking: Booking = {
      id: (mockBookings.length + 1).toString(),
      customerId: bookingData.customerId,
      barberId: bookingData.barberId,
      serviceIds: bookingData.serviceIds,
      scheduledAt: new Date(bookingData.scheduledAt),
      duration: bookingData.serviceIds.length * 30, // 30 minutes per service
      location: bookingData.location,
      status: 'pending',
      totalAmount,
      serviceFee,
      travelFee,
      paymentStatus: 'pending',
      paymentMethod: bookingData.paymentMethod || 'card',
      notes: bookingData.notes,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockBookings.push(newBooking);

    const response: ApiResponse<Booking> = {
      success: true,
      data: newBooking,
      message: 'Booking created successfully'
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to create booking'
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { bookingId, status, paymentStatus } = await request.json();
    
    if (!bookingId) {
      const response: ApiResponse = {
        success: false,
        error: 'Booking ID is required'
      };
      return NextResponse.json(response, { status: 400 });
    }

    const bookingIndex = mockBookings.findIndex(booking => booking.id === bookingId);
    
    if (bookingIndex === -1) {
      const response: ApiResponse = {
        success: false,
        error: 'Booking not found'
      };
      return NextResponse.json(response, { status: 404 });
    }

    // Update booking
    if (status) {
      mockBookings[bookingIndex].status = status;
    }
    
    if (paymentStatus) {
      mockBookings[bookingIndex].paymentStatus = paymentStatus;
    }

    mockBookings[bookingIndex].updatedAt = new Date();

    const response: ApiResponse<Booking> = {
      success: true,
      data: mockBookings[bookingIndex],
      message: 'Booking updated successfully'
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error updating booking:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to update booking'
    };
    return NextResponse.json(response, { status: 500 });
  }
}