export const extractEmailDomain = (email: string): string | null => {
  const index = email.lastIndexOf('@');
  if (index === -1) return null;
  return email.substring(index + 1);
};

export const quantify = (amount: number, s: string, suffix = 's') =>
  `${amount} ${s === '' || amount === 1 ? s : s + suffix}`;
