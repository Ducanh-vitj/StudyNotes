// ================================
// API URL
// ================================

const API_URL = "https://6a4d630ce1cf82a4a17e5462.mockapi.io/document";

// ================================
// Lấy toàn bộ tài liệu
// ================================

async function getDocuments(){

    try{

        const response = await fetch(API_URL);

        const data = await response.json();

        return data;

    }
    catch(error){

        console.log(error);

        return [];

    }

}


// ================================
// Lấy 1 tài liệu theo ID
// ================================

async function getDocument(id){

    try{

        const response = await fetch(`${API_URL}/${id}`);

        return await response.json();

    }
    catch(error){

        console.log(error);

    }

}


// ================================
// Thêm tài liệu
// ================================

async function addDocument(document){

    try{

        const response = await fetch(API_URL,{

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify(document)

        });

        return await response.json();

    }
    catch(error){

        console.log(error);

    }

}


// ================================
// Cập nhật tài liệu
// ================================

async function updateDocument(id,document){

    try{

        const response = await fetch(`${API_URL}/${id}`,{

            method:"PUT",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify(document)

        });

        return await response.json();

    }
    catch(error){

        console.log(error);

    }

}
// ================================
// Xóa tài liệu
// ================================

async function deleteDocument(id){

    try{

        const response = await fetch(`${API_URL}/${id}`,{

            method:"DELETE"

        });

        return await response.json();

    }
    catch(error){

        console.log(error);

    }

}


// ================================
// Cập nhật lượt xem
// ================================

async function updateViews(document){

    try{

        document.views = Number(document.views) + 1;

        const response = await fetch(`${API_URL}/${document.id}`,{

            method:"PUT",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify(document)

        });

        return await response.json();

    }
    catch(error){

        console.log(error);

    }

}


// ================================
// Cập nhật yêu thích
// ================================

async function updateFavorite(document){

    try{

        const response = await fetch(`${API_URL}/${document.id}`,{

            method:"PUT",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify(document)

        });

        return await response.json();

    }
    catch(error){

        console.log(error);

    }

}


// ================================
// Tìm kiếm theo tiêu đề
// ================================

async function searchDocument(keyword){

    const documents = await getDocuments();

    return documents.filter(item=>

        item.title
            .toLowerCase()
            .includes(keyword.toLowerCase())

    );

}


// ================================
// Lấy danh sách môn học
// ================================

async function getSubjects(){

    const documents = await getDocuments();

    return [...new Set(

        documents.map(item=>item.subject)

    )];

}


// ================================
// Lấy tài liệu theo môn
// ================================

async function getDocumentsBySubject(subject){

    const documents = await getDocuments();

    return documents.filter(item=>

        item.subject===subject

    );

}


// ================================
// Lấy tài liệu theo năm
// ================================

async function getDocumentsByYear(year){

    const documents = await getDocuments();

    return documents.filter(item=>

        item.year==year

    );

}


// ================================
// Thống kê
// ================================

async function getStatistics(){

    const documents = await getDocuments();

    return{

        total:documents.length,

        favorite:

        documents.filter(x=>x.favorite).length,

        totalViews:

        documents.reduce(

            (sum,item)=>

            sum+Number(item.views),

            0

        )

    };

}
