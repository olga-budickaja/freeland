import { defaultAPIInstance } from "@/requestMethod";
export const gigModule = {
    state: () => ({
        gigs: [],
        isGigsLoading: false,
        loadMoreExecuted: false,
        selectedSort: '',
        searchQuery: '',
        min: '',
        max: '',
        page: 1,
        limit: 2,
        totalPages: 0,
        sortOptions: [
            {value: 'createAt', name: 'Date Add'},
            {value: 'price', name: 'Best Selling'},
            {value: 'totalStars', name: 'Popular'},
        ],
    }),
    getters: {
    },
    mutations: {
        setGigs(state, gigs) {
            state.gigs = gigs;
        },
        addGigs(state, gigs) {
            state.gigs = [...state.gigs, ...gigs];
        },
        setIsGigsLoading(state, isGigsLoading) {
            state.isGigsLoading = isGigsLoading;
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort;
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery;
        },
        setMin(state, min) {
            state.min = min;
        },
        setMax(state, max) {
            state.max = max;
        },
        setPage(state, page) {
            state.page = page;
        },
        setLimit(state, limit) {
            state.limit = limit;
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages;
        },
    },
    actions: {
        async fetchGigs({ state, commit }) {
            if (!state.loadMoreExecuted) {
                try {
                    commit('setIsGigsLoading', true);
                    const res = await fetchData(state);

                    commit('setTotalPages', Math.ceil(res.headers['x-total-count'] / state.limit));
                    commit('setGigs', res.data);

                } catch (e) {
                    console.log(e)
                } finally {
                    commit('setIsGigsLoading', false)
                }
            }

        },

        async loadMoreGigs({ state, commit }) {
            try {
                commit('setPage', state.page + 1);

                state.loadMoreExecuted = true;

                const res = await fetchData(state);

                commit('setTotalPages', Math.ceil(res.headers['x-total-count'] / state.limit));
                commit('setGigs', [...state.gigs, ...res.data]);
            } catch (e) {
                console.log(e);
            }
        },
    },
    namespaced: true
}

async function fetchData(state) {
    let url = `gigs?page=${state.page}&limit=${state.limit}&`;

    switch (true) {
        case state.min.length:
            url += `min=${state.min}&`;
            break;
        case state.max.length:
            url += `max=${state.max}&`;
            break;
        case state.searchQuery.length:
            url += `search=${state.searchQuery}&`;
            break;
        default:
            break;
    }

    let res;
    switch (Boolean(state.selectedSort)) {
        case true:
            res = await defaultAPIInstance.get(`${url}&sort=${state.selectedSort}`);
            break;
        default:
            res = await defaultAPIInstance.get(url);
            break;
    }
    return res;
}

