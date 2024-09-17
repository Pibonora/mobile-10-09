// context/auth.tsx
import React, { createContext, useEffect, useState } from 'react';
import LogingUser, { CreateUser, LogoutUser } from '../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginProps {
  email: string;
  password: string;
  
}

interface AuthContextData {
  signed: boolean;
  user: object | null;
  SignIn(email: string, password: string): Promise<void>;
  CreateAccount(email: string, password: string): Promise<void>;
  SignOut(): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<object | null>(null);

  useEffect(() => {
    async function loadStorageData() {
      const storageUser = await AsyncStorage.getItem('@RNAuth:user');
      const storageToken = await AsyncStorage.getItem('@RNAuth:token');

      if (storageToken && storageUser) {
        setUser(JSON.parse(storageUser));
      }
    }

    loadStorageData();
  }, []);

  async function SignIn(email: string, password: string) {
    const response = await LogingUser(email, password);
    setUser(response.user);
    await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
    await AsyncStorage.setItem('@RNAuth:token', response.token);
  }

  async function SignOut() {
    await LogoutUser();
    setUser(null);
    await AsyncStorage.removeItem('@RNAuth:user');
    await AsyncStorage.removeItem('@RNAuth:token');
  }

  async function CreateAccount(email: string, password: string) {
    const response = await CreateUser(email, password);
    setUser(response.user);
    await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
    await AsyncStorage.setItem('@RNAuth:token', response.token);
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, SignIn, SignOut, CreateAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
