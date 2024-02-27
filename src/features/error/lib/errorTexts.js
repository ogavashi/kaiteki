export const errorTexts = {
  required: () => "Поле є обов'язковим",
  maxLength: (length) => `Максимальна довжина ${length}`,
  minLength: (length) => `Мінімальна довжина ${length}`,
  email: () => `Невірний формат пошти`,
  phone: () => `Невірний формат телефону`,
  url: () => `Невірний формат посилання`,
  unique: () => `Повинно бути унікальним`,
  formatNumber: () => `Невірний формат числа`,
};
