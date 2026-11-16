import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type AuthContextValue = {
    user: string | null;
    login: (email: string) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

// состояние пользователя доступно всем экранам навигатора
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<string | null>(null);

    function login(email: string) {
        setUser(email);
    }

    function logout() {
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth должен использоваться внутри AuthProvider");
    }

    return context;
}
