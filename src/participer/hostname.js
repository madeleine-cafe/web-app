'use strict';

function getHostname() {
    if (process.env.NODE_ENV !== 'production') {
        console.log('Looks like we are in development mode!');
        return "http://127.0.0.1:8080"
    } else {
        return "https://application-server.madeleine.cafe"
    }
}

const API_HOSTNAME = getHostname()
export default API_HOSTNAME;