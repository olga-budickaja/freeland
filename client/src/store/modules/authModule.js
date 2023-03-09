import { authApi } from "@/api/auth-api";

export const authModule = {
    namespaced: true,

    state: () => ({
        credentials: {
            user: JSON.parse(sessionStorage.getItem("user")) || null,
        }
    }),

    mutations: {
        setUser(state, user) {
            state.credentials.user = user;
            sessionStorage.setItem("user", JSON.stringify(user));
        },
        deleteUser(state) {
            state.credentials.user = null;
            sessionStorage.removeItem('user');
        },
    },

    actions: {
        onLogin({commit}, {username, password}) {
            authApi.login(username, password ).then((res) => {
                commit('setUser', res.data);
            }).catch((err) => {
                console.log(err)
            });
        },
        onLogout({commit}) {
            authApi.logout().then(() => {
                commit('deleteUser');
            });
        }
    }

}