export const getHeader = (token: String) => {
    return {
        headers: { Authorization: `Bearer ${token}`}
    }
}