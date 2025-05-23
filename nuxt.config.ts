// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: false },
  app: {
    baseURL: "/my-nuxt",
  },
  nitro: {
    prerender: {
      // 允许预渲染过程中出现错误，但不会中止整个构建
      // 当页面返回 404 或 500 时，仍会生成对应的错误页面而不是退出
      failOnError: false,
    },
  },
});
