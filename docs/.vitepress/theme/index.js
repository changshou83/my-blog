import DefaultTheme from 'vitepress/theme';

export default {
    ...DefaultTheme,
    /**
     * 增强
     * @param {*} app the Vue 3 app instance from `createApp()`
     * @param {*} router VitePress'custom router
     * @param {*} siteData a `ref`` of current site-level metadata
     */
    enhanceApp({ app, router, siteData }) {
        // 注册全局组件
        // app.component('VueClickAwayExample', VueClickAwayExample);
    },
};
