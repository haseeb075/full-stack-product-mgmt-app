import React from "react";
import Link from "next/link";

function Header() {
  return (
    <div>
      <header className="w-full bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">PMS</h1>
        <nav className="flex gap-6">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/products" className="hover:underline">
            Products
          </Link>
          <Link href="/categories" className="hover:underline">
            Categories
          </Link>
        </nav>
      </header>
    </div>
  );
}

export default Header;
