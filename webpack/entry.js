require('dotenv').config();
require('../src/main')
require('../src/renderer')

if(module.hot) {
  module.hot.accept();
}