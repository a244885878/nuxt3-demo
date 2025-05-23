<template>
  <div class="product-showcase-page">
    <header class="page-header">
      <div class="container">
        <h1>我们的精选产品</h1>
        <p>探索我们独特且高质量的商品。</p>
        <p style="cursor: pointer; color: skyblue" @click="skip()">
          去文章页面看看吧
        </p>
      </div>
    </header>

    <main class="main-content container">
      <div v-if="pending" class="loading-indicator">
        <div class="spinner"></div>
        <p>正在加载产品数据...</p>
      </div>

      <div v-else-if="error" class="error-message">
        <h2>加载失败! 😢</h2>
        <p>无法获取产品信息，请稍后再试。</p>
        <p>错误详情: {{ error.message }}</p>
      </div>

      <div v-else class="product-grid">
        <div v-for="product in products" :key="product.id" class="product-card">
          <img
            :src="product.imageUrl"
            :alt="product.name"
            class="product-image"
            loading="lazy"
          />
          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-category">{{ product.category }}</p>
            <p class="product-price">¥{{ product.price.toFixed(2) }}</p>
            <button class="view-details-button">查看详情</button>
          </div>
        </div>
      </div>
    </main>

    <footer class="page-footer">
      <div class="container">
        <p>&copy; 2025 Awesome Products Inc. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useAsyncData } from "#app"; // 明确引入 useAsyncData
import { useRouter } from "vue-router";
import img1 from "~/assets/img/1.jpg";
import img2 from "~/assets/img/2.jpg";
import img3 from "~/assets/img/3.jpg";
import img4 from "~/assets/img/4.jpg";
import img5 from "~/assets/img/5.jpg";
import img6 from "~/assets/img/6.jpg";

const router = useRouter();

useSeoMeta({
  title: "我的精彩网站",
  ogTitle: "我的精彩网站",
  description: "这是我的精彩网站，让我为你详细介绍。",
  ogDescription: "这是我的精彩网站，让我为你详细介绍。",
});

// 在客户端执行的逻辑
if (import.meta.client) {
  console.log("这条消息在客户端的浏览器控制台可见。");
  // 可以在这里访问 window 或 document
  // console.log('浏览器 User Agent:', window.navigator.userAgent);
}

// 在服务器端执行的逻辑
if (import.meta.server) {
  console.log("这条消息在服务器端（构建或运行时）的终端/控制台可见。");
  // 可以在这里访问 Node.js 特有的 API
  // console.log('Node.js 版本:', process.version);
}
// 模拟产品数据接口
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
}

// 模拟一个异步 API 调用
const fetchProducts = async (): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    // 模拟网络延迟
    setTimeout(() => {
      // 模拟成功或失败
      const shouldFail = false;

      if (shouldFail) {
        reject(new Error("模拟网络请求失败，请检查您的连接。"));
      } else {
        const data: Product[] = [
          {
            id: 1,
            name: "智能手表 Pro",
            category: "电子产品",
            price: 1299.0,
            imageUrl: img1,
          },
          {
            id: 2,
            name: "无线降噪耳机",
            category: "音频设备",
            price: 899.0,
            imageUrl: img2,
          },
          {
            id: 3,
            name: "超薄笔记本电脑",
            category: "电脑",
            price: 7999.0,
            imageUrl: img3,
          },
          {
            id: 4,
            name: "时尚运动鞋",
            category: "服饰",
            price: 459.0,
            imageUrl: img4,
          },
          {
            id: 5,
            name: "多功能厨房机",
            category: "家居",
            price: 1899.0,
            imageUrl: img5,
          },
          {
            id: 6,
            name: "专业摄影无人机",
            category: "户外",
            price: 3500.0,
            imageUrl: img6,
          },
        ];
        resolve(data);
      }
    }, 500); // 0.5秒延迟
  });
};

// 使用 useAsyncData 获取数据
const {
  data: products,
  pending,
  error,
} = await useAsyncData<Product[]>(
  "products", // 唯一的 key，用于在不同请求间缓存数据
  () => fetchProducts()
);

console.error(error.value);

// Nuxt 3 的 useAsyncData 会在服务器端执行 fetchProducts()
// 并且将数据序列化后发送到客户端，客户端会直接使用这些预取数据，而不会再次执行 fetchProducts()
// 这样可以确保 SEO 友好，并且有更快的首次内容渲染 (FCP)

const skip = () => {
  router.push("/article");
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap");

// 全局样式重置
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Inter", sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f0f2f5;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

// 页面头部
.page-header {
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  color: #fff;
  text-align: center;
  padding: 60px 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 3rem;
    margin-bottom: 10px;
    font-weight: 700;
  }

  p {
    font-size: 1.2rem;
    font-weight: 300;
  }
}

// 主内容区
.main-content {
  padding: 50px 0;
  min-height: 50vh; // 确保在内容较少时页面高度足够
}

// 加载指示器
.loading-indicator {
  text-align: center;
  padding: 50px 0;
  color: #555;

  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top: 4px solid #2575fc;
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

// 错误信息
.error-message {
  text-align: center;
  padding: 50px 0;
  color: #d9534f;
  background-color: #ffebee;
  border: 1px solid #d9534f;
  border-radius: 8px;

  h2 {
    margin-bottom: 10px;
    font-size: 2rem;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.8;
  }
}

// 产品网格
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.product-card {
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
  }

  .product-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-bottom: 1px solid #eee;
  }

  .product-info {
    padding: 20px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .product-name {
    font-size: 1.5rem;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 8px;
  }

  .product-category {
    font-size: 0.9rem;
    color: #7f8c8d;
    margin-bottom: 10px;
  }

  .product-price {
    font-size: 1.6rem;
    font-weight: 700;
    color: #e67e22; // Orange for price
    margin-bottom: 15px;
  }

  .view-details-button {
    background-color: #2575fc;
    color: #fff;
    padding: 12px 20px;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #1a5ac9;
    }
  }
}

// 页面底部
.page-footer {
  background-color: #34495e;
  color: #ecf0f1;
  text-align: center;
  padding: 30px 0;
  margin-top: 50px;
  font-size: 0.9rem;
}
</style>
