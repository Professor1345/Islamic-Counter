**Islamic Counter App**

This simple React application provides a counter with sound effects. It allows users to increment a counter, reset it, and toggle sound effects on and off. Below is a brief overview of the application structure and functionality.

### Features:

1. **Counter Incrementation:**

   - Users can increment the counter by clicking the "Counter" button.
   - Each incrementation triggers a sound effect if sound is enabled.

2. **Reset Counter:**

   - The "Reset" button allows users to reset the counter to zero.

3. **Sound Control:**
   - Users can toggle sound effects on and off using the sound icon buttons.

### Technologies Used:

- React: JavaScript library for building user interfaces.
- useState Hook: React hook for managing component-level state.
- useEffect Hook: React hook for handling side effects in functional components.
- TypeScript: A superset of JavaScript that adds static typing to the language. It helps catch errors early during development and improves code readability and maintainability by providing better documentation through type annotations.

### How to Use:

1. **Increment Counter:**

   - Click the "Counter" button to increase the counter value.

2. **Reset Counter:**

   - Click the "Reset" button to reset the counter to zero.

3. **Toggle Sound:**
   - Click the sound icon buttons to enable or disable sound effects.

### Developer Information:

This application was developed by [Bello](https://hammedbello.netlify.app/).

### Installation:

To run this application locally:

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies using `npm install` or `yarn install`.
4. Start the development server using `npm start` or `yarn start`.

### Additional Notes:

- Counter value is stored in the browser's local storage, ensuring persistence even after page refresh.
- Sound effects are played using HTML5 Audio API.
