"use client";

import { createContext, useContext, useEffect, useState } from "react";

export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
}

interface ProfileContextType {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
}

const ProfileContext = createContext<ProfileContextType | null>(null);

export function ProfileProvider({ children, initialUser }: { children: React.ReactNode, initialUser: any }) {
  const [profile, setProfile] = useState<Profile>({
    id: initialUser?.id || "unknown",
    firstName: initialUser?.given_name || "Admin",
    lastName: initialUser?.family_name || "User",
    email: initialUser?.email || "admin@hospital.com",
    phone: "+1 (555) 000-0000",
    role: "System Administrator",
  });

  useEffect(() => {
    if (!initialUser?.id) return;

    // Fetch the true profile from our secure API
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data?.profile) {
          setProfile(prev => ({ ...prev, ...data.profile }));
        }
      })
      .catch((err) => console.error("Failed to fetch profile:", err));
  }, [initialUser?.id]);

  return <ProfileContext.Provider value={{ profile, setProfile }}>{children}</ProfileContext.Provider>;
}

export function useProfileContext() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfileContext must be used within ProfileProvider");
  return ctx;
}
