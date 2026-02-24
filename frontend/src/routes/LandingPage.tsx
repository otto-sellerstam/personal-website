import { Link } from 'react-router';
import Code from '@/components/ui/Code';

const REPO_BASE = 'https://github.com/otto-sellerstam/one-ring';

function PackageCard({
    name,
    description,
    layer,
    href,
}: {
    name: string;
    description: string;
    layer: string;
    href: string;
}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl border border-gray-800 bg-gray-900/50 p-6 transition-all hover:border-primary/50 hover:bg-gray-900/80"
        >
            <div className="mb-2 flex items-center gap-3">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary-light">
                    {layer}
                </span>
            </div>
            <h3 className="mb-3 text-xl font-semibold text-gray-100 group-hover:text-primary-light transition-colors">
                {name}
            </h3>
            <p className="leading-relaxed text-gray-400">{description}</p>
        </a>
    );
}

const layers = [
    {
        label: 'This website!',
        color: 'border-violet-400/30 bg-gradient-to-r from-violet-500/15 to-purple-500/15 text-violet-300 shadow-violet-500/5',
        href: '/',
    },
    {
        label: 'one-ring-http',
        color: 'border-purple-400/30 bg-gradient-to-r from-purple-500/15 to-fuchsia-500/15 text-purple-300 shadow-purple-500/5',
        href: `${REPO_BASE}/tree/main/one-ring-http`,
    },
    {
        label: 'one-ring-loop',
        color: 'border-fuchsia-400/30 bg-gradient-to-r from-fuchsia-500/15 to-pink-500/15 text-fuchsia-300 shadow-fuchsia-500/5',
        href: `${REPO_BASE}/tree/main/one-ring-loop`,
    },
    {
        label: 'one-ring-core',
        color: 'border-indigo-400/30 bg-gradient-to-r from-indigo-500/15 to-violet-500/15 text-indigo-300 shadow-indigo-500/5',
        href: `${REPO_BASE}/tree/main/one-ring-core`,
    },
    {
        label: 'liburing',
        color: 'border-gray-700/50 bg-gradient-to-r from-gray-800/40 to-gray-700/30 text-gray-400',
        href: 'https://unixism.net/loti/what_is_io_uring.html',
    },
    {
        label: 'Linux Kernel (io_uring)',
        color: 'border-gray-700/40 bg-gradient-to-r from-gray-800/30 to-gray-800/20 text-gray-500',
        href: 'https://kernel.dk/io_uring.pdf',
    },
];

function ArchitectureDiagram() {
    return (
        <div className="mx-auto flex max-w-md flex-col items-center gap-1.5">
            {layers.map((layer, i) => {
                const isInternal = layer.href.startsWith('/');
                const cls = `block w-full rounded-xl border px-5 py-3.5 text-center text-sm font-medium shadow-md transition-shadow duration-200 hover:shadow-lg ${layer.color}`;

                return (
                    <div key={layer.label} className="flex w-full flex-col items-center">
                        {isInternal ? (
                            <Link to={layer.href} className={cls}>
                                {layer.label}
                            </Link>
                        ) : (
                            <a
                                href={layer.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cls}
                            >
                                {layer.label}
                            </a>
                        )}
                        {i < layers.length - 1 && (
                            <div className="py-1 text-gray-700">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M12 5v14" />
                                    <path d="m19 12-7 7-7-7" />
                                </svg>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

const packages = [
    {
        name: 'one-ring-core',
        layer: 'Kernel Interface',
        href: `${REPO_BASE}/tree/main/one-ring-core`,
        description:
            "Low-level Python wrapper around Linux's io_uring subsystem. Typed async I/O operations for files and sockets, with a Ring class managing submission and completion queues and Rust-style unwrap() error handling.",
    },
    {
        name: 'one-ring-loop',
        layer: 'Event Loop',
        href: `${REPO_BASE}/tree/main/one-ring-loop`,
        description:
            'Trio-inspired structured concurrency built on one-ring-core. Generator-based coroutines, TaskGroup nurseries, CancelScopes, async file and socket I/O, TLS streams, and timers \u2014 all backed by io_uring.',
    },
    {
        name: 'one-ring-http',
        layer: 'HTTP Server',
        href: `${REPO_BASE}/tree/main/one-ring-http`,
        description:
            'HTTP/1.1 server on top of one-ring-loop. Request parsing, routing, response serialization, static file serving, and TLS \u2014 a thin layer that delegates all async I/O downward.',
    },
];

function LandingPage() {
    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="flex flex-col items-center justify-center px-4 pb-24 pt-32 text-center">
                <p className="mb-4 text-lg font-medium tracking-wide text-primary-light">
                    Hey, I&apos;m Otto Sellerstam
                </p>
                <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-100 sm:text-7xl">
                    Welcome to my site
                </h1>
                <p className="mb-8 max-w-2xl text-xl leading-relaxed text-gray-400">
                    This thing runs on{' '}
                    <a
                        href={REPO_BASE}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-primary-light underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
                    >
                        one-ring
                    </a>
                    , a Python stack I built from raw{' '}
                    <Code>io_uring</Code>{' '}
                    system calls all the way up to an HTTP server. A fun experiment in building
                    everything from scratch on Linux.
                </p>
            </section>

            {/* Architecture Stack */}
            <section className="px-4 pb-24">
                <h2 className="mb-10 text-center text-3xl font-semibold text-gray-200">
                    The Stack
                </h2>
                <ArchitectureDiagram />
            </section>

            {/* Package Cards */}
            <section className="mx-auto max-w-5xl px-4 pb-24">
                <h2 className="mb-10 text-center text-3xl font-semibold text-gray-200">
                    The Packages
                </h2>
                <div className="grid gap-6 md:grid-cols-3">
                    {packages.map((pkg) => (
                        <PackageCard
                            key={pkg.name}
                            name={pkg.name}
                            description={pkg.description}
                            layer={pkg.layer}
                            href={pkg.href}
                        />
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-800/50 px-4 py-8 text-center text-sm text-gray-600">
                Built by me, and powered by{' '}
                <a
                    href={REPO_BASE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 underline decoration-gray-700 underline-offset-4 transition-colors hover:text-primary-light"
                >
                    one-ring
                </a>
            </footer>
        </div>
    );
}

export default LandingPage;
