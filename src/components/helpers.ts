const months: Record <number, string>={
    0: 'янв',
    1: 'фев',
    2: 'мар',
    3: 'апр',
    4: 'мая',
    5: 'июн',
    6: 'июл',
    7: 'авг',
    8: 'сен',
    9: 'окт',
    10: 'ноя',
    11: 'дек'
}



export const dateConversion = (date: string) =>{
const dateObg = new Date(date)
const day = dateObg.getDate()
const month = dateObg.getMonth()
const year = dateObg.getFullYear()

return `${day} ${months[month]} ${year}г.`
}