export function sensorsInit() {
    const sensor = document.querySelectorAll('.sensor');

    sensor.forEach((item) => {
        let dot = item.querySelector('.dot');
        let indicator = dot.querySelector('.indicator');
        let value = parseInt(dot.getAttribute('data-value'));
        let control = item.querySelector('input');
        let valueHolder = item.querySelector(".value-holder span");

        let min = -135;
        let max = 135;
        let full = 270;
        let percent = (value / full * 100);
        let degrees = 0;

        let minColor = [136, 99, 220];
        let maxColor = [195, 100, 160];

        let redRange = (maxColor[0] - minColor[0]);
        let greenRange = (maxColor[1] - minColor[1]);
        let blueRange = (maxColor[2] - minColor[2]);

        let red = 0;
        let green = 0;
        let blue = 0;

        control.value = value;

        function calcIndicator(){
            if (percent <= 0) {
                degrees = min;
                red = minColor[0];
                green = minColor[1];
                blue = minColor[2];
            }

            if (percent >= 100) {
                degrees = max;
                red = maxColor[0];
                green = maxColor[1];
                blue = maxColor[2];
            }

            if (percent > 0 && percent < 100) {
                degrees = min + ((full / 100) * percent);
                red = minColor[0] + ((redRange / 100) * percent);
                green = minColor[1] + ((greenRange / 100) * percent);
                blue = minColor[2] + ((blueRange / 100) * percent);
            }

            dot.style.transform = 'translate(-50%, -50%) rotate(' + degrees + 'deg)';
            indicator.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, 1)`;
        }

        calcIndicator();

        control.addEventListener('input', function(){
            let number = this.value;

            percent =  (number / full * 100);

            calcIndicator();

            //console.log(number);

            valueHolder.innerText = number;
        });

    });
}