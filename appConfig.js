var developmentDatabase = {
    postgres: {
    host: 'localhost',
    port: 5432,
    database: 'ddmdi8nrata9v5',
    user: 'idfovhoyrxfehc',
    password: '4ed8e2e0d73506967fef088fd95fbd6097d1dc287575746dd7a14a758757f897'
    }
    }
    
    var connectionString = "postgres://idfovhoyrxfehc:4ed8e2e0d73506967fef088fd95fbd6097d1dc287575746dd7a14a758757f897@ec2-52-50-171-4.eu-west-1.compute.amazonaws.com:5432/ddmdi8nrata9v5";
    if (process.env.NODE_ENV == 'production') {
    //Production mode
    if (process.env.DATABASE_URL) {
    developmentDatabase =
    parseConnectionString(process.env.DATABASE_URL);
    } else {
    console.log("process.env.DATABASE_URL empty, connectionString.variable used");
    developmentDatabase = parseConnectionString(connectionString);
    }
    }else{
    //Development mode
    developmentDatabase = parseConnectionString(connectionString);
    }
    function parseConnectionString(connectionString) {
    if (connectionString) {
    var myRegexp = /(\w+):(\w+)@(.+):(\w+)\/(\w+)/g;
    var match = myRegexp.exec(connectionString);
    if (match.length == 6) {
    developmentDatabase.postgres.user = match[1];
    developmentDatabase.postgres.password = match[2];
    developmentDatabase.postgres.host = match[3];
    developmentDatabase.postgres.port = Number(match[4]);
    developmentDatabase.postgres.database = match[5];
    developmentDatabase.postgres.ssl = true;
    return developmentDatabase;
    }
    }
    console.log("connectionString cannot be parsed");
    return null;
    }
    module.exports = {
    hostname: "http://localhost",
    port: 5656,
    database: {
    postgres: developmentDatabase.postgres
    }
    }