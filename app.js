// Listen for submit

document.getElementById('loan-form').addEventListener('submit', function (e) {
    // hide results
    document.getElementById('results').style.display = 'none';
    // show loader

    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 1000);


    e.preventDefault();
});

//calculate Results

function calculateResults() {
    console.log('caculating....')
    // Ui Vars
    const amount = document.getElementById('amount');
    const intrest = document.getElementById('intrest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalIntrest = document.getElementById('total-interest');


    const principal = parseFloat(amount.value);
    const caculaterIntrest = parseFloat(intrest.value) / 100 / 12;
    const cacluatedPayments = parseFloat(years.value) * 12;


    // Compute Monthly Payments

    const x = Math.pow(1 + caculaterIntrest, cacluatedPayments);
    const monthly = (principal * x * caculaterIntrest) / (x - 1);


    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * cacluatedPayments).toFixed(2);
        totalIntrest.value = ((monthly * cacluatedPayments) - principal).toFixed(2);

        //show results

        document.getElementById('results').style.display = 'block';

        // hide loader
        document.getElementById('loading').style.display = 'none';

    } else {
        showError('Please check your numbers')

        document.getElementById('loading').style.display = 'none';

    }


}

// Show error

function showError(error) {

    document.getElementById('results').style.display = 'none';

    // hide loader
    document.getElementById('loading').style.display = 'none';
    // create div

    const errorDiv = document.createElement('div');

    //get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // add class
    errorDiv.className = 'alert alert-danger'

    // create text node and append to div

    errorDiv.appendChild(document.createTextNode(error));


    // insert error above heading 
    card.insertBefore(errorDiv, heading);


    // clear error after 3 seconds
    setTimeout(clearError, 3000)
}


// clear error

function clearError() {
    document.querySelector('.alert').remove();
}