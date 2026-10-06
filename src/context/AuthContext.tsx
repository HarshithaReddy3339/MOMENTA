import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  updateProfile,
  linkWithCredential,
  updatePassword,
  EmailAuthProvider
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db, googleProvider, handleFirestoreError, OperationType, testConnection } from '../lib/firebase';
import { UserProfile } from '../types';

export class FirebaseAuthError extends Error {
  code: string;
  stage: 'auth' | 'profile';
  constructor(message: string, code: string, stage: 'auth' | 'profile') {
    super(message);
    this.name = 'FirebaseAuthError';
    this.code = code;
    this.stage = stage;
  }
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (name: string, email: string, phone: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  setMomentaPassword: (newPass: string) => Promise<void>;
  changeMomentaPassword: (newPass: string) => Promise<void>;
  hasPasswordProvider: boolean;
  hasGoogleProvider: boolean;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Helper to fetch or initialize Firestore user profile
  const fetchProfile = async (firebaseUser: User): Promise<UserProfile | null> => {
    const userDocRef = doc(db, 'users', firebaseUser.uid);
    try {
      const snap = await getDoc(userDocRef);
      if (snap.exists()) {
        const data = snap.data() as UserProfile;
        setProfile(data);
        return data;
      }
      return null;
    } catch (err) {
      handleFirestoreError(err, OperationType.GET, `users/${firebaseUser.uid}`);
      return null;
    }
  };

  const refreshProfile = async () => {
    if (auth.currentUser) {
      await fetchProfile(auth.currentUser);
    }
  };

  useEffect(() => {
    // Initial connectivity check
    testConnection();

    // Firebase Auth State Observer
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        await fetchProfile(firebaseUser);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const hasPasswordProvider = !!user?.providerData.some(p => p.providerId === 'password');
  const hasGoogleProvider = !!user?.providerData.some(p => p.providerId === 'google.com');

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const fbUser = result.user;
    const userDocRef = doc(db, 'users', fbUser.uid);

    try {
      const snap = await getDoc(userDocRef);
      const now = new Date().toISOString();

      if (!snap.exists()) {
        const newProfile: UserProfile = {
          uid: fbUser.uid,
          name: fbUser.displayName || 'MOMENTA Member',
          email: fbUser.email || '',
          phoneNumber: fbUser.phoneNumber || '',
          profilePhoto: fbUser.photoURL || '',
          createdAt: now,
          lastLoginAt: now,
          authProvider: 'google'
        };
        await setDoc(userDocRef, newProfile);
        setProfile(newProfile);
      } else {
        await updateDoc(userDocRef, { lastLoginAt: now });
        setProfile((prev) => prev ? { ...prev, lastLoginAt: now } : null);
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `users/${fbUser.uid}`);
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    const result = await signInWithEmailAndPassword(auth, email.trim(), pass);
    const fbUser = result.user;
    const userDocRef = doc(db, 'users', fbUser.uid);
    const now = new Date().toISOString();

    try {
      const snap = await getDoc(userDocRef);
      if (snap.exists()) {
        await updateDoc(userDocRef, { lastLoginAt: now });
        setProfile((prev) => prev ? { ...prev, lastLoginAt: now } : null);
      } else {
        const newProfile: UserProfile = {
          uid: fbUser.uid,
          name: fbUser.displayName || email.split('@')[0],
          email: fbUser.email || email,
          phoneNumber: fbUser.phoneNumber || '',
          profilePhoto: fbUser.photoURL || '',
          createdAt: now,
          lastLoginAt: now,
          authProvider: 'password'
        };
        await setDoc(userDocRef, newProfile);
        setProfile(newProfile);
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `users/${fbUser.uid}`);
    }
  };

  const signUpWithEmail = async (name: string, email: string, phone: string, pass: string) => {
    let fbUser: User;

    // Stage 1: Firebase Authentication
    try {
      const result = await createUserWithEmailAndPassword(auth, email.trim(), pass);
      fbUser = result.user;
      await updateProfile(fbUser, { displayName: name.trim() });
    } catch (err: any) {
      const errorCode = err?.code || 'auth/unknown';
      console.error('[MOMENTA Auth Debug] createUserWithEmailAndPassword failed:', {
        errorCode,
        errorMessage: err?.message,
      });
      throw new FirebaseAuthError(err?.message || 'Authentication failed', errorCode, 'auth');
    }

    // Stage 2: Firestore User Profile Creation
    const now = new Date().toISOString();
    const userDocRef = doc(db, 'users', fbUser.uid);
    const newProfile: UserProfile = {
      uid: fbUser.uid,
      name: name.trim(),
      email: email.trim(),
      phoneNumber: phone.trim(),
      profilePhoto: '',
      createdAt: now,
      lastLoginAt: now,
      authProvider: 'password'
    };

    try {
      await setDoc(userDocRef, newProfile);
    } catch (err: any) {
      console.error('[MOMENTA Auth Debug] Firestore setDoc failed:', {
        uid: fbUser.uid,
        errorMessage: err?.message,
      });
      try {
        await signOut(auth);
      } catch (_) {}
      throw new FirebaseAuthError(
        err?.message || 'Profile setup failed',
        'firestore/permission-denied',
        'profile'
      );
    }

    // Sign out newly registered user so they log in via /login as required
    await signOut(auth);
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setProfile(null);
  };

  const setMomentaPassword = async (newPass: string) => {
    if (!auth.currentUser || !auth.currentUser.email) {
      throw new Error('No authenticated user with an email address found.');
    }
    const credential = EmailAuthProvider.credential(auth.currentUser.email, newPass);
    await linkWithCredential(auth.currentUser, credential);

    const userDocRef = doc(db, 'users', auth.currentUser.uid);
    try {
      await updateDoc(userDocRef, { authProvider: 'google+password' });
      setProfile((prev) => prev ? { ...prev, authProvider: 'google+password' } : null);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `users/${auth.currentUser.uid}`);
    }
  };

  const changeMomentaPassword = async (newPass: string) => {
    if (!auth.currentUser) {
      throw new Error('No user currently authenticated.');
    }
    await updatePassword(auth.currentUser, newPass);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        logout,
        setMomentaPassword,
        changeMomentaPassword,
        hasPasswordProvider,
        hasGoogleProvider,
        refreshProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export function getFriendlyAuthErrorMessage(error: any): string {
  // If failure happened at the Firestore profile creation stage
  if (error instanceof FirebaseAuthError && error.stage === 'profile') {
    return "Your account was created, but we couldn't finish setting up your profile. Please try again.";
  }

  const code: string = 
    typeof error === 'string' 
      ? error 
      : error?.code || error?.message || '';

  // Firebase operation-not-allowed: Email/Password provider disabled in Firebase Console
  if (code.includes('auth/operation-not-allowed')) {
    return 'Email/Password sign up is not enabled in your Firebase project. Please enable "Email/Password" in the Firebase Console (Authentication > Sign-in method).';
  }
  if (code.includes('auth/email-already-in-use')) {
    return 'An account with this email already exists. Please log in.';
  }
  if (code.includes('auth/invalid-email')) {
    return 'Please enter a valid email address.';
  }
  if (code.includes('auth/weak-password')) {
    return 'Please choose a stronger password (at least 6 characters).';
  }
  if (code.includes('auth/network-request-failed')) {
    return 'Unable to connect. Please check your internet connection and try again.';
  }
  if (code.includes('auth/invalid-api-key') || code.includes('auth/configuration-not-found')) {
    return 'Sign up is temporarily unavailable. Please try again later.';
  }
  if (code.includes('auth/too-many-requests')) {
    return 'Too many failed attempts. Please wait a few moments or try again later.';
  }
  if (code.includes('auth/requires-recent-login')) {
    return 'For security, please log out and log in again before changing your password.';
  }
  if (code.includes('auth/credential-already-in-use')) {
    return 'This email credential is already linked to another account.';
  }
  if (code.includes('auth/popup-closed-by-user') || code.includes('auth/cancelled-popup-request')) {
    return 'Google sign-in was closed or cancelled. Please try again.';
  }
  if (code.includes('auth/invalid-credential') || code.includes('auth/wrong-password')) {
    return 'Invalid email or password. Please verify your credentials and try again.';
  }
  if (code.includes('auth/user-not-found')) {
    return 'No MOMENTA account found with this email. Please sign up first.';
  }

  return 'Sign up is temporarily unavailable. Please try again later.';
}
