$(function()
{
    $("#add-button").on("click", function() {
        add_user(
            $('#inputFIO').val(),
            $('#inputEmail').val(),
            $('#inputPos').val(),
            $('#inputUsername').val(),
            function() {})
    });
});

