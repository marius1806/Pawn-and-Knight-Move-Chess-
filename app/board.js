const boxArray = document.getElementsByClassName('box');

/*Script pentru colorarea tablei de sah*/

const white = "rgb(179, 116, 75)";
const black = "rgb(63, 28, 4)";

boxArray[0].style.backgroundColor = white;

for (let num = 1; num < boxArray.length; ++num) {
    if (!(num % 8)) {
        boxArray[num].style.backgroundColor = boxArray[num - 1].style.backgroundColor;
    } else if(boxArray[num - 1].style.backgroundColor === white) {
        boxArray[num].style.backgroundColor = black;
    } else {
        boxArray[num].style.backgroundColor = white;
    }
}