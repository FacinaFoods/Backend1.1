export const resp = (s: number, m: unknown) => ({ status: s, message: m });

export const respMsg = (s: number, m: unknown) => ({
  status: s,
  message: { message: m },
});
