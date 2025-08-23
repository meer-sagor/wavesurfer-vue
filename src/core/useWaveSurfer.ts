import type { Ref } from 'vue'
import type WaveSurfer from 'wavesurfer.js'
import type { UseWaveSurfer, WaveSurferIns } from '../types'
import { useWaveSurferInstance } from './useWaveSurferInstance'
import { useWaveSurferState } from './useWaveSurferState'

export const useWaveSurfer = ({containerRef, options}:WaveSurferIns): UseWaveSurfer =>{
  const {waveSurfer} = useWaveSurferInstance({containerRef, options})
  const {isReady, totalDuration, isPlaying, currentTime} = useWaveSurferState(waveSurfer as Ref<WaveSurfer>)
  return {
    waveSurfer,
    isReady, 
    totalDuration, 
    isPlaying, 
    currentTime
  }
}
