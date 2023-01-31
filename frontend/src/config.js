export let apiUrl = 'http://localhost:8000';
export const siteUrl = 'https://taytay.hopto.org/'

if (process.env.REACT_APP_ENV === 'test') {
    apiUrl = 'http://localhost:8010';
}

if (process.env.NODE_ENV === 'production') {
    apiUrl = 'https://taytay.hopto.org/api';
}