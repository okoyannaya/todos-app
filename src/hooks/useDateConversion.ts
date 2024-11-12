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

export const useDateConversion = (date: Date) =>{

const day = date.getDate()
const month = date.getMonth()
const year = date.getFullYear()

return `${day} ${months[month]} ${year}г.`
}