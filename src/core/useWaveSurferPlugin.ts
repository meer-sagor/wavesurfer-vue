import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'
import type WaveSurfer from 'wavesurfer.js'
import { useWaveSurferInstance } from './useWaveSurferInstance'

export interface BasePluginOptions {
  containerRef: Ref<HTMLElement | null>
  options: any
}

export interface PluginWithInstanceOptions {
  waveSurfer: Ref<WaveSurfer | null>
}

export const useWaveSurferPlugin = <T>(
  pluginCreator: any,
  pluginOptions: any = {}
) => {
  const pluginInstance = ref<T | null>(null)

  const createPlugin = (waveSurfer: WaveSurfer) => {
    if (waveSurfer) {
      const instance = waveSurfer.registerPlugin(
        pluginCreator.create({
          ...pluginOptions
        })
      )
      if (instance) {
        pluginInstance.value = instance
      }
    }
  }

  return {
    pluginInstance,
    createPlugin
  }
}

// Standalone plugin composable that creates its own WaveSurfer instance
export const useWaveSurferPluginStandalone = <T>(
  pluginCreator: any,
  { containerRef, options, pluginOptions = {} }: BasePluginOptions & { pluginOptions?: any }
) => {
  const { waveSurfer } = useWaveSurferInstance({ containerRef, options })
  const pluginInstance = ref<T | null>(null)

  onMounted(() => {
    if (waveSurfer.value) {
      const instance = waveSurfer.value.registerPlugin(
        pluginCreator.create({
          ...pluginOptions
        })
      )
      if (instance) {
        pluginInstance.value = instance
      }
    }
  })

  return {
    waveSurfer,
    pluginInstance
  }
}
