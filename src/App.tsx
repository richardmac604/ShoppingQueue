import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [itemsinPersonCart ,setItemsInPersonCart] = useState(0)
  const [lines, setLines] = useState([[10,5,2],[1],[2],[3],[4]])
 
  function addPersonToLine(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();

    //loop through all lines 
    //find the lines with the Least items 
    //push the itemsinPersonCart to the line

    let leastItemAmount = 1e9
    let lineWithLeast: number[] | undefined = undefined;

    for(let line of lines){
      const totalInLine = line.reduce((sum, value) => sum + value, 0);
      console.log(totalInLine)
      if(totalInLine < leastItemAmount){
        leastItemAmount = totalInLine
        lineWithLeast = line
      }
    }

    if(!lineWithLeast) return;

    setLines(prevLines => prevLines.map((line) => {
      if (line === lineWithLeast){
        return[...line, itemsinPersonCart]
      }else{
        return line;
      }
    }))

  }


  useEffect(() => {
    const interval = setInterval(() => {
      setLines(prevLines => {
        //TODO reduce first item by one in each line
        return prevLines.map(line => {
          return[line[0] - 1, ...line.slice(1)].filter((value)=> value > 0)
        })
      })
    }, 1000)

    return () => {
      clearInterval(interval)
    };

  }, [])

  return (
    <div className="App">
      <form onSubmit={addPersonToLine}>
        <input 
        required
        type="number"
        value={itemsinPersonCart}
        onChange={(e) => setItemsInPersonCart(e.currentTarget.valueAsNumber)}
        />
        <button>Checkout</button>
      </form>
      
    <div className='lines'>
      {lines.map((people,idx) => (
        <div className = "line" key={idx}>

        {people.map(numberOfItems => 
        <div>{numberOfItems}</div>) 
        
        }

        </div>
      ))}
    </div>
  </div>
  );
}

export default App;
