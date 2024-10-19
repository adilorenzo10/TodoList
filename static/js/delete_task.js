$(document).ready(function() {
    $(".delete-btn").click(function() {
        var taskId = $(this).data('id');
        var taskElement = $("#task-" + taskId); 
        if (confirm("Sei sicuro di voler rimuovere l'elemento selezionato?")){
            $.ajax({
                url: "/delete/" + taskId,
                type: 'DELETE',
                success: function(response) {
                    if (response.success) {
                        console.log(response);
                        taskElement.remove();
                    }
                },
                error: function(response) {
                    alert("Errore durante l'eliminazione del task.");
                    console.log(response);
                }
            });
        }
    });
});