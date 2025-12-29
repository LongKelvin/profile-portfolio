export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

export const validateMinLength = (value, minLength) => {
  return value && value.trim().length >= minLength;
};

export const validateMaxLength = (value, maxLength) => {
  return value && value.trim().length <= maxLength;
};

export const validateContactForm = (formData) => {
  const errors = {};

  if (!validateRequired(formData.name)) {
    errors.name = 'Name is required';
  } else if (!validateMinLength(formData.name, 2)) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!validateRequired(formData.email)) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!validateRequired(formData.message)) {
    errors.message = 'Message is required';
  } else if (!validateMinLength(formData.message, 10)) {
    errors.message = 'Message must be at least 10 characters';
  } else if (!validateMaxLength(formData.message, 1000)) {
    errors.message = 'Message must not exceed 1000 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
