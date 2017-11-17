import Router from 'vue-router';
import { humpChangeTo } from '../../utils';

export default function(Vue, config, components) {
 const { home } = config;
 Vue.use(Router);
 return new Router({
   routes: Object.entries(components).map(([name, component]) => ({
     name: name === home  ? 'home' : name,
     path: name === home ? '/' : `/${ humpChangeTo(name, '-') }`,
     component,
   })),
 });
}
