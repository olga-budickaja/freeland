import { createStore } from 'vuex'
import { authModule } from "@/store/modules/authModule";
import { gigModule } from "@/store/modules/gigModule";
import { userModule } from "@/store/modules/userModule";

export default createStore({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        authModule,
        gig: gigModule,
        user: userModule
    }
})