# Production README

Live site: [Book This Home Component](https://joshuachoi0508.github.io/book-this-home)

Book This Home Component is a purely front-end application containing a home-booking component inspired by Airbnb.  

### Approach
In order to clone Airbnb's component, I broke it down into reusable subcomponents. The main component, Book This Home Component, holds the state as well as methods. Since the state and methods are in one component, changing the state, editing existing methods, and building new methods are convenient. Other subcomponents are broken down by their roles: Handling guest count, breaking down the total pricing, and showing confirmation. Since each component does one thing, it's easy to notice, edit, and add elements and implement further methods.

For the calendar, I used react-dates API because it provides clean and easy-to-use calendar that could be easily implemented and manipulated.

### Challenges
1. Closing of the Guest Option Div

  -   Guest Option Div had to close when clicked anywhere outside of the div but stay open when clicked anywhere inside of the div. In order to achieve this, I appended an event listener to the window with a function that returns true when the clicked element is a child of the Guest Option Div.


 ```javascript
 window.addEventListener('click', (e) => {
     if (!childOfGuestOption(e.target)) {
         this.closeGuestOption();
     }

     function childOfGuestOption (element) {
         if (element === null)  return false;

         if (element.className === "guest-option-divs") {
             return true;
         } else if (element.tagName === "HTML") {
             return false;
         } else {
             return childOfGuestOption(element.parentElement);
         }
     }

 })
```

2. Size of the main component

  - As I built out more methods and elements, Book This Home component got massive and codes became harder to read. In order to minimize the component and make the codes more readable, I broke down Book This Home component and broke it down to different sub-components so that they could be read and edited easily.

3. Check in and check out time highlighting

  -   Although easy to use, react-dates came with a heavy pre-made stylesheet. In order to achieve the check in and check out highlight feature, I located the right class to be edited and appended appropriate styles.

  ```css
  .DateInput_input__focused {
    position: relative;
    left: 5px;
    background: #fff;
    border: 0;
    border-top: 0;
    padding: 4px 6px !important;
    overflow: hidden !important;
    background: rgb(153, 237, 230) !important;
    border-color: rgb(153, 237, 230) !important;
    border-radius: 3px !important;
  }
  ```

### Resources
1. https://github.com/airbnb/react-with-styles
2. https://github.com/airbnb/react-dates
3. https://github.com/reactjs/react-modal
