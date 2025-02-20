const trailContainer = document.getElementById('mouse-trail-container');
let lastX = null;
let lastY = null;

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    if (lastX !== null && lastY !== null) {
        // Create a new trail line between the last mouse position and the current position
        const trail = document.createElement('div');
        trail.classList.add('mouse-trail');

        // Random color for the line
        const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
        trail.style.backgroundColor = randomColor;

        // Calculate the angle and length between the last position and current position
        const angle = Math.atan2(y - lastY, x - lastX);
        const distance = Math.sqrt(Math.pow(x - lastX, 2) + Math.pow(y - lastY, 2));

        // Set the position and size of the line segment
        trail.style.width = `${distance}px`;
        trail.style.transform = `rotate(${angle}rad)`;
        trail.style.left = `${lastX}px`;
        trail.style.top = `${lastY}px`;

        // Append the trail to the container
        trailContainer.appendChild(trail);

        // Add fade-out class to make it disappear after 3 seconds
        setTimeout(() => {
            trail.classList.add('fade-out');
        }, 0); // Make the fade-out animation start immediately

        // Remove the trail element after the animation ends to prevent memory buildup
        setTimeout(() => {
            trail.remove();
        }, 3000); // Matches the duration of the fade-out animation
    }

    // Update last position
    lastX = x;
    lastY = y;
});
