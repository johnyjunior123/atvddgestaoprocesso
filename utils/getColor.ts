export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case "ativo":
      return "text-green-500";
    case "cancelado":
      return "text-red-500";
    case "encerrado":
      return "text-yellow-500"; 
    default:
      return "text-gray-400";
  }
}