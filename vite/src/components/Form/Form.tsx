import { useTelegram } from '@/hooks/useTelegram'
import React, { useCallback, useEffect, useState } from 'react'
import { FC } from 'react'

const Form: FC = () => {
  const [data, setData] = useState({
    startTime: '',
    numExecutors: 1,
    typeWork: 'moving',
    address: '',
    text: '',
    hourCost: 450
  })

  const { tg } = useTelegram()
  console.log(11, tg)

  const onSendData = useCallback(() => {
    const formattedData = {
      ...data,
      numExecutors: +data.numExecutors,
      hourCost: Number(data.hourCost) // Преобразование в число
    }
    tg.sendData(JSON.stringify(formattedData))
  }, [tg, data])

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData)
    return () => {
      tg.offEvent('mainButtonClicked', onSendData)
    }
  }, [onSendData])

  useEffect(() => {
    tg.MainButton.setParams({
      text: 'Отправить заявку'
    })
  }, [])

  useEffect(() => {
    if (
      !data.startTime ||
      !data.address ||
      !data.numExecutors ||
      !data.text ||
      !data.hourCost
    ) {
      tg.MainButton.hide()
    } else {
      tg.MainButton.show()
    }
  }, [
    data.startTime,
    data.address,
    data.numExecutors,
    data.text,
    data.hourCost,
    tg
  ])

  const handleChange = ({
    target
  }: {
    target: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }
  return (
    <div className=" flex flex-col p-5 w-96 ">
      <input
        className="text-gray-700 p-2.5 mt-3.5 border border-gray-300 rounded-md"
        name="startTime"
        type="text"
        placeholder={'Время начала заказа:'}
        value={data.startTime}
        onChange={handleChange}
        maxLength={50}
      />
      <input
        className="text-gray-700 p-2.5 mt-3.5 border border-gray-300 rounded-md"
        name="numExecutors"
        type="number"
        placeholder={'Количество грузчиков: цифрой - 2'}
        value={data.numExecutors}
        onChange={handleChange}
        maxLength={5}
      />
      <select
        className="text-gray-700 p-2.5 mt-3.5 border border-gray-300 rounded-md"
        name="typeWork"
        value={data.typeWork}
        onChange={handleChange}
        // className={'p-2.5 mt-3.5 text-gray-700'}
      >
        <option value={'moving'}>Мебель или вещи</option>
        <option value={'construction'}>Строй мат, мусор</option>
        <option value={'rigging'}>Пианино, сейф</option>
      </select>
      <input
        className="text-gray-700 p-2.5 mt-3.5 border border-gray-300 rounded-md"
        name="address"
        type="text"
        placeholder={'Адрес:'}
        value={data.address}
        onChange={handleChange}
        maxLength={50}
      />

      <textarea
        className=" text-gray-700 p-2.5 mt-3.5 border border-gray-300 rounded-md"
        name="text"
        placeholder={'Дополнительная инфа'}
        value={data.text}
        onChange={handleChange}
        maxLength={500}
        rows={3}
      />

      <input
        className=" text-gray-800 p-2.5 mt-3.5 border border-gray-300 rounded-md"
        name="hourCost"
        type="number"
        placeholder={'Стоимость час'}
        value={data.hourCost}
        onChange={handleChange}
      />
    </div>
  )
}

export default Form

// Введите время начала заказа: +
// Введите адрес: +
// Введите количество грузчиков: +
// Введите детали заказа: +
// Введите стоимость час:
