const swaggerAutogen = require('swagger-autogen')();

const dev = {
    info: {
        title: 'To-Do App',
        description: 'Individual Project 2'
    },
    host: 'localhost:3000',
    schemes: ['http']
};

const public = {
    info: {
        title: 'To-Do App',
        description: 'Individual Project 2'
    },
    host: 'project2-i6kb.onrender.com',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

//this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, dev);