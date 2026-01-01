# @baidu/chat-input-next 技术文档

## 目录

- [1. 概述](#1-概述)
- [2. 架构设计](#2-架构设计)
- [3. 核心组件详解](#3-核心组件详解)
- [4. 服务层详解](#4-服务层详解)
- [5. 数据流设计](#5-数据流设计)
- [6. 使用指南](#6-使用指南)
- [7. 扩展开发](#7-扩展开发)
- [8. 性能优化](#8-性能优化)
- [9. 注意事项](#9-注意事项)
- [10. 总结](#10-总结)

---

## 1. 概述

### 1.1 项目简介

`@baidu/chat-input-next` 是一个功能丰富的智能输入框组件，专为百度 AI 搜索场景设计。它基于 San.js 框架开发，支持多种输入模式、文件上传、语音识别、AI 面板等功能。

### 1.2 核心特性

| 特性 | 描述 |
|------|------|
| 双模式输入 | 支持普通模式（textarea）和 AI 模式（contenteditable） |
| 文件上传 | 支持文件、图片的拖拽/粘贴/选择上传 |
| 语音输入 | 基于 WebSocket 的实时语音识别 |
| AI 面板系统 | 支持创作、画图、PPT、阅读、音乐、命理等多种 AI 工具面板 |
| 自适应布局 | 支持单行/多行输入框自动切换 |
| 插件化架构 | 高度可扩展的插件系统 |

### 1.3 技术栈

- **框架**: San.js
- **构建**: Vite 5.x
- **语言**: TypeScript
- **依赖**: @baidu/chat-util, spark-md5, @baiducloud/sdk

---

## 2. 架构设计

### 2.1 整体架构图

```text
┌─────────────────────────────────────────────────────────────────┐
│                         ChatInput (主组件)                       │
├─────────────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                      ci-main (主容器)                      │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │                    ci-wrapper                       │  │  │
│  │  │  ┌─────────────────────────────────────────────┐    │  │  │
│  │  │  │  ci-panel (AI面板区域 - position: top/bottom) │    │  │  │
│  │  │  └─────────────────────────────────────────────┘    │  │  │
│  │  │  ┌─────────────────────────────────────────────┐    │  │  │
│  │  │  │  panel-btn-list (面板按钮列表)               │    │  │  │
│  │  │  └─────────────────────────────────────────────┘    │  │  │
│  │  │  ┌─────────────────────────────────────────────┐    │  │  │
│  │  │  │  ci-container (输入容器)                     │    │  │  │
│  │  │  │  ├── ci-top-band (文件/引用区)               │    │  │  │
│  │  │  │  ├── ci-file-input-wrapper                  │    │  │  │
│  │  │  │  │   ├── prefix-panel-item (前缀面板项)      │    │  │  │
│  │  │  │  │   ├── single-file-item (单文件展示)       │    │  │  │
│  │  │  │  │   └── ci-input (核心输入组件)             │    │  │  │
│  │  │  │  └── tools (工具栏)                         │    │  │  │
│  │  │  └─────────────────────────────────────────────┘    │  │  │
│  │  │  ┌─────────────────────────────────────────────┐    │  │  │
│  │  │  │  ai-sug (AI 智能推荐)                        │    │  │  │
│  │  │  └─────────────────────────────────────────────┘    │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
│  ┌────────────┐  ┌────────────┐  ┌──────────────────────────┐  │
│  │   toast    │  │  uploader  │  │   bind-window-action     │  │
│  └────────────┘  └────────────┘  └──────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 核心模块划分

```text
src/
├── index.ts                 # 主入口，ChatInput 组件定义
├── component/               # 基础 UI 组件
│   ├── api/                 # API 组件基类
│   ├── border-animation-svg/# 边框动画
│   ├── dialog/              # 对话框
│   ├── drop-down/           # 下拉菜单
│   ├── icon/                # 图标
│   ├── popover/             # 弹出层
│   ├── swiper/              # 轮播
│   ├── switcher/            # 切换器
│   ├── toast/               # 提示
│   ├── tooltips/            # 工具提示
│   └── voice-input/         # 语音输入
├── plugins/                 # 插件系统
│   ├── input/               # 核心输入插件
│   ├── tools/               # 工具栏插件
│   ├── panels/              # AI 面板插件
│   ├── uploader/            # 文件上传插件
│   ├── reference/           # 引用插件
│   └── bind-window-action/  # 窗口事件绑定
├── services/                # 核心服务
│   ├── api.ts               # InputApi 服务类
│   ├── event.ts             # 事件系统
│   ├── type.ts              # 类型定义
│   ├── constants.ts         # 常量定义
│   ├── file.ts              # 文件上传服务
│   ├── voice.ts             # 语音识别服务
│   ├── voice-controller.ts  # 语音控制器
│   ├── input.ts             # 输入处理
│   ├── utils.ts             # 工具函数
│   └── ...
└── types/                   # TypeScript 类型定义
```

---

## 3. 核心组件详解

### 3.1 ChatInput 主组件

> 文件: `src/index.ts`

#### 3.1.1 组件结构

```typescript
export default class ChatInput extends ApiCmpt {
    static template = /* html */`...`;
    static components = {
        'toast': Toast,
        'tools': Tools,
        'file': File,
        'ci-input': Input,
        'panel-btn-list': PanelBtn,
        'reference': Reference,
        'ai-sug': AiSug,
        'uploader': Uploader,
        'single-file-item': SingleFileItem,
        'bind-window-action': BindWindowAction,
        'prefix-panel-item': PrefixPanelItem,
    };
}
```

#### 3.1.2 核心数据状态

```typescript
initData() {
    return {
        initialFocus: false,        // 初始聚焦状态
        query: '',                  // 查询内容
        aiPlaceholder: '',          // AI模式占位符
        scene: 'AI',                // 场景: 'AI' | 其他
        mode: '',                   // 模式: '' | 'AI'
        panels: {
            position: 'bottom'      // 面板位置: 'top' | 'bottom'
        },
        tools: {},                  // 工具栏配置
        fileList: [],               // 文件列表
        input: {
            row: 2,                 // 行数: 1(单行) | 2(多行)
            normalPlaceholder: ''   // 普通模式占位符
        },
        submitBtnPause: false,      // 提交按钮暂停状态
        openPanelInfo: {},          // 打开的面板信息
        showAiSug: false,           // 是否显示AI建议
        showFileList: true          // 是否显示文件列表
    };
}
```

#### 3.1.3 计算属性

```typescript
static computed = {
    isChatSearch() {
        return this.data.get('scene') === 'AI';
    },
    isPanelTop() {
        return this.data.get('panels').position === 'top';
    },
    isSingleLine() {
        return this.data.get('input.row') === 1;
    },
    fileType() {
        const fileList = this.data.get('fileList');
        return fileList.length ? fileList[0].uploadType : '';
    },
    openPanelType() {
        const openPanelInfo = this.data.get('openPanelInfo');
        return openPanelInfo?.type || '';
    }
};
```

#### 3.1.4 公开 API

| 方法 | 描述 | 参数 |
|------|------|------|
| `getValue()` | 获取输入框内容 | - |
| `setValue(data)` | 设置输入框内容 | `SetValueData` |
| `clearValue({keepPrefix})` | 清空输入框 | `{keepPrefix: boolean}` |
| `getInputInfo()` | 获取输入框完整信息 | - |
| `focus()` | 聚焦输入框 | - |
| `blur()` | 失焦输入框 | - |
| `setPrefix(type)` | 设置前缀标签 | `string` |
| `getPanel()` | 获取当前面板信息 | - |
| `closePanel()` | 关闭面板 | - |
| `uploadFile(data)` | 触发文件上传 | `UploaderData` |
| `getFileList()` | 获取已上传文件列表 | - |
| `setReference(value)` | 设置引用内容 | `string` |
| `setMode(isAiMode)` | 切换输入模式 | `boolean` |
| `reset()` | 重置组件状态 | - |

### 3.2 Input 核心输入组件

> 文件: `src/plugins/input/index.ts`

#### 3.2.1 双模式设计

组件支持两种输入模式：

**普通模式 (textarea):**

```html
<textarea
    s-if="{{!isAiEditor}}"
    class="ci-textarea"
    placeholder="{{normalPlaceholder}}"
    maxlength="{{maxLength}}"
    ...
></textarea>
```

**AI 模式 (contenteditable):**

```html
<div s-else class="ci-ai">
    <div
        class="ci-editor"
        contenteditable="true"
        ...
    ></div>
</div>
```

#### 3.2.2 字数限制策略

```typescript
static computed = {
    maxLength() {
        const isAiSearch = this.data.get('isAiSearch');
        const prefixType = this.data.get('prefix.type');

        const INPUT_MAX_LENGTH = 1000;        // 普通限制
        const CHAT_INPUT_MAX_LENGTH = 5000;   // AI对话限制
        const PREFIX_LIMIT_LENGTH = {
            ai_music_create: 200              // 音乐创作特殊限制
        };

        return PREFIX_LIMIT_LENGTH[prefixType] ||
               (isAiSearch ? CHAT_INPUT_MAX_LENGTH : INPUT_MAX_LENGTH);
    }
};
```

#### 3.2.3 前缀标签系统

前缀标签用于标识当前 AI 工具类型：

```typescript
interface Prefix {
    show: boolean;           // 是否展现
    type: string;            // 面板类型(En): 'ai_read', 'ai_ppt' 等
    name: string;            // 标签名(Cn)
    blockOpenPanel: boolean; // 是否阻塞面板打开
    functionName: string;    // 点击的子功能名(En)
    functionTab: string;     // 点击的子功能分类(En)
}
```

#### 3.2.4 键盘事件处理

```typescript
handleKeydown(e: KeyboardEvent) {
    // Ctrl/Cmd + A: 自定义全选(排除前缀)
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'a') { ... }

    // Backspace: 退格处理
    if (e.key === 'Backspace') { ... }

    // 方向键: 光标移动限制
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { ... }

    // Enter: 发送/换行
    if (e.key === 'Enter') {
        // Shift/Cmd/Ctrl + Enter: 换行
        if (e.shiftKey || e.metaKey || e.ctrlKey) { ... }
        // 普通 Enter: 发送
        else { ... }
    }
}
```

### 3.3 Tools 工具栏组件

> 文件: `src/plugins/tools/index.ts`

#### 3.3.1 工具栏结构

```text
┌──────────────────────────────────────────────────────────┐
│                     ci-tool                              │
│  ┌──────────────────────┐  ┌────────────────────────────┐│
│  │     left-tools       │  │       right-tools          ││
│  │  ├── ask-ai-button   │  │  ├── clear-icon            ││
│  │  ├── input-model     │  │  ├── voice-input           ││
│  │  ├── draw-buttons    │  │  ├── file-upload           ││
│  │  └── music-button    │  │  ├── image-upload          ││
│  │                      │  │  ├── link-button           ││
│  │                      │  │  └── submit-btn            ││
│  └──────────────────────┘  └────────────────────────────┘│
└──────────────────────────────────────────────────────────┘
```

#### 3.3.2 左侧工具 (LeftTools)

> 文件: `src/plugins/tools/left-tools.ts`

功能组件:

- **AskAiButton**: 跳转 AI 搜索按钮
- **InputModel**: 模型选择器（深度搜索开关等）
- **DrawButtons**: 画图工具按钮组
- **MusicButton**: 音乐创作工具

#### 3.3.3 右侧工具 (RightTools)

> 文件: `src/plugins/tools/right-tools.ts`

功能组件:

- **清空按钮**: 清空输入内容
- **语音输入**: 实时语音识别
- **文件上传**: 支持 PDF、Word、Excel、PPT 等
- **图片上传**: 支持 jpg、png、jpeg 等
- **链接按钮**: 网页链接输入（AI阅读场景）
- **提交按钮**: 发送/搜索

### 3.4 Panels 面板系统

> 文件: `src/plugins/panels/index.ts`

#### 3.4.1 支持的面板类型

```typescript
export enum ChatPanel {
    CREATE = 'office_create',        // 办公创作
    PHOTO = 'photo_editing',         // 图片编辑
    READ = 'ai_read',                // AI阅读
    CODE = 'ai_code',                // AI编程
    PPT = 'ai_ppt',                  // AI PPT
    DEEP_RESEARCH = 'deep_research', // 深度研究
    MUSIC = 'ai_music_create',       // 音乐创作
    NUMERO = 'ai_numerology'         // 命理测算
}
```

#### 3.4.2 面板组件映射

```typescript
const panelsMap: Record<string, any> = {
    [ChatPanel.CREATE]: create,          // 创作面板
    [ChatPanel.PHOTO]: draw,             // 画图面板
    [ChatPanel.PPT]: snapText,           // PPT面板(快捷文本)
    [ChatPanel.READ]: snapText,          // 阅读面板
    [ChatPanel.CODE]: snapText,          // 代码面板
    [ChatPanel.DEEP_RESEARCH]: snapText, // 深度研究面板
    [ChatPanel.MUSIC]: music,            // 音乐面板
    [ChatPanel.NUMERO]: numerology       // 命理面板
};
```

#### 3.4.3 自适应按钮栏

```typescript
// 根据容器宽度自动计算可见按钮和隐藏按钮
const {visibleButtons, hiddenButtons} = calculateAdaptiveButtonBar(buttonsConfig, {
    containerWidth: 724,
    defaultMinWidth: 90,  // top: 90, bottom: 110
    buttonGap: 9,
    moreButtonWidth: 86
});
```

---

## 4. 服务层详解

### 4.1 事件系统

> 文件: `src/services/event.ts`

#### 4.1.1 事件类型定义

**对外触发事件 (FIRE_EVENTS):**

```typescript
export enum FIRE_EVENTS {
    PAUSE = 'pause',
    SUBMIT = 'submit',
    SUG_CLICK = 'sug-click',
    SUG_SELECT = 'sug-select',
    INPUT_CHANGE = 'input-change',
    SEND_LOG = 'send-log',
    DEEP_SEARCH_CHANGE = 'deep-search-change',
    MODEL_CHANGE = 'model-change',
    INPUT_VALUE_CHANGE = 'input-value-change',
    FILE_CHANGE = 'file-change',
    HEIGHT_CHANGE = 'height-change',
    VOICE_INPUT_START = 'voice-input-start',
    VOICE_INPUT_STOP = 'voice-input-stop',
    PANEL_CHANGE = 'panel-change',
    IMAGE_FILE_SELECT = 'image-file-select',
}
```

**内部通信事件 (EVENTS):**

```typescript
export enum EVENTS {
    PANEL_DETACH = 'panel-detach',
    PANEL_OPEN = 'panel-open',
    PANEL_CLOSE = 'panel-close',
    VOICE_INPUT_STOP = 'voice-input-stop',
    VOICE_INPUT_COMPLETE = 'voice-input-complete',
    SET_PLACEHOLDER = 'placeholder',
    UPLOAD_FILE = 'uploader_file',
    DELETE_FILE = 'delete_file',
    KEYDOWN = 'keydown',
    INPUT_STATUS_CHANGE = 'change-input',
    VALUE_CHANGE = 'value-change',
    SHOW_PREFIX = 'show-prefix',
    TOAST_SHOW = 'toast-show',
    FILE_CHANGE = 'file-change',
    CLEAR = 'clear',
    // ...
}
```

#### 4.1.2 EventEmitter 实现

```typescript
export class EventEmitter<T> {
    private listeners: {[K in keyof T]?: Array<T[K]>} = {};

    on(event: string, callback: EventCb) {
        if (!this.listeners?.[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    emit(event: string, ...args) {
        this.listeners[event]?.forEach((cb: EventCb) => {
            cb.apply(null, args);
        });
    }

    off(event: string, callback?: EventCb) { ... }
}
```

#### 4.1.3 EventsBinder DOM 事件管理

```typescript
export class EventsBinder {
    private bindings: EventMap[] = [];

    add(el, type, handler, eventType, options?) {
        el.addEventListener(type, handler, options);
        this.bindings.push({el, type, handler, options, eventType});
    }

    clear(clearEventType?: ListenerEventType) { ... }
}
```

### 4.2 InputApi 服务类

> 文件: `src/services/api.ts`

#### 4.2.1 核心职责

InputApi 是组件间通信的核心桥梁，提供：

- 事件发布/订阅
- 根组件访问
- 面板管理
- 日志上报

#### 4.2.2 关键方法

```typescript
export class InputApi {
    currentCmpt: any;      // 当前组件
    rootCmpt: ChatInput;   // 根组件

    // 事件通信
    on(event: string, callback) { ... }
    emit(event: string, ...args) { ... }
    off(event: string, fn: EventCb) { ... }

    // 数据访问
    getRootData(key?: string) { ... }
    getValue() { ... }
    getInputInfo() { ... }
    getFileList() { ... }

    // 操作方法
    setMode(isAiMode: boolean) { ... }
    setValue(options) { ... }
    clearValue(options) { ... }
    focus() { ... }
    blur() { ... }

    // 面板管理
    async openPanel(panelType: string) { ... }
    closePanel() { ... }
    detachPanel() { ... }
    async getPanelData(panelType: string) { ... }

    // 日志上报
    sendLog(type: string, value: string, ext?: any, isRoot = false) { ... }
}
```

### 4.3 文件上传服务

> 文件: `src/services/file.ts`

#### 4.3.1 上传状态枚举

```typescript
export enum UploadStatus {
    INIT = -1,                    // 初始化
    STSSUCCESS = 0,               // STS凭证获取成功
    UPLOADING = 1,                // 上传中
    BOS_SUCCESS = 2,              // BOS上传成功
    NETWORK_ERROR = 3,            // 网络错误
    RISK_DENY = 4,                // 风控拒绝
    FILE_NUM_EXCEED_LIMIT = 5,    // 文件数量超限
    FILE_SIZE_EXCEED_LIMIT = 6,   // 文件大小超限
    KNOWLEDGE_SUCCESS = 7,        // 知识库上传成功
    KNOWLEDGE_ERROR = 8,          // 知识库上传失败
    NOT_AVAILABLE = 10,           // 不支持的格式
    FILE_SIZE_BELOW_LIMIT = 12,   // 文件过小
    IMAGE_INFO_SUCCESS = 13,      // 图片信息获取成功
}
```

#### 4.3.2 支持的文件格式

```typescript
// 图片格式
export const imageAccept = '.jpeg, .png, .jpg, .bmp';

// 文档格式
const fileAccept = '.pdf, .doc, .docx, .txt, .xls, .xlsx, .csv, .ppt, .pptx';

// 代码格式
const codeAccept = '.py, .java, .js, .html, .css, .ts, .c, .cpp, .cc, .h, .go';
```

#### 4.3.3 UploadFile 类

```typescript
export class UploadFile {
    // 创建上传实例
    static async create(options: Options) { ... }

    // 仅获取原始文件(不上传)
    static getOriginFile(type: string, maxNum: number): Promise<File[]> { ... }

    // 调起文件选择器
    async getFile(cb?: any): Promise<void> { ... }

    // 上传文件
    async uploadFile(file: File, index = 0): Promise<void> { ... }

    // 重试上传
    async reTryUpload(fileToken: string) { ... }

    // 获取STS凭证
    async getSts(): Promise<StsResult> { ... }

    // 上传确认
    async upLoadConfirm(fileData: any, sort?: number): Promise<{file_url: string}> { ... }

    // 删除文件
    static async deleteFile(uploadFileIns: any, options: any, successCb?: any) { ... }
}
```

#### 4.3.4 上传流程

```text
1. 用户选择文件/拖拽/粘贴
       ↓
2. 格式校验 & 大小校验
       ↓
3. 获取 STS 临时凭证
       ↓
4. 上传到百度 BOS
       ↓
5. 调用后端上传确认接口(风控检查)
       ↓
6. 返回文件 URL 和 ID
```

### 4.4 语音识别服务

> 文件: `src/services/voice.ts`

#### 4.4.1 技术方案

| 配置项 | 值 |
|--------|-----|
| 协议 | WebSocket |
| 服务地址 | `wss://vse.baidu.com/ws_api` |
| 采样率 | 16kHz |
| 位深 | 16bit |
| 声道 | 单声道 |
| 格式 | PCM |

#### 4.4.2 识别消息类型

```typescript
const enum RecognitionMessageType {
    HEARTBEAT = 'HEARTBEAT',           // 心跳
    MID_TEXT = 'MID_TEXT',             // 中间结果
    FIN_TEXT = 'FIN_TEXT',             // 最终结果
    SESSION_FINISH = 'SESSION_FINISH', // 会话结束
}
```

#### 4.4.3 核心流程

```typescript
// 启动录音
function startRecorder(options: StartRecorderOptions): Promise<void> {
    return navigator.mediaDevices
        .getUserMedia({
            video: false,
            audio: {
                sampleRate: 16000,
                sampleSize: 16,
                channelCount: 1
            }
        })
        .then((stream) => {
            startWebSocket();   // 建立WS连接
            initAudio(stream);  // 初始化音频处理
        });
}

// 停止录音
function stopRecorder() {
    closeAudio();              // 关闭音频
    doSend(FINISH_PARAMS);     // 发送结束信号
}
```

#### 4.4.4 音频处理链路

```text
麦克风 MediaStream
       ↓
AudioContext.createMediaStreamSource()
       ↓
ScriptProcessorNode (采样缓冲)
       ↓
重采样 + Float32 → Int16 转换
       ↓
WebSocket 发送 PCM 数据
```

#### 4.4.5 音量可视化

```typescript
function startAmplitudeSampling(audioCtx, source) {
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);

    setInterval(() => {
        analyser.getByteTimeDomainData(dataArray);
        // 计算 RMS 音量
        // 生成 5 个柱状条高度
        onAmplitudeCallback?.(scales);
    }, 80);
}
```

---

## 5. 数据流设计

### 5.1 事件流向图

```text
┌─────────────────────────────────────────────────────────────────┐
│                          业务层                                  │
│         <chat-input on-submit="handleSubmit" />                 │
└─────────────────────────────────────────────────────────────────┘
                              ↑ fire()
┌─────────────────────────────────────────────────────────────────┐
│                       ChatInput (根组件)                         │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  static messages = {                                     │   │
│  │      'ci-common': function(data) {                       │   │
│  │          this.fire(data.value.name, query);              │   │
│  │      }                                                   │   │
│  │  }                                                       │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↑ dispatch('ci-common', {...})
┌─────────────────────────────────────────────────────────────────┐
│                         子组件层                                 │
│    Input / Tools / Panels / Uploader / VoiceInput ...          │
└─────────────────────────────────────────────────────────────────┘
                              ↑↓ $input.emit() / $input.on()
┌─────────────────────────────────────────────────────────────────┐
│                      EventEmitter (内部事件总线)                  │
│                     rootCmpt.__ciEvent                          │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 状态管理

组件状态通过 San.js 的响应式数据系统管理：

```typescript
// 读取状态
const value = this.data.get('fileList');

// 更新状态
this.data.set('fileList', newFileList);

// 监听变化
this.watch('fileList', (val) => {
    this.fire(FIRE_EVENTS.FILE_CHANGE, val);
});
```

---

## 6. 使用指南

### 6.1 基础使用

```html
<chat-input
    scene="AI"
    panels="{{panelsConfig}}"
    tools="{{toolsConfig}}"
    input="{{inputConfig}}"
    on-submit="handleSubmit"
    on-input-change="handleInputChange"
/>
```

### 6.2 配置项说明

#### 6.2.1 scene 场景配置

```typescript
scene: 'AI' | 'video' | 'note' | 'news' | 'image' | string
```

#### 6.2.2 panels 面板配置

```typescript
panels: {
    position: 'top' | 'bottom',  // 面板位置
    list: [                      // 面板按钮列表
        {
            type: 'ai_read',
            text: 'AI阅读',
            button_id: 'ai_read',
            icon: '...',
            guide: boolean       // 是否显示红点引导
        },
        // ...
    ],
    adaptiveButton: boolean      // 是否启用自适应按钮
}
```

#### 6.2.3 tools 工具栏配置

```typescript
tools: {
    left: {
        askAi: boolean,           // 问AI按钮
        modelSelect: boolean,     // 模型选择
        deepsearch: boolean,      // 深度搜索
        draw: DrawConfig | false, // 画图工具
    },
    right: {
        voice: boolean,           // 语音输入
        fileUpload: boolean,      // 文件上传
        imageUpload: boolean,     // 图片上传
    }
}
```

#### 6.2.4 input 输入框配置

```typescript
input: {
    row: 1 | 2,                   // 行数
    normalPlaceholder: string,    // 普通模式占位符
    value: string,                // 初始值
    focusToMultiLine: boolean,    // 聚焦时切换多行
    needInitialFocus: boolean,    // 需要初始聚焦
    canSendPlaceholder: boolean,  // 可发送占位符
    focus: {                      // 聚焦时配置
        minRows: number,
        maxRows: number
    },
    blur: {                       // 失焦时配置
        minRows: number,
        maxRows: number
    }
}
```

#### 6.2.5 upload 上传配置

```typescript
upload: {
    file: {
        uploadMaxNum: number      // 文件最大数量，默认10
    },
    image: {
        uploadMaxNum: number,     // 图片最大数量，默认10
        dispatchFileData: boolean // 是否分发原始文件数据
    },
    blockOriginWhenScene: boolean // 是否阻止原生上传
}
```

### 6.3 事件监听

```html
<chat-input
    on-submit="handleSubmit"
    on-input-change="handleInputChange"
    on-file-change="handleFileChange"
    on-panel-change="handlePanelChange"
    on-height-change="handleHeightChange"
    on-send-log="handleSendLog"
/>
```

### 6.4 方法调用

```typescript
// 获取组件引用
const chatInput = this.ref('chatInput');

// 设置内容
chatInput.setValue({
    value: 'Hello',
    prefix: {
        show: true,
        type: 'ai_read',
        name: 'AI阅读'
    }
});

// 获取内容
const value = chatInput.getValue();
const info = chatInput.getInputInfo();

// 操作文件
chatInput.uploadFile({uploadType: 'file'});
const files = chatInput.getFileList();

// 面板控制
chatInput.setPrefix('ai_ppt');
chatInput.closePanel();

// 状态控制
chatInput.setMode(true);  // AI模式
chatInput.reset();        // 重置
```

---

## 7. 扩展开发

### 7.1 自定义面板

```typescript
// 1. 创建面板组件
class CustomPanel extends Component {
    static template = `<div class="custom-panel">...</div>`;

    open() {
        // 面板打开时调用
    }
}

// 2. 注册到 panelsMap
const panelsMap = {
    'custom_panel': CustomPanel
};

// 3. 配置面板按钮
panels: {
    list: [
        {
            type: 'custom_panel',
            text: '自定义面板',
            button_id: 'custom_panel'
        }
    ]
}
```

### 7.2 自定义工具按钮

```typescript
// 使用 registryComponent 注册自定义组件
chatInput.registryComponent('customTool', CustomToolComponent, targetEl, {
    // 组件数据
});
```

---

## 8. 性能优化

### 8.1 输入框高度缓存

```typescript
measurementsCacheRef: Record<'AI' | 'normal', ReturnType<typeof getSizingData> | null> = {
    AI: null,
    normal: null
};

lastInputHeight: Record<'AI' | 'normal', number | null> = {
    AI: null,
    normal: null
};
```

### 8.2 面板实例复用

```typescript
// 同一类型面板重复请求时复用实例
if (currentPanelInstance && currentPanelInstance.__moduleName === moduleName) {
    // 只更新数据，不重新挂载
    Object.keys(nextPanelData).forEach((key) => {
        currentPanelInstance.data.set(key, nextPanelData[key]);
    });
}
```

### 8.3 ResizeObserver 高度同步

```typescript
if (typeof ResizeObserver !== 'undefined') {
    this.__resizeObserver = new ResizeObserver(() => {
        requestAnimationFrame(() => {
            syncHeight();
        });
    });
    this.__resizeObserver.observe(ciWrapper);
}
```

---

## 9. 注意事项

### 9.1 浏览器兼容性

- 语音输入需要 WebRTC 支持（Chrome、Edge、Safari）
- 文件上传依赖 `@baiducloud/sdk` BOS SDK
- `contenteditable` 在不同浏览器表现有差异，需特殊处理

### 9.2 Safari 特殊处理

```typescript
// 中文输入法结束检测延迟
if (isSafari()) {
    setTimeout(() => {
        this.isComposing = false;
    }, 20);
}

// Enter 发送延迟
if (isSafari()) {
    setTimeout(() => {
        submit();
    }, 50);
}
```

### 9.3 文件混传限制

- 不支持文件和图片混合上传
- 文件上传默认最大 50MB
- 图片上传默认最大 10MB

---

## 10. 总结

`@baidu/chat-input-next` 是一个功能完备、设计精良的智能输入框组件。通过插件化架构、事件驱动的通信机制和丰富的 API，它能够满足复杂的 AI 搜索交互需求。

### 核心亮点

- ✅ 双模式输入（普通/AI）无缝切换
- ✅ 完善的文件上传体系（拖拽、粘贴、选择）
- ✅ 实时语音识别能力
- ✅ 灵活的 AI 面板系统
- ✅ 高度可配置和可扩展

---

> 如果你有任何问题或需要进一步了解某个模块的细节，请告诉我。
