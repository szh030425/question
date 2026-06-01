# VTE 医疗问卷

基于《血管外科及 VTE 量表完整汇编》的纯前端 H5 问卷：将临床评分表转化为患者可理解的问题，自动计分，并提供患者视图与医护专业视图。

## 重要提示

1. 本工具仅根据公开量表规则进行计算，**不能替代**医师的临床判断与个体化评估。
2. 部分条目需实验室或影像检查，患者自评结果可能不完整。
3. 如出现胸痛、呼吸困难、晕厥等急症症状，请立即就医或拨打急救电话。
4. 本系统采用 PDF 汇编标注的标准版；临床应用请参考原始文献。

## 项目结构

```
question/
├── packages/scoring-core/   # 计分引擎（无 UI）
├── packages/scale-data/     # 量表定义与患者文案
├── apps/web/                # Vite + Vue 3 + Vant H5
└── docs/                    # 量表清单与内容编写指南
```

## 快速开始

```bash
npm install
npm run dev
```

浏览器打开 http://localhost:5173

## 脚本

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动 Web 开发服务器 |
| `npm run build` | 构建全部包与 Web |
| `npm test` | 运行 scoring-core 单元测试 |

## 已上线量表

见 [docs/scale-inventory.md](docs/scale-inventory.md)。

## 后续

- 微信小程序：复用 `scoring-core` 与 `scale-data`，UI 层迁移至 Taro/uni-app。
- PESI 完整版、PEmb-QoL、DVT-QoL 待补充完整题项后上线。
