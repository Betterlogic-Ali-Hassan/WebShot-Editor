import type { Metadata } from 'next';
import './globals.css';
import { Roboto } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { ClientProvider } from '@/components/providers/StoreProvider';

const roboto = Roboto({
	weight: ['400', '700'],
	style: ['normal', 'italic'],
	subsets: ['latin'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'WebShot',
	description: 'Generated by create next app',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${roboto.className}`}>
				<ClientProvider>
					<main>{children}</main>
					<Toaster />
				</ClientProvider>
			</body>
		</html>
	);
}
