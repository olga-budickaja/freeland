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
        let x, y, w, h;
        if (img.naturalWidth !== sizeW) {
            w = img.naturalWidth / (img.naturalWidth / sizeW);
            h = sizeW / img.naturalWidth * img.naturalHeight;
            x = -Math.abs(w - sizeW) / 2;
            y = -Math.abs(h - sizeH) / 2;
        }
        return [x, y, w, h]
    },
    async resizeImg(imgCover) {
        const canvas = document.getElementById("imgCanvas");
        const ctx = canvas.getContext('2d');
        const img  = await this.createImg(imgCover)
        const [x, y, w, h] = this.squareCrop(img, 778, 584)

        ctx.drawImage(img, x, y, w, h);

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                resolve(blob)
            })
        })
    },
}