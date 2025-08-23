import { onMounted } from 'vue'
import TimelinePlugin from 'wavesurfer.js/dist/plugins/timeline.js'
import type { Ref } from 'vue'
import type WaveSurfer from 'wavesurfer.js'
import type { TimelinePluginOptions } from 'wavesurfer.js/dist/plugins/timeline'
import { useWaveSurferPlugin, useWaveSurferPluginStandalone } from '../core/useWaveSurferPlugin'

export interface UseWaveSurferTimelineOptions {
  waveSurfer: Ref<WaveSurfer | null>
  timelineOptions?: TimelinePluginOptions
}

export interface UseWaveSurferTimelineStandaloneOptions {
  containerRef: Ref<HTMLElement | null>
  options: any
  timelineOptions?: TimelinePluginOptions
}

// Plugin with existing WaveSurfer instance
export const useWaveSurferTimeline = ({ 
  waveSurfer, 
  timelineOptions = {} 
}: UseWaveSurferTimelineOptions) => {
  const { pluginInstance: timelinePlugin, createPlugin } = useWaveSurferPlugin<TimelinePlugin>(
    TimelinePlugin,
    timelineOptions
  )

  onMounted(() => {
    if (waveSurfer.value) {
      createPlugin(waveSurfer.value)
    }
  })

  return {
    timelinePlugin
  }
}

// Standalone version that creates its own WaveSurfer instance
export const useWaveSurferTimelineStandalone = ({ 
  containerRef, 
  options, 
  timelineOptions = {} 
}: UseWaveSurferTimelineStandaloneOptions) => {
  return useWaveSurferPluginStandalone<TimelinePlugin>(
    TimelinePlugin,
    { containerRef, options, pluginOptions: timelineOptions }
  )
}
