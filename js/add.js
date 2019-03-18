$(function()
{
    $("form").submit(function(event) {
        event.preventDefault();

        add_user($('#inputFIO').val(), $('#inputEmail').val(), $('#inputPos').val(), function() {})
    });
});

