const chrome = {
    runtime: {
      onMessage: {
        addListener: jest.fn(),
        removeListener: jest.fn(),
      },
      sendMessage: jest.fn(),
    },
    tabs: {
      query: jest.fn((queryInfo, callback) => {
        // Mock the active tab response
        callback([{ id: 1 }]);
      }),
    },
    scripting: {
      executeScript: jest.fn(),
    },
  };
  
  global.chrome = chrome;
  