import { defaultAPIInstance } from "@/requestMethod";

export const userApi = {
    /**
     *
     * @param id
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    getUser(id) {
        const url = `users/${id}`
        return defaultAPIInstance.get(url)
    }
}