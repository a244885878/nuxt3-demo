<template>
  <div class="article-list-page">
    <header class="page-header">
      <div class="container">
        <h1>所有文章</h1>
        <p>阅读我们最新和最受欢迎的文章。</p>
      </div>
    </header>

    <main class="main-content container">
      <div v-if="pending" class="loading-indicator">
        <div class="spinner"></div>
        <p>正在加载文章列表...</p>
      </div>

      <div v-else-if="error" class="error-message">
        <h2>加载失败! 😢</h2>
        <p>无法获取文章列表，请稍后再试。</p>
        <p>错误详情: {{ error.message }}</p>
        <button @click="refreshArticles" class="retry-button">重新加载</button>
      </div>

      <div v-else class="article-grid">
        <NuxtLink
          v-for="article in articles"
          :key="article.id"
          :to="`/articles/${article.slug}`"
          class="article-card"
        >
          <img
            :src="article.imageUrl"
            :alt="article.title"
            class="article-image"
            loading="lazy"
          />
          <div class="article-info">
            <h3 class="article-title">{{ article.title }}</h3>
            <p class="article-excerpt">{{ article.excerpt }}</p>
            <span class="read-more">阅读更多 &rarr;</span>
          </div>
        </NuxtLink>
      </div>
    </main>

    <footer class="page-footer">
      <div class="container">
        <p>&copy; 2025 文章博客. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useAsyncData } from "#app";
import { NuxtLink } from "#components"; // 明确导入 NuxtLink

useSeoMeta({
  title: "我的精彩文章",
  ogTitle: "我的精彩文章",
  description: "这是我的精彩文章，让我为你详细介绍。",
  ogDescription: "这是我的精彩文章，让我为你详细介绍。",
});

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  imageUrl: string;
  content: string; // 详情页用，这里不显示
}

// 模拟 API 调用
const fetchArticles = async (): Promise<Article[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldFail = false;
      if (shouldFail) {
        reject(new Error("网络请求失败，请稍后再试。"));
      } else {
        const data: Article[] = [
          {
            id: 1,
            title: "Nuxt 3 SSR 的魔力",
            slug: "nuxt-3-ssr-magic",
            excerpt:
              "深入了解 Nuxt 3 服务器端渲染如何提升您的 Web 应用性能和 SEO。",
            imageUrl:
              "https://via.placeholder.com/400x250/FF6347/FFFFFF?text=Nuxt+SSR",
            content:
              "Nuxt 3 通过其强大的混合渲染能力，让开发者能够轻松构建既拥有出色用户体验又对搜索引擎友好的应用。SSR 的核心在于在服务器端预先生成 HTML，这意味着当用户首次访问页面时，他们会立即收到一个完整的页面，而不需要等待 JavaScript 加载并执行。这不仅大大提升了页面的**首次内容绘制 (FCP)** 时间，也确保了搜索引擎爬虫能够顺利抓取并索引页面内容，从而显著优化了**搜索引擎优化 (SEO)** 效果。此外，Nuxt 3 的数据预取机制，如 `useAsyncData` 和 `useFetch`，能够在服务器端获取数据并将其嵌入到初始 HTML 中，进一步减少了客户端的数据请求时间，带来了更流畅的体验。",
          },
          {
            id: 2,
            title: "Vue 3 Composables 最佳实践",
            slug: "vue-3-composables-best-practices",
            excerpt:
              "探索如何利用 Vue 3 的 Composition API 编写可复用且强大的逻辑。",
            imageUrl:
              "https://via.placeholder.com/400x250/4CAF50/FFFFFF?text=Vue+Composables",
            content:
              "Vue 3 的 Composition API 引入了 Composables 的概念，它允许开发者将组件的逻辑按照功能进行组织和复用。与 Vue 2 的 Options API 相比，Composables 解决了逻辑复用时代码分散、难以维护的问题。通过自定义 Composables，我们可以将状态管理、异步请求、表单验证等复杂逻辑封装起来，使其在多个组件之间共享而不会产生重复代码。这不仅提升了代码的可读性和可维护性，也使得大型应用的开发变得更加高效。例如，你可以创建一个 `useUser` 的 Composable 来处理用户相关的认证和状态，然后在任何需要用户信息的组件中轻松引入和使用。",
          },
          {
            id: 3,
            title: "现代 CSS 技巧与陷阱",
            slug: "modern-css-tips-tricks",
            excerpt: "掌握 Flexbox, Grid 和新的 CSS 特性，避免常见错误。",
            imageUrl:
              "https://via.placeholder.com/400x250/2196F3/FFFFFF?text=CSS+Tips",
            content:
              "随着 Web 标准的不断发展，现代 CSS 提供了前所未有的布局和样式能力。Flexbox 和 CSS Grid 是当前最强大的布局工具，它们能够轻松实现复杂的响应式设计，但同时也存在一些常见的陷阱。例如，过度依赖 Flexbox 而忽视 Grid 在网格布局上的优势，或者在 Grid 中不正确使用 `grid-template-areas` 和 `grid-gap`。此外，`aspect-ratio`、`clamp()` 函数、逻辑属性（Logical Properties）和 `:where()`、`:is()` 等伪类选择器也为我们带来了更多便利。掌握这些新特性并避免常见错误，将极大地提升你的 CSS 编写效率和代码质量。",
          },
        ];
        resolve(data);
      }
    }, 800); // 模拟延迟 0.8 秒
  });
};

const {
  data: articles,
  pending,
  error,
  refresh: refreshArticles,
} = await useAsyncData<Article[]>(
  "articles-list", // 唯一的 key
  () => fetchArticles()
);
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Roboto", sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f5f7fa;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-header {
  background: linear-gradient(135deg, #1abc9c, #16a085);
  color: #fff;
  text-align: center;
  padding: 50px 0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 2.8rem;
    margin-bottom: 10px;
    font-weight: 700;
  }

  p {
    font-size: 1.1rem;
    font-weight: 300;
  }
}

.main-content {
  padding: 40px 0;
  min-height: 60vh;
}

.loading-indicator {
  text-align: center;
  padding: 50px 0;
  color: #555;
  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top: 4px solid #1abc9c;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin: 0 auto 15px;
  }
  p {
    font-size: 1.1rem;
  }
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.error-message {
  text-align: center;
  padding: 40px 0;
  color: #e74c3c;
  background-color: #fef0ef;
  border: 1px solid #e74c3c;
  border-radius: 8px;
  h2 {
    margin-bottom: 10px;
    font-size: 1.8rem;
  }
  p {
    font-size: 1rem;
    line-height: 1.8;
  }
}

.retry-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #c0392b;
  }
}

.article-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.article-card {
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none; /* 移除 NuxtLink 的下划线 */
  color: inherit; /* 继承父元素颜色 */
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }

  .article-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-bottom: 1px solid #eee;
  }

  .article-info {
    padding: 20px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  .article-title {
    font-size: 1.6rem;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 10px;
  }

  .article-excerpt {
    font-size: 0.95rem;
    color: #7f8c8d;
    line-height: 1.5;
    margin-bottom: 15px;
    flex-grow: 1; /* 撑开剩余空间 */
  }

  .read-more {
    font-size: 0.9rem;
    color: #1abc9c;
    font-weight: 500;
    align-self: flex-start; /* 让链接左对齐 */
    transition: color 0.3s ease;
    &:hover {
      color: #16a085;
    }
  }
}

.page-footer {
  background-color: #34495e;
  color: #ecf0f1;
  text-align: center;
  padding: 30px 0;
  margin-top: 40px;
  font-size: 0.9rem;
}
</style>
