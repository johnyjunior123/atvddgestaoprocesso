export function formatDateWithTime(date: Date): string {
    const data = new Date(date)
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const horas = String(data.getHours()).padStart(2, "0");
    const minutos = String(data.getMinutes()).padStart(2, "0");

    return `${dia}/${mes} às ${horas}:${minutos}`;
}

export function formatHoras(date: Date): string {
    let data = new Date(date)
    const horas = String(data.getHours()).padStart(2, "0");
    const minutos = String(data.getMinutes()).padStart(2, "0");

    return `${horas}:${minutos}`;
}