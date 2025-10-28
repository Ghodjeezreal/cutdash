import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { userStore } from '@/lib/userStore';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation (Nigerian format)
const phoneRegex = /^\+?234[0-9]{10}$|^0[0-9]{10}$/;

export async function PUT(request: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization token required' },
        { status: 401 }
      );
    }

    // Extract the token
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify the JWT token
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (jwtError) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Get the request body
    const body = await request.json();
    const { firstName, lastName, email, phone } = body;

    // Find the user
    const user = userStore.findById(decoded.userId);
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if user is still active
    if (!user.isActive) {
      return NextResponse.json(
        { error: 'Account is deactivated' },
        { status: 403 }
      );
    }

    // Validate fields if they are being updated
    if (email && email !== user.email) {
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: 'Please enter a valid email address' },
          { status: 400 }
        );
      }

      // Check if email is already taken by another user
      const emailExists = userStore.findByEmail(email);

      if (emailExists && emailExists.id !== user.id) {
        return NextResponse.json(
          { error: 'Email address is already taken' },
          { status: 409 }
        );
      }
    }

    if (phone && phone !== user.phone) {
      if (!phoneRegex.test(phone)) {
        return NextResponse.json(
          { error: 'Please enter a valid Nigerian phone number' },
          { status: 400 }
        );
      }
    }

    // Update user data
    const updateData = {
      firstName: firstName?.trim() || user.firstName,
      lastName: lastName?.trim() || user.lastName,
      email: email?.toLowerCase() || user.email,
      phone: phone?.trim() || user.phone,
    };

    // Update the user in our "database"
    const updatedUser = userStore.update(user.id, updateData);

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'Failed to update user' },
        { status: 500 }
      );
    }

    // Return updated user data (without password)
    const { password, ...userWithoutPassword } = updatedUser;
    return NextResponse.json(userWithoutPassword);

  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}