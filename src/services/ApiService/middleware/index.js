export function bindMiddleware(done) {
  const middleware = composeMiddleware();
  const length = middleware.length;
  const middlewareRunners = new Array(length);

  if (length <= 0) return done;

  for (let i = length - 1; i >= 0; i--) {
    const nested = i < length - 1 ? middlewareRunners[i + 1] : done;

    middlewareRunners[i] = middleware[i].bind(null, nested);
  }

  return middlewareRunners[0];
}

function composeMiddleware() {
  const middleware = [];

  return middleware;
}
