    document.addEventListener('DOMContentLoaded', () => {
        const searchInput = document.getElementById('searchInput');
        const modal = document.getElementById('productModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalContent = document.getElementById('modalContent');

        searchInput.addEventListener('input', () => {
            const searchValue = searchInput.value.toLowerCase();
            const cards = document.querySelectorAll('.card');

            cards.forEach(card => {
                const title = card.querySelector('h2').innerText.toLowerCase();
                if (title.includes(searchValue)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });

        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const title = card.querySelector('h2').innerText;
                const price = card.querySelector('p:nth-child(3)').innerText;
                const imageSrc = card.querySelector('img').src;

                modalTitle.innerText = title;
                modalContent.innerHTML = `
                    <img src="${imageSrc}" alt="${title}">
                    <p>Price: ${price}</p>
                `;

                modal.style.display = 'block';
            });
        });

        const closeBtn = document.querySelector('.close');
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        fetchAndRenderCards();
    });

    function fetchAndRenderCards() {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => {
                const cardContainer = document.getElementById('cardContainer');

                data.forEach(item => {
                    const card = document.createElement('div');
                    card.classList.add('card');

                    card.innerHTML = `
                        <h2>${item.title}</h2>
                        <img src="${item.image}" alt="${item.title}">
                        <p>${item.price}$</p>
                        <p>${item.category}</p>
                    `;

                    cardContainer.appendChild(card);
                });
            })
            .catch(error => console.error('Error:', error));
    }
