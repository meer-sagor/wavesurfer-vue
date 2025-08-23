import { onMounted } from 'vue'
import SpectrogramPlugin from 'wavesurfer.js/dist/plugins/spectrogram.js'
import type { Ref } from 'vue'
import type WaveSurfer from 'wavesurfer.js'
import type { SpectrogramPluginOptions } from 'wavesurfer.js/dist/plugins/spectrogram'
import { useWaveSurferPlugin, useWaveSurferPluginStandalone } from '../core/useWaveSurferPlugin'

export interface UseWaveSurferSpectrogramOptions {
  waveSurfer: Ref<WaveSurfer | null>
  spectrogramOptions?: SpectrogramPluginOptions
}

export interface UseWaveSurferSpectrogramStandaloneOptions {
  containerRef: Ref<HTMLElement | null>
  options: any
  spectrogramOptions?: SpectrogramPluginOptions
}

// Plugin with existing WaveSurfer instance
export const useWaveSurferSpectrogram = ({ 
  waveSurfer, 
  spectrogramOptions = {} 
}: UseWaveSurferSpectrogramOptions) => {
  const { pluginInstance: spectrogramPlugin, createPlugin } = useWaveSurferPlugin<SpectrogramPlugin>(
    SpectrogramPlugin,
    spectrogramOptions
  )

  onMounted(() => {
    if (waveSurfer.value) {
      createPlugin(waveSurfer.value)
    }
  })

  return {
    spectrogramPlugin
  }
}

// Standalone version that creates its own WaveSurfer instance
export const useWaveSurferSpectrogramStandalone = ({ 
  containerRef, 
  options, 
  spectrogramOptions = {} 
}: UseWaveSurferSpectrogramStandaloneOptions) => {
  return useWaveSurferPluginStandalone<SpectrogramPlugin>(
    SpectrogramPlugin,
    { containerRef, options, pluginOptions: spectrogramOptions }
  )
}
