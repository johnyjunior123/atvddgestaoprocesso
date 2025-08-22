import { Agendamento, AgendamentoStatus } from "database/agendamento";
import { especialidades } from "database/especialidades";
import { horarios_database } from "database/horarios";
import { Medico } from "database/medico";
import { medicos } from "database/medicos";
import { useState } from "react";
import { useNavigate } from "react-router";
import { formatDateWithTime } from "utils/formatarData";


export default function TelaDeAgendamento() {
    const [etapa, setEtapa] = useState(1)
    const [especialidade, setEspecialidade] = useState('')
    const [medicoSelecionado, setMedicoSelecionado] = useState<Medico>()
    const [medicosFiltrados, setMedicosFiltrados] = useState<Medico[]>([])
    const [horariosDisponiveis, setHorariosDisponiveis] = useState<{ idMedico: number, horarios: Date[] }>()
    const [horarioSelecionado, setHorarioSelecionado] = useState<Date>()
    const navigate = useNavigate()

    const pegarMedicos = (especialidade: string) => {
        setMedicosFiltrados(medicos.filter(element => element.especialidade == especialidade))
    }

    const handleMedicoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let medicoEncontrado = medicos.find(element => element.id == parseInt(e.target.value))
        setMedicoSelecionado(medicoEncontrado);
        if (medicoEncontrado) {
            setHorariosDisponiveis(horarios_database.find(element => element.idMedico == medicoEncontrado.id))
            setEtapa(3);
        } else {
            alert('Medico selecionado está sem horários disponíveis')
        }
    };

    const clicarHorario = (e: Date) => {
        setHorarioSelecionado(e)
    }

    const criarAgendamento = () => {
        console.log('Hello ')
        let data = localStorage.getItem('usuario')
        let usuario
        if (data) {
            usuario = JSON.parse(data)
        }
        if (usuario && horarioSelecionado && medicoSelecionado) {
            const horarioFinal = new Date(horarioSelecionado);
            horarioFinal.setHours(horarioFinal.getHours() + 1);

            let agendamento = new Agendamento(
                horarioSelecionado,
                horarioFinal,
                especialidade,
                AgendamentoStatus.ativo,
                usuario,
                medicoSelecionado
            )

            console.log(agendamento)
            // navigate(-1)
        }
    }

    return (
        <main className="flex justify-center p-6 w-screen">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold mb-6 text-gray-900">
                        {etapa == 1 && "Escolha a especialidade"}
                        {etapa == 2 && `Selecione o ${especialidade}`}
                        {etapa == 3 && `Selecione o horário com ${medicoSelecionado?.usuario.nome}`}
                    </h1>
                    <div className="flex gap-3">
                        <button onClick={() => setEtapa(1)} className={`cursor-pointer flex items-center justify-center p-1 ${etapa == 1 ? 'bg-red-100' : 'bg-gray-100'} rounded-xl text-gray-700 font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all shadow-sm hover:shadow-md`}>1</button>
                        <button onClick={() => setEtapa(2)} className={`cursor-pointer flex items-center justify-center p-1 ${etapa == 2 ? 'bg-red-100' : 'bg-gray-100'} rounded-xl text-gray-700 font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all shadow-sm hover:shadow-md`}>2</button>
                        <button onClick={() => setEtapa(3)} className={`cursor-pointer flex items-center justify-center p-1 ${etapa == 3 ? 'bg-red-100' : 'bg-gray-100'} rounded-xl text-gray-700 font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all shadow-sm hover:shadow-md`}>3</button>
                    </div>
                </div>

                {etapa == 1 && (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {especialidades.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setEtapa(etapa + 1)
                                setEspecialidade(item)
                                pegarMedicos(item)
                            }}
                            className="cursor-pointer flex items-center justify-center p-4 bg-gray-100 rounded-xl text-gray-700 font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all shadow-sm hover:shadow-md"
                        >
                            {item}
                        </button>
                    ))}
                </div>)}

                {etapa === 2 && (
                    <div className="flex flex-col gap-4">
                        <select
                            onChange={handleMedicoChange}
                            className="border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Selecione um médico</option>
                            {especialidade && medicosFiltrados &&
                                medicosFiltrados.map((medico, idx) => (
                                    <option key={idx} value={medico.id}>
                                        {medico.usuario.nome}
                                    </option>
                                ))}
                        </select>c
                    </div>
                )}

                {etapa === 3 && (
                    <div className="flex flex-col gap-6">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {horariosDisponiveis && horariosDisponiveis.horarios.map((h, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => clicarHorario(h)}
                                    className={`p-3 rounded-lg font-semibold transition-all ${horarioSelecionado?.getTime() === h.getTime()
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white"
                                        }`}
                                >
                                    {formatDateWithTime(h)}
                                </button>
                            ))}
                        </div>


                    </div>
                )}

                <div className="flex gap-6 mt-[24px] items-center">
                    <button onClick={() => {
                        setEtapa(etapa > 1 ? etapa - 1 : etapa)
                        if (etapa == 1) {
                            navigate(-1)
                        }
                    }}
                        className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-red-100 text-gray-700 font-medium rounded-lg shadow-sm hover:bg-gray-200 active:bg-gray-300 transition-all"
                    >
                        Voltar
                    </button>
                    <button
                        onClick={criarAgendamento}
                        disabled={!horarioSelecionado}
                        className="cursor-pointer mt-4 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        Agendar
                    </button>
                </div>
            </div>
        </main >
    );
}
