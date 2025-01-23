import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { UserProfile } from '@/components/UserProfile';

const Profile = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto space-y-8 py-8">
        <UserProfile />
      </main>
      <Footer />
    </div>
  );
};

export default Profile;