"use client";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
  

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 text-center">
          Product Management System
        </h2>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-4 text-sm text-gray-600">
        © {new Date().getFullYear()} Product Management System. All rights
        reserved.
      </footer>
    </div>
  );
}
