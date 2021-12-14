export const getCameraMap = async (url, cb, props) => {
  const module = await import('./CameraMap.jsx');
  return module.default;
};

export const getCamera = async (url, cb, props) => {
  const module = await import('./Camera.jsx');
  return module.default;
};

export const getCameras = async (url, cb, props) => {
  const module = await import('./Cameras.jsx');
  return module.default;
};

export const getEvent = async (url, cb, props) => {
  const module = await import('./Event.jsx');
  return module.default;
};

export const getBirdseye = async (url, cb, props) => {
  const module = await import('./Birdseye.jsx');
  return module.default;
};

export async function getEvents(url, cb, props) {
  const module = await import('./Events');
  return module.default;
}

export const getRecording = async (url, cb, props) => {
  const module = await import('./Recording.jsx');
  return module.default;
};

export const getDebug = async (url, cb, props) => {
  const module = await import('./Debug.jsx');
  return module.default;
};

export const getStyleGuide = async (url, cb, props) => {
  const module = await import('./StyleGuide.jsx');
  return module.default;
};
