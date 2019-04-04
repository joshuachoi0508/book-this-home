# Production README

Live site: [Book This Home Component](https://joshuachoi0508.github.io/book-this-home)

Book This Home Component is a purely front-end application containing a home-booking component inspired by Airbnb.  

### Approach
In order to clone Airbnb's component, I broke it down go usable subcomponents. The main component, Book This Home Component, holds the state as well as methods. Since the state and methods are in one component, state change, editing existing method, and building new methods is convenient. Other subcomponents are broken down by their roles: Handling guest count, breaking down the total pricing, and showing confirmation. Since each component does one thing, it's easy to notice, edit, and add elements and implement further methods.

For the calendar, I used react-dates API because it provides clean and easy-to-use calendar that could be easily implemented and manipulated.

### Challenges
1. Closing of the guest-option-div

  -   As I built out more methods and elements, BookThiSHome component got massive and codes became harder to read. In order to minimize the component and make the codes more readable, I broke down BookThisHome component and made two sub-components so that it could be read easily by me and other developers and changes could be made easily.


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

  - As I built out more methods and elements, Book This Home component got massive and codes became harder to read. In order to minimize the component and make the codes more readable, I broke down Book This Home component and broke it down to sub-components so that they could be read and edited easily.

3. Check in and check out time highlighting

  -   As I built out more methods and elements, Book This Home component got massive and codes became harder to read. In order to minimize the component and make the codes more readable, I broke down BookThisHome component and made two sub-components so that it could be read easily by me and other developers and changes could be made easily.

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

challenges: changing default css
adding eventlistener to the window
