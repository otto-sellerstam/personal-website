import { Link } from 'react-router';

function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-4">
            <h1 className="mb-4 text-6xl font-bold text-gray-300">404</h1>
            <p className="mb-8 text-xl text-gray-500">Page not found</p>
            <Link
                to="/"
                className="rounded-lg bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary-dark"
            >
                Go home
            </Link>
        </div>
    );
}

export default NotFound;
