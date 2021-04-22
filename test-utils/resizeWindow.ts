export const resizeWindow = (width: number, height: number): void => {
  /* eslint-disable */
  // @ts-ignore
  window.innerWidth = width;
  // @ts-ignore
  window.innerHeight = height;
  /* eslint-enable */
  window.dispatchEvent(new Event("resize"));
};
