module.exports = (header, value) => {
  const args = {
    req: {
      headers: {},
    },
  };
  args.req.headers[header] = value;
  return args;
};
