<!--
1.先將每個區塊都分好-
2.-@click="showCart = true"如果點擊icon 是true就顯示 ,商品的部分用v-for :key="product.id"
<button type="button" class="btn btn-primary" @click="selectProduct(product)"-將選中正在考慮的(商品)放入購物車
輸入框:<input type="text" class="form-control text-center" v-model.number="quantity" 將輸入的值轉為數字
3.減少、移除會指定哪個商品要加參數去處理 
--->

<template>

    <div id="app" class="container mt-4">

        <div class="d-flex justify-content-between align-items-center">
            <h2>精選商品</h2>


            <button type="button" class="btn btn-secondary" @click="showCart = true" data-bs-toggle="modal"
                data-bs-target="#cartModal">
                <!-- 使用 Font Awesome icon顯示購物車 -->
                <i class="fa-solid fa-cart-shopping"></i>
            </button>
        </div>

        <!-- 商品展示區域 -->

        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            <div v-for="product in products" :key="product.id">
                <div class="card">
                    <img :src="product.image" class="card-img-top" :alt="product.name" />
                    <div class="card-body">
                        <h5 class="card-title">{{ product.name }}</h5>
                        <p class="card-text">價格: NT${{ product.price }}</p>
                        <button type="button" class="btn btn-primary" @click="selectProduct(product)"
                            data-bs-toggle="modal" data-bs-target="#productModal">
                            加入購物車
                        </button>
                    </div>
                </div>
            </div>
        </div>


        <!-- 加入購物車的model -->
        <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="productModalLabel">加入購物車</h5>
                        <!-- 關閉model框按鈕 -->
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <!-- 顯示選中的產品名稱和價格 -->
                        <h5>{{ selectedProduct.name }}</h5>
                        <p>價格: NT${{ selectedProduct.price }}</p>
                        <!-- 輸入購買數量 -->
                        <div class="mb-3">
                            <label for="quantity" class="col-form-label">數量:</label>
                            <div class="input-group">
                                <!-- 減少數量按鈕 -->
                                <button class="btn btn-outline-secondary" type="button"
                                    @click="decreaseQuantity">-</button>
                                <!-- 顯示當前數量 -->
                                <input type="text" class="form-control text-center" v-model.number="quantity"
                                    readonly />
                                <!-- 增加數量按鈕 -->
                                <button class="btn btn-outline-secondary" type="button"
                                    @click="increaseQuantity">+</button>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <!-- 確定按鈕 -->
                        <button type="button" class="btn btn-primary" @click="addToCart" data-bs-dismiss="modal">
                            確定
                        </button>
                        <!-- 取消按鈕 -->
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 購物車視窗 -->
        <div class="modal fade" id="cartModal" tabindex="-1" aria-labelledby="cartModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="cartModalLabel">購物車</h5>
                        <!-- 關閉視窗按鈕 -->
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <!-- 列出購物車中的每個商品 -->
                        <ul class="list-group">
                            <!-- 使用 v-for 渲染每個購物車項目 -->
                            <li v-for="item in cart" :key="item.product.id" class="list-group-item">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6>{{ item.product.name }}</h6>
                                        <p>單價: NT${{ item.product.price }}</p>
                                        <!-- 顯示商品數量--->
                                        <div class="input-group input-group-sm">
                                            <!-- 減少數量按鈕 -->

                                            <button class="btn btn-outline-secondary btn-sm" type="button"
                                                @click="decreaseQuantity(item)">
                                                -
                                            </button>

                                            <!-- 顯示當前數量 -->
                                            <input type="text" class="form-control text-center"
                                                v-model.number="item.quantity" readonly />
                                            <!-- 增加數量按鈕 -->
                                            <button class="btn btn-outline-secondary btn-sm" type="button"
                                                @click="item.quantity++">+</button>
                                        </div>
                                    </div>
                                    <!-- 移除按鈕 -->
                                    <button class="btn btn-danger btn-sm" @click="remove(item.product.id)">移除</button>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="modal-footer">
                        <!-- 關閉按鈕 -->
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
                        <!-- 結帳按鈕 -->
                        <button type="button" class="btn btn-primary" @click="checkout">結帳</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

            products: [
                { id: 1, name: '迷你單朵小香花束', price: 680, image: 'https://picsum.photos/seed/picsum/150/150' },
                { id: 2, name: '單隻永生玫瑰', price: 680, image: 'https://picsum.photos/seed/picsum/150/150' },
                { id: 3, name: '永生花水氧機-薰衣草紫', price: 680, image: 'https://picsum.photos/seed/picsum/150/150' },
                { id: 4, name: '單隻永生玫瑰', price: 680, image: 'https://picsum.photos/seed/picsum/150/150' },
                { id: 5, name: '永生花水氧機-薰衣草紫', price: 680, image: 'https://picsum.photos/id/237/150/150' },
                { id: 6, name: '迷你單朵小香花束', price: 680, image: 'https://picsum.photos/id/237/150/150' },
                { id: 7, name: '迷你單朵小香花束', price: 680, image: 'https://picsum.photos/id/237/150/150' },
                { id: 8, name: '迷你單朵小香花束', price: 680, image: 'https://picsum.photos/id/237/150/150' },
            ],
            selectedProduct: {},  //正在考慮但尚未決定的商品。是一個暫時性的存放,先放入我的珍藏裡。
            quantity: 1,          // 選擇的數量
            cart: [],            // 購物車中的商品決定要購入的商品
            showCart: false      // 是否顯示購物車視窗
        };
    },
    created() {
        let tmpData = JSON.parse(localStorage.getItem('cart'));
        if(tmpData != null){
            this.cart = tmpData;
        }
    },
    methods: {

        //想像，在網頁上選擇產品並設定數量。先選中一個感興趣的項目，


        selectProduct(product) {
            this.selectedProduct = product; /*這個商品存放到指定的這個珍藏裡賦值給this.selectedProduct。*/
            this.quantity = 1;/*然後設定一個預設數量，*/
        },
        // 增加數量
        increaseQuantity() {
            this.quantity++;
        },
        // 減少數量  //因為減少數量會指定哪個商品要減少所以要設參數
        decreaseQuantity(item) {
            if (item.quantity > 1) {
                // 如果數量大於 1，則減少數量
                item.quantity--;
            } else {
                // 如果數量為 1，則移除該項目
                this.remove(item.product.id);
            }
        },
        // 將選中的產品加入購物車
        addToCart() {
            //
            const productInCart = this.cart.find(item => item.product.id === this.selectedProduct.id);
            if (productInCart) {
                //添加的數量加到 購物車中該商品目前的數量 
                productInCart.quantity += this.quantity;
            } else {
                this.cart.push({ product: this.selectedProduct, quantity: this.quantity });/*參數:this.*/
            }
           localStorage.setItem('cart',JSON.stringify(this.cart));
        },
        // 從購物車中移除產品是指因為移除商品會指定所以先設一個參數假如要移除的id跟參數一樣就移除
        //假如要移除a 那麼項目中的商品 是否等於要移除的a 如果等於就移除不等於就保留

        remove(productId) {
            //刪除螢幕當前的購物車暫存
            //新增信的購物車暫存
            this.cart = this.cart.filter(item => item.product.id !== productId);
            // localStorage.removeItem('cart');
            if (this.cart.length != 0) {
                localStorage.setItem('cart', JSON.stringify(this.cart));
            }
        },
        checkout() {
            alert('結帳成功！');
            this.cart = [];
            localStorage.removeItem('cart');
        }
    }
};
</script>

