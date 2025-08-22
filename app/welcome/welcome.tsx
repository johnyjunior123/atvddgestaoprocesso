import { users } from "database/user";
import { useState } from "react";
import { useNavigate } from "react-router";

export function Welcome() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const login = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.target as HTMLFormElement)
        let usuario
        for (let element of users) {
            if (element.email == formData.get('email') && element.password == formData.get('password')) {
                usuario = element
                break
            }
        }
        setLoading(false)
        if (!usuario) {
            setLoading(false)
            return alert('O email ou senha está incorreto!')
        }
        localStorage.setItem('usuario', JSON.stringify(usuario))
        if (usuario.role == 'usuario') {
            return navigate('/inicio')
        }
        if (usuario.role == 'doutor') {
            return navigate('/dashboard')
        }
    }

    return (
        <main className="flex h-screen items-center justify-center bg-black px-4">
            <form
                onSubmit={login}
                className="flex flex-col bg-white text-gray-800 p-8 sm:p-10 md:p-12 gap-4 rounded-2xl shadow-lg w-full max-w-sm"
            >
                <h1 className="text-2xl font-bold text-center text-gray-900">Bem-vindo</h1>

                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium">Login</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Digite seu E-mail"
                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="text-sm font-medium">Senha</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Digite sua senha"
                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all"
                >
                    Entrar
                </button>

                <p className="text-xs text-gray-500 text-center mt-2">
                    Esqueceu sua senha? <a href="#" className="text-blue-600 hover:underline">Recuperar</a>
                </p>
            </form>
        </main>
    );
}
