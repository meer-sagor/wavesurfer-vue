# WaveSurfer.js Plugins for Vue 3

This package now supports individual WaveSurfer.js plugins as Vue 3 composables, allowing you to use only the plugins you need for better tree-shaking and performance.

## Available Plugins

### Core Plugins
- **Timeline** - Adds a timeline display
- **Zoom** - Provides zoom functionality
- **Minimap** - Shows a minimap overview
- **Hover** - Adds hover effects
- **Envelope** - Audio envelope visualization
- **Spectrogram** - Frequency spectrum visualization
- **Regions** - Audio region management

## Usage

### Import Individual Plugins

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { 
  useWaveSurfer,
  useWaveSurferTimeline,
  useWaveSurferZoom,
  useWaveSurferMinimap
} from '@meersagor/wavesurfer-vue'

// Container refs
const containerRef = ref<HTMLElement | null>(null)
const timelineContainerRef = ref<HTMLElement | null>(null)
const minimapContainerRef = ref<HTMLElement | null>(null)

// Core WaveSurfer
const { waveSurfer, isReady, totalDuration, isPlaying, currentTime } = useWaveSurfer({
  containerRef,
  options: {
    height: 100,
    waveColor: '#4F4A85',
    progressColor: '#383351',
    url: 'path/to/audio.mp3'
  }
})

// Timeline plugin
const { timelinePlugin } = useWaveSurferTimeline({
  waveSurfer,
  timelineOptions: {
    container: timelineContainerRef,
    formatTimeCallback: (seconds) => `${Math.floor(seconds)}s`,
    primaryLabelInterval: 1,
    secondaryLabelInterval: 0.2
  }
})

// Zoom plugin with methods
const { zoomPlugin, zoomIn, zoomOut, setZoom } = useWaveSurferZoom({
  waveSurfer,
  zoomOptions: {
    minPxPerSec: 50,
    scrollParent: true
  }
})

// Minimap plugin
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
      <button @click="setZoom(100)">Set Zoom</button>
    </div>
  </div>
</template>
```

### Plugin-Specific Imports

You can also import plugins individually for better tree-shaking:

```typescript
// Import only what you need
import { useWaveSurferZoom } from '@meersagor/wavesurfer-vue/plugins'
```

## Plugin Options

Each plugin accepts its own configuration options:

### Timeline Plugin
```typescript
const { timelinePlugin } = useWaveSurferTimeline({
  waveSurfer,
  timelineOptions: {
    container: timelineContainerRef,
    formatTimeCallback: (seconds) => `${Math.floor(seconds)}s`,
    primaryLabelInterval: 1,
    secondaryLabelInterval: 0.2
  }
})
```

### Zoom Plugin
```typescript
const { zoomPlugin, zoomIn, zoomOut, setZoom } = useWaveSurferZoom({
  waveSurfer,
  zoomOptions: {
    minPxPerSec: 50,
    maxPxPerSec: 500,
    scrollParent: true
  }
})
```

### Minimap Plugin
```typescript
const { minimapPlugin } = useWaveSurferMinimap({
  waveSurfer,
  minimapOptions: {
    container: minimapContainerRef,
    height: 50,
    waveColor: '#4F4A85',
    progressColor: '#383351'
  }
})
```

### Hover Plugin
```typescript
const { hoverPlugin } = useWaveSurferHover({
  waveSurfer,
  hoverOptions: {
    lineColor: '#ff0000',
    lineWidth: 2,
    labelBackground: '#ff0000',
    labelColor: '#ffffff'
  }
})
```

## Benefits

1. **Tree-shaking**: Only import the plugins you need
2. **Better performance**: Smaller bundle sizes
3. **Flexibility**: Mix and match plugins as needed
4. **Type safety**: Full TypeScript support for all plugin options
5. **Vue 3 native**: Built with Vue 3 Composition API

## Migration from v1.0.0

If you're upgrading from the previous version, you can still use the core functionality:

```typescript
// Still works - core functionality
import { WaveSurferPlayer, useWaveSurfer } from '@meersagor/wavesurfer-vue'

// New - individual plugins
import { useWaveSurferTimeline, useWaveSurferZoom } from '@meersagor/wavesurfer-vue'
```

## TypeScript Support

All plugins include full TypeScript support with proper type definitions:

```typescript
import type { 
  TimelinePluginOptions,
  ZoomPluginOptions,
  MinimapPluginOptions 
} from '@meersagor/wavesurfer-vue'
```
