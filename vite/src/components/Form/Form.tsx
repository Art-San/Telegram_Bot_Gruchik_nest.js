import { useTelegram } from '@/hooks/useTelegram'
import React, { useCallback, useEffect, useState } from 'react'
import { FC } from 'react'

const Form: FC = () => {
  const [data, setData] = useState({
    time: '',
    address: '',
    numMovers: '',
    details: ''
  })

  const [country] = useState('')
  const [street, setStreet] = useState('')
  const [subject, setSubject] = useState('physical')
  const { tg } = useTelegram()

  const onSendData = useCallback(() => {
    const data = {
      country,
      street,
      subject
    }
    tg.sendData(JSON.stringify(data))
  }, [country, street, subject])

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData)
    return () => {
      tg.offEvent('mainButtonClicked', onSendData)
    }
  }, [onSendData])

  useEffect(() => {
    tg.MainButton.setParams({
      text: 'Отправить данные'
    })
  }, [])

  useEffect(() => {
    if (!street || !country) {
      tg.MainButton.hide()
    } else {
      tg.MainButton.show()
    }
  }, [country, street])

  const onChangeStreet = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStreet(e.target.value)
  }

  const onChangeSubject = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSubject(e.target.value)
  }

  const handleChange = ({
    target
  }: {
    target: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  }) => {
    console.log(target.name)
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }
  return (
    <div className=" flex flex-col p-5 w-96 ">
      <input
        className="text-gray-700 p-2.5 mt-3.5 border border-gray-300 rounded-md"
        name="time"
        type="text"
        placeholder={'Время начала заказа:'}
        value={data.time}
        onChange={handleChange}
        maxLength={50}
      />
      <input
        className="text-gray-700 p-2.5 mt-3.5 border border-gray-300 rounded-md"
        name="address"
        type="text"
        placeholder={'Адрес:'}
        value={data.address}
        onChange={handleChange}
        maxLength={50}
      />
      <input
        className="text-gray-700 p-2.5 mt-3.5 border border-gray-300 rounded-md"
        name="numMovers"
        type="number"
        placeholder={'Количество грузчиков: цифрой - 2'}
        value={data.numMovers}
        onChange={handleChange}
        maxLength={5}
      />
      <textarea
        className=" text-gray-700 p-2.5 mt-3.5 border border-gray-300 rounded-md"
        name="details"
        placeholder={'Дополнительная инфа'}
        value={data.details}
        onChange={handleChange}
        maxLength={500}
        rows={3}
      />
      <input
        className=" text-gray-800 p-2.5 mt-3.5"
        name="priceHour"
        type="number"
        placeholder={'Стоимость час'}
        value={street}
        onChange={onChangeStreet}
      />
      <select
        value={subject}
        onChange={onChangeSubject}
        className={'p-2.5 mt-3.5 text-gray-700'}
      >
        <option value={'moving'}>Мебель или вещи</option>
        <option value={'construction'}>Строй мат, мусор</option>
        <option value={'rigging'}>Пианино, сейф</option>
      </select>
    </div>
  )
}

export default Form

// Введите время начала заказа: +
// Введите адрес: +
// Введите количество грузчиков: +
// Введите детали заказа: +
// Введите стоимость час: +
