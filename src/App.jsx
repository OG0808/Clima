import * as React from "react";
import { useState, useEffect, useRef } from "react";
import ClimateCard from "./components/ClimateCard";
import Switch from "@mui/material/Switch";
import axios from "axios";
import "./App.css";

import Loading from "./components/Loading";

function App() {


  const [position, setPosition] = useState('');


  //! loader ----------//
  const [loading, setLoading] = useState(true);

  // const [positionDefoult, setPositionDefoult] = useState('')

  //* manejo y captura de la informacion del input para enviarla a la api y buscar la ciudad selecionada
  const [inputValue, setInputValue] = useState("bogota");

  // const cityDefoult =() => {
  //   if (inputValue === '') {
  //      return 'Bogota'
  //   }
  // }

  const handleInputChange = (event) => {
    setInputValue(event.target.value.trim());
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    setCity(inputValue);
  };
const [city, setCity] = useState("");
  //? logica para el Dark mode -----------------------------------------//
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  //!Estados en general para manejo de peticiones y botones de la interfas grafica

  const [changeGrade, setChangeGrade] = useState(true);

  const changeGrades = () => {
    setChangeGrade(changeGrade == false);
  };

  const [positionDevice, setPositionDivice] = useState();

  const [positionStart, setPositionStart] = useState();

  const iconData = positionStart?.weather[0].icon;

  //! Funcion para obtener la ubicacion del dispositivo de donde se este abriendo la app
  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&appid=61f7f94e8821c4e346c3d9ca5e7cde9e`
      )
      .then((response) => {
        setPositionDivice(response.data);
        setLoading(false);
      })
      .then((error) => console.log(error));

    //? esta funncion es por si queremos tener la ubicacion por defecto del lugar donde estemos como tal
    function success(pos) {
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      };

      setPosition(obj);
    }
    navigator.geolocation.getCurrentPosition(success);
  }, [inputValue]);

  useEffect(() => {
    if (positionDevice) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${positionDevice?.[0].lat}&lon=${positionDevice?.[0].lon}&appid=61f7f94e8821c4e346c3d9ca5e7cde9e`
        )
        .then((response) => {
          setPositionStart(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [loading, city]);

  //! Funcion que retorna depediendo el clima un icono indicado
  //! tomando como referencia la propieda wather del objeto

  return (
    <div className="main">
      {loading && <Loading />}
      <div
        className={checked ? "main__container" : "main__containerDark"}
        id="light"
      >
        <div className="card_search__and__switch">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
            />
          </form>
          <Switch
            checked={checked}
            onChange={handleChange}
            sx={{
              width: 52,
              height: 26,
              padding: 0,
              "& .MuiSwitch-switchBase": {
                padding: 0,
                margin: 0.4,
                transitionDuration: "300ms",
                "&.Mui-checked": {
                  transform: "translateX(25px)",
                  color: checked ? "#53388f" : "#53388f",
                  "& + .MuiSwitch-track": {
                    backgroundColor: checked ? "#fff" : "#53388f",
                    opacity: 1,
                    border: 0,
                  },
                  "&.Mui-disabled + .MuiSwitch-track": {
                    opacity: 0.5,
                  },
                },
                "&.Mui-focusVisible .MuiSwitch-thumb": {
                  color: "#53388f",
                  border: "6px solid #fff",
                },
                "&.Mui-disabled .MuiSwitch-thumb": {
                  color: "#53388f",
                },
                "&.Mui-disabled + .MuiSwitch-track": {
                  opacity: 0.7,
                },
              },
              "& .MuiSwitch-thumb": {
                boxSizing: "border-box",
                width: 20,
                height: 20,
              },
              "& .MuiSwitch-track": {
                borderRadius: 26 / 2,
                backgroundColor: checked ? "#E9E9EA" : "#53388f",
                opacity: 1,
                transition: "background-color 500ms",
              },
            }}
          />
        </div>

        <ClimateCard
          icon={iconData}
          allData={positionStart}
          hadleGrades={changeGrade}
          checkedDark={checked}
        />
        <button
          onClick={changeGrades}
          className={checked ? "change__grades" : "change__gradesDark"}
        >
          {changeGrade ? "Cambiar a °F" : "Cambiar a °C"}
        </button>
      </div>
    </div>
  );
}

export default App;
