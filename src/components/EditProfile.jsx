import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useKaryawan } from '../hooks/useKaryawan'; // Make sure this path is correct
import {SpinnerIcon} from './SpinnerIcon'; // Make sure this path is correct
import ChangePasswordModal from './ChangePasswordModal'; 
const EditProfile = () => {
    // This custom hook now provides the function we'll use
    const { fetchMeData, updateDataMe } = useKaryawan(); 
    const navigate = useNavigate();

    // State untuk menampung data form
    const [formData, setFormData] = useState({
        nama: "",
        nik: "",
        jk: "Perempuan",
        alamat: "",
        divisi: "",
        penempatan: "",
        email: "",
        jabatan: "",
        status: 1,
    });
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    // State untuk loading saat submit
    const [loading, setLoading] = useState(false);
    // State untuk loading saat fetch data awal
    const [isFetching, setIsFetching] = useState(true);
    // State untuk menampung error (opsional, tapi direkomendasikan)
    const [error, setError] = useState(null);
    const handleCancel = () => {
        navigate(-1); // Kembali ke halaman sebelumnya
    };

    // useEffect untuk mengambil data profil saat komponen pertama kali dimuat
    useEffect(() => {
        // Buat fungsi async di dalam useEffect untuk fetching data
        const loadProfileData = async () => {
            try {
                // Panggil fetchMeData dan tunggu hasilnya
                const fetchedData = await fetchMeData();

                // Pastikan data yang diterima tidak kosong
                if (fetchedData) {
                    // Update state dengan data dari API
                    setFormData({
                        nama: fetchedData.nama || "",
                        nik: fetchedData.nik || "",
                        jk: fetchedData.jk || "Perempuan",
                        alamat: fetchedData.alamat || "",
                        divisi: fetchedData.divisi || "",
                        penempatan: fetchedData.penempatan || "",
                        email: fetchedData.email || "",
                        jabatan: fetchedData.jabatan || "",
                        status: fetchedData.status !== undefined ? fetchedData.status : 1,
                    });
                }
            } catch (err) {
                // Tangkap error jika fetch gagal
                console.error("Gagal mengambil data profil:", err);
                setError("Tidak dapat memuat data profil. Silakan coba lagi nanti.");
            } finally {
                // Hentikan loading setelah selesai (baik sukses maupun gagal)
                setIsFetching(false);
            }
        };

        // Panggil fungsi yang baru dibuat
        loadProfileData();

    }, [fetchMeData]); // Tambahkan fetchMeData ke dependency array

    // Handler untuk setiap perubahan pada input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handler untuk submit form (tidak ada perubahan di sini)
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("Data yang akan dikirim:", formData);
        // Panggil fungsi updateDataMe dari useKaryawan untuk mengirim data
        updateDataMe(formData)
            .then(() => {
                setLoading(false);
                // alert("Profil berhasil diperbarui!");
                navigate(-1); // Kembali ke halaman sebelumnya setelah sukses
            })
            .catch((err) => {  
                setLoading(false);
                console.error("Gagal memperbarui profil:", err);
                alert("Gagal memperbarui profil. Silakan coba lagi.");
            });

        
        // Simulasi pengiriman data ke backend
        // setTimeout(() => {
        //     setLoading(false);
        //     alert("Profil berhasil diperbarui!");
        //     // navigate(-1); // Kembali ke halaman sebelumnya setelah sukses
        // }, 2000);
    };
    
    // Handler untuk tombol ubah password (tidak ada perubahan di sini)
    const handlePasswordChange = () => {
        setIsPasswordModalOpen(true);
    };

    // Tampilan loading saat data awal sedang diambil
    if (isFetching) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="text-center">
                    <SpinnerIcon />
                    <p className="mt-2 text-gray-600">Memuat data profil...</p>
                </div>
            </div>
        );
    }

    // Tampilan jika terjadi error saat fetch (opsional)
    if (error) {
         return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="text-center text-red-500">
                    <p>{error}</p>
                </div>
            </div>
        );
    }
    
    // Tampilan utama form (tidak ada perubahan di sini)
    return (
        <>
        <div className="bg-gray-100 min-h-screen p-4 sm:p-8">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-2 text-gray-800">Edit Profil</h2>
                <p className="text-gray-500 mb-8">Perbarui detail informasi pribadi dan pekerjaan Anda.</p>
                <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
                    <form onSubmit={handleSubmit}>
                        {/* --- Bagian Informasi Pribadi --- */}
                        <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Informasi Pribadi</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Nama Lengkap</label>
                                <input type="text" name="nama" value={formData.nama} onChange={handleChange} className="input-field" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">NIK</label>
                                <input type="text" name="nik" value={formData.nik} className="input-field-readonly" readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Jenis Kelamin</label>
                                <select name="jk" value={formData.jk} onChange={handleChange} className="input-field">
                                    <option value="Laki-laki">Laki-laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-600 mb-1">Alamat</label>
                                <textarea name="alamat" value={formData.alamat} onChange={handleChange} rows={3} className="input-field" />
                            </div>
                        </div>

                        {/* --- Bagian Informasi Perusahaan --- */}
                        <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Informasi Perusahaan</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Divisi</label>
                                <input type="text" name="divisi" value={formData.divisi} onChange={handleChange} className="input-field" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Penempatan</label>
                                <input type="text" name="penempatan" value={formData.penempatan} onChange={handleChange} className="input-field" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-field" required />
                            </div>
                        </div>

                        {/* --- Bagian Pengaturan Akun --- */}
                        <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Pengaturan Akun</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
                                <button type="button" onClick={handlePasswordChange} className="w-full mt-1 btn-secondary">
                                    Ubah Password
                                </button>
                            </div>
                        </div>
                        
                        {/* --- Tombol Aksi --- */}
                        <div className="flex justify-end items-center gap-4 pt-4 border-t mt-8">
                            <button type="button" className="btn-cancel" onClick={handleCancel}>
                                Batal
                            </button>
                            <button type="submit" className="btn-primary" disabled={loading}>
                                {loading ? <SpinnerIcon /> : null}
                                {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

         {isPasswordModalOpen && (
            <ChangePasswordModal 
                onClose={() => setIsPasswordModalOpen(false)} 
            />
        )}
        </>
        
    );
};

export default EditProfile;