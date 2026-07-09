// =====================================
// BIẾN TOÀN CỤC
// =====================================

let allDocuments = [];

let currentPage = 1;
const itemsPerPage = 12;

function renderPagination(data) {

    const totalPages = Math.ceil(data.length / itemsPerPage);

    let html = "";

    for (let i = 1; i <= totalPages; i++) {

        html += `
        <li class="page-item ${i == currentPage ? "active" : ""}">
            <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
        </li>
        `;

    }

    document.getElementById("pagination").innerHTML = html;

}

const pageSize = 12;


// =====================================
// KHỞI ĐỘNG WEBSITE
// =====================================

window.onload = async function () {

    showLoading();

    try {

        allDocuments = await getDocuments();

        renderDocuments(allDocuments);

        loadSubjects();

        updateStatistics();

    } catch (error) {

        console.log(error);

    }

    hideLoading();

};


// =====================================
// LOADING
// =====================================

function showLoading() {

    const loading = document.getElementById("loading");

    if (loading) {

        loading.style.display = "block";

    }

}

function hideLoading() {

    const loading = document.getElementById("loading");

    if (loading) {

        loading.style.display = "none";

    }

}


// =====================================
// HIỂN THỊ DANH SÁCH
// =====================================

function renderDocuments(data) {

    const list = document.getElementById("documentList");

    if (data.length === 0) {

        list.innerHTML = `

        <div class="col-12">

            <div class="alert alert-warning text-center">

                Không có tài liệu.

            </div>

        </div>

        `;

        return;

    }

    // Phân trang

    const start = (currentPage - 1) * pageSize;

    const end = start + pageSize;

    const pageData = data.slice(start, end);

    let html = "";

    pageData.forEach(item => {

        html += `

        <div class="col-lg-4 col-md-6 mb-4">

            <div class="card h-100 fade-in shadow">

                <img
                    src="${item.image}"
                    class="card-img-top">

                <div class="card-body">

                    <span class="badge bg-success">

                        ${item.subject}

                    </span>

                    <h5 class="mt-3">

                        ${item.title}

                    </h5>

                    <p>

                        📅 ${item.year}

                    </p>

                    <p>

                        ${item.description}

                    </p>

                    <p class="text-muted">

                        👁 ${item.views} lượt xem

                    </p>

                </div>

                <div class="card-footer bg-white">

                    <div class="d-grid gap-2">

                        <button
                            class="btn btn-primary"
                            onclick="showDetail('${item.id}')">

                            Xem chi tiết

                        </button>

                        <a
                            href="${item.fileUrl}"
                            target="_blank"
                            class="btn btn-success">

                            Tải xuống

                        </a>

                        <button
                            class="btn btn-outline-danger"
                            onclick="toggleFavorite('${item.id}')">

                            ${item.favorite ? "❤️ Đã thích" : "🤍 Yêu thích"}

                        </button>

                    </div>

                </div>

            </div>

        </div>

        `;

    });

    list.innerHTML = html;

    createPagination(data);

}
// =====================================
// XEM CHI TIẾT TÀI LIỆU
// =====================================

async function showDetail(id){

    try{

        const item = await getDocument(id);

        await updateViews(item);

        item.views = Number(item.views) + 1;

        document.getElementById("modalBody").innerHTML = `

            <img
                src="${item.image}"
                class="img-fluid rounded mb-3 w-100">

            <h3 class="text-primary">

                ${item.title}

            </h3>

            <hr>

            <p>

                <b>Môn học:</b>

                ${item.subject}

            </p>

            <p>

                <b>Năm học:</b>

                ${item.year}

            </p>

            <p>

                <b>Mô tả:</b>

            </p>

            <p>

                ${item.description}

            </p>

            <p class="text-muted">

                👁 ${item.views} lượt xem

            </p>

            <div class="d-grid">

                <a
                    href="${item.fileUrl}"
                    target="_blank"
                    class="btn btn-success">

                    <i class="bi bi-download"></i>

                    Tải tài liệu

                </a>

            </div>

        `;

        const modal = new bootstrap.Modal(

            document.getElementById("detailModal")

        );

        modal.show();

        await reloadData();

    }

    catch(error){

        console.log(error);

    }

}
// =====================================
// LOAD DANH SÁCH MÔN HỌC
// =====================================

async function loadSubjects(){

    const subjects = await getSubjects();

    const select = document.getElementById("subjectFilter");

    select.innerHTML =

        '<option value="">Tất cả môn</option>';

    subjects.forEach(subject=>{

        select.innerHTML += `

            <option value="${subject}">

                ${subject}

            </option>

        `;

    });

}
// =====================================
// TÌM KIẾM - LỌC - SẮP XẾP
// =====================================

