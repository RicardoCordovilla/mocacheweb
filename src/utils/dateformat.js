export const digits = (num) => {
    let digit = num < 10 ? '0' + num : num + ''
    return digit
}

export const formatDate = (date) => {
    const fecha = new Date(date)
    let stringDate = fecha.getFullYear() + '-' + digits(fecha.getMonth() + 1) + '-' + digits(fecha.getDate())
    return stringDate
}

export const nowDate = () => {
    const currentDate = new Date()
    const currentLocalDate = formatDate(currentDate.toLocaleDateString("es-EC", { timeZone: 'America/Lima' }, { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-'))
    return currentLocalDate
}


export const nowTime = () => {
    const currentDate = new Date()
    const currentLocalTime = currentDate.toLocaleTimeString("es-EC", { timeZone: 'America/Lima' }, { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    return currentLocalTime
}





