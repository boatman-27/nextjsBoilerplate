"use client";
import React, { createContext, useContext, useReducer, useEffect } from "react";
import type { UserAction, UserInitialState } from "@/types/UserModels";

const user: UserInitialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  accessToken: "",
};

const UserContext = createContext<{
  state: UserInitialState;
  dispatch: React.Dispatch<UserAction>;
}>({
  state: user,
  dispatch: () => undefined,
});

const userReducer = (
  state: UserInitialState,
  action: UserAction,
): UserInitialState => {
  switch (action.type) {
    case "Login": {
      if (!action.payload.user) {
        return {
          ...state,
          user: null,
          isAuthenticated: false,
          isLoading: false,
        };
      }
      if (action.payload.accessToken) {
        localStorage.setItem("accessToken", action.payload.accessToken);
      }
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
        accessToken: action.payload.accessToken,
      };
    }
    case "Logout": {
      localStorage.removeItem("accessToken");
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        accessToken: "",
      };
    }
    default:
      return state;
  }
};

function UserProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(userReducer, user);
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const res = await fetch("/api/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, action: "validate" }),
          });

          if (!res.ok) throw new Error("Invalid token");
          const data = await res.json();
          const user = data.user;
          dispatch({
            type: "Login",
            payload: { user, accessToken: token },
          });
        } catch {
          localStorage.removeItem("accessToken");
          dispatch({ type: "Logout" });
        }
      } else {
        dispatch({ type: "Logout" });
      }
    };

    checkAuth();
  }, []);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

function UseUser() {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("UserContext must be used within a UserProvider");
  return context;
}

export { UserProvider, UseUser };
