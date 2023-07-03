import React from "react";
import imagen1 from "/Recurso 1.svg";
// import imagen2 from "./Recurso 2.svg";
// import imagen3 from "./Recurso 3.svg";
import imagen4 from "/Recurso 4.svg";
import imagen5 from "/Recurso 5.svg";
import imagen6 from "/Recurso 6.svg";
import imagen7 from "/Recurso 7.svg";
// import imagen8 from "./Recurso 8.svg";
// import imagen9 from "./Recurso 9.svg";
import imagen10 from "/Recurso 10.svg";
// import imagen11 from "./Recurso 11.svg";
import imagen12 from "/Recurso 12.svg";
import imagen13 from "/Recurso 13.svg";
// import imagen14 from "./Recurso 14.svg";
import imagen15 from "/Recurso 15.svg";
import imagen16 from "/Recurso 16.svg";
// import imagen17 from "./Recurso 17.svg";
// import imagen18 from "./Recurso 18.svg";
// import imagen19 from "./Recurso 19.svg";
// import imagen20 from "./Recurso 20.svg";
// import imagen21 from "./Recurso 21.svg";
import imagen22 from "/Recurso 22.svg";
// import imagen23 from "./Recurso 23.svg";
import imagen26 from "/Recurso 26.svg";

const ClimateCard = ({ icon, allData, hadleGrades, checkedDark }) => {
  console.log(allData);
  //! Condicion para mostrar una
  //!imagen en svg dependiendo del codigo del icono que evnie la api
  //! no encontre una forma mas dinamica para imprtar las imagenes y hacer las condiciones para mostrar las imagenes
  function iconToDisplay() {
    if (icon == "01d") return imagen1;
    if (icon == "02d") return imagen12;
    if (icon == "03d") return imagen5;
    if (icon == "04d") return imagen6;
    if (icon == "09d") return imagen10;
    if (icon == "10d") return imagen15;
    if (icon == "11d") return imagen7;
    if (icon == "13d") return imagen22;
    if (icon == "50d") return imagen16;
    if (icon == "01n") return imagen13;
    if (icon == "02n") return imagen4;
    if (icon == "03n") return imagen5;
    if (icon == "04n") return imagen6;
    if (icon == "09n") return imagen10;
    if (icon == "10n") return imagen26;
    if (icon == "11n") return imagen7;
    if (icon == "13n") return imagen22;
    if (icon == "50n") return imagen16;
  }

  //! Convertimos los grados Kelvin a Celcius o Centigrado y a  Fahrenheit.

  const Celcius = allData?.main.temp - 273.15;
  const Fahrenheit = ((allData?.main.temp - 273) * 9) / 5 + 32;

  return (
    <>
      <div className="card">
        <div className="card_grade_and_sun">
          <div className="card__image_clima">
            <img src={iconToDisplay()} alt="" />
          </div>
          <div className={checkedDark ? "card__gadre" : 'card__gadreDark '}>
            <h1>{hadleGrades ? Celcius.toFixed(1) : Fahrenheit.toFixed(1)}{hadleGrades ? '°c' : '°f' }</h1>
            <div className={checkedDark ? "card__temp__description" : "card__temp__descriptionDark"}>
              <p>VIENTO <span style={{ marginLeft: '120px' }}/>{allData?.wind.speed} m/s</p>
              <br />
              <p>NUBES<span style={{ marginLeft: '130px' }}/>{allData?.clouds.all} %</p>
              <br />
              <p>PRESION <span style={{ marginLeft: '110px' }}>{allData?.main.pressure} hPa</span></p>
            </div>
          </div>
        </div>
        <div className={checkedDark ? "card_city" :"card_cityDark"}>
          <h2>{allData?.name}, {allData?.sys.country}</h2>
          <p>{allData?.weather[0].description}</p>
        </div>
      </div>
    </>
  );

  //{`https://openweathermap.org/img/wn/${iconToDisplay(icon)}@2x.png`}
};

export default ClimateCard;
