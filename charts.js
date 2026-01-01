/**
 * @baidu/chat-input-next 技术文档可视化图表
 * 使用 @antv/infographic 生成各模块图表
 */

import { Infographic } from '@antv/infographic';

// ============================================
// 图表 1: 核心特性卡片图
// 数据来源: input.md 1.2 核心特性
// ============================================
export function createCoreFeaturesChart() {
    return new Infographic({
        container: '#core-features',
        template: 'list-column-card',
        width: 1000,
        height: 500,
        data: {
            title: '@baidu/chat-input-next 核心特性',
            desc: '专为百度 AI 搜索场景设计的智能输入框组件',
            items: [
                {
                    label: '双模式输入',
                    desc: '支持普通模式（textarea）和 AI 模式（contenteditable）',
                    icon: 'switch-039_v1_lineal',
                    value: 95
                },
                {
                    label: '文件上传',
                    desc: '支持文件、图片的拖拽/粘贴/选择上传',
                    icon: 'upload-051_v1_lineal',
                    value: 90
                },
                {
                    label: '语音输入',
                    desc: '基于 WebSocket 的实时语音识别',
                    icon: 'microphone-012_v1_lineal',
                    value: 88
                },
                {
                    label: 'AI 面板系统',
                    desc: '支持创作、画图、PPT、阅读、音乐、命理等多种 AI 工具面板',
                    icon: 'smart-061_v1_lineal',
                    value: 92
                },
                {
                    label: '自适应布局',
                    desc: '支持单行/多行输入框自动切换',
                    icon: 'resize-041_v1_lineal',
                    value: 85
                },
                {
                    label: '插件化架构',
                    desc: '高度可扩展的插件系统',
                    icon: 'plugin-025_v1_lineal',
                    value: 93
                }
            ]
        },
        theme: 'default'
    });
}

// ============================================
// 图表 2: 技术栈可视化图
// 数据来源: input.md 1.3 技术栈
// ============================================
export function createTechStackChart() {
    return new Infographic({
        container: '#tech-stack',
        template: 'list-row-simple-horizontal-arrow',
        width: 1200,
        height: 400,
        data: {
            title: '技术栈架构',
            desc: '项目所使用的核心技术栈',
            items: [
                {
                    label: 'San.js',
                    desc: '前端框架',
                    icon: 'code-029_v1_lineal',
                    value: 100
                },
                {
                    label: 'Vite 5.x',
                    desc: '构建工具',
                    icon: 'tools-037_v1_lineal',
                    value: 100
                },
                {
                    label: 'TypeScript',
                    desc: '开发语言',
                    icon: 'file-code-063_v1_lineal',
                    value: 100
                },
                {
                    label: '@baidu/chat-util',
                    desc: '工具库依赖',
                    icon: 'package-048_v1_lineal',
                    value: 80
                },
                {
                    label: 'spark-md5',
                    desc: 'MD5 计算',
                    icon: 'security-062_v1_lineal',
                    value: 60
                },
                {
                    label: '@baiducloud/sdk',
                    desc: 'BOS 云存储',
                    icon: 'cloud-044_v1_lineal',
                    value: 70
                }
            ]
        },
        theme: 'gradient-blue'
    });
}

