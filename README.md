Steps to Run the project:

1. Clone the project using (git clone https://github.com/rajwantprajapati/sms-challange.git)
2. Go to the project folder (sms-challange)
2. Run "npm install" to install required dependencies
3. Run "mongod" to start mongodb service
3. Run "npm run start:server" to connect to Database and listen to request
4. To dump the data list into the database do a "POST" request from Postman with URL "http://localhost:3000/sms_all" (without any payload).
    This will read the data from "backend\db\default_data.js" from the project file and insert into the database
5. Run "ng serve -o" command. This will open the browser and serve the page. (http://localhost:4200/)
