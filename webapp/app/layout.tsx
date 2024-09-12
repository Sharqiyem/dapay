import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import localFont from 'next/font/local';
import { Inter } from 'next/font/google';
import { Web3Provider } from '@/contexts/Web3Context';
import { ModalProvider } from '@/contexts/ModalContext';
import Header from '@/components/Header';
import ModalContainer from '@/components/ModalContainer';
import { Toaster } from '@/components/ui/toaster';

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
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          <Web3Provider>
            <ModalProvider>
              <Header />
              <main className="container mx-auto p-4">
                {children}
                <Toaster />
              </main>
              <ModalContainer />
            </ModalProvider>
          </Web3Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
