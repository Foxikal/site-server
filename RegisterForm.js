import React, { useState } from 'react';

function RegisterForm({ onClose, onRegister }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agreeTerms: false,
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.agreeTerms) {
      setError('Будь ласка, заповніть усі поля та погодьтесь з умовами.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Будь ласка, введіть коректну електронну пошту.');
      return;
    }
    setError('');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(formData);
    localStorage.setItem('users', JSON.stringify(users));
    // Зберігаємо поточного користувача
    localStorage.setItem('currentUser', JSON.stringify(formData));
    console.log('Форма відправлена та збережена:', formData);
    onRegister(formData); // Передаємо дані в App
    onClose();
  };

  return (
    <div className="register-form-overlay">
      <div className="register-form">
        <h2>Вхід/Реєстрація</h2>
        <button className="close-button" onClick={onClose}>
          ×
        </button>
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
            <label>Електронна пошта:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Введіть вашу електронну пошту"
              required
            />
          </div>
          <div>
            <label>Пароль:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Введіть пароль"
              required
            />
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
              /> Погоджуюсь з умовами використання
            </label>
          </div>
          <button type="submit">Зареєструватись</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;