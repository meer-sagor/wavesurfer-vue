# @meersagor/wavesurfer-vue

## 2.0.1

### 🐛 Bug Fixes

- **Fixed Missing Recorder Exports**: Resolved the critical issue where `useWaveSurferRecorder` and `useWaveSurferRecorderStandalone` could not be imported from the package despite being present in the codebase. The exports are now properly included in the build output.
- **Added Missing Type Export**: Added `RecordPluginOptions` type export for better TypeScript support with the recorder plugin.

#### What was fixed:
- `export { useWaveSurferRecorder }` - Now properly exported from `@meersagor/wavesurfer-vue/plugins`
- `export { useWaveSurferRecorderStandalone }` - Now properly exported from `@meersagor/wavesurfer-vue/plugins`
- `export type { RecordPluginOptions }` - Type definitions now available for recorder options

#### Impact:
This fix resolves the issue reported 2 months ago where users could not import the recorder composables despite the documentation showing they were available. Users can now successfully use:

```typescript
import { useWaveSurferRecorder, useWaveSurferRecorderStandalone } from '@meersagor/wavesurfer-vue/plugins'
```

## 2.0.0

### 🚀 Major Release - Modular Plugin Architecture

This is a major release that completely restructures the package to provide a modular, tree-shaking friendly architecture with individual plugin support.

#### ✨ New Features

- **🧩 Modular Plugin Architecture**: Complete rewrite to support individual plugin imports
- **📦 Tree-shaking Support**: Import only the plugins you need for smaller bundle sizes
- **🔄 Multiple Usage Patterns**: 
  - Core + Individual Plugins (recommended)
  - Standalone Plugins (creates own WaveSurfer instances)
  - Core Functionality Only
  - Legacy Component Usage (backward compatible)
- **🎯 Individual Plugin Composables**: Each plugin now has its own composable
- **⚡ Vue 3 Composition API**: Modern Vue 3 patterns throughout

#### 🧩 New Plugin Composables

- `useWaveSurferTimeline` - Timeline display functionality
- `useWaveSurferZoom` - Zoom functionality with methods (`zoomIn`, `zoomOut`, `setZoom`)
- `useWaveSurferMinimap` - Minimap overview
- `useWaveSurferHover` - Hover effects
- `useWaveSurferEnvelope` - Audio envelope visualization
- `useWaveSurferSpectrogram` - Frequency spectrum visualization
- `useWaveSurferRegions` - Audio region management
- `useWaveSurferRecorder` - Audio recording functionality (enhanced)

#### 🔧 Enhanced Features

- **TypeScript Support**: Full type safety for all plugin options
- **Plugin Options**: Each plugin accepts its own configuration options
- **Standalone Versions**: Each plugin has a standalone version that creates its own WaveSurfer instance
- **Better Performance**: Smaller bundle sizes through tree-shaking
- **Flexible Architecture**: Mix and match plugins as needed

#### 📚 New Import Patterns

```typescript
// Pattern 1: Core + Individual Plugins (Recommended)
import { 
  useWaveSurfer,
  useWaveSurferTimeline,
  useWaveSurferZoom,
  useWaveSurferMinimap
} from '@meersagor/wavesurfer-vue'

// Pattern 2: Standalone Plugins
import { 
  useWaveSurferTimelineStandalone,
  useWaveSurferZoomStandalone
} from '@meersagor/wavesurfer-vue'

// Pattern 3: Core Functionality Only
import { useWaveSurfer } from '@meersagor/wavesurfer-vue'

// Pattern 4: Legacy Component (still supported)
import { WaveSurferPlayer } from '@meersagor/wavesurfer-vue'
```

#### 🎙️ Enhanced Recorder Plugin

- **Improved API**: Better return types and methods
- **Continuous Waveform**: Support for continuous waveform during recording
- **Pause/Resume**: Enhanced pause and resume functionality
- **Blob Return**: Returns audio blob after recording

#### 🔄 Backward Compatibility

- Legacy `WaveSurferPlayer` component still works
- Existing `useWaveSurfer` composable maintains API compatibility
- Gradual migration path available

#### 📖 Documentation

- **Comprehensive README**: Multiple usage patterns and examples
- **Plugin-specific Documentation**: Detailed plugin options and usage
- **TypeScript Examples**: Full type-safe examples
- **Migration Guide**: Help for upgrading from v1.0.0

#### 🏗️ Architecture Improvements

- **Core Functionality**: Separated from plugins for better modularity
- **Plugin System**: Individual plugins with standalone versions
- **State Management**: Improved state management with Vue 3 Composition API
- **Event Handling**: Better event handling and reactivity

#### 🎯 Benefits

1. **Tree-shaking**: Only import the plugins you need
2. **Better Performance**: Smaller bundle sizes
3. **Flexibility**: Mix and match plugins as needed
4. **Type Safety**: Full TypeScript support for all plugin options
5. **Vue 3 Native**: Built with Vue 3 Composition API
6. **Maintainable**: Modular architecture for easier maintenance

## 1.0.0

- update package home page url

## 0.1.2

### Patch Changes

- 7430c40: Recorder Plugin Options support

## 0.1.1

### Patch Changes

- 8254f71: upgrade pack & resolve typescript type error

## 0.1.0

### Minor Changes

- f72cdf6: upgrade type definition

## 0.0.5

### Patch Changes

- 73485fb: can't find useUseWaveSurferRecorder & update docs

## 0.0.4

### Patch Changes

- update dependency package and license name
