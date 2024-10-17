// Retrieve  claims 
let claims = JSON.parse(localStorage.getItem('claims')) || [];

// Function to display
function displayFeedback(message, type) {
  const feedback = document.getElementById('form-feedback'); 
  feedback.textContent = message; 
  feedback.className = type;
}

// Function to add a claim
function addClaim(claim) {
  claims.push(claim);
  localStorage.setItem('claims', JSON.stringify(claims)); 
  addClaimToTable(claim);
}

// Function to populate claims 
function populateClaimsTable() {
  claims.forEach(claim => addClaimToTable(claim)); 
}

// Function add a new claim 
function addClaimToTable(claim) {
  const claimsTableBody = document.querySelector('#claimsTable tbody'); 
  const row = document.createElement('tr'); 
  row.innerHTML = `
    <td>${claim.claimId}</td>    <!-- Display the claim ID -->
    <td>${claim.status}</td>     <!-- Display the claim status -->
    <td>${claim.dateSubmitted}</td> <!-- Display the submission date -->
  `;
  claimsTableBody.appendChild(row); 
}




// Event form submission
document.getElementById('claimForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Retrieve the form field values
  const policyNumber = document.getElementById('policy-number').value.trim(); 
  const incidentDate = document.getElementById('incident-date').value; 
  const incidentDescription = document.getElementById('incident-description').value.trim(); 

  // Form validation
  if (!policyNumber || !incidentDate || !incidentDescription) {
    displayFeedback("Please fill out all required fields.", 'error'); 
    return;
  }

  // Simulating claim submission
  const claimId = 'CLM' + Date.now(); 
  const newClaim = {
    claimId: claimId,              
    policyNumber: policyNumber,   
    incidentDate: incidentDate,    
    incidentDescription: incidentDescription, 
    status: 'Submitted',           
    dateSubmitted: new Date().toLocaleDateString() 
  };

  // Add the claim 
  addClaim(newClaim);
  document.getElementById('claimForm').reset();
  displayFeedback("Claim Submitted Successfully!", 'success'); 
});

// Populate the claims 
populateClaimsTable();





// Knowledge Base Search Functionality
const articles = [
  { 
    title: "How to File an Insurance Claim", 
    content: "Follow these steps: Click on the 'File Insurance Claim' button, fill out the required form details including policy number, incident date, and description, and then submit it." 
  },
  { 
    title: "What is Covered by My Insurance?", 
    content: "Your insurance typically covers damages caused by incidents such as accidents, theft, natural disasters, or personal injuries, depending on your policy terms. Please check your specific policy for detailed coverage information." 
  },
  { 
    title: "Understanding Your Policy", 
    content: "Your policy includes sections outlining what is covered, exclusions, premium details, and claims processes. It’s essential to review your coverage limits, deductibles, and any special conditions that may apply to your specific policy." 
  },
  { 
    title: "Claim Processing Times", 
    content: "Claims are usually processed within 7 to 14 business days after submission, depending on the complexity of the claim and the documentation provided. You will be notified if any additional information is required." 
  },
  { 
    title: "Contacting Support", 
    content: "You can contact our support team for any assistance by calling 774-389-9965, available Monday to Friday from 9 AM to 6 PM, or by emailing support@insurancecompany.com." 
  }
];

// Event listener for search 
document.getElementById('search-input').addEventListener('input', function(event) {
  const query = event.target.value.toLowerCase().trim(); 
  const searchResults = document.getElementById('search-results');
  searchResults.innerHTML = ''; 

  // If  empty
  if (query.length === 0) {
    return;
  }

  // Filter 
  const filteredArticles = articles.filter(article => {
    return article.title.toLowerCase().includes(query) || article.content.toLowerCase().includes(query);
  });

  // If no articles match 
  if (filteredArticles.length === 0) {
    searchResults.innerHTML = '<p>No results found.</p>';
    return;
  }

  // Display 
  filteredArticles.forEach(article => {
    const resultItem = document.createElement('div'); 
    resultItem.classList.add('result-item'); 
    resultItem.innerHTML = `<h3>${article.title}</h3><p>${article.content}</p>`; 
    searchResults.appendChild(resultItem); 
  });
});
