var err_callback = function()
{
    alert("Ошибка в базе данных");
}

var db = openDatabase("mimiru_data", "1.0", "Data for mimiru", 32678);

db.transaction(function(tx)
{
    alert("transaction")

    tx.executeSql("CREATE TABLE IF NOT EXISTS mimiru_data (" +
        "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
        "name TEXT NOT NULL, " +
        "email TEXT NOT NULL, " +
        "position TEXT NOT NULL, " +
        ");");
});

var add_user = function(name, email, position, success_callback)
{
    alert("add_user")

    db.transaction(function(tx) {
        tx.executeSql(("INSERT INTO mimiru_data (name, email, position) VALUES (?, ?, ?);"),
            [name, email, position],
            function(tx, results) {
                success_callback(results);
            },
            err_callback);
    });
};

var get_users = function(success_callback)
{
    alert("get_users")

    db.transaction(function(tx) {
        tx.executeSql(("SELECT * FROM mimiru_data"),
            [],
            function(tx, results) {
                success_callback(results);
            },
            err_callback);
    });
};

$(function()
{
    alert("doc ready")

    var form = $("form");

    var update_page = function(results) {
        var list = $("#user-list");
        list.empty();
        console.dir(results);
        if (results.rows.length == 0) {
            alert("empty list");
        } else {
            $.each(results.rows, function(row_index) {
                var row = results.rows.item(row_index);
                list.append("<li>" + row.name + ", " + row.email + ", " + row.position + "</li>");
            });
        }
    };

    // Override the default form submit
    form.submit(function(event) {
        event.preventDefault();
        add_user($('#inputFIO').val(), $('#inputEmail').val(), $('#inputPos').val(),
            function() {
                alert("data saved");
            })
    });

    $('#show-me').click(function(){ get_users($('#where').val(), update_page); });
});

/*
var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
var msg;
db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)');
    tx.executeSql('INSERT INTO LOGS (id, log) VALUES (1, "foobar")');
    tx.executeSql('INSERT INTO LOGS (id, log) VALUES (2, "logmsg")');
    msg = '<p>Log message created and row inserted.</p>';
    document.querySelector('#status').innerHTML =  msg;
});

db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM LOGS', [], function (tx, results) {
        var len = results.rows.length, i;
        msg = "<p>Found rows: " + len + "</p>";
        document.querySelector('#status').innerHTML +=  msg;
        for (i = 0; i < len; i++){
            msg = "<p><b>" + results.rows.item(i).log + "</b></p>";
            document.querySelector('#status').innerHTML +=  msg;
        }
    }, null);
});
*/

