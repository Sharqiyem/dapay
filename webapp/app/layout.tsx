import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Inter } from 'next/font/google';
import { Web3Provider } from '@/contexts/Web3Context';
import { ModalProvider } from '@/contexts/ModalContext';
import Header from '@/components/Header';
import ModalContainer from '@/components/ModalContainer';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DaPay',
  description: 'Decentralized Payment System',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Web3Provider>
          <ModalProvider>
            <Header />
            <main className="container mx-auto px-4 py-8">{children}</main>
            <ModalContainer />
          </ModalProvider>
        </Web3Provider>
      </body>
    </html>
  );
}
