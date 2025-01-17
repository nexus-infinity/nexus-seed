import React from 'react'
import { FileScanner } from '@/components/scanner/FileScanner'
import { Header } from '@/components/layout/Header'

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <FileScanner />
      </main>
    </div>
  )
}

export default App

