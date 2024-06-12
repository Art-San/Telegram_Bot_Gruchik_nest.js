export const validDay = (type: string) => {
  const days = {
    today: 'Сегодня',
    yesterday: 'Вчера',
    last7Days: 'Последние 7 дней'
  }

  // Использование type assertion для указания, что type является ключом объекта days
  return (
    <div className="flex gap-1">{days[type as keyof typeof days] || 'х.з'}</div>
  )
}

enum DayType {
  Today = 'today',
  Yesterday = 'yesterday',
  Last7Days = 'last7Days'
}

export const validType2 = (type: DayType) => {
  const days = {
    [DayType.Today]: 'Сегодня',
    [DayType.Yesterday]: 'Вчера',
    [DayType.Last7Days]: 'Последние 7 дней'
  }

  return <div className="flex gap-1">{days[type]}</div>
}

type DayType1 = 'today' | 'yesterday' | 'last7Days'
export const validType1 = (type: DayType1) => {
  const days = {
    today: 'Сегодня',
    yesterday: 'Вчера',
    last7Days: 'Последние 7 дней'
  }

  return <div className="flex gap-1">{days[type]}</div>
}
