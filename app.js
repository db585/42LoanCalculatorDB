// Use StandardJS style

// Listen for submit
document.getElementById('db-loan-form').addEventListener('submit', (e) => {
  // Hide the results
  document.querySelector('#db-results').style.display = 'none'

  // Show loading
  document.querySelector('#db-loading').style.display = 'block'

  // Set timeout for hide loading and show the results
  setTimeout(calculateResults, 2000)

  e.preventDefault()
}
)

// form.addEventListener('submit', calculateResults)

// Define calculateResults func
function calculateResults (e) {
  // UI bindnings
  const amountInput = document.getElementById('db-loan-amount')
  const interestInput = document.getElementById('db-interest')
  const yearsInput = document.getElementById('db-years')
  const monthlyPaymentInput = document.getElementById('db-monthly-payment')
  const totalPaymentInput = document.getElementById('db-total-payment')
  const totalInterestInput = document.getElementById('db-total-interest')

  const principal = parseFloat(amountInput.value)
  const calculatedInterest = parseFloat(interestInput.value) / 100 / 12
  const calculatedPayments = parseFloat(yearsInput.value) * 12

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments)
  const monthly = (principal * x * calculatedInterest) / (x - 1)

  if (isFinite(monthly)) {
    monthlyPaymentInput.value = monthly.toFixed(2)
    totalPaymentInput.value = (monthly * calculatedPayments).toFixed(2)
    totalInterestInput.value = ((monthly * calculatedPayments) - principal).toFixed(2)

    // Show the results and hide the loading
    document.querySelector('#db-loading').style.display = 'none'
    document.querySelector('#db-results').style.display = 'block'
  } else {
    showError('Please check your numbers')
  }
  // e.preventDefault()
}

// Define showError func
function showError (msg) {
// Hide the results and loading
  document.querySelector('#db-results').style.display = 'none'
  document.querySelector('#db-loading').style.display = 'none'

  // Create div for error msg
  const errorDiv = document.createElement('div')

  // Get element
  const cardTitle = document.querySelector('.card-title')
  const heading = document.querySelector('#db-card-title')

  // Add a class
  errorDiv.className = 'card-panel pink lighten-5'

  // Add id

  errorDiv.id = 'errorDiv'

  // Create a textNode and append to errorDiv
  errorDiv.appendChild(document.createTextNode(msg))

  // Insert errorDiv above heading
  cardTitle.insertBefore(errorDiv, heading)

  // Clear errorDiv after 2sec
  setTimeout(clearError, 2000)
}

// Declare clearError func

function clearError () {
  document.querySelector('#errorDiv').remove()
}
