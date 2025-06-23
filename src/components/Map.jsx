import React from "react";

const Map = () => {
    return (
        <div className="w-full h-[450px] rounded-lg overflow-hidden shadow-md">
            <iframe
                title="Lokasi PT Murgung Nusa Parama Group"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d495.4520931975642!2d106.811294!3d-6.56996!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c423e0e5d055%3A0xcffd429b1e4be9cd!2sPT%20Murgung%20Nusa%20Parama%20Group!5e0!3m2!1sid!2sid!4v1750693138790!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    );
};

export default Map;
