/** @type {import('next').NextConfig} */
const nextConfig = {
    // RCCC New way to define the images white list in next.js 14. However, aparently, in the new version
    // there is no need to configure when the image extension is svg since at the begining,
    //  the Disney pluse logo that I tried to use was an svg file and was shown without any error message
    // before making this configuration. Only when I changed the logo with a png file then the error message
    // was raisen
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "upload.wikimedia.org"
            },
            {
                protocol: "http",
                hostname: "image.tmdb.org"
            },
            {
                protocol: "https",
                hostname: "images.pexels.com"
            }
        ]
    }
};

export default nextConfig;
