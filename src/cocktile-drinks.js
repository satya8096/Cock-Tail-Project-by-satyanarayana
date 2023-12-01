import React from "react";
import { useState,useEffect } from "react";

const URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
function CockTail(){

    const [drinksData,SetDrinksData] = useState([]);

    const [drinkName,setDrinkName] = useState("");

    const [loading,setLoading] = useState(false);

    const [isError,setIsError] = useState({status: false,msg:""})

    const Data = async (ApiUrl)=>{
        setLoading(true)
        setIsError({status:false,msg:""})
        try {
            const response = await fetch(ApiUrl)
            const {drinks} = await response.json()
            SetDrinksData(drinks)
            setLoading(false)
            setIsError({status:false,msg:""})
            if(!drinks){
                throw new Error("Data Not Found")
            }
        } catch (error) {
            setLoading(false)
            setIsError({status: true,msg: error.message || "Something Went Wrong , Please Try Again Later"})
        }
    }

    useEffect(()=>{
        const newUrl = `${URL}${drinkName}`
        Data(newUrl)
    },[drinkName])


    return (
        <div>
            <h2 className="heading">CockTail Drinks Fetch From API</h2>
            <input placeholder="Search Drink...." type="search" value={drinkName} onChange={(e)=>setDrinkName(e.target.value)}/>
            <hr/>
            {
                loading && !isError?.status &&(<div className="loading-tag"><h2>Loading.....</h2></div>)
            }
            {
                isError?.status && (<div className="loading-tag error-tag"><h2>{isError.msg}</h2></div>)
            }
            {
                !loading && !isError?.status && ( <ul>
                {
                    drinksData.map((eachDrink)=>{
                        const {idDrink,strDrink,strDrinkThumb,strInstructions} =eachDrink;
                        return(
                            <li  key={idDrink}>
                                <img src={strDrinkThumb} alt={strDrink} />
                                <h3>{strDrink}</h3>
                                <p>{strInstructions}</p>
                            </li>
                        )
                    })
                }
                </ul>)
            }
        </div>
    )
}

export default CockTail;


