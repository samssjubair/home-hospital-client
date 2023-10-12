export const getBaseUrl = () => {
    return process.env.REACT_APP_BASE_URL || 'http://localhost:3030/api/v1';
}