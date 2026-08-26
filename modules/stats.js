// ============================================
// МОДУЛЬ: stats.js
// ОТВЕЧАЕТ: за обновление счётчиков статистики
// ============================================

import { getClients } from "./data.js";

// ===== 1. НАХОДИМ ЭЛЕМЕНТЫ НА СТРАНИЦЕ =====
// Ищем элементы с id для вставки чисел
const totalCount = document.querySelector("#totalCount");
const activeCount = document.querySelector("#activeCount");
const inactiveCount = document.querySelector("#inactiveCount");

// ===== 2. ПЕРЕСЧИТАТЬ СТАТИСТИКУ =====
export function counterRecalculation() {
  // Получаем свежий список клиентов
  const allClients = getClients();

  // Считаем количество
  const total = allClients.length;
  const active = allClients.filter(
    (client) => client.status === "active",
  ).length;
  const inactive = allClients.filter(
    (client) => client.status === "inactive",
  ).length;

  // Вставляем числа на страницу
  totalCount.textContent = total;
  activeCount.textContent = active;
  inactiveCount.textContent = inactive;
}
