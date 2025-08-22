import { EspecialidadesEnum } from "./especialidades";
import { users } from "./user";

export const medicos = [
    {
        id: 777,
        especialidade: EspecialidadesEnum.medico_geral,
        usuario: users[1]
    },
    {
        id: 778,
        especialidade: EspecialidadesEnum.psicologo,
        usuario: users[2]
    }
]