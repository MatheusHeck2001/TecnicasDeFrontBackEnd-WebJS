//função pra adicionar linha na tabela de criação
function addRow(){
    let tr = document.createElement("tr");
    let td = document.createElement("td");

    let name = document.createElement("input");
    name.type = "text";
    name.id = "name";
    name.maxLength = "100";
    name.setAttribute("required","required");
    td.appendChild(name);
    tr.appendChild(td);

    td = document.createElement("td");
    let author = document.createElement("input");
    author.type = "text";
    author.id = "author";
    author.maxLength = "100";
    author.setAttribute("required","required");
    td.appendChild(author);
    tr.appendChild(td);

    td = document.createElement("td");
    let year = document.createElement("input");
    year.type = "text";
    year.id = "year";
    year.maxLength = "4";
    year.setAttribute("required","required");
    td.appendChild(year);
    tr.appendChild(td);

    let opV = document.createElement("option");
    opV.value = "";
    opV.text = " ";
    let opDC = document.createElement("option");
    opDC.value = "DC";
    opDC.text = "D.C.";
    let opAC = document.createElement("option");
    opAC.value = "AC";
    opAC.text = "A.C.";

    td = document.createElement("td");
    let period = document.createElement("select");
    period.id = "period"
    period.add(opV);
    period.add(opDC);
    period.add(opAC);
    period.setAttribute("required","required");

    td.appendChild(period);
    tr.appendChild(td);

    let opVz = document.createElement("option");
    opVz.value = "";
    opVz.text = " ";
    let quadro = document.createElement("option");
    quadro.value = "Quadro";
    quadro.text = "Quadro";
    let escultura = document.createElement("option");
    escultura.value = "Escultura";
    escultura.text = "Escultura";
    let outro = document.createElement("option");
    outro.value = "Outro";
    outro.text = "Outro";

    td = document.createElement("td");
    let type = document.createElement("select");
    type.id = "type"
    type.add(opVz);
    type.add(quadro);
    type.add(escultura);
    type.add(outro);
    type.setAttribute("required","required");

    td.appendChild(type);
    tr.appendChild(td);

    td = document.createElement("td");
    let detail = document.createElement("input");
    detail.type = "text";
    detail.id = "detail";
    detail.maxLength = "2000";

    td.appendChild(detail);
    tr.appendChild(td);

    td = document.createElement("td");
    let exc = document.createElement("input");
    exc.type = "button";
    exc.value = "Excluir"
    exc.onclick = deleteRow;
    td.appendChild(exc);
    tr.appendChild(td);

    let table = document.getElementById("tBody");
    table.appendChild(tr);

    console.log("Row added!");
}

//função pra confirmar o delete de uma linha
function confirmDelete(){
    let confirmation;
    confirmation = window.confirm("Deseja mesmo excluir essa linha?");
    console.log("Confirm line delete: " + confirmation);
    return confirmation;
}

//função para deletar uma linha
function deleteRow(){
    if(confirmDelete() === true){
        let td=this.parentElement;
    let tr=td.parentElement;
    let index=tr.rowIndex;
    let tBody=tr.parentElement;
    let table=tBody.parentElement;
    table.deleteRow(index);
    }
}

//função para validar o tamanho do nome da obra
function validateObra(nameObra){
    if(nameObra.length < 6){
        window.alert("O nome da obra deve conter ao menos 6 caracteres.");
        return -1;
    }
    return 0;
}

//função para validar o tamanho do nome do autor
function validateAuthorName(authorName){
    if(authorName.length < 10){
        window.alert("O nome do autor deve conter ao menos 10 caracteres.");
        return -1;
    }
    return 0;
}

//função para validar o ano da obra - menor que o ano atual
function validateYear(year){
    let now = new Date;
    if(isNaN(year)){
        window.alert("O ano deve ser escrito com números.");
        return -1;
    }
    if(year > now.getFullYear()){
        window.alert("O ano da obra deve ser menor do que o ano atual.");
        return -1;
    }
    return 0;
}

