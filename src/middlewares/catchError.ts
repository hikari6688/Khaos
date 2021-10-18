export const catchError = async (ctx: any, next: () => Promise<any>) => {
  try {
    await next();
  } catch (error) {
    if (error.errorCode) {
      return (ctx.body = error.msg);
    }
  }
};
