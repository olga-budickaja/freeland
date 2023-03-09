import { loginAPIInstance } from "@/requestMethod";

export const gigApi = {
    /**
     *
     * @param title
     * @param price
     * @param cat
     * @param cover
     * @param images
     * @param shortTitle
     * @param shortDesc
     * @param delivery
     * @param revision
     * @param features
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    addGig(title, price, cat, cover, images, shortTitle, shortDesc, delivery, revision, features) {
        const url = 'gigs';
        const data ={
            title,
            price,
            cat,
            cover,
            images,
            shortTitle,
            shortDesc,
            delivery,
            revision,
            features
        }
        return loginAPIInstance.post(url, data)
    }
}