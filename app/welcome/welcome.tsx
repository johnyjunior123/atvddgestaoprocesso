export function Welcome() {
    return (
        <main className="flex h-screen items-center justify-center bg-black px-4">
            <form
                action=""
                className="flex flex-col bg-white text-gray-800 p-8 sm:p-10 md:p-12 gap-4 rounded-2xl shadow-lg w-full max-w-sm"
            >
                <h1 className="text-2xl font-bold text-center text-gray-900">Bem-vindo</h1>

                <div className="flex flex-col gap-2">
                    <label htmlFor="cpf" className="text-sm font-medium">Login</label>
                    <input
                        type="text"
                        name="cpf"
                        id="cpf"
                        placeholder="Digite seu login"
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
