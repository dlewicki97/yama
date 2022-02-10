function filterCars(model) {
    document.getElementById('infoFilters').innerHTML = '';
    var state = document.getElementById('state').value;
    console.log(state);
    var cars = document.querySelectorAll('.car-row');
    var availableCars = 0;
    for (var i = 0; i < cars.length; i++) {
        if (state != 0) {
            if (cars[i].getAttribute("data-state") == state && cars[i].getAttribute("data-model") == model || model == 'Wszystkie') {
                cars[i].style.display = "flex";
                availableCars++;
            } else if (model == 0 && cars[i].getAttribute("data-state") == state) {
            } else {
                cars[i].style.display = "none";
            }
        } else {
            if (cars[i].getAttribute("data-model") == model || model == 'Wszystkie') {
                cars[i].style.display = "flex";
                availableCars++;
            } else {
                cars[i].style.display = "none";
            }
        }
    }
    document.querySelector('.cars span').innerHTML = availableCars;
    if (availableCars <= 0) {
        document.getElementById('infoFilters').innerHTML = '<div class="infoFilterAlert">Brak ofert spełniających wybrane filtrowanie</div>';
    }
}

document.querySelector('#state').addEventListener('change', filterState)

function filterState(select) {
    document.getElementById('infoFilters').innerHTML = '';
    var model = document.getElementById('select-model').value;
    console.log(model);
    var state = select.value;
    console.log(state);
    var cars = document.querySelectorAll('.car-row');
    var availableCars = 0;
    for (var i = 0; i < cars.length; i++) {
        if (model != 0) {
            if (cars[i].getAttribute("data-model") == model && cars[i].getAttribute("data-state") == state) {
                cars[i].style.display = "flex";
                availableCars++;
            } else if(state == 0 && cars[i].getAttribute("data-model") == model) {
                cars[i].style.display = "flex";
                availableCars++;
            } else {
                cars[i].style.display = "none";
            }
        } else {
            if (cars[i].getAttribute("data-state") == state || state == '0') {
                cars[i].style.display = "flex";
                availableCars++;
            } else {
                cars[i].style.display = "none";
            }
        }

    }
    document.querySelector('.cars span').innerHTML = availableCars;
    if (availableCars <= 0) {
        document.getElementById('infoFilters').innerHTML = '<div class="infoFilterAlert">Brak ofert spełniających wybrane filtrowanie</div>';
    }
} 