<style>
#app {
    text-align: center;
}


.mt-4 h2 {
    margin-bottom: 40px;
}


.d-flex {
    display: flex;

    justify-content: space-between;

    align-items: center;

}

/* 購物車按鈕樣式 */
.btn-secondary {
    font-size: 1.5rem;

    background-color: transparent;

    border: none;

    cursor: pointer;

}

/* 手機版樣式 */
@media (max-width: 576px) {
    .btn-secondary {
        font-size: 1.2rem;

    }
}

/* 平板版樣式 */
@media (min-width:768px) and (max-width: 992px) {
    .btn-secondary {
        font-size: 1.4rem;

    }
}

/* 桌機版樣式 */
@media (min-width: 992px) {
    .btn-secondary {
        font-size: 1.5rem;

    }
}


.card {
    display: flex;
    flex-direction: column;
    height: 100%;
    /* 使卡片高度占據容器的全高 */
    border: 1px solid #ddd;
    border-radius: .25rem;

    box-sizing: border-box;
    /* 設置固定高度或最小高度 */
    min-height: 500px;
}


.card-img-top {
    width: 100%;
    height: 200px;
    object-fit: cover;
    /* 讓圖片適應容器 */
}


.card-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    flex: 1;
    /* 使內容區域占據剩餘空間 */
}

/* 確保按鈕區域在底部對齊 */
.card-body .btn {
    margin-top: auto;
    /* 使按鈕在卡片底部 */
}
</style>