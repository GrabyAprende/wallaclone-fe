'use client';
import { LayoutProvider } from '../layout/context/layoutcontext';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';
import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';
import { SessionProvider } from '@/context/sessionContext';
import { MessagesProvider } from '@/context/messagesContext';


interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" style={{ fontSize: "14px" }} suppressHydrationWarning>
            <head>
                <link id="theme-css" href={`/themes/lara-light-indigo/theme.css`} rel="stylesheet"></link>
            </head>
            <body>
                <PrimeReactProvider>
                    <LayoutProvider>
                        <SessionProvider>
                            <MessagesProvider>
                                <Header />
                                {children}
                                <Footer />
                            </MessagesProvider>
                        </SessionProvider>
                    </LayoutProvider>
                </PrimeReactProvider>
            </body>
        </html>
    );
}
