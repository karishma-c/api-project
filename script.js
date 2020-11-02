const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = "./asset/images/logo.png";

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);

var request = new XMLHttpRequest();
request.open('GET', 'http://makeup-api.herokuapp.com/api/v1/products.json', true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status <= 600) {
    data.forEach(product => {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const h1 = document.createElement('h1');
      h1.textContent = product.name;

      const p = document.createElement('p');
      product.description = product.description.substring(0, 100);
      p.textContent = `${product.description}...`;

      const type = document.createElement('div');
      type.setAttribute('class', 'content');

      const h5 = document.createElement('h5');
      h5.setAttribute('class', 'category');
      h5.textContent = `${product.category}...`;

      const h6 = document.createElement('h6');
      h6.setAttribute('class', 'product-type');
      h6.textContent = product.product_type;

      const small = document.createElement('small');
      small.setAttribute('class', 'price');
      small.textContent = `${product.price_sign} ${product.price}`;
      
      type.appendChild(h5);
      type.appendChild(h6);
      type.appendChild(small);
      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      card.appendChild(type);
      
    });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `OOPS!...Something went wrong`;
    app.appendChild(errorMessage);
  }
}

request.send();