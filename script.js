document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const age = parseInt(formData.get('age'));
    const email = formData.get('email');
    const date = formData.get('date');
    const time = formData.get('time');
    const ticketType = formData.get('ticketType');
    const bookingType = formData.get('bookingType');
    const concert = formData.get('concert');

    // Clear previous errors
    document.querySelectorAll('.error').forEach(function(error) {
      error.textContent = '';
    });

    // Validate form fields
    let hasError = false;
    if (name.trim() === '') {
      document.getElementById('nameError').textContent = 'Name is required';
      hasError = true;
    }
    if (isNaN(age) || age <= 0) {
      document.getElementById('ageError').textContent = 'Age must be a valid number';
      hasError = true;
    }
    if (email.trim() === '') {
      document.getElementById('emailError').textContent = 'Email is required';
      hasError = true;
    }
    if (date.trim() === '') {
      document.getElementById('dateError').textContent = 'Date is required';
      hasError = true;
    }
    if (time.trim() === '') {
      document.getElementById('timeError').textContent = 'Time is required';
      hasError = true;
    }
    if (ticketType === 'Select ticket type') {
      document.getElementById('ticketTypeError').textContent = 'Please select a ticket type';
      hasError = true;
    }
    if (bookingType === 'Select booking type') {
      document.getElementById('bookingTypeError').textContent = 'Please select a booking type';
      hasError = true;
    }
    if (concert.trim() === '') {
      document.getElementById('concertError').textContent = 'Please select a concert';
      hasError = true;
    }

    if (hasError) {
      return;
    }
  
    // Check age
    let isMinor = false;
    if (age < 18) {
      isMinor = true;
      if (bookingType === 'Individual') {
        alert('Minors must be accompanied by an adult for individual bookings.');
        return;
      }
    }
  
    // Calculate total cost
    let totalCost = 0;
    if (ticketType === 'General Admission') {
      totalCost += 50; // General Admission ticket cost
    } else if (ticketType === 'VIP') {
      totalCost += 100; // VIP ticket cost
    }
    if (bookingType === 'Group') {
      totalCost *= 0.9; // 10% discount for group booking
    }
  
    // Display booking summary
    const summary = `
      <h2>Booking Summary</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Age:</strong> ${age}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>Ticket Type:</strong> ${ticketType}</p>
      <p><strong>Booking Type:</strong> ${bookingType}</p>
      <p><strong>Concert:</strong> ${concert}</p>
      <p><strong>Total Cost:</strong> $${totalCost.toFixed(2)}</p>
    `;
    document.getElementById('summary').innerHTML = summary;
  });