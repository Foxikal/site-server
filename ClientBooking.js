import React, { useState } from 'react';

function ClientBooking() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    rentalTime: '',
  });
  const [error, setError] = useState('');
  const [bookings, setBookings] = useState(JSON.parse(localStorage.getItem('bookings') || '[]'));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.rentalTime) {
      setError('Будь ласка, заповніть усі поля.');
      return;
    }
    if (!/^\+?\d{10,12}$/.test(formData.phone)) {
      setError('Будь ласка, введіть коректний номер телефону (10-12 цифр).');
      return;
    }
    setError('');
    const newBooking = { ...formData, id: Date.now(), time: new Date().toLocaleString() };
    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    console.log('Новий запис:', newBooking);
    alert('Клієнт успішно записаний! Перевірте консоль.');
    setFormData({ name: '', phone: '', rentalTime: '' });
  };

  return (
    <div className="client-booking-page">
      <h2>Запис клієнтів</h2>
      <p>Запишіться для оренди комп'ютера. Перегляньте розцінки нижче.</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Ім’я:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Введіть ваше ім’я"
            required
          />
        </div>
        <div>
          <label>Номер телефону:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Введіть номер (наприклад, +380XXXXXXXXX)"
            required
          />
        </div>
        <div>
          <label>Час оренди (години):</label>
          <input
            type="number"
            name="rentalTime"
            value={formData.rentalTime}
            onChange={handleChange}
            placeholder="Введіть кількість годин"
            min="1"
            required
          />
        </div>
        <button type="submit">Записатись</button>
      </form>
      <div className="pricing">
        <h3>Розцінки на оренду комп'ютерів</h3>
        <ul>
          <li>1 година: 100 грн</li>
          <li>3 години: 270 грн (знижка 10%)</li>
          <li>5 годин: 400 грн (знижка 20%)</li>
          <li>Понад 5 годин: 75 грн/година</li>
        </ul>
      </div>
    </div>
  );
}

export default ClientBooking;