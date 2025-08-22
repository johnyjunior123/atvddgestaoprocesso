import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { horarios_database } from "database/horarios";
import { formatDateWithTime } from "utils/formatarData";

export type ModalHorariosType = {
  medicoId: number,
  diaSelecionado: number,
  agendamentosDoDia: Date[]
}

export default function ModalHorarios({ medicoId, diaSelecionado, agendamentosDoDia }: ModalHorariosType) {
  const [novoHorario, setNovoHorario] = useState<string>(""); // string tipo "14:00"

  const handleAdicionarHorario = () => {
    if (!novoHorario) return;

    // Separar horas e minutos
    const [horas, minutos] = novoHorario.split(":").map(Number);

    // Criar nova data com o dia selecionado e a hora escolhida
    const dataNova = new Date(diaSelecionado);
    dataNova.setHours(horas, minutos, 0, 0);

    // Adicionar ao horarios_database
    const medicoHorarios = horarios_database.find(h => h.idMedico === medicoId);
    if (medicoHorarios) {
      medicoHorarios.horarios.push(dataNova);
    } else {
      // Se médico não existir no database, cria
      horarios_database.push({ idMedico: medicoId, horarios: [dataNova] });
    }

    alert(`Novo horário adicionado: ${formatDateWithTime(dataNova)}`);
    setNovoHorario(""); // limpa input
  };

  return (
    <div className="mt-4 p-4 border-t border-gray-200">
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
  );
}