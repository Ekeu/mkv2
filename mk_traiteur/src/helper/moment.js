import moment from 'moment'

export const dateFormat = (date, syntax='ll') => {
    if(!date) return ''
    return moment(date).fromNow();
}