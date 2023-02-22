import { useState, CSSProperties } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import GridLoader from "react-spinners/GridLoader";
import { Configuration, OpenAIApi } from 'openai'
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  marginTop:"10%",
};
function App() {
  var [state,cstate]=useState("");
  var [urlstate,curlstate]=useState("");
  var [show,cshow]=useState(false);
  var [ishow,icshow]=useState(false);
  var [chang,changee]=useState(false)

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_KEY
    // apiKey:

  })
  const openai = new OpenAIApi(configuration);
  
  const Handlesubmit=async (e)=>{
    e.preventDefault()
    cshow(true)
  try {
    const response = await openai.createImage({
      prompt: `${state}`,
      n: 1,
      size: "1024x1024"
    })
    var url=response.data.data[0].url
    cshow(false)
    icshow(true)
    curlstate(urlstate=url)
  }
  catch (err) {
    cshow(false)
    console.log({ error: err })
  }}
  return (
    <>
      <div>
        {/* <p className={(urlstate&&state.length>0)?'ppp':'hidden'} onClick={()=>{changee(!chang)}}>Hide</p> */}
        <form className='form'>
          <textarea placeholder='Enter your query here...' rows="3" cols="40" value={state} onChange={(e)=>{cstate(e.target.value);}} className='input'/>
          <input type="Submit" value="GENERATE IMAGE !" readOnly className='submit-btn' onClick={Handlesubmit} />
        </form>
        <div className={ishow?'':'hidden'}>
        <div className={show?'hidden':'img-d'}>
          <img src={urlstate} className='img' alt={state}/>
        </div>
        </div>
        <div className={show?'spin':'hidden'}>
        <GridLoader
           color={"#36d7b7"}
           loading={true}
           cssOverride={override}
           size={70}
           aria-label="Loading Spinner"
           data-testid="loader"
        />
        <p className=''>Generating Image.....</p>
        </div>
      </div>
    </>
  )
}

export default App
