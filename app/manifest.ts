import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Google Developer Group on Campus | McMaster University',
        short_name: "GDG MacU",
        description: "Google Developer Group on Campus at McMaster University bridges the gap between theory and practice through solving real-world problems.",
        start_url: '/',
        display: 'standalone',
        background_color: '#FFFFFF',
        theme_color: '#FFFFFF',
        icons: [
            {
                "src": "/images/icon-192.png",
                "sizes": "192x192",
                "type": "image/png"
            },
            {
                "src": "/images/icon-512.png",
                "sizes": "512x512",
                "type": "image/png"
            },
        ],
    }
}