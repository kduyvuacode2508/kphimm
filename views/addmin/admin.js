const filmForm = document.getElementById("filmForm");
const filmList = document.getElementById("filmList");
const message = document.getElementById("message");

const API = "http://localhost:3000/posts";

//Upload ảnh/video lên Cloudinary
const CLOUD_NAME = 'dzyq7yykv'; // <<< thay thế bằng cloud của bạn
const UPLOAD_PRESET = 'filmzz'; // <<< thay preset đúng

async function uploadToCloudinary(file, type = "image") {
    console.log(file);
    
    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${type}/upload`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(url, {
        method: "POST",
        body: formData
    });
    const data = await res.json();
    return data.secure_url; // link https
}   




//Lấy danh sách phim từ API
async function fetchFilms() {
    const res = await fetch(API);
    const data = await res.json();
    renderFilms(data);
}
//Gọi API lấy danh sách phim, sau đó truyền qua hàm renderFilms để hiển thị.

function renderFilms(films) {
    filmList.innerHTML = "";
    films.forEach(film => {
        filmList.innerHTML += `
         
                <div class="film">
                <div class="film-img_wrapper">
               <a href="../chitiet/ct.html?id=${film.id}">   <img class="film-img" src="${film.image}" alt=""></a>  
                </div>
                <h3 class="film-text">${film.title}</h3>
                   <p>Thể loại: ${film.type_film_id}</p>
                   <div class="film-actions">
                    <button class="edit-btn" onclick="editFilm('${film.id}')">Sửa</button>
                    <button class="delete-btn" onclick="deleteFilm('${film.id}')">Xóa</button>
                </div>
            </div>
                
           
        `;
    });
}
 

filmForm.addEventListener("submit", async function(e) {
    e.preventDefault(); // Ngăn hành vi reload mặc định của form
    const id = document.getElementById("filmId").value;
    const title = document.getElementById("title").value.trim();
    const text = document.getElementById("text").value.trim();
    const type_film_id = document.getElementById("type_film_id").value;
    const imageFile = document.getElementById("imageUpload").files[0];
    const videoFile = document.getElementById("videoUpload").files[0];

    if (!imageFile || !videoFile) {
        message.innerText = "❌ Vui lòng chọn ảnh và video!";
        return;
    }

    message.innerText = "🔄 Đang upload...";

    try {
        const imageUrl = await uploadToCloudinary(imageFile, "image");
        const videoUrl = await uploadToCloudinary(videoFile, "video");//ắp lên và lấy lại

        const filmData = {
            title,
            image: imageUrl,
            video: videoUrl,
            text,
            type_film_id,
            likes: 0
        };

        if (id) {
            await fetch(`${API}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(filmData)
            });
            message.innerText = "✅ Cập nhật phim thành công!";
        } else {
            await fetch(API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(filmData)
            });
            message.innerText = "✅ Thêm phim thành công!";
        }

        filmForm.reset();// Xóa sạch form
        document.getElementById("filmId").value = ""; // Reset ID
        fetchFilms();// Reload danh sách phim mới nhất
    } catch (error) {
        console.error(error);
        message.innerText = "❌ Upload thất bại!";
    }
});





function editFilm(id) {
    fetch(`${API}/${id}`)
        .then(res => res.json())
        .then(film => {
            document.getElementById("filmId").value = film.id;
            document.getElementById("title").value = film.title;
            document.getElementById("text").value = film.text;
            document.getElementById("type_film_id").value = film.type_film_id;
        })
        .catch(err => console.error(err));
}

function deleteFilm(id) {
    if (confirm("Bạn có chắc chắn muốn xóa phim này không?")) {
        fetch(`${API}/${id}`, {
            method: "DELETE"
        })
        .then(() => {
            message.innerText = "🗑️ Xóa phim thành công!";
            fetchFilms();
        })
        .catch(err => console.error(err));
    }
}

// Load phim khi vào trang
fetchFilms();