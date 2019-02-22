$(() => {


  const openFoodSearchModal = (e) => {
   $('.foodSearchModal').css('display', 'block');
   $eCousin = $(e.target).parent().siblings().eq(0);
   $eCousinTotalsDiv = $(e.target).parent().siblings().eq(1).children().eq(1);

 }

 const closeFoodSearchModal = () => {
   $('.foodSearchModal').css('display', 'none');
   // clearSearchResults();
 }

  const addToDB = (e) => {
    let $info = $(e.target).siblings().eq(0).children()
    console.log($info);
  }
  //   let fodmaps = [{
  //     servingSizeW1: 'test',
  //     servingSizeV1: 'test',
  //     oligos1: '',
  //     fructos1: '',
  //     polyols1: '',
  //     lactos1: '',
  //   },
  //   {
  //     servingSizeW2: '',
  //     servingSizeV2: '',
  //     oligos2: '',
  //     fructos2: '',
  //     polyols2: '',
  //     lactos2: '',
  //   },
  //   {
  //     servingSizeW3: '',
  //     servingSizeV3: '',
  //     oligos3: '',
  //     fructos3: '',
  //     polyols3: '',
  //     lactos3: '',
  //   }
  // ];

    // let myJSON = JSON.stringify(fodmaps)
    //
    // jQuery.post('/pantry', {
    //   name: $($info[0]).text(),
    //   brand: $($info[0]).text(),
    //   servingSize: '1',
    //   calories: $($info[1]).text(),
    //   totalFat: $($info[4]).text(),
    //   totalCarbs: $($info[3]).text(),
    //   dietaryFiber: $($info[5]).text(),
    //   sugars: $($info[6]).text(),
    //   protein: $($info[2]).text(),
    //   fodmaps: myJSON
    //
    //   })
    // }


 $('.fodmapInput').change((e) => {
   let $fodmapsArr = $('.fodmapsDiv').children()
   // console.log($fodmapsArr);
   let $fodmapsReStrung = [];
   for(let i = 0; i < $fodmapsArr.length; i++) {
     let $fodArr = $($fodmapsArr[i]).children();
     let $fodmapsObj = {};
     for(let x = 0; x < $fodArr.length; x++) {
       // $fodmapsObj[$fodArr[x].name] = $fodArr[x].text();
       // console.log($fodArr[x].name);
       // console.log($($fodArr[x]).val());
       $fodmapsObj[$fodArr[x].name] = $($fodArr[x]).val();


     }
     // console.log($fodmapsObj);
     $fodmapsReStrung.push($fodmapsObj)
     console.log($fodmapsReStrung);
   }

 });

 $('.btnAddFromAPI').on('click', openFoodSearchModal);

 $('#btnCloseSearchModal').on('click', closeFoodSearchModal);

  // entire form on submit event listener taken from my unit 1 nutrition app
  $('.addFood').on('submit', (e) => {
    e.preventDefault();
    let searchItem = $('input[type=text]').val();
    $.ajax(
      {
      method: "GET",
       url: `https://api.nutritionix.com/v1_1/search/${searchItem}?results=0%3A20&cal_min=0&cal_max=50000&fields=item_name%2Cbrand_name%2Cnf_calories%2Cnf_protein%2Cnf_total_carbohydrate%2Cnf_total_fat%2Cnf_dietary_fiber%2Cnf_sugars&appId=de92457e&appKey=96aacdbf1c85e953bb7e7e62a56e0cae`,
       datatype : 'application/json',
      }
    ).then(
      (data) => {
        // console.log(data);
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
          let $ddBrand = ' - ' + data.hits[i].fields.brand_name;

          $($ddItemDiv).append($ddItemName);
          $($ddItemName).append($ddBrand);
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

          $($btnAddItem).on('click', addToDB)

        }
      }
    )

  })
})
