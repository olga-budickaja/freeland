import { defaultAPIInstance } from "@/requestMethod";
export const gigModule = {
    state: () => ({
        gigs: [],
        isGigsLoading: false,
        selectedSort: '',
        searchQuery: '',
        url: '',
        min: '',
        max: '',
        page: 1,
        limit: 2,
        totalPages: 0,
        sortOptions: [
            {value: 'createAt', name: 'Date Add'},
            {value: 'price', name: 'Best Selling'},
            {value: 'Math.round(this.gig.totalStars / this.gig.starsNumber)', name: 'Popular'},
        ],
    }),
    getters: {
    },
    mutations: {
        setGigs(state, gigs) {
            state.gigs = gigs;
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
        setUrl(state, url) {
            state.url = url;
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
        async fetchGigs({ commit, state }) {
            try {
                commit('setIsGigsLoading', true);

                const res = await fetchData(state);

                commit('setTotalPages', Math.ceil(res.headers['x-total-count'] / state.limit))
                commit('setGigs', res.data)

            } catch (e) {
                console.error(e);
            } finally {
                commit('setIsGigsLoading', false);
            }
        },

        async loadMoreGigs({ commit, state }) {
            try {
                commit('setPage', state.page + 1);

                const res = await fetchData(state);

                commit('setTotalPages', Math.ceil(res.headers['x-total-count'] / state.limit))
                commit('setGigs', [...state.gigs, ...res.data])

            } catch (e) {
                console.log(e);
            }
        },
    },
    namespaced: true
}

async function fetchData(state) {
    let url = `gigs?page=${state.page}&limit=${state.limit}&`;

    if (state.min.length) {
        url += `min=${this.min}&`;
    }

    if (state.max.length) {
        url += `max=${this.max}&`
    }

    if (state.searchQuery.length) {
        url += `search=${this.searchQuery}&`
    }

    let res;

    !state.selectedSort
        ? res = await defaultAPIInstance.get(`${url}`, {
            params: {
                _page: state.page,
                _limit: state.limit
            }
        })
        : res = await defaultAPIInstance.get(`${url}&sort=${state.selectedSort}`, {
            params: {
                _page: state.page,
                _limit: state.limit
            }
        });
    return res;
}