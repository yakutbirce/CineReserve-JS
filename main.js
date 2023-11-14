/* 1st Step: Change the color of the clicked seat;
revert to its original color when clicked again.
--Access the container div first.
--Add an event listener to this div.
--Detect the clicked element.
--If the detected element has 'seat' in its class, add 'selected' to its class list.
--If it has the 'selected' class, remove it (toggle).

2nd Step: If there are no selected seats,
the 'info' message will be removed; otherwise, it will be displayed.
--Access the 'info' message.
--Then, check if there are any selected seats.
--If there are any, change the display of the text.

3rd Step: Display the Number of Selected Seats 
and Total Amount in the Information Text
--To retrieve the count class div for transferring the number of selected seats.
--Set the innerText of this div to selectedSeatsCount.
--Retrieve the section for selecting a movie for the pricing information of movies.
--And multiply it by the total count to calculate the total amount.
--Add it to the span with the 'amount' class.
*/




// Call the container div for seat detection when clicked.
const container = document.querySelector(".container");
// console.log(container)
const infoText = document.querySelector('.infoText');
// console.log(infoText)
const select = document.getElementById('movie')
// The value inside the select represents the price of the movie.
const count = document.querySelector('#count')
const amount = document.querySelector('#amount')
const seats = document.querySelectorAll('.seat:not(.reserved)')
// console.log(seats)


// Reading Data from the Database
const getSeatsFromDatabase = () => {
    const dbSelectSeats = JSON.parse(localStorage.getItem('selectedSeatIndex'))
    const dbSelectedMovie = JSON.parse(localStorage.getItem('selectedMovie'))

    select.selectedIndex = dbSelectedMovie

    if (dbSelectSeats != null && dbSelectSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (dbSelectSeats.indexOf(index) > -1) {
                seat.classList.add('selected')
            }
        })
    }
}


// Database Record Insertion
const saveSeatsToDatabase = (index) => {
    // console.log(saveSeatsToDatabase),
    localStorage.setItem('selectedSeatIndex', JSON.stringify(index))
    localStorage.setItem('selectedMovie', JSON.stringify(select.selectedIndex))
}

getSeatsFromDatabase()



// Calculate Total Function
const priceCalculator = () => {
    // ====Seat Row Number Detection Operations====//

    // Converting all seats into an array.
    const seatsArray = []
    seats.forEach((seat) => {
        seatsArray.push(seat)
    })
    // console.log(seatsArray)

    const selectedSeats = container.querySelectorAll('.seat.selected')
    const selectedSeatsArray = []

    selectedSeats.forEach((selectedSeat) => {
        selectedSeatsArray.push(selectedSeat)
    });

    let selectedSeatIndex = selectedSeatsArray.map((selectedSeat) => {
        return seatsArray.indexOf(selectedSeat)
    })







    // ====Calculation Operations====//

    // Total Number of Selected Seats
    const selectedSeatsCount = container.querySelectorAll('.seat.selected').length;
    // console.log(selectedSeatsCount);
    const moviePrice = select.value
    // console.log(moviePrice);
    // Query If There Are Selected Seats
    if (selectedSeatsCount > 0) {
        // If there are, change the text's style property.
        infoText.style.display = 'block'
    } else {
        infoText.style.display = 'none';
    }

    // To send the total number of selected seats to HTML
    count.innerText = selectedSeatsCount
    // To send the total amount to HTML
    amount.innerText = moviePrice * selectedSeatsCount

    saveSeatsToDatabase(selectedSeatIndex)
};
priceCalculator()

container.addEventListener('click', (pointerEvent) => {
    // Determine the seat from the clicked elements.
    // console.log(pointerEvent.target.offsetParent)

    const clickedSeat = pointerEvent.target.offsetParent;

    if (clickedSeat.classList.contains("seat") && !clickedSeat.classList.contains("reserved")) {
        clickedSeat.classList.toggle("selected");
    }
    priceCalculator();
});

select.addEventListener('change', (e) => {
    priceCalculator()
});