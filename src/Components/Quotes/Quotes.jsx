import React from "react"
import { useState } from "react"
import { quotes } from "../allquotes"

function Quotes() {

    // Определяем текущий месяц и год
let date  = new Date()
const day = date.getDate()
let year  = date.getFullYear()
let month = date.getMonth()
let months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
let nowDay = `${months[month]} ${year}`

const [today, setToday] = useState(day)

// Создаем функцию, которая параметром принимает целое число и создавет массив чисел от 1 до этого числа:
function range(count) {
	let arr = [];
    for(let i = 1; i <= count; i++) {
        arr.push(i);
    }
    return arr
}

// Функция, которая возвращает номер последнего дня месяца:
function getLastDayOfMonth(year, month) {
    // Создаем новую дату на первое число следующего месяца
    let nextMonth = new Date(year, month + 1, 1);
    // Вычитаем один день, чтобы получить последний день текущего месяца
    let lastDay = new Date(nextMonth - 1);
    return lastDay.getDate();
}

// Получаем номер дня недели первого дня месяца
function getFirstWeekDay(year, month) {
    // Создаем новую дату на первое число указанного месяца и года
    let firstDay = new Date(year, month, 1);
    // Получаем номер дня недели (0 - воскресенье, 1 - понедельник, и т.д.)
    let firstWeekDay = firstDay.getDay();
    if (firstWeekDay === 0) {
		return 6;
	} else {
		return firstWeekDay - 1;
	}
}

// / Получаем номер дня недели последнего дня месяца
function getLastWeekDay(year, month) {
    // Создаем новую дату на последнее число указанного месяца и года
    let lastDay = new Date(year, month + 1, 0);
    // Получаем номер дня недели (0 - воскресенье, 1 - понедельник, и т.д.)
    let lastWeekDay = lastDay.getDay();
    // Возвращаем номер дня недели последнего дня месяца
    if (lastWeekDay === 0) {
		return 6;
	} else {
		return lastWeekDay - 1;
	}
}

const arr = range(getLastDayOfMonth(year, month))
const firstWeekDay =  getFirstWeekDay(year, month)
const lastWeekDay = getLastWeekDay(year, month)

function normalize(arr, firstWeekDay, lastWeekDay) {
    let k = ' ';
    for(let i = 1; i <= firstWeekDay; i++) {
        
        arr.unshift(k);
    }
    for(let i = 1; i <= lastWeekDay; i++) {
        arr.push(k);
    }
    return arr;
}

function chunk(arr, n) {
    // Создаем пустой двумерный массив
    let result = [];
    // Перебираем элементы исходного массива
    for (let i = 0; i < arr.length; i += n) {
      // Добавляем подмассивы в результирующий массив
      result.push(arr.slice(i, i + n));
    }
    // Возвращаем полученный двумерный массив
    return result;
}

let nums = chunk(normalize(arr, firstWeekDay, 6 - lastWeekDay), 7)

function getNumOfDay(event) {
    if(event.target.tagName === 'TD') {
        if(event.target.innerHTML === ' ') {
            setToday(day)
        } else {
            setToday(event.target.innerHTML)
        }
    } 
}

function blurDay() {
    setToday(day);
}

const rows = nums.map(function(num, index) {
    return <tr key={index}>{num.map(function(elem, index) {
        return <td className={elem === date.getDate() ? 'active' : elem === ' ' ? '' : 'day'} 
                    key={index + 10} 
                    onClick={(event) => getNumOfDay(event)} 
                    onMouseLeave={blurDay} >{elem}</td>
    })}</tr>
})
    
    return (
        <div className='quotes__wrapper'>
            <header>
                <h1>
                    Цитата на каждый день
                </h1>
            </header>
            <div className="month__year">{nowDay}</div>
            <table>
			    <thead>
			    	<tr>
			    		<th>пн</th>
			    		<th>вт</th>
			    		<th>ср</th>
			    		<th>чт</th>
			    		<th>пт</th>
			    		<th>сб</th>
			    		<th>вс</th>
			    	</tr>
			    </thead>
                <tbody>
                    {rows}
                </tbody>
		    </table>
        <div className="quote">{quotes[month][today]}</div>
        </div>
    )
}

export default Quotes
