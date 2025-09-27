window.Model = {
    _id: 1,
    productos: [], // aqui se espera { id, name, price}
    carrinho: [], // aqui se espera { id, name, price, qty}

    //metodo Adicionar producto
    adicionarProduto(name, price) {
        const prod = {
            id: this._id++,
            name,
            price: Number(price)
        };
        this.productos.push(prod);
        return prod;
    },

    // Metodo listar produtos existentes
    listarProdutos() {
        return [...this.productos];
    },

    // Metodo para adicionar ao carrinho
    adicionarAoCarrinho(prodId) {
        const p = this.productos.find(x => x.id === prodId)
        if (!p) return;
        const linhaCarrinho = this.carrinho.find(x => x.id === prodId);
        if (linhaCarrinho) {
            // caso o item já esteja no carrinho, somente fará o incremento do mesmo
            linhaCarrinho.qty += 1;
        } else {
            // cc irá adicionar
            this.carrinho.push({
                id: p.id,
                name: p.name,
                price: p.price,
                qty: 1
            })
        }
    },

    // Apagar item do carrinho
    removerDoCarrinho(prodId) {
        const item = this.carrinho.findIndex(x => x.id === prodId)
        if (item >= 0) this.carrinho.splice(item, 1);
    },

    limparCarrinho() {
        this.carrinho = [];
    },

    // Trocar a qty de itens existentes.
    mudarQty(prodId, q) {
        const item = this.carrinho.find(x => x.id === prodId);
        if (!item) return;
        item.qty += q;
        if (item.qty <= 0) this.removerDoCarrinho(prodId)
    },

    totalCarrinho() {
        const quantidade = this.carrinho.reduce((s, item) => s + item.qty, 0);
        const total = this.carrinho.reduce((s, item) => s + item.qty * item.price, 0);
        return {
            quantidade, total
        }
    }

}