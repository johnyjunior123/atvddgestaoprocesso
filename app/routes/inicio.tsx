import { AgendamentoStatus, type Agendamento } from "database/agendamento";
import { medicos } from "database/medicos";
import { users } from "database/user";
import { PlusCircle, Calendar, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { capitalizeWords } from "utils/capitalizeWords";
import { formatDateWithTime } from "utils/formatarData";
import { getStatusColor } from "utils/getColor";

export default function TelaInicial() {
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([
        { id: 1, inicio: new Date(), fim: new Date(), cliente: users[0], tipo: 'Medico Geral', status: AgendamentoStatus.ativo, medico: medicos[0] }
    ])
    const navigate = useNavigate()

    useEffect(() => {
        const data = localStorage.getItem('agendamentos')
        let agendamentosSalvos: Agendamento[] = []
        if (data) {
            agendamentosSalvos = JSON.parse(data)
        }
        if (agendamentosSalvos.length >= 1) {
            setAgendamentos(agendamentosSalvos)
        }
    }, [])

    const handleCancel = async (id: number): Promise<void> => {
        setAgendamentos(agendamentos.map(element => {
            if (element.id == id) {
                return { ...element, status: AgendamentoStatus.cancelado }
            }
            return element
        }))
    }

    return (
        <main className="flex justify-center p-6 w-screen">
            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8 flex flex-col gap-8">
                {/* Header */}
                <header className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Agendamentos</h1>
                    <div className="flex gap-4">
                        <button onClick={() => navigate('agendar')} className="cursor-pointer flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg transition-transform transform hover:scale-105">
                            <PlusCircle size={20} />
                            Novo
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="cursor-pointer flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg transition-transform transform hover:scale-105">
                            <LogOut size={20} />
                            Sair
                        </button>
                    </div>
                </header>

                {/* Lista de Agendamentos */}
                <section className="flex flex-col gap-4">
                    {agendamentos && agendamentos.map(agendamento => (
                        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl shadow hover:shadow-md transition">
                            <div className="flex items-center gap-3">
                                <Calendar className="text-blue-500" />
                                <div>
                                    <p className="text-gray-800 font-semibold">{capitalizeWords(agendamento.tipo)}</p>
                                    <span className="text-gray-500 text-sm">{`Dia: ${formatDateWithTime(agendamento.inicio)}`}</span>
                                </div>
                            </div>
                            <span className={`text-sm ${getStatusColor(agendamento.status)}`}>{capitalizeWords(agendamento.status)}</span>
                            {agendamento.status == AgendamentoStatus.ativo && (
                                <button onClick={() => {
                                    agendamento.id ? handleCancel(agendamento.id) : 'Nothing'
                                }
                                } className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                >Cancelar</button>
                            )}
                        </div>
                    ))}
                </section>
            </div>
        </main>
    );
}
