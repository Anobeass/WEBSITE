class ProjectManager {
    constructor() {
        this.projects = [];
        this.container = document.getElementById('projects-container');
        this.initLoader();
    }

    initLoader() {
        const loaderHTML = `
            <div class="loader-container">
                <div class="loader"></div>
                <div class="loading-text">Loading</div>
                <div class="progress-bar">
                    <div class="progress-bar-fill"></div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', loaderHTML);
        this.loader = document.querySelector('.loader-container');
        this.progressBar = document.querySelector('.progress-bar-fill');
    }

    updateProgress(progress) {
        if (this.progressBar) {
            this.progressBar.style.width = `${progress}%`;
        }
    }

    async showLoader() {
        this.loader.classList.remove('fade-out');
        // محاكاة تقدم التحميل
        for (let i = 0; i <= 100; i += 20) {
            await new Promise(resolve => setTimeout(resolve, 300));
            this.updateProgress(i);
        }
    }

    hideLoader() {
        this.updateProgress(100);
        setTimeout(() => {
            this.loader.classList.add('fade-out');
            setTimeout(() => {
                this.loader.style.display = 'none';
            }, 600);
        }, 400);
    }

    async loadProjects() {
        try {
            await this.showLoader();
            const response = await fetch('./data/config.json');
            const data = await response.json();
            this.projects = data.projects;
            this.renderProjects();
        } catch (error) {
            console.error('Error loading projects:', error);
            // إظهار رسالة خطأ للمستخدم هنا إذا لزم الأمر
        } finally {
            this.hideLoader();
        }
    }

    renderProjects() {
        if (!this.container) return;

        let html = '';
        for (let i = 0; i < this.projects.length; i += 2) {
            html += `
                <div class="Card1">
                    ${this.createProjectCard(this.projects[i])}
                    ${this.projects[i + 1] ? this.createProjectCard(this.projects[i + 1]) : ''}
                </div>
            `;
        }

        this.container.innerHTML = html;
        this.initializeAnimations();
    }

    createProjectCard(project) {
        return `
            <a href="${project.url}" class="card-element scroll-fade-in">
                <div class="Card-Element-desktop">
                    <img src="${project.image}" alt="${project.name}">
                </div>
                <div class="Frame6">
                    <h5>${project.name}</h5>
                    <p>${project.label}</p>
                </div>
            </a>
        `;
    }

    initializeAnimations() {
        const cards = document.querySelectorAll('.scroll-fade-in');
        cards.forEach((card, index) => {
            card.style.setProperty('--animation-order', index);
        });
    }

    addProject(projectData) {
        this.projects.push({
            id: this.projects.length + 1,
            ...projectData
        });
        this.saveProjects();
        this.renderProjects();
    }

    async saveProjects() {
        try {
            const response = await fetch('./data/config.json', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ projects: this.projects })
            });
            if (!response.ok) throw new Error('Failed to save projects');
        } catch (error) {
            console.error('Error saving projects:', error);
        }
    }
}
