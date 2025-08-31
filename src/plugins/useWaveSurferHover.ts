import { onMounted } from 'vue'
import HoverPlugin from 'wavesurfer.js/dist/plugins/hover.js'
import type { Ref } from 'vue'
import type WaveSurfer from 'wavesurfer.js'
import type { HoverPluginOptions } from 'wavesurfer.js/dist/plugins/hover'
import { useWaveSurferPlugin, useWaveSurferPluginStandalone } from '../core/useWaveSurferPlugin'

export interface UseWaveSurferHoverOptions {
  waveSurfer: Ref<WaveSurfer | null>
  hoverOptions?: HoverPluginOptions
}

export interface UseWaveSurferHoverStandaloneOptions {
  containerRef: Ref<HTMLElement | null>
  options: any
  hoverOptions?: HoverPluginOptions
}

// Plugin with existing WaveSurfer instance
export const useWaveSurferHover = ({ 
  waveSurfer, 
  hoverOptions = {} 
}: UseWaveSurferHoverOptions) => {
  const { pluginInstance: hoverPlugin, createPlugin } = useWaveSurferPlugin<HoverPlugin>(
    HoverPlugin,
    hoverOptions
  )

  onMounted(() => {
    if (waveSurfer.value) {
      createPlugin(waveSurfer.value)
    }
  })

  return {
    hoverPlugin
  }
}

// Standalone version that creates its own WaveSurfer instance
export const useWaveSurferHoverStandalone = ({ 
  containerRef, 
  options, 
  hoverOptions = {} 
}: UseWaveSurferHoverStandaloneOptions) => {
  return useWaveSurferPluginStandalone<HoverPlugin>(
    HoverPlugin,
    { containerRef, options, pluginOptions: hoverOptions }
  )
}
