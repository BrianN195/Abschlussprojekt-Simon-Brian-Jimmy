export type Gender = 'female' | 'male' | 'other'| 'prefer not to say';

export type LoginData = {
    username: string;
    password: string;
};

export type RegisterData = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    gender?: Gender;
    birthDate?: string;
};

export type User = {
  id: number;
  username: string;
  email: string;
  profilePicture: string;
  bio?: string;
  gender?: Gender;
  birthDate?: string;
  registrationDate: string;
  role: string
};

