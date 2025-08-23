<template>
  <div>
    <h2>New Architecture Example</h2>
    
    <!-- Method 1: Using core + individual plugins -->
    <div class="section">
      <h3>Method 1: Core + Individual Plugins</h3>
      <div ref="containerRef1"></div>
      <div ref="timelineContainerRef1"></div>
      <div ref="minimapContainerRef1"></div>
      
      <div class="controls">
        <button @click="waveSurfer1?.playPause()">
          {{ isPlaying1 ? 'Pause' : 'Play' }}
        </button>
        <button @click="zoomIn1">Zoom In</button>
        <button @click="zoomOut1">Zoom Out</button>
      </div>
    </div>

    <!-- Method 2: Using standalone plugins -->
    <div class="section">
      <h3>Method 2: Standalone Plugins</h3>
      <div ref="containerRef2"></div>
      <div ref="timelineContainerRef2"></div>
      
      <div class="controls">
        <button @click="waveSurfer2?.playPause()">
          {{ isPlaying2 ? 'Pause' : 'Play' }}
        </button>
        <button @click="zoomIn2">Zoom In</button>
        <button @click="zoomOut2">Zoom Out</button>
      </div>
    </div>

    <!-- Method 3: Using core functionality directly -->
    <div class="section">
      <h3>Method 3: Core Functionality Only</h3>
      <div ref="containerRef3"></div>
      
      <div class="controls">
        <button @click="waveSurfer3?.playPause()">
          {{ isPlaying3 ? 'Pause' : 'Play' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Method 1: Core + Individual Plugins
import { 
  useWaveSurfer,
  useWaveSurferTimeline,
  useWaveSurferZoom,
  useWaveSurferMinimap
} from '@meersagor/wavesurfer-vue'

// Method 2: Standalone Plugins
import { 
  useWaveSurferTimelineStandalone,
  useWaveSurferZoomStandalone
} from '@meersagor/wavesurfer-vue'

// Method 3: Core Only
import { useWaveSurfer } from '@meersagor/wavesurfer-vue'

// ===== METHOD 1: Core + Individual Plugins =====
const containerRef1 = ref<HTMLElement | null>(null)
const timelineContainerRef1 = ref<HTMLElement | null>(null)
const minimapContainerRef1 = ref<HTMLElement | null>(null)

const options1 = ref({
  height: 100,
  waveColor: '#4F4A85',
  progressColor: '#383351',
  barGap: 2,
  barWidth: 3,
  barRadius: 3,
  url: 'https://wavesurfer-js.org/example/media/demo.wav'
})

// Core WaveSurfer
const { waveSurfer: waveSurfer1, isReady: isReady1, totalDuration: totalDuration1, isPlaying: isPlaying1, currentTime: currentTime1 } = useWaveSurfer({
  containerRef: containerRef1,
  options: options1.value
})

// Individual plugins
const { timelinePlugin: timelinePlugin1 } = useWaveSurferTimeline({
  waveSurfer: waveSurfer1,
  timelineOptions: {
    container: timelineContainerRef1
  }
})

const { zoomPlugin: zoomPlugin1, zoomIn: zoomIn1, zoomOut: zoomOut1 } = useWaveSurferZoom({
  waveSurfer: waveSurfer1,
  zoomOptions: {
    minPxPerSec: 50,
    scrollParent: true
  }
})

const { minimapPlugin: minimapPlugin1 } = useWaveSurferMinimap({
  waveSurfer: waveSurfer1,
  minimapOptions: {
    container: minimapContainerRef1,
    height: 50
  }
})

// ===== METHOD 2: Standalone Plugins =====
const containerRef2 = ref<HTMLElement | null>(null)
const timelineContainerRef2 = ref<HTMLElement | null>(null)

const options2 = ref({
  height: 80,
  waveColor: '#FF6B6B',
  progressColor: '#4ECDC4',
  barGap: 1,
  barWidth: 2,
  barRadius: 2,
  url: 'https://wavesurfer-js.org/example/media/demo.wav'
})

// Standalone timeline plugin (creates its own WaveSurfer instance)
const { waveSurfer: waveSurfer2, timelinePlugin: timelinePlugin2 } = useWaveSurferTimelineStandalone({
  containerRef: containerRef2,
  options: options2.value,
  timelineOptions: {
    container: timelineContainerRef2
  }
})

// Standalone zoom plugin (creates its own WaveSurfer instance)
const { waveSurfer: waveSurfer2Zoom, zoomPlugin: zoomPlugin2, zoomIn: zoomIn2, zoomOut: zoomOut2 } = useWaveSurferZoomStandalone({
  containerRef: containerRef2,
  options: options2.value,
  zoomOptions: {
    minPxPerSec: 30,
    scrollParent: true
  }
})

// Computed for Method 2 state
const isPlaying2 = computed(() => waveSurfer2.value?.isPlaying() || false)

// ===== METHOD 3: Core Functionality Only =====
const containerRef3 = ref<HTMLElement | null>(null)

const options3 = ref({
  height: 60,
  waveColor: '#95E1D3',
  progressColor: '#F38181',
  barGap: 3,
  barWidth: 4,
  barRadius: 4,
  url: 'https://wavesurfer-js.org/example/media/demo.wav'
})

// Using core functionality - returns waveSurfer instance and all state
const { waveSurfer: waveSurfer3, isReady: isReady3, totalDuration: totalDuration3, isPlaying: isPlaying3, currentTime: currentTime3 } = useWaveSurfer({
  containerRef: containerRef3,
  options: options3.value
})
</script>

<style scoped>
.section {
  margin: 30px 0;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.section h3 {
  margin-top: 0;
  color: #333;
}

.controls {
  margin: 15px 0;
  display: flex;
  gap: 10px;
}

.controls button {
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #f5f5f5;
  cursor: pointer;
  font-size: 14px;
}

.controls button:hover {
  background: #e5e5e5;
}

.controls button:active {
  background: #d5d5d5;
}
</style>
