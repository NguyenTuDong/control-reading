export const state = () => ({
  readingGesture: false,
  scrollSpeed: 50,
  model: null,
  webcam: null,
})

export const mutations = {
  toggleReadingGesture (state, value) {
    state.readingGesture = value
  },
  setScrollSpeed (state, value) {
    state.scrollSpeed = value
  },
  setModel (state, value) {
    state.model = value
  },
  setWebcam (state, value) {
    state.webcam = value
  },
}