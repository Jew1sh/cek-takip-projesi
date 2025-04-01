let totalAmount = 0;

function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("active");
  document.getElementById("content").classList.toggle("active");
}

function addCheck() {
  const checkNo = document.getElementById("checkNo").value.trim();
  const checkDate = document.getElementById("checkDate").value;
  const amount = parseFloat(document.getElementById("checkAmount").value);

  if (!checkNo || !checkDate || isNaN(amount) || amount <= 0) {
    alert("Lütfen tüm alanları doğru şekilde doldurun!");
    return;
  }

  const checkItem = document.createElement("div");
  checkItem.className = "check-item";
  checkItem.setAttribute("data-checkno", checkNo.toLowerCase());
  checkItem.innerHTML = `
        <input type="checkbox">
        <span>Çek No: ${checkNo}</span>
        <span>Vade: ${new Date(checkDate).toLocaleDateString("tr-TR")}</span>
        <span>Tutar: ${amount.toFixed(2)} ₺</span>
    `;

  document.getElementById("checksList").appendChild(checkItem);
  updateTotal(amount);
  clearInputs();
}

function deleteSelected() {
  const checks = document.querySelectorAll(
    '.check-item input[type="checkbox"]'
  );
  checks.forEach((check) => {
    if (check.checked) {
      const amount = parseFloat(
        check.parentElement
          .querySelector("span:nth-child(4)")
          .textContent.replace("Tutar: ", "")
          .replace(" ₺", "")
      );
      updateTotal(-amount);
      check.parentElement.remove();
    }
  });
  toggleSidebar();
}

function updateTotal(amount) {
  totalAmount += amount;
  document.getElementById("totalAmount").textContent = totalAmount.toFixed(2);
}

function clearInputs() {
  document.getElementById("checkNo").value = "";
  document.getElementById("checkDate").value = "";
  document.getElementById("checkAmount").value = "";
}

function addNewCheck() {
  document.getElementById("checkNo").focus();
  toggleSidebar();
}

// Yeni eklenen arama fonksiyonu
function searchChecks() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const checkItems = document.querySelectorAll(".check-item");

  checkItems.forEach((item) => {
    const checkNo = item.getAttribute("data-checkno");
    if (checkNo.includes(searchTerm)) {
      item.style.display = "grid";
    } else {
      item.style.display = "none";
    }
  });
}
