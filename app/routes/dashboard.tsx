import { useState } from "react";
import { agendamentos } from "database/database-agendamentos";
import { PlusCircle } from "lucide-react";
import { formatHoras } from "utils/formatarData";
import { horarios_database } from "database/horarios";

export default function Dashboard() {
    const medicoId = 1; // ID do médico logado
    const [mesSelecionado, setMesSelecionado] = useState(new Date());
    const [diaSelecionado, setDiaSelecionado] = useState<Date | null>(null);
    const [modalAberto, setModalAberto] = useState(false);

    const [novoHorario, setNovoHorario] = useState<string>(""); // input hora

    // Filtra agendamentos do médico
    const agendamentosDoMedico = agendamentos.filter(a => a.medico.id === medicoId);

    // Dias do mês
    const diasNoMes = new Date(mesSelecionado.getFullYear(), mesSelecionado.getMonth() + 1, 0).getDate();
    const diasArray = Array.from({ length: diasNoMes }, (_, i) => i + 1);

    const abrirModalDia = (dia: number) => {
        const data = new Date(mesSelecionado.getFullYear(), mesSelecionado.getMonth(), dia);
        setDiaSelecionado(data);
        setModalAberto(true);
    };

    const fecharModal = () => {
        setDiaSelecionado(null);
        setModalAberto(false);
        setNovoHorario("");
    };

    // Agendamentos do dia selecionado
    const agendamentosDoDia = diaSelecionado
        ? agendamentosDoMedico.filter(
            a =>
                a.inicio.getFullYear() === diaSelecionado.getFullYear() &&
                a.inicio.getMonth() === diaSelecionado.getMonth() &&
                a.inicio.getDate() === diaSelecionado.getDate()
        )
        : [];

    // Adicionar novo horário
    const handleAdicionarHorario = () => {
        if (!novoHorario || !diaSelecionado) return;

        const [horas, minutos] = novoHorario.split(":").map(Number);
        const dataNova = new Date(diaSelecionado);
        dataNova.setHours(horas, minutos, 0, 0);

        // Adiciona no horarios_database
        const medicoHorarios = horarios_database.find(h => h.idMedico === medicoId);
        if (medicoHorarios) {
            medicoHorarios.horarios.push(dataNova);
        } else {
            horarios_database.push({ idMedico: medicoId, horarios: [dataNova] });
        }

        setNovoHorario(""); // limpa input
    };

    return (
        <main className="text-black flex justify-center p-6 w-screen">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6">
                <h1 className="text-2xl font-bold mb-6 text-gray-900">Dashboard do Médico</h1>

                {/* Seleção de mês */}
                <div className="flex justify-between items-center mb-4">
                    <button
                        onClick={() => setMesSelecionado(new Date(mesSelecionado.getFullYear(), mesSelecionado.getMonth() - 1, 1))}
                        className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                    >
                        {"<"} Mês Anterior
                    </button>
                    <span className="font-semibold">{`${mesSelecionado.getMonth() + 1}/${mesSelecionado.getFullYear()}`}</span>
                    <button
                        onClick={() => setMesSelecionado(new Date(mesSelecionado.getFullYear(), mesSelecionado.getMonth() + 1, 1))}
                        className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                    >
                        Próximo Mês {">"}
                    </button>
                </div>

                {/* Grid de dias */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                    {diasArray.map(dia => {
                        const data = new Date(mesSelecionado.getFullYear(), mesSelecionado.getMonth(), dia);
                        const temAgendamento = agendamentosDoMedico.some(
                            a =>
                                a.inicio.getFullYear() === data.getFullYear() &&
                                a.inicio.getMonth() === data.getMonth() &&
                                a.inicio.getDate() === data.getDate()
                        );

                        return (
                            <button
                                key={dia}
                                onClick={() => abrirModalDia(dia)}
                                className={`p-3 rounded-lg text-center transition ${temAgendamento
                                    ? "bg-green-500 text-white hover:bg-green-600"
                                    : "bg-gray-100 text-gray-800 hover:bg-blue-500 hover:text-white"
                                    }`}
                            >
                                {dia}
                            </button>
                        );
                    })}
                </div>

                {/* Legenda */}
                <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-2">
                        <span className="w-4 h-4 bg-green-500 rounded-sm inline-block"></span>
                        <span>Dia com agendamento</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-4 h-4 bg-gray-100 rounded-sm border border-gray-300 inline-block"></span>
                        <span>Dia sem horários disponíveis</span>
                    </div>
                </div>

                {/* Modal */}
                {modalAberto && diaSelecionado && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white rounded-2xl p-6 w-full max-w-md relative">
                            <button
                                onClick={fecharModal}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                            >
                                ✖
                            </button>
                            <h2 className="text-xl font-bold mb-4">{`Horários em ${diaSelecionado.getDate()}/${diaSelecionado.getMonth() + 1}/${diaSelecionado.getFullYear()}`}</h2>

                            <ul className="flex flex-col gap-2 mb-4">
                                {horarios_database
                                    .find(h => h.idMedico === medicoId)?.horarios
                                    .filter(h =>
                                        h.getFullYear() === diaSelecionado.getFullYear() &&
                                        h.getMonth() === diaSelecionado.getMonth() &&
                                        h.getDate() === diaSelecionado.getDate()
                                    )
                                    .map((horario, idx) => {
                                        const agendamento = agendamentosDoDia.find(a => a.inicio.getTime() === horario.getTime());
                                        const estaAgendado = !!agendamento;

                                        return (
                                            <li
                                                key={idx}
                                                className={`p-2 rounded-lg flex justify-between items-center ${estaAgendado ? "bg-red-500 text-white" : "bg-green-500 text-white"
                                                    }`}
                                            >
                                                <span>{formatHoras(horario)}</span>
                                                {estaAgendado ? (
                                                    <span className="text-sm font-medium">{`Agendado com ${agendamento.cliente.nome}`}</span>
                                                ) : (
                                                    <span className="text-sm font-medium">Disponível</span>
                                                )}
                                            </li>
                                        );
                                    })}
                            </ul>

                            {/* Input para adicionar horário */}
                            <div className="mt-4">
                                <h3 className="font-semibold mb-2 flex items-center gap-2">
                                    <PlusCircle size={18} /> Adicionar novo horário
                                </h3>
                                <div className="flex gap-2 items-center">
                                    <input
                                        type="time"
                                        value={novoHorario}
                                        onChange={(e) => setNovoHorario(e.target.value)}
                                        className="border border-gray-300 rounded-lg p-2"
                                    />
                                    <button
                                        onClick={handleAdicionarHorario}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                    >
                                        Adicionar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
