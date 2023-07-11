const url = "127.0.0.1:5000";

const cancelButton = document.querySelector(".close");
const price = document.getElementById("productPrice");
const productName = document.getElementById("productName");
const details = document.getElementById("productDetail")

// Get the products from the server
const loadProducts = new Promise((resolve, reject) => {
    fetch('http://127.0.0.1:3000/product/getAll', {
        method: 'GET',
    }
    ).then((res) => {
        if (res.ok) return res.json();
    }).then((data) => {
        const products = JSON.parse(data.data)
        resolve(products);
    }).catch((err) => {
        console.error(err.message);
    })
})

const mapProducts = new Promise(async (resolve, reject) => {
    await loadProducts.then((products) => {
        for (let i = 1; i <= Object.keys(products).length; i++) {

            const Container = document.createElement("div");
            Container.id = "product"
            document.body.appendChild(Container);

            const imageBox = document.createElement("div");
            imageBox.id = "image"
            Container.appendChild(imageBox);

            const image = document.createElement("img");
            image.src = "../public/images/sample_image.png"
            imageBox.appendChild(image);

            const detail = document.createElement("div");
            detail.id = "detail";
            Container.appendChild(detail);

            const list = document.createElement("ul");
            detail.appendChild(list);

            const product_name = document.createElement("li");
            product_name.id = "productName"
            product_name.innerText = products[i].name
            list.appendChild(product_name);

            const product_price = document.createElement("li");
            product_price.id = "productPrice"
            product_price.innerText = "$ " + products[i].priceInCents / 100;
            list.appendChild(product_price);

            const product_detail = document.createElement("li");
            product_detail.id = "productDetail"
            product_detail.innerText = products[i].details;
            list.appendChild(product_detail);

            var button = document.createElement('button');
            button.innerText = 'Pay';
            button.className = 'button';
            button.id = i;
            list.appendChild(button);
        }
    }).then(() => {
        resolve();
    }).catch((err) => {
        console.error(err.message);
    })
})

const initialize = async () => {
    await mapProducts.then(() => {
        const a = document.getElementsByClassName("button");
        return a;
    }).then((a) => {
        for (let i = 0; i < Object.keys(a).length; i++) {
            a[i].addEventListener("click", () => {
                const id = parseInt(a[i].id);
                fetch('http://127.0.0.1:3000/todopay/create-payment-intent', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        items: [
                            { id: id, quantity: 1 },
                        ]
                    })
                }).then(res => {
                    if (res.ok) return res.json();
                    return res.json().then(json => Promise.reject(json));
                }).then(({ url }) => {

                    window.location = url
                }).catch(err => {
                    console.error(err.message);
                })

            })
        }
    })

    //pay(a);

}
// console.log(a);
// listen the buy buttom to perform an action
const pay = (button) => {
    button.addEventListener("click", () => {
        console.log(button.id);
        fetch('http://127.0.0.1:3000/todopay/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: [
                    { id: 1, quantity: 2 },
                ]
            })
        }).then(res => {
            if (res.ok) return res.json();
            return res.json().then(json => Promise.reject(json));
        }).then(({ url }) => {

            window.location = url
        }).catch(err => {
            console.error(err.message);
        })
    }
    )
}


