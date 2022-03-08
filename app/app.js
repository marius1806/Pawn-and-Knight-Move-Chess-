/* Codul consta in mutarea regulamentara 
a pionului, transformarea lui in regina 
daca ajunge in capatul opus al tablei, 
si in mutarea pieselor pe rand (alb,  
negru, alb, negru si tot asa). */

/* Probabil puteam face mai simplu daca 
simulam tabla ca fiind o matrice dar nu 
m-am gandit la inceput si am lucrat doar
cu un array simplu.*/

/* Pe langa pion am reusit sa fac si 
calul sa functioneze asa mai extra
;) */



const BoxArray = document.getElementsByClassName('box');
const SpanArray = document.getElementsByTagName('span');
const highlight = "rgb(253, 80, 0)";
let temp;
let element;
let turn = 0;

const possibleWhite = index => {
    return SpanArray[index].className === "white pawn" ||  SpanArray[index].className === "white rook" || SpanArray[index].className === "white knight" || SpanArray[index].className === "white bishop" || SpanArray[index].className === "white queen";
}

const possibleBlack = index => {
    return SpanArray[index].className === "black pawn" ||  SpanArray[index].className === "black rook" || SpanArray[index].className === "black knight" || SpanArray[index].className === "black bishop" || SpanArray[index].className === "black queen";
}

const getRidOfHighlights = () => {
    BoxArray[0].style.backgroundColor = white;
    for (let num = 1; num < BoxArray.length; ++num) {
        BoxArray[num].removeAttribute("onclick");
        if (!(num % 8)) {
            BoxArray[num].style.backgroundColor = BoxArray[num - 1].style.backgroundColor;
        } else if(BoxArray[num - 1].style.backgroundColor === white) {
            BoxArray[num].style.backgroundColor = black;
        } else {
            BoxArray[num].style.backgroundColor = white;
        }
    }
}

const movePawn = index => {
    getRidOfHighlights();
    if (SpanArray[index].className === "white pawn") {
        BoxArray[index].style.backgroundColor = highlight;
        if (index % 8 === 6 && SpanArray[index - 2].className === "empty" && SpanArray[index - 1].className === "empty") {
            BoxArray[index - 2].style.backgroundColor = highlight;
            temp = index;
            element = BoxArray[index - 2];
            element.setAttribute("onclick", 'putPiece(temp - 2, "&#x265F;", "white pawn", temp)');
        }
        if (SpanArray[index - 1].className === "empty") {
            BoxArray[index - 1].style.backgroundColor = highlight;
            temp = index;
            element = BoxArray[index - 1];
            element.setAttribute("onclick", 'putPiece(temp - 1, "&#x265F;", "white pawn", temp)');
        }
        if (index - 9 >= 0 && possibleBlack(index - 9)) {
            BoxArray[index - 9].style.backgroundColor = highlight;
            temp = index;
            element = BoxArray[index - 9];
            element.setAttribute("onclick", 'putPiece(temp - 9, "&#x265F;", "white pawn", temp)');
        }
        if (index + 7 < 64 && possibleBlack(index + 7)) {
            BoxArray[index + 7].style.backgroundColor = highlight;
            temp = index;
            element = BoxArray[index + 7];
            element.setAttribute("onclick", 'putPiece(temp + 7, "&#x265F;", "white pawn", temp)');
        }
    } else if (SpanArray[index].className === "black pawn") {
        BoxArray[index].style.backgroundColor = highlight;
        if (index % 8 === 1 && SpanArray[index + 2].className === "empty" && SpanArray[index + 1].className === "empty") {
            BoxArray[index + 2].style.backgroundColor = highlight;
            temp = index;
            element = BoxArray[index + 2];
            element.setAttribute("onclick", 'putPiece(temp + 2, "&#x265F;", "black pawn", temp)');
        }
        if (SpanArray[index + 1].className === "empty") {
            BoxArray[index + 1].style.backgroundColor = highlight;
            temp = index;
            element = BoxArray[index + 1];
            element.setAttribute("onclick", 'putPiece(temp + 1, "&#x265F;", "black pawn", temp)');
        }
        if (index + 9 < 64 && possibleWhite(index + 9)) {
            BoxArray[index + 9].style.backgroundColor = highlight;
            temp = index;
            element = BoxArray[index + 9];
            element.setAttribute("onclick", 'putPiece(temp + 9, "&#x265F;", "black pawn", temp)');
        }
        if (index - 7 >= 0 && possibleWhite(index - 7)) {
            BoxArray[index - 7].style.backgroundColor = highlight;
            temp = index;
            element = BoxArray[index - 7];
            element.setAttribute("onclick", 'putPiece(temp - 7, "&#x265F;", "black pawn", temp)');
        }
    }
}

