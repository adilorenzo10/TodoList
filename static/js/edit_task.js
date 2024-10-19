$(document).ready(function() {

    $(".edit-btn").click(function() {
        console.log("Pulsante edit cliccato");

        // Trova il li più vicino
        var listItem = $(this).closest("li");

        // Nascondi i campi di visualizzazione
        var spanNome = listItem.find("span.nome-todo");
        var spanCategoria = listItem.find("span.etichetta-categoria");

        spanNome.addClass("hidden");
        spanCategoria.addClass("hidden");

        // Mostra i campi di input per la modifica
        var inputNome = listItem.find("input.nome-todo-input");
        var selectCategoria = listItem.find("select.categoria-select");

        inputNome.removeClass("hidden");
        selectCategoria.removeClass("hidden");

        // Mostra il pulsante Salva e nascondi Modifica
        listItem.find(".edit-btn").addClass("hidden");
        listItem.find(".save-btn").removeClass("hidden");

    });


    $(".save-btn").click(function() {
        console.log("Pulsante edit cliccato");

        // Ottieni l'ID del task associato al pulsante e trova il li più vicino
        var taskId = $(this).data('id');
        var listItem = $(this).closest("li");

        // Campi span
        var spanNome = listItem.find("span.nome-todo");
        var spanCategoria = listItem.find("span.etichetta-categoria");

        // Campi modifica
        var inputNome = listItem.find("input.nome-todo-input");
        var selectCategoria = listItem.find("select.categoria-select");

        $.ajax({
            url: "/edit/" + taskId,
            type: 'POST',
            data: {
                'nome': inputNome.val(),
                'categoria': selectCategoria.val()
            },
            success: function(response) {
                if (response.success) {
                    //console.log(response);
                    console.log("listItem categoria id PRIMA: ");
                    console.log(listItem.attr("data-categoria-id"));                    

                     // Mostra i campi di visualizzazione
                    spanNome.removeClass("hidden").text(inputNome.val());
                    var labelCategoria = selectCategoria.find("option:selected").text();
                    var idCategoria = selectCategoria.find("option:selected").val();
                    console.log("Idcategoria da cambiare: " + idCategoria);
                    spanCategoria.removeClass("hidden").text(labelCategoria).attr("data-id", idCategoria);
                    listItem.attr("data-categoria-id", idCategoria);
                    console.log("listItem categoria id DOPO: ");
                    console.log(listItem.attr("data-categoria-id"));    

                    // Nascondi i campi di input per la modifica
                    inputNome.addClass("hidden");
                    selectCategoria.addClass("hidden");

                    // Nascondi il pulsante salva
                    listItem.find(".edit-btn").removeClass("hidden");
                    listItem.find(".save-btn").addClass("hidden");
                }
            },
            error: function(response) {
                alert("Errore durante la modifica del task.");
                console.log(response);
            }
        });
    });
});
