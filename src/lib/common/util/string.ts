export const extractEmailDomain = (email: string): string | null => {
  const index = email.lastIndexOf('@');
  if (index === -1) return null;
  return email.substring(index + 1);
};
