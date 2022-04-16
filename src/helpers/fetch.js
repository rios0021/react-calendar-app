
const baseUrl = process.env.REACT_APP_API_URL;

export const fetchWithoutToken = (endpoint, data, method = 'GET') => {
    const url = `${baseUrl}/${endpoint}`;
    if(method === 'GET'){
        return fetch(url);
    } else {
        return fetch(url, {
            method,
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        });
    }
}

export const fetchWithToken = (endpoint, data, method = 'GET') => {
    const url = `${baseUrl}/${endpoint}`;
    const token = localStorage.getItem('token') || '';
    if(method === 'GET'){
        return fetch(url, {
            method, 
            headers: {
                'x-token': token,
            }
        });
    } else {
        return fetch(url, {
            method,
            body: JSON.stringify(data),
            headers:{
                'x-token': token,
                'Content-Type': 'application/json'
            }
        });
    }

}