const next = () => {
    if (!(turn % 2)) {
        for (let idx = 0; idx < BoxArray.length; ++idx) {
            if (SpanArray[idx].className === "white pawn") {
                SpanArray[idx].onclick = function() {
                    movePawn(idx);
                }
            } else if (SpanArray[idx].className === "white knight") {
                SpanArray[idx].onclick = function() {
                    moveKnight(idx);
                }
            } else {
                SpanArray[idx].onclick = function() {

                }
            }
        }
    } else {
        for (let idx = 0; idx < BoxArray.length; ++idx) {
            if (SpanArray[idx].className === "black pawn") {
                SpanArray[idx].onclick = function() {
                    movePawn(idx);
                }
            } else if (SpanArray[idx].className === "black knight") {
                SpanArray[idx].onclick = function() {
                    moveKnight(idx);
                }
            } else {
                SpanArray[idx].onclick = function() {
                    
                }
            }
        }
    }
}

const putPiece = (index, piece, pieceType, oldIndex) => {
    ++turn;
    SpanArray[index].innerHTML = piece;
    SpanArray[index].setAttribute("class", pieceType);
    SpanArray[oldIndex].innerHTML = "";
    SpanArray[oldIndex].className = "empty";
    if (SpanArray[index].className === "white pawn" && (index === 0 || index === 8 || index === 16 || index === 24 || index === 32 || index === 40 || index === 48 || index === 56)) {
        SpanArray[index].innerHTML = "&#x265B;";
    } else if (SpanArray[index].className === "black pawn" && (index === 7 || index === 15 || index === 23 || index === 31 || index === 39 || index === 47 || index === 55 || index === 63)) {
        SpanArray[index].innerHTML = "&#x265B;";
    }
    getRidOfHighlights();
    next();
}

//BONUS: activarea calului

