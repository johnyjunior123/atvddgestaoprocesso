export function formatDateWithTime(date: Date): string {
    const dia = String(date.getDate()).padStart(2, "0");
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const horas = String(date.getHours()).padStart(2, "0");
    const minutos = String(date.getMinutes()).padStart(2, "0");

    return `${dia}/${mes} às ${horas}:${minutos}`;
}
