import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';

// In a real application, you might want to maintain a blacklist of revoked tokens
// For simplicity, we'll just validate the token exists and is valid
export async function POST(request: NextRequest) {
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

    // Verify the JWT token (to ensure it's valid before logout)
    try {
      jwt.verify(token, JWT_SECRET);
    } catch (jwtError) {
      // Even if token is invalid, we'll return success for logout
      // This handles cases where token might be expired but user wants to logout
      return NextResponse.json({
        message: 'Logout successful'
      });
    }

    // In a production app with token blacklisting, you would:
    // 1. Add the token to a blacklist/revoked tokens list
    // 2. Store it in Redis or database with expiration
    // For this demo, we'll just return success since client will remove the token

    return NextResponse.json({
      message: 'Logout successful'
    });

  } catch (error) {
    console.error('Logout error:', error);
    // Even on error, return success for logout
    return NextResponse.json({
      message: 'Logout successful'
    });
  }
}