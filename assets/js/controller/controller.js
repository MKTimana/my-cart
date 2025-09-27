window.Controller = {
    init() {
        this.form = document.getElementById('productRegister');
        this.inputName = document.getElementById('prodName');
        this.inputPrice = document.getElementById('prodPrice');
        this.checkout = document.getElementById('checkoutBtn')

        this.form.addEventListener('submit', this.onAdicionarProduto.bind(this));

        View.elements.prodList.addEventListener('click', (e) => {
            const btn = e.target.closest('button[data-action="adicionar-ao-carrinho"]');

            if (!btn) return;

            const id = Number(btn.dataset.id);
            Model.adicionarAoCarrinho(id)
            this.refresh();
        });

        View.elements.cartItems.addEventListener('click', (e) => {
            const btn = e.target.closest('button[data-action]');
            if (!btn) return

            const id = Number(btn.dataset.id);
            const act = btn.dataset.action

            if (act === 'aumentar') Model.mudarQty(id, +1);
            if (act === 'diminuir') Model.mudarQty(id, -1);
            if (act === 'remover') Model.removerDoCarrinho(id);

            this.refresh();
        });

        this.checkout.addEventListener('click', () => {
            if (confirm('Deseja terminar a compra?')) {
                Model.limparCarrinho();
                this.refresh();
            }
        })

        Model.adicionarProduto('Caderno', 120);
        Model.adicionarProduto('Caneta', 35.5);
        Model.adicionarProduto('Mochila', 850);

        this.refresh();
    },

    onAdicionarProduto(e) {
        e.preventDefault()

        const nome = this.inputName.value.trim();
        const preco = Number(this.inputPrice.value);

        if (!nome) {
            View.mostrarMsgErro('Por favor insira o nome do produto!');
            return;
        }

        if (!Number.isFinite(preco) || preco < 0) {
            View.mostrarMsgErro('Preço inválido!');
            return;
        }
        Model.adicionarProduto(nome, preco);

        this.inputName.value = '';
        this.inputPrice.value = '';
        this.inputName.focus();

        this.refresh();
    },

    refresh(){
        View.renderProdutos(Model.listarProdutos());
        View.renderCarrinho(Model.carrinho, Model.totalCarrinho());
    }
}