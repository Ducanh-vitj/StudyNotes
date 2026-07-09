// ======================================
// HIỂN THỊ THÔNG BÁO
// ======================================

function showMessage(message,type="success"){

    const old=document.getElementById("toastMessage");

    if(old){

        old.remove();

    }

    const toast=document.createElement("div");

    toast.id="toastMessage";

    toast.className=`alert alert-${type}`;

    toast.style.position="fixed";

    toast.style.top="20px";

    toast.style.right="20px";

    toast.style.zIndex="9999";

    toast.style.minWidth="300px";

    toast.style.boxShadow="0 5px 15px rgba(0,0,0,.2)";

    toast.innerHTML=message;

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.remove();

    },3000);

}
// ======================================
// FORMAT SỐ
// ======================================

function formatNumber(number){

    return Number(number).toLocaleString("vi-VN");

}
// ======================================
// FORMAT NGÀY
// ======================================

function formatDate(date){

    return new Date(date).toLocaleDateString("vi-VN");

}
// ======================================
// HIỆN LOADING
// ======================================

function showLoading(){

    const loading=document.getElementById("loading");

    if(loading){

        loading.style.display="block";

    }

}


// ======================================
// ẨN LOADING
// ======================================

function hideLoading(){

    const loading=document.getElementById("loading");

    if(loading){

        loading.style.display="none";

    }

}
// ======================================
// XÁC NHẬN
// ======================================

function confirmDelete(){

    return confirm(

        "Bạn có chắc chắn muốn xóa?"

    );

}
// ======================================
// RESET INPUT
// ======================================

function clearInput(...inputs){

    inputs.forEach(id=>{

        const element=document.getElementById(id);

        if(element){

            element.value="";

        }

    });

}

console.log("Utils Ready");
