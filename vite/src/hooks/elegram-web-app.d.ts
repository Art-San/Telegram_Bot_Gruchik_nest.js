declare global {
  interface Window {
    Telegram: {
      WebApp: {
        // Здесь добавьте необходимые поля и методы
        close: () => void
        MainButton: {
          isVisible: boolean
          show: () => void
          hide: () => void
        }
        initDataUnsafe: {
          user: any // Замените `any` на более конкретный тип, если известен
          query_id: any // Замените `any` на более конкретный тип, если известен
        }
      }
    }
  }
}
