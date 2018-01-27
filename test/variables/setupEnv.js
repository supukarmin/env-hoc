module.exports = (options) => {
  if (options.mockConsoleWarn) {
    global.console = {
      warn: jest.fn(),
    };
  }
  const emptyEnv = {
    userAgent: null,
    cookies: {},
    ipAddress: null,
    language: null,
    languages: null,
  };
  if (options.data === 'with') {
    document.cookie = 'testProp=testValue';
    document.cookie = 'leet=1337';
    return {
      userAgent: global.navigator.userAgent,
      cookies: {
        testProp: 'testValue',
        leet: '1337',
      },
      ipAddress: options.ipAddress ? options.ipAddress : null,
      language: global.navigator.language,
      languages: global.navigator.languages,
    };
  } else if (options.data === 'without') {
    return emptyEnv;
  } else if (options.data === 'missing') {
    Object.defineProperty(global.navigator, 'userAgent', { value: undefined });
    Object.defineProperty(global.navigator, 'language', { value: undefined });
    Object.defineProperty(global.navigator, 'languages', { value: undefined });
    Object.defineProperty(global.document, 'cookie', { value: undefined });
    return emptyEnv;
  }
};
