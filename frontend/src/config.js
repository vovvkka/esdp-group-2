export let apiUrl = 'http://188.226.163.6:8000';

if (process.env.REACT_APP_ENV === 'test') {
    apiUrl = 'http://188.226.163.6:8010'
}