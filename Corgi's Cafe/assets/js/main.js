/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu')
      navToggle = document.getElementById('nav-toggle')
      navClose = document.getElementById('nav-close')

/* menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}

navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== ADD SHADOW HEADER ===============*/
const shadowHeader = () =>{
    const header = document.getElementById('header')
    this.scrollY >= 50 ? header.classList.add('shadow-header')
                    : header.classList.remove('shadow-header')
}

window.addEventListener('scroll', shadowHeader)

/*=============== SWIPER POPULAR ===============*/
const swiperPopular = new Swiper('.popular__swiper', {
    loop: true,
    grabCursor: true,
    slidesPerView: 'auto',
    centeredSlides: 'auto',
})

/*=============== SHOW SCROLL UP ===============*/ 
const scrollup = () =>{
    const scrollup = document.getElementById('scroll-up')
    this.scrollY >= 350 ? scrollup.classList.add('show-scroll')
                    : scrollup.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollup)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionClass.classList.add('active-link')
        }
        else{
            sectionClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive )

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 300,
})

sr.reveal('.home__data, .popular__container, .footer')
sr.reveal('.home__coffe', {delay: 700, distance: '100px', origin: 'right'})
sr.reveal('.home__ingredient', {delay: 1400, interval: 100})
sr.reveal('.about__data, .contact__data', {origin: 'right'})
sr.reveal('.about__img, .contact__image', {origin: 'left'})
sr.reveal('.products__card', {interval: 100})

const loginBtn = document.getElementById("login-btn");
loginBtn.addEventListener("click", () => {
    window.open("Login.html", "_blank");
  });


/*=============== MENU ===============*/
// Sidebar Elements
const cartSidebar = document.getElementById("cart-sidebar");
const closeCartBtn = document.getElementById("close-cart");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalContainer = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");

let cart = []; // Array untuk menyimpan item di cart
let total = 0; // Total harga cart

// Fungsi membuka sidebar
function openCart() {
  cartSidebar.classList.add("active");
}

// Fungsi menutup sidebar
function closeCart() {
  cartSidebar.classList.remove("active");
}

// Event Listener untuk menutup cart
closeCartBtn.addEventListener("click", closeCart);

// Fungsi menambahkan item ke cart
function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    // Jika item sudah ada, tambahkan kuantitasnya
    existingItem.quantity += 1;
  } else {
    // Jika item belum ada, tambahkan item baru ke cart
    cart.push({ name, price: parseFloat(price), quantity: 1 });
  }

  total += parseFloat(price);
  updateCartUI();
  openCart(); // Buka cart setelah menambahkan item
}

// Fungsi memperbarui tampilan cart
function updateCartUI() {
  cartItemsContainer.innerHTML = ""; // Kosongkan cart items sebelumnya

  cart.forEach((item, index) => {
    // Buat elemen cart item
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <div class="item-info">
        <span class="item-name">${item.name}</span>
        <span class="item-quantity">x${item.quantity}</span>
      </div>
      <span class="item-price">Rp ${(item.price * item.quantity).toLocaleString()}</span>
      <button class="remove-item" data-index="${index}">✖</button>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  // Update total harga
  cartTotalContainer.textContent = `Rp ${total.toLocaleString()}`;

  // Tambahkan event listener ke tombol hapus
  document.querySelectorAll(".remove-item").forEach(button => {
    button.addEventListener("click", removeFromCart);
  });
}

// Fungsi menghapus item dari cart
function removeFromCart(event) {
  const itemIndex = event.target.getAttribute("data-index");
  const removedItem = cart[itemIndex];

  // Kurangi total harga
  total -= removedItem.price * removedItem.quantity;
  cart.splice(itemIndex, 1); // Hapus item dari array

  updateCartUI();
}

// Tambahkan event listener ke tombol "Add to Cart"
document.querySelectorAll(".products__button").forEach(button => {
  button.addEventListener("click", () => {
    const name = button.getAttribute("data-name");
    const price = button.getAttribute("data-price");
    addToCart(name, price);
  });
});

// Tombol untuk membuka/menutup cart
const cartBtn = document.getElementById("cart-btn");

// Fungsi toggle cart
function toggleCart() {
  cartSidebar.classList.toggle("active");
}

// Event listener untuk tombol cart
cartBtn.addEventListener("click", toggleCart);

checkoutBtn.addEventListener("click", () => {
    localStorage.setItem("cart", JSON.stringify(cart));
    window.open("checkout.html", "_blank");
  });