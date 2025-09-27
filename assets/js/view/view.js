window.View = {
    // Aqui estão as variaveis que sao obtidas pelo HTML
    elements: {
        prodList: document.getElementById('prodList'),
        prodEmpty: document.getElementById('prodEmpty'),
        registerError: document.getElementById('registerError'),

        cartItems: document.getElementById('cartItems'),
        cartEmpty: document.getElementById('cartEmpty'),
        cartQty: document.getElementById('cartQty'),
        cartTotal: document.getElementById('cartTotal'),
    },

    mostrarMsgErro(msg) {
        this.elements.registerError.textContent = msg || '';
    },

    renderProdutos(produtos) {
        const { prodList, prodEmpty } = this.elements;
        prodList.innerHTML = '';
        prodEmpty.style.display = produtos.length ? 'none' : 'block'

        produtos.forEach(p => {
            const li = document.createElement('li');
            li.innerHTML = `
            <div>
                <strong>${p.name}</strong>
                <div class="price">Preço: ${this.formatoMZN(p.price)}</div>
            </div>
            <div>
                <button class="btn add" data-action="adicionar-ao-carrinho" data-id="${p.id}">
                Adicionar ao carrinho</button>
            </div>
            `;
            prodList.appendChild(li)
        })
    },

    renderCarrinho(carrinho, totais) {
        const { cartItems, cartEmpty, cartQty, cartTotal } = this.elements;

        cartItems.innerHTML = '';
        cartEmpty.style.display = carrinho.length ? 'none' : 'block'

        carrinho.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
            <div>
                <strong>${item.name}</strong>
                <div class="price">
                    ${item.qty} × ${this.formatoMZN(item.price)} = <strong>${this.formatoMZN(item.qty * item.price)}</strong>
                </div>
            </div>
            <div class="right">
                <button class="btn sm" data-id="${item.id}" data-action="diminuir">-</button>
            <button class="btn sm" data-id="${item.id}" data-action="aumentar">+</button>
            <button class="btn sm" data-id="${item.id}" data-action="remover">x</button>
            </div>
            
            `;
            cartItems.appendChild(li)
        })
        const { quantidade, total } = totais
        cartQty.textContent = `${quantidade} item${quantidade === 1 ? '' : 's'}`
        cartTotal.textContent = `Total: ${this.formatoMZN(total)}`
    },

    formatoMZN(n) {
        return Number(n).toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })
    }
}