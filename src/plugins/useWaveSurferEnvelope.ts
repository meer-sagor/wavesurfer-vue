import { onMounted } from 'vue'
import EnvelopePlugin from 'wavesurfer.js/dist/plugins/envelope.js'
import type { Ref } from 'vue'
import type WaveSurfer from 'wavesurfer.js'
import type { EnvelopePluginOptions } from 'wavesurfer.js/dist/plugins/envelope'
import { useWaveSurferPlugin, useWaveSurferPluginStandalone } from '../core/useWaveSurferPlugin'

export interface UseWaveSurferEnvelopeOptions {
  waveSurfer: Ref<WaveSurfer | null>
  envelopeOptions?: EnvelopePluginOptions
}

export interface UseWaveSurferEnvelopeStandaloneOptions {
  containerRef: Ref<HTMLElement | null>
  options: any
  envelopeOptions?: EnvelopePluginOptions
}

// Plugin with existing WaveSurfer instance
export const useWaveSurferEnvelope = ({ 
  waveSurfer, 
  envelopeOptions = {} 
}: UseWaveSurferEnvelopeOptions) => {
  const { pluginInstance: envelopePlugin, createPlugin } = useWaveSurferPlugin<EnvelopePlugin>(
    EnvelopePlugin,
    envelopeOptions
  )

  onMounted(() => {
    if (waveSurfer.value) {
      createPlugin(waveSurfer.value)
    }
  })

  return {
    envelopePlugin
  }
}

// Standalone version that creates its own WaveSurfer instance
export const useWaveSurferEnvelopeStandalone = ({ 
  containerRef, 
  options, 
  envelopeOptions = {} 
}: UseWaveSurferEnvelopeStandaloneOptions) => {
  return useWaveSurferPluginStandalone<EnvelopePlugin>(
    EnvelopePlugin,
    { containerRef, options, pluginOptions: envelopeOptions }
  )
}
