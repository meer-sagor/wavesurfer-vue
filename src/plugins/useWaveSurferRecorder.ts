import {computed, onMounted, ref} from "vue";
import RecordPlugin from "wavesurfer.js/dist/plugins/record.js"
import type { Ref } from "vue";
import type WaveSurfer from "wavesurfer.js";
import type { RecordPluginOptions } from "wavesurfer.js/dist/plugins/record";
import { useWaveSurferPlugin, useWaveSurferPluginStandalone } from '../core/useWaveSurferPlugin'

export interface UseWaveSurferRecorderOptions {
  waveSurfer: Ref<WaveSurfer | null>
  recordPluginOptions?: RecordPluginOptions
}

export interface UseWaveSurferRecorderStandaloneOptions {
  containerRef: Ref<HTMLElement | null>
  options: any
  recordPluginOptions?: RecordPluginOptions
}

// Shared recording logic
const createRecordingLogic = (waveSurferRecorder: Ref<any>) => {
    const recordingTime = ref<number>(0)
    const isRecording = ref<boolean>(false)
    const isPaused = ref<boolean>(false)

    const currentTime = computed<string>(() => {
        // time will be in milliseconds, convert it to mm:ss format
        return [
            Math.floor((recordingTime.value % 3600000) / 60000), // minutes
            Math.floor((recordingTime.value % 60000) / 1000), // seconds
        ]
            .map((v) => (v < 10 ? "0" + v : v))
            .join(":")
    })
    const isPauseResume = computed<boolean>(() => isRecording.value || !isPaused.value)
    

    const recordProcessStart = () => {
        if (waveSurferRecorder.value) {
            waveSurferRecorder.value?.on("record-progress", (time: number) => {
                recordingTime.value = time
            })
        }
    }

    const startRecording = () => {
        if (waveSurferRecorder.value?.isRecording() || waveSurferRecorder.value?.isPaused()) {
            waveSurferRecorder.value?.stopRecording()
            isRecording.value = false
            isPaused.value = true
            return
        }
        waveSurferRecorder.value?.startRecording()
        isRecording.value = true
        isPaused.value = false
        recordProcessStart()
    }
    const stopRecording = (): Promise<Blob> => {
        return new Promise((resolve) => {
            let blob: Blob
            if (waveSurferRecorder.value?.isRecording() || waveSurferRecorder.value?.isPaused()) {
                waveSurferRecorder.value?.stopRecording()
                isRecording.value = false
                isPaused.value = false
            }
            waveSurferRecorder.value?.on("record-end", (b: Blob) => {
                blob = b
                resolve(blob)
            })
        })
    }

    const pauseRecording = () => {
        if (waveSurferRecorder.value?.isPaused()) {
            waveSurferRecorder.value?.resumeRecording()
            isRecording.value = true
            isPaused.value = false
            return
        }
        isRecording.value = false
        isPaused.value = true
        waveSurferRecorder.value?.pauseRecording()
    }

    return {
        currentTime,
        startRecording,
        stopRecording,
        pauseRecording,
        isRecording,
        isPaused,
        isPauseResume,
    }
}

// Plugin with existing WaveSurfer instance
export const useWaveSurferRecorder = ({ 
    waveSurfer, 
    recordPluginOptions = {} 
}: UseWaveSurferRecorderOptions) => {
    const { pluginInstance: waveSurferRecorder, createPlugin } = useWaveSurferPlugin<RecordPlugin>(
        RecordPlugin,
        {
            renderRecordedAudio: false,
            ...recordPluginOptions
        }
    )

    const recordingLogic = createRecordingLogic(waveSurferRecorder)

    onMounted(() => {
        if (waveSurfer.value) {
            createPlugin(waveSurfer.value)
        }
    })

    return {
        waveSurferRecorder,
        ...recordingLogic,
    }
}

// Standalone version that creates its own WaveSurfer instance
export const useWaveSurferRecorderStandalone = ({ 
    containerRef, 
    options, 
    recordPluginOptions = {} 
}: UseWaveSurferRecorderStandaloneOptions) => {
    const { waveSurfer, pluginInstance: waveSurferRecorder } = useWaveSurferPluginStandalone<RecordPlugin>(
        RecordPlugin,
        { 
            containerRef, 
            options, 
            pluginOptions: {
                renderRecordedAudio: false,
                ...recordPluginOptions
            }
        }
    )

    const recordingLogic = createRecordingLogic(waveSurferRecorder)

    return {
        waveSurfer,
        waveSurferRecorder,
        ...recordingLogic,
    }
}
