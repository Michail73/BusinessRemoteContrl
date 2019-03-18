$(function()
{
    db.users.count().then(function (c) {
        if (c === 0) {
            $('#is-empty-label').text('Список пуст')
        }
    })

    iterate_users(function(user) {
        console.log(user)
        $('#user-list').append('<li>' + user.name + ' &lt;' + user.email + '&gt; ' + user.position + '</li>')
    })
});

