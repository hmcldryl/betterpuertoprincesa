export interface Hotline {
  label: string;
  number: string;
  tel: string;
}

// Sourced from the BetterPuertoPrincesa.org civic project's verified hotline
// list (github.com/BetterPuertoPrincesa/BetterPuertoPrincesa) — worth
// re-confirming with the CDRRMO before treating as current.
export const hotlines: Hotline[] = [
  { label: '911', number: '0927 797 2009', tel: '09277972009' },
  { label: 'Police', number: '0917 311 5746', tel: '09173115746' },
  { label: 'Fire', number: '0964 945 2971', tel: '09649452971' },
  { label: 'CDRRMO', number: '0965 314 8399', tel: '09653148399' },
  { label: 'Hospital', number: '0927 133 8635', tel: '09271338635' },
];
