export let apiUrl = 'http://192.168.25.121:8000';

if (process.env.REACT_APP_ENV === 'test') {
    apiUrl = 'http://localhost:8010'
}