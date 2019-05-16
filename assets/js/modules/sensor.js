export function sensorsInit() {
    const sensor = document.querySelectorAll(".sensor");

    //проверяем все ли правильно
    function checkValidity(value, input){
        if(!input){
            console.log("Нет управляющего элемента");
            return false;
        }

        if(value.current < value.min || value.current > value.max){
            if(value.current < value.min){
                console.log("слишком низкое значение");
                return false;
            }

            if(value.current > value.max){
                console.log("слишком высокое значение");
                return false;
            }
        } else {
            console.log("допустимое значение");
            return true;
        }
    }

    //устанавливаем ограничения для инпута
    function initRange(input, value) {
        input.setAttribute("min", value.min);
        input.setAttribute("max", value.max);
        console.log("установил параметры инпута");
    }

    function animateInput(){

    }

    //стартовая анимация
    function successAnimation(input, dot, value, holder, time){
        input.value = value.min;
        holder.innerHTML = value.min;
        let degrees = -135;
        dot.style.transform = 'translate(-50%, -50%) rotate(' + degrees + 'deg)';

        let rotateControlPoint = -135 + (270 / 100) * value.percent();
        let inputControlPoint = value.current;
        let inputTiming = time / (Math.abs(value.min) + value.current);
        let rotateTiming = time / (rotateControlPoint - 135);

        let interval1 = setInterval(function () {

            if (+(input.value) >= inputControlPoint) {
                clearInterval(interval1);
            } else {
                input.value = +(input.value) + 1;
                holder.innerHTML = input.value;
            }

        }, inputTiming);

        let interval2 = setInterval(function () {

            if (degrees >= rotateControlPoint) {
                clearInterval(interval2);
            } else {
                degrees = degrees + 1;
                dot.style.transform = 'translate(-50%, -50%) rotate(' + degrees + 'deg)';
            }
        }, rotateTiming);
    }

    function errorAnimation(){

    }

    sensor.forEach((item) => {
        let some = item;
        let dot = some.querySelector(".dot");
        let indicator = dot.querySelector(".indicator");
        let input = some.querySelector("input");
        let valueHolder = some.querySelector(".value-holder span");
        let time = 500;

        let value = {
            min: parseInt(dot.getAttribute("data-min")),
            max: parseInt(dot.getAttribute("data-max")),
            current: parseInt(dot.getAttribute("data-value")),
            fullRange: function(){return Math.abs(this.min) + Math.abs(this.max)},
            percent: function(){return ((Math.abs(value.min) + value.current) / value.fullRange()) * 100;}
        };

        let minRotate = -135;
        let maxRotate = 135;
        let fullRotate = 270;

        let degrees = 0;

        let minColor = [136, 99, 220];
        let maxColor = [195, 100, 160];

        let redRange = (maxColor[0] - minColor[0]);
        let greenRange = (maxColor[1] - minColor[1]);
        let blueRange = (maxColor[2] - minColor[2]);

        let red = 0;
        let green = 0;
        let blue = 0;

        if(!checkValidity(value, input)){
            errorAnimation();
            return false;
        } else {
            initRange(input, value);
            successAnimation(input, dot, value, valueHolder, time)
        }

        valueHolder.innerHTML = value.current;

        function calcIndicator(percent) {
            degrees = minRotate + ((fullRotate / 100) * percent);
            red = minColor[0] + ((redRange / 100) * percent);
            green = minColor[1] + ((greenRange / 100) * percent);
            blue = minColor[2] + ((blueRange / 100) * percent);

            dot.style.transform = 'translate(-50%, -50%) rotate(' + degrees + 'deg)';
            indicator.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, 1)`;
        }

        // calcIndicator(value.percent());

        input.addEventListener('input', function () {
            let percent = ((Math.abs(value.min) + parseInt(this.value)) / value.fullRange()) * 100;

            calcIndicator(percent);

            valueHolder.innerText = this.value;
        });

    });
}