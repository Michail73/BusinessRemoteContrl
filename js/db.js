var err_callback = function(error)
{
    alert("Database error: " + error);
}

var db = new Dexie("mimiru_database");

db.version(1).stores({
    users: 'name, email, position'
});

db.users.clear();

var add_user = function(name, email, position, success_callback)
{
    db.users.put({ name: name, email: email, position: position }).then(success_callback).catch(err_callback);
};

var iterate_users = function(success_callback)
{
    db.users.each(success_callback).catch(err_callback);
};

$(function()
{
    $("form").submit(function(event) {
        event.preventDefault();

        add_user($('#inputFIO').val(), $('#inputEmail').val(), $('#inputPos').val(), function() {})

        iterate_users(function(user) {
            console.log(user)
        })
    });
});

