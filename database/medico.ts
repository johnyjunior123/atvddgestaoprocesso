import type { Usuario } from "./agendamento"

export class Medico {
    readonly id: number
    readonly especialidade: string
    usuario: Usuario

    constructor(id: number, especialidade: string, usuario: Usuario) {
        this.id = id
        this.especialidade = especialidade
        this.usuario = usuario
    }
}