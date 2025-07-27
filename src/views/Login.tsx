import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

type LoginProps = {
  apiBaseUrl: string;
};

const Login = ({ apiBaseUrl }: LoginProps) => {
  const navigate = useNavigate();

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const username = formData.get("username");
      const password = formData.get("password");

      const response = await axios.post(`${apiBaseUrl}/api/v1/auth/login`, {
        username: username,
        password: password,
      });

      const data = response.data;

      if (!data.success) {
        throw new Error(data.data.message);
      }

      Cookies.set("token", `Bearer ${data.data.token}`);

      navigate("/");
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Login gagal");
      } else {
        toast.error("Terjadi kesalahan");
      }
    }
  }

  return (
    <>
      <form onSubmit={submitForm}>
        <input name="username" placeholder="Username" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
