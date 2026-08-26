// ============================================
// МОДУЛЬ: data.js
// ОТВЕЧАЕТ: за хранение и управление данными
// ============================================

// ===== 1. МАССИВ КЛИЕНТОВ =====
// Хранит всех клиентов в виде массива объектов
let clients = [];

// ===== 2. ЗАГРУЗКА ИЗ localStorage =====
// При загрузке страницы проверяем, есть ли сохранённые данные
const saved = localStorage.getItem("clients");
if (saved) {
  // Если есть — превращаем строку обратно в массив объектов
  clients = JSON.parse(saved);
}

// ===== 3. ПОЛУЧИТЬ ВСЕХ КЛИЕНТОВ =====
export function getClients() {
  return clients; // Возвращаем массив
}

// ===== 4. ДОБАВИТЬ КЛИЕНТА =====
export function addClient(name, email) {
  // Создаём объект нового клиента
  const newClient = {
    id: Date.now(), // уникальный номер (миллисекунды)
    name: name, // имя
    email: email, // email
    status: "active", // по умолчанию активный
  };

  // Добавляем в массив
  clients.push(newClient);

  // Сохраняем в localStorage (превращаем массив в строку)
  localStorage.setItem("clients", JSON.stringify(clients));

  // Возвращаем обновлённый массив (на всякий случай)
  return clients;
}

// ===== 5. ОБНОВИТЬ КЛИЕНТА =====
export function updateClient(id, newName, newEmail, newStatus) {
  // Ищем клиента по id
  const client = clients.find((client) => client.id === id);

  // Если нашли — обновляем
  if (client) {
    client.name = newName;
    client.email = newEmail;
    client.status = newStatus;

    // Сохраняем изменения
    localStorage.setItem("clients", JSON.stringify(clients));
  }

  return clients;
}

// ===== 6. УДАЛИТЬ КЛИЕНТА =====
export function deleteClient(id) {
  // filter создаёт новый массив без клиента с указанным id
  clients = clients.filter((client) => client.id !== id);

  // Сохраняем изменения
  localStorage.setItem("clients", JSON.stringify(clients));

  return clients;
}
