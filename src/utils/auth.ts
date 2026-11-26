export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";
export const AUTH_CHANGED_EVENT = "auth:changed";

export type AuthUser = {
  name: string;
  last_name: string;
  email: string;
  address: string;
  country: string;
  city: string;
  phone_number: string;
  postal_code: string;
};

type StoredAccount = AuthUser & { password: string };
const ACCOUNTS_KEY = "ynadime_accounts";
const USER_KEY = "ynadime_current_user";

function getAccounts(): StoredAccount[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || "[]");
  } catch {
    return [];
  }
}

function setSession(user: AuthUser) {
  localStorage.setItem("auth_token", `demo-${Date.now()}`);
  localStorage.setItem("token_type", "Bearer");
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
}

export const auth = {
  getToken: () =>
    typeof window === "undefined" ? null : localStorage.getItem("auth_token"),
  getCurrentUser: (): AuthUser | null => {
    if (typeof window === "undefined") return null;
    try {
      const value = localStorage.getItem(USER_KEY);
      return value ? JSON.parse(value) : null;
    } catch {
      return null;
    }
  },
  register: (data: AuthUser & { password: string }) => {
    const accounts = getAccounts();
    if (accounts.some((item) => item.email.toLowerCase() === data.email.toLowerCase())) {
      throw new Error("An account with this email already exists.");
    }
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...accounts, data]));
  },
  login: (email: string, password: string) => {
    const account = getAccounts().find(
      (item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password
    );
    if (!account) throw new Error("Incorrect email or password.");
    const { password: ignoredPassword, ...user } = account;
    void ignoredPassword;
    setSession(user);
    return user;
  },
  loginAsDemo: () => {
    const user: AuthUser = {
      name: "Demo", last_name: "Customer", email: "demo@ynadimeshop.com",
      address: "12 Market Street", country: "France", city: "Paris",
      phone_number: "+33 1 23 45 67 89", postal_code: "75001",
    };
    if (!getAccounts().some((item) => item.email === user.email)) {
      localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...getAccounts(), { ...user, password: "demo12345" }]));
    }
    setSession(user);
    return user;
  },
  resetPassword: (email: string, password: string) => {
    const accounts = getAccounts();
    const index = accounts.findIndex((item) => item.email.toLowerCase() === email.toLowerCase());
    if (index < 0) throw new Error("No account was found for this email.");
    accounts[index] = { ...accounts[index], password };
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  },
  changePassword: (currentPassword: string, newPassword: string) => {
    const current = auth.getCurrentUser();
    if (!current) throw new Error("Please log in again.");
    const accounts = getAccounts();
    const index = accounts.findIndex((item) => item.email.toLowerCase() === current.email.toLowerCase());
    if (index < 0 || accounts[index].password !== currentPassword) throw new Error("Current password is incorrect.");
    accounts[index] = { ...accounts[index], password: newPassword };
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  },
  updateUser: (changes: Partial<AuthUser>) => {
    const current = auth.getCurrentUser();
    if (!current) return null;
    const user = { ...current, ...changes };
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(getAccounts().map((account) =>
      account.email.toLowerCase() === current.email.toLowerCase() ? { ...account, ...changes } : account
    )));
    window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
    return user;
  },
  removeToken: () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("auth_token");
    localStorage.removeItem("token_type");
    localStorage.removeItem(USER_KEY);
    window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
  },
  isAuthenticated: () => !!auth.getToken() && !!auth.getCurrentUser(),
  getUser: async () => auth.getCurrentUser(),
  logout: async () => auth.removeToken(),
};
