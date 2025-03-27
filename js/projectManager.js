class ProjectManager {
    constructor() {
        this.projects = [];
        this.container = document.getElementById('projects-container');
    }

    async loadProjects() {
        try {
            const response = await fetch('./data/config.json');
            const data = await response.json();
            this.projects = data.projects;
            this.renderProjects();
        } catch (error) {
            console.error('Error loading projects:', error);
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
