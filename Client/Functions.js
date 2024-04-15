var cds;
var  codA = 0;
var cod = [];

function dfDt(dt1, dt2) {
      let df = dt1.getTime() - dt2.getTime();
      let ds = df / (1000 * 60 * 60 * 24);
      ds = Math.floor(ds);
      return ds;
}

function adDs(dt, nd) {
      let ms = dt.getTime() + (nd * 24 * 60 * 60 * 1000);
      let dt1 = new Date(ms);
      let dt2 = sDt(dt1);
      return dt2;
}

function sDt(dt) {
      let y = dt.getFullYear(), m =  + dt.getMonth() + 1, d = dt.getDate();
      let fd = y + "/" + m + "/" + d;
      return fd;
}

function fRound(val, dec) {
      let valFd = Number(val), dc = Number(dec);
      valFd = valFd.toFixed(dc);
      return valFd;
}


//






async function swClasses() {  
      await fetch("http://localhost:8822/Cls", {
            method: "POST", headers: { "Content-Type": "application/json" }
      })
      .then(response => response.json())
      .then(result => {
            if (1 <= result.length)
            {
                  var ul1 = document.getElementById("uls1");
                  for (let i = 0; i < result.length; i++) {
                        var op = document.createElement("option");
                        op.value = result[i].CodeA; 
                        op.text = result[i].Name;
                        ul1.add(op);          
                  }
            }
      })
      .catch((error) => {
            document.getElementById("msg").value = error;
      });
}

async function swNames(val) {

      codA = val;
      document.getElementById("snm").value = "";
      document.getElementById("ads").value = "";
      await fetch("http://localhost:8822/Nms", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify( { cls : val } )
      })
      .then(response => response.json())
      .then(result => {
            
            if(result.length >= 1) {
                        cds = [];
                        var table = document.getElementById('tbl');
                        const tableData = 
                        result.map(value => {
                        cds.push(value.Code);
                              return (
                              `<tr onclick="swAdr(this)">
                                    <td>${value.Name}</td>   
                               </tr>`      
                        );
                        }).join('');
                        
                        table.innerHTML = tableData;
                  }
      })
      .catch((error) => {
            document.getElementById("msg").value = error;
      });
}

function swAdr(obj) {
      document.getElementById("msg").value = "";
      // alert(obj.innerText);
      cod = cds[obj.rowIndex];
      fetch("http://localhost:8822/Fnd", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify( { cd : cod, cdA : codA } )
      })
      .then(response => response.json())
      .then(result => {
            if (1 <= result.length)
            {
                  document.getElementById("snm").value = result[0].Name;
                  document.getElementById("ads").value = result[0].Address;
                  // alert(result[0].Address);
            }
      })
      .catch((error) => {
            document.getElementById("msg").value = error;
      });
}

function fnUpDt() {
      var snm = document.getElementById("snm").value;
      var adr = document.getElementById("ads").value;
      if( codA == 0 ) { document.getElementById("msg").value = "Анги сонгоогүй байна"; return; } 
      if(snm.trim() == '') { document.getElementById("msg").value = "Нэр бичээгүй байна"; return; }
      if(adr.trim() == '') { document.getElementById("msg").value = "Хаяг бичээгүй байна"; return; }
      
      var ners = document.getElementById("snm").value;
      var ads1 = document.getElementById("ads").value;
      fetch("http://localhost:8822/UpDt", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify( { cd : cod, ner : ners, ads : ads1, cdA : codA } )
      })
      .then(response => response.json())
      .catch((error) => {
            document.getElementById("msg").value = error; return;
      });
      document.getElementById("msg").value = 'Зассан';
}

function fnIns() {
      var snm = document.getElementById("snm").value;
      var adr = document.getElementById("ads").value;
      if( codA == 0 ) { document.getElementById("msg").value = "Анги сонгоогүй байна"; return; } 
      if(snm.trim() == '') { document.getElementById("msg").value = "Нэр бичээгүй байна"; return; }
      if(adr.trim() == '') { document.getElementById("msg").value = "Хаяг бичээгүй байна"; return; }

      var cd = Math.max(...cds) + 1;
      cds.push(cd);

      var ners = document.getElementById("snm").value;
      var ads1 = document.getElementById("ads").value;
      fetch("http://localhost:8822/Ins", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify( { cd : cd, ner : ners, ads : ads1, cdA : codA } )
      })
      .then(response => response.json())
      .catch((error) => {
            document.getElementById("msg").value = error; return;
      });
      document.getElementById("msg").value = 'Нэмсэн';

      var table = document.getElementById('tbl');
      table.innerHTML += `<tr onclick="swAdr(this)"> <td>${snm}</td> </tr>`
}

function del() {
      if( codA == 0 ) { document.getElementById("msg").value = "Анги сонгоогүй байна"; return; } 
      if( cod.length <= 0 ) { document.getElementById("msg").value = "Хүн сонгоогүй байна"; return; } 

      var cd = cod;
      fetch("http://localhost:8822/Del", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify( { cd : cd, cdA : codA } )
      })
      .then(response => response.json())
      .catch((error) => {
            document.getElementById("msg").value = error; return;
      });
      document.getElementById("msg").value = 'Устгасан';
}

// table.innerHTML = "";
// if (1 <= result.length)
// {
//       const tableData = 
//       result.map(value => {
//             `<tr onclick="swAds(this)">
//                   <td>${value.Name}</td> 
//                   <td>${value.Name}</td>       
//                   </tr>`             
//       }).join('');
//       table.innerHTML = tableData;                
// }
