import { Outlet } from 'react-router';

function RootLayout() {
    return (
        <div className="flex min-h-screen flex-col">
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
}

export default RootLayout;
