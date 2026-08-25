"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useEnv } from "./EnvProvider";

const AuthModalContext = createContext({ open: () => {}, close: () => {} });

export function useAuthModal() {
  return useContext(AuthModalContext);
}

/**
 * Login / signup modal, ported from the string-injected markup in base.js.
 * The backend it talks to is API_BASE_URL from .env.
 */
export function AuthModalProvider({ children }) {
  const { apiBaseUrl } = useEnv();
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState(null); // { text, isError }

  const open = useCallback(() => {
    setMessage(null);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);
  const value = useMemo(() => ({ open, close }), [open, close]);

  function switchTab(login) {
    setMessage(null);
    setIsLogin(login);
  }

  async function post(endpoint, payload) {
    const response = await fetch(`${apiBaseUrl}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    let data;
    try {
      data = await response.json();
    } catch {
      data = { message: "Server error" };
    }
    return { response, data };
  }

  async function handleLogin(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setPending(true);
    setMessage(null);
    try {
      const { response, data } = await post("/api/users/login", {
        email: form.get("email"),
        password: form.get("password"),
      });
      if (response.ok) {
        setMessage({ text: "Login successful!", isError: false });
        if (data.token) localStorage.setItem("mindhack_token", data.token);
        setTimeout(() => {
          setIsOpen(false);
          window.location.reload();
        }, 1000);
      } else {
        setMessage({
          text: data.message || "Login failed. Please check your credentials.",
          isError: true,
        });
      }
    } catch {
      setMessage({ text: "Network error. Please try again later.", isError: true });
    } finally {
      setPending(false);
    }
  }

  async function handleSignup(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setPending(true);
    setMessage(null);
    try {
      const { response, data } = await post("/api/users/register", {
        username: form.get("username"),
        email: form.get("email"),
        password: form.get("password"),
      });
      if (response.ok) {
        setMessage({ text: "Account created successfully!", isError: false });
        setTimeout(() => switchTab(true), 1500);
      } else {
        setMessage({
          text: data.message || "Registration failed. Please try again.",
          isError: true,
        });
      }
    } catch {
      setMessage({ text: "Network error. Please try again later.", isError: true });
    } finally {
      setPending(false);
    }
  }

  return (
    <AuthModalContext.Provider value={value}>
      {children}

      <div
        className={"auth-overlay" + (isOpen ? " active" : "")}
        id="auth-overlay"
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="auth-modal">
          <button className="auth-close" onClick={close} aria-label="Close">
            <i className="fas fa-times" />
          </button>

          <div className="auth-tabs">
            <button
              className={"auth-tab" + (isLogin ? " active" : "")}
              onClick={() => switchTab(true)}
            >
              Login
            </button>
            <button
              className={"auth-tab" + (!isLogin ? " active" : "")}
              onClick={() => switchTab(false)}
            >
              Sign Up
            </button>
            <div
              className="auth-tab-indicator"
              style={{ transform: isLogin ? "translateX(0)" : "translateX(100%)" }}
            />
          </div>

          <div
            className={
              "auth-message" + (message ? (message.isError ? " error" : " success") : "")
            }
          >
            {message?.text || ""}
          </div>

          <form
            className={"auth-form" + (isLogin ? " active" : "")}
            onSubmit={handleLogin}
          >
            <div className="auth-input-group">
              <label htmlFor="login-email">Email</label>
              <input id="login-email" name="email" type="email" className="auth-input"
                     placeholder="Enter your email" required />
            </div>
            <div className="auth-input-group">
              <label htmlFor="login-password">Password</label>
              <input id="login-password" name="password" type="password" className="auth-input"
                     placeholder="Enter your password" required />
            </div>
            <button type="submit" className="auth-submit-btn" disabled={pending}>
              {pending ? "Logging in..." : "Login to Mindhack"}
            </button>
          </form>

          <form
            className={"auth-form" + (!isLogin ? " active" : "")}
            onSubmit={handleSignup}
          >
            <div className="auth-input-group">
              <label htmlFor="signup-username">Username</label>
              <input id="signup-username" name="username" type="text" className="auth-input"
                     placeholder="Choose a username" required />
            </div>
            <div className="auth-input-group">
              <label htmlFor="signup-email">Email</label>
              <input id="signup-email" name="email" type="email" className="auth-input"
                     placeholder="Enter your email" required />
            </div>
            <div className="auth-input-group">
              <label htmlFor="signup-password">Password</label>
              <input id="signup-password" name="password" type="password" className="auth-input"
                     placeholder="Create a password" required />
            </div>
            <button type="submit" className="auth-submit-btn" disabled={pending}>
              {pending ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </AuthModalContext.Provider>
  );
}
