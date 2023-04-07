/* Wrap all code that interacts with the DOM in a call to jQuery to ensure that
the code isn't run until the browser has finished rendering all the elements
in the html.*/
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  $('.saveBtn').on('click', function() {
    // console.log($(this))
        var timeBlock = $(this).closest('.time-block');
        var timeBlockId = timeBlock.attr('id');
        var description = timeBlock.find('.description').val();
        // console.log(timeBlock)
        // console.log(timeBlockId)
        // console.log(description)
        localStorage.setItem(timeBlockId, description);
      });
      // TODO: Add code to apply the past, present, or future class to each time
      // block by comparing the id to the current hour. HINTS: How can the id
      // attribute of each time-block be used to conditionally add or remove the
      // past, present, and future classes? How can Day.js be used to get the
      // current hour in 24-hour time?
      $('.time-block').each(function() {
        // const hour = Number($(this).attr('id').split('-')[1]);
        const timeBlockId = $(this).attr('id')
        // console.log(timeBlockId);
        const splitId = timeBlockId.split('-')
        // console.log(splitId);
        const hour = parseInt(splitId[1])
        let currentHour = parseInt(dayjs().format("H"));
        if (hour < currentHour) {
          $(this).addClass('past');
        } else if (hour === currentHour) {
          $(this).addClass('present');
        } else {
          $(this).addClass('future');
        }
      });
      // TODO: Add code to get any user input that was saved in localStorage and set
      // the values of the corresponding textarea elements. HINT: How can the id
      // attribute of each time-block be used to do this?
      function restoreAllNotes() {
        $('.time-block').each(function() {
          var timeBlockId = $(this).attr('id');
          var savedInput = localStorage.getItem(timeBlockId);
          // Set textarea value to saved input (if it exists)
          if (savedInput !== null) {
            $(this).find('.description').val(savedInput);
          }
        });
      }
      // Call restoreAllNotes function to restore saved notes
      restoreAllNotes();
    // TODO: Add code to display the current date in the header of the page.
    setInterval(() => {
      const currentTime = dayjs().format('MMM DD, YYYY hh:mm:ss A');
      document.getElementById('current-time').textContent = `${currentTime}`;
    }, 1000);
  });