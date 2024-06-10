const exibeTarefas = () => {
    const tabela = document.getElementById('idTabelaTarefas');
    const tbody = tabela.querySelector('tbody'); 

    tbody.innerHTML = 
        `<tr>
        <th>DATA</th>
        <th>NOME</th>
        <th>STATUS</th>
        <th>EDITAR</th>
        <th>EXCLUIR</th>
    </tr>`;

    
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    tarefas.forEach((tarefa, index) => {
        let newDate = new Date(tarefa.dataTarefa);
            let datePtBr = new Intl.DateTimeFormat('pt-BR',{
        dateStyle: 'short',
        timeZone: 'UTC',
    });

    let dataTarefa = datePtBr.format(newDate);

        const conteudoTarefa = 
            `<tr>
                <td>${dataTarefa}</td>
                <td>${tarefa.nomeTarefa}</td>
                <td>${tarefa.status}</td>
                <td><button class="btnEditar" onclick="editaTarefa(${index})"><i class="fa fa-edit"></i></button></td>
                <td><button class="btnExcluir" onclick="deletaTarefa(${index})"><i class="fa fa-trash"></i></button></td>
            </tr>`;

        const row = tbody.insertRow();
        row.innerHTML = conteudoTarefa;
    });

}

const addTarefa = (event) => {
    event.preventDefault();
    let form = document.getElementById('formTarefa');
    let nomeTarefa = document.getElementById('nomeTarefa').value.trim();
    let status = document.getElementById('statusTarefa').value;
    let dataTarefa = document.getElementById('dataTarefa').value.trim();
    let camposVazios = [];

    nomeTarefa == "" ? camposVazios.push("Nome da Tarefa") : '';

    status == "" ? camposVazios.push("Status da Tarefa") : '';
    
    dataTarefa == "" ? camposVazios.push("Data da Tarefa") : "";  

    if(nomeTarefa == "" || status == "" || dataTarefa == ""){
        alert("Por favor, preencha todos os campos! " + camposVazios);
    }else {
        const tarefa = {
            nomeTarefa: nomeTarefa,
            status: status,
            dataTarefa: dataTarefa
        }
        
        let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
        
        tarefas.push(tarefa); 
        localStorage.setItem('tarefas', JSON.stringify(tarefas));

        form.reset();
        exibeTarefas();
    }


}

const deletaTarefa = (index) => {
    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas.splice(index, 1);

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    exibeTarefas();

    
}

const editaTarefa = (index) => {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    const tarefa = tarefas[index];

    document.getElementById('nomeTarefa').value = tarefa.nomeTarefa;
    document.getElementById('statusTarefa').value = tarefa.status;
    document.getElementById('dataTarefa').value = tarefa.dataTarefa;

    const atualizaTarefa = (event) => {
        event.preventDefault();

        tarefa.nomeTarefa = document.getElementById('nomeTarefa').value.trim();
        tarefa.status = document.getElementById('statusTarefa').value.trim();
        tarefa.dataTarefa = document.getElementById('dataTarefa').value.trim();

        upTarefa = JSON.stringify(tarefas)

        localStorage.setItem('tarefas', upTarefa);

        document.getElementById('formTarefa').reset();
        document.querySelector('.enviarTarefa').removeEventListener('click', atualizaTarefa);
        document.querySelector('.enviarTarefa').addEventListener('click', addTarefa);
        exibeTarefas();

    }

    document.querySelector('.enviarTarefa').removeEventListener('click', addTarefa);
    document.querySelector('.enviarTarefa').addEventListener('click', atualizaTarefa);

    
}

const init = () => {
    document.querySelector('.enviarTarefa').addEventListener('click', addTarefa);
    

    exibeTarefas();
}

init(); 