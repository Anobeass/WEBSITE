document.addEventListener('DOMContentLoaded', () => {
    // التحقق من دعم المتصفح لخاصية Picture-in-Picture
    if ('pictureInPictureEnabled' in document) {
        setupPictureInPicture();
    }
});

function setupPictureInPicture() {
    // التحقق من دعم MediaSession API
    if ('mediaSession' in navigator) {
        try {
            // تسجيل الإجراءات المدعومة فقط
            navigator.mediaSession.setActionHandler('play', () => {
                // تنفيذ إجراء التشغيل
            });

            navigator.mediaSession.setActionHandler('pause', () => {
                // تنفيذ إجراء الإيقاف المؤقت
            });

            // لا نقوم بتسجيل إجراء enterpictureinpicture لأنه غير مدعوم

        } catch (error) {
            console.log('Error setting media session handlers:', error);
        }
    }
}

// التعامل مع عناصر الفيديو
document.querySelectorAll('video').forEach(video => {
    if (document.pictureInPictureEnabled) {
        video.addEventListener('click', () => {
            if (document.pictureInPictureElement) {
                document.exitPictureInPicture()
                    .catch(error => {
                        console.log('Error exiting PiP mode:', error);
                    });
            } else {
                video.requestPictureInPicture()
                    .catch(error => {
                        console.log('Error entering PiP mode:', error);
                    });
            }
        });
    }
});
