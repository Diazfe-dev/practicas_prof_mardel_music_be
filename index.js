import connection from './src/database/mysql.db.js';

import app from './src/app.js';

const boostrap = async () => {
  connection.connect()
    .then(() => console.log('Connected to database'))
    .catch(error => console.log(error));

  app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')}`);
  });
};

boostrap();