// ============================================
// 图表 3: 整体架构层次树形图
// 数据来源: input.md 2.1 整体架构图
// ============================================
export function createArchitectureTreeChart() {
    return new Infographic({
        container: '#architecture-tree',
        template: 'hierarchy-tree-vertical',
        width: 1400,
        height: 900,
        data: {
            title: 'ChatInput 整体架构层次',
            desc: '组件层级嵌套结构',
            items: [
                {
                    label: 'ChatInput',
                    desc: '主组件',
                    icon: 'window-063_v1_lineal',
                    children: [
                        {
                            label: 'ci-main',
                            desc: '主容器',
                            icon: 'layout-048_v1_lineal',
                            children: [
                                {
                                    label: 'ci-wrapper',
                                    desc: '包装容器',
                                    icon: 'box-015_v1_lineal',
                                    children: [
                                        {
                                            label: 'ci-panel',
                                            desc: 'AI面板区域',
                                            icon: 'smart-061_v1_lineal'
                                        },
                                        {
                                            label: 'panel-btn-list',
                                            desc: '面板按钮列表',
                                            icon: 'menu-061_v1_lineal'
                                        },
                                        {
                                            label: 'ci-container',
                                            desc: '输入容器',
                                            icon: 'input-030_v1_lineal',
                                            children: [
                                                { label: 'ci-top-band', desc: '文件/引用区', icon: 'top-044_v1_lineal' },
                                                { label: 'ci-file-input-wrapper', desc: '文件输入包装', icon: 'upload-051_v1_lineal' },
                                                { label: 'prefix-panel-item', desc: '前缀面板项', icon: 'tag-057_v1_lineal' },
                                                { label: 'single-file-item', desc: '单文件展示', icon: 'file-056_v1_lineal' },
                                                { label: 'ci-input', desc: '核心输入组件', icon: 'keyboard-037_v1_lineal' },
                                                { label: 'tools', desc: '工具栏', icon: 'tools-037_v1_lineal' }
                                            ]
                                        },
                                        {
                                            label: 'ai-sug',
                                            desc: 'AI智能推荐',
                                            icon: 'bulb-055_v1_lineal'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            label: 'toast',
                            desc: '提示组件',
                            icon: 'notification-056_v1_lineal'
                        },
                        {
                            label: 'uploader',
                            desc: '上传组件',
                            icon: 'upload-051_v1_lineal'
                        },
                        {
                            label: 'bind-window-action',
                            desc: '窗口事件绑定',
                            icon: 'link-044_v1_lineal'
                        }
                    ]
                }
            ]
        },
        theme: 'default'
    });
}

// ============================================
// 图表 4: 核心模块划分流程图
// 数据来源: input.md 2.2 核心模块划分
// ============================================
export function createModuleStructureChart() {
    return new Infographic({
        container: '#module-structure',
        template: 'list-row-simple-horizontal-arrow',
        width: 1400,
        height: 600,
        data: {
            title: '核心模块划分',
            desc: 'src/ 目录结构与模块职责',
            items: [
                {
                    label: 'index.ts',
                    desc: '主入口，ChatInput 组件定义',
                    icon: 'home-045_v1_lineal',
                    value: 100
                },
                {
                    label: 'component/',
                    desc: '基础 UI 组件（api、dialog、icon、toast等）',
                    icon: 'components-053_v1_lineal',
                    value: 90
                },
                {
                    label: 'plugins/',
                    desc: '插件系统（input、tools、panels、uploader等）',
                    icon: 'plugin-025_v1_lineal',
                    value: 95
                },
                {
                    label: 'services/',
                    desc: '核心服务（api、event、file、voice等）',
                    icon: 'service-048_v1_lineal',
                    value: 88
                },
                {
                    label: 'types/',
                    desc: 'TypeScript 类型定义',
                    icon: 'file-code-063_v1_lineal',
                    value: 70
                }
            ]
        },
        theme: 'gradient-green'
    });
}

// ============================================
// 图表 5: 公开 API 表格图
// 数据来源: input.md 3.1.4 公开 API
// ============================================
export function createPublicApiChart() {
    return new Infographic({
        container: '#public-api',
        template: 'list-column-card',
        width: 1200,
        height: 700,
        data: {
            title: 'ChatInput 公开 API',
            desc: '组件对外暴露的方法接口',
            items: [
                {
                    label: 'getValue()',
                    desc: '获取输入框内容',
                    icon: 'search-066_v1_lineal',
                    value: 100
                },
                {
                    label: 'setValue(data)',
                    desc: '设置输入框内容',
                    icon: 'edit-056_v1_lineal',
                    value: 95
                },
                {
                    label: 'clearValue()',
                    desc: '清空输入框',
                    icon: 'delete-055_v1_lineal',
                    value: 90
                },
                {
                    label: 'getInputInfo()',
                    desc: '获取输入框完整信息',
                    icon: 'info-062_v1_lineal',
                    value: 85
                },
                {
                    label: 'focus() / blur()',
                    desc: '聚焦/失焦输入框',
                    icon: 'cursor-054_v1_lineal',
                    value: 88
                },
                {
                    label: 'setPrefix(type)',
                    desc: '设置前缀标签',
                    icon: 'tag-057_v1_lineal',
                    value: 80
                },
                {
                    label: 'uploadFile(data)',
                    desc: '触发文件上传',
                    icon: 'upload-051_v1_lineal',
                    value: 92
                },
                {
                    label: 'getFileList()',
                    desc: '获取已上传文件列表',
                    icon: 'file-056_v1_lineal',
                    value: 85
                },
                {
                    label: 'closePanel()',
                    desc: '关闭面板',
                    icon: 'close-043_v1_lineal',
                    value: 75
                },
                {
                    label: 'reset()',
                    desc: '重置组件状态',
                    icon: 'refresh-051_v1_lineal',
                    value: 80
                }
            ]
        },
        theme: 'default'
    });
}

// ============================================
// 图表 6: AI 面板类型卡片图
// 数据来源: input.md 3.4.1 支持的面板类型
// ============================================
export function createPanelTypesChart() {
    return new Infographic({
        container: '#panel-types',
        template: 'list-column-card',
        width: 1200,
        height: 500,
        data: {
            title: 'AI 面板系统',
            desc: '支持的 AI 工具面板类型',
            items: [
                {
                    label: '办公创作',
                    desc: 'office_create - 文档、表格创作',
                    icon: 'document-073_v1_lineal',
                    value: 90
                },
                {
                    label: '图片编辑',
                    desc: 'photo_editing - 图片处理工具',
                    icon: 'image-054_v1_lineal',
                    value: 88
                },
                {
                    label: 'AI 阅读',
                    desc: 'ai_read - 文档阅读理解',
                    icon: 'book-063_v1_lineal',
                    value: 95
                },
                {
                    label: 'AI 编程',
                    desc: 'ai_code - 代码生成助手',
                    icon: 'code-029_v1_lineal',
                    value: 92
                },
                {
                    label: 'AI PPT',
                    desc: 'ai_ppt - 演示文稿生成',
                    icon: 'presentation-056_v1_lineal',
                    value: 87
                },
                {
                    label: '深度研究',
                    desc: 'deep_research - 深度研究报告',
                    icon: 'search-066_v1_lineal',
                    value: 93
                },
                {
                    label: '音乐创作',
                    desc: 'ai_music_create - AI 音乐生成',
                    icon: 'music-062_v1_lineal',
                    value: 85
                },
                {
                    label: '命理测算',
                    desc: 'ai_numerology - 命理分析',
                    icon: 'star-058_v1_lineal',
                    value: 70
                }
            ]
        },
        theme: 'gradient-purple'
    });
}

// ============================================
// 图表 7: 事件系统分类树形图
// 数据来源: input.md 4.1 事件系统
// ============================================
export function createEventSystemChart() {
    return new Infographic({
        container: '#event-system',
        template: 'hierarchy-tree-vertical',
        width: 1400,
        height: 800,
        data: {
            title: '事件系统架构',
            desc: '对外触发事件与内部通信事件',
            items: [
                {
                    label: '事件系统',
                    desc: 'EventBus',
                    icon: 'network-058_v1_lineal',
                    children: [
                        {
                            label: 'FIRE_EVENTS',
                            desc: '对外触发事件',
                            icon: 'up-arrow-053_v1_lineal',
                            children: [
                                { label: 'SUBMIT', desc: '提交事件', icon: 'send-056_v1_lineal' },
                                { label: 'INPUT_CHANGE', desc: '输入变化', icon: 'edit-056_v1_lineal' },
                                { label: 'FILE_CHANGE', desc: '文件变化', icon: 'file-056_v1_lineal' },
                                { label: 'PANEL_CHANGE', desc: '面板变化', icon: 'smart-061_v1_lineal' },
                                { label: 'VOICE_INPUT_START', desc: '语音开始', icon: 'microphone-012_v1_lineal' },
                                { label: 'HEIGHT_CHANGE', desc: '高度变化', icon: 'resize-041_v1_lineal' }
                            ]
                        },
                        {
                            label: 'EVENTS',
                            desc: '内部通信事件',
                            icon: 'exchange-048_v1_lineal',
                            children: [
                                { label: 'PANEL_OPEN/CLOSE', desc: '面板开关', icon: 'smart-061_v1_lineal' },
                                { label: 'UPLOAD_FILE', desc: '文件上传', icon: 'upload-051_v1_lineal' },
                                { label: 'VALUE_CHANGE', desc: '值变化', icon: 'edit-056_v1_lineal' },
                                { label: 'TOAST_SHOW', desc: '提示显示', icon: 'notification-056_v1_lineal' },
                                { label: 'CLEAR', desc: '清空', icon: 'delete-055_v1_lineal' }
                            ]
                        }
                    ]
                }
            ]
        },
        theme: 'gradient-orange'
    });
}

// ============================================
// 图表 8: 文件上传状态流程图
// 数据来源: input.md 4.3 文件上传服务
// ============================================
export function createUploadStatusChart() {
    return new Infographic({
        container: '#upload-status',
        template: 'list-row-simple-horizontal-arrow',
        width: 1400,
        height: 400,
        data: {
            title: '文件上传状态流程',
            desc: '从用户选择到上传完成的完整状态机',
            items: [
                {
                    label: 'INIT',
                    desc: '初始化',
                    icon: 'start-053_v1_lineal',
                    value: -1
                },
                {
                    label: 'STS_SUCCESS',
                    desc: 'STS凭证获取成功',
                    icon: 'key-062_v1_lineal',
                    value: 0
                },
                {
                    label: 'UPLOADING',
                    desc: '上传中',
                    icon: 'loading-055_v1_lineal',
                    value: 1
                },
                {
                    label: 'BOS_SUCCESS',
                    desc: 'BOS上传成功',
                    icon: 'cloud-044_v1_lineal',
                    value: 2
                },
                {
                    label: 'KNOWLEDGE_SUCCESS',
                    desc: '知识库上传成功',
                    icon: 'database-061_v1_lineal',
                    value: 7
                },
                {
                    label: 'ERROR',
                    desc: '错误状态（网络/风控/超限）',
                    icon: 'warning-056_v1_lineal',
                    value: 3
                }
            ]
        },
        theme: 'gradient-red'
    });
}

// ============================================
// 图表 9: 文件上传流程图
// 数据来源: input.md 4.3.4 上传流程
// ============================================
export function createUploadFlowChart() {
    return new Infographic({
        container: '#upload-flow',
        template: 'list-row-simple-horizontal-arrow',
        width: 1400,
        height: 500,
        data: {
            title: '文件上传完整流程',
            desc: '从用户操作到文件可用的六个步骤',
            items: [
                {
                    label: '用户选择',
                    desc: '选择文件/拖拽/粘贴',
                    icon: 'cursor-054_v1_lineal',
                    value: 100
                },
                {
                    label: '格式校验',
                    desc: '检查文件类型和大小',
                    icon: 'check-059_v1_lineal',
                    value: 90
                },
                {
                    label: '获取STS',
                    desc: '获取临时上传凭证',
                    icon: 'key-062_v1_lineal',
                    value: 80
                },
                {
                    label: '上传BOS',
                    desc: '上传到百度云存储',
                    icon: 'cloud-upload-051_v1_lineal',
                    value: 70
                },
                {
                    label: '风控检查',
                    desc: '调用后端确认接口',
                    icon: 'security-062_v1_lineal',
                    value: 60
                },
                {
                    label: '返回URL',
                    desc: '返回文件URL和ID',
                    icon: 'link-044_v1_lineal',
                    value: 50
                }
            ]
        },
        theme: 'gradient-blue'
    });
}

// ============================================
// 图表 10: 语音识别配置表
// 数据来源: input.md 4.4.1 技术方案
// ============================================
export function createVoiceConfigChart() {
    return new Infographic({
        container: '#voice-config',
        template: 'list-column-card',
        width: 1000,
        height: 400,
        data: {
            title: '语音识别技术方案',
            desc: 'WebSocket 实时语音识别配置',
            items: [
                {
                    label: '协议',
                    desc: 'WebSocket',
                    icon: 'network-058_v1_lineal',
                    value: 100
                },
                {
                    label: '服务地址',
                    desc: 'wss://vse.baidu.com/ws_api',
                    icon: 'server-048_v1_lineal',
                    value: 95
                },
                {
                    label: '采样率',
                    desc: '16kHz',
                    icon: 'wave-054_v1_lineal',
                    value: 90
                },
                {
                    label: '位深',
                    desc: '16bit',
                    icon: 'settings-057_v1_lineal',
                    value: 85
                },
                {
                    label: '声道',
                    desc: '单声道',
                    icon: 'sound-055_v1_lineal',
                    value: 80
                },
                {
                    label: '格式',
                    desc: 'PCM',
                    icon: 'file-056_v1_lineal',
                    value: 75
                }
            ]
        },
        theme: 'default'
    });
}

// ============================================
// 图表 11: 音频处理链路流程图
// 数据来源: input.md 4.4.4 音频处理链路
// ============================================
export function createAudioChainChart() {
    return new Infographic({
        container: '#audio-chain',
        template: 'list-row-simple-horizontal-arrow',
        width: 1400,
        height: 400,
        data: {
            title: '音频处理链路',
            desc: '从麦克风到 WebSocket 发送的完整数据流',
            items: [
                {
                    label: '麦克风',
                    desc: 'MediaStream 获取音频流',
                    icon: 'microphone-012_v1_lineal',
                    value: 100
                },
                {
                    label: '音频上下文',
                    desc: 'AudioContext 创建媒体源',
                    icon: 'sound-055_v1_lineal',
                    value: 90
                },
                {
                    label: '采样缓冲',
                    desc: 'ScriptProcessorNode 处理',
                    icon: 'cpu-057_v1_lineal',
                    value: 80
                },
                {
                    label: '数据转换',
                    desc: '重采样 + Float32 → Int16',
                    icon: 'exchange-048_v1_lineal',
                    value: 70
                },
                {
                    label: 'WebSocket',
                    desc: '发送 PCM 数据',
                    icon: 'network-058_v1_lineal',
                    value: 60
                }
            ]
        },
        theme: 'gradient-purple'
    });
}

// ============================================
// 图表 12: 工具栏结构分解图
// 数据来源: input.md 3.3 工具栏组件
// ============================================
export function createToolsStructureChart() {
    return new Infographic({
        container: '#tools-structure',
        template: 'hierarchy-tree-vertical',
        width: 1200,
        height: 700,
        data: {
            title: '工具栏组件结构',
            desc: '左侧和右侧工具栏的功能划分',
            items: [
                {
                    label: 'ci-tool',
                    desc: '工具栏容器',
                    icon: 'tools-037_v1_lineal',
                    children: [
                        {
                            label: 'left-tools',
                            desc: '左侧工具',
                            icon: 'align-left-048_v1_lineal',
                            children: [
                                { label: 'AskAiButton', desc: '跳转AI搜索', icon: 'robot-050_v1_lineal' },
                                { label: 'InputModel', desc: '模型选择器', icon: 'settings-057_v1_lineal' },
                                { label: 'DrawButtons', desc: '画图工具', icon: 'brush-055_v1_lineal' },
                                { label: 'MusicButton', desc: '音乐创作', icon: 'music-062_v1_lineal' }
                            ]
                        },
                        {
                            label: 'right-tools',
                            desc: '右侧工具',
                            icon: 'align-right-048_v1_lineal',
                            children: [
                                { label: '清空按钮', desc: '清空输入内容', icon: 'delete-055_v1_lineal' },
                                { label: '语音输入', desc: '实时语音识别', icon: 'microphone-012_v1_lineal' },
                                { label: '文件上传', desc: '文档上传', icon: 'upload-051_v1_lineal' },
                                { label: '图片上传', desc: '图片上传', icon: 'image-054_v1_lineal' },
                                { label: '链接按钮', desc: '网页链接输入', icon: 'link-044_v1_lineal' },
                                { label: '提交按钮', desc: '发送/搜索', icon: 'send-056_v1_lineal' }
                            ]
                        }
                    ]
                }
            ]
        },
        theme: 'default'
    });
}

// ============================================
// 主函数：渲染所有图表
// ============================================
export function renderAllCharts() {
    const charts = [
        createCoreFeaturesChart(),
        createTechStackChart(),
        createArchitectureTreeChart(),
        createModuleStructureChart(),
        createPublicApiChart(),
        createPanelTypesChart(),
        createEventSystemChart(),
        createUploadStatusChart(),
        createUploadFlowChart(),
        createVoiceConfigChart(),
        createAudioChainChart(),
        createToolsStructureChart()
    ];

    charts.forEach(chart => chart.render());

    return charts;
}

// ============================================
// 导出图表为图片
// ============================================
export async function exportChartsAsImages() {
    const charts = renderAllCharts();

    const exports = await Promise.all(
        charts.map(async (chart, index) => {
            const dataUrl = await chart.toDataURL({
                type: 'png',
                dpr: 2  // 高清导出
            });
            return {
                name: `chart-${index + 1}.png`,
                dataUrl
            };
        })
    );

    return exports;
}
