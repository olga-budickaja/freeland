import { createApp } from 'vue';
import App from "@/App.vue";
import "materialize-css/dist/js/materialize.min";
import store from "@/store";
import router from "@/router";
import components from '@/components/UI';
import messagePlugin from '@/utils/message.plugin';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTelegram } from "@fortawesome/free-brands-svg-icons/faTelegram";
import { faSquareInstagram } from "@fortawesome/free-brands-svg-icons/faSquareInstagram";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import directives from "@/directives";



const app = createApp(App);

components.forEach(component => {
    app.component(component.name, component)
});

library.add(faTelegram, faGithub, faLinkedin, faSquareInstagram);

directives.forEach(directive => {
    app.directive(directive.name, directive);
})

app
    .use(messagePlugin)
    .use(store)
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
