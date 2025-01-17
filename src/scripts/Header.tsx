import React from 'react';

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-semibold text-gray-900">Nexxus Seed</h1>
        <p className="mt-1 text-sm text-gray-500">
          File scanning and metadata extraction tool
        </p>
      </div>
    </header>
  );
}

