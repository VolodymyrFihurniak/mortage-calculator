import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import components from '@/components/ui'
import directives from '@/directives';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component)
})

directives.forEach(directive => {
    app.directive(directive.name, directive)
})

app.use(Toast, {
    transition: "Vue-Toastification__bounce",
    maxToasts: 20,
    newestOnTop: true
});

app.use(router).mount('#app')
