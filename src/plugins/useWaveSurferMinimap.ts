import { onMounted } from 'vue'
import MinimapPlugin from 'wavesurfer.js/dist/plugins/minimap.js'
import type { Ref } from 'vue'
import type WaveSurfer from 'wavesurfer.js'
import type { MinimapPluginOptions } from 'wavesurfer.js/dist/plugins/minimap'
import { useWaveSurferPlugin, useWaveSurferPluginStandalone } from '../core/useWaveSurferPlugin'

export interface UseWaveSurferMinimapOptions {
  waveSurfer: Ref<WaveSurfer | null>
  minimapOptions?: MinimapPluginOptions
}

export interface UseWaveSurferMinimapStandaloneOptions {
  containerRef: Ref<HTMLElement | null>
  options: any
  minimapOptions?: MinimapPluginOptions
}

// Plugin with existing WaveSurfer instance
export const useWaveSurferMinimap = ({ 
  waveSurfer, 
  minimapOptions = {} 
}: UseWaveSurferMinimapOptions) => {
  const { pluginInstance: minimapPlugin, createPlugin } = useWaveSurferPlugin<MinimapPlugin>(
    MinimapPlugin,
    minimapOptions
  )

  onMounted(() => {
    if (waveSurfer.value) {
      createPlugin(waveSurfer.value)
    }
  })

  return {
    minimapPlugin
  }
}

// Standalone version that creates its own WaveSurfer instance
export const useWaveSurferMinimapStandalone = ({ 
  containerRef, 
  options, 
  minimapOptions = {} 
}: UseWaveSurferMinimapStandaloneOptions) => {
  return useWaveSurferPluginStandalone<MinimapPlugin>(
    MinimapPlugin,
    { containerRef, options, pluginOptions: minimapOptions }
  )
}
