  // Produk Data
        const products = [
            {id: 1, name: '60 Oneiric Shards', price: 15000, img: 'https://th.bing.com/th/id/OIP.A5ll8g2trjS-rEqF6mzqswAAAA?w=147&h=150&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',},
            {id: 2, name: '300 + 30 Oneiric Shards', price: 75000, img: 'https://th.bing.com/th/id/OIP.A5ll8g2trjS-rEqF6mzqswAAAA?w=147&h=150&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',},
            {id: 3, name: '980 + 110 Oneiric Shards', price: 230000, img: 'https://th.bing.com/th/id/OIP.A5ll8g2trjS-rEqF6mzqswAAAA?w=147&h=150&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',},
            {id: 4, name: '1980 + 260 Oneiric Shards', price: 460000, img: 'https://th.bing.com/th/id/OIP.A5ll8g2trjS-rEqF6mzqswAAAA?w=147&h=150&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',},
            {id: 5, name: '3280 + 600 Oneiric Shards', price: 750000, img: 'https://th.bing.com/th/id/OIP.A5ll8g2trjS-rEqF6mzqswAAAA?w=147&h=150&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',},
            {id: 6, name: '6480 + 1600 Oneiric Shards', price: 1500000, img: 'https://th.bing.com/th/id/OIP.A5ll8g2trjS-rEqF6mzqswAAAA?w=147&h=150&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',},
            {id: 7, name: 'Express Supply Pass', price: 79000, img: 'https://th.bing.com/th/id/OIP.A5ll8g2trjS-rEqF6mzqswAAAA?w=147&h=150&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',},
            {id: 8, name: '2x Express Supply Pass', price: 158000, img: 'https://th.bing.com/th/id/OIP.A5ll8g2trjS-rEqF6mzqswAAAA?w=147&h=150&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',},
            {id: 9, name: 'Combo 300 OS + Express', price: 150000, img: 'https://th.bing.com/th/id/OIP.A5ll8g2trjS-rEqF6mzqswAAAA?w=147&h=150&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',},
            {id: 10, name: 'Combo 980 OS + Express', price: 300000, img: 'https://th.bing.com/th/id/OIP.A5ll8g2trjS-rEqF6mzqswAAAA?w=147&h=150&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',},
            {id: 11, name: 'Combo 1980 OS + Express', price: 500000, img: 'https://th.bing.com/th/id/OIP.A5ll8g2trjS-rEqF6mzqswAAAA?w=147&h=150&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',},
            {id: 12, name: 'Combo 3280 OS + Express', price: 700000, img: 'https://th.bing.com/th/id/OIP.A5ll8g2trjS-rEqF6mzqswAAAA?w=147&h=150&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',},
        ];

        // Cart state
        let cart = [];

        // Helpers
        function priceFormat(num) {
            return 'Rp ' + num.toLocaleString('id-ID');
        }

        // Render Products
        function renderProducts() {
            const grid = document.getElementById('productsGrid');
            grid.innerHTML = '';
            products.forEach(product => {
                const card = document.createElement('div');
                card.className = 'product-card';
                card.innerHTML = `
                    <img class="product-img" src="${product.img}" alt="${product.name}">
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">${priceFormat(product.price)}</div>
                    <button class="add-cart-btn" data-id="${product.id}">Tambah ke Keranjang</button>
                `;
                grid.appendChild(card);
            });
        }

        // Handle Add to Cart
        function addToCart(productId) {
            const idx = cart.findIndex(item => item.id === productId);
            if (idx !== -1) {
                cart[idx].qty += 1;
            } else {
                const prod = products.find(p => p.id === productId);
                cart.push({ ...prod, qty: 1 });
            }
            updateCartCount();
            animateCartIcon();
        }

        // Animate Cart Icon on Add
        function animateCartIcon() {
            const icon = document.getElementById('cartIcon');
            icon.style.transform = 'scale(1.18)';
            setTimeout(() => { icon.style.transform = ''; }, 150);
        }

        // Update Cart Count
        function updateCartCount() {
            const count = cart.reduce((sum, item) => sum + item.qty, 0);
            document.getElementById('cartCount').textContent = count;
        }

        // Render Cart Modal
        function renderCart() {
            const list = document.getElementById('cartItemsList');
            const total = document.getElementById('cartTotal');
            list.innerHTML = '';
            if (cart.length === 0) {
                list.innerHTML = `<div class="cart-empty">Keranjang kosong.</div>`;
                total.textContent = 'Rp 0';
                return;
            }
            let sum = 0;
            cart.forEach(item => {
                sum += item.price * item.qty;
                const div = document.createElement('div');
                div.className = 'cart-item';
                div.innerHTML = `
                    <img class="cart-item-img" src="${item.img}" alt="${item.name}">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name} ${item.qty > 1 ? `<span style="color:var(--gray);font-size:.98em;">×${item.qty}</span>` : ''}</div>
                        <div class="cart-item-price">${priceFormat(item.price * item.qty)}</div>
                    </div>
                    <button class="cart-item-remove" title="Hapus" data-id="${item.id}">&times;</button>
                `;
                list.appendChild(div);
            });
            total.textContent = priceFormat(sum);
        }

        // Remove item from cart
        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            updateCartCount();
            renderCart();
        }

        // Event Listeners
        document.addEventListener('DOMContentLoaded',function() {
            renderProducts();
            updateCartCount();

            // Add to cart button
            document.getElementById('productsGrid').addEventListener('click', function(e) {
                if (e.target.classList.contains('add-cart-btn')) {
                    // Validate form first
                    if (!validateForm(true)) {
                        document.getElementById('playerFormSection').scrollIntoView({behavior: 'smooth'});
                        return;
                    }
                    const id = parseInt(e.target.dataset.id);
                    addToCart(id);
                    // show glowing animation on card
                    e.target.closest('.product-card').style.boxShadow = '0 0 32px 8px var(--accent)';
                    setTimeout(() => {
                        e.target.closest('.product-card').style.boxShadow = '';
                    }, 420);
                }
            });

            // Cart icon
            document.getElementById('cartIcon').addEventListener('click', function() {
                renderCart();
                document.getElementById('cartModalBackdrop').style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });

            // Cart close
            document.getElementById('cartCloseBtn').addEventListener('click', function() {
                document.getElementById('cartModalBackdrop').style.display = 'none';
                document.body.style.overflow = '';
            });
            // Backdrop click closes modal
            document.getElementById('cartModalBackdrop').addEventListener('click', function(e) {
                if (e.target === this) {
                    this.style.display = 'none';
                    document.body.style.overflow = '';
                }
            });

            // Remove item in cart
            document.getElementById('cartItemsList').addEventListener('click', function(e) {
                if (e.target.classList.contains('cart-item-remove')) {
                    const id = parseInt(e.target.dataset.id);
                    removeFromCart(id);
                }
            });

            // Checkout btn
            document.getElementById('checkoutBtn').addEventListener('click', function() {
                alert('Checkout berhasil!\n(NOTE: Fungsi pembayaran tidak tersedia - hanya tampilan)');
                cart = [];
                updateCartCount();
                renderCart();
                document.getElementById('cartModalBackdrop').style.display = 'none';
                document.body.style.overflow = '';
            });

            // Form Validation
            document.getElementById('playerForm').addEventListener('submit', function(e){
                e.preventDefault();
                validateForm();
            });
            ['uid','server'].forEach(id=>{
                document.getElementById(id).addEventListener('blur',()=>validateForm(true));
            });
        });

        function validateForm(silent = false) {
            let valid = true;
            const uid = document.getElementById('uid').value.trim();
            const server = document.getElementById('server').value;
            // UID: Must not be empty and must be numeric, length 6-15
            let uidErrorText = '';
            if (!uid) {
                uidErrorText = 'UID tidak boleh kosong.';
                valid = false;
            } else if (!/^\d+$/.test(uid)) {
                uidErrorText = 'UID hanya boleh angka.';
                valid = false;
            } else if (uid.length < 6 || uid.length > 15) {
                uidErrorText = 'UID tidak valid.';
                valid = false;
            }
            // Server: must be selected
            let serverErrorText = '';
            if (!server) {
                serverErrorText = 'Pilih server.';
                valid = false;
            }
            if (!silent) {
                document.getElementById('uidError').textContent = uidErrorText;
                document.getElementById('serverError').textContent = serverErrorText;
            } else {
                document.getElementById('uidError').textContent = '';
                document.getElementById('serverError').textContent = '';
                if (uidErrorText) document.getElementById('uidError').textContent = uidErrorText;
                if (serverErrorText) document.getElementById('serverError').textContent = serverErrorText;
            }
            return valid;
        }