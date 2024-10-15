const { stopConnecting } = require('../content');

global.chrome = {
    runtime: {
        onInstalled: {
            addListener: jest.fn(),
        },
    },
};

describe('Chrome Extension Background Script', () => {
    it('should log a message when the extension is installed', () => {
        console.log = jest.fn();
        require('../background'); 
        chrome.runtime.onInstalled.addListener.mock.calls[0][0]();
        expect(console.log).toHaveBeenCalledWith("LinkedIn Auto Connector installed");
    });
});