var err_callback = function(error)
{
    alert("Database error: " + error);
}

var db = new Dexie("mimiru_database");

db.version(1).stores({
    users: 'name, email, position, username'
});

var add_user = function(name, email, position, username, success_callback)
{
    db.users.put({
        name: name,
        email: email,
        position: position,
        username: username
    }).then(success_callback).catch(err_callback);
};

var iterate_users = function(success_callback)
{
    db.users.each(success_callback).catch(err_callback);
};

