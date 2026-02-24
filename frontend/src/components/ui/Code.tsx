function Code({ children }: { children: React.ReactNode }) {
    return (
        <code className="rounded bg-gray-800 px-1.5 py-0.5 text-[0.9em] text-gray-300">
            {children}
        </code>
    );
}

export default Code;
