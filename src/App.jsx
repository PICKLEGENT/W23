import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import { faPoop } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

// const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=5c27f4c69a779f7e5c1ce59bd8de4078`

function App() {

    const [data, setData] = useState({})
    const [location, setLocation] = useState('')
    const [currLocation, setCurrLocation] = useState({})

    useEffect(() => {
        getLocation();
    }, []);

    // Запрашиваем город пользователя по IP
    const getLocation = async () => {
        const getIp = 'https://ipapi.co/json';
        await axios.get(getIp).then((res) => {
            setCurrLocation(res.data);
        })
        checkData();
    }

    // Проверка на существование данных
    const checkData = () => {
        currLocation.city ? getCurrLocationWeather() : getLocation();
    }

    // Запрашиваем погоду в городе по данным из IP
    const getCurrLocationWeather = async () => {
        const currURL = `https://api.openweathermap.org/data/2.5/forecast?q=${currLocation.city}&units=metric&lang=ru&appid=5c27f4c69a779f7e5c1ce59bd8de4078`
        await axios.get(currURL).then((responce) => {
            setData(responce.data)
        })
    }

    // API для поиска погоды по городу
    const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&lang=ru&appid=5c27f4c69a779f7e5c1ce59bd8de4078`

    // Поиск при нажатии Enter
    const searchLocation = (e) => {
        if (e.key === 'Enter') {
            axios.get(URL).then((responce) => {
                setData(responce.data)
            })
            setLocation('')
        }
    }

    // Поиск при нажатии на лупу
    const searchBtnPress = () => {
        axios.get(URL).then((responce) => {
            setData(responce.data)
        })
        setLocation('')
    }

    return (
        <div className='wrapper'>
            <div className='container'>
                <div className="brandname">w23</div>
                <div className='left-content'>
                    <div className="search">
                        <div className="search-item">
                            <input type="text" value={location} onChange={e => setLocation(e.target.value)} onKeyPress={searchLocation} placeholder='Город, страна' />
                            <FontAwesomeIcon icon={faMagnifyingGlass} className='search-btn' onClick={searchBtnPress} />
                        </div>
                    </div>
                    <div className="city">
                        {data.city ? <h1>{data.city.name}</h1> : null}
                    </div>
                    <div className="temp">
                        <div className="cur-temp">
                            <div className="tempature">
                                <img src={data.list ? `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png` : null} />
                                {data.list ? <p>{data.list[0].main.temp}&deg;</p> : null}
                            </div>
                            <div className="coords-time">
                                {data.city ? <span>{data.city.coord.lat}&deg;</span> : null}
                                {data.city ? <span>{data.city.coord.lon}&deg;</span> : null}
                            </div>
                        </div>
                        <div className="fills_like-temp">
                            {data.list ? <p>Ощущается как <span className='f-like'>{data.list[0].main.feels_like}&deg;</span></p> : null}
                        </div>
                    </div>
                    <div className="wind-humiditi">
                        <div className="wind">
                            {data.list ? <p>Скорость ветра {data.list[0].wind.speed} км/ч</p> : null}
                        </div>
                        <div className="humiditi">
                            {data.list ? <p>{data.list[0].main.humidity}%</p> : null}
                        </div>
                    </div>
                </div>
                <div className='right-content'>
                    <header>
                        <div className="heading">
                            <div className="heading__national">
                                <span>n</span>
                                <span>a</span>
                                <span>t</span>
                                <span>i</span>
                                <span>o</span>
                                <span>n</span>
                                <span>a</span>
                                <span>l</span>
                            </div>
                            <div className="heading__weather">
                                <span>w</span>
                                <span>e</span>
                                <span>a</span>
                                <span>t</span>
                                <span>h</span>
                                <span>e</span>
                                <span>r</span>
                            </div>
                        </div>
                    </header>
                    <section>
                        <div className="weather-forecast">
                            <div className="weather-forecast__heading">
                                <span>WeatherForecast</span>
                            </div>
                            <div className="forecast">
                                <div className="forecast-description">
                                    {data.list ? <h1>{data.list[0].weather[0].main}</h1> : null}
                                    {data.list ? <span>{data.list[0].weather[0].description}</span> : null}
                                </div>
                                <div className="future-weather">
                                    <div className="future-weater__item">
                                        <div className="time">
                                            {data.list ? <span>{data.list[1].dt_txt}</span> : null}
                                        </div>
                                        <div className="weather-icon">
                                            <img src={data.list ? `https://openweathermap.org/img/wn/${data.list[1].weather[0].icon}@2x.png` : null} />
                                        </div>
                                        <div className="future-temp">
                                            {data.list ? <p>{data.list[1].main.temp}&deg;</p> : null}
                                        </div>
                                    </div>
                                    <div className="future-weater__item">
                                        <div className="time">
                                            {data.list ? <span>{data.list[2].dt_txt}</span> : null}
                                        </div>
                                        <div className="weather-icon">
                                            <img src={data.list ? `https://openweathermap.org/img/wn/${data.list[2].weather[0].icon}@2x.png` : null} />
                                        </div>
                                        <div className="future-temp">
                                            {data.list ? <p>{data.list[2].main.temp}&deg;</p> : null}
                                        </div>
                                    </div>
                                    <div className="future-weater__item">
                                        <div className="time">
                                            {data.list ? <span>{data.list[3].dt_txt}</span> : null}
                                        </div>
                                        <div className="weather-icon">
                                            <img src={data.list ? `https://openweathermap.org/img/wn/${data.list[4].weather[0].icon}@2x.png` : null} />
                                        </div>
                                        <div className="future-temp">
                                            {data.list ? <p>{data.list[3].main.temp}&deg;</p> : null}
                                        </div>
                                    </div>
                                    <div className="future-weater__item">
                                        <div className="time">
                                            {data.list ? <span>{data.list[4].dt_txt}</span> : null}
                                        </div>
                                        <div className="weather-icon">
                                            <img src={data.list ? `https://openweathermap.org/img/wn/${data.list[4].weather[0].icon}@2x.png` : null} />
                                        </div>
                                        <div className="future-temp">
                                            {data.list ? <p>{data.list[4].main.temp}&deg;</p> : null}
                                        </div>
                                    </div>
                                    <div className="future-weater__item">
                                        <div className="time">
                                            {data.list ? <span>{data.list[5].dt_txt}</span> : null}
                                        </div>
                                        <div className="weather-icon">
                                            <img src={data.list ? `https://openweathermap.org/img/wn/${data.list[5].weather[0].icon}@2x.png` : null} />
                                        </div>
                                        <div className="future-temp">
                                            {data.list ? <p>{data.list[5].main.temp}&deg;</p> : null}
                                        </div>
                                    </div>
                                    <div className="future-weater__item">
                                        <div className="time">
                                            {data.list ? <span>{data.list[6].dt_txt}</span> : null}
                                        </div>
                                        <div className="weather-icon">
                                            <img src={data.list ? `https://openweathermap.org/img/wn/${data.list[6].weather[0].icon}@2x.png` : null} />
                                        </div>
                                        <div className="future-temp">
                                            {data.list ? <p>{data.list[6].main.temp}&deg;</p> : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default App
