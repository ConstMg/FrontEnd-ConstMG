import React, { useEffect, useState } from "react"; // Tambahkan useState
import AOS from "aos";
import "aos/dist/aos.css"; // Import CSS AOS
import gambarBg from "./../assets/rumah-crop.png"; // Ini tidak digunakan di sini, bisa dihapus kalau tidak perlu
import {
    Building2,
    Phone,
    Mail,
    Globe,
    Instagram,
    FacebookIcon,
} from "lucide-react"; // Pencil, Save tidak digunakan langsung di sini
import EditableField from "./EditableField";
import "./../tailwind.css"; // Pastikan Tailwind CSS diimpor dengan benar
import Send from "./../assets/send.svg";
import { useCtx } from "../context/Context"; // Mengasumsikan useCtx() menyediakan data dari useProfile
import { toast } from "react-toastify";
const Contact = () => {
    const user = localStorage.getItem("userRole");
    const isEditable = user === "admin";

    // Destrukturisasi dari useCtx() untuk mendapatkan data profil dan fungsi email
    const {
        profileData,
        updateProfileData,
        sendContactEmail,
        sendingEmail, // Status loading email
        emailError, // Pesan error email
        emailSuccess, // Status sukses email
    } = useCtx(); // Mengasumsikan useCtx() sekarang mengembalikan semua ini dari useProfile

    // State untuk form kontak
    const [contactFromEmail, setContactFromEmail] = useState("");
    const [contactSubject, setContactSubject] = useState("");
    const [contactMessage, setContactMessage] = useState("");
    // Jika Anda ingin juga mengambil nama, tambahkan state di sini:
    const [contactName, setContactName] = useState("");

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        if (sendingEmail) return; // Mencegah multiple submission jika sedang mengirim
        // if (!contactFromEmail || !contactSubject || !contactMessage) {
        //     toast.error("Harap isi semua kolom yang wajib diisi.");
        //     return;
        // }
        try {
            // Memanggil fungsi pengiriman email dari useCtx/useProfile
            await sendContactEmail(
                contactName,
                contactFromEmail,
                contactSubject,
                contactMessage
            );
            // Logic setelah berhasil sekarang ditangani oleh useEffect di bawah
        } catch (err) {
            // Error sudah ditangani dan disimpan di emailError oleh hook,
            // Anda bisa log di sini jika perlu, tapi tidak perlu menampilkannya lagi ke user
            console.log("Email submission failed due to:", err);
        }
    };

    // useEffect untuk inisialisasi AOS
    useEffect(() => {
        AOS.init({ duration: 500, once: true }); // durasi animasi 500ms, sekali animasi saja
    }, []);

    // useEffect untuk menampilkan feedback pengiriman email
    useEffect(() => {
        if (emailSuccess) {
            toast.success("Pesan Anda berhasil terkirim!"); // <--- Menggunakan toast.success
            // Reset form setelah sukses
            setContactName(""); // Reset nama
            setContactFromEmail("");
            setContactSubject("");
            setContactMessage("");
        }
        if (emailError) {
            toast.error(`Gagal mengirim pesan: ${emailError}`); // <--- Menggunakan toast.error
        }
    }, [emailSuccess, emailError]); // Dependensi untuk trigger alert

    // Handler untuk menyimpan perubahan profil (dari EditableField)
    const handleSave = (fieldName, newValue) => {
        const updated = { ...profileData, [fieldName]: newValue };
        updateProfileData(updated);
    };

    // Tampilkan loading/null jika profileData belum tersedia
    if (!profileData) return null;

    return (
        <>
            <div className="contact flex justify-center-safe items-baseline pt-8 px-4 md:px-0">
                <div className="w-full max-w-6xl pb-8 bg-white rounded-tl-[50px] rounded-tr-[50px] p-10 md:p-8 flex flex-col md:flex-row gap-12 shadow-lg">
                    {/* KIRI: Informasi kantor */}

                    <div
                        className="w-full md:w-1/2 space-y-8"
                        data-aos="fade-right"
                    >
                        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-12 text-yellow-600 border-b-2 border-yellow-400 pb-2">
                            PT MURGUNG
                        </h1>

                        <div className="pl-6 space-y-6">
                            <EditableField
                                icon={
                                    <Building2
                                        size={22}
                                        className="text-yellow-600"
                                    />
                                }
                                value={profileData.nama_kantor}
                                name="nama_kantor"
                                onSave={handleSave}
                                isEditable={isEditable}
                            />
                            <EditableField
                                icon={
                                    <Phone
                                        size={22}
                                        className="text-yellow-600"
                                    />
                                }
                                value={profileData.nomor_hp}
                                name="nomor_hp"
                                onSave={handleSave}
                                isEditable={isEditable}
                            />
                            <EditableField
                                icon={
                                    <Mail
                                        size={22}
                                        className="text-yellow-600"
                                    />
                                }
                                value={profileData.email}
                                name="email"
                                onSave={handleSave}
                                isEditable={isEditable}
                            />
                            <EditableField
                                icon={
                                    <Globe
                                        size={22}
                                        className="text-yellow-600"
                                    />
                                }
                                value={profileData.website_url}
                                name="website_url"
                                onSave={handleSave}
                                isEditable={isEditable}
                            />
                            <EditableField
                                icon={
                                    <FacebookIcon
                                        size={22}
                                        className="text-yellow-600"
                                    />
                                }
                                value={profileData.facebook}
                                name="facebook"
                                onSave={handleSave}
                                isEditable={isEditable}
                            />
                            <EditableField
                                icon={
                                    <Instagram
                                        size={22}
                                        className="text-yellow-600"
                                    />
                                }
                                value={profileData.instagram}
                                name="instagram"
                                onSave={handleSave}
                                isEditable={isEditable}
                            />
                        </div>
                    </div>

                    {/* KANAN: Form kontak */}
                    <div
                        className="w-full flex justify-center items-center "
                        data-aos="fade-left"
                    >
                        {/* Tambahkan onSubmit ke form */}
                        <form
                            className="flex flex-col gap-6 w-full max-w-[640px] px-6 md:px-0"
                            onSubmit={handleContactSubmit}
                        >
                            <div className="flex flex-col md:flex-row gap-4 ">
                                {/* Input Your Name - jika Anda ingin menggunakannya, Anda perlu state baru */}
                                {/* Untuk saat ini, tidak diikat ke state karena backend tidak memintanya */}
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="flex-1 h-14 bg-yellow-50 rounded-3xl border border-yellow-300 p-4 text-base placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                                    value={contactName} // Ikat ke state
                                    onChange={(e) =>
                                        setContactName(e.target.value)
                                    }
                                    disabled={sendingEmail} // Nonaktifkan saat mengirim
                                />
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="flex-1 h-14 bg-yellow-50 rounded-3xl border border-yellow-300 p-4 text-base placeholder-yellow-400 focus:outline-none focus:ring-2 resize-none focus:ring-yellow-400 transition"
                                    value={contactFromEmail} // Ikat ke state
                                    onChange={(e) =>
                                        setContactFromEmail(e.target.value)
                                    } // Update state
                                    required // Wajib diisi
                                    disabled={sendingEmail} // Nonaktifkan saat mengirim
                                />
                            </div>

                            <input // Ini seharusnya input subject, bukan textarea pertama
                                type="text"
                                placeholder="Subject" // Placeholder diubah jadi Subjek
                                className="w-full h-14 bg-yellow-50 rounded-3xl border border-yellow-300 p-5 text-base placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none transition"
                                value={contactSubject} // Ikat ke state
                                onChange={(e) =>
                                    setContactSubject(e.target.value)
                                } // Update state
                                required // Wajib diisi
                                disabled={sendingEmail} // Nonaktifkan saat mengirim
                            />

                            <textarea
                                placeholder="Your Message"
                                rows="5"
                                className="w-full bg-yellow-50 rounded-3xl border border-yellow-300 p-5 text-base placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none transition"
                                value={contactMessage} // Ikat ke state
                                onChange={(e) =>
                                    setContactMessage(e.target.value)
                                } // Update state
                                required // Wajib diisi
                                disabled={sendingEmail} // Nonaktifkan saat mengirim
                            ></textarea>

                            <button
                                type="submit"
                                className="w-full h-14 text-white font-bold rounded-3xl flex items-center justify-center gap-3 shadow-md cursor-pointer transition-all bg-amber-400 px-6 py-2
                                    border-amber-500 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                                    active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                                disabled={sendingEmail} // Nonaktifkan tombol saat mengirim
                            >
                                <img
                                    src={Send}
                                    alt="Send"
                                    className="w-6 h-6"
                                />
                                {sendingEmail ? "Sending..." : "Send Message"}{" "}
                                {/* Tampilkan teks loading */}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;