//função para validar o cadastro no geral
function validateCadastro(){
    let tableBody = document.getElementById("tBody");
    let rows = tableBody.rows.length;
    
    let confirmation = true;

    //erro caso a tabela esteja vazia
    if(rows === 0){
        window.alert("Tabela vazia.")
    }

    //se existir ao menos 1 linha
    if (rows > 0){

        let text;

        let ul = document.createElement("ul");
        let li = document.createElement("li");
        li.id = "id";
        ul.className="list";

        let list = document.getElementById("list");
        
        for(let i = 0; i < rows; i++){


            while (ul.firstChild) {
                ul.removeChild(ul.firstChild);
            }
            
            list.appendChild(ul); 

            //reseta o estilo de todos os campos para o default
            tableBody.rows[i].cells[0].className="";
            tableBody.rows[i].cells[1].className="";
            tableBody.rows[i].cells[2].className="";
            tableBody.rows[i].cells[3].className="";
            tableBody.rows[i].cells[4].className="";

            confirmation = true;

            //validações de todos os campos para não permitir passar um valor inválido de acordo com as regras de negócio

            //validação do campo NOME
            if(tableBody.rows[i].cells[0].children.name.value == ""){
                while (tableBody.rows[i].cells[0].children.name.value == ""){
                    tableBody.rows[i].cells[0].children.name.value = window.prompt("Preencha o campo NOME DA OBRA da linha " + (i+1));
                }
                tableBody.rows[i].cells[0].className="required";
                confirmation = false;
                text = document.createTextNode("Erro no campo NOME: campo vazio. Linha: " + (i+1));
                li.appendChild(text);
                ul.appendChild(li);
            
            }
            //criação do texto para a lista de erros
            let obraName = tableBody.rows[i].cells[0].children.name.value;
            if(validateObra(obraName) === -1){
                confirmation = false;
                text = document.createTextNode("Erro no campo NOME: nome com menos de 6 caracteres. Linha: " + (i+1));
                li = document.createElement("li");
                li.appendChild(text);
                ul.appendChild(li);
                tableBody.rows[i].cells[0].className="required";
            }

            //validação do campo AUTOR
            if(tableBody.rows[i].cells[1].children.author.value == ""){
                while (tableBody.rows[i].cells[1].children.author.value == ""){
                    tableBody.rows[i].cells[1].children.author.value = window.prompt("Preencha o campo AUTOR da linha " + (i+1));
                }
                tableBody.rows[i].cells[1].className="required";
                confirmation = false;
                text = document.createTextNode("Erro no campo NOME DO AUTOR: campo vazio. Linha: " + (i+1));
                li = document.createElement("li");
                li.appendChild(text);
                ul.appendChild(li);

            }
            //criação do texto para a lista de erros
            let authorName = tableBody.rows[i].cells[1].children.author.value;
            if(validateAuthorName(authorName) === -1){
                confirmation = false;
                text = document.createTextNode("Erro no campo NOME DO AUTOR: nome do autor com menos de 10 caracteres. Linha: " + (i+1));
                li = document.createElement("li");
                li.appendChild(text);
                ul.appendChild(li);
                tableBody.rows[i].cells[1].className="required";
            }
            
            //validação do campo ANO
            if(tableBody.rows[i].cells[2].children.year.value == ""){
                while (tableBody.rows[i].cells[2].children.year.value == ""){
                    tableBody.rows[i].cells[2].children.year.value = window.prompt("Digite um valor válido para o ano (AAAA) na linha " + (i+1));
                }
                tableBody.rows[i].cells[2].className="required";
                confirmation = false;
                text = document.createTextNode("Erro no campo ANO DA OBRA: campo vazio. Linha: " + (i+1));
                li = document.createElement("li");
                li.appendChild(text);
                ul.appendChild(li);

            }            
            //criação do texto para a lista de erros
            let year = tableBody.rows[i].cells[2].children.year.value;
            if(validateYear(year) === -1){
                tableBody.rows[i].cells[2].className="required";
                confirmation = false;
                text = document.createTextNode("Erro no campo ANO DA OBRA: valor não aceitável. Linha: " + (i+1));
                li = document.createElement("li");
                li.appendChild(text);
                ul.appendChild(li);
            }

            //validação do campo PERIODO e criação do texto para a lista de erros
            if(tableBody.rows[i].cells[3].children.period.value == ""){
                window.alert("Selecione uma PERÍODO DA OBRA na linha " + (i+1));     
                tableBody.rows[i].cells[3].className="required";
                confirmation = false;
                text = document.createTextNode("Erro no campo PERÍODO DA OBRA: campo vazio. Linha: " + (i+1));
                li = document.createElement("li");
                li.appendChild(text);
                ul.appendChild(li);
   
            }
            
            //validação do campo TIPO e criação do texto para a lista de erros
            if(tableBody.rows[i].cells[4].children.type.value == ""){
                window.alert("Selecione uma TIPO na linha " + (i+1));  
                tableBody.rows[i].cells[4].className="required";
                confirmation = false;
                text = document.createTextNode("Erro no campo TIPO: campo vazio. Linha: " + (i+1));
                li = document.createElement("li");
                li.appendChild(text);
                ul.appendChild(li);
      
            }

            console.log(ul);
            //document.write(ul);
            list.appendChild(ul);             
            
        }

        let next;

        if(confirmation === true){
            next = window.confirm("Dados enviados com sucesso! Atualizar tabela de validação?");

        }

        if(next === true){
            registerConcluded();
        }
        console.log(next);

        
    }
}

