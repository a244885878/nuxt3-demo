const GH_REPO_NAME = process.env.GITHUB_REPO_NAME || "my-nuxt"; // 默认值，本地开发使用

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: false },
  app: {
    baseURL: process.env.NODE_ENV === "production" ? `/${GH_REPO_NAME}/` : "/",
    pageTransition: { name: "page", mode: "out-in" },
  },
  nitro: {
    prerender: {
      failOnError: false, // 允许预渲染错误，避免因 404 导致构建中断
    },
  },
});
