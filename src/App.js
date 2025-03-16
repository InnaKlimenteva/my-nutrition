import { useState } from "react";
import { useEffect } from "react";
import { Nutrition } from "./Nutrition";
import { LoaderPage } from "./LoaderPage";
import './App.css';
import Swal from "sweetalert2";



function App() {

  const [mySearch, setMySearch] = useState('');  //откликается input
  const [wordSubmitted, setWordSubmitted] = useState(''); //финальный поиск по слову
  const [myNutrition, setMyNutrition] = useState();
  const [stateLoader, setStateLoader] = useState(false); //лоадер
  const [bgState, setBgState] = useState(true); //меняется бэеграунд

  const APP_ID = 'dc43f5c9';
  const APP_KEY = '41004f36187693a52846881269bea7f0';
  const APP_URL = 'https://api.edamam.com/api/nutrition-details'

  const fetchData = async (ingr) => {
    setStateLoader(true);
    setBgState(false);
    const response = await fetch(`${APP_URL}?app_id=${APP_ID}&app_key=${APP_KEY}`, {
      method: "POST",    //метод запроса
      headers: {
        'Accept': 'application/json', 
        'Content-Type': 'application/json', //тип данных
      },
      body: JSON.stringify({ ingr: ingr }) //преобразуем обьект в json
    })

    if(response.ok) {
      setStateLoader(false);
      const data = await response.json();
      setMyNutrition(data);
    } else {
      setStateLoader(false);
      (
        Swal.fire({
          title: "Please, text your product correctly", 
          text: "🍏 Example: '1 apple' "
  
        })
      );
    }
  }
  
  

  const myRecipeSearch = (e) => {
    setMySearch(e.target.value);
  }

  const finalSearch = (e) => {
    e.preventDefault();
    if (mySearch===''){
      (
        Swal.fire({
          text: "🍋 Enter your product please "
  
        })
    )
  }
    else{setWordSubmitted(mySearch);
      setMySearch('')
    }
  }

  useEffect(() => {
    if (wordSubmitted !== '') {
      let ingr = wordSubmitted.split(/[,;\n\r]/);
      fetchData(ingr);
    }
  }, [wordSubmitted])


  return (
    <div className={bgState? 'bg-img' : ''}>
      {stateLoader && <LoaderPage />}
      
      <div className="container">
        <h1>Nutrition Analysis</h1>
      </div>

      <div className="container">
         <h6>* Write in the search the quantity and product for Nutrition Analysis</h6>
      </div>

      <form onSubmit={finalSearch} className="containter-horizont">
        <input
          placeholder=" ..." value={mySearch}
          onChange={myRecipeSearch}
        />
          <button className="btn" type="submit">→</button>
      </form>

        <div className="container">

<div className={myNutrition && Object.values(myNutrition.totalNutrients).length > 0 ? "box" : ""}>

        <div className="containter-horizont">
             <p>{wordSubmitted}</p>
        </div>
  {myNutrition && Object.values(myNutrition.totalNutrients)
    .map(({ label, quantity, unit }, index) => (
      <Nutrition
        key={index}
        wordSubmitted={wordSubmitted}
        label={label}
        quantity={quantity}
        unit={unit}
      />
    ))}
</div>



            
      </div>
      </div>
  );
}

export default App;



// const MY-ID = 'b324dcdb'
//const MY-KEY = 'fcf262e1a3b56122065b797fea1f1e8f'
//const URL = 'https://api.edamam.com/api/nutrition-details'

//`${URL}?app_id=${MY-ID}&app_key=${MY-KEY}` можно поставить через месяц