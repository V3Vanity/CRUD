// ============================================
// МОДУЛЬ: render.js
// ОТВЕЧАЕТ: за отрисовку карточек клиентов
// ============================================

import { getClients, deleteClient } from "./data.js";
import { counterRecalculation } from "./stats.js";
import { getFilter, setFilter } from "./filters.js";

// ===== 1. ТЕКУЩИЙ ФИЛЬТР (хранится здесь) =====
// Импортируем getFilter() и setFilter() из filters.js

// ===== 2. ОТРИСОВКА ВСЕХ КАРТОЧЕК =====
export function userRender() {
  // Находим контейнер на странице
  const usersList = document.querySelector("#usersList");

  // Очищаем его (чтобы не было дублей)
  usersList.innerHTML = "";

  // ===== 3. ПОЛУЧАЕМ ДАННЫЕ =====
  const allClients = getClients(); // все клиенты
  const currentFilter = getFilter(); // текущий фильтр

  // ===== 4. ФИЛЬТРУЕМ КЛИЕНТОВ =====
  let filteredClients = allClients; // по умолчанию — все

  if (currentFilter === "active") {
    // Оставляем только активных
    filteredClients = allClients.filter((client) => client.status === "active");
  } else if (currentFilter === "inactive") {
    // Оставляем только неактивных
    filteredClients = allClients.filter(
      (client) => client.status === "inactive",
    );
  }
  // Если 'all' — оставляем всех (ничего не делаем)

  // ===== 5. ПРОВЕРЯЕМ, ЕСТЬ ЛИ КЛИЕНТЫ =====
  if (filteredClients.length === 0) {
    // Если нет клиентов — показываем сообщение
    usersList.innerHTML =
      '<p class="empty-message">Нет клиентов. Добавьте первого!</p>';
    return; // выходим, дальше не идём
  }

  // ===== 6. СОЗДАЁМ КАРТОЧКИ ДЛЯ КАЖДОГО КЛИЕНТА =====
  filteredClients.forEach((client) => {
    // Создаём блок карточки
    const card = document.createElement("div");
    card.classList.add("card");

    // ===== 7. ТЕКСТ СТАТУСА =====
    const statusText =
      client.status === "active" ? "🟢 Активен" : "🔴 Не активен";

    // ===== 8. ВСТАВЛЯЕМ HTML В КАРТОЧКУ =====
    card.innerHTML = `
      <div class="card-header">
        <span class="card-name">${client.name}</span>
        <span class="card-status-badge ${client.status}">${statusText}</span>
      </div>
      <p class="card-email"> ${client.email}</p>
      <div class="card-actions">
        <button class="card-update" data-id="${client.id}">Редактировать</button>
        <button class="card-delete" data-id="${client.id}">Удалить</button>
      </div>
    `;

    // Добавляем карточку в контейнер
    usersList.appendChild(card);

    // ============================================
    // 9. ОБРАБОТЧИК: РЕДАКТИРОВАНИЕ
    // ============================================
    const modal = document.querySelector("#editModal");
    const buttonUpdate = card.querySelector(".card-update");

    buttonUpdate.addEventListener("click", () => {
      // Показываем модалку
      modal.style.display = "block";

      // Сохраняем id клиента в глобальную переменную (для script.js)
      window.currentEditId = client.id;

      // Находим поля в модалке
      const editName = document.querySelector("#editName");
      const editEmail = document.querySelector("#editEmail");
      const editStatus = document.querySelector("#editStatus");

      // Заполняем поля данными клиента
      editName.value = client.name;
      editEmail.value = client.email;
      editStatus.value = client.status;
    });

    // ============================================
    // 10. ОБРАБОТЧИК: УДАЛЕНИЕ
    // ============================================
    const deleteBtn = card.querySelector(".card-delete");

    deleteBtn.addEventListener("click", () => {
      // Находим модалку подтверждения
      const deleteModal = document.querySelector("#deleteModal");
      const deleteMessage = document.querySelector("#deleteMessage");
      const confirmDeleteBtn = document.querySelector("#confirmDeleteBtn");
      const cancelDeleteBtn = document.querySelector("#cancelDeleteBtn");
      const closeDeleteModalBtn = document.querySelector(
        "#closeDeleteModalBtn",
      );

      // Вставляем имя клиента в сообщение
      deleteMessage.textContent = `Вы уверены, что хотите удалить клиента "${client.name}"?`;

      // Показываем модалку
      deleteModal.style.display = "flex";

      // Убираем старые обработчики (чтобы не накапливались)
      confirmDeleteBtn.onclick = null;
      cancelDeleteBtn.onclick = null;
      closeDeleteModalBtn.onclick = null;
      deleteModal.onclick = null;

      // ===== КНОПКА "УДАЛИТЬ" =====
      confirmDeleteBtn.onclick = () => {
        deleteClient(client.id); // удаляем из массива
        userRender(); // перерисовываем список
        counterRecalculation(); // обновляем статистику
        deleteModal.style.display = "none"; // закрываем модалку
      };

      // ===== КНОПКА "ОТМЕНА" =====
      const closeDelete = () => {
        deleteModal.style.display = "none";
      };

      cancelDeleteBtn.onclick = closeDelete;
      closeDeleteModalBtn.onclick = closeDelete;

      // ===== ЗАКРЫТИЕ ПО КЛИКУ НА ФОН =====
      deleteModal.onclick = (e) => {
        if (e.target === deleteModal) {
          deleteModal.style.display = "none";
        }
      };
    });
  });

  // ============================================
  // 11. ЗАКРЫТИЕ МОДАЛКИ РЕДАКТИРОВАНИЯ
  // ============================================
  const modal = document.querySelector("#editModal");
  const closeBtn = document.querySelector("#closeEditBtn");
  const closeModalBtn = document.querySelector("#closeModalBtn");

  // По кнопке "Отмена"
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // По крестику (если есть)
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  // По клику на фон
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}
