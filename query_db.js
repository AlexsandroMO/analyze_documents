

var msg = document.getElementById('text-p');
msg.innerHTML = '';

document.getElementById("text-p").style.display = "none";

function query_bt(){

    db.transaction(function(tx) {

        tx.executeSql("SELECT rai FROM rai WHERE status like ? and disc == ?", ['%Em Delineamento%', 'INTEGRATION EQUIPMENT'], function (tx, resultado){

            var rows = resultado.rows; 

            for (a=0;a<rows.length;a++){

                x = rows[a].rai

                query_like(x)
            }
        }); 
    }, null);

}

var lista = [];

function query_like(x){
    
    db.transaction(function(tx) {
        tx.executeSql("SELECT * FROM cc_rai WHERE ncr_rai like ?", ['%' + x + '%'], function (tx, resultado){
            var rows = resultado.rows; 
            
            for (a=0;a<rows.length;a++){
                msg.innerHTML += `${rows[a].cc} | ${x} | ${rows[a].status} \n`;
                lista.push(addDiscionario(rows[a].cc, x, rows[a].status));
                jQuery( '#xlx_json' ).val(msg.innerText);
            }

            newTableGroup(lista)
    
        }); 
    }, null);

}

function newTableGroup(lista){

    droptable()

    db.transaction(function(tx) {

        tx.executeSql("CREATE TABLE IF NOT EXISTS group_rai (id INTEGER PRIMARY KEY, rai TEXT, status TEXT)");
    });

    
    for (let i=0;i<lista.length;i++){

        db.transaction(function(tx) {
            tx.executeSql('INSERT INTO group_rai (rai, status) VALUES (?, ?)', [lista[i][0].rai,lista[i][0].status]);
        });

    }

}

var lista_ex = [];
function groupBy(){
    db.transaction(function(tx) {
        //console.log('dentro groupby');

        tx.executeSql("select rai from(\
                SELECT rai, count(status) quantidade FROM group_rai group by rai\
                ) a where quantidade = 1", [], function (tx, resultado){

            var rows = resultado.rows;

            //console.log('teste: : ', rows);

            msg.innerHTML += 'Lista de RAIS Liberadas:\n\n'

            for (a=0;a<rows.length;a++){
                
                msg.innerHTML += `${rows[a].rai}\n`;
                jQuery( '#xlx_json' ).val(msg.innerText);   
            }

    }); 

    }, null);

}


function addDiscionario(var_cc, var_rai, var_status){
    var Lista = [];
    Lista.unshift({cc: var_cc, rai: var_rai, status: var_status});
  
    return Lista
}


function droptable(){
    
    db.transaction(function(tx) {
        console.log('itens Analisados');//verificação

        tx.executeSql("DROP TABLE group_rai", [], function (tx, resultado){
        }); 
    }, null);
   
}


function bt2(var_cc, var_rai, var_status){

    db.transaction(function(tx) {
        //console.log('dentro bt2');

        tx.executeSql("SELECT * FROM group_rai", [], function (tx, resultado){
            var rows = resultado.rows; 
            //console.log('---------',rows);

        }); 
    }, null);

    groupBy()
}



function clear(){
    //console.log('clear');
  
    db.transaction(function(tx) {
  
      tx.executeSql("DROP TABLE group_rai", [], function (tx, resultado){
      }); 
    }, null); 
}
