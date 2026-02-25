// Form validation utilities

export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password: string): string | null => {
  if (password.length < 8) {
    return 'Password must be at least 8 characters';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }
  if (!/[0-9]/.test(password)) {
    return 'Password must contain at least one number';
  }
  return null;
};

export const validatePhoneNumber = (phone: string): boolean => {
  // Nigerian phone number format
  const re = /^(\+234|0)[789]\d{9}$/;
  return re.test(phone.replace(/\s/g, ''));
};

export const validateBio = (bio: string): string | null => {
  if (bio.length < 10) {
    return 'Bio must be at least 10 characters';
  }
  if (bio.length > 300) {
    return 'Bio must not exceed 300 characters';
  }
  return null;
};

export const validateProfileForm = (data: {
  name: string;
  category: string;
  location: string;
  phone: string;
  whatsapp: string;
  bio: string;
}): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!data.category) {
    errors.category = 'Please select a category';
  }

  if (!data.location) {
    errors.location = 'Please select a location';
  }

  if (!validatePhoneNumber(data.phone)) {
    errors.phone = 'Please enter a valid Nigerian phone number';
  }

  if (!validatePhoneNumber(data.whatsapp)) {
    errors.whatsapp = 'Please enter a valid WhatsApp number';
  }

  const bioError = validateBio(data.bio);
  if (bioError) {
    errors.bio = bioError;
  }

  return errors;
};

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('234')) {
    return '+' + cleaned;
  } else if (cleaned.startsWith('0')) {
    return '+234' + cleaned.slice(1);
  }
  return '+234' + cleaned;
};

// Login form validation
export const validateLoginForm = (email: string, password: string): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};

  if (!email.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
};

// Signup form validation
export const validateSignupForm = (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};

  if (!name.trim()) {
    errors.name = 'Full name is required';
  } else if (name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!email.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};

// Review validation
export const validateReview = (
  userName: string,
  comment: string,
  rating: number
): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};

  if (!userName.trim()) {
    errors.userName = 'Your name is required';
  } else if (userName.trim().length < 2) {
    errors.userName = 'Name must be at least 2 characters';
  }

  if (!comment.trim()) {
    errors.comment = 'Review comment is required';
  } else if (comment.trim().length < 10) {
    errors.comment = 'Review must be at least 10 characters';
  } else if (comment.length > 500) {
    errors.comment = 'Review must not exceed 500 characters';
  }

  if (rating < 1 || rating > 5) {
    errors.rating = 'Rating must be between 1 and 5 stars';
  }

  return errors;
};
