export let apiUrl = 'http://172.29.176.42:8000';

if (process.env.REACT_APP_ENV === 'test') {
    apiUrl = 'http://localhost:8010';
}

if (process.env.NODE_ENV === 'production') {
    apiUrl = 'http://188.226.163.6:8000';
}