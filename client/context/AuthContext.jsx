import { createContext, useEffect, useState } from "react"
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [authUser, setAuthUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  const checkAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/check");
      if (data.success) {
        setAuthUser(data.user);
        connectSocket(data.user);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const login = async (state, credentials) => {
    try {
      const { data } = await axios.post(`/api/auth/${state}`, credentials);
      if (data.success) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        setAuthUser(data.userData);
        axios.defaults.headers.common['token'] = data.token;
        connectSocket(data.userData);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const logout = async () => {
    setToken(null);
    setAuthUser(null);
    localStorage.removeItem('token');
    setOnlineUsers([]);
    toast.success("Logged out successfully");
    if (socket?.disconnect) socket.disconnect();
    setSocket(null);
  }

  const updateProfile = async (updatedData) => {
    try {
      const { data } = await axios.put("/api/auth/update-profile", updatedData);
      if (data.success) {
        setAuthUser(data.user);
        toast.success("Profile updated successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const connectSocket = (userData) => {
    if (!userData) return;
    if (socket?.connected) return;
    const newSocket = io(backendUrl, {
      query: { userId: userData._id }
    });
    setSocket(newSocket);
    newSocket.on("onlineUsers", (userIds) => {
      setOnlineUsers(userIds);
    });
  }

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['token'] = token;
      checkAuth();
    }
    return () => {
      if (socket?.disconnect) socket.disconnect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const value = {
    axios,
    onlineUsers,
    socket,
    authUser,
    login,
    logout,
    updateProfile,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}