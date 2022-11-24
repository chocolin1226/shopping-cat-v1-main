import "bootstrap/dist/css/bootstrap.css"
import "@fortawesome/fontawesome-free/css/all.css"

const emptyCartBtn = document.querySelector(".empty-cart")
const tbody = document.querySelector("tbody")

const cards = document.querySelector(".cards")

const totalPrice = document.querySelector(".total-price")

totalPriceCalc()

emptyCartBtn.addEventListener("click", () => {
  tbody.textContent = ""
  totalPriceCalc()
})

// const removeItemBtn = document.querySelector(".remove-item-btn")
// console.log(removeItemBtn)

tbody.addEventListener("click", (e) => {
  console.log(e.currentTarget)
  // if (e.target.nodeName === "I") {
  //   e.target.parentElement.parentElement.parentElement.remove()
  //   totalPriceCalc()
  // }
})

cards.addEventListener("click", (e) => {
  if (e.target.nodeName === "I") {
    const itemTitle = document.querySelectorAll(".item-title")
    const quantityInput = document.querySelectorAll(".quantity")
    const subtotals = document.querySelectorAll(".subtotal")
    const unitPrices = document.querySelectorAll(".unit-price")
    const index = Object.values(itemTitle).findIndex((el) => {
      return (
        el.innerHTML ===
        e.target.parentElement.previousElementSibling.previousElementSibling
          .textContent
      )
    })
    if (index !== -1) {
      quantityInput[index].value++
      subtotals[index].textContent = `$${
        Math.round(
          unitPrices[index].textContent.split("$")[1] *
            quantityInput[index].value *
            100
        ) / 100
      }`
      totalPriceCalc()
    } else {
      const itemNew = `<tr  class="item">
      <td class="item-title">${e.target.parentElement.previousElementSibling.previousElementSibling.textContent}</td>
      <td>
        <input type="number" class="quantity" value="1" min="1" />
      </td>
      <td class="unit-price" >${e.target.parentElement.previousElementSibling.textContent}</td>
      <td class="subtotal" >${e.target.parentElement.previousElementSibling.textContent}</td>
      <td>
        <button class="remove-item-btn btn btn-danger btn-sm">
          <i class="fas fa-trash-alt"></i>
        </button>
      </td>
    </tr>`
      tbody.insertAdjacentHTML("afterbegin", itemNew)
      totalPriceCalc()
    }
  }
})

tbody.addEventListener("change", (e) => {
  if (e.target.nodeName === "INPUT") {
    e.target.parentElement.nextElementSibling.nextElementSibling.textContent = `$${
      Math.round(
        Number(e.target.value) *
          Number(
            e.target.parentElement.nextElementSibling.textContent.split("$")[1]
          ) *
          100
      ) / 100
    }`
  }

  totalPriceCalc()
})

function totalPriceCalc() {
  const subtotals = document.querySelectorAll(".subtotal")
  const subtotalsCalc = Object.values(subtotals).reduce((acc, el) => {
    return acc + Number(el.innerHTML.split("$")[1])
  }, 0)
  totalPrice.textContent = `$${Math.round(subtotalsCalc * 100) / 100}`
}
