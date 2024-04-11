const buttons = document.querySelectorAll('.meeting-button');
const meetingForm = document.getElementById('meeting-form');
const cards = document.getElementById('cards');
const formContainer = document.getElementById('form');
let time;
    

buttons.forEach(button => {
    button.addEventListener('click', () => {
        time = button.getAttribute('time');
        formContainer.style.display = 'block';
    });
});


function handleFormSubmit(event) {
    event.preventDefault();
    const meetingDetails = {
        name: event.target.name.value,
        email: event.target.email.value,
        time: time
    };

    axios
        .post("http://localhost:5000/meeting/add-meeting", meetingDetails)
        .then((response) => {
            console.log(response);
            displayMeetingOnScreen(response.data.newMeetingDetail);
        })
        .catch((error) => console.log(error));

    // displayMeetingOnScreen(meetingDetails);

    formContainer.style.display = 'none';
    meetingForm.reset();
}


function displayMeetingOnScreen(meetingDetails) {
    const card = document.createElement('div');
    card.innerHTML = `<div class="card">
        <div class="card-body">
            Hi ${meetingDetails.name},<br>Please join the meeting via link: <a href="https://meet.google.com/">https://meet.google.com/fgd-rtw</a> at <span class="time">${meetingDetails.time}</span>.<br>
            <button type="button" class="btn btn-secondary cancel-button">Cancel</button>
        </div>
    </div>`;
    cards.appendChild(card);

    buttons.forEach(button => {
        if (button.getAttribute('time') === meetingDetails.time) {
            let slotsAvailable = parseInt(button.getAttribute('available'));
            slotsAvailable -= 1;
            button.setAttribute('available', slotsAvailable);
            button.querySelector('.badge').textContent = `${slotsAvailable} Available`;
            if (slotsAvailable === 0) {
                button.disabled = true;
            }
        }
    })

    cancelButton = card.querySelector('.cancel-button');
    cancelButton.addEventListener('click', () => {
        axios
            .delete(`http://localhost:5000/meeting/delete-meeting/${meetingDetails.id}`)
            .then((response) => {
                console.log(response)
                buttons.forEach(button => {
                    if (button.getAttribute('time') === meetingDetails.time) {
                        let slotsAvailable = parseInt(button.getAttribute('available'));
                        slotsAvailable += 1;
                        button.setAttribute('available', slotsAvailable);
                        button.querySelector('.badge').textContent = `${slotsAvailable} Available`;
                        if (slotsAvailable > 0) {
                            button.disabled = false;
                        }
                    }
                })
                card.remove();
            })   
            .catch((error) => console.log(error));     
    })
}


window.addEventListener('DOMContentLoaded', () => {
    axios
        .get("http://localhost:5000/meeting/get-meetings")
        .then((response) => {
            for (var i = 0; i < response.data.allMeetings.length; i++) {
                displayMeetingOnScreen(response.data.allMeetings[i]);
            }
        })
        .catch((error) => console.log(error));
})
