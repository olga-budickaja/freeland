export default {
    install: (app, options) => {
        app.config.globalProperties.$message = (html) => {
            M.toast({ html, classes: 'rounded' })
        }

        app.config.globalProperties.$error = (html) => {
            M.toast({ html: `[error]: ${html}`, classes: 'rounded' })
        }
    }
}