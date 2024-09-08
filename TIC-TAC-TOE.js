let elements = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
let aiplayer = "O";
let opponentPlayer = "X";
let source = true; 
let NoofClick = 0;
let result = {
    one: Infinity,
    oneel: null,
    zero: Infinity,
    zeroel:null
}
document.getElementsByClassName("container")[0].addEventListener("mousedown", (e) => {
    let El = document.elementFromPoint(e.pageX, e.pageY);
    if (elements.includes(El.id))
    {

        El.firstElementChild.style.display = "block";
        El.firstElementChild.classList.add("animation_pack");
        El.firstElementChild.firstElementChild.src = source ?
            `../images/x-symbol.jpg` : `../images/+-symbol.jpg`;
        elements[elements.indexOf(El.id)] = source ? opponentPlayer : aiplayer;
        source = !source;
        NoofClick++;

        if (winning(opponentPlayer) && NoofClick<9)
        {
            setTimeout(() =>
            {
            alert("YOU WIN");
            clear(); 
             },30);
           
        }
        else if(NoofClick == 9) 
        {
            setTimeout(() => {
                  alert("TIE");
            clear();
             },30);
           
        }
        else
        {
            NoofClick++;
            let assump = -Infinity;
            let bestmoveel = "";
            for (let el of avail())
            {
                let idx = elements.indexOf(el);
                elements[idx] = aiplayer;
                let res = minimax(false);
                elements[idx] = el;
                if (res.score > assump)
                {
                    assump = res.score;
                    bestmoveel = el;
                }
            }    
    



            document.getElementById(bestmoveel).firstElementChild.style.display = "block";
            document.getElementById(bestmoveel).firstElementChild.classList.add("animation_pack");
            document.getElementById(bestmoveel).firstElementChild.firstElementChild.src = source ?
                `../images/x-symbol.jpg` : `../images/+-symbol.jpg`;
            elements[JSON.parse(bestmoveel)-1]= source ? opponentPlayer : aiplayer;
            source = !source;


         if (winning(aiplayer))
         {
             setTimeout(() => {
                 
                 alert("YOU LOSE");
                 clear();
             },30);
         }
        

        }
     }
})

function minimax(isai)
{ 
    if (winning(aiplayer))
    {
        return {
            score: 1
       }
    }
    else if (winning(opponentPlayer))
    {
        return {
            score: -1
       }
    }
    else if (avail().length === 0)
    {
       return {
            score: 0
       }
    }
    if (isai)
    {
        let el = {
            score: -Infinity
        }  
        for (let i of avail())
        {
            let index = elements.indexOf(i);
            elements[index] = aiplayer;
            let res = minimax(false);
            elements[index] = i;
            if (res.score > el.score)
            {
                el.score = res.score;
            }
            
        }    
        return el;
    }
    else
    {
        
        let value = {
            score: Infinity
        }
        for (let i of avail())
        {
            let index = elements.indexOf(i);
            elements[index] = opponentPlayer;
            let valueEl= minimax(true)   
            elements[index] = i;
            if (valueEl.score < value.score)
            {
                value.score = valueEl.score;
            }
        }  
        return value;
    }
    
   
}



function winning(player)
{
    if ((player === elements[0] && player === elements[1] && player === elements[2]) ||
        (player === elements[3] && player === elements[4] && player === elements[5]) ||
        (player === elements[6] && player === elements[7] && player === elements[8]) ||
        (player === elements[0] && player=== elements[3] && player === elements[6]) ||  
        (player === elements[1] && player=== elements[4] && player === elements[7]) ||
        (player === elements[2] && player=== elements[5] && player === elements[8]) ||
        (player === elements[0] && player=== elements[4] && player === elements[8]) ||
        (player === elements[2] && player === elements[4] && player === elements[6]))
    {
        return true;
    }
    else
    {
        return false;
    }
}
function clear()
{
    Array.from(document.getElementsByClassName("icon")).forEach((el) =>
    {
        
        el.style.display = "none";
        el.classList.remove("animation_pack");
    })
    elements  = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    NoofClick = 0;
    source = true;

}
function avail()
{
    return elements.filter((el) =>
    { 
        return (el != opponentPlayer && el != aiplayer);
    })
}