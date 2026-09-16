let siswa = [];
let no = 1;
let index = 1;

function TambahSiswa(){
    let nama = document.getElementById("nama").value;
    let kelas = document.getElementById("kelas").value;
    let umur = document.getElementById("umur").value;

    if (nama == "" ||
        kelas == "" ||
        umur == ""){
            alert("Data tidak boleh kosong!")
            return;
        }

    siswa.push(
        {
            nama : nama,
            kelas : kelas,
            umur : umur
        }
    )    

    tampilkanSiswa();

    document.getElementById("nama").value = "";
    document.getElementById("kelas").value = "";
    document.getElementById("umur").value = "";
    
}

function tampilkanSiswa(){
    let tabel = document.getElementById("tabelSiswa");
    tabel.innerHTML = "";

    siswa.forEach((data,index) => {
        tabel.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${data.nama}</td>
            <td>${data.kelas}</td>
            <td>${data.umur}</td>
            <td>
                <button class="hapus" onclick="hapusSiswa(${index})">Hapus</button>
            </td>
        </tr>
        `;
    });        
}

function hapusSemua(){
    siswa = [];
    tampilkanSiswa();
}

function hapusSiswa(index){
    siswa.splice(index, 1);
    tampilkanSiswa();
}
