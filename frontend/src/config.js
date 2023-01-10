export let apiUrl = 'http://localhost:8000';

if (process.env.REACT_APP_ENV === 'test') {
    apiUrl = 'http://localhost:8010'
}