export const saveUserToLocalStorage = (data) => {
    const isLogin = localStorage.getItem("isLoggedin");
    if (data.karyawan && !isLogin) {
        localStorage.setItem("userEmail", data.karyawan.email);
        localStorage.setItem("userRole", data.karyawan.role);
        localStorage.setItem("userId", data.karyawan.id);
        localStorage.setItem("userName", data.karyawan.nama);
        localStorage.setItem("token", data.token);
        localStorage.setItem("isLoggedIn", "true");
    } else if (data && isLogin) {
        localStorage.setItem("userEmail", data.email);
        localStorage.setItem("userRole", data.role);
        localStorage.setItem("userId", data.id);
        localStorage.setItem("userName", data.nama);
    } else {
        localStorage.setItem("userEmail", data.email);
        localStorage.setItem("userRole", data.role);
        localStorage.setItem("userId", data.id);
        localStorage.setItem("userName", data.nama);
    }
};

export function getRandomItems(arr, n) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
}

export const getTodayLocalDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

export const compressImage = (
    file,
    quality = 0.6,
    maxWidth = 1280,
    maxHeight = 1280
) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;

            img.onload = () => {
                let { width, height } = img;

                // Hitung skala resize jika melebihi max
                const widthRatio = maxWidth / width;
                const heightRatio = maxHeight / height;
                const ratio = Math.min(widthRatio, heightRatio, 1); // jangan upscale

                const newWidth = Math.floor(width * ratio);
                const newHeight = Math.floor(height * ratio);

                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                canvas.width = newWidth;
                canvas.height = newHeight;

                ctx.drawImage(img, 0, 0, newWidth, newHeight);

                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            const nameParts = file.name.split(".");
                            const baseName = nameParts.slice(0, -1).join(".");
                            const newFileName = `${baseName}-compressed.jpg`;

                            resolve(
                                new File([blob], newFileName, {
                                    type: "image/jpeg",
                                })
                            );
                        } else {
                            reject(new Error("Gagal compress gambar"));
                        }
                    },
                    "image/jpeg",
                    quality
                );
            };

            img.onerror = () => reject(new Error("Gagal load image"));
        };

        reader.onerror = () => reject(new Error("Gagal baca file"));
    });
};

export function formatDateToYMD(dateString) {
    if (!dateString || dateString === "-") return null;
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // bulan dimulai dari 0
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}
