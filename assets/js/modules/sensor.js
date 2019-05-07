export function sensorsInit() {
    setTimeout(function () {
        const sensor = document.querySelectorAll('.sensor');
        sensor.forEach((item) => {
            let dot = item.querySelector('.dot');
            let indicator = dot.querySelector('.indicator');
            let value = parseInt(dot.getAttribute('data-value'));
            let min = -135;
            let max = 135;
            let full = 270;
            let percent = (value / full * 100).toFixed(2); //10.54%
            let degrees = 0;

            let minColor = [136, 99, 220];
            let maxColor = [195, 100, 160];

            let redRange = (maxColor[0] - minColor[0]);
            let greenRange = (maxColor[1] - minColor[1]);
            let blueRange = (maxColor[2] - minColor[2]);

            let red = 0;
            let green = 0;
            let blue = 0;

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

            if (percent > 0 && percent <= 50) {
                degrees = min + ((full / 100) * percent);
                red = minColor[0] + ((redRange / 100) * percent);
                green = minColor[1] + ((greenRange / 100) * percent);
                blue = minColor[2] + ((blueRange / 100) * percent);
            }

            if (percent > 50 && percent < 100) {
                degrees = max - ((full / 100) * percent);
                red = maxColor[0] - ((redRange / 100) * percent);
                green = maxColor[1] - ((greenRange / 100) * percent);
                blue = maxColor[2] - ((blueRange / 100) * percent);
            }

            dot.style.transform = 'translate(-50%, -50%) rotate(' + degrees + 'deg)';

            indicator.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, 1)`;

        });
    }, 1000);
}