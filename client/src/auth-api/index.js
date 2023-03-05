import { loginAPIInstance } from "@/requestMethod";

export const authApi = {
    /**
     *
     * @param username
     * @param email
     * @param password
     * @param isSeller
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    register(username, email, password, isSeller) {
        const url = 'auth/register';
        const data = {username, email, password, isSeller}
        return loginAPIInstance.post(url, data)
    },
    /**
     *
     * @param username
     * @param password
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    login(username, password) {
        const url = 'auth/login';
        const data = {username, password}
        return loginAPIInstance.post(url, data);
    },
    /**
     *
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    logout() {
        const url = 'auth/logout';
        return loginAPIInstance.post(url)
    },
}