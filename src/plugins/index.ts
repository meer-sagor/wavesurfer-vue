// Plugin composables (with existing WaveSurfer instance)
export { useWaveSurferTimeline } from './useWaveSurferTimeline'
export { useWaveSurferZoom } from './useWaveSurferZoom'
export { useWaveSurferMinimap } from './useWaveSurferMinimap'
export { useWaveSurferEnvelope } from './useWaveSurferEnvelope'
export { useWaveSurferSpectrogram } from './useWaveSurferSpectrogram'
export { useWaveSurferHover } from './useWaveSurferHover'
export { useWaveSurferRegions } from './useWaveSurferRegions'

// Standalone plugin composables (creates own WaveSurfer instance)
export { useWaveSurferTimelineStandalone } from './useWaveSurferTimeline'
export { useWaveSurferZoomStandalone } from './useWaveSurferZoom'
export { useWaveSurferMinimapStandalone } from './useWaveSurferMinimap'
export { useWaveSurferEnvelopeStandalone } from './useWaveSurferEnvelope'
export { useWaveSurferSpectrogramStandalone } from './useWaveSurferSpectrogram'
export { useWaveSurferHoverStandalone } from './useWaveSurferHover'
export { useWaveSurferRegionsStandalone } from './useWaveSurferRegions'

// Plugin types
export type { TimelinePluginOptions } from 'wavesurfer.js/dist/plugins/timeline'
export type { ZoomPluginOptions } from 'wavesurfer.js/dist/plugins/zoom'
export type { MinimapPluginOptions } from 'wavesurfer.js/dist/plugins/minimap'
export type { EnvelopePluginOptions } from 'wavesurfer.js/dist/plugins/envelope'
export type { SpectrogramPluginOptions } from 'wavesurfer.js/dist/plugins/spectrogram'
export type { HoverPluginOptions } from 'wavesurfer.js/dist/plugins/hover'
