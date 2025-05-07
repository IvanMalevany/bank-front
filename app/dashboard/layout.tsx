"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // Handle logout
  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!isAuthenticated) {
    return null; // Don't render anything while checking auth
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-yellow-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="relative w-10 h-10">
              <Image
                src="/bee-logo.svg"
                alt="BeeBank Logo"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="text-xl font-bold">BeeBank</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <p className="text-sm">
                Welcome, {user?.firstName} {user?.lastName}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-white border-white hover:bg-yellow-700"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-4 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>© 2024 BeeBank. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 