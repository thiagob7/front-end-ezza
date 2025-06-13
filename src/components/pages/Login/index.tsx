"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Logo from "~/components/common/Logo";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (res?.ok) {
      router.push("/");
    } else {
      alert("Usuário ou senha inválidos");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex justify-center">
          <Logo />
        </div>

        <div className="text-left">
          <h2 className="text-lg font-semibold text-gray-900">Login</h2>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-1">
            <label htmlFor="user" className="text-sm font-medium text-gray-800">
              Usuário
            </label>
            <input
              id="user"
              type="text"
              placeholder="user"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex flex-col space-y-1 relative">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-800"
            >
              Senha
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="********"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] text-sm text-gray-600 hover:text-teal-600"
            >
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-500/95 cursor-pointer duration-300 transition-colors font-semibold"
          >
            ENTRAR
          </button>
        </form>
      </div>
    </div>
  );
}
