# @meersagor/wavesurfer-vue

[![npm](https://img.shields.io/npm/v/@meersagor/wavesurfer-vue)](https://www.npmjs.com/package/@meersagor/wavesurfer-vue)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Audio Player

![audio player preview](./src/assets/preview.png)

A Vue 3 component for [wavesurfer.js](http://github.com/katspaugh/wavesurfer.js). This package provides a maintainable, modular architecture with core functionality and individual plugins for WaveSurfer.js.

## ✨ Features

- **🎯 Modular Architecture**: Core functionality separated from plugins
- **🧩 Individual Plugins**: Import only the plugins you need
- **🔄 Multiple Usage Patterns**: Core + plugins, standalone plugins, or core only
- **📦 Tree-shaking Friendly**: Smaller bundle sizes
- **🔧 TypeScript Support**: Full type safety
- **⚡ Vue 3 Composition API**: Modern Vue 3 patterns

## Installation

With yarn:
```bash
yarn add @meersagor/wavesurfer-vue
```

With npm:
```bash
npm i @meersagor/wavesurfer-vue
```

## 🚀 Usage Patterns

### Pattern 1: Core + Individual Plugins (Recommended)

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { 
  useWaveSurfer,
  useWaveSurferTimeline,
  useWaveSurferZoom,
  useWaveSurferMinimap
} from '@meersagor/wavesurfer-vue'

const containerRef = ref<HTMLElement | null>(null)
const timelineContainerRef = ref<HTMLElement | null>(null)
const minimapContainerRef = ref<HTMLElement | null>(null)

const options = ref({
  height: 100,
  waveColor: '#4F4A85',
  progressColor: '#383351',
  barGap: 2,
  barWidth: 3,
  barRadius: 3,
  url: 'https://wavesurfer-js.org/example/media/demo.wav'
})

// Core functionality
const { waveSurfer, isReady, totalDuration, isPlaying, currentTime } = useWaveSurfer({
  containerRef,
  options: options.value
})

// Individual plugins
const { timelinePlugin } = useWaveSurferTimeline({
  waveSurfer,
  timelineOptions: {
    container: timelineContainerRef
  }
})

const { zoomPlugin, zoomIn, zoomOut } = useWaveSurferZoom({
  waveSurfer,
  zoomOptions: {
    minPxPerSec: 50,
    scrollParent: true
  }
})

const { minimapPlugin } = useWaveSurferMinimap({
  waveSurfer,
  minimapOptions: {
    container: minimapContainerRef,
    height: 50
  }
})
</script>

<template>
  <div>
    <!-- Main waveform -->
    <div ref="containerRef"></div>
    
    <!-- Timeline -->
    <div ref="timelineContainerRef"></div>
    
    <!-- Minimap -->
    <div ref="minimapContainerRef"></div>
    
    <!-- Controls -->
    <div class="controls">
      <button @click="waveSurfer?.playPause()">
        {{ isPlaying ? 'Pause' : 'Play' }}
      </button>
      <button @click="zoomIn">Zoom In</button>
      <button @click="zoomOut">Zoom Out</button>
    </div>
    
    <div class="info">
      <p>Current Time: {{ formatTime(currentTime) }}</p>
      <p>Duration: {{ formatTime(totalDuration) }}</p>
    </div>
  </div>
</template>
```

### Pattern 2: Standalone Plugins

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { 
  useWaveSurferTimelineStandalone,
  useWaveSurferZoomStandalone
} from '@meersagor/wavesurfer-vue'

const containerRef = ref<HTMLElement | null>(null)
const timelineContainerRef = ref<HTMLElement | null>(null)

const options = ref({
  height: 80,
  waveColor: '#FF6B6B',
  progressColor: '#4ECDC4',
  barGap: 1,
  barWidth: 2,
  barRadius: 2,
  url: 'https://wavesurfer-js.org/example/media/demo.wav'
})

// Standalone timeline plugin (creates its own WaveSurfer instance)
const { waveSurfer, timelinePlugin } = useWaveSurferTimelineStandalone({
  containerRef,
  options: options.value,
  timelineOptions: {
    container: timelineContainerRef
  }
})

// Standalone zoom plugin (creates its own WaveSurfer instance)
const { waveSurfer: waveSurfer2, zoomPlugin, zoomIn, zoomOut } = useWaveSurferZoomStandalone({
  containerRef,
  options: options.value,
  zoomOptions: {
    minPxPerSec: 30,
    scrollParent: true
  }
})
</script>

<template>
  <div>
    <div ref="containerRef"></div>
    <div ref="timelineContainerRef"></div>
    
    <div class="controls">
      <button @click="waveSurfer?.playPause()">Play/Pause</button>
      <button @click="zoomIn">Zoom In</button>
      <button @click="zoomOut">Zoom Out</button>
    </div>
  </div>
</template>
```

### Pattern 3: Core Functionality Only

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useWaveSurfer } from '@meersagor/wavesurfer-vue'

const containerRef = ref<HTMLElement | null>(null)

const options = ref({
  height: 60,
  waveColor: '#95E1D3',
  progressColor: '#F38181',
  barGap: 3,
  barWidth: 4,
  barRadius: 4,
  url: 'https://wavesurfer-js.org/example/media/demo.wav'
})

// Using core functionality - returns waveSurfer instance and all state
const { waveSurfer, isReady, totalDuration, isPlaying, currentTime } = useWaveSurfer({
  containerRef,
  options: options.value
})
</script>

<template>
  <div>
    <div ref="containerRef"></div>
    <button @click="waveSurfer?.playPause()">
      {{ isPlaying ? 'Pause' : 'Play' }}
    </button>
  </div>
</template>
```

### Pattern 4: Component Usage (Legacy)

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type WaveSurfer from 'wavesurfer.js'
import { WaveSurferPlayer } from '@meersagor/wavesurfer-vue'

const options = ref({
  height: 48,
  waveColor: 'gray',
  progressColor: 'red',
  barGap: 5,
  barWidth: 5,
  barRadius: 8,
  duration: 80,
  url: "https://revews-bucket.s3.ap-southeast-1.amazonaws.com/a06mmMU3sgnzuUkH4OiHvyuUgCFdLSnJaDLBao7y.webm",
})

const currentTime = ref<string>('00:00')
const totalDuration = ref<string>('00:00')
const waveSurfer = ref<WaveSurfer | null>(null)

const formatTime = (seconds: number): string => [seconds / 60, seconds % 60].map((v) => `0${Math.floor(v)}`.slice(-2)).join(':')

const timeUpdateHandler = (time: number) => {
  currentTime.value = formatTime(time)
}
const readyHandler = (duration: any) => {
  totalDuration.value = formatTime(duration)
}
const readyWaveSurferHandler = (ws: WaveSurfer) => {
  waveSurfer.value = ws
}
</script>

<template>
  <main>
    <h1>WaveSurferPlayer Using Components </h1>
    <WaveSurferPlayer :options="options" @timeupdate="(time: number) => timeUpdateHandler(time)"
      @ready="(duration: number) => readyHandler(duration)" @waveSurfer="(ws: WaveSurfer) => readyWaveSurferHandler(ws)" />
    <p> currentTime: {{ currentTime }}</p>
    <p>totalDuration:{{ totalDuration }}</p>
    <button @click="waveSurfer?.playPause()" :style="{ minWidth: '5em' }">
      Play
    </button>
  </main>
</template>
```

## 🧩 Available Plugins

### Core Plugins
- **Timeline** - Adds a timeline display
- **Zoom** - Provides zoom functionality with methods
- **Minimap** - Shows a minimap overview
- **Hover** - Adds hover effects
- **Envelope** - Audio envelope visualization
- **Spectrogram** - Frequency spectrum visualization
- **Regions** - Audio region management
- **Recorder** - Audio recording functionality

### Plugin Usage

Each plugin has two versions:

#### With Existing WaveSurfer Instance
```typescript
import { useWaveSurferTimeline } from '@meersagor/wavesurfer-vue'

const { timelinePlugin } = useWaveSurferTimeline({
  waveSurfer,  // Existing WaveSurfer instance
  timelineOptions: { container: timelineContainer }
})
```

#### Standalone (Creates Own Instance)
```typescript
import { useWaveSurferTimelineStandalone } from '@meersagor/wavesurfer-vue'

const { waveSurfer, timelinePlugin } = useWaveSurferTimelineStandalone({
  containerRef,  // Container reference
  options,       // WaveSurfer options
  timelineOptions: { container: timelineContainer }
})
```

## 🎙️ Audio Recorder

![audio recorder preview](./src/assets/recorder.png)

### useWaveSurferRecorder

```vue
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useWaveSurferRecorder } from '@meersagor/wavesurfer-vue'

const showAudioRecordButton = ref<boolean>(true)
const containerRef = ref<HTMLDivElement | null>(null)

const options = computed(() => ({
    height: 48,
    waveColor: "#66667D",
    progressColor: "#6A24FF",
    barGap: 5,
    barWidth: 5,
    barRadius: 8,
    cursorWidth: 0,
    url: "https://revews-bucket.s3.ap-southeast-1.amazonaws.com/a06mmMU3sgnzuUkH4OiHvyuUgCFdLSnJaDLBao7y.webm",
}))

const { pauseRecording, startRecording, stopRecording, currentTime, isPauseResume } = useWaveSurferRecorder({
    containerRef,
    options: options.value,
    recordPluginOptions:{
        continuousWaveform: true
    }
})

const startAudioRecordHandler = () => {
    startRecording()
    showAudioRecordButton.value = false
}

const stopHandler = async () => {
    const blob = await stopRecording()
    console.log('blob =====', blob);
    showAudioRecordButton.value = true
}
</script>

<template>
    <div>
        <div>
            <div ref="containerRef"></div>
        </div>
        <p>{{ currentTime }}</p>
        <button v-if="showAudioRecordButton" @click="startAudioRecordHandler"> Start Recording </button>
        <div v-else>
            <button @click="pauseRecording">{{ isPauseResume ? 'pause' : 'resume' }}</button>
            <button @click="stopHandler">Stop</button>
        </div>
    </div>
</template>
```

### useWaveSurferRecorder Return Types

| Property | Type | Description |
|----------|------|-------------|
| `waveSurfer` | `Ref<WaveSurfer \| null>` | WaveSurfer instance |
| `waveSurferRecorder` | `Ref<RecordPlugin \| null>` | Record plugin instance |
| `currentTime` | `ComputedRef<string>` | Current recording time in `mm:ss` format |
| `isPaused` | `ComputedRef<boolean \| undefined>` | Whether recording is paused |
| `isRecording` | `ComputedRef<boolean \| undefined>` | Whether recording is in progress |
| `startRecording()` | `() => void` | Start or resume recording |
| `stopRecording()` | `() => Promise<Blob>` | Stop recording and return blob |
| `pauseRecording()` | `() => void` | Pause/resume recording |

## 🏗️ Architecture

### Core Functionality
- **`useWaveSurferInstance`** - WaveSurfer instance management (internal)
- **`useWaveSurferState`** - State management (internal, used by `useWaveSurfer`)
- **`useWaveSurfer`** - Main composable combining instance + state (recommended for users)
- **`useWaveSurferPlugin`** - Base functionality for all plugins (internal)

### Plugin System
- **Individual plugins** - Import only what you need
- **Standalone versions** - Create own WaveSurfer instances
- **Tree-shaking friendly** - Smaller bundle sizes
- **Type-safe** - Full TypeScript support

## 📚 Documentation

- [WaveSurfer.js Documentation](https://wavesurfer.xyz)
- [Plugin Examples](./examples/)
- [Architecture Guide](./NEW_ARCHITECTURE.md)

## 🤝 Contributing

If you have any specific preferences or additional changes you'd like, feel free to submit a PR!

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

