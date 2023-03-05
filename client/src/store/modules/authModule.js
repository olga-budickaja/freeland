import { authApi } from "@/auth-api";

export const authModule = {
    namespaced: true,

    state() {
        return {
            credentials: {
                user: JSON.parse(localStorage.getItem("user")) || null,
            }
        }
    },

    mutations: {
        setUser(state, user) {
            state.credentials.user = user;
            localStorage.setItem("user", JSON.stringify(user));
        },
        deleteUser(state) {
            state.credentials.user = null;
            localStorage.removeItem('user');
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