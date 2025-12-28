import { AuthContext } from "./AuthContext";
import axios from "axios"

export const AuthProvider = ({ children }) => {
  const register = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/register",
        formData 
        // {
        //   headers: { "content-type": "application/json" },
        // }
      );
      return response.data;
    } catch (error) {
        return error.response.data;
    }
  };

  const login = async (formData)=>{
    try {
        const response = await axios.post("http://localhost:3000/api/login", formData)
        return response.data

    } catch (error) {
        return error.response.data
    }
  }

  return (
    <AuthContext.Provider value={{register, login}}>
        {children}
    </AuthContext.Provider>
  );
};
