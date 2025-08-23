<template>
  <div>
    <h2>WaveSurfer with Multiple Plugins</h2>
    
    <!-- Main WaveSurfer container -->
    <div ref="containerRef"></div>
    
    <!-- Timeline plugin container -->
    <div ref="timelineContainerRef"></div>
    
    <!-- Minimap plugin container -->
    <div ref="minimapContainerRef"></div>
    
    <!-- Controls -->
    <div class="controls">
      <button @click="waveSurfer?.playPause()">
        {{ isPlaying ? 'Pause' : 'Play' }}
      </button>
      <button @click="zoomIn">Zoom In</button>
      <button @click="zoomOut">Zoom Out</button>
      <button @click="setZoom(50)">Set Zoom 50px/s</button>
    </div>
    
    <div class="info">
      <p>Current Time: {{ formatTime(currentTime) }}</p>
      <p>Duration: {{ formatTime(totalDuration) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  useWaveSurfer,
  useWaveSurferTimeline,
  useWaveSurferZoom,
  useWaveSurferMinimap,
  useWaveSurferHover
} from '@meersagor/wavesurfer-vue'

// Container refs
const containerRef = ref<HTMLElement | null>(null)
const timelineContainerRef = ref<HTMLElement | null>(null)
const minimapContainerRef = ref<HTMLElement | null>(null)

// WaveSurfer options
const options = ref({
  height: 100,
  waveColor: '#4F4A85',
  progressColor: '#383351',
  barGap: 2,
  barWidth: 3,
  barRadius: 3,
  url: 'https://wavesurfer-js.org/example/media/demo.wav'
})

// Core WaveSurfer composable
const { waveSurfer, isReady, totalDuration, isPlaying, currentTime } = useWaveSurfer({
  containerRef,
  options: options.value
})

// Timeline plugin
const { timelinePlugin } = useWaveSurferTimeline({
  waveSurfer,
  timelineOptions: {
    container: timelineContainerRef
  }
})

// Zoom plugin
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

// Hover plugin
const { hoverPlugin } = useWaveSurferHover({
  waveSurfer,
  hoverOptions: {
    lineColor: '#ff0000',
    lineWidth: 2
  }
})

// Utility function
const formatTime = (seconds: number): string => {
  return [Math.floor(seconds / 60), Math.floor(seconds % 60)]
    .map(v => v < 10 ? '0' + v : v)
    .join(':')
}
</script>

<style scoped>
.controls {
  margin: 20px 0;
  display: flex;
  gap: 10px;
}

.controls button {
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #f5f5f5;
  cursor: pointer;
}

.controls button:hover {
  background: #e5e5e5;
}

.info {
  margin-top: 20px;
  font-family: monospace;
}
</style>
