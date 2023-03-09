import { defaultAPIInstance } from "@/requestMethod";

export const userModule = {
    state: () => ({
        user: {},
    }),
    mutations: {
        setUser(state, user) {
            state.user = user
        }
    },
    actions: {
        async fetchUser({ commit }, id) {
            try {
                const res = await defaultAPIInstance.get(`users/${id}`);
                commit('setUser', res.data);
            } catch (e) {
                console.log(e)
            }
        }
    },
    namespaced: true
}