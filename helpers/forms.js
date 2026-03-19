export const validateNumber = (value) => {
  return value.replace(/[^0-9]/g, '');
};

export const validatePrice = (id) => {

  const input = document.getElementById(id);
  const value = input.value.replace(/[^0-9]/g, '');

  if (value) {
    input.value = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value / 100);
  } else {
    input.value = '';
  }
};

export const isDecimal = (value) => {
  return value % 1 !== 0;
  // return /^-?\d+(\.\d+)?$/.test(value);
}

export const validateEmail = (email) => {
  // Simple email regex pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
