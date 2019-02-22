$(() => {


  // ===================================
  //  VARIABLES AND GLOBAL ELEMENTS
  // ===================================

  let $eCousin = '';
  let $eCousinTotalsDiv = '';
  let $mealTotalsDivArr = [$('#breakfastTotals'),$('#lunchTotals'),$('#dinnerTotals'),$('#extrasTotals')]
  let $mealItemsDivArr = [$('#breakfastDroppable'), $('#lunchDroppable'), $('#dinnerDroppable'), $('#extrasDroppable')]
  let monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let dayArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  // =================
  //  FUNCTIONS
  // =================

  //// DASHBOARD Functions

  $('.mealItems').droppable({ // this codes works to drag and drop once to any mealITem field
    accept: '.ui-draggable-dragging',
    drop: (e, ui) => {
      let $dropTarget = $(e.target);
      let $dragItem = $('.ui-draggable-dragging');
      $($dragItem).appendTo($dropTarget).css({top:0});
      calcMealTotals()
      updateLocalStorage()
    },
  })

  const clearTotals = (mealTotals) => {
    for(let i = 0; i < mealTotals.length; i++) {
      $(mealTotals[i]).text(0);
    }
  }

  const calcMealTotals = () => {
    //let $mealTotalsData = $($eCousinTotalsDiv).children();// will need to change this for drag and drop functionality
    for(let t = 0; t < $mealTotalsDivArr.length; t++) {
      // save the current meal to evaluate totals for to a variable
      let $currentMealT = $mealTotalsDivArr[t]
      // find the totals elements for each meal
      let $mealNutriTotals = $($currentMealT).children().prevObject.children()
      // set them to zero
      clearTotals($mealNutriTotals);
      // then loop through each nutrient total
      for(let i = 0; i < $mealNutriTotals.length; i++) {
        // find item list from current meal being evaluated
        let $sisterItemDiv = $($currentMealT).parent().siblings()[1];
        let $sisterItemsList = $($sisterItemDiv).children().children();
        // loop through current meal's item list
        for(let x = 2; x < $sisterItemsList.length; x++) {
          // if nutrient classes are the same
          if($($mealNutriTotals[i]).attr('class') === $($sisterItemsList[x]).attr('class').split(' ')[0]) {
            // store item nutrient value
            let nutriVal = +($($sisterItemsList[x]).text());
            // add it to current nutrient meal total
            let newTotal = +($($mealNutriTotals[i]).text()) + nutriVal;
            // add new total to the nutrient total text and fix to 2 decimal places.
            $($mealNutriTotals[i]).text(newTotal.toFixed(2))
          }
        }
      }
    }
    calcDailyTotals();
  }

  const calcDailyTotals = () => {
    let $dailyTotal = $('#dailyTotal').children();
    clearTotals($dailyTotal)
    for(let i = 0; i < $dailyTotal.length; i++) {
      for(let x = 0; x < $mealTotalsDivArr.length; x++) {
        let $currentMeal = $($mealTotalsDivArr[x]).children();
        for(let y = 0; y < $currentMeal.length; y++) {
          if($($dailyTotal[i]).attr('class') === $($currentMeal[y]).attr('class')) {
            let dailyNutriVal = +($($currentMeal[y]).text())
            let newDailyTotal = +($($dailyTotal[i]).text()) + dailyNutriVal
            $($dailyTotal[i]).text(newDailyTotal.toFixed(2))
          }
        }
      }
    }
  }

  const selectItems = (e) => {
    let $checkedItem = $(e.target).parent()
    let $checkBoxVal = $(e.target)[0].checked
    // console.log($checkedItem);
    // console.log($($selectedItem));
    // console.log($($selectedItem).attr('checked'));
    if($checkBoxVal === true) {
      $checkedItem.addClass('selected')
      // console.log($($checkedItem).attr('class'));
    } else {
      $checkedItem.removeClass('selected')
      // console.log($($checkedItem).attr('class'));
    }
  }

  const deleteItems = (e) => {
    // store meal to look at
    let $eParent = $(e.target).parents().eq(1)
    // finds meal item list
    let $sisterItemList = $($eParent).children().eq(1)[0]
    // gets item list array
    let $itemArr = $($sisterItemList).children();
    // console.log($itemArr);
    // loop through the items list array
    for(let i = 0; i < $itemArr.length; i++) {
      let $itemClassArr = $($itemArr[i]).attr('class').split(' ')
      for(let x = 0; x < $itemClassArr.length; x++) {
        // if class = selected then delete
        if($itemClassArr[x] === 'selected') {
          // console.log();
          removeFromLocalStorage($itemArr[i], $eParent.attr('class'));
          $itemArr[i].remove()

        }
      }
    }
    updateLocalStorage();
    calcMealTotals();
  }

  const openFoodSearchModal = (e) => {
    $('.foodSearchModal').css('display', 'block');
    $eCousin = $(e.target).parent().siblings().eq(0);
    $eCousinTotalsDiv = $(e.target).parent().siblings().eq(1).children().eq(1);

  }

  const closeFoodSearchModal = () => {
    $('.foodSearchModal').css('display', 'none');
    $('.resultsList').empty();
  }

  const addItemToMeal = (e) => {
    let $itemDiv = $(e.target).siblings();
    let $clone = $($itemDiv).clone().removeClass('itemDiv').addClass('mealItemDiv').appendTo($eCousin).draggable(
      {
        axis: 'y',
        revert: 'invalid'
      });
    let $checkBox = $('<input>').attr({type: 'checkbox'}).addClass('select').attr('checked',false)
    // console.log($checkBox);
    $($checkBox).on('click', selectItems)
    $clone.prepend($checkBox);
    calcMealTotals();
    // console.log($clone);
    saveToLocalStorage($clone)
  }

  // save added item to local storage
  const saveToLocalStorage = (item) => {
    let date = convertHeaderDate();
    let meal = $(item).parents().eq(1).attr('class');
    let index = $(item).index();
    let itemDetailsArr = $(item).children()
    let primaryKey = date+'_'+meal+'_'+index;
    let itemNameKey = primaryKey+'_'+'item'
    let itemNameVal = $(item).children().eq(1).text();
    localStorage.setItem(itemNameKey, itemNameVal )
    for(let i = 2; i < itemDetailsArr.length; i++) {
      let itemClass = $(itemDetailsArr[i]).attr('class').split(' ')[0];
      let key = primaryKey + '_' + itemClass
      let val = $(itemDetailsArr[i]).text();
      localStorage.setItem(key, val)
    }
  }

  const retrieveLocalStorage = () => {
    let itemPKs = makeItemPKArr()
    let itemDetailsArr = ['item', 'brand', 'totalCal','carbs','protein','fat','fiber','sugar']
    for (let i = 0; i < itemPKs.length; i++) {
      let currentDay = convertHeaderDate()
      let pkDate = itemPKs[i].split('_')[0]
      if(currentDay === pkDate) {
        let parentID = itemPKs[i].split('_')[1];
        let $parentClass = '#'+parentID+'Droppable'
        let $retrievedDiv = $('<div>').addClass('mealItemDiv').appendTo($parentClass).draggable(
            {
              axis: 'y',
              revert: 'invalid'
            });
        for (let x = 0; x < itemDetailsArr.length; x++) {
          let $retrievedItem = localStorage.getItem(itemPKs[i]+ '_' + itemDetailsArr[x]);
          let $rebuiltElement = $('<dd>').text($retrievedItem).addClass(itemDetailsArr[x])
          if(itemDetailsArr[i] != 'item' || itemDetailsArr[i] != 'brand') {
            $rebuiltElement.addClass('nutrient')
          }
          $retrievedDiv.append($rebuiltElement)
        }
        let $checkBox = $('<input>').attr({type: 'checkbox'}).addClass('select').attr('checked',false)
        $retrievedDiv.prepend($checkBox)
        $($checkBox).on('click', selectItems)
        $($parentClass).append($retrievedDiv)
      }
    }
    calcMealTotals();
  }

  const removeFromLocalStorage = (item, meal) => {
    let date = convertHeaderDate();
    let index = $(item).index();
    let itemDetailsArr = $(item).children()
    let primaryKey = date+'_' + meal + '_' + index;
    let itemNameKey = primaryKey+'_'+'item'
    // let itemNameVal = $(item).children().eq(1).text();
    localStorage.removeItem(itemNameKey )
    for(let i = 2; i < itemDetailsArr.length; i++) {
      let itemClass = $(itemDetailsArr[i]).attr('class').split(' ')[0];
      let key = primaryKey + '_' + itemClass
      // let val = $(itemDetailsArr[i]).text();
      localStorage.removeItem(key)
    }

  }

  const updateLocalStorage = () => {
    localStorage.clear();
    for(let i = 0; i < $mealItemsDivArr.length; i++) {
      for(let x = 0; x < $($mealItemsDivArr[i]).children().length; x++) {
        let currentItem = $($mealItemsDivArr[i]).children()[x]
        saveToLocalStorage(currentItem)
        // console.log(currentItem);
      }
    }
  }

  const clearMeals = () => {
    for(let i = 0; i < $mealItemsDivArr.length; i++) {
      $mealItemsDivArr[i].empty()
    }
  }

  const makeItemPKArr = () => {
    let storageArr = Object.keys(localStorage)
    let itemPKArr = [];
    for (let i = 0; i < storageArr.length; i++) {
      let itemPK = storageArr[i].split('_')[0] + '_' + storageArr[i].split('_')[1]+  '_' + storageArr[i].split('_')[2];
      if(!itemPKArr.includes(itemPK)) {
        itemPKArr.push(itemPK)
      }
    }
    return itemPKArr;
  }
  // initiates header date
  const headerDate = () => {

    let d = new Date();
    let month = monthArr[d.getMonth()]
    let dayDate = d.getDate().toString();
    let dayName = dayArr[d.getDay()]
    // let dayName = dayArr{d.getDate()];

    let year = d.getFullYear();
    $('#date').text(dayName + ', ' + month + ' ' + dayDate + ', ' + year);
  }
  headerDate();

  const convertHeaderDate = () => {
    let headerDate = $('#date').text();
    let splitDate = headerDate.split(' ');
    let day = splitDate[2].split(',')[0];
    let month = '';
    let year = splitDate[3].substr(-2);
    for(let i = 0; i < monthArr.length; i++ ) {
      if(splitDate[1] === monthArr[i]) {
        month = (i + 1).toString();
      }
    }
    if(month.length === 1) {
      month = '0' + month;
    }
    if(day.length === 1) {
      day = '0' + day;
    }
    return month + '.' + day + '.' +year;
  }

  const changeDay = (e) => {
    let moveDay = 0;
    if($(e.target).attr('id') === 'prevDay') {
      moveDay = -1

    } else if ($(e.target).attr('id') === 'nextDay') {
      moveDay = 1
    }
    let date = new Date($('#date').text());
    date.setDate(date.getDate() + moveDay)

    let month = monthArr[date.getMonth()]
    let dayDate = date.getDate().toString();
    let dayName = dayArr[date.getDay()]
    // let dayName = dayArr{date.getDate()];

    let year = date.getFullYear();
    // return dayName + ', ' + month + ' ' + dayDate + ', ' + year;
    let newDate = dayName + ', ' + month + ' ' + dayDate + ', ' + year;
    $('#date').text(newDate)
    clearMeals()
    retrieveLocalStorage()
  }

  // sets alternating colors to results list
  const colorResultDivs = () => {
    let resultsArr = $('.resultsList').children();
    // console.log($(resultsLength));
    for(let i = 0; i < resultsArr.length; i++) {
      if(i % 2 === 0) {
        $(resultsArr[i]).css({background: 'rgb(130,201,201)',color: 'white'});
      } else (
        $(resultsArr[i]).css({color: 'black'})
      )
    }
  }



  // =================
  // EVENT HANDLERS
  // =================

  //// Main Page Events
  $('.btnAddToMeal').on('click', openFoodSearchModal);

  $('#btnCloseSearchModal').on('click', closeFoodSearchModal)

  $('.btnDeleteItems').on('click', deleteItems)



  $('#prevDay').on('click', changeDay)

  $('#nextDay').on('click', changeDay)

  $('#today').on('click', headerDate)


  //// foodSearchModal Events

  $('#btnCloseSearchModal').on('click', closeFoodSearchModal)

  $('form').on('submit', (e) => {
    e.preventDefault();
    let searchItem = 'chocolate'//$('input[type=text]').val();
    $.ajax(
      {
        method: "GET",
        url: `https://api.nutritionix.com/v1_1/search/${searchItem}?results=0%3A20&cal_min=0&cal_max=50000&fields=item_name%2Cbrand_name%2Cnf_calories%2Cnf_protein%2Cnf_total_carbohydrate%2Cnf_total_fat%2Cnf_dietary_fiber%2Cnf_sugars&appId=de92457e&appKey=96aacdbf1c85e953bb7e7e62a56e0cae`,
        datatype : 'application/json',
      }
    ).then(
      (data) => {
        for(let i = 0; i < data.hits.length; i++) {
          let $itemWrapper = $('<div>').addClass('wrapperDiv');
          let $btnAddItem = $('<button>').text('+');
          let $ddItemDiv = $('<div>').addClass('itemDiv');
          // let $ddNutrientDiv = $('<div>').addClass('nutrientDiv');
          let $ddItemName = $('<dd>').text(data.hits[i].fields.item_name).addClass('item');
          let $ddTotCal = $('<dd>').text(data.hits[i].fields.nf_calories).addClass('totalCal').addClass('nutrient');
          let $ddProtien = $('<dd>').text(data.hits[i].fields.nf_protein).addClass('protein').addClass('nutrient');
          let $ddCarbs = $('<dd>').text(data.hits[i].fields.nf_total_carbohydrate).addClass('carbs').addClass('nutrient');
          let $ddFat = $('<dd>').text(data.hits[i].fields.nf_total_fat).addClass('fat').addClass('nutrient');
          let $ddFiber = $('<dd>').text(data.hits[i].fields.nf_dietary_fiber).addClass('fiber').addClass('nutrient');
          let $ddSugars = $('<dd>').text(data.hits[i].fields.nf_sugars).addClass('sugar').addClass('nutrient');
          let $ddBrand = $('<dd>').text(data.hits[i].fields.brand_name).addClass('brand');
          // add item info to item div

          $($ddItemDiv).append($ddItemName);
          $($ddItemDiv).append($ddBrand);
          $($ddItemDiv).append($ddTotCal);
          $($ddItemDiv).append($ddProtien);
          $($ddItemDiv).append($ddCarbs);
          $($ddItemDiv).append($ddFat);
          $($ddItemDiv).append($ddFiber);
          $($ddItemDiv).append($ddSugars);

          // add button to item wrapper
          $($itemWrapper).append($btnAddItem);
          // add item div to wrapper
          $($itemWrapper).append($ddItemDiv);
          // add item wrapper to dl resultsList
          $('dl').append($itemWrapper);

          $($btnAddItem).on('click', addItemToMeal)
        }
        colorResultDivs();
      },
      (error) => {
        console.log(error);
      }
    );

  })

  retrieveLocalStorage();

}) // THIS CLOSES DOCUMENT READY
