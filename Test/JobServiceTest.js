const supertest = require('supertest');
const express = require('express');
const app = express(); 


describe('Express App', () => {

    it('should render list-jobs template on GET /job-roles', async () => {
        const response = await supertest(app)
            .get('/job-roles')
      
    });
});
