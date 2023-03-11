export const resizeImg = {
    createImg(imgCover) {
        const img  = new Image();
        img.src = imgCover

        return new Promise((resolve, reject) => {
            img.onload = () => resolve(img);
            img.onerror = (e) => reject(e)
        })
    },
    squareCrop(img, sizeW, sizeH) {
        let x = 0,
            y = 0,
            w = sizeW,
            h = sizeH;

        let width = img.naturalWidth;
        let height = img.naturalHeight;
        let ratio = width / height;

        if (sizeH !== height) {
            const ht = sizeW / ratio;
            h = Math.floor(ht);
            w = sizeW;
            y = (sizeH - h) / 2;
        } else if (sizeW !== width) {
            const wt = sizeH * ratio;
            w = Math.floor(wt);
            h = sizeH;
            x = (sizeW - w) / 2;
        }

        return [x, y, w, h];
    },

    async resizeImg(imgCover) {
        const canvas = document.getElementById("imgCanvas");
        // const canvas = document.createElement('canvas');
        const width = process.env.VUE_APP_CANVAS_WIDTH;
        const height = process.env.VUE_APP_CANVAS_HEIGHT;

        const ctx = canvas.getContext('2d');
        const img  = await this.createImg(imgCover)
        const [x, y, w, h] = this.squareCrop(img, width, height)
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, x, y, w, h);

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                resolve(blob)
            })
        })
    },
}