export default function performContainerStaticMethod(renderProps, store, url) {
  const params = renderProps.query;
  const components = renderProps.components;

  return Promise.all(components
    .filter((component) => typeof component.WrappedComponent === 'function'
      && typeof component.WrappedComponent.fetchData === 'function')
    .map((component) => component.WrappedComponent.fetchData({ params, store, url })));
}
