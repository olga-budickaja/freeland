import { userApi } from "@/api/user-api";

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
            userApi.getUser(id).then((res) => {
                commit('setUser', res.data)
            })
        }
    },
    namespaced: true
}