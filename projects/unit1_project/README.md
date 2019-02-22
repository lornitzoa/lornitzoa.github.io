# Unit 1 Project: Basic Nutrition NutritionTracker

https://lornitzoa.github.io/

## Summary
This application will allow a user to search for foods and add them to meals each day and then track specific nutritional elements and total caloric intake per meal and per day.

## Approach and Background
My design is particularly shaped by the MyFitnessPal meal tracking application. I built this application using HTML, CSS and Javascript/jQuery. I used an API from Nutritionix.com. However, I am not particularly satisfied with this data source and would look for other sources if I were to develop this further. I discovered mid-way through my project that MyFitnessPal actually had an API I could have used, but did not want to waste time trying to hook up to a different API. The one used works for to achieve the primary goals of this Unit 1 project.

I learned how to use local storage to store data so that a user could move from one day to another, add, change and remove data and come back later to review the same data and modify it further as needed.

I managed to design it in such a way that it was easy to use on various screen sizes. I did not put a lot of time into the responsive design, but was please to find that my initial layout was flexible. Once I had everything hooked up to my github pages I was able to view my site on my iPad and my android phone and was pleased with the look of it. The font is definitely a little small on the phone and this is something I would put energy into fixing at a later date.

I ran out of time to start working on a function to allow a user to change the quantities and then have the nutrient values re-calculated to reflect the change.

## Bugs, Issues, Unfinished business

I discovered an issue at the end of the night with the search results clearing the header div when the search modal was closed. I figured out the issue and tried to push it to my github project but it doesn't seem to have stuck. It is correct when I open the index page from my computer, but not when I navigate to the page from my github pages domain. Maybe it will have gone through in the morning.

I was not as good about commenting my code toward the end of my work. This is something I need to go back and catch up so future Anna can remember what is going on. I would also like to re-organize my code so it is a little more logical in where things are in relation to each other.

## Further Development
Ultimately I want get an API to a FODMAP database where I can cross reference selected foods and also return FODMAP information. The purpose being to enable those on a FODMAP diet to track both their FODMAP intake along with their macro nutritional intake. I would also develop functionality for logging reactions to various foods so people could identify which FODMAPs they are sensitive to and which they are able to tolerate. This would be a particularly useful tool both in the elimination phase of the diet as well as the maintenance of it.

I would also like to develop it as a meal planning tool as well. Making a search function that would allow you to search for foods with specified amounts of certain macro nutrients. I know there is an app out there that suggests recipes based on food in  your pantry, it would be interesting to hook a nutritional app like this up with an app like that as you could identify what nutritional content you are looking for in a meal and then search for recipes based on those parameters.

## Resources

- API Source: https://developer.nutritionix.com/docs/v1_1
- support with parents().eq() from https://stackoverflow.com/questions/7093659/how-do-i-get-the-n-th-level-parent-of-an-element-in-jquery
- col & row span memory jog from https://html.com/tables/rowspan-colspan/
- overflow support from: https://stackoverflow.com/questions/4345285/adding-a-scroll-bar-if-div-extends-below-bottom-of-view-port
- issues with draggable function https://stackoverflow.com/questions/2895894/jquery-ui-draggable-is-not-a-function
- revert drag item to original position on invalid drop area https://stackoverflow.com/questions/3088485/how-to-revert-position-of-a-jquery-ui-draggable-based-on-condition
- **NOTE: I struggled with the drag and drop function for a few hours. I was able to get the first drag and drop to work from the initial meal to the second. I had trouble getting the second move to occur while still seeing the element. I also had a lot of positioning issues. While I searched through quite a few sources for answers I figured out the solution that worked for me on my own through trial and error and so am not siting many sources for my final solution.
- support for getting just the first class of an element https://stackoverflow.com/questions/3203966/jquery-get-the-first-class-only-from-a-element
- jquery add checkbox support https://techbrij.com/add-dynamic-form-elements-textbox-button-radio-checkbox
- checkbox support in checked value issue https://stackoverflow.com/questions/426258/setting-checked-for-a-checkbox-with-jquery
- formatting date in javascript https://stackoverflow.com/questions/17306830/how-to-get-2-digit-year-w-javascript
- getting month name from date https://www.w3schools.com/jsref/jsref_getmonth.asp
- incrementing date string http://www.phpmind.com/blog/2014/06/how-to-add-days-in-a-date-string-using-javascript/
- finding jquery element index https://api.jquery.com/index/
- local storage support resources:
  - https://www.taniarascia.com/how-to-use-local-storage-with-javascript/
  - https://stackoverflow.com/questions/17745292/how-to-retrieve-all-localstorage-items-without-knowing-the-keys-in-advance
  -https://stackoverflow.com/questions/3138564/looping-through-localstorage-in-html5-and-javascript
- background image support https://stackoverflow.com/questions/8565969/how-can-i-make-my-websites-background-transparent-without-making-the-content-i
- Responsive design support with screen size parameters https://mediag.com/blog/popular-screen-resolutions-designing-for-all/
