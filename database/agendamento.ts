export type Usuario = {
    id: number
    email: string
    nome: string
    password: string
    role: string
}

export enum AgendamentoStatus {
    cancelado = 'Cancelado',
    ativo = 'Ativo',
    encerrado = 'Encerrado'
}

export class Agendamento {
    id?: number
    readonly inicio: Date
    readonly fim: Date
    readonly tipo: string
    status: AgendamentoStatus
    cliente: Usuario

    constructor(inicio: Date, fim: Date, tipo: string, status: AgendamentoStatus, cliente: Usuario, id?: number) {
        if (inicio > fim) throw new Error('Data de inicio não pode ser maior que fim')
        this.id = id
        this.inicio = inicio
        this.fim = fim
        this.tipo = tipo
        this.status = status
        this.cliente = cliente
    }
}