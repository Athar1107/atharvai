import type { Metadata } from 'next';
import { Inter, Syne } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Atharv — AI Engineer, Blogger & Community Builder',
  description:
    'Portfolio of Atharv — an AI Engineer, Blogger, and Community Builder passionate about Deep Learning, Agentic AI, and building impactful tech communities.',
  keywords: [
    'AI Engineer',
    'Machine Learning',
    'Deep Learning',
    'Portfolio',
    'Blogger',
    'Community Builder',
    'Python',
    'TensorFlow',
    'PyTorch',
  ],
  authors: [{ name: 'Atharv' }],
  openGraph: {
    title: 'Atharv — AI Engineer, Blogger & Community Builder',
    description: 'I build, learn & share. Explore my work in AI, ML, and community tech.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Atharv — AI Engineer, Blogger & Community Builder',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${syne.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
