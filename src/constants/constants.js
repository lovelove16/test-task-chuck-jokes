import Axios from "axios";

export const API_URL = "https://api.chucknorris.io";

export const request = (method, url, data = null) => {
    return Axios.request({
        method: method,
        url: API_URL + url,
        data: data,
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        }
    })
}
