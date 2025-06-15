import React, { useState } from 'react';

function Register() {
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
    console.log('Форма відправлена:', formData);
    alert('Реєстрація успішна! Перевірте консоль для деталей.');
    // Тут можна додати відправку на сервер
  };

  return (
    <div className="register-page">
      <h2>Форма для реєстрації</h2>
      <p>Зареєструйтесь, щоб отримати доступ до нашого ігрового сервера!</p>
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
  );
}

export default Register;