import { EspecialidadesEnum } from "./especialidades";
import { users } from "./user";

export const medicos = [
    {
        id: 1,
        especialidade: EspecialidadesEnum.medico_geral,
        usuario: users[1]
    },
    {
        id: 2,
        especialidade: EspecialidadesEnum.psicologo,
        usuario: users[2]
    }
]