async function filterDocuments(){

    resetPage();

    const keyword = document
        .getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();

    const subject = document
        .getElementById("subjectFilter")
        .value;

    const year = document
        .getElementById("yearFilter")
        .value;

    const sort = document
        .getElementById("sortFilter")
        .value;

    let result = [...allDocuments];

    // ======================
    // Tìm kiếm
    // ======================

    if(keyword!=""){

        result = result.filter(item=>

            item.title
            .toLowerCase()
            .includes(keyword)

        );

    }

    // ======================
    // Lọc môn học
    // ======================

    if(subject!=""){

        result = result.filter(item=>

            item.subject===subject

        );

    }

    // ======================
    // Lọc năm học
    // ======================

    if(year!=""){

        result = result.filter(item=>

            item.year==year

        );

    }

    // ======================
    // Sắp xếp
    // ======================

    switch(sort){

        case "az":

            result.sort((a,b)=>

                a.title.localeCompare(b.title)

            );

            break;

        case "za":

            result.sort((a,b)=>

                b.title.localeCompare(a.title)

            );

            break;

        case "view":

            result.sort((a,b)=>

                b.views-a.views

            );

            break;

    }

    renderDocuments(result);

}
// =====================================
// SỰ KIỆN
// =====================================

document
.getElementById("btnSearch")
.addEventListener("click",filterDocuments);

document
.getElementById("searchInput")
.addEventListener("keyup",function(e){

    if(e.key==="Enter"){

        filterDocuments();

    }

});

document
.getElementById("subjectFilter")
.addEventListener("change",filterDocuments);

document
.getElementById("yearFilter")
.addEventListener("change",filterDocuments);

document
.getElementById("sortFilter")
.addEventListener("change",filterDocuments);
// =====================================
// PHÂN TRANG
// =====================================

function createPagination(data){

    const totalPages = Math.ceil(data.length / pageSize);

    const pagination = document.getElementById("pagination");

    pagination.innerHTML = "";

    if(totalPages <= 1){

        return;

    }

    // Nút Previous

    pagination.innerHTML += `

    <li class="page-item ${currentPage==1?"disabled":""}">

        <a
            class="page-link"
            href="#"
            onclick="changePage(${currentPage-1})">

            &laquo;

        </a>

    </li>

    `;

    // Các số trang

    for(let i=1;i<=totalPages;i++){

        pagination.innerHTML += `

        <li class="page-item ${currentPage==i?"active":""}">

            <a
                class="page-link"
                href="#"
                onclick="changePage(${i})">

                ${i}

            </a>

        </li>

        `;

    }

    // Nút Next

    pagination.innerHTML += `

    <li class="page-item ${currentPage==totalPages?"disabled":""}">

        <a
            class="page-link"
            href="#"
            onclick="changePage(${currentPage+1})">

            &raquo;

        </a>

    </li>

    `;

}

// =====================================
// RESET TRANG KHI TÌM KIẾM
// =====================================

function resetPage(){

    currentPage = 1;

}
// =====================================
// YÊU THÍCH
// =====================================

async function toggleFavorite(id){

    try{

        const item = await getDocument(id);

        item.favorite = !item.favorite;

        await updateFavorite(item);

        await reloadData();

    }

    catch(error){

        console.log(error);

    }

}
// =====================================
// THỐNG KÊ
// =====================================

async function updateStatistics(){

    const statistics = await getStatistics();

    const totalDocument =
        document.getElementById("totalDocument");

    const favoriteCount =
        document.getElementById("favoriteCount");

    const totalViews =
        document.getElementById("totalViews");

    if(totalDocument){

        totalDocument.innerText =
            statistics.total;

    }

    if(favoriteCount){

        favoriteCount.innerText =
            statistics.favorite;

    }

    if(totalViews){

        totalViews.innerText =
            statistics.totalViews;

    }

}
// =====================================
// LÀM MỚI DỮ LIỆU
// =====================================

async function reloadData(){

    showLoading();

    allDocuments = await getDocuments();

    filterDocuments();

    updateStatistics();

    hideLoading();

}
// =====================================
// LÀM MỚI DỮ LIỆU ĐỊNH KỲ
// =====================================

setInterval(async function(){

    try{

        allDocuments = await getDocuments();

        updateStatistics();

    }

    catch(error){

        console.log(error);

    }

},30000);
// =====================================
// LÀM MỚI TRANG
// =====================================

async function refreshPage(){

    currentPage = 1;

    allDocuments = await getDocuments();

    renderDocuments(allDocuments);

    updateStatistics();

}
// =====================================
// KIỂM TRA DỮ LIỆU
// =====================================

function checkData(data){

    if(!Array.isArray(data)){

        console.log("Dữ liệu không hợp lệ");

        return false;

    }

    return true;

}
// =====================================
// KHỞI ĐỘNG LẠI
// =====================================

async function init(){

    showLoading();

    allDocuments = await getDocuments();

    if(checkData(allDocuments)){

        renderDocuments(allDocuments);

        loadSubjects();

        updateStatistics();

    }

    hideLoading();

}
// =====================================
// HOÀN THÀNH
// =====================================

console.log("StudyNotes Ready");