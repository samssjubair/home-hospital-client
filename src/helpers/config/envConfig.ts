export const getBaseUrl = () => {
    return process.env.REACT_APP_BASE_URL || 'http://localhost:5002/api/v1';
}