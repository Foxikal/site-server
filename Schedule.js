import React from 'react';

function Schedule() {
  const scheduleData = [
    { day: 'Понеділок', time: '18:00 - 20:00', event: 'Турнір 1v1' },
    { day: 'Середа', time: '19:00 - 21:00', event: 'Командний матч' },
    { day: 'П’ятниця', time: '20:00 - 22:00', event: 'Тренування новачків' },
    { day: 'Неділя', time: '17:00 - 19:00', event: 'Великий турнір' },
  ];

  return (
    <div className="schedule-page">
      <h2>Розклад подій</h2>
      <p>Ось графік основних ігрових подій та активностей на нашому сервері. Перегляньте розклад і приєднуйтесь!</p>
      <table>
        <thead>
          <tr>
            <th>День</th>
            <th>Час</th>
            <th>Подія</th>
          </tr>
        </thead>
        <tbody>
          {scheduleData.map((item, index) => (
            <tr key={index}>
              <td>{item.day}</td>
              <td>{item.time}</td>
              <td>{item.event}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Schedule;