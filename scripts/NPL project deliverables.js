document.addEventListener('DOMContentLoaded', function () {
    // Legend filtering logic
    const legendItems = document.querySelectorAll('.kanban-legend .legend-item');
    const kanbanBoard = document.querySelector('.kanban-board');
    if (!kanbanBoard) return; // Exit if not in Kanban view or board not found

    const allCards = kanbanBoard.querySelectorAll('.card');

    let activePhase = null;
    let activeStatus = null;
    let activeNecessity = null;

    legendItems.forEach(item => {
        item.addEventListener('click', () => {
            const phase = item.dataset.phase;
            const status = item.dataset.status;
            const necessity = item.dataset.necessity;

            if (phase) {
                if (item.classList.contains('active')) {
                    activePhase = null;
                    item.classList.remove('active');
                } else {
                    activePhase = phase;
                    // Deactivate other phase legends
                    legendItems.forEach(i => {
                        if (i.dataset.phase) i.classList.remove('active');
                    });
                    item.classList.add('active');
                }
            }

            if (status) {
                if (item.classList.contains('active')) {
                    activeStatus = null;
                    item.classList.remove('active');
                } else {
                    activeStatus = status;
                    // Deactivate other status legends
                    legendItems.forEach(i => {
                        if (i.dataset.status) i.classList.remove('active');
                    });
                    item.classList.add('active');
                }
            }

            if (necessity) {
                if (item.classList.contains('active')) {
                    activeNecessity = null;
                    item.classList.remove('active');
                } else {
                    activeNecessity = necessity;
                    // Deactivate other necessity legends
                    legendItems.forEach(i => {
                        if (i.dataset.necessity) i.classList.remove('active');
                    });
                    item.classList.add('active');
                }
            }

            applyFilters();
        });
    });

    function applyFilters() {
        const hasActiveFilter = activePhase || activeStatus || activeNecessity;

        if (!hasActiveFilter) {
            kanbanBoard.classList.remove('highlight-active');
            allCards.forEach(card => card.classList.remove('highlight'));
            return;
        }

        kanbanBoard.classList.add('highlight-active');
        allCards.forEach(card => {
            const phaseMatch = !activePhase || card.dataset.phase === activePhase;

            const statusMatch = !activeStatus ||
                (activeStatus === 'submitted' && card.querySelector('.submitted')) ||
                (activeStatus === 'pending' && card.querySelector('.pending'));

            const necessityMatch = !activeNecessity ||
                (activeNecessity === 'necessary' && card.querySelector('.necessary')) ||
                (activeNecessity === 'optional' && !card.querySelector('.necessary'));

            if (phaseMatch && statusMatch && necessityMatch) {
                card.classList.add('highlight');
            } else {
                card.classList.remove('highlight');
            }
        });
    }

    // Staggered animation for cards on initial load
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.03}s`;
    });
}); 