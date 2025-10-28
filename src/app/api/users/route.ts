import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse, User } from '@/types';

// Mock user data - In production, this would come from a database
const mockUsers: User[] = [
  {
    id: '1',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+234 808 123 4567',
    role: 'customer',
    isVerified: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    email: 'ahmed.hassan@example.com',
    firstName: 'Ahmed',
    lastName: 'Hassan',
    phone: '+234 809 234 5678',
    role: 'barber',
    isVerified: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');

    let filteredUsers = mockUsers;
    
    if (role) {
      filteredUsers = mockUsers.filter(user => user.role === role);
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    const response: ApiResponse<User[]> = {
      success: true,
      data: paginatedUsers,
      message: 'Users retrieved successfully'
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: 'Failed to retrieve users'
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json();
    
    // Validate required fields
    const requiredFields = ['email', 'firstName', 'lastName', 'phone', 'role'];
    for (const field of requiredFields) {
      if (!userData[field]) {
        const response: ApiResponse = {
          success: false,
          error: `${field} is required`
        };
        return NextResponse.json(response, { status: 400 });
      }
    }

    // Check if user already exists
    const existingUser = mockUsers.find(user => user.email === userData.email);
    if (existingUser) {
      const response: ApiResponse = {
        success: false,
        error: 'User with this email already exists'
      };
      return NextResponse.json(response, { status: 409 });
    }

    // Create new user
    const newUser: User = {
      id: (mockUsers.length + 1).toString(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      role: userData.role,
      isVerified: false,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      avatar: userData.avatar
    };

    mockUsers.push(newUser);

    const response: ApiResponse<User> = {
      success: true,
      data: newUser,
      message: 'User created successfully'
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: 'Failed to create user'
    };
    return NextResponse.json(response, { status: 500 });
  }
}