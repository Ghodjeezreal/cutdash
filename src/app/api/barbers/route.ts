import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse, Barber, BarberFilters } from '@/types';

// Mock barber data - In production, this would come from a database
const mockBarbers: Barber[] = [
  {
    id: '1',
    email: 'ahmed.hassan@example.com',
    firstName: 'Ahmed',
    lastName: 'Hassan',
    phone: '+234 809 234 5678',
    role: 'barber',
    isVerified: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    businessName: 'Ahmed\'s Professional Cuts',
    bio: 'Experienced barber specializing in modern cuts and beard styling with 8+ years in the industry.',
    experience: 8,
    specialties: ['Modern Cuts', 'Beard Styling', 'Fade Cuts'],
    serviceAreas: ['Victoria Island', 'Ikoyi', 'Lekki'],
    hourlyRate: 3000,
    rating: 4.9,
    totalReviews: 127,
    completedJobs: 156,
    isAvailable: true,
    portfolio: [],
    certifications: [],
    workingHours: {
      monday: { isAvailable: true, startTime: '09:00', endTime: '18:00' },
      tuesday: { isAvailable: true, startTime: '09:00', endTime: '18:00' },
      wednesday: { isAvailable: true, startTime: '09:00', endTime: '18:00' },
      thursday: { isAvailable: true, startTime: '09:00', endTime: '18:00' },
      friday: { isAvailable: true, startTime: '09:00', endTime: '18:00' },
      saturday: { isAvailable: true, startTime: '10:00', endTime: '16:00' },
      sunday: { isAvailable: false, startTime: '00:00', endTime: '00:00' }
    },
    commissionRate: 15
  },
  {
    id: '2',
    email: 'david.okonkwo@example.com',
    firstName: 'David',
    lastName: 'Okonkwo',
    phone: '+234 808 345 6789',
    role: 'barber',
    isVerified: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    businessName: 'Classic Cuts by David',
    bio: 'Traditional barber with modern techniques. Specializing in classic cuts and fade expertise.',
    experience: 5,
    specialties: ['Classic Cuts', 'Fade Expert', 'Beard Trim'],
    serviceAreas: ['Surulere', 'Ikeja', 'Yaba'],
    hourlyRate: 2800,
    rating: 4.8,
    totalReviews: 89,
    completedJobs: 103,
    isAvailable: true,
    portfolio: [],
    certifications: [],
    workingHours: {
      monday: { isAvailable: true, startTime: '08:00', endTime: '17:00' },
      tuesday: { isAvailable: true, startTime: '08:00', endTime: '17:00' },
      wednesday: { isAvailable: true, startTime: '08:00', endTime: '17:00' },
      thursday: { isAvailable: true, startTime: '08:00', endTime: '17:00' },
      friday: { isAvailable: true, startTime: '08:00', endTime: '17:00' },
      saturday: { isAvailable: true, startTime: '09:00', endTime: '15:00' },
      sunday: { isAvailable: true, startTime: '10:00', endTime: '14:00' }
    },
    commissionRate: 15
  },
  {
    id: '3',
    email: 'samuel.adebayo@example.com',
    firstName: 'Samuel',
    lastName: 'Adebayo',
    phone: '+234 807 456 7890',
    role: 'barber',
    isVerified: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    businessName: 'Sam\'s Hair Studio',
    bio: 'Master barber with expertise in all styles and hair treatments. 10+ years of professional experience.',
    experience: 10,
    specialties: ['All Styles', 'Hair Treatments', 'Color', 'Styling'],
    serviceAreas: ['Lagos Island', 'Victoria Island', 'Ikoyi', 'Lekki'],
    hourlyRate: 3500,
    rating: 4.9,
    totalReviews: 156,
    completedJobs: 198,
    isAvailable: false,
    portfolio: [],
    certifications: [],
    workingHours: {
      monday: { isAvailable: true, startTime: '10:00', endTime: '19:00' },
      tuesday: { isAvailable: true, startTime: '10:00', endTime: '19:00' },
      wednesday: { isAvailable: true, startTime: '10:00', endTime: '19:00' },
      thursday: { isAvailable: true, startTime: '10:00', endTime: '19:00' },
      friday: { isAvailable: true, startTime: '10:00', endTime: '19:00' },
      saturday: { isAvailable: true, startTime: '09:00', endTime: '17:00' },
      sunday: { isAvailable: false, startTime: '00:00', endTime: '00:00' }
    },
    commissionRate: 12
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');
    const minRating = searchParams.get('minRating');
    const maxPrice = searchParams.get('maxPrice');
    const availability = searchParams.get('availability');
    const sortBy = searchParams.get('sortBy') || 'rating';
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');

    let filteredBarbers = [...mockBarbers];

    // Apply filters
    if (location) {
      filteredBarbers = filteredBarbers.filter(barber => 
        barber.serviceAreas.some(area => 
          area.toLowerCase().includes(location.toLowerCase())
        )
      );
    }

    if (minRating) {
      filteredBarbers = filteredBarbers.filter(barber => 
        barber.rating >= parseFloat(minRating)
      );
    }

    if (maxPrice) {
      filteredBarbers = filteredBarbers.filter(barber => 
        barber.hourlyRate <= parseInt(maxPrice)
      );
    }

    if (availability === 'now') {
      filteredBarbers = filteredBarbers.filter(barber => barber.isAvailable);
    }

    // Apply sorting
    switch (sortBy) {
      case 'rating':
        filteredBarbers.sort((a, b) => b.rating - a.rating);
        break;
      case 'price':
        filteredBarbers.sort((a, b) => a.hourlyRate - b.hourlyRate);
        break;
      case 'reviews':
        filteredBarbers.sort((a, b) => b.totalReviews - a.totalReviews);
        break;
      case 'experience':
        filteredBarbers.sort((a, b) => b.experience - a.experience);
        break;
      default:
        filteredBarbers.sort((a, b) => b.rating - a.rating);
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedBarbers = filteredBarbers.slice(startIndex, endIndex);

    const response: ApiResponse<Barber[]> = {
      success: true,
      data: paginatedBarbers,
      message: 'Barbers retrieved successfully'
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching barbers:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to retrieve barbers'
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const barberData = await request.json();
    
    // Validate required fields
    const requiredFields = ['email', 'firstName', 'lastName', 'phone', 'bio', 'experience', 'specialties', 'serviceAreas', 'hourlyRate'];
    for (const field of requiredFields) {
      if (!barberData[field]) {
        const response: ApiResponse = {
          success: false,
          error: `${field} is required`
        };
        return NextResponse.json(response, { status: 400 });
      }
    }

    // Check if barber already exists
    const existingBarber = mockBarbers.find(barber => barber.email === barberData.email);
    if (existingBarber) {
      const response: ApiResponse = {
        success: false,
        error: 'Barber with this email already exists'
      };
      return NextResponse.json(response, { status: 409 });
    }

    // Create new barber
    const newBarber: Barber = {
      id: (mockBarbers.length + 1).toString(),
      email: barberData.email,
      firstName: barberData.firstName,
      lastName: barberData.lastName,
      phone: barberData.phone,
      role: 'barber',
      isVerified: false,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      businessName: barberData.businessName,
      bio: barberData.bio,
      experience: barberData.experience,
      specialties: barberData.specialties,
      serviceAreas: barberData.serviceAreas,
      hourlyRate: barberData.hourlyRate,
      rating: 0,
      totalReviews: 0,
      completedJobs: 0,
      isAvailable: true,
      portfolio: [],
      certifications: [],
      workingHours: barberData.workingHours || {
        monday: { isAvailable: true, startTime: '09:00', endTime: '17:00' },
        tuesday: { isAvailable: true, startTime: '09:00', endTime: '17:00' },
        wednesday: { isAvailable: true, startTime: '09:00', endTime: '17:00' },
        thursday: { isAvailable: true, startTime: '09:00', endTime: '17:00' },
        friday: { isAvailable: true, startTime: '09:00', endTime: '17:00' },
        saturday: { isAvailable: true, startTime: '09:00', endTime: '17:00' },
        sunday: { isAvailable: false, startTime: '00:00', endTime: '00:00' }
      },
      commissionRate: 15
    };

    mockBarbers.push(newBarber);

    const response: ApiResponse<Barber> = {
      success: true,
      data: newBarber,
      message: 'Barber application submitted successfully'
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error creating barber:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to submit barber application'
    };
    return NextResponse.json(response, { status: 500 });
  }
}