// eslint-disable-next-line no-unused-vars
import {apiFetch, destinationUrl} from "./authFetch";

export function dBTimeToString(time) {
    var date = new Date(time)
    var hours = date.getHours().toString().length == 1 ? "0" + date.getHours() : date.getHours()
    var minutes = date.getMinutes().toString().length == 1 ? "0" + date.getMinutes() : date.getMinutes()

    return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear() + ". " + hours + ":" + minutes
}