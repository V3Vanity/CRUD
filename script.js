// ============================================
// ГЛАВНЫЙ ФАЙЛ: script.js
// СВЯЗЫВАЕТ: все модули воедино
// ============================================

// ===== 1. ИМПОРТЫ =====
import { addClient, updateClient } from "./modules/data.js";
import { userRender } from "./modules/render.js";
import { counterRecalculation } from "./modules/stats.js";
import { setFilter } from "./modules/filters.js";

// ===== 2. ПЕРВОНАЧАЛЬНЫЙ ЗАПУСК =====
// При загрузке страницы показываем список и статистику
userRender();
counterRecalculation();

// ============================================
// 3. ФОРМА ДОБАВЛЕНИЯ
// ============================================

const form = document.querySelector("#addForm");
const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // отменяем перезагрузку страницы

  // Берём значения из полей и убираем пробелы
  const name = usernameInput.value.trim();
  const email = emailInput.value.trim();

  // Проверяем, что поля не пустые
  if (!name || !email) {
    alert("❌ Заполните все поля!");
    return;
  }

  // Добавляем клиента
  addClient(name, email);

  // Обновляем интерфейс
  userRender();
  counterRecalculation();

  // Очищаем форму и ставим фокус
  form.reset();
  usernameInput.focus();

  console.log("✅ Клиент добавлен!");
});

// ============================================
// 4. МОДАЛКА — СОХРАНЕНИЕ ИЗМЕНЕНИЙ
// ============================================

const modal = document.querySelector("#editModal");
const editName = document.querySelector("#editName");
const editEmail = document.querySelector("#editEmail");
const editStatus = document.querySelector("#editStatus");
const saveEditBtn = document.querySelector("#saveEditBtn");

saveEditBtn.addEventListener("click", () => {
  // Берём новые значения
  const name = editName.value.trim();
  const email = editEmail.value.trim();
  const status = editStatus.value;

  // Проверяем, что поля не пустые
  if (!name || !email) {
    alert("❌ Заполните все поля!");
    return;
  }

  // Обновляем клиента (используем id, сохранённый в window.currentEditId)
  updateClient(window.currentEditId, name, email, status);

  // Закрываем модалку
  modal.style.display = "none";

  // Обновляем интерфейс
  userRender();
  counterRecalculation();

  console.log("✅ Клиент обновлён!");
});

// ============================================
// 5. ФИЛЬТРЫ
// ============================================

// Находим все кнопки фильтров
const filterBtns = document.querySelectorAll(".filter-btn");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Убираем класс active у всех кнопок
    filterBtns.forEach((b) => b.classList.remove("active"));

    // Добавляем класс active нажатой кнопке
    btn.classList.add("active");

    // Получаем тип фильтра из атрибута data-filter
    const filterType = btn.dataset.filter;

    // Сохраняем фильтр
    setFilter(filterType);

    // Перерисовываем список с новым фильтром
    userRender();

    console.log(`🔍 Фильтр: ${filterType}`);
  });
});
