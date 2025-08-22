import { Agendamento, AgendamentoStatus } from "./agendamento";
import { users } from "./user";
import { medicos } from "./medicos";

function criarData(dia: number, mes: number, ano: number, hora: number, minuto: number) {
    return new Date(ano, mes - 1, dia, hora, minuto);
}

// Agendamentos
export const agendamentos: Agendamento[] = [
    new Agendamento(
        criarData(10, 9, 2025, 9, 0),
        criarData(10, 9, 2025, 10, 0),
        "Medico Geral",
        AgendamentoStatus.ativo,
        users[0],
        medicos[0]
    ),
    new Agendamento(
        criarData(10, 9, 2025, 11, 0),
        criarData(10, 9, 2025, 12, 0),
        "Medico Geral",
        AgendamentoStatus.cancelado,
        users[0],
        medicos[0]
    ),
    new Agendamento(
        criarData(11, 9, 2025, 14, 0),
        criarData(11, 9, 2025, 15, 0),
        "Medico Geral",
        AgendamentoStatus.encerrado,
        users[0],
        medicos[0]
    ),
    new Agendamento(
        criarData(12, 9, 2025, 16, 0),
        criarData(12, 9, 2025, 17, 0),
        "Medico Geral",
        AgendamentoStatus.ativo,
        users[0],
        medicos[0]
    ),
];

console.log(agendamentos);
