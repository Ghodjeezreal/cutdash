// Shared user store for demo purposes
// In production, this would be replaced with a proper database

export interface UserData {
  id: string;
  email: string;
  password?: string; // Optional for responses
  firstName: string;
  lastName: string;
  phone: string;
  role: 'customer' | 'barber' | 'admin';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Initial demo users with proper password hashes
const initialUsers: UserData[] = [
  {
    id: '1',
    email: 'admin@cutdash.com',
    password: '$2b$10$DSZAZsG3JrGvFgayqQxhHu0wgFdmKdxQfuWNxTv43DTf4pfWScfia', // 'admin123'
    firstName: 'Admin',
    lastName: 'User',
    phone: '+234-800-000-0000',
    role: 'admin',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    email: 'customer@example.com',
    password: '$2b$10$RxEHKTKIXAEalaVfVXga..2DaXy0PHIZAnxgpIWp5paMH.me1LhLq', // 'password123'
    firstName: 'John',
    lastName: 'Doe',
    phone: '+234-801-234-5678',
    role: 'customer',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    email: 'barber@example.com',
    password: '$2b$10$2/StB63iJHYQG3X.R9rxteM9pFbgH0DouVGMtJWo0R7sBRmCXfIb.', // 'barber123'
    firstName: 'Mike',
    lastName: 'Johnson',
    phone: '+234-802-345-6789',
    role: 'barber',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// In-memory store (in production, this would be a database)
let users: UserData[] = [...initialUsers];

export const userStore = {
  // Get all users
  getAll: (): UserData[] => users,
  
  // Find user by email
  findByEmail: (email: string): UserData | undefined => 
    users.find(u => u.email.toLowerCase() === email.toLowerCase()),
  
  // Find user by ID
  findById: (id: string): UserData | undefined => 
    users.find(u => u.id === id),
  
  // Add new user
  create: (userData: UserData): UserData => {
    users.push(userData);
    return userData;
  },
  
  // Update user
  update: (id: string, updateData: Partial<UserData>): UserData | null => {
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) return null;
    
    users[userIndex] = { ...users[userIndex], ...updateData, updatedAt: new Date() };
    return users[userIndex];
  },
  
  // Reset to initial state (for demo purposes)
  reset: (): void => {
    users = [...initialUsers];
  }
};