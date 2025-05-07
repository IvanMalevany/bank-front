"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuthStore } from "@/lib/stores/auth-store";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthStore();
  
  useEffect(() => {
    // If authenticated, go to dashboard, otherwise go to login
    if (!isLoading) {
      if (isAuthenticated) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    }
  }, [isLoading, isAuthenticated, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-50">
      <div className="text-center p-8 animate-pulse">
        <div className="relative w-32 h-32 mx-auto mb-6">
          <Image
            src="/bee-logo.svg"
            alt="BeeBank Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <h1 className="text-4xl font-bold text-yellow-600 mb-4">BeeBank</h1>
        <p className="text-gray-600">Loading your banking experience...</p>
      </div>
    </div>
  );
}