const moveKnight = index => {
    getRidOfHighlights();
    if (SpanArray[index].className === "white knight") {
        BoxArray[index].style.backgroundColor = highlight;
        if (index - 10 >= 0 && index % 8 && (index - 1) % 8 && !possibleWhite(index - 10) && SpanArray[index - 10].className != "white king" && SpanArray[index - 10].className != "black king") {
            BoxArray[index - 10].style.backgroundColor = highlight;
            temp = index;
            element = BoxArray[index - 10];
            BoxArray[index - 10].setAttribute("onclick", 'putPiece(temp - 10, "&#x265E;", "white knight", temp)');
        }
        if (index + 6 < 64 && index % 8 && (index - 1) % 8 && !possibleWhite(index + 6) && SpanArray[index + 6].className != "white king" && SpanArray[index + 6].className != "black king") {
            BoxArray[index + 6].style.backgroundColor = highlight;
            temp = index;
            element = BoxArray[index + 6];
            BoxArray[index + 6].setAttribute("onclick", 'putPiece(temp + 6, "&#x265E;", "white knight", temp)');
        }
        if (index - 6 >= 0 && (index + 1) % 8 && (index + 2) % 8 && !possibleWhite(index - 6) && SpanArray[index - 6].className != "white king" && SpanArray[index - 6].className != "black king") {
            BoxArray[index - 6].style.backgroundColor = highlight;
            temp = index;
            element = BoxArray[index - 6];
            BoxArray[index - 6].setAttribute("onclick", 'putPiece(temp - 6, "&#x265E;", "white knight", temp)');
        }
        if (index + 10 < 64 && (index + 1) % 8 && (index + 2) % 8 && !possibleWhite(index + 10) && SpanArray[index + 10].className != "white king" && SpanArray[index + 10].className != "black king") {
            BoxArray[index + 10].style.backgroundColor = highlight;
            temp = index;
            element = BoxArray[index + 10];
            BoxArray[index + 10].setAttribute("onclick", 'putPiece(temp + 10, "&#x265E;", "white knight", temp)');
        }
        if (index - 17 >= 0 && index % 8 && !possibleWhite(index - 17) && SpanArray[index - 17].className != "white king" && SpanArray[index - 17].className != "black king") {
            BoxArray[index - 17].style.backgroundColor = highlight;
            temp = index;
            element = BoxArray[index - 17];
            BoxArray[index - 17].setAttribute("onclick", 'putPiece(temp - 17, "&#x265E;", "white knight", temp)');
        }
        if (index + 15 < 64 && index % 8 && !possibleWhite(index + 15) && SpanArray[index + 15].className != "white king" && SpanArray[index + 15].className != "black king") {
            BoxArray[index + 15].style.backgroundColor = highlight;
            temp = index;
            element = BoxArray[index + 15];
            BoxArray[index + 15].setAttribute("onclick", 'putPiece(temp + 15, "&#x265E;", "white knight", temp)');
        }
        if (index - 15 >= 0 && (index + 1) % 8 && !possibleWhite(index - 15) && SpanArray[index - 15].className != "white king" && SpanArray[index - 15].className != "black king") {
            BoxArray[index - 15].style.backgroundColor = highlight;
            temp = index;
            element = BoxArray[index - 15];
            BoxArray[index - 15].setAttribute("onclick", 'putPiece(temp - 15, "&#x265E;", "white knight", temp)');
        }
        if (index + 17 >= 0 && (index + 1) % 8 && !possibleWhite(index + 17) && SpanArray[index + 17].className != "white king" && SpanArray[index + 17].className != "black king") {
            BoxArray[index + 17].style.backgroundColor = highlight;
            temp = index;
            element = BoxArray[index + 17];
            BoxArray[index + 17].setAttribute("onclick", 'putPiece(temp + 17, "&#x265E;", "white knight", temp)');
        }
    } else if (SpanArray[index].className === "black knight") {
        BoxArray[index].style.backgroundColor = highlight;
        if (index - 10 >= 0 && index % 8 && (index - 1) % 8 && !possibleBlack(index - 10) && SpanArray[index - 10].className != "black king" && SpanArray[index - 10].className != "white king") {
            BoxArray[index - 10].style.backgroundColor = highlight;
            temp = index;
            element = BoxArray[index - 10];
            BoxArray[index - 10].setAttribute("onclick", 'putPiece(temp - 10, "&#x265E;", "black knight", temp)');
        }
        if (index + 6 < 64 && index % 8 && (index - 1) % 8 && !possibleBlack(index + 6) && SpanArray[index + 6].className != "black king" && SpanArray[index + 6].className != "white king") {
            BoxArray[index + 6].style.backgroundColor = highlight;
            temp = index;
            element = BoxArray[index + 6];
            BoxArray[index + 6].setAttribute("onclick", 'putPiece(temp + 6, "&#x265E;", "black knight", temp)');
        }
        if (index - 6 >= 0 && (index + 1) % 8 && (index + 2) % 8 && !possibleBlack(index - 6) && SpanArray[index - 6].className != "black king" && SpanArray[index - 6].className != "white king") {
            BoxArray[index - 6].style.backgroundColor = highlight;
            temp = index;
            element = BoxArray[index - 6];
            BoxArray[index - 6].setAttribute("onclick", 'putPiece(temp - 6, "&#x265E;", "black knight", temp)');
        }
        if (index + 10 < 64 && (index + 1) % 8 && (index + 2) % 8 && !possibleBlack(index + 10) && SpanArray[index + 10].className != "black king" && SpanArray[index + 10].className != "white king") {
            BoxArray[index + 10].style.backgroundColor = highlight;
            temp = index;
            element = BoxArray[index + 10];
            BoxArray[index + 10].setAttribute("onclick", 'putPiece(temp + 10, "&#x265E;", "black knight", temp)');
        }
        if (index - 17 >= 0 && index % 8 && !possibleBlack(index - 17) && SpanArray[index - 17].className != "black king" && SpanArray[index - 17].className != "white king") {
            BoxArray[index - 17].style.backgroundColor = highlight;
            temp = index;
            element = BoxArray[index - 17];
            BoxArray[index - 17].setAttribute("onclick", 'putPiece(temp - 17, "&#x265E;", "black knight", temp)');
        }
        if (index + 15 < 64 && index % 8 && !possibleBlack(index + 15) && SpanArray[index + 15].className != "black king" && SpanArray[index + 15].className != "white king") {
            BoxArray[index + 15].style.backgroundColor = highlight;
            temp = index;
            element = BoxArray[index + 15];
            BoxArray[index + 15].setAttribute("onclick", 'putPiece(temp + 15, "&#x265E;", "black knight", temp)');
        }
        if (index - 15 >= 0 && (index + 1) % 8 && !possibleBlack(index - 15) && SpanArray[index - 15].className != "black king" && SpanArray[index - 15].className != "white king") {
            BoxArray[index - 15].style.backgroundColor = highlight;
            temp = index;
            element = BoxArray[index - 15];
            BoxArray[index - 15].setAttribute("onclick", 'putPiece(temp - 15, "&#x265E;", "black knight", temp)');
        }
        if (index + 17 >= 0 && (index + 1) % 8 && !possibleBlack(index + 17) && SpanArray[index + 17].className != "black king" && SpanArray[index + 17].className != "white king") {
            BoxArray[index + 17].style.backgroundColor = highlight;
            temp = index;
            element = BoxArray[index + 17];
            BoxArray[index + 17].setAttribute("onclick", 'putPiece(temp + 17, "&#x265E;", "black knight", temp)');
        }
    }
}

next();