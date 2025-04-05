import {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextProps {
  id: string;
  email: string;
}

interface AuthContextType {
  userInfo: AuthContextProps | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  setUserInfo: React.Dispatch<SetStateAction<AuthContextProps | null>>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("The auth context must be within a provider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [userInfo, setUserInfo] = useState<AuthContextProps | null>(null);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setUserInfo(JSON.parse(userInfo));
    } else {
      fetchProfileInformation();
    }
  }, []);

  const fetchProfileInformation = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/auth/profile?id=${userInfo?.id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      setUserInfo({ email: data.user.email, id: data.user._id });
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ email: data.user.email, id: data.user._id })
      );
    } catch (err) {
      console.error("Error fetching the user profile", err);
    }
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/auth/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Sign in failed");
      }

      const data = await response.json();
      console.log("Successfully signed in");
      setUserInfo({ email, id: data.user._id });
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ email, id: data.user._id })
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string): Promise<void> => {
    try {
      const result = await fetch("http://localhost:3000/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInfo: { email, password } }),
      });
      const data = await result.json();
      console.log("Successfully signed up");
      setUserInfo({ email, id: data.user._id });
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ email, id: data.user._id })
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ signUp, signIn, userInfo, setUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
