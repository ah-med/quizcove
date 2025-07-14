export interface User {
  id: string;
  email?: string;
  created_at: string;
  updated_at?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setIsLoading: (loading: boolean) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  createAnonymousUser: () => Promise<string>;
  linkAnonymousUser: (email: string, password: string) => Promise<void>;
}

export interface AnonymousQuizResult {
  id: string;
  email?: string;
  quizHistory: any;
  createdAt: string;
  isLinked: boolean;
}
