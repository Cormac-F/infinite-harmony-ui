var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
var chai = require('chai'); 
const expect = chai.expect;
const jobService = require('../../../service/jobService');

describe('jobService', function () {
    describe('getJobs', function () {
        it('getJobs should throw exception when 500 error returned from axios', async () => {
            var mock = new MockAdapter(axios);
        
            mock.onGet(jobService.URL + 1).reply(500);
        
            var error;
        
            try {
              await jobService.getJobs(1)
            } catch (e) {
              var error = e.message
            }
        
            expect(error).to.equal('Request failed with status code 500')
          })
    })
})

