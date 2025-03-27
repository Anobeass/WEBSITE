document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('pageLoader');
    const content = document.getElementById('mainContent');
    const progressFill = document.querySelector('.loader-progress-fill');
    const loaderText = document.querySelector('.loader-text');
    let progress = 0;

    // محاكاة تقدم التحميل بشكل أسرع
    const simulateLoading = () => {
        const interval = setInterval(() => {
            if (progress >= 100) {
                clearInterval(interval);
                completeLoading();
                return;
            }

            // زيادة سرعة التحميل
            progress += 25; // زيادة بمقدار أكبر
            progress = Math.min(progress, 100);

            if (progressFill) {
                progressFill.style.width = `${progress}%`;
            }
        }, 100); // تقليل وقت الانتظار
    };

    // إكمال التحميل بشكل أسرع
    const completeLoading = () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            content.classList.add('visible');

            setTimeout(() => {
                loader.style.display = 'none';
            }, 300); // تقليل وقت الانتظار
        }, 200); // تقليل وقت الانتظار
    };

    // تحميل الصور مسبقاً
    const preloadImages = () => {
        const images = document.querySelectorAll('img');
        let loaded = 0;
        const totalImages = images.length;

        if (totalImages === 0) {
            simulateLoading();
            return;
        }

        images.forEach(img => {
            const src = img.getAttribute('src');
            if (src) {
                const newImg = new Image();
                newImg.onload = () => {
                    loaded++;
                    if (loaded === totalImages) {
                        simulateLoading();
                    }
                };
                newImg.onerror = () => {
                    loaded++;
                    if (loaded === totalImages) {
                        simulateLoading();
                    }
                };
                newImg.src = src;
            }
        });
    };

    preloadImages();
});
