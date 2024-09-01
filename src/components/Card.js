import React from 'react';
import { useState } from 'react';

const Card = () => {
    const [input, setInput] = useState("");
    const [qr, setQr] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getQRCode = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            const res = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${input}`);
            const qrImageUrl = res.url; 
            setQr(qrImageUrl);
            console.log("generated");
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className='form' onSubmit={getQRCode}>
            <h1 className="title">QR Code Generator</h1>
            <input
                type="text"
                className='input'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                required
                placeholder="Enter Text or URL...."
            />

            {isLoading && <div className='loading'><span></span>Loading...</div>}

            {!isLoading && (qr ? <img className="qr_code" src={qr} alt="qrcode" /> : 
            <div className='loading'>Create stunning QR codes effortlessly! Whether it's for you or your friends, generate unique and eye-catching QR codes that are perfect for sharing and scanning. Enhance your connections with this simple, powerful tool!</div>)}

            <input type="submit" className="submit" value="Generate QR Code"></input>
        </form>
    );
};

export default Card;
