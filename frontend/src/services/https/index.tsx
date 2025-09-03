import axios from "axios";
const API_URL = import.meta.env.VITE_API_KEY || "http://localhost:8088";

const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split(";");
  const cookie = cookies.find((row) => row.trim().startsWith(`${name}=`));
  if (cookie) {
    let AccessToken = decodeURIComponent(cookie.split("=")[1]);
    AccessToken = AccessToken.replace(/\\/g, "").replace(/"/g, "");
    return AccessToken ? AccessToken : null;
  }
  return null;
};

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = getCookie("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ===== Auth Controller =====
export const register = async (username: string, email: string, password: string) => {
  const res = await api.post("/auth/register", { username, email, password });
  return res.data;
};
export const login = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

// ===== User Controller =====
export const getUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};
export const getUserById = async (id: string) => {
  const res = await api.get(`/users/${id}`);
  return res.data;
};
export const createUser = async (user: any) => {
  const res = await api.post("/users", user);
  return res.data;
};
export const updateUser = async (id: string, user: any) => {
  const res = await api.put(`/users/${id}`, user);
  return res.data;
};
export const deleteUser = async (id: string) => {
  const res = await api.delete(`/users/${id}`);
  return res.data;
};

// ===== Game Controller =====
export const getGames = async () => {
  const res = await api.get("/games");
  return res.data;
};
export const getGameById = async (id: string) => {
  const res = await api.get(`/games/${id}`);
  return res.data;
};
export const createGame = async (game: any) => {
  const res = await api.post("/games", game);
  return res.data;
};
export const updateGame = async (id: string, game: any) => {
  const res = await api.put(`/games/${id}`, game);
  return res.data;
};
export const deleteGame = async (id: string) => {
  const res = await api.delete(`/games/${id}`);
  return res.data;
};

// ===== Mod Controller =====
export const getMods = async () => {
  const res = await api.get("/mods");
  return res.data;
};
export const getModById = async (id: string) => {
  const res = await api.get(`/mods/${id}`);
  return res.data;
};
export const createMod = async (mod: any) => {
  const res = await api.post("/mods", mod);
  return res.data;
};
export const updateMod = async (id: string, mod: any) => {
  const res = await api.put(`/mods/${id}`, mod);
  return res.data;
};
export const deleteMod = async (id: string) => {
  const res = await api.delete(`/mods/${id}`);
  return res.data;
};

// ===== Tag Controller =====
export const getTags = async () => {
  const res = await api.get("/tags");
  return res.data;
};
export const getTagById = async (id: string) => {
  const res = await api.get(`/tags/${id}`);
  return res.data;
};
export const createTag = async (tag: any) => {
  const res = await api.post("/tags", tag);
  return res.data;
};
export const updateTag = async (id: string, tag: any) => {
  const res = await api.put(`/tags/${id}`, tag);
  return res.data;
};
export const deleteTag = async (id: string) => {
  const res = await api.delete(`/tags/${id}`);
  return res.data;
};

// ===== เพิ่ม controller อื่น ๆ ได้ตามต้องการ =====