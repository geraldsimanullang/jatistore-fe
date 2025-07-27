import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import Page from "../components/Page";

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

      Cookies.set("Authorization", `Bearer ${data.data.token}`);

      navigate("/");
    } catch (error) {
      console.log(error);

      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data.error || "Login gagal");
      } else {
        console.error(error);
        toast.error("Terjadi kesalahan");
      }
    }
  }

  return (
    <Page title="Login - Jati Frozen POS">
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Login
          </h2>
          <form onSubmit={submitForm} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </Page>
  );
};

export default Login;
