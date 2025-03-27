let boxes = document.querySelectorAll(".Box");
let reset_btn = document.querySelector("#reset");
let newGame = document.querySelector("#id4");
let winMsg = document.querySelector(".id3");
let msg = document.querySelector("#id5");
let showTurn = document.querySelector("#id1");
let id2 = document.querySelector(".id2");

let turnX = true ;
let count = 0;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

boxes.forEach((i)=>{
    i.addEventListener("click",()=>{
        if(turnX)
        {
            i.innerText = "X";
            i.style.color = "#3A7D44";
            showTurn.innerText="O";
            showTurn.style.color="#5B85AA";
            turnX=false;
        }
        else
        {
            i.innerText = "O";
            i.style.color = "#5B85AA";
            showTurn.innerText="X";
            showTurn.style.color="#3A7D44";
            turnX=true;
        }
        i.disabled=true; //So that when a player puts X he cannot again change the same X to O
        count++;

        let isWinner = chechkWinner();

        if(count === 9 && !isWinner)
        {
            gameDraw();
        }
    });
});

const gameDraw = () =>{
    msg.innerText = `Game was a Draw.`;
    winMsg.classList.remove("hide");
    disableBoxes();
}

const resetGame = ()=>{
    turnX=true;
    showTurn.innerText="X";
    enableBoxes();
    winMsg.classList.add("hide");
}

const disableBoxes = ()=>{
    for(let box of boxes)
    {
        box.disabled=true; //So that after a win no more entry's can be given
    }
};

const enableBoxes = ()=>{
    for(let box of boxes)
    {
        box.disabled=false; //To enable boxes after new game starts
        box.innerText=""; //To clear the boxes;
    }
    reset_btn.style.display="";
    id2.style.display="";
};

const showWinner = (winner)=>{
    msg.innerText = `Congratulations !! Winner Is ${winner}`;
    winMsg.classList.remove("hide");
    disableBoxes();
    reset_btn.style.display="none";
    id2.style.display="none";
}

const chechkWinner = ()=>{
    for (let pattern of winPatterns)
    {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val !="" && pos2Val !="" && pos3Val !="")
        {
            if(pos1Val === pos2Val && pos2Val=== pos3Val)
            {
                showWinner(pos1Val);
                return true;
            }
        }
    }
};

reset_btn.addEventListener("click",resetGame);
newGame.addEventListener("click",resetGame);