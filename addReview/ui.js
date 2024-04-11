const reviewForm = document.getElementById("review-form");
const searchBox = document.getElementById("search");

function handleFormSubmit(event) {
    event.preventDefault();
    const reviewDetails = {
        company_name: event.target.company_name.value,
        pros: event.target.pros.value,
        cons: event.target.cons.value,
        rating: event.target.rating.value
    };

    axios
        .post("http://localhost:5000/review/add-review", reviewDetails)
        .then((response) => {
            console.log(response.data.newReviewDetail);
        })
        .catch((error) => console.log(error));
    reviewForm.reset();
}


function handleSearch(event) {
    event.preventDefault();
    const company_name = event.target.company_name.value;
    console.log('Search button clicked!'); 
    
    axios   
        .post("http://localhost:5000/review/search-company", {company_name: company_name})
        .then((response) => {
            const company_name = response.data.company_name;
            const reviews = response.data.reviews;
            displayResultOnScreen(company_name, reviews);
        })
        .catch((error) => console.log(error));
    searchBox.reset();
}


function displayResultOnScreen(company_name,reviews) {
    const searchResults = document.getElementById("searchResults");
    searchResults.innerHTML ="";
    let totalRating = 0;
        for (let review of reviews) {
            totalRating += review.rating;
        }
        const avgRating = totalRating / reviews.length;

    searchResults.innerHTML = `<h5>Company Name: ${company_name}</h5><br><h5>Average Rating: ${avgRating}</h5><br><hr>`;

    for (let review of reviews) {
        const reviewElement = document.createElement("div");
        reviewElement.innerHTML = `<h6>Review:</h6><p>Pros: ${review.pros}</p><br><p>Cons: ${review.cons}</p><br><p>Rating: ${review.rating}</p><hr>`;

        searchResults.appendChild(reviewElement);
    }
}