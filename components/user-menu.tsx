'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { SignInModal } from '@/components/auth/sign-in-modal';
import { User, LogOut, LogIn } from 'lucide-react';

export function UserMenu() {
  const { user, isAuthenticated, signOut } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4" />
          <span className="hidden sm:inline">{user.email}</span>
        </div>
        <Button variant="outline" size="sm" onClick={handleSignOut} disabled={isLoading}>
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline ml-1">Sign Out</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="text-sm text-muted-foreground">
        <LogIn className="h-4 w-4 inline mr-1" />
        <span className="hidden sm:inline">Guest</span>
      </div>
      <Button variant="outline" size="sm" onClick={() => setShowSignInModal(true)}>
        Sign In
      </Button>

      <SignInModal isOpen={showSignInModal} onClose={() => setShowSignInModal(false)} />
    </div>
  );
}
