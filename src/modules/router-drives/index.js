import Router from 'vue-router';
import { humpChangeTo } from '../../utils';

/**
 * vue-router-drives
 * 用于简化于规范vue-router的用法, 主要目的某种规则化下的定义。
 */
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
