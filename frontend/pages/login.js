import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", { email, password });
      console.log(response.data);
    } catch (error) {
      console.error("Error", error.response.data.error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form className="w-64" onSubmit={handleSubmit}>
        <h1 className="mb-4 text-2xl font-bold">Login</h1>
        <div className="mb-4">
          <label htmlFor="email" className="mb-1 block">
            email
          </label>
          <input
            type="email"
            id="email"
            className="w-full rounded border border-gray-300 p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="mb-1 block">
            password
          </label>
          <input
            type="password"
            id="password"
            className="w-full rounded border border-gray-300 p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          Login
        </button>
      </form>
    </div>
  );
};
export default Login;
