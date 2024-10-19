$(document).ready(function() {
    $(".categoria-scelta").click(function() {
        // Rimuovi la classe "selezionata" da tutte le altre categorie
        $(".categoria-scelta").removeClass("selezionata");
        
        // Aggiungi la classe "selezionata" alla categoria cliccata
        $(this).addClass("selezionata");

        // Ottieni l'ID della categoria selezionata
        var categoriaId = $(this).data('id');
        console.log("Categoria: " + categoriaId);

        // Chiama la funzione per mostrare i task corrispondenti
        mostraTaskCategoriaSelezionata(categoriaId);
    });

    function mostraTaskCategoriaSelezionata(categoriaId) {
        // Itera attraverso ogni elemento <li> con classe "task"
        $("li.task").each(function() {
            if (categoriaId != 0){
                // Ottieni l'ID della categoria associata al task
                var taskCategoriaId = $(this).data('categoria-id');

                // Se l'ID della categoria del task corrisponde a quello selezionato, mostra il task, altrimenti nascondilo
                if (categoriaId == taskCategoriaId) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            }else{
                $(this).show();
            }
        });
    }
});
