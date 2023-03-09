import { defaultAPIInstance } from "@/requestMethod";
import { gigApi } from "@/api/gig-api";
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
        limit: 5,
        totalPages: 0,
        dataGig: {},
        sortOptions: [
            {value: 'createAt', name: 'Date Add'},
            {value: 'price', name: 'Best Selling'},
            {value: 'totalStars', name: 'Popular'},
        ],
        catOptions: [
            {value: 'design', name: 'Design'},
            {value: 'ui', name: 'UI'},
            {value: '3d', name: '3D'},
        ]
    }),
    getters: {
        filteredGigs(state) {
            let gigs = [...state.gigs];

            if (state.min && state.min.min > 0 || state.min.max > 0) {
                gigs = gigs.filter(gig => {
                    const price = Number(gig.price);
                    return price >= state.min.min && price <= state.min.max;
                });
            }

            if (state.selectedSort) {
                gigs.sort((a, b) => {
                    if (state.selectedSort === 'createAt') {
                        return new Date(b.createAt) - new Date(a.createAt);
                    } else if (state.selectedSort === 'price') {
                        return Number(b.price) - Number(a.price);
                    } else if (state.selectedSort === 'totalStars') {
                        return b.totalStars - a.totalStars;
                    }
                });
            }

            return gigs;
        },
        handleSearchQuery(state, getter) {
            return [...getter.filteredGigs].filter(gig => gig.title.toLowerCase().includes(state.searchQuery))
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
        setDataGig(state, dataGig) {
            state.dataGig = dataGig
        }
    },
    actions: {
        async fetchGigs({ state, commit }) {
            if (!state.loadMoreExecuted) {
                try {
                    commit('setIsGigsLoading', true);

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

        async uploadGig({commit}, {
            title,
            price,
            cat,
            cover,
            images,
            shortTitle,
            shortDesc,
            delivery,
            revision,
            features}) {
                gigApi.addGig(
                    title,
                    price,
                    cat,
                    cover,
                    images,
                    shortTitle,
                    shortDesc,
                    delivery,
                    revision,
                    features).then((res) => {
                    commit('setDataGig', res.data)
                }).catch((err) => {
                    console.log(err)
                });
        }
    },
    namespaced: true
}

async function fetchData({ state, commit }) {
    let url = `gigs?page=${state.page}&limit=${state.limit}&`;


    if (state.min.min > 0 || state.min.max > 0) {
        url += `min=${state.min.min}&max=${state.min.max}`;
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

