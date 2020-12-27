export const loadImage = (url) => {
  try {
    const image = require(`../assets${url}`).default;
    return image;
  } catch (e) {
    if (e instanceof Error && e.code === 'MODULE_NOT_FOUND') {
      return url;
    } else {
      throw e;
    }
  }
};
