const regexp = {
  password: /^(?=.*[a-z]{1,})(?=.*[A-Z]{1,})(?=.*\d{1,}).{6,}$/,
  specialCharacters: /^[^!*|\":<>[\]{}`\\()',;&$#`^%]+$/,
};

export default regexp;
