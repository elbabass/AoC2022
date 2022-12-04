require('approvals').mocha()

describe('When running some tests', () => {
    it('should be able to use Approvals', function () {
        let value = 'HELLO WORLD'
        this.verify(value)
    });
});
