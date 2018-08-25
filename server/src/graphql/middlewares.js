const isAuth = (resolver) => async (parent, args, ctx, ...info) => {
  if (!ctx.user) return Promise.reject('Unauthorized.')

  return await resolver(...[parent, args, ctx, ...info])
}

export { isAuth }
