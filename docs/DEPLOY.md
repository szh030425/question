# 公网部署指南

本项目为**纯静态前端**，可部署到任意静态托管，手机/电脑浏览器均可访问。

## 方案 A：GitHub Pages（推荐，免费）

仓库：https://github.com/szh030425/question

### 一次性设置（必做，否则公网 404）

1. 将代码推送到 `main` 分支：
   ```bash
   git push origin main
   ```
2. 打开 https://github.com/szh030425/question/settings/pages
3. **Build and deployment** → **Source** 选 **Deploy from a branch**
4. **Branch** 选 `gh-pages`，文件夹选 `/ (root)`，点 **Save**
5. 等待 Actions 工作流 `Deploy to GitHub Pages` 跑绿（约 2–3 分钟）

### 公网地址

```
https://szh030425.github.io/question/
```

分享给他人即可在手机微信、浏览器中打开。

### 更新站点

每次 `git push origin main` 后会自动重新部署。

---

## 方案 B：Vercel（根路径更短，需登录）

1. 安装 [Vercel CLI](https://vercel.com/docs/cli) 或打开 https://vercel.com 用 GitHub 导入仓库
2. 根目录选本仓库，Framework 选 **Vite**，Output 填 `apps/web/dist`
3. Build Command：`npm run build`
4. 部署后获得形如 `https://question-xxx.vercel.app` 的链接

本地 CLI（需浏览器登录一次）：

```bash
npm run build
npx vercel --prod
```

---

## 方案 C：Netlify

1. https://app.netlify.com → **Add new site** → **Import from Git**
2. Build command：`npm run build`
3. Publish directory：`apps/web/dist`

---

## 方案 D：自有服务器（Nginx）

```bash
npm run build
# 将 apps/web/dist 目录上传到服务器
```

Nginx 示例：

```nginx
server {
    listen 80;
    server_name your.domain.com;
    root /var/www/vte-questionnaire;
    index index.html;
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 本地预览生产包

```bash
npm run build
npm run preview -w @vte/web
```

默认 http://localhost:4173（仅本机；要公网需用上述托管方案）。
