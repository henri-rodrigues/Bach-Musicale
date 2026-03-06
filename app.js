import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "seu-projeto.firebaseapp.com",
    projectId: "seu-projeto",
    storageBucket: "seu-projeto.appspot.com",
    messagingSenderId: "ID",
    appId: "APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loadProducts(category = null) {
    const productsContainer = document.getElementById('product-carousel');
    productsContainer.innerHTML = '';
    
    let q = collection(db, "produtos");
    if (category) {
        q = query(collection(db, "produtos"), where("categoria", "==", category));
    }

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const p = doc.data();
        const card = `
            <div class="product-card">
                <img src="${p.imageUrl}" alt="${p.nome}">
                <h4>${p.nome}</h4>
                <p>R$ ${p.preco}</p>
                <a href="https://wa.me/5511999999999?text=Olá, tenho interesse no ${p.nome}" class="buy-btn">COMPRAR AGORA</a>
            </div>
        `;
        productsContainer.innerHTML += card;
    });
}

window.filterCategory = (cat) => loadProducts(cat);

document.addEventListener('DOMContentLoaded', () => loadProducts());
