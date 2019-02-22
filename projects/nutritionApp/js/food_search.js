

$(() => {

  $.ajax(
    {
      method: "GET",
      url: "https://api.nutritionix.com/v1_1/search/",
      datatype : 'application/json',
      data: {

        'appId' : 'de92457e',
        'appKey' : '96aacdbf1c85e953bb7e7e62a56e0cae',
        'query' : 'bread'
      }
    }
  ).then(
    (data) => {
      console.log(data)
    },
    (error) => {
      console.log(error);
    }
  );


})// this closes the document