//Função para mostrar a tabela de validação
function registerConcluded(){

    let tableBody = document.getElementById("tBody");
    let rows = tableBody.rows.length;
    
    for(let i = 0; i < rows; i++){
        addRowToSecondTable(i);
    }
  
}

//função para adicionar dinamicamente as linhas na tabela de validação
function addRowToSecondTable(index){
    let tr = document.createElement("tr");
    let td = document.createElement("td");

    let tableBody = document.getElementById("tBody");

    let table = document.getElementById("tBodyTwo");

    let description = tableBody.rows[index].cells[5].children.detail.value;

    td = document.createElement("td");
    let name = document.createTextNode(tableBody.rows[index].cells[0].children.name.value);
    td.appendChild(name);
    tr.appendChild(td);

    //função lambda usada para mostrar a descrição da obra quando é clicada na linha
    td.onclick = function(){
        window.alert("Descrição da obra: " + description);
    }
    
    td = document.createElement("td");
    let author = document.createTextNode(tableBody.rows[index].cells[1].children.author.value);
    td.appendChild(author);
    tr.appendChild(td);
    
    //função lambda
    td.onclick = function(){
        window.alert("Descrição da obra: " + description);
    }

    td = document.createElement("td");
    let year = document.createTextNode(tableBody.rows[index].cells[2].children.year.value);
    td.appendChild(year);
    tr.appendChild(td);

    //função lambda
    td.onclick = function(){
        window.alert("Descrição da obra: " + description);
    }

    td = document.createElement("td");
    let period = document.createTextNode(tableBody.rows[index].cells[3].children.period.value);
    td.appendChild(period);
    tr.appendChild(td);   

    //função lambda 
    td.onclick = function(){
        window.alert("Descrição da obra: " + description);
    }

    td = document.createElement("td");
    let type = document.createTextNode(tableBody.rows[index].cells[4].children.type.value);
    td.appendChild(type);
    tr.appendChild(td);

    //função lambda
    td.onclick = function(){
        window.alert("Descrição da obra: " + description);
    }

    //criação do botão para excluir uma linha da tabela
    td = document.createElement("td");
    let exc = document.createElement("input");
    exc.type = "button";
    exc.value = "Excluir"
    exc.onclick = deleteRow;
    td.appendChild(exc);
    tr.appendChild(td);

    table = document.getElementById("tBodyTwo");
    table.appendChild(tr);
}


