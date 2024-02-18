import { Poppins, Playfair_Display } from 'next/font/google';

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600', '400'],
});

export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400'],
});
