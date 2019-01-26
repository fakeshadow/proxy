#### install mongodb;

#### run with admin auth:
>
>mongo -u admin -p password --authenticationDatabase=admin
>
>In the mongo command line create a new database and an authenticated user for it like:
>
>use psprices
>db.createUser( { user: "psprices", pwd: "psprices", roles: [ { role: "readWrite", db: "psprices" }, { >role: "clusterMonitor", db: "admin" } ] } )

###api endpoint:

#### GET /fetch    
>
>get all deals now (Beware throttle and better to add more timeout yourself)

#### GET /prices/region/:id
>
>get all deals in that region

#### GET /prices/platforms/:id
>
>get all deals on that platform