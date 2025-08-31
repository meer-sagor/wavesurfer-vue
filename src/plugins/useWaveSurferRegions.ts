import { onMounted } from 'vue'
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.js'
import type { Ref } from 'vue'
import type WaveSurfer from 'wavesurfer.js'
import { useWaveSurferPlugin, useWaveSurferPluginStandalone } from '../core/useWaveSurferPlugin'

export interface UseWaveSurferRegionsOptions {
  waveSurfer: Ref<WaveSurfer | null>
  regionsOptions?: any
}

export interface UseWaveSurferRegionsStandaloneOptions {
  containerRef: Ref<HTMLElement | null>
  options: any
  regionsOptions?: any
}

// Plugin with existing WaveSurfer instance
export const useWaveSurferRegions = ({ 
  waveSurfer, 
  regionsOptions = {} 
}: UseWaveSurferRegionsOptions) => {
  const { pluginInstance: regionsPlugin, createPlugin } = useWaveSurferPlugin<RegionsPlugin>(
    RegionsPlugin,
    regionsOptions
  )

  onMounted(() => {
    if (waveSurfer.value) {
      createPlugin(waveSurfer.value)
    }
  })

  return {
    regionsPlugin
  }
}

// Standalone version that creates its own WaveSurfer instance
export const useWaveSurferRegionsStandalone = ({ 
  containerRef, 
  options, 
  regionsOptions = {} 
}: UseWaveSurferRegionsStandaloneOptions) => {
  return useWaveSurferPluginStandalone<RegionsPlugin>(
    RegionsPlugin,
    { containerRef, options, pluginOptions: regionsOptions }
  )
}
