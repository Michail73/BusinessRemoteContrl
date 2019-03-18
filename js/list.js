$(function()
{
    db.users.count().then(function (c) {
        if (c === 0) {
            $('#is-empty-label').text('Список пуст')
        }
    })

    iterate_users(function(user) {
        $('#user-list').append(
            '<li>' +
            user.name +
            ' @' + user.username +
            ' &lt;' + user.email + '&gt; ' +
            user.position +
            '</li>')
    })
});

