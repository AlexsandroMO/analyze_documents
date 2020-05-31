 

//console.log()

document.getElementById('upload').addEventListener('change', handleFileSelect, false);
document.getElementById('upload2').addEventListener('change', handleFileSelect2, false);
document.getElementById('banco-click').addEventListener('click', droptableAll, false);

var msg = document.getElementById('text-p')

var db = openDatabase('myDB', '2.0', 'Mybase', 2 * 1024 * 1024);

document.getElementById("progress-cc_rai").style.display = "none";
document.getElementById("progress-rai").style.display = "none";


var ExcelToJSON1 = function() {

    this.parseExcel = function(file) {
      var reader = new FileReader();

      reader.onload = function(e) {
        var data = e.target.result;

        var workbook = XLSX.read(data, {
          type: 'binary'
          
        });
        
        workbook.SheetNames.forEach(function(sheetName) {
            // Here is your object
            var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            var json_object = JSON.stringify(XL_row_object);
            var status = document.getElementById('status');

            //jQuery( '#xlx_json1' ).val( json_object );
            var objeto = JSON.parse(json_object);

            console.log(objeto);

                db.transaction(function(tx) {

                    tx.executeSql("CREATE TABLE IF NOT EXISTS cc_rai (id INTEGER PRIMARY KEY, cc TEXT, ncr_rai TEXT, status TEXT)");

                });

            for (let i=0;i<objeto.length;i++){
                
                db.transaction(function(tx) {
                    
                    tx.executeSql('INSERT INTO cc_rai (cc,ncr_rai,status) VALUES (?, ?, ?)', [objeto[i].CC,objeto[i].NCR_RAI,objeto[i].STATUS]);
                    console.log('======', i);
                    msg.innerHTML = 'Itens Carregados: ' + i;
                    document.getElementById("text-p").style.display = "block";
                    document.getElementById("progress-cc_rai").style.display = "block";
                });

                console.log('foi!!!!');
                //status.innerHTML = 'Carga Realizada!';
                document.getElementById("progress-rai").style.display = "none";
                msg.innerHTML = '';
                
            }

          })
          

      };

      reader.onerror = function(ex) {
        console.log(ex);
      };

      reader.readAsBinaryString(file);
    };
};

//=================================


var ExcelToJSON2 = function() {

    this.parseExcel = function(file) {
      var reader = new FileReader();

      reader.onload = function(e) {
        var data = e.target.result;

        var workbook = XLSX.read(data, {
          type: 'binary'
          
        });
        
        workbook.SheetNames.forEach(function(sheetName) {
            // Here is your object
            var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            var json_object = JSON.stringify(XL_row_object);
            var status = document.getElementById('status2');

            var objeto = JSON.parse(json_object);

            console.log(objeto);

                db.transaction(function(tx) {

                    tx.executeSql("CREATE TABLE IF NOT EXISTS rai (id INTEGER PRIMARY KEY, rai TEXT, disc TEXT, status TEXT)");

                });
                console.log('Ciou o banco');
                
            for (let i=0;i<objeto.length;i++){
  
              db.transaction(function(tx) {
                  tx.executeSql('INSERT INTO rai (rai, disc, status) VALUES (?, ?, ?)', [objeto[i].RAI,objeto[i].DISCIPLINA,objeto[i].STATUS]);
                  console.log('======', i);
                  msg.innerHTML = 'Itens Carregados: ' + i;
                  document.getElementById("text-p").style.display = "block";
                  document.getElementById("progress-rai").style.display = "block";
                  
              }); 

                  console.log('foi!!!!');
                  document.getElementById("progress-rai").style.display = "none";
                  msg.innerHTML = '';
            }

          })
      };

      reader.onerror = function(ex) {
        console.log(ex);
      };

      reader.readAsBinaryString(file);
    };
};

//===============================

function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    var xl2json = new ExcelToJSON1();
    xl2json.parseExcel(files[0]);
    console.log('Entrou na RAI')
    //document.getElementById("progress-cc_rai").style.display = "block";
}

function handleFileSelect2(evt) {
    var files2 = evt.target.files; // FileList object
    var xl2json = new ExcelToJSON2();
    xl2json.parseExcel(files2[0]);
    console.log('Entrou no CC')
    //document.getElementById("progress-rai").style.display = "block";
}

//ocultar();

function ocultar(evt) {
  document.getElementById("progress-cc_rai").style.display = "none";
}

function mostrar(evt) {
  document.getElementById("progress-cc_rai").style.display = "block";
}


function droptableAll(evt){
    
  console.log('dropall');
  db.transaction(function(tx) {
      
    tx.executeSql("DROP TABLE cc_rai", [], function (tx, resultado){
      }); 
    }, null);

  db.transaction(function(tx) {

    tx.executeSql("DROP TABLE rai", [], function (tx, resultado){
    }); 
    }, null);

  db.transaction(function(tx) {

    tx.executeSql("DROP TABLE group_rai", [], function (tx, resultado){
    }); 
    }, null);
 
}
