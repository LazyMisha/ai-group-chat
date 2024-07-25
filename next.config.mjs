/** @type {import('next').NextConfig} */
const nextConfig = {
    generateEtags: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                port: '',
                pathname: '/u/**',
            },
            {
                protocol: 'https',
                hostname: 'voda.love',
                port: '',
                pathname: '/wp-content/uploads/2020/11/**',
            },
            {
                protocol: 'https',
                hostname: 'images.squarespace-cdn.com',
                port: '',
                pathname: '/content/v1/569591ff0ab3771dba3f1ec6/**',
            },
            {
                protocol: 'https',
                hostname: 'www.yasaka.se',
                port: '',
                pathname: '/wp-content/uploads/2019/08/**',
            },
            {
                protocol: 'https',
                hostname: 'disgustingmen.com',
                port: '',
                pathname: '/wp-content/uploads/2017/11/**',
            }
        ]
    }
};

export default nextConfig;
