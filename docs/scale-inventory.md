# VTE 量表清单与上线状态

> 依据《血管外科及 VTE 量表完整汇编（2026-05-27）》整理。状态：`live` 可填写计分 | `placeholder` 说明页 | `pending` 待题项/审核

## 批次 1（首期上线）

| ID | 量表名称 | 分类 | 类型 | 状态 |
|----|----------|------|------|------|
| `wells-dvt` | Wells DVT Score | 验前概率 | A 累加 | live |
| `wells-pe` | Wells PE Score | 验前概率 | A 累加 | live |
| `geneva` | Revised Geneva Score | 验前概率 | A 累加 | live |
| `spesi` | sPESI | 严重度与预后 | A 累加 | live |
| `padua` | Padua Score | 住院预防 | A 累加 | live |
| `improve-vte` | IMPROVE VTE Score | 住院预防 | A 累加 | live |
| `caprini` | Caprini Score | 住院预防 | A 累加 | live |
| `has-bled` | HAS-BLED | 出血风险 | A 累加 | live |

## 批次 2（出血与复发）

| ID | 量表名称 | 分类 | 类型 | 状态 |
|----|----------|------|------|------|
| `herdoo2` | HERDOO2 | 抗凝疗程 | A 累加 | live |
| `dash` | DASH Score | 抗凝疗程 | A 累加 | live |
| `riete-bleeding` | RIETE Bleeding Score | 出血风险 | A 累加 | live |
| `improve-bleeding` | IMPROVE Bleeding Score | 出血风险 | A 累加 | live |
| `vte-bleed` | VTE-BLEED | 出血风险 | A 累加 | live |
| `khorana` | Khorana Score | 住院预防 | A 累加 | live |

## 批次 3（复杂算法 / QoL）

| ID | 量表名称 | 分类 | 类型 | 状态 |
|----|----------|------|------|------|
| `perc` | PERC Rule | 验前概率 | D 流程 | live |
| `years` | YEARS Algorithm | 验前概率 | D 流程 | live |
| `bova` | Bova Score | 严重度与预后 | C 矩阵 | live |
| `fast` | FAST Score | 严重度与预后 | A 累加 | live |
| `mts` | MTS 分类 | 严重度与预后 | C 矩阵 | live |
| `villalta` | Villalta Score | PTS | B 分级 | live |
| `pesi` | PESI | 严重度与预后 | A 累加 | pending |
| `pemb-qol` | PEmb-QoL | QoL | — | placeholder |
| `dvt-qol` | DVT-QoL | QoL | — | placeholder |

## Phase 2（血管外科扩展，未实现）

Fontaine、Rutherford、TASC II、WIfI、CEAP、VCSS、AVVQ 等。

## 审核 checklist（每个 live 量表）

- [ ] 临床条目与 PDF 分值一致
- [ ] 患者化文案已撰写
- [ ] golden test ≥3 组通过
- [ ] 适用人群/前置条件已配置
