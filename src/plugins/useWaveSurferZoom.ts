import { onMounted } from 'vue'
import ZoomPlugin from 'wavesurfer.js/dist/plugins/zoom.js'
import type { Ref } from 'vue'
import type WaveSurfer from 'wavesurfer.js'
import type { ZoomPluginOptions } from 'wavesurfer.js/dist/plugins/zoom'
import { useWaveSurferPlugin, useWaveSurferPluginStandalone } from '../core/useWaveSurferPlugin'

export interface UseWaveSurferZoomOptions {
  waveSurfer: Ref<WaveSurfer | null>
  zoomOptions?: ZoomPluginOptions
}

export interface UseWaveSurferZoomStandaloneOptions {
  containerRef: Ref<HTMLElement | null>
  options: any
  zoomOptions?: ZoomPluginOptions
}

// Plugin with existing WaveSurfer instance
export const useWaveSurferZoom = ({ 
  waveSurfer, 
  zoomOptions = {} 
}: UseWaveSurferZoomOptions) => {
  const { pluginInstance: zoomPlugin, createPlugin } = useWaveSurferPlugin<ZoomPlugin>(
    ZoomPlugin,
    zoomOptions
  )

  const zoomIn = () => {
    if (waveSurfer.value) {
      waveSurfer.value.zoom(100)
    }
  }

  const zoomOut = () => {
    if (waveSurfer.value) {
      waveSurfer.value.zoom(50)
    }
  }

  const setZoom = (minPxPerSec: number) => {
    if (waveSurfer.value) {
      waveSurfer.value.zoom(minPxPerSec)
    }
  }

  onMounted(() => {
    if (waveSurfer.value) {
      createPlugin(waveSurfer.value)
    }
  })

  return {
    zoomPlugin,
    zoomIn,
    zoomOut,
    setZoom
  }
}

// Standalone version that creates its own WaveSurfer instance
export const useWaveSurferZoomStandalone = ({ 
  containerRef, 
  options, 
  zoomOptions = {} 
}: UseWaveSurferZoomStandaloneOptions) => {
  const { waveSurfer, pluginInstance: zoomPlugin } = useWaveSurferPluginStandalone<ZoomPlugin>(
    ZoomPlugin,
    { containerRef, options, pluginOptions: zoomOptions }
  )

  const zoomIn = () => {
    if (waveSurfer.value) {
      waveSurfer.value.zoom(100)
    }
  }

  const zoomOut = () => {
    if (waveSurfer.value) {
      waveSurfer.value.zoom(50)
    }
  }

  const setZoom = (minPxPerSec: number) => {
    if (waveSurfer.value) {
      waveSurfer.value.zoom(minPxPerSec)
    }
  }

  return {
    waveSurfer,
    zoomPlugin,
    zoomIn,
    zoomOut,
    setZoom
  }
}
