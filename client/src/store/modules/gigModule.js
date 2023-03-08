import { defaultAPIInstance } from "@/requestMethod";
export const gigModule = {
    state: () => ({
        gigs: [],
        isGigsLoading: false,
        loadMoreExecuted: false,
        url: '',
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
        handleSearchQuery(state) {
            return [...state.gigs].filter(gig => gig.title.toLowerCase().includes(state.searchQuery))
        }
    },
    mutations: {
        setGigs(state, gigs) {
            state.gigs = gigs;
        },
        setIsGigsLoading(state, isGigsLoading) {
            state.isGigsLoading = isGigsLoading;
        },
        setUrl(state, url) {
            state.url = url;
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
                    console.log(state.searchQuery);
                    const res = await fetchData({ state, commit });

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

                const res = await fetchData({ state, commit });

                commit('setTotalPages', Math.ceil(res.headers['x-total-count'] / state.limit));
                commit('setGigs', [...state.gigs, ...res.data]);
            } catch (e) {
                console.log(e);
            }
        },

        async handleSearch({ state, dispatch, commit}) {
            commit('setSearchQuery', state.searchQuery);
            await dispatch('fetchGigs');
        }
    },
    namespaced: true
}

async function fetchData({ state, commit }) {
    let url = `gigs?page=${state.page}&limit=${state.limit}&`;


    if (state.min.min > 0 || state.min.max > 0) {
        url += `min=${state.min.min}&max=${state.min.max}`;
    }

    if (state.searchQuery.length) {
        url += `search=${state.searchQuery}`
    }

    commit('setUrl', url)

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

