import type { Metadata } from 'next';
import { Rethink_Sans } from 'next/font/google';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@/theme/theme-provider';
import './globals.css';

const rethinkSans = Rethink_Sans({ subsets: ['latin'] });

const metadata: Metadata = {
    title: 'Cost of Goods Sold',
    description: 'Calculate Cost of Goods Sold'
};

interface RootLayoutProps {
    children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={rethinkSans.className}>
                <InitColorSchemeScript />
                <AppRouterCacheProvider options={{ key: 'css' }}>
                    <ThemeProvider>{children}</ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
};

export { metadata };
export default RootLayout;