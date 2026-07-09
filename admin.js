// ======================================
// BIẾN TOÀN CỤC
// ======================================

let editingId = "";

let imageBase64 = "";


// ======================================
// KHỞI ĐỘNG
// ======================================

window.onload = async function () {

    await loadTable();

};


// ======================================
// ĐỌC ẢNH TỪ MÁY
// ======================================

document
.getElementById("image")
.addEventListener("change", function (e) {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function () {

        imageBase64 = reader.result;

        document.getElementById("previewImage").src = imageBase64;

        document.getElementById("previewImage").style.display = "block";

    }

    reader.readAsDataURL(file);

});


// ======================================
// HIỂN THỊ DANH SÁCH
// ======================================

async function loadTable() {

    const data = await getDocuments();

    const tbody = document.getElementById("tableBody");

    let html = "";

    data.forEach(item => {

        html += `

        <tr>

            <td>${item.id}</td>

            <td>

                <img
                    src="${item.image}"
                    width="70">

            </td>

            <td>${item.title}</td>

            <td>${item.subject}</td>

            <td>${item.year}</td>

            <td>${item.views}</td>

            <td>

                <button
                    class="btn btn-warning btn-sm"
                    onclick="editDocument('${item.id}')">

                    Sửa

                </button>

                <button
                    class="btn btn-danger btn-sm"
                    onclick="deleteItem('${item.id}')">

                    Xóa

                </button>

            </td>

        </tr>

        `;

    });

    tbody.innerHTML = html;

}
// ======================================
// LƯU TÀI LIỆU
// ======================================

document
.getElementById("btnSave")
.addEventListener("click", saveDocument);

async function saveDocument(){

    const title =
    document.getElementById("title").value.trim();

    const subject =
    document.getElementById("subject").value.trim();

    const year =
    document.getElementById("year").value;

    const description =
    document.getElementById("description").value.trim();

    const fileUrl =
    document.getElementById("fileUrl").value.trim();

    // Kiểm tra dữ liệu

    if(title==""){

        alert("Vui lòng nhập tên tài liệu!");

        return;

    }

    if(subject==""){

        alert("Vui lòng nhập môn học!");

        return;

    }

    if(year==""){

        alert("Vui lòng nhập năm học!");

        return;

    }

    if(description==""){

        alert("Vui lòng nhập mô tả!");

        return;

    }

    if(imageBase64==""){

        alert("Vui lòng chọn ảnh!");

        return;

    }

    const documentData={

        title:title,

        subject:subject,

        year:year,

        description:description,

        image:imageBase64,

        fileUrl:fileUrl,

        views:0,

        favorite:false

    };

    // Thêm mới

    if(editingId==""){

        await addDocument(documentData);

        alert("Thêm tài liệu thành công!");

    }

    // Cập nhật

    else{

        documentData.views =
        Number(document.getElementById("views").value);

        documentData.favorite =
        document.getElementById("favorite").value=="true";

        await updateDocument(

            editingId,

            documentData

        );

        alert("Cập nhật thành công!");

    }

    resetForm();

    loadTable();

}
// ======================================
// RESET FORM
// ======================================

document
.getElementById("btnReset")
.addEventListener("click",resetForm);

function resetForm(){

    editingId="";

    imageBase64="";

    document.getElementById("id").value="";

    document.getElementById("title").value="";

    document.getElementById("subject").value="";

    document.getElementById("year").value="";

    document.getElementById("description").value="";

    document.getElementById("fileUrl").value="";

    document.getElementById("image").value="";

    document.getElementById("previewImage").src="";

    document.getElementById("previewImage").style.display="none";

}
// ======================================
// SỬA TÀI LIỆU
// ======================================

async function editDocument(id){

    const item = await getDocument(id);

    editingId = item.id;

    document.getElementById("id").value = item.id;

    document.getElementById("title").value = item.title;

    document.getElementById("subject").value = item.subject;

    document.getElementById("year").value = item.year;

    document.getElementById("description").value = item.description;

    document.getElementById("fileUrl").value = item.fileUrl;

    imageBase64 = item.image;

    document.getElementById("previewImage").src = item.image;

    document.getElementById("previewImage").style.display = "block";

    // Lưu tạm lượt xem và yêu thích

    document.getElementById("views").value = item.views;

    document.getElementById("favorite").value = item.favorite;

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}
// ======================================
// XÓA TÀI LIỆU
// ======================================

async function deleteItem(id){

    const check = confirm(

        "Bạn có chắc muốn xóa tài liệu này?"

    );

    if(!check){

        return;

    }

    await deleteDocument(id);

    alert("Đã xóa thành công!");

    loadTable();

}
// ======================================
// HOÀN THÀNH
// ======================================

console.log("Admin Ready");