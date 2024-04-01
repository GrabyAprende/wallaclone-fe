/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images-wallaclone.s3.amazonaws.com'],
    },
    env: {
        ENCRYPTER_SECRET:"48e4f8018c9ab9ef1e97b45dffe216e4"
    },
};

export default nextConfig;
