document.addEventListener('DOMContentLoaded', function () {
  let check = false;

  function changeVal(el) {
    // Fonction pour mettre à jour la valeur totale d'un élément dans le panier
    const qt = parseFloat(el.parentElement.querySelector(".qt").innerHTML);
    const price = parseFloat(el.parentElement.querySelector(".price").innerHTML);
    const eq = Math.round(price * qt * 100) / 100;
    el.parentElement.querySelector(".full-price").innerHTML = eq + ".000 TND";
    changeTotal();			
  }

  function changeTotal() {
    // Fonction pour mettre à jour le total du panier
    let price = 0;
    document.querySelectorAll(".full-price").forEach(function (el) {
      price += parseFloat(el.innerHTML);
    });
    price = Math.round(price * 100) / 100;
    
    const tax = Math.round(price * 0.19 * 100) / 100;
    const shipping = parseFloat(document.querySelector(".shipping span").innerHTML);
    let fullPrice = Math.round((price + tax + shipping) * 100) / 100;

    if (isNaN(fullPrice)) {
      // Si le total n'est pas un nombre (NaN), cela signifie qu'il n'y a pas d'articles
      fullPrice = 0;
    }

    document.querySelector(".subtotal span").innerHTML = price;
    document.querySelector(".tax span").innerHTML = tax;
    document.querySelector(".total span").innerHTML = fullPrice;
  }

  document.querySelectorAll(".remove").forEach(function (button) {
    // Ajout d'un événement "click" sur chaque bouton de suppression
    button.addEventListener('click', function () {
      const el = this;
      el.parentElement.parentElement.classList.add("removed");
      setTimeout(function () {
        el.parentElement.parentElement.remove();
        if (document.querySelectorAll(".product").length === 0) {
          if (check) {
            document.getElementById("cart").innerHTML = "<P1>Votre panier est vide !</p>";
          } else {
            document.getElementById("cart").innerHTML = "<h1>Aucun produit !</h1>";
          }
        }
        changeTotal(); 
      }, 0);
    });
  });

  document.querySelectorAll(".qt-plus").forEach(function (button) {
    // Ajout d'un événement "click" sur chaque bouton d'augmentation de la quantité
    button.addEventListener('click', function () {
      const qtElement = this.parentElement.querySelector(".qt");
      qtElement.innerHTML = parseInt(qtElement.innerHTML) + 1;
      
      this.parentElement.querySelector(".full-price").classList.add("added");
      
      const el = this;
      setTimeout(function () {
        el.parentElement.querySelector(".full-price").classList.remove("added");
        changeVal(el);
      }, 150);
    });
  });

  document.querySelectorAll(".qt-minus").forEach(function (button) {
    // Ajout d'un événement "click" sur chaque bouton de diminution de la quantité
    button.addEventListener('click', function () {
      const qtElement = this.parentElement.querySelector(".qt");
      if (parseInt(qtElement.innerHTML) > 0) {
        qtElement.innerHTML = parseInt(qtElement.innerHTML) - 1;
      }
      this.parentElement.querySelector(".full-price").classList.add("minused");
      changeVal(this);
    });
  });

  document.querySelectorAll(".btn").forEach(function (button) {
    // Ajout d'un événement "click" sur chaque bouton
    button.addEventListener('click', function () {
      check = true;
      document.querySelectorAll(".remove").forEach(function (el) {
        el.click();
      });
    });
  });
});

/*like*/
const likeCounts = {
  button1: 0,
  button2: 0,
  button3: 0,
};

function toggleLike(buttonId) {
  likeCounts[buttonId] += 1;
  updateLikeCount(buttonId);
}

function updateLikeCount(buttonId) {
  const likeCountElement = document.getElementById(`likeCount${buttonId}`);
  if (likeCountElement) {
      likeCountElement.textContent = likeCounts[buttonId].toString();
  } else {
      console.error(`Element with id likeCount${buttonId} not found.`);
  }